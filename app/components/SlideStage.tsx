"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PresentationDeck, SlideItem, SlideKind } from "../data/curriculum";
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CollapseStageIcon,
  ExpandStageIcon,
  GridViewIcon,
  ImageIcon,
  ZoomInIcon,
} from "./Icons";
import SlideInteractiveLab from "./SlideInteractiveLab";

interface SlideStageProps {
  activeDeck: PresentationDeck;
  slideIndex: number;
  activeSlide: SlideItem;
  isFullscreen: boolean;
  isGridOpen: boolean;
  onSelectSlide: (idx: number) => void;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onToggleFullscreen: () => void;
  onToggleGrid: () => void;
}

const KIND_BADGE_MAP: Record<
  SlideKind,
  { label: string; className: string }
> = {
  theory: {
    label: "Lý thuyết",
    className: "border-[#3B82F6]/50 bg-[#1E3A8A]/45 text-[#BFDBFE]",
  },
  activity: {
    label: "Hoạt động",
    className: "border-[#D97706]/60 bg-[#78350F]/45 text-[#FDE68A]",
  },
  lab: {
    label: "Phòng Lab",
    className: "border-[#0EA5E9]/60 bg-[#0C4A6E]/45 text-[#BAE6FD]",
  },
  exercise: {
    label: "Bài tập SGK",
    className: "border-[#16A34A]/60 bg-[#14532D]/45 text-[#BBF7D0]",
  },
  summary: {
    label: "Tổng kết",
    className: "border-[#94A3B8]/50 bg-[#334155]/60 text-[#F1F5F9]",
  },
};

export default function SlideStage({
  activeDeck,
  slideIndex,
  activeSlide,
  isFullscreen,
  isGridOpen,
  onSelectSlide,
  onPrevSlide,
  onNextSlide,
  onToggleFullscreen,
  onToggleGrid,
}: SlideStageProps) {
  const [revealedSolutionCodes, setRevealedSolutionCodes] = useState<
    Record<string, boolean>
  >({});
  const [zoomedSlideCode, setZoomedSlideCode] = useState<string | null>(null);

  const totalSlides = activeDeck.slides.length;
  const kindInfo = KIND_BADGE_MAP[activeSlide.kind];
  const isSolutionOpen = Boolean(revealedSolutionCodes[activeSlide.code]);
  const isLightboxOpen = zoomedSlideCode === activeSlide.code;

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setZoomedSlideCode(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  const toggleSolution = (code: string) => {
    setRevealedSolutionCodes((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  return (
    <section
      aria-label="Sân khấu trình chiếu Slide tương tác"
      className={
        isFullscreen
          ? "fixed inset-0 z-50 flex flex-col bg-[#0F141C] text-[#FAF8F3] p-3 sm:p-5"
          : "flex flex-col rounded-sm border border-[#2C384B] bg-[#141A23] text-[#FAF8F3] overflow-hidden"
      }
    >
      {/* Top Stage Telemetry & Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-[#2C384B] bg-[#141A23]">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-sm bg-[#1D4ED8] text-[#FAF8F3] tabular-data">
            {activeSlide.code}
          </span>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm border ${kindInfo.className}`}
          >
            {kindInfo.label}
          </span>
          <span className="text-xs font-medium text-[#CBD5E1] truncate">
            {activeSlide.sectionLabel}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setZoomedSlideCode(activeSlide.code)}
            className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#93C5FD] px-2 py-1 rounded-sm border border-[#2C384B] bg-[#1C2431] hover:border-[#3B82F6] hover:text-[#FAF8F3] transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Phóng to ảnh</span>
          </button>
          <button
            type="button"
            onClick={onToggleGrid}
            aria-pressed={isGridOpen}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border text-xs font-semibold transition-colors ${
              isGridOpen
                ? "border-[#3B82F6] bg-[#1D4ED8] text-[#FAF8F3]"
                : "border-[#2C384B] bg-[#1C2431] text-[#CBD5E1] hover:border-[#475569] hover:text-[#FAF8F3]"
            }`}
          >
            <GridViewIcon className="w-3.5 h-3.5" />
            <span>{totalSlides} Slide</span>
          </button>
          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-label={
              isFullscreen
                ? "Thoát chế độ trình chiếu toàn màn hình"
                : "Mở chế độ trình chiếu toàn màn hình"
            }
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-[#2C384B] bg-[#1C2431] text-xs font-semibold text-[#CBD5E1] hover:border-[#475569] hover:text-[#FAF8F3] transition-colors"
          >
            {isFullscreen ? (
              <>
                <CollapseStageIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Thu gọn</span>
              </>
            ) : (
              <>
                <ExpandStageIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Toàn màn hình</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Calibrated Single-Rail Timeline (all ticks accessible at a glance) */}
      <div
        aria-label="Thanh tiến trình từng slide"
        className="px-4 py-2 border-b border-[#2C384B] bg-[#11161E]"
      >
        <div
          className={`grid gap-1 ${
            totalSlides >= 12
              ? "grid-cols-10 sm:grid-cols-20"
              : "grid-cols-6"
          }`}
        >
          {activeDeck.slides.map((s, idx) => {
            const isActive = idx === slideIndex;
            const isVisited = idx < slideIndex;
            return (
              <button
                key={s.code}
                type="button"
                title={`Slide ${s.id}: ${s.title}`}
                aria-label={`Chuyển đến Slide ${s.id}: ${s.title}`}
                aria-current={isActive ? "step" : undefined}
                onClick={() => {
                  onSelectSlide(idx);
                  if (isGridOpen) onToggleGrid();
                }}
                className={`h-6 rounded-sm font-mono text-[11px] font-semibold tabular-data transition-colors border ${
                  isActive
                    ? "bg-[#1D4ED8] border-[#60A5FA] text-[#FAF8F3]"
                    : isVisited
                    ? "bg-[#1E293B] border-[#334155] text-[#93C5FD] hover:border-[#3B82F6]"
                    : "bg-[#141A23] border-[#2C384B] text-[#94A3B8] hover:border-[#475569] hover:text-[#FAF8F3]"
                }`}
              >
                {String(s.id).padStart(2, "0")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Slide Canvas OR Overview Grid */}
      <div
        className={`flex-1 overflow-y-auto ${
          isFullscreen ? "p-4 sm:p-8" : "p-4 sm:p-6 min-h-[460px]"
        } bg-[#1C2431]`}
      >
        {isGridOpen ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#2C384B]">
              <h2 className="text-base sm:text-lg font-bold text-[#FAF8F3]">
                Tổng quan toàn bộ {totalSlides} Slide — {activeDeck.title}
              </h2>
              <button
                type="button"
                onClick={onToggleGrid}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm border border-[#2C384B] bg-[#141A23] text-xs font-semibold text-[#CBD5E1] hover:text-[#FAF8F3]"
              >
                <CloseIcon className="w-3.5 h-3.5" />
                Đóng lưới
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {activeDeck.slides.map((s, idx) => {
                const isActive = idx === slideIndex;
                const badge = KIND_BADGE_MAP[s.kind];
                return (
                  <button
                    key={s.code}
                    type="button"
                    onClick={() => {
                      onSelectSlide(idx);
                      onToggleGrid();
                    }}
                    className={`text-left rounded-sm border p-2.5 transition-colors flex flex-col justify-between gap-2 ${
                      isActive
                        ? "border-[#3B82F6] bg-[#172554]/70"
                        : "border-[#2C384B] bg-[#141A23] hover:border-[#475569]"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="aspect-video w-full rounded-sm overflow-hidden border border-[#2C384B] bg-[#0F141C]">
                        <Image
                          src={s.imageUrl}
                          alt={s.imageCaption}
                          width={800}
                          height={450}
                          unoptimized
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="font-mono text-[11px] font-bold text-[#93C5FD] tabular-data">
                          S{String(s.id).padStart(2, "0")} · {s.code}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm border ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#FAF8F3] line-clamp-2">
                        {s.title}
                      </div>
                    </div>
                    <div className="text-[11px] text-[#94A3B8] truncate">
                      {s.sectionLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            key={activeSlide.code}
            className="slide-settle max-w-4xl mx-auto flex flex-col justify-between"
          >
            {/* Slide Heading (No eyebrow/kicker directly above heading) */}
            <div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-7">
                  <h2
                    className={`${
                      isFullscreen ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                    } font-bold text-[#FAF8F3] leading-tight`}
                  >
                    {activeSlide.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#CBD5E1] leading-relaxed max-w-[70ch]">
                    {activeSlide.subtitle}
                  </p>
                </div>

                <figure className="md:col-span-5 rounded-sm border border-[#2C384B] bg-[#141A23] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setZoomedSlideCode(activeSlide.code)}
                    aria-label={`Phóng to hình minh họa: ${activeSlide.imageCaption}`}
                    className="group relative block w-full aspect-video bg-[#0F141C] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
                  >
                    <Image
                      src={activeSlide.imageUrl}
                      alt={activeSlide.imageCaption}
                      width={800}
                      height={450}
                      unoptimized
                      priority
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                    <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-sm border border-[#2C384B] bg-[#0F141C]/90 px-2 py-0.5 text-[11px] font-semibold text-[#FAF8F3] group-hover:border-[#3B82F6]">
                      <ZoomInIcon className="w-3 h-3 text-[#93C5FD]" />
                      <span>Phóng to</span>
                    </span>
                  </button>
                  <figcaption className="px-2.5 py-1.5 border-t border-[#2C384B] bg-[#141A23] text-[11px] text-[#CBD5E1] leading-snug">
                    {activeSlide.imageCaption}
                  </figcaption>
                </figure>
              </div>

              {/* Key Points Grid */}
              <div
                className={`mt-5 grid gap-3 ${
                  activeSlide.keyPoints.length === 3
                    ? "grid-cols-1 md:grid-cols-3"
                    : activeSlide.keyPoints.length === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {activeSlide.keyPoints.map((kp, idx) => (
                  <div
                    key={idx}
                    className="rounded-sm border border-[#2C384B] bg-[#141A23]/90 p-3.5 flex flex-col justify-between gap-2"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-[#FAF8F3]">
                        {kp.heading}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-[13px] leading-relaxed text-[#CBD5E1]">
                        {kp.body}
                      </p>
                    </div>
                    {kp.formulaOrCode && (
                      <div className="mt-1 rounded-sm border border-[#2C384B] bg-[#0F141C] px-2.5 py-1.5 font-mono text-[11px] text-[#93C5FD] tabular-data break-words">
                        {kp.formulaOrCode}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Textbook Knowledge Box (when present) */}
              {activeSlide.knowledgeBox && (
                <div className="mt-4 rounded-sm border border-[#3B82F6]/45 bg-[#172554]/55 p-3.5">
                  <div className="text-xs font-bold text-[#BFDBFE]">
                    {activeSlide.knowledgeBox.title}
                  </div>
                  <ul className="mt-1.5 space-y-1 text-xs sm:text-[13px] text-[#EFF6FF]">
                    {activeSlide.knowledgeBox.bullets.map((b, i) => (
                      <li key={i} className="leading-relaxed">
                        • {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Textbook Task & Revealable Answer (when present) */}
              {activeSlide.textbookTask && (
                <div className="mt-4 rounded-sm border border-[#16A34A]/45 bg-[#141A23] p-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-sm bg-[#15803D] text-[11px] font-semibold text-[#FAF8F3]">
                        {activeSlide.textbookTask.badge}
                      </span>
                      <span className="font-mono text-xs text-[#86EFAC]">
                        {activeSlide.textbookTask.page}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleSolution(activeSlide.code)}
                      className="text-xs font-semibold text-[#93C5FD] hover:underline"
                    >
                      {isSolutionOpen
                        ? "Ẩn gợi ý lời giải"
                        : "Xem gợi ý lời giải SGK"}
                    </button>
                  </div>
                  <p className="mt-2 text-xs sm:text-[13px] font-medium text-[#FAF8F3] leading-relaxed">
                    {activeSlide.textbookTask.prompt}
                  </p>
                  {isSolutionOpen && (
                    <div className="mt-2.5 pt-2.5 border-t border-[#2C384B] space-y-1.5 text-xs text-[#DCFCE7]">
                      {activeSlide.textbookTask.solutionSteps.map((step, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircleIcon className="w-3.5 h-3.5 text-[#4ADE80] shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                      <div className="pt-1 font-semibold text-[#86EFAC]">
                        Kết luận: {activeSlide.textbookTask.conclusion}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Live Slide-Embedded Interactive Lab */}
              <SlideInteractiveLab
                widgetType={activeSlide.interactiveWidget}
                onJumpToSlide={(idx) => onSelectSlide(idx)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Keyboard Transport Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-t border-[#2C384B] bg-[#141A23]">
        <button
          type="button"
          onClick={onPrevSlide}
          disabled={slideIndex === 0}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-[#2C384B] bg-[#1C2431] text-xs font-semibold text-[#FAF8F3] hover:border-[#475569] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          <span>Slide trước</span>
        </button>

        <div
          aria-live="polite"
          className="flex items-center gap-3 text-xs text-[#CBD5E1]"
        >
          <span className="font-mono font-semibold text-[#FAF8F3] tabular-data">
            Slide {String(slideIndex + 1).padStart(2, "0")} /{" "}
            {String(totalSlides).padStart(2, "0")}
          </span>
          <span className="hidden md:inline text-[#94A3B8]">
            Phím tắt: Mũi tên trái/phải, F (toàn màn hình), G (lưới slide)
          </span>
        </div>

        <button
          type="button"
          onClick={onNextSlide}
          disabled={slideIndex === totalSlides - 1}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#1D4ED8] hover:bg-[#1E40AF] text-xs font-semibold text-[#FAF8F3] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span>Slide tiếp theo</span>
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>

      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Xem phóng to minh họa ${activeSlide.code}`}
          onClick={() => setZoomedSlideCode(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F17]/90 p-4 sm:p-6"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-4xl rounded-sm border border-[#3B82F6] bg-[#141A23] overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[#2C384B] bg-[#1C2431]">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-sm bg-[#1D4ED8] text-[#FAF8F3] tabular-data shrink-0">
                  {activeSlide.code}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#FAF8F3] truncate">
                  {activeSlide.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setZoomedSlideCode(null)}
                aria-label="Đóng khung xem ảnh phóng to"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm border border-[#2C384B] bg-[#141A23] text-xs font-semibold text-[#CBD5E1] hover:border-[#475569] hover:text-[#FAF8F3] shrink-0"
              >
                <CloseIcon className="w-3.5 h-3.5" />
                <span>Đóng (Esc)</span>
              </button>
            </div>
            <div className="aspect-video w-full bg-[#0F141C]">
              <Image
                src={activeSlide.imageUrl}
                alt={activeSlide.imageCaption}
                width={800}
                height={450}
                unoptimized
                className="w-full h-full object-contain"
              />
            </div>
            <div className="px-4 py-2.5 border-t border-[#2C384B] bg-[#141A23] flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-[#CBD5E1]">{activeSlide.imageCaption}</p>
              <span className="text-[11px] text-[#94A3B8]">
                Nhấn Esc hoặc click vùng tối để đóng
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
