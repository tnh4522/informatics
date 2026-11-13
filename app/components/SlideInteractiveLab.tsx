"use client";

import React, { useState } from "react";
import {
  InteractiveWidgetKind,
  LESSON_1_QUIZ_QUESTIONS,
  STORAGE_UNITS_TABLE,
} from "../data/curriculum";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  RotateCcwIcon,
} from "./Icons";

interface SlideInteractiveLabProps {
  widgetType?: InteractiveWidgetKind;
  isFullscreen?: boolean;
  onJumpToSlide?: (slideIndex: number) => void;
}

const PIPELINE_SCENARIOS = [
  {
    id: "weather",
    title: "Tra cứu thời tiết",
    input: "Nhập tên thành phố 'Hà Nội' từ bàn phím",
    process: "Máy chủ đối chiếu dữ liệu cảm biến khí tượng & tính toán dự báo",
    output: "Hiển thị '29°C — Trời nắng nhẹ' trên màn hình điện thoại",
  },
  {
    id: "gpa",
    title: "Tính điểm trung bình",
    input: "Nhập điểm các môn: Toán 8,5; Tin 9,5; Văn 8,0",
    process: "CPU cộng tổng các con số rồi chia cho số lượng môn học",
    output: "Xuất kết quả Điểm trung bình: 8,7 (Xếp loại Tốt)",
  },
  {
    id: "photo",
    title: "Xử lí ảnh số",
    input: "Cảm biến máy ảnh thu ánh sáng thành ma trận điểm ảnh (pixel)",
    process: "Chip xử lí ảnh cân bằng sáng, khử nhiễu và nén tệp JPG",
    output: "Lưu tệp IMG_01.jpg vào thẻ nhớ & hiển thị lên màn hình",
  },
];

const CONTEXT_MODES = [
  {
    id: "score" as const,
    label: "Ngữ cảnh: Bảng điểm",
    raw: "08",
    meaning: "Điểm kiểm tra 15 phút môn Tin học: 08 điểm (mức Khá)",
    status: "valid",
  },
  {
    id: "order" as const,
    label: "Ngữ cảnh: Danh sách lớp",
    raw: "08",
    meaning: "Số thứ tự 08 trong sổ điểm lớp 10A2",
    status: "valid",
  },
  {
    id: "date" as const,
    label: "Ngữ cảnh: Lịch học",
    raw: "08/09/2026",
    meaning: "Ngày 08 tháng 09 năm 2026 — Tiết thực hành đầu năm",
    status: "valid",
  },
  {
    id: "broken" as const,
    label: "Mất ngữ cảnh / Lỗi",
    raw: "08",
    meaning: "Thiếu nhãn tiêu đề cột -> Không thể kết luận đó là điểm, tuổi hay số báo danh (mất tính toàn vẹn)",
    status: "warning",
  },
];

const DEVICE_PAIRS = [
  {
    id: "watch",
    name: "Đồng hồ cơ vs Đồng hồ thông minh",
    category: "Thiết bị thường -> Thiết bị số",
    common: "Đều thực hiện chức năng xem giờ, phút, ngày tháng.",
    manual: "Chạy bằng bánh răng cơ học hoặc pin quartz; chỉ báo giờ, chỉnh tay bằng núm vặn.",
    digital:
      "Có bộ vi xử lí & cảm biến: đồng bộ giờ qua Internet, đo nhịp tim, đếm bước chân, nhận thông báo từ điện thoại.",
  },
  {
    id: "fan",
    name: "Quạt điện cơ vs Quạt thông minh",
    category: "Thiết bị thường -> Thiết bị số",
    common: "Đều làm quay cánh quạt tạo luồng gió làm mát không khí.",
    manual: "Điều khiển trực tiếp bằng nút bấm tốc độ cố định (1, 2, 3) trên thân quạt.",
    digital:
      "Tích hợp chip điều khiển: hẹn giờ theo lịch, tạo gió tự nhiên theo nhiệt độ phòng, điều khiển qua Wi-Fi/giọng nói.",
  },
  {
    id: "wifi",
    name: "Bộ thu phát Wi-Fi, Thẻ nhớ & Laptop",
    category: "Thuần thiết bị số (Hình 1.2)",
    common: "Đều là các thiết bị số làm việc trực tiếp với dãy bit 0 và 1.",
    manual: "Không có phiên bản cơ học tương đương hoàn toàn ở quy mô truyền tin số.",
    digital:
      "Thẻ nhớ đảm nhiệm lưu trữ; Bộ thu phát Wi-Fi đảm nhiệm truyền dữ liệu; Laptop thực hiện lưu trữ, xử lí và truyền tin toàn diện.",
  },
];

const COMPARISON_ASPECTS = [
  {
    id: "transmit" as const,
    label: "Truyền tin (Thư tay vs Email)",
    manualTitle: "Thư bưu điện truyền thống",
    manualPoints: [
      "Mất nhiều ngày đến vài tuần mới tới tay người nhận.",
      "Tốn chi phí phong bì, tem thư và phụ thuộc khoảng cách địa lí.",
      "Khó đính kèm ảnh gốc, âm thanh hoặc tệp tài liệu lớn.",
    ],
    digitalTitle: "Thư điện tử (Email) & Mạng số",
    digitalPoints: [
      "Truyền tức thời chỉ trong vài giây đi khắp toàn cầu.",
      "Chi phí gần như bằng 0 khi đã có kết nối Internet.",
      "Đính kèm dễ dàng tệp văn bản, bảng tính, ảnh và video.",
    ],
  },
  {
    id: "storage" as const,
    label: "Lưu trữ dữ liệu",
    manualTitle: "Sổ sách & Kho giấy tờ",
    manualPoints: [
      "Chiếm diện tích tủ kệ lớn, nặng nề khi di chuyển.",
      "Dễ ẩm mốc, mối mọt, phai mực theo thời gian.",
    ],
    digitalTitle: "Thẻ nhớ, Ổ cứng & Đám mây",
    digitalPoints: [
      "Một thẻ nhớ nhỏ chứa hàng nghìn cuốn sách (~97,66 GB cho 2000 sách).",
      "Chi phí mỗi GB rất thấp, sao lưu dự phòng nhiều nơi an toàn.",
    ],
  },
  {
    id: "process" as const,
    label: "Xử lí & Tính toán",
    manualTitle: "Tính nhẩm / Ghi chép thủ công",
    manualPoints: [
      "Tốc độ chậm, dễ sai sót khi khối lượng dữ liệu lớn.",
      "Mỗi lần lọc danh sách hay thống kê phải dò lại từ đầu.",
    ],
    digitalTitle: "Bộ vi xử lí (CPU) thiết bị số",
    digitalPoints: [
      "Thực hiện hàng tỉ phép tính/giây với độ chính xác và ổn định cao.",
      "Tự động hóa lập lịch, sắp xếp, thống kê trong nháy mắt.",
    ],
  },
  {
    id: "search" as const,
    label: "Tìm kiếm & Chỉnh sửa",
    manualTitle: "Lật tìm từng trang giấy",
    manualPoints: [
      "Mất nhiều thời gian tìm một dòng thông tin trong hàng trăm trang.",
      "Sửa sai phải gạch xóa hoặc viết lại toàn bộ trang mới.",
    ],
    digitalTitle: "Tìm kiếm từ khóa & Biên tập số",
    digitalPoints: [
      "Tìm đúng từ khóa trong tích tắc giữa hàng triệu trang tài liệu.",
      "Chỉnh sửa, sao chép, chia sẻ nguyên bản không làm hỏng bản gốc.",
    ],
  },
];

export default function SlideInteractiveLab({
  widgetType,
  isFullscreen = false,
  onJumpToSlide,
}: SlideInteractiveLabProps) {
  const boxCls = `rounded-sm border border-[#2C384B] bg-[#141A23] ${
    isFullscreen ? "mt-0 p-2.5 sm:p-3" : "mt-2.5 p-3"
  }`;
  const labelCls = isFullscreen ? "text-base" : "text-sm";
  const bodyCls = isFullscreen ? "text-base" : "text-sm";
  const subCls = isFullscreen ? "text-sm" : "text-xs sm:text-sm";
  const emphasisCls = isFullscreen ? "text-lg" : "text-base";

  // Slide 2: Warmup text -> bits
  const [warmupText, setWarmupText] = useState("TIN 10");

  // Slide 3: Pipeline
  const [pipelineIdx, setPipelineIdx] = useState(0);

  // Slide 5: Activity 1 debate
  const [selectedStudent, setSelectedStudent] = useState<
    "an" | "minh" | "khoa" | "all"
  >("all");

  // Slide 6: Multi-form info
  const [infoForm, setInfoForm] = useState<
    "text" | "sign" | "audio" | "binary"
  >("sign");

  // Slide 7: Context integrity
  const [contextId, setContextId] = useState<
    "score" | "order" | "date" | "broken"
  >("score");

  // Slide 9: 8-bit toggle
  const [bits, setBits] = useState<number[]>([0, 1, 0, 0, 0, 0, 0, 1]); // 'A' = 65

  // Slide 10: Unit ladder
  const [unitIdx, setUnitIdx] = useState(3); // MB default

  // Slide 11: Unit converter to KB
  const [convVal, setConvVal] = useState(3);
  const [convUnit, setConvUnit] = useState<"B" | "KB" | "MB" | "GB">("MB");

  // Slide 12: Library digitization
  const [bookCount, setBookCount] = useState(2000);
  const [mbPerBook, setMbPerBook] = useState(50);

  // Slide 13: Device Activity 2
  const [devicePairIdx, setDevicePairIdx] = useState(0);

  // Slide 14: Device Comparison
  const [compAspect, setCompAspect] = useState<
    "transmit" | "storage" | "process" | "search"
  >("transmit");

  // Slide 16: Gradebook
  const [scores, setScores] = useState({
    toan: 8.5,
    van: 8.0,
    anh: 8.5,
    tin: 9.5,
    ly: 7.5,
  });

  // Slide 17: 16GB SD Card
  const [sdCapacityGb, setSdCapacityGb] = useState(16);
  const [avgPhotoKb, setAvgPhotoKb] = useState(545.5);

  // Slide 18: CCCD chip
  const [cccdLayer, setCccdLayer] = useState<"print" | "qr" | "chip">("chip");

  // Slide 19: Photo revolution
  const [photoTab, setPhotoTab] = useState<
    "storage" | "preview" | "edit" | "share"
  >("storage");

  // Slide 20: Final quiz
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  if (!widgetType) return null;

  // Slide 1: Roadmap overview
  if (widgetType === "roadmap-overview") {
    const sections = [
      {
        part: "Phần 1 (Slide 03–08)",
        label: "Thông tin & Dữ liệu",
        detail: "Hình 1.1, Hoạt động 1 tr.7, Câu hỏi 1–2 tr.8",
        slideIdx: 2,
      },
      {
        part: "Phần 2 (Slide 09–12)",
        label: "Đơn vị lưu trữ dữ liệu",
        detail: "Bit, Byte, Bảng 1.1 (2^10), Quy đổi & Số hóa 2000 sách",
        slideIdx: 8,
      },
      {
        part: "Phần 3 (Slide 13–15)",
        label: "Ưu việt của thiết bị số",
        detail: "Hoạt động 1–2 tr.9 (Hình 1.2), Bưu điện vs Email",
        slideIdx: 12,
      },
      {
        part: "Phần 4 (Slide 16–20)",
        label: "Luyện tập, Vận dụng & Trắc nghiệm",
        detail: "Bảng điểm, Thẻ nhớ 16 GB, CCCD chip, Chụp ảnh số, Quiz",
        slideIdx: 15,
      },
    ];
    return (
      <div className={boxCls}>
        <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#2C384B]">
          <span className={`font-semibold text-[#CBD5E1] ${labelCls}`}>
            Bản đồ 20 Slide theo tiến trình chuẩn SGK Kết nối tri thức
          </span>
          <span className={`font-mono text-[#93C5FD] tabular-data shrink-0 ${subCls}`}>
            04 Chặng · 20 Slide
          </span>
        </div>
        <div
          className={`mt-2 grid gap-1.5 ${
            isFullscreen
              ? "grid-cols-2 sm:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 gap-2"
          }`}
        >
          {sections.map((sec) => (
            <button
              key={sec.part}
              type="button"
              onClick={() => onJumpToSlide?.(sec.slideIdx)}
              className={`group text-left rounded-sm border border-[#2C384B] bg-[#1C2431] hover:border-[#3B82F6] hover:bg-[#1E2A3B] transition-colors ${
                isFullscreen ? "px-2.5 py-1.5" : "px-3 py-2"
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className={`font-mono text-[#93C5FD] tabular-data truncate ${isFullscreen ? "text-xs" : subCls}`}>
                  {sec.part}
                </span>
                <ArrowRightIcon className="w-3.5 h-3.5 shrink-0 text-[#94A3B8] group-hover:text-[#93C5FD] transition-colors" />
              </div>
              <div
                className={`mt-0.5 font-semibold text-[#FAF8F3] leading-snug ${
                  isFullscreen ? "text-sm sm:text-base" : emphasisCls
                }`}
              >
                {sec.label}
              </div>
              <div
                className={`mt-0.5 text-[#94A3B8] leading-snug ${
                  isFullscreen ? "text-xs line-clamp-2" : subCls
                }`}
              >
                {sec.detail}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Slide 2: Warmup Bit Reveal
  if (widgetType === "warmup-bit-reveal") {
    const cleanChars = Array.from((warmupText || "TIN").slice(0, 6));
    return (
      <div className={boxCls}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label
            htmlFor="warmup-input"
            className={`font-semibold text-[#CBD5E1] ${labelCls}`}
          >
            Thử nhập chữ để xem cách máy tính lưu thành dãy bit (tối đa 6 kí tự):
          </label>
          <input
            id="warmup-input"
            type="text"
            maxLength={6}
            value={warmupText}
            onChange={(e) => setWarmupText(e.target.value)}
            placeholder="TIN 10"
            className={`w-32 rounded-sm border border-[#3B4B63] bg-[#1C2431] px-2.5 py-1 font-mono text-[#FAF8F3] focus:border-[#3B82F6] ${bodyCls}`}
          />
        </div>
        <div className="mt-2 grid grid-cols-3 sm:grid-cols-6 gap-1.5">
          {cleanChars.map((ch, idx) => {
            const code = ch.charCodeAt(0);
            const bitsStr = code.toString(2).padStart(8, "0");
            return (
              <div
                key={`${ch}-${idx}`}
                className="rounded-sm border border-[#2C384B] bg-[#1C2431] px-1 py-1.5 text-center"
              >
                <div className={`font-bold text-[#FAF8F3] ${emphasisCls}`}>
                  {ch === " " ? "Space" : ch}
                </div>
                <div className="mt-0.5 font-mono text-xs tracking-tighter text-[#93C5FD] tabular-data">
                  {bitsStr}
                </div>
              </div>
            );
          })}
        </div>
        <div className={`mt-2 text-[#CBD5E1] leading-snug ${bodyCls}`}>
          Con người đọc ra nghĩa (<strong className="text-[#FAF8F3]">Thông tin</strong>), còn bộ nhớ máy tính chỉ lưu giữ các chuỗi 0 và 1 (<strong className="text-[#93C5FD]">Dữ liệu</strong>).
        </div>
      </div>
    );
  }

  // Slide 3: Info-Data Pipeline (Hình 1.1)
  if (widgetType === "info-data-pipeline") {
    const scenario = PIPELINE_SCENARIOS[pipelineIdx];
    return (
      <div className={boxCls}>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-1.5 border-b border-[#2C384B]">
          <span className={`font-semibold text-[#CBD5E1] ${labelCls}`}>
            Mô phỏng Sơ đồ Hình 1.1 — Chọn tình huống:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PIPELINE_SCENARIOS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPipelineIdx(idx)}
                className={`px-2.5 py-1 rounded-sm font-medium transition-colors ${subCls} ${
                  pipelineIdx === idx
                    ? "bg-[#1D4ED8] text-[#FAF8F3]"
                    : "bg-[#1C2431] text-[#CBD5E1] border border-[#2C384B] hover:border-[#475569]"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="rounded-sm border border-[#2C384B] bg-[#1C2431] p-2 sm:p-2.5">
            <div className={`font-mono text-[#93C5FD] ${subCls}`}>
              01 · Tiếp nhận dữ liệu
            </div>
            <p className={`mt-1 leading-snug text-[#FAF8F3] ${bodyCls}`}>
              {scenario.input}
            </p>
          </div>
          <div className="rounded-sm border border-[#2563EB]/60 bg-[#172554]/50 p-2 sm:p-2.5">
            <div className={`font-mono text-[#FCD34D] ${subCls}`}>
              02 · Xử lí dữ liệu
            </div>
            <p className={`mt-1 leading-snug text-[#FAF8F3] ${bodyCls}`}>
              {scenario.process}
            </p>
          </div>
          <div className="rounded-sm border border-[#15803D]/70 bg-[#052E16]/50 p-2 sm:p-2.5">
            <div className={`font-mono text-[#86EFAC] ${subCls}`}>
              03 · Đưa ra kết quả
            </div>
            <p className={`mt-1 leading-snug text-[#FAF8F3] ${bodyCls}`}>
              {scenario.output}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Slide 5: Activity 1 Debate
  if (widgetType === "activity-1-debate") {
    const choices: {
      id: "an" | "minh" | "khoa" | "all";
      name: string;
      claim: string;
      verdict: string;
      isComplete: boolean;
    }[] = [
      {
        id: "an",
        name: "An",
        claim: "Bài ghi trong vở là dữ liệu",
        verdict:
          "Đúng, nhưng chưa đủ! Vở ghi là dữ liệu dạng văn bản viết tay trên giấy, chưa bao quát hết các dạng dữ liệu số khác của tiết học.",
        isComplete: false,
      },
      {
        id: "minh",
        name: "Minh",
        claim: "Tệp Word của cô là dữ liệu",
        verdict:
          "Đúng, nhưng chưa đủ! Tệp Word là dữ liệu văn bản điện tử trên máy tính; ngoài ra còn có vở ghi và video.",
        isComplete: false,
      },
      {
        id: "khoa",
        name: "Khoa",
        claim: "Tệp video bài giảng là dữ liệu",
        verdict:
          "Đúng, nhưng chưa đủ! Video là dữ liệu đa phương tiện (hình ảnh + âm thanh) thể hiện lại tiết giảng.",
        isComplete: false,
      },
      {
        id: "all",
        name: "Cả 3 bạn đều đúng",
        claim: "Mỗi bạn nêu đúng 1 dạng dữ liệu",
        verdict:
          "Chính xác hoàn toàn! Không thể đồng nhất thông tin với dữ liệu: cùng một thông tin tiết giảng có thể thể hiện qua chữ viết tay (An), tệp Word (Minh) hay tệp video (Khoa).",
        isComplete: true,
      },
    ];
    const current = choices.find((c) => c.id === selectedStudent)!;
    return (
      <div className={boxCls}>
        <div className={`font-semibold text-[#CBD5E1] mb-2 ${labelCls}`}>
          Chọn nhận định để kiểm tra kết luận Hoạt động 1 (Trang 7):
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {choices.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedStudent(c.id)}
              className={`px-3 py-2 rounded-sm text-left border transition-colors ${subCls} ${
                selectedStudent === c.id
                  ? c.isComplete
                    ? "border-[#16A34A] bg-[#052E16]/70 text-[#DCFCE7]"
                    : "border-[#D97706] bg-[#451A03]/70 text-[#FEF3C7]"
                  : "border-[#2C384B] bg-[#1C2431] text-[#CBD5E1] hover:border-[#475569]"
              }`}
            >
              <div className="font-semibold">{c.name}</div>
              <div className="mt-0.5 text-xs opacity-85 line-clamp-1">
                {c.claim}
              </div>
            </button>
          ))}
        </div>
        <div
          className={`mt-2.5 rounded-sm border px-3 py-2 leading-relaxed ${bodyCls} ${
            current.isComplete
              ? "border-[#16A34A]/60 bg-[#052E16]/40 text-[#DCFCE7]"
              : "border-[#D97706]/60 bg-[#451A03]/40 text-[#FEF3C7]"
          }`}
        >
          {current.verdict}
        </div>
      </div>
    );
  }

  // Slide 6: Multi-form info
  if (widgetType === "multi-form-info") {
    const forms = [
      {
        id: "sign" as const,
        label: "Hình ảnh biển báo",
        content: "Biểu tượng vòng tròn đỏ gạch chéo điếu thuốc (nhận biết nhanh không phân biệt ngôn ngữ)",
      },
      {
        id: "text" as const,
        label: "Văn bản chữ viết",
        content: "Thông báo: 'KHU VỰC CẤM HÚT THUỐC LÁ — VÌ SỨC KHỎE CỘNG ĐỒNG'",
      },
      {
        id: "audio" as const,
        label: "Âm thanh phát thanh",
        content: "Loa thông báo tại nhà ga: 'Xin quý khách vui lòng không hút thuốc trong khu vực phòng chờ.'",
      },
      {
        id: "binary" as const,
        label: "Dãy bit trong máy tính",
        content: "01000011 01000001 01001101 00100000 01001000 01010101 01010100 (mã hóa ASCII lưu trữ)",
      },
    ];
    const active = forms.find((f) => f.id === infoForm)!;
    return (
      <div className={boxCls}>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#2C384B]">
          <span className={`font-semibold text-[#CBD5E1] ${labelCls}`}>
            Cùng 1 thông tin &ldquo;Cấm hút thuốc&rdquo; — Chọn dạng dữ liệu biểu diễn:
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {forms.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setInfoForm(f.id)}
              className={`px-3 py-1.5 rounded-sm font-medium transition-colors ${subCls} ${
                infoForm === f.id
                  ? "bg-[#1D4ED8] text-[#FAF8F3]"
                  : "bg-[#1C2431] border border-[#2C384B] text-[#CBD5E1] hover:border-[#475569]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="mt-2.5 flex items-center gap-4 rounded-sm border border-[#2C384B] bg-[#1C2431] p-3">
          {infoForm === "sign" && (
            <svg
              viewBox="0 0 48 48"
              className="w-12 h-12 shrink-0"
              aria-label="Biển báo cấm hút thuốc minh họa"
            >
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="#FAF8F3"
                stroke="#B91C1C"
                strokeWidth="4"
              />
              <rect x="13" y="22" width="18" height="4" fill="#141A23" />
              <rect x="31" y="22" width="4" height="4" fill="#D97706" />
              <line
                x1="10"
                y1="10"
                x2="38"
                y2="38"
                stroke="#B91C1C"
                strokeWidth="4"
              />
            </svg>
          )}
          <div>
            <div className={`font-semibold text-[#93C5FD] ${subCls}`}>
              {active.label}
            </div>
            <p className={`mt-1 leading-relaxed text-[#FAF8F3] font-mono ${bodyCls}`}>
              {active.content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Slide 7: Context integrity
  if (widgetType === "context-integrity") {
    const active = CONTEXT_MODES.find((m) => m.id === contextId)!;
    return (
      <div className={boxCls}>
        <div className={`font-semibold text-[#CBD5E1] mb-2 ${labelCls}`}>
          Thử thay đổi ngữ cảnh của dữ liệu &ldquo;08&rdquo; để kiểm tra tính toàn vẹn:
        </div>
        <div className="flex flex-wrap gap-2">
          {CONTEXT_MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setContextId(m.id)}
              className={`px-3 py-1.5 rounded-sm font-medium transition-colors ${subCls} ${
                contextId === m.id
                  ? "bg-[#1D4ED8] text-[#FAF8F3]"
                  : "bg-[#1C2431] border border-[#2C384B] text-[#CBD5E1] hover:border-[#475569]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div
          className={`mt-2.5 flex flex-col sm:flex-row sm:items-center gap-3 rounded-sm border p-3 ${
            active.status === "warning"
              ? "border-[#D97706]/70 bg-[#451A03]/40"
              : "border-[#2C384B] bg-[#1C2431]"
          }`}
        >
          <div className={`shrink-0 rounded-sm bg-[#141A23] border border-[#2C384B] px-3 py-1.5 font-mono font-bold text-[#93C5FD] tabular-data ${emphasisCls}`}>
            {active.raw}
          </div>
          <div className={`leading-relaxed text-[#FAF8F3] ${bodyCls}`}>
            {active.meaning}
          </div>
        </div>
      </div>
    );
  }

  // Slide 9: 8-bit toggle (1 Byte = 8 bit)
  if (widgetType === "bit-byte-toggle") {
    const decimal = bits.reduce(
      (acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx),
      0
    );
    const asciiChar =
      decimal >= 32 && decimal <= 126
        ? String.fromCharCode(decimal)
        : "Kí tự điều khiển";
    const setBytePreset = (char: string) => {
      const code = char.charCodeAt(0);
      setBits(
        Array.from({ length: 8 }, (_, idx) => (code >> (7 - idx)) & 1)
      );
    };
    return (
      <div className={boxCls}>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#2C384B]">
          <span className={`font-semibold text-[#CBD5E1] ${labelCls}`}>
            Phòng thí nghiệm 1 Byte = 8 bit (Bấm từng bit 0/1 để ghép kí tự):
          </span>
          <div className="flex items-center gap-1.5">
            {["A", "T", "1", "0"].map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => setBytePreset(ch)}
                className={`px-2.5 py-0.5 rounded-sm border border-[#2C384B] bg-[#1C2431] hover:border-[#3B82F6] font-mono text-[#93C5FD] ${subCls}`}
              >
                &apos;{ch}&apos;
              </button>
            ))}
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-8 gap-1.5">
          {bits.map((b, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() =>
                setBits((prev) =>
                  prev.map((val, i) => (i === idx ? (val === 1 ? 0 : 1) : val))
                )
              }
              aria-label={`Bit ${7 - idx} giá trị ${b}`}
              className={`rounded-sm border py-2 text-center font-mono transition-colors ${
                b === 1
                  ? "border-[#3B82F6] bg-[#1D4ED8] text-[#FAF8F3]"
                  : "border-[#2C384B] bg-[#1C2431] text-[#94A3B8] hover:border-[#475569]"
              }`}
            >
              <div className={`font-bold tabular-data ${emphasisCls}`}>{b}</div>
              <div className="text-[11px] opacity-80 tabular-data">
                2^{7 - idx}
              </div>
            </button>
          ))}
        </div>
        <div className={`mt-2.5 grid grid-cols-3 gap-2 rounded-sm border border-[#2C384B] bg-[#1C2431] p-2.5 ${bodyCls}`}>
          <div>
            <span className="text-[#94A3B8]">Dãy 8 bit: </span>
            <span className="font-mono font-semibold text-[#93C5FD] tabular-data">
              {bits.join("")}
            </span>
          </div>
          <div>
            <span className="text-[#94A3B8]">Thập phân: </span>
            <span className="font-mono font-semibold text-[#FAF8F3] tabular-data">
              {decimal}
            </span>
          </div>
          <div>
            <span className="text-[#94A3B8]">Kí tự ASCII: </span>
            <span className="font-mono font-bold text-[#86EFAC]">
              {asciiChar}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Slide 10: Unit Ladder (Bảng 1.1)
  if (widgetType === "unit-ladder") {
    const selected = STORAGE_UNITS_TABLE[unitIdx];
    return (
      <div className={boxCls}>
        <div className={`font-semibold text-[#CBD5E1] mb-2 ${labelCls}`}>
          Chọn đơn vị trên Bảng 1.1 (mỗi bậc tăng 2^10 = 1024 lần):
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {STORAGE_UNITS_TABLE.map((row, idx) => (
            <button
              key={row.symbol}
              type="button"
              onClick={() => setUnitIdx(idx)}
              className={`py-1.5 px-1 rounded-sm font-mono font-semibold transition-colors ${subCls} ${
                unitIdx === idx
                  ? "bg-[#1D4ED8] text-[#FAF8F3]"
                  : "bg-[#1C2431] border border-[#2C384B] text-[#CBD5E1] hover:border-[#475569]"
              }`}
            >
              {row.symbol}
            </button>
          ))}
        </div>
        <div className={`mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 rounded-sm border border-[#2C384B] bg-[#1C2431] p-3 ${bodyCls}`}>
          <div>
            <div className={`text-[#94A3B8] ${subCls}`}>Tên & Kí hiệu</div>
            <div className="mt-0.5 font-semibold text-[#FAF8F3]">
              {selected.unit} ({selected.symbol})
            </div>
          </div>
          <div>
            <div className={`text-[#94A3B8] ${subCls}`}>Lượng dữ liệu chuẩn SGK</div>
            <div className="mt-0.5 font-mono text-[#93C5FD] tabular-data">
              {selected.factorLabel} ({selected.bytesPowerLabel})
            </div>
          </div>
          <div>
            <div className={`text-[#94A3B8] ${subCls}`}>Ví dụ thực tế</div>
            <div className="mt-0.5 text-[#FAF8F3]">{selected.example}</div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 11: Unit Converter (Câu hỏi 2 trang 8)
  if (widgetType === "unit-converter-questions") {
    const mult: Record<"B" | "KB" | "MB" | "GB", number> = {
      B: 1 / 1024,
      KB: 1,
      MB: 1024,
      GB: 1024 * 1024,
    };
    const safeVal = Number.isFinite(convVal) && convVal >= 0 ? convVal : 0;
    const kbResult = safeVal * mult[convUnit];
    const formulaText =
      convUnit === "B"
        ? `${safeVal.toLocaleString("vi-VN")} B : 1024 = ${kbResult.toLocaleString("vi-VN", { maximumFractionDigits: 4 })} KB`
        : convUnit === "KB"
        ? `${safeVal.toLocaleString("vi-VN")} KB = ${kbResult.toLocaleString("vi-VN")} KB`
        : convUnit === "MB"
        ? `${safeVal.toLocaleString("vi-VN")} MB × 1024 = ${kbResult.toLocaleString("vi-VN")} KB`
        : `${safeVal.toLocaleString("vi-VN")} GB × 1024 × 1024 = ${kbResult.toLocaleString("vi-VN")} KB`;

    return (
      <div className={boxCls}>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#2C384B]">
          <span className={`font-semibold text-[#CBD5E1] ${labelCls}`}>
            Giải nhanh Câu hỏi 2 (Trang 8) hoặc tự nhập số bất kì:
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => {
                setConvVal(3);
                setConvUnit("MB");
              }}
              className={`px-2.5 py-1 rounded-sm border border-[#2C384B] bg-[#1C2431] hover:border-[#3B82F6] font-mono text-[#93C5FD] ${subCls}`}
            >
              a) 3 MB
            </button>
            <button
              type="button"
              onClick={() => {
                setConvVal(2);
                setConvUnit("GB");
              }}
              className={`px-2.5 py-1 rounded-sm border border-[#2C384B] bg-[#1C2431] hover:border-[#3B82F6] font-mono text-[#93C5FD] ${subCls}`}
            >
              b) 2 GB
            </button>
            <button
              type="button"
              onClick={() => {
                setConvVal(2048);
                setConvUnit("B");
              }}
              className={`px-2.5 py-1 rounded-sm border border-[#2C384B] bg-[#1C2431] hover:border-[#3B82F6] font-mono text-[#93C5FD] ${subCls}`}
            >
              c) 2048 B
            </button>
          </div>
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-3">
          <input
            type="number"
            min={0}
            aria-label="Giá trị cần đổi sang KB"
            value={convVal}
            onChange={(e) => setConvVal(Number(e.target.value))}
            className={`w-28 rounded-sm border border-[#3B4B63] bg-[#1C2431] px-2.5 py-1.5 font-mono text-[#FAF8F3] tabular-data ${bodyCls}`}
          />
          <select
            aria-label="Đơn vị đầu vào"
            value={convUnit}
            onChange={(e) =>
              setConvUnit(e.target.value as "B" | "KB" | "MB" | "GB")
            }
            className={`rounded-sm border border-[#3B4B63] bg-[#1C2431] px-2.5 py-1.5 font-mono text-[#FAF8F3] ${bodyCls}`}
          >
            <option value="B">Byte (B)</option>
            <option value="KB">Kilobyte (KB)</option>
            <option value="MB">Megabyte (MB)</option>
            <option value="GB">Gigabyte (GB)</option>
          </select>
          <div className={`flex-1 min-w-[200px] rounded-sm border border-[#16A34A]/60 bg-[#052E16]/40 px-3 py-1.5 font-mono text-[#DCFCE7] tabular-data ${bodyCls}`}>
            {formulaText}
          </div>
        </div>
      </div>
    );
  }

  // Slide 12: Library digitization
  if (widgetType === "library-digitization") {
    const totalMb = bookCount * mbPerBook;
    const totalGb = totalMb / 1024;
    const fits256 = totalGb <= 256;
    const fillPct = Math.min(100, (totalGb / 256) * 100);
    return (
      <div className={boxCls}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className={`flex justify-between text-[#CBD5E1] ${bodyCls}`}>
              <span>Số lượng sách thư viện</span>
              <span className="font-mono font-bold text-[#93C5FD] tabular-data">
                {bookCount.toLocaleString("vi-VN")} cuốn
              </span>
            </div>
            <input
              type="range"
              min={500}
              max={8000}
              step={500}
              aria-label="Số lượng sách thư viện"
              value={bookCount}
              onChange={(e) => setBookCount(Number(e.target.value))}
              className="mt-1.5 w-full accent-[#3B82F6]"
            />
          </div>
          <div>
            <div className={`flex justify-between text-[#CBD5E1] ${bodyCls}`}>
              <span>Dung lượng mỗi cuốn sách</span>
              <span className="font-mono font-bold text-[#93C5FD] tabular-data">
                {mbPerBook} MB
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              step={10}
              aria-label="Dung lượng mỗi cuốn sách"
              value={mbPerBook}
              onChange={(e) => setMbPerBook(Number(e.target.value))}
              className="mt-1.5 w-full accent-[#3B82F6]"
            />
          </div>
        </div>
        <div className="mt-2.5 rounded-sm border border-[#2C384B] bg-[#1C2431] p-3">
          <div className={`flex flex-wrap items-center justify-between gap-2 ${bodyCls}`}>
            <span className="font-mono text-[#FAF8F3] tabular-data">
              Tổng: {totalMb.toLocaleString("vi-VN")} MB ≈{" "}
              <strong className="text-[#93C5FD]">
                {totalGb.toFixed(2)} GB
              </strong>
            </span>
            <span
              className={`font-semibold ${
                fits256 ? "text-[#86EFAC]" : "text-[#FCA5A5]"
              }`}
            >
              {fits256
                ? "Chứa vừa thẻ nhớ 256 GB"
                : "Vượt quá thẻ nhớ 256 GB (cần 512 GB)"}
            </span>
          </div>
          <div className="mt-2 h-2 w-full rounded-sm bg-[#141A23] overflow-hidden">
            <div
              className={`h-full transition-all ${
                fits256 ? "bg-[#16A34A]" : "bg-[#DC2626]"
              }`}
              style={{ width: `${fillPct}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Slide 13: Device Activity 2 (Hình 1.2)
  if (widgetType === "device-activity-2") {
    const pair = DEVICE_PAIRS[devicePairIdx];
    return (
      <div className={boxCls}>
        <div className="flex flex-wrap gap-1.5 pb-1.5 border-b border-[#2C384B]">
          {DEVICE_PAIRS.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setDevicePairIdx(idx)}
              className={`px-2.5 py-1 rounded-sm font-medium transition-colors ${subCls} ${
                devicePairIdx === idx
                  ? "bg-[#1D4ED8] text-[#FAF8F3]"
                  : "bg-[#1C2431] border border-[#2C384B] text-[#CBD5E1] hover:border-[#475569]"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className={`mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 ${bodyCls}`}>
          <div className="rounded-sm border border-[#2C384B] bg-[#1C2431] p-2 sm:p-2.5">
            <div className="font-semibold text-[#93C5FD]">Điểm giống nhau</div>
            <p className="mt-0.5 text-[#FAF8F3] leading-snug">{pair.common}</p>
          </div>
          <div className="rounded-sm border border-[#2C384B] bg-[#1C2431] p-2 sm:p-2.5">
            <div className="font-semibold text-[#FCD34D]">Thiết bị thường</div>
            <p className="mt-0.5 text-[#CBD5E1] leading-snug">{pair.manual}</p>
          </div>
          <div className="rounded-sm border border-[#16A34A]/60 bg-[#052E16]/35 p-2 sm:p-2.5">
            <div className="font-semibold text-[#86EFAC]">Thiết bị số</div>
            <p className="mt-0.5 text-[#FAF8F3] leading-snug">{pair.digital}</p>
          </div>
        </div>
      </div>
    );
  }

  // Slide 14: Device Comparison
  if (widgetType === "device-comparison") {
    const active = COMPARISON_ASPECTS.find((a) => a.id === compAspect)!;
    return (
      <div className={boxCls}>
        <div className="flex flex-wrap gap-1.5 pb-1.5 border-b border-[#2C384B]">
          {COMPARISON_ASPECTS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setCompAspect(a.id)}
              className={`px-2.5 py-1 rounded-sm font-medium transition-colors ${subCls} ${
                compAspect === a.id
                  ? "bg-[#1D4ED8] text-[#FAF8F3]"
                  : "bg-[#1C2431] border border-[#2C384B] text-[#CBD5E1] hover:border-[#475569]"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
        <div className={`mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 ${bodyCls}`}>
          <div className="rounded-sm border border-[#2C384B] bg-[#1C2431] p-2 sm:p-2.5">
            <div className="font-semibold text-[#FCD34D]">
              {active.manualTitle}
            </div>
            <ul className="mt-1 space-y-0.5 text-[#CBD5E1] leading-snug">
              {active.manualPoints.map((pt, i) => (
                <li key={i}>• {pt}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-sm border border-[#16A34A]/60 bg-[#052E16]/35 p-2 sm:p-2.5">
            <div className="font-semibold text-[#86EFAC]">
              {active.digitalTitle}
            </div>
            <ul className="mt-1 space-y-0.5 text-[#FAF8F3] leading-snug">
              {active.digitalPoints.map((pt, i) => (
                <li key={i}>• {pt}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Slide 16: Gradebook Lab (Luyện tập 1)
  if (widgetType === "gradebook-lab") {
    const entries: { key: keyof typeof scores; label: string }[] = [
      { key: "toan", label: "Toán" },
      { key: "van", label: "Ngữ văn" },
      { key: "anh", label: "Tiếng Anh" },
      { key: "tin", label: "Tin học" },
      { key: "ly", label: "Vật lí" },
    ];
    const values = Object.values(scores);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const rank =
      avg >= 8.0
        ? "Tốt (Học lực Giỏi)"
        : avg >= 6.5
        ? "Khá"
        : avg >= 5.0
        ? "Đạt"
        : "Chưa đạt";
    const sorted = entries
      .map((e) => ({ label: e.label, val: scores[e.key] }))
      .sort((a, b) => b.val - a.val);

    return (
      <div className={boxCls}>
        <div className={`font-semibold text-[#CBD5E1] mb-2 ${labelCls}`}>
          Thử chỉnh điểm dữ liệu đầu vào để xem 3 bước xử lí tạo ra thông tin:
        </div>
        <div className="grid grid-cols-5 gap-2">
          {entries.map((item) => (
            <label
              key={item.key}
              className="rounded-sm border border-[#2C384B] bg-[#1C2431] p-2 text-center block"
            >
              <span className={`block text-[#94A3B8] ${subCls}`}>
                {item.label}
              </span>
              <input
                type="number"
                min={0}
                max={10}
                step={0.5}
                value={scores[item.key]}
                onChange={(e) => {
                  const v = Math.min(10, Math.max(0, Number(e.target.value)));
                  setScores((prev) => ({ ...prev, [item.key]: v }));
                }}
                className={`mt-1 w-full rounded-sm border border-[#3B4B63] bg-[#141A23] py-1 text-center font-mono font-bold text-[#FAF8F3] tabular-data ${bodyCls}`}
              />
            </label>
          ))}
        </div>
        <div className={`mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-sm border border-[#16A34A]/60 bg-[#052E16]/35 p-2.5 ${bodyCls}`}>
          <div>
            <span className="text-[#94A3B8]">ĐTB xử lí: </span>
            <span className="font-mono font-bold text-[#86EFAC] tabular-data">
              {avg.toFixed(2)}
            </span>
          </div>
          <div>
            <span className="text-[#94A3B8]">Xếp loại: </span>
            <span className="font-semibold text-[#FAF8F3]">{rank}</span>
          </div>
          <div>
            <span className="text-[#94A3B8]">Thế mạnh: </span>
            <span className="font-semibold text-[#93C5FD]">
              {sorted[0].label} ({sorted[0].val})
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Slide 17: 16 GB SD Card Lab (Luyện tập 2)
  if (widgetType === "sdcard-16gb-lab") {
    const totalKb = sdCapacityGb * 1024 * 1024;
    const maxPhotos = Math.floor(totalKb / avgPhotoKb);
    return (
      <div className={boxCls}>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#2C384B]">
          <span className={`font-semibold text-[#CBD5E1] ${labelCls}`}>
            Hình 1.3 (438, 585, 418, 741 KB → TB 545,5 KB) — Chọn thẻ nhớ:
          </span>
          <div className="flex gap-1.5">
            {[8, 16, 32, 64].map((gb) => (
              <button
                key={gb}
                type="button"
                onClick={() => setSdCapacityGb(gb)}
                className={`px-3 py-1 rounded-sm font-mono font-semibold transition-colors ${subCls} ${
                  sdCapacityGb === gb
                    ? "bg-[#1D4ED8] text-[#FAF8F3]"
                    : "bg-[#1C2431] border border-[#2C384B] text-[#CBD5E1]"
                }`}
              >
                {gb} GB
              </button>
            ))}
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
          <div>
            <div className={`flex justify-between text-[#CBD5E1] ${bodyCls}`}>
              <span>Độ lớn trung bình 1 ảnh</span>
              <span className="font-mono font-bold text-[#93C5FD] tabular-data">
                {avgPhotoKb} KB
              </span>
            </div>
            <input
              type="range"
              min={200}
              max={2048}
              step={0.5}
              aria-label="Độ lớn trung bình 1 ảnh (KB)"
              value={avgPhotoKb}
              onChange={(e) => setAvgPhotoKb(Number(e.target.value))}
              className="mt-1.5 w-full accent-[#3B82F6]"
            />
            <button
              type="button"
              onClick={() => {
                setSdCapacityGb(16);
                setAvgPhotoKb(545.5);
              }}
              className={`mt-1 text-[#93C5FD] underline hover:text-[#BFDBFE] ${subCls}`}
            >
              Khôi phục số liệu chuẩn SGK (16 GB / 545,5 KB)
            </button>
          </div>
          <div className="rounded-sm border border-[#16A34A]/60 bg-[#052E16]/35 p-3 space-y-1">
            <div className={`font-mono text-[#CBD5E1] tabular-data ${subCls}`}>
              {sdCapacityGb} GB = {totalKb.toLocaleString("vi-VN")} KB
            </div>
            <div className={`font-bold text-[#86EFAC] tabular-data ${emphasisCls}`}>
              Chứa tối đa: {maxPhotos.toLocaleString("vi-VN")} ảnh
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Slide 18: CCCD Chip Lab (Vận dụng 1)
  if (widgetType === "cccd-chip-lab") {
    const layers = {
      print: {
        title: "Lớp 1: Thông tin in trực tiếp trên thẻ",
        data: "Họ tên: NGUYỄN MINH AN | Ngày sinh: 12/05/2010 | Quê quán: Hà Nội",
        benefit:
          "Giúp con người đọc trực tiếp bằng mắt thường nhanh chóng mà không cần thiết bị điện tử.",
      },
      qr: {
        title: "Lớp 2: Mã QR code hai chiều",
        data: "001210008342|Nguyễn Minh An|12052010|Nam|Cầu Giấy, Hà Nội|2025",
        benefit:
          "Máy quét đọc trọn vẹn chuỗi thông tin định danh trong chưa đầy 1 giây, tránh lỗi gõ tay khi làm thủ tục.",
      },
      chip: {
        title: "Lớp 3: Chip nhớ điện tử NFC bảo mật cao",
        data: "AES-256 Encrypted Identity + Sinh trắc học + BHYT + GPLX tích hợp",
        benefit:
          "Dung lượng lưu trữ lớn, mã hóa chống làm giả, tích hợp đa ngành giúp giảm mang nhiều giấy tờ.",
      },
    };
    const active = layers[cccdLayer];
    return (
      <div className={boxCls}>
        <div className="flex flex-wrap gap-2 pb-2 border-b border-[#2C384B]">
          {[
            { id: "print" as const, label: "1. Chữ in trên thẻ" },
            { id: "qr" as const, label: "2. Quét mã QR" },
            { id: "chip" as const, label: "3. Đọc Chip điện tử" },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setCccdLayer(btn.id)}
              className={`px-3 py-1.5 rounded-sm font-medium transition-colors ${subCls} ${
                cccdLayer === btn.id
                  ? "bg-[#1D4ED8] text-[#FAF8F3]"
                  : "bg-[#1C2431] border border-[#2C384B] text-[#CBD5E1] hover:border-[#475569]"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className={`mt-2.5 rounded-sm border border-[#2C384B] bg-[#1C2431] p-3 space-y-1.5 ${bodyCls}`}>
          <div className="font-semibold text-[#93C5FD]">{active.title}</div>
          <div className={`rounded-sm bg-[#141A23] px-2.5 py-1.5 font-mono text-[#86EFAC] ${subCls}`}>
            {active.data}
          </div>
          <div className="text-[#FAF8F3] leading-relaxed">
            Lợi ích: {active.benefit}
          </div>
        </div>
      </div>
    );
  }

  // Slide 19: Photo Revolution Lab (Vận dụng 2)
  if (widgetType === "photo-revolution-lab") {
    const items = {
      storage: {
        label: "Sức chứa & Vật mang tin",
        film: "Cuộn phim nhựa nhạy sáng, tối đa khoảng 24–36 kiểu/cuộn.",
        digital: "Thẻ nhớ số chứa hàng nghìn đến hàng chục nghìn tệp ảnh.",
      },
      preview: {
        label: "Xem lại & Chi phí",
        film: "Phải chụp hết cuộn và mang đi tráng rửa hóa chất mới xem được ảnh.",
        digital: "Xem trước ngay trên màn hình, xóa ảnh hỏng tức thời, không dùng hóa chất độc hại.",
      },
      edit: {
        label: "Xử lí & Chất lượng ảnh",
        film: "Chỉnh tay ống kính; sửa ảnh trong buồng tối rất phức tạp.",
        digital: "Tự động lấy nét, chống rung, cân bằng sáng, hậu kì trực tiếp bằng phần mềm.",
      },
      share: {
        label: "Sao chép & Chia sẻ",
        film: "Muốn gửi cho người ở xa phải rửa thêm ảnh giấy và gửi bưu điện.",
        digital: "Gửi bản sao sắc nét nguyên vẹn qua Internet trong vài giây.",
      },
    };
    const current = items[photoTab];
    return (
      <div className={boxCls}>
        <div className="flex flex-wrap gap-2 pb-2 border-b border-[#2C384B]">
          {[
            { id: "storage" as const, label: "Lưu trữ" },
            { id: "preview" as const, label: "Xem lại" },
            { id: "edit" as const, label: "Chỉnh sửa" },
            { id: "share" as const, label: "Chia sẻ" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setPhotoTab(t.id)}
              className={`px-3 py-1.5 rounded-sm font-medium transition-colors ${subCls} ${
                photoTab === t.id
                  ? "bg-[#1D4ED8] text-[#FAF8F3]"
                  : "bg-[#1C2431] border border-[#2C384B] text-[#CBD5E1]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className={`mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 ${bodyCls}`}>
          <div className="rounded-sm border border-[#2C384B] bg-[#1C2431] p-3">
            <div className="font-semibold text-[#FCD34D]">
              Máy ảnh phim truyền thống — {current.label}
            </div>
            <p className="mt-1 text-[#CBD5E1]">{current.film}</p>
          </div>
          <div className="rounded-sm border border-[#16A34A]/60 bg-[#052E16]/35 p-3">
            <div className="font-semibold text-[#86EFAC]">
              Máy ảnh số / Smartphone — {current.label}
            </div>
            <p className="mt-1 text-[#FAF8F3]">{current.digital}</p>
          </div>
        </div>
      </div>
    );
  }

  // Slide 20: Final Quiz
  if (widgetType === "final-quiz") {
    const answeredCount = Object.keys(quizAnswers).length;
    const correctCount = LESSON_1_QUIZ_QUESTIONS.filter(
      (q) => quizAnswers[q.id] === q.correctIndex
    ).length;

    return (
      <div className={boxCls}>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#2C384B]">
          <div className={`font-semibold text-[#FAF8F3] ${labelCls}`}>
            Kiểm tra nhanh 5 câu trắc nghiệm Bài 1
          </div>
          <div className="flex items-center gap-3">
            <span className={`font-mono text-[#86EFAC] tabular-data ${subCls}`}>
              Đúng: {correctCount}/{LESSON_1_QUIZ_QUESTIONS.length} (Đã làm{" "}
              {answeredCount})
            </span>
            {answeredCount > 0 && (
              <button
                type="button"
                onClick={() => setQuizAnswers({})}
                className={`inline-flex items-center gap-1 text-[#93C5FD] hover:underline ${subCls}`}
              >
                <RotateCcwIcon className="w-3.5 h-3.5" />
                Làm lại
              </button>
            )}
          </div>
        </div>

        <div
          className={`overflow-y-auto pr-1 ${
            isFullscreen
              ? "mt-2 space-y-2 max-h-[140px]"
              : "mt-2.5 space-y-2.5 max-h-[260px]"
          }`}
        >
          {LESSON_1_QUIZ_QUESTIONS.map((q, qIdx) => {
            const chosen = quizAnswers[q.id];
            const hasChosen = chosen !== undefined;
            return (
              <div
                key={q.id}
                className="rounded-sm border border-[#2C384B] bg-[#1C2431] p-3"
              >
                <div className={`font-semibold text-[#FAF8F3] ${bodyCls}`}>
                  Câu {qIdx + 1}: {q.question}
                </div>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = chosen === oIdx;
                    const isCorrect = oIdx === q.correctIndex;
                    let cls =
                      "border-[#2C384B] bg-[#141A23] text-[#CBD5E1] hover:border-[#475569]";
                    if (hasChosen) {
                      if (isCorrect) {
                        cls =
                          "border-[#16A34A] bg-[#052E16]/70 text-[#DCFCE7]";
                      } else if (isSelected && !isCorrect) {
                        cls =
                          "border-[#DC2626] bg-[#450A0A]/70 text-[#FEE2E2]";
                      }
                    }
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() =>
                          setQuizAnswers((prev) => ({
                            ...prev,
                            [q.id]: oIdx,
                          }))
                        }
                        className={`flex items-start gap-2 rounded-sm border px-2.5 py-1.5 text-left transition-colors ${subCls} ${cls}`}
                      >
                        <span className="font-mono font-bold shrink-0">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {hasChosen && (
                  <div className={`mt-2 flex items-start gap-1.5 text-[#86EFAC] ${subCls}`}>
                    <CheckCircleIcon className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
