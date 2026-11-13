"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MULTI_GRADE_DECKS,
  PresentationDeck,
  SLIDE_CHAPTERS,
  SlideItem,
} from "../data/curriculum";
import {
  BookOpenIcon,
  CalculatorIcon,
  CheckCircleIcon,
  ImageIcon,
  LayersIcon,
} from "./Icons";

interface StudyWorkbenchPanelProps {
  activeDeck: PresentationDeck;
  activeSlide: SlideItem;
  onSelectSlide: (slideIndex: number) => void;
  onSelectDeck: (deckId: string) => void;
}

type WorkbenchTab = "outline" | "bitlab" | "notes" | "catalog";

export default function StudyWorkbenchPanel({
  activeDeck,
  activeSlide,
  onSelectSlide,
  onSelectDeck,
}: StudyWorkbenchPanelProps) {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>("outline");

  // Bit Lab states
  const [sampleText, setSampleText] = useState<string>("TIN 10");
  const [labAmount, setLabAmount] = useState<number>(16);
  const [labUnit, setLabUnit] = useState<"B" | "KB" | "MB" | "GB" | "TB">("GB");

  // Encode text into bytes via UTF-8
  const textEncoder = new TextEncoder();
  const encodedChars = Array.from((sampleText || "").slice(0, 10)).map((ch) => {
    const bytes = Array.from(textEncoder.encode(ch));
    const bin = bytes.map((b) => b.toString(2).padStart(8, "0")).join(" ");
    const hex = bytes.map((b) => b.toString(16).toUpperCase().padStart(2, "0")).join(" ");
    return {
      char: ch === " " ? "[Space]" : ch,
      byteCount: bytes.length,
      hex,
      bin,
    };
  });
  const totalTextBytes = encodedChars.reduce((sum, c) => sum + c.byteCount, 0);

  // Compute unit conversions in bytes
  const unitPowers: Record<"B" | "KB" | "MB" | "GB" | "TB", number> = {
    B: 1,
    KB: 1024,
    MB: Math.pow(1024, 2),
    GB: Math.pow(1024, 3),
    TB: Math.pow(1024, 4),
  };
  const safeLabAmount = Number.isFinite(labAmount) && labAmount >= 0 ? labAmount : 0;
  const baseBytes = safeLabAmount * unitPowers[labUnit];

  const formatMetric = (val: number) => {
    if (val === 0) return "0";
    if (val >= 1 && Number.isInteger(val) && val < 1e12) {
      return val.toLocaleString("vi-VN");
    }
    if (val >= 0.001 && val < 1e12) {
      return val.toLocaleString("vi-VN", { maximumFractionDigits: 4 });
    }
    return val.toExponential(3);
  };

  const unitRows = [
    { symbol: "bit", label: "Bit", val: baseBytes * 8 },
    { symbol: "B", label: "Byte", val: baseBytes },
    { symbol: "KB", label: "Kilobyte", val: baseBytes / 1024 },
    { symbol: "MB", label: "Megabyte", val: baseBytes / Math.pow(1024, 2) },
    { symbol: "GB", label: "Gigabyte", val: baseBytes / Math.pow(1024, 3) },
    { symbol: "TB", label: "Terabyte", val: baseBytes / Math.pow(1024, 4) },
  ];

  const textbookIndex = activeDeck.slides
    .map((s, idx) => ({ slide: s, idx }))
    .filter((item) => Boolean(item.slide.textbookTask));

  const tabs: {
    id: WorkbenchTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "outline",
      label: "Mục lục",
      icon: <ImageIcon className="w-3.5 h-3.5 shrink-0" />,
    },
    {
      id: "bitlab",
      label: "Bit & Byte",
      icon: <CalculatorIcon className="w-3.5 h-3.5 shrink-0" />,
    },
    {
      id: "notes",
      label: "Giải SGK",
      icon: <BookOpenIcon className="w-3.5 h-3.5 shrink-0" />,
    },
    {
      id: "catalog",
      label: "Kho lớp",
      icon: <LayersIcon className="w-3.5 h-3.5 shrink-0" />,
    },
  ];

  return (
    <aside
      aria-label="Bảng thực hành học tập đồng bộ"
      className="flex flex-col rounded-sm border border-[#D5CFC0] bg-[#FAF8F3] overflow-hidden h-full"
    >
      {/* Workbench Tab Switcher */}
      <div
        role="tablist"
        aria-label="Chế độ bảng thực hành"
        className="grid grid-cols-4 border-b border-[#D5CFC0] bg-[#ECE7DB]"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-1 px-1.5 py-2.5 text-[11px] xl:text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "border-[#1D4ED8] bg-[#FAF8F3] text-[#1D4ED8]"
                  : "border-transparent text-[#3E4856] hover:text-[#141A23] hover:bg-[#FAF8F3]/60"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: SLIDE OUTLINE & VISUAL GALLERY */}
        {activeTab === "outline" && (
          <div className="space-y-3.5">
            {/* Current Slide Visual Preview & Notes */}
            <div className="rounded-sm border border-[#D5CFC0] bg-[#FFFFFF] overflow-hidden">
              <div className="relative aspect-video w-full bg-[#141A23] overflow-hidden border-b border-[#D5CFC0]">
                <Image
                  src={activeSlide.imageUrl}
                  alt={activeSlide.imageCaption}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="p-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#1D4ED8] tabular-data">
                    {activeSlide.code} · Slide {String(activeSlide.id).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-semibold text-[#5A6575]">
                    {activeSlide.sectionLabel}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[#141A23] font-medium">
                  {activeSlide.imageCaption}
                </p>
                <div className="pt-1.5 border-t border-[#E5E0D4] text-xs leading-relaxed text-[#3E4856]">
                  <strong className="text-[#141A23]">Ghi chú tự học:</strong>{" "}
                  {activeSlide.speakerNotes}
                </div>
              </div>
            </div>

            {activeDeck.id === "th10-kntt-b01" ? (
              <div>
                <h3 className="text-xs font-bold text-[#141A23] mb-2">
                  Mục lục hình ảnh &amp; chặng bài 20 Slide
                </h3>
                <div className="divide-y divide-[#D5CFC0] rounded-sm border border-[#D5CFC0] bg-[#FFFFFF]">
                  {SLIDE_CHAPTERS.map((chap, idx) => {
                    const nextStart =
                      idx + 1 < SLIDE_CHAPTERS.length
                        ? SLIDE_CHAPTERS[idx + 1].slideIdx
                        : activeDeck.slides.length;
                    const currentIdx = activeSlide.id - 1;
                    const isCurrent =
                      currentIdx >= chap.slideIdx && currentIdx < nextStart;
                    return (
                      <button
                        key={chap.label}
                        type="button"
                        onClick={() => onSelectSlide(chap.slideIdx)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-left text-xs transition-colors ${
                          isCurrent
                            ? "bg-[#DBEAFE] text-[#1E3A8A] font-semibold"
                            : "text-[#3E4856] hover:bg-[#ECE7DB]"
                        }`}
                      >
                        <div className="relative w-12 h-7 rounded-sm overflow-hidden border border-[#D5CFC0] bg-[#141A23] shrink-0">
                          <Image
                            src={chap.imageUrl}
                            alt={chap.label}
                            fill
                            sizes="48px"
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate">{chap.label}</div>
                          <div className="font-mono text-[10px] opacity-80 tabular-data">
                            {chap.rangeLabel}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xs font-bold text-[#141A23] mb-2">
                  Danh sách {activeDeck.slideCount} Slide minh họa ({activeDeck.catalogCode})
                </h3>
                <div className="divide-y divide-[#D5CFC0] rounded-sm border border-[#D5CFC0] bg-[#FFFFFF]">
                  {activeDeck.slides.map((s, idx) => {
                    const isCurrent = s.id === activeSlide.id;
                    return (
                      <button
                        key={s.code}
                        type="button"
                        onClick={() => onSelectSlide(idx)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-left text-xs transition-colors ${
                          isCurrent
                            ? "bg-[#DBEAFE] text-[#1E3A8A] font-semibold"
                            : "text-[#3E4856] hover:bg-[#ECE7DB]"
                        }`}
                      >
                        <div className="relative w-12 h-7 rounded-sm overflow-hidden border border-[#D5CFC0] bg-[#141A23] shrink-0">
                          <Image
                            src={s.imageUrl}
                            alt={s.title}
                            fill
                            sizes="48px"
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate">{s.title}</div>
                          <div className="font-mono text-[10px] opacity-80 tabular-data">
                            Slide {String(s.id).padStart(2, "0")}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 rounded-sm border border-[#D5CFC0] bg-[#ECE7DB] p-3 space-y-2">
                  <p className="text-xs leading-relaxed text-[#3E4856]">
                    Muốn học bộ đầy đủ 20 slide + phòng thí nghiệm Bit/Byte?
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectDeck("th10-kntt-b01")}
                    className="px-3 py-1.5 rounded-sm bg-[#1D4ED8] hover:bg-[#1E40AF] text-xs font-semibold text-[#FAF8F3] transition-colors"
                  >
                    Mở Tin học 10 Bài 1 (20 Slide)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BIT/BYTE LAB */}
        {activeTab === "bitlab" && (
          <div className="space-y-4">
            {/* Subtool 1: Text to binary */}
            <div className="rounded-sm border border-[#D5CFC0] bg-[#FAF8F3] p-3 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xs font-bold text-[#141A23]">
                  1. Mã hóa văn bản sang Bit (UTF-8 / ASCII)
                </h2>
                <span className="font-mono text-[11px] text-[#1D4ED8] font-semibold tabular-data">
                  {totalTextBytes} B = {totalTextBytes * 8} bit
                </span>
              </div>
              <input
                type="text"
                maxLength={10}
                aria-label="Nhập văn bản ngắn để chuyển sang nhị phân"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="Nhập chữ (vd: TIN 10)"
                className="w-full rounded-sm border border-[#D5CFC0] bg-[#FFFFFF] px-2.5 py-1.5 font-mono text-xs text-[#141A23]"
              />
              <div className="divide-y divide-[#E5E0D4] rounded-sm border border-[#D5CFC0] bg-[#FFFFFF]">
                {encodedChars.length === 0 ? (
                  <div className="p-2.5 text-xs text-[#5A6575]">
                    Nhập ít nhất 1 kí tự để xem biểu diễn nhị phân trong bộ nhớ.
                  </div>
                ) : (
                  encodedChars.map((item, i) => (
                    <div
                      key={`${item.char}-${i}`}
                      className="flex items-center justify-between gap-2 px-2.5 py-1.5 text-xs"
                    >
                      <span className="font-mono font-bold text-[#141A23] w-16 truncate">
                        {item.char}
                      </span>
                      <span className="font-mono text-[11px] text-[#5A6575] tabular-data">
                        0x{item.hex}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-[#1D4ED8] tabular-data truncate">
                        {item.bin}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Subtool 2: Segmented Tabular Unit Converter */}
            <div className="rounded-sm border border-[#D5CFC0] bg-[#FAF8F3] p-3 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xs font-bold text-[#141A23]">
                  2. Bảng quy đổi đơn vị (2^10 = 1024)
                </h2>
                <div className="flex gap-1">
                  {[
                    { label: "3 MB", val: 3, u: "MB" as const },
                    { label: "2 GB", val: 2, u: "GB" as const },
                    { label: "2048 B", val: 2048, u: "B" as const },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setLabAmount(preset.val);
                        setLabUnit(preset.u);
                      }}
                      className="px-1.5 py-0.5 rounded-sm border border-[#D5CFC0] bg-[#ECE7DB] hover:border-[#1D4ED8] font-mono text-[10px] font-semibold text-[#141A23]"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  min={0}
                  aria-label="Số lượng dữ liệu quy đổi"
                  value={labAmount}
                  onChange={(e) => setLabAmount(Number(e.target.value))}
                  className="w-28 rounded-sm border border-[#D5CFC0] bg-[#FFFFFF] px-2.5 py-1.5 font-mono text-xs text-[#141A23] tabular-data"
                />
                <select
                  aria-label="Chọn đơn vị gốc"
                  value={labUnit}
                  onChange={(e) =>
                    setLabUnit(
                      e.target.value as "B" | "KB" | "MB" | "GB" | "TB"
                    )
                  }
                  className="flex-1 rounded-sm border border-[#D5CFC0] bg-[#FFFFFF] px-2.5 py-1.5 font-mono text-xs text-[#141A23]"
                >
                  <option value="B">Byte (B)</option>
                  <option value="KB">Kilobyte (KB)</option>
                  <option value="MB">Megabyte (MB)</option>
                  <option value="GB">Gigabyte (GB)</option>
                  <option value="TB">Terabyte (TB)</option>
                </select>
              </div>

              <div className="divide-y divide-[#E5E0D4] rounded-sm border border-[#D5CFC0] bg-[#FFFFFF]">
                {unitRows.map((row) => {
                  const isSource = row.symbol === labUnit;
                  return (
                    <div
                      key={row.symbol}
                      className={`flex items-center justify-between gap-2 px-3 py-1.5 text-xs ${
                        isSource ? "bg-[#DBEAFE]/55 font-semibold" : ""
                      }`}
                    >
                      <span className="text-[#3E4856]">
                        {row.label}{" "}
                        <span className="font-mono text-[11px] text-[#5A6575]">
                          ({row.symbol})
                        </span>
                      </span>
                      <span className="font-mono text-[#141A23] tabular-data">
                        {formatMetric(row.val)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SPEAKER NOTES & TEXTBOOK SOLUTIONS */}
        {activeTab === "notes" && (
          <div className="space-y-4">
            <div className="rounded-sm border border-[#D5CFC0] bg-[#FFFFFF] p-3 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xs font-bold text-[#141A23]">
                  Ghi chú học tập — Slide {String(activeSlide.id).padStart(2, "0")}
                </h2>
                <span className="font-mono text-[11px] text-[#1D4ED8] font-semibold">
                  {activeSlide.code}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#3E4856]">
                {activeSlide.speakerNotes}
              </p>
            </div>

            {activeSlide.knowledgeBox && (
              <div className="rounded-sm border border-[#1D4ED8]/35 bg-[#EFF6FF] p-3 space-y-1.5">
                <h3 className="text-xs font-bold text-[#1E3A8A]">
                  {activeSlide.knowledgeBox.title}
                </h3>
                <ul className="space-y-1 text-xs text-[#1E3A8A]">
                  {activeSlide.knowledgeBox.bullets.map((b, i) => (
                    <li key={i} className="leading-relaxed">
                      • {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeSlide.textbookTask && (
              <div className="rounded-sm border border-[#15803D]/40 bg-[#F0FDF4] p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold text-[#14532D]">
                    {activeSlide.textbookTask.badge} ({activeSlide.textbookTask.page})
                  </h3>
                  <CheckCircleIcon className="w-4 h-4 text-[#15803D]" />
                </div>
                <p className="text-xs font-medium text-[#141A23]">
                  {activeSlide.textbookTask.prompt}
                </p>
                <ol className="space-y-1 text-xs text-[#14532D] list-decimal list-inside">
                  {activeSlide.textbookTask.solutionSteps.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
                <div className="pt-1 border-t border-[#15803D]/20 text-xs font-semibold text-[#14532D]">
                  Kết luận: {activeSlide.textbookTask.conclusion}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xs font-bold text-[#141A23] mb-2">
                Mục lục bài tập SGK trong bài giảng này
              </h3>
              {textbookIndex.length === 0 ? (
                <p className="text-xs text-[#5A6575]">
                  Không có bài tập SGK đính kèm trong bộ slide này.
                </p>
              ) : (
                <div className="divide-y divide-[#D5CFC0] rounded-sm border border-[#D5CFC0] bg-[#FFFFFF]">
                  {textbookIndex.map(({ slide, idx }) => (
                    <button
                      key={slide.code}
                      type="button"
                      onClick={() => onSelectSlide(idx)}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-xs transition-colors ${
                        activeSlide.id === slide.id
                          ? "bg-[#DBEAFE] text-[#1E3A8A] font-semibold"
                          : "text-[#3E4856] hover:bg-[#ECE7DB]"
                      }`}
                    >
                      <span className="truncate">
                        {slide.textbookTask?.badge}: {slide.title}
                      </span>
                      <span className="font-mono text-[11px] shrink-0 tabular-data">
                        S{String(slide.id).padStart(2, "0")}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: QUICK MULTI-GRADE CATALOG */}
        {activeTab === "catalog" && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-[#141A23]">
              Chuyển nhanh bài giảng theo cấp học
            </h2>
            {(["thpt", "thcs", "tieu-hoc"] as const).map((lvl) => {
              const items = MULTI_GRADE_DECKS.filter((d) => d.level === lvl);
              const label =
                lvl === "thpt"
                  ? "THPT (Lớp 10–12)"
                  : lvl === "thcs"
                  ? "THCS (Lớp 6–9)"
                  : "Tiểu học (Lớp 3–5)";
              return (
                <div key={lvl} className="space-y-1.5">
                  <div className="text-[11px] font-bold text-[#5A6575]">
                    {label}
                  </div>
                  <div className="divide-y divide-[#D5CFC0] rounded-sm border border-[#D5CFC0] bg-[#FFFFFF]">
                    {items.map((deck) => {
                      const isSelected = deck.id === activeDeck.id;
                      return (
                        <button
                          key={deck.id}
                          type="button"
                          onClick={() => onSelectDeck(deck.id)}
                          className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-xs transition-colors ${
                            isSelected
                              ? "bg-[#DBEAFE] text-[#1E3A8A] font-semibold"
                              : "text-[#141A23] hover:bg-[#ECE7DB]"
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="truncate">
                              Lớp {deck.grade} · {deck.lessonNumber}: {deck.title}
                            </div>
                            <div className="font-mono text-[10px] text-[#5A6575]">
                              {deck.catalogCode}
                            </div>
                          </div>
                          <span className="font-mono text-[11px] shrink-0 px-1.5 py-0.5 rounded-sm bg-[#ECE7DB] text-[#141A23] tabular-data">
                            {deck.slideCount} slide
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
