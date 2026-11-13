import { SlideItem } from "../data/curriculum";

export interface NarrationSegment {
  id: string;
  label: string;
  displayText: string;
  speechText: string;
}

export interface NarrationBuildOptions {
  includeSpeakerNotes?: boolean;
}

/**
 * Chuẩn hóa ký hiệu Tin học, lũy thừa, đơn vị lưu trữ và viết tắt
 * sang câu đọc tiếng Việt tự nhiên cho bộ tổng hợp giọng nói.
 */
export function normalizeVietnameseForSpeech(raw: string): string {
  let text = raw.trim();

  text = text
    .replace(/(\d+)\s*\^\s*(\d+)/g, "$1 mũ $2")
    .replace(/(\d+(?:[.,]\d+)?)\s*TB\b/g, "$1 tê ra bai")
    .replace(/(\d+(?:[.,]\d+)?)\s*GB\b/g, "$1 gi ga bai")
    .replace(/(\d+(?:[.,]\d+)?)\s*MB\b/g, "$1 mê ga bai")
    .replace(/(\d+(?:[.,]\d+)?)\s*KB\b/g, "$1 ki lô bai")
    .replace(/(\d+(?:[.,]\d+)?)\s*B\b/g, "$1 bai")
    .replace(/\b0\/1\b/g, "không và một")
    .replace(/\bSGK\b/g, "sách giáo khoa")
    .replace(/\bTHPT\b/g, "trung học phổ thông")
    .replace(/\bTHCS\b/g, "trung học cơ sở")
    .replace(/\bCCCD\b/g, "căn cước công dân")
    .replace(/\bKNTT\b/g, "Kết nối tri thức")
    .replace(/\bUTF-8\b/gi, "U T F 8")
    .replace(/\bASCII\b/gi, "A S C I I")
    .replace(/\bHĐ(\d+)\b/g, "Hoạt động $1")
    .replace(/\btr\.?\s*(\d+)(?:\s*[-–]\s*(\d+))?/gi, (_m, p1, p2) =>
      p2 ? `trang ${p1} đến ${p2}` : `trang ${p1}`
    )
    .replace(/≈/g, " xấp xỉ ")
    .replace(/→|->/g, ", dẫn tới ")
    .replace(/\|/g, ". ")
    .replace(/×/g, " nhân ")
    .replace(/÷/g, " chia ")
    .replace(/=/g, " bằng ")
    .replace(/</g, " nhỏ hơn ")
    .replace(/>/g, " lớn hơn ")
    .replace(/[•▪]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text;
}

function splitTextToClauses(input: string, maxChars = 175): string[] {
  const cleaned = input.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];

  const sentenceParts = cleaned
    .split(/(?<=[.!?;])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks: string[] = [];

  for (const part of sentenceParts) {
    if (part.length <= maxChars) {
      if (
        chunks.length > 0 &&
        chunks[chunks.length - 1].length + 1 + part.length <= maxChars
      ) {
        chunks[chunks.length - 1] = `${chunks[chunks.length - 1]} ${part}`;
      } else {
        chunks.push(part);
      }
      continue;
    }

    const subClauses = part
      .split(/(?<=,)\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    let buffer = "";
    for (const clause of subClauses) {
      if (!buffer) {
        buffer = clause;
      } else if (buffer.length + 1 + clause.length <= maxChars) {
        buffer = `${buffer} ${clause}`;
      } else {
        chunks.push(buffer);
        buffer = clause;
      }
    }
    if (buffer) {
      chunks.push(buffer);
    }
  }

  return chunks;
}

function pushChunks(
  target: NarrationSegment[],
  idPrefix: string,
  label: string,
  rawDisplayText: string
) {
  const clauses = splitTextToClauses(rawDisplayText);
  clauses.forEach((clause, idx) => {
    const speechText = normalizeVietnameseForSpeech(clause);
    if (!speechText) return;
    target.push({
      id: `${idPrefix}-${idx}`,
      label,
      displayText: clause,
      speechText,
    });
  });
}

/**
 * Tạo kịch bản thuyết minh tiếng Việt chia nhỏ theo từng câu/đoạn
 * cho một slide cụ thể (tương thích mọi bài học Tiểu học, THCS, THPT).
 */
export function buildSlideNarrationSegments(
  slide: SlideItem,
  options: NarrationBuildOptions = {}
): NarrationSegment[] {
  const { includeSpeakerNotes = true } = options;
  const segments: NarrationSegment[] = [];

  pushChunks(
    segments,
    `${slide.code}-intro`,
    `Mở đầu Slide ${slide.id}`,
    `Slide ${slide.id}, ${slide.sectionLabel}. ${slide.title}. ${slide.subtitle}`
  );

  slide.keyPoints.forEach((kp, idx) => {
    const formulaText =
      kp.formulaOrCode && kp.formulaOrCode.length <= 90
        ? ` Biểu thức: ${kp.formulaOrCode}.`
        : "";
    pushChunks(
      segments,
      `${slide.code}-kp-${idx}`,
      kp.heading,
      `${kp.heading}: ${kp.body}${formulaText}`
    );
  });

  if (slide.knowledgeBox) {
    pushChunks(
      segments,
      `${slide.code}-kb`,
      "Kiến thức trọng tâm",
      `${slide.knowledgeBox.title}. ${slide.knowledgeBox.bullets.join(". ")}`
    );
  }

  if (slide.textbookTask) {
    pushChunks(
      segments,
      `${slide.code}-task`,
      `${slide.textbookTask.badge} ${slide.textbookTask.page}`,
      `${slide.textbookTask.badge} ${slide.textbookTask.page}: ${slide.textbookTask.prompt} Kết luận: ${slide.textbookTask.conclusion}`
    );
  }

  if (includeSpeakerNotes && slide.speakerNotes) {
    pushChunks(
      segments,
      `${slide.code}-notes`,
      "Ghi chú tự học",
      `Ghi chú: ${slide.speakerNotes}`
    );
  }

  return segments;
}

/**
 * Ưu tiên chọn giọng đọc tiếng Việt tự nhiên (Microsoft Hoài My / Nam Minh,
 * Google Tiếng Việt hoặc các giọng `vi-VN` có sẵn trong trình duyệt).
 */
export function selectBestVietnameseVoice(
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  const viVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith("vi")
  );
  if (viVoices.length === 0) return null;

  const scoreVoice = (v: SpeechSynthesisVoice): number => {
    const name = v.name.toLowerCase();
    let score = 0;
    if (name.includes("natural")) score += 50;
    if (name.includes("online")) score += 30;
    if (name.includes("hoaimy") || name.includes("hoài my")) score += 25;
    if (name.includes("namminh") || name.includes("nam minh")) score += 20;
    if (name.includes("google")) score += 20;
    if (name.includes("microsoft")) score += 10;
    if (v.default) score += 5;
    if (!v.localService) score += 2;
    return score;
  };

  return [...viVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
}

/**
 * Ước lượng thời gian hiển thị mỗi đoạn khi chạy ở chế độ phụ đề tự động
 * (khi thiết bị không có giọng đọc tiếng Việt tích hợp).
 */
export function estimateReadingDurationMs(
  displayText: string,
  rate: number
): number {
  const safeRate = rate > 0 ? rate : 1;
  const rawMs = (displayText.length * 55) / safeRate + 900;
  return Math.min(9500, Math.max(2400, Math.round(rawMs)));
}
