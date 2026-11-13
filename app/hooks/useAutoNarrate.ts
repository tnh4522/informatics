"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SlideItem } from "../data/curriculum";
import {
  buildSlideNarrationSegments,
  estimateReadingDurationMs,
  NarrationSegment,
  selectBestVietnameseVoice,
} from "../lib/narration";

export type NarrationEngineMode = "speech" | "teleprompter";
export type NarrationPlaybackStatus = "idle" | "playing" | "paused";

export interface UseAutoNarrateOptions {
  slide: SlideItem;
  slideIndex: number;
  totalSlides: number;
  onAdvanceSlide: () => void;
}

export interface NarrationController {
  isActive: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  engineMode: NarrationEngineMode;
  segments: NarrationSegment[];
  currentSegmentIndex: number;
  currentSegment: NarrationSegment | null;
  progressPercent: number;
  rate: number;
  autoAdvance: boolean;
  includeSpeakerNotes: boolean;
  showCaptions: boolean;
  vietnameseVoices: SpeechSynthesisVoice[];
  selectedVoiceURI: string;
  speechApiAvailable: boolean;
  hasVietnameseVoice: boolean;
  start: (fromSegmentIndex?: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  togglePlayPause: () => void;
  jumpToSegment: (index: number) => void;
  setRate: (rate: number) => void;
  setAutoAdvance: (next: boolean) => void;
  setIncludeSpeakerNotes: (next: boolean) => void;
  setShowCaptions: (next: boolean) => void;
  setSelectedVoiceURI: (uri: string) => void;
}

export function useAutoNarrate({
  slide,
  slideIndex,
  totalSlides,
  onAdvanceSlide,
}: UseAutoNarrateOptions): NarrationController {
  const [status, setStatus] = useState<NarrationPlaybackStatus>("idle");
  const [segmentPos, setSegmentPos] = useState<{
    slideCode: string;
    index: number;
  }>({ slideCode: slide.code, index: 0 });
  const [rate, setRateState] = useState<number>(1.0);
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [includeSpeakerNotes, setIncludeSpeakerNotes] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>("");

  const runTokenRef = useRef<number>(0);
  const timerRef = useRef<number | null>(null);
  const advanceTimerRef = useRef<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const onAdvanceSlideRef = useRef(onAdvanceSlide);

  useEffect(() => {
    onAdvanceSlideRef.current = onAdvanceSlide;
  }, [onAdvanceSlide]);

  const speechApiAvailable =
    typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!speechApiAvailable) return;

    const syncVoices = () => {
      const list = window.speechSynthesis.getVoices();
      if (list.length === 0) return;
      setVoices(list);
      setSelectedVoiceURI((prev) => {
        if (prev && list.some((v) => v.voiceURI === prev)) {
          return prev;
        }
        return selectBestVietnameseVoice(list)?.voiceURI ?? "";
      });
    };

    const initTimer = window.setTimeout(syncVoices, 0);
    window.speechSynthesis.addEventListener("voiceschanged", syncVoices);

    return () => {
      window.clearTimeout(initTimer);
      window.speechSynthesis.removeEventListener("voiceschanged", syncVoices);
    };
  }, [speechApiAvailable]);

  const vietnameseVoices = useMemo(
    () => voices.filter((v) => v.lang.toLowerCase().startsWith("vi")),
    [voices]
  );

  const hasVietnameseVoice = vietnameseVoices.length > 0;
  const engineMode: NarrationEngineMode = hasVietnameseVoice
    ? "speech"
    : "teleprompter";

  const segments = useMemo(
    () => buildSlideNarrationSegments(slide, { includeSpeakerNotes }),
    [slide, includeSpeakerNotes]
  );

  const currentSegmentIndex =
    segmentPos.slideCode === slide.code
      ? Math.min(Math.max(0, segmentPos.index), Math.max(0, segments.length - 1))
      : 0;

  const currentSegment = segments[currentSegmentIndex] ?? null;

  const progressPercent =
    segments.length > 0
      ? Math.round(((currentSegmentIndex + 1) / segments.length) * 100)
      : 0;

  const clearTimersAndSpeech = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    utteranceRef.current = null;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    return () => {
      runTokenRef.current += 1;
      clearTimersAndSpeech();
    };
  }, [clearTimersAndSpeech]);

  useEffect(() => {
    runTokenRef.current += 1;
    const token = runTokenRef.current;
    clearTimersAndSpeech();

    if (status !== "playing" || !currentSegment) {
      return;
    }

    const handleSegmentComplete = () => {
      if (token !== runTokenRef.current) return;

      if (currentSegmentIndex + 1 < segments.length) {
        setSegmentPos({
          slideCode: slide.code,
          index: currentSegmentIndex + 1,
        });
        return;
      }

      if (autoAdvance && slideIndex + 1 < totalSlides) {
        advanceTimerRef.current = window.setTimeout(() => {
          if (token !== runTokenRef.current) return;
          onAdvanceSlideRef.current();
        }, 850);
      } else {
        setStatus("idle");
        setSegmentPos({ slideCode: slide.code, index: 0 });
      }
    };

    const availableVoices = speechApiAvailable
      ? window.speechSynthesis.getVoices()
      : [];
    const activeVoice =
      availableVoices.find((v) => v.voiceURI === selectedVoiceURI) ??
      selectBestVietnameseVoice(availableVoices);

    if (speechApiAvailable && activeVoice) {
      const utterance = new SpeechSynthesisUtterance(currentSegment.speechText);
      utterance.voice = activeVoice;
      utterance.lang = activeVoice.lang || "vi-VN";
      utterance.rate = rate;
      utterance.pitch = 1.0;

      // Giữ tham chiếu để engine Chromium không GC utterance trước khi kích hoạt onend
      utteranceRef.current = utterance;

      let settled = false;
      const finishOnce = () => {
        if (settled) return;
        settled = true;
        handleSegmentComplete();
      };

      utterance.onend = finishOnce;
      utterance.onerror = (event) => {
        if (event.error === "canceled" || event.error === "interrupted") {
          return;
        }
        // Rơi về teleprompter cho đoạn hiện tại nếu engine âm thanh gặp lỗi phần cứng
        const remainingMs = estimateReadingDurationMs(
          currentSegment.displayText,
          rate
        );
        timerRef.current = window.setTimeout(finishOnce, remainingMs);
      };

      const watchdogMs =
        estimateReadingDurationMs(currentSegment.displayText, rate) + 6000;
      timerRef.current = window.setTimeout(finishOnce, watchdogMs);

      window.speechSynthesis.speak(utterance);
    } else {
      const fallbackMs = estimateReadingDurationMs(
        currentSegment.displayText,
        rate
      );
      timerRef.current = window.setTimeout(handleSegmentComplete, fallbackMs);
    }

    return () => {
      runTokenRef.current += 1;
      clearTimersAndSpeech();
    };
  }, [
    autoAdvance,
    clearTimersAndSpeech,
    currentSegment,
    currentSegmentIndex,
    rate,
    segments.length,
    selectedVoiceURI,
    slide.code,
    slideIndex,
    speechApiAvailable,
    status,
    totalSlides,
  ]);

  const start = useCallback(
    (fromSegmentIndex?: number) => {
      const targetIndex =
        typeof fromSegmentIndex === "number"
          ? Math.min(Math.max(0, fromSegmentIndex), Math.max(0, segments.length - 1))
          : 0;
      setSegmentPos({ slideCode: slide.code, index: targetIndex });
      setStatus("playing");
    },
    [segments.length, slide.code]
  );

  const pause = useCallback(() => {
    if (status === "playing") {
      setStatus("paused");
    }
  }, [status]);

  const resume = useCallback(() => {
    if (status === "paused") {
      setStatus("playing");
    }
  }, [status]);

  const stop = useCallback(() => {
    runTokenRef.current += 1;
    clearTimersAndSpeech();
    setStatus("idle");
    setSegmentPos({ slideCode: slide.code, index: 0 });
  }, [clearTimersAndSpeech, slide.code]);

  const togglePlayPause = useCallback(() => {
    if (status === "playing") {
      pause();
    } else if (status === "paused") {
      resume();
    } else {
      start(0);
    }
  }, [pause, resume, start, status]);

  const jumpToSegment = useCallback(
    (index: number) => {
      const safeIdx = Math.min(
        Math.max(0, index),
        Math.max(0, segments.length - 1)
      );
      setSegmentPos({ slideCode: slide.code, index: safeIdx });
      if (status === "idle") {
        setStatus("playing");
      }
    },
    [segments.length, slide.code, status]
  );

  const setRate = useCallback((nextRate: number) => {
    setRateState(Math.min(1.75, Math.max(0.75, nextRate)));
  }, []);

  return {
    isActive: status !== "idle",
    isPlaying: status === "playing",
    isPaused: status === "paused",
    engineMode,
    segments,
    currentSegmentIndex,
    currentSegment,
    progressPercent,
    rate,
    autoAdvance,
    includeSpeakerNotes,
    showCaptions,
    vietnameseVoices,
    selectedVoiceURI,
    speechApiAvailable,
    hasVietnameseVoice,
    start,
    pause,
    resume,
    stop,
    togglePlayPause,
    jumpToSegment,
    setRate,
    setAutoAdvance,
    setIncludeSpeakerNotes,
    setShowCaptions,
    setSelectedVoiceURI,
  };
}
