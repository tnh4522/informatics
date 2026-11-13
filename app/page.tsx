"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MULTI_GRADE_DECKS,
  SchoolLevel,
  STORAGE_UNITS_TABLE,
} from "./data/curriculum";
import SlideStage from "./components/SlideStage";
import StudyWorkbenchPanel from "./components/StudyWorkbenchPanel";
import { useAutoNarrate } from "./hooks/useAutoNarrate";
import {
  ArrowRightIcon,
  BinaryIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ImageIcon,
  MonitorIcon,
  SearchIcon,
} from "./components/Icons";

type FilterLevel = "all" | SchoolLevel;

export default function Home() {
  const [activeDeckId, setActiveDeckId] = useState<string>("th10-kntt-b01");
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isGridOpen, setIsGridOpen] = useState<boolean>(false);
  const [levelFilter, setLevelFilter] = useState<FilterLevel>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const hadNativeFullscreenRef = useRef<boolean>(false);

  const activeDeck = useMemo(
    () =>
      MULTI_GRADE_DECKS.find((d) => d.id === activeDeckId) ??
      MULTI_GRADE_DECKS[0],
    [activeDeckId]
  );

  const safeSlideIndex = Math.min(
    Math.max(0, slideIndex),
    activeDeck.slides.length - 1
  );
  const activeSlide = activeDeck.slides[safeSlideIndex];

  const handlePrevSlide = useCallback(() => {
    setSlideIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextSlide = useCallback(() => {
    setSlideIndex((prev) =>
      Math.min(activeDeck.slides.length - 1, prev + 1)
    );
  }, [activeDeck.slides.length]);

  const narration = useAutoNarrate({
    slide: activeSlide,
    slideIndex: safeSlideIndex,
    totalSlides: activeDeck.slides.length,
    onAdvanceSlide: handleNextSlide,
  });
  const { stop: stopNarration, togglePlayPause: toggleNarration } = narration;

  const handleSelectDeck = useCallback(
    (deckId: string) => {
      stopNarration();
      setActiveDeckId(deckId);
      setSlideIndex(0);
      setIsGridOpen(false);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [stopNarration]
  );

  const enterFullscreen = useCallback(async () => {
    setIsFullscreen(true);
    if (typeof document !== "undefined" && !document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
      } catch {
        // Giữ chế độ toàn màn hình CSS nếu trình duyệt không cho phép Fullscreen API
      }
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    setIsFullscreen(false);
    if (typeof document !== "undefined" && document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // Bỏ qua nếu đã thoát toàn màn hình
      }
    }
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      void exitFullscreen();
    } else {
      void enterFullscreen();
    }
  }, [enterFullscreen, exitFullscreen, isFullscreen]);

  useEffect(() => {
    const onFullscreenChange = () => {
      const nativeActive = Boolean(document.fullscreenElement);
      if (nativeActive) {
        hadNativeFullscreenRef.current = true;
        setIsFullscreen(true);
      } else if (hadNativeFullscreenRef.current) {
        hadNativeFullscreenRef.current = false;
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        handleToggleFullscreen();
      } else if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        setIsGridOpen((prev) => !prev);
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        toggleNarration();
      } else if (e.key === "Escape") {
        if (document.querySelector('[role="dialog"]')) {
          return;
        }
        if (isGridOpen) {
          setIsGridOpen(false);
        } else if (isFullscreen) {
          void exitFullscreen();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    exitFullscreen,
    handleNextSlide,
    handlePrevSlide,
    handleToggleFullscreen,
    isFullscreen,
    isGridOpen,
    toggleNarration,
  ]);

  const filteredDecks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MULTI_GRADE_DECKS.filter((deck) => {
      const matchesLevel = levelFilter === "all" || deck.level === levelFilter;
      if (!matchesLevel) return false;
      if (!q) return true;
      return (
        deck.title.toLowerCase().includes(q) ||
        deck.catalogCode.toLowerCase().includes(q) ||
        deck.topicName.toLowerCase().includes(q) ||
        `lớp ${deck.grade}`.includes(q)
      );
    });
  }, [levelFilter, searchQuery]);

  const jumpToCatalogWithLevel = (lvl: FilterLevel) => {
    setLevelFilter(lvl);
    const el = document.getElementById("kho-bai-giang");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={
        isFullscreen
          ? "h-screen overflow-hidden bg-[#141A23] text-[#FAF8F3]"
          : "min-h-screen flex flex-col bg-[#F4F1EA] text-[#141A23]"
      }
    >
      {/* Top Catalog Header Bar */}
      <header
        className={
          isFullscreen
            ? "hidden"
            : "sticky top-0 z-30 border-b border-[#D5CFC0] bg-[#FAF8F3]"
        }
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-sm bg-[#141A23] text-[#FAF8F3] flex items-center justify-center shrink-0">
              <MonitorIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-[#141A23] truncate">
                Kho Thuyết Trình Tin Học Phổ Thông
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#3E4856]">
                <span className="font-mono font-semibold text-[#1D4ED8] tabular-data">
                  {activeDeck.catalogCode}
                </span>
                <span>·</span>
                <span className="tabular-data">
                  {activeDeck.slideCount} Slide tương tác
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">{activeDeck.bookSeries}</span>
              </div>
            </div>
          </div>

          <nav
            aria-label="Chọn cấp học nhanh"
            className="flex flex-wrap items-center gap-1.5"
          >
            {(
              [
                { id: "all", label: "Tất cả (11)" },
                { id: "tieu-hoc", label: "Tiểu học (3–5)" },
                { id: "thcs", label: "THCS (6–9)" },
                { id: "thpt", label: "THPT (10–12)" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => jumpToCatalogWithLevel(item.id)}
                className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-colors ${
                  levelFilter === item.id
                    ? "bg-[#141A23] text-[#FAF8F3]"
                    : "bg-[#ECE7DB] text-[#3E4856] hover:text-[#141A23] hover:bg-[#E2DCCB]"
                }`}
              >
                {item.label}
              </button>
            ))}
            {activeDeck.id !== "th10-kntt-b01" && (
              <button
                type="button"
                onClick={() => handleSelectDeck("th10-kntt-b01")}
                className="px-2.5 py-1 rounded-sm bg-[#1D4ED8] hover:bg-[#1E40AF] text-xs font-semibold text-[#FAF8F3] transition-colors"
              >
                Mở Tin học 10 Bài 1 (20 Slide)
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={
          isFullscreen
            ? "flex-1 w-full"
            : "flex-1 max-w-[1440px] w-full mx-auto px-2 sm:px-3.5 py-2.5 space-y-5"
        }
      >
        {/* Active Deck Context Strip */}
        <section
          aria-label="Thông tin bài giảng đang mở"
          className={
            isFullscreen
              ? "hidden"
              : "flex flex-wrap items-center justify-between gap-3 rounded-sm border border-[#D5CFC0] bg-[#FAF8F3] px-3.5 py-2"
          }
        >
          <div className="flex flex-wrap items-center gap-2.5 min-w-0">
            <span className="px-2 py-0.5 rounded-sm bg-[#1D4ED8] font-mono text-xs font-semibold text-[#FAF8F3] tabular-data">
              Lớp {activeDeck.grade}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-[#141A23] truncate">
              {activeDeck.lessonNumber}: {activeDeck.title}
            </h2>
            <span className="text-xs text-[#3E4856] hidden md:inline">
              ({activeDeck.topicNumber}: {activeDeck.topicName})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#3E4856]">
            <span className="font-mono font-semibold text-[#141A23] tabular-data">
              {activeDeck.slideCount} Slide · {activeDeck.durationMinutes} phút
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#1D4ED8]">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Hình minh họa trực quan</span>
            </span>
          </div>
        </section>

        {/* Dual-Pane Split Study Workbench (65% Slide Stage / 35% Lab & Study Outline) */}
        <section
          aria-label="Không gian trình chiếu và thực hành đồng bộ"
          className={
            isFullscreen
              ? "w-full h-full"
              : "grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch"
          }
        >
          <div className={isFullscreen ? "w-full h-full" : "lg:col-span-8 flex flex-col"}>
            <SlideStage
              activeDeck={activeDeck}
              slideIndex={safeSlideIndex}
              activeSlide={activeSlide}
              isFullscreen={isFullscreen}
              isGridOpen={isGridOpen}
              narration={narration}
              onSelectSlide={(idx) => setSlideIndex(idx)}
              onPrevSlide={handlePrevSlide}
              onNextSlide={handleNextSlide}
              onToggleFullscreen={handleToggleFullscreen}
              onToggleGrid={() => setIsGridOpen((prev) => !prev)}
            />
          </div>

          <div
            className={
              isFullscreen
                ? "hidden"
                : "lg:col-span-4 flex flex-col lg:max-h-[720px]"
            }
          >
            <StudyWorkbenchPanel
              activeDeck={activeDeck}
              activeSlide={activeSlide}
              narration={narration}
              onSelectSlide={(idx) => {
                setSlideIndex(idx);
                setIsGridOpen(false);
              }}
              onSelectDeck={handleSelectDeck}
            />
          </div>
        </section>

        {/* Multi-Grade Presentation Repository */}
        <section
          id="kho-bai-giang"
          aria-label="Kho bài giảng thuyết trình nhiều cấp học"
          className={
            isFullscreen
              ? "hidden"
              : "rounded-sm border border-[#D5CFC0] bg-[#FAF8F3] overflow-hidden"
          }
        >
          <div className="p-4 sm:p-5 border-b border-[#D5CFC0] flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#ECE7DB]/65">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#141A23]">
                Kho Bài Giảng Thuyết Trình Đa Cấp Học (Lớp 3 – Lớp 12)
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#3E4856] max-w-[70ch]">
                Chọn trực tiếp bất kì bài học nào thuộc bậc Tiểu học, THCS hoặc THPT (Kết nối tri thức) để mở bộ slide trình chiếu tương tác ngay phía trên.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <SearchIcon className="w-3.5 h-3.5 text-[#5A6575] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên bài hoặc mã..."
                  aria-label="Tìm kiếm bài thuyết trình"
                  className="pl-8 pr-3 py-1.5 w-52 rounded-sm border border-[#D5CFC0] bg-[#FFFFFF] text-xs text-[#141A23] placeholder:text-[#5A6575]"
                />
              </div>
              <div className="flex flex-wrap gap-1">
                {(
                  [
                    { id: "all", label: "Tất cả" },
                    { id: "tieu-hoc", label: "Tiểu học" },
                    { id: "thcs", label: "THCS" },
                    { id: "thpt", label: "THPT" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setLevelFilter(tab.id)}
                    className={`px-2.5 py-1.5 rounded-sm text-xs font-semibold transition-colors ${
                      levelFilter === tab.id
                        ? "bg-[#1D4ED8] text-[#FAF8F3]"
                        : "bg-[#FFFFFF] border border-[#D5CFC0] text-[#3E4856] hover:text-[#141A23]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredDecks.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-semibold text-[#141A23]">
                Không tìm thấy bài giảng phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setLevelFilter("all");
                  setSearchQuery("");
                }}
                className="px-3 py-1.5 rounded-sm bg-[#1D4ED8] text-xs font-semibold text-[#FAF8F3]"
              >
                Hiển thị toàn bộ 11 bài giảng
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#D5CFC0]">
              {/* Desktop Column Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-3 px-4 py-2 bg-[#ECE7DB]/45 text-[11px] font-bold text-[#3E4856]">
                <div className="col-span-2">Mã bài</div>
                <div className="col-span-2">Cấp / Khối</div>
                <div className="col-span-5">Tên bài thuyết trình & Nội dung</div>
                <div className="col-span-1 text-right">Số slide</div>
                <div className="col-span-2 text-right">Thao tác</div>
              </div>

              {filteredDecks.map((deck) => {
                const isSelected = deck.id === activeDeck.id;
                return (
                  <div
                    key={deck.id}
                    className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 px-4 py-3 items-center transition-colors ${
                      isSelected ? "bg-[#EFF6FF]" : "hover:bg-[#ECE7DB]/40"
                    }`}
                  >
                    <div className="md:col-span-2 flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#1D4ED8] tabular-data">
                        {deck.catalogCode}
                      </span>
                      {deck.slideCount === 20 && (
                        <span className="px-1.5 py-0.5 rounded-sm bg-[#FEF3C7] text-[#92400E] text-[10px] font-semibold">
                          20 Slide
                        </span>
                      )}
                    </div>

                    <div className="md:col-span-2 text-xs text-[#3E4856]">
                      <span className="font-semibold text-[#141A23]">
                        Lớp {deck.grade}
                      </span>{" "}
                      <span className="text-[#5A6575]">· {deck.levelName.split(" ")[0]}</span>
                    </div>

                    <div className="md:col-span-5 min-w-0">
                      <div className="text-sm font-bold text-[#141A23]">
                        {deck.lessonNumber}: {deck.title}
                      </div>
                      <p className="mt-0.5 text-xs text-[#3E4856] line-clamp-2">
                        {deck.summary}
                      </p>
                    </div>

                    <div className="md:col-span-1 md:text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-sm font-mono text-xs font-semibold tabular-data ${
                          deck.slideCount === 20
                            ? "bg-[#141A23] text-[#FAF8F3]"
                            : "bg-[#ECE7DB] text-[#141A23]"
                        }`}
                      >
                        {deck.slideCount} slide
                      </span>
                    </div>

                    <div className="md:col-span-2 md:text-right pt-1 md:pt-0">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#15803D]">
                          <CheckCircleIcon className="w-4 h-4" />
                          Đang trình chiếu
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectDeck(deck.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm border border-[#1D4ED8] text-xs font-semibold text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-[#FAF8F3] transition-colors"
                        >
                          <span>Mở bài giảng</span>
                          <ArrowRightIcon className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Reference Cheatsheet: Bảng 1.1 & Quick Index of Bài 1 Tin học 10 Exercises */}
        <section
          aria-label="Tài liệu tra cứu nhanh Tin học 10 Bài 1"
          className={
            isFullscreen ? "hidden" : "grid grid-cols-1 lg:grid-cols-12 gap-4"
          }
        >
          {/* Bảng 1.1 Storage Units */}
          <div className="lg:col-span-7 rounded-sm border border-[#D5CFC0] bg-[#FAF8F3] overflow-hidden">
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[#D5CFC0] bg-[#ECE7DB]/65">
              <div className="flex items-center gap-2">
                <BinaryIcon className="w-4 h-4 text-[#1D4ED8]" />
                <h2 className="text-sm font-bold text-[#141A23]">
                  Bảng 1.1: Thang đơn vị lưu trữ dữ liệu (SGK Tin học 10 Trang 8)
                </h2>
              </div>
              <span className="font-mono text-[11px] font-semibold text-[#3E4856] tabular-data">
                Hệ số 2^10 = 1024
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#D5CFC0] bg-[#FAF8F3] text-[#3E4856]">
                    <th className="py-2 px-3 font-bold">Đơn vị</th>
                    <th className="py-2 px-3 font-bold">Kí hiệu</th>
                    <th className="py-2 px-3 font-bold">Lượng dữ liệu</th>
                    <th className="py-2 px-3 font-bold">Ví dụ thực tế</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D4]">
                  {STORAGE_UNITS_TABLE.map((row) => (
                    <tr key={row.symbol} className="hover:bg-[#ECE7DB]/35">
                      <td className="py-1.5 px-3 font-semibold text-[#141A23]">
                        {row.unit}
                      </td>
                      <td className="py-1.5 px-3 font-mono font-bold text-[#1D4ED8]">
                        {row.symbol}
                      </td>
                      <td className="py-1.5 px-3 font-mono text-[#141A23] tabular-data">
                        {row.factorLabel}
                      </td>
                      <td className="py-1.5 px-3 text-[#3E4856]">
                        {row.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Jump Index to Bài 1 Tin học 10 Textbook Tasks */}
          <div className="lg:col-span-5 rounded-sm border border-[#D5CFC0] bg-[#FAF8F3] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-[#D5CFC0] bg-[#ECE7DB]/65">
              <div className="flex items-center gap-2">
                <BookOpenIcon className="w-4 h-4 text-[#15803D]" />
                <h2 className="text-sm font-bold text-[#141A23]">
                  Tra cứu nhanh Bài tập SGK Tin học 10 Bài 1
                </h2>
              </div>
              <span className="font-mono text-[11px] font-semibold text-[#15803D] tabular-data">
                Slide 02–20
              </span>
            </div>
            <div className="divide-y divide-[#E5E0D4] flex-1">
              {[
                {
                  code: "Khởi động (tr.6)",
                  desc: "Vì sao bộ nhớ dùng bit 0/1 mà có thông tin?",
                  slideIdx: 1,
                },
                {
                  code: "Hoạt động 1 (tr.7)",
                  desc: "An, Minh, Khoa — ai nói đúng về dữ liệu?",
                  slideIdx: 4,
                },
                {
                  code: "Câu hỏi 1 & 2 (tr.8)",
                  desc: "Tính độc lập tương đối & Quy đổi 3 MB, 2 GB, 2048 B",
                  slideIdx: 10,
                },
                {
                  code: "Số hóa thư viện (tr.9–10)",
                  desc: "2000 cuốn sách × 50 MB ≈ 97,66 GB < 256 GB",
                  slideIdx: 11,
                },
                {
                  code: "Hoạt động 1 & 2 (tr.9)",
                  desc: "Phân loại & So sánh thiết bị số (Hình 1.2)",
                  slideIdx: 12,
                },
                {
                  code: "Luyện tập 1 (tr.10)",
                  desc: "Rút thông tin & 3 bước tính ĐTB từ bảng điểm",
                  slideIdx: 15,
                },
                {
                  code: "Luyện tập 2 (tr.10)",
                  desc: "Hình 1.3 (545,5 KB/ảnh) — Thẻ nhớ 16 GB chứa ~30.755 ảnh",
                  slideIdx: 16,
                },
                {
                  code: "Vận dụng 1 & 2 (tr.10)",
                  desc: "CCCD gắn chip/QR & Cuộc cách mạng chụp ảnh số",
                  slideIdx: 17,
                },
              ].map((task) => (
                <button
                  key={task.code}
                  type="button"
                  onClick={() => {
                    if (activeDeck.id !== "th10-kntt-b01") {
                      setActiveDeckId("th10-kntt-b01");
                    }
                    setSlideIndex(task.slideIdx);
                    setIsGridOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-[#ECE7DB]/50 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#141A23]">
                      {task.code}
                    </div>
                    <div className="text-xs text-[#3E4856] truncate">
                      {task.desc}
                    </div>
                  </div>
                  <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-sm bg-[#141A23] text-[#FAF8F3] shrink-0 tabular-data">
                    Slide {String(task.slideIdx + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={
          isFullscreen
            ? "hidden"
            : "mt-8 border-t border-[#D5CFC0] bg-[#FAF8F3]"
        }
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#3E4856]">
          <div>
            Kho Thuyết Trình Tin Học Phổ Thông (Tiểu học · THCS · THPT) — Định hướng Kết nối tri thức với cuộc sống (SGK Mới 2026)
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>
              Phím điều khiển: Trái / Phải, F (Toàn màn hình), G (Lưới slide), N (Thuyết minh)
            </span>
            <span className="font-semibold text-[#1D4ED8]">
              Minh họa trực quan · Phòng Lab Bit/Byte &amp; Giải SGK
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
