export type SchoolLevel = "tieu-hoc" | "thcs" | "thpt";

export type SlideKind = "theory" | "activity" | "lab" | "exercise" | "summary";

export type InteractiveWidgetKind =
  | "roadmap-overview"
  | "warmup-bit-reveal"
  | "info-data-pipeline"
  | "activity-1-debate"
  | "multi-form-info"
  | "context-integrity"
  | "bit-byte-toggle"
  | "unit-ladder"
  | "unit-converter-questions"
  | "library-digitization"
  | "device-activity-2"
  | "device-comparison"
  | "gradebook-lab"
  | "sdcard-16gb-lab"
  | "cccd-chip-lab"
  | "photo-revolution-lab"
  | "final-quiz";

export interface SlideQuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SlideItem {
  id: number;
  code: string;
  kind: SlideKind;
  sectionLabel: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageCaption: string;
  keyPoints: {
    heading: string;
    body: string;
    formulaOrCode?: string;
  }[];
  knowledgeBox?: {
    title: string;
    bullets: string[];
  };
  interactiveWidget?: InteractiveWidgetKind;
  textbookTask?: {
    badge: string;
    page: string;
    prompt: string;
    solutionSteps: string[];
    conclusion: string;
  };
  speakerNotes: string;
}

export interface PresentationDeck {
  id: string;
  catalogCode: string;
  level: SchoolLevel;
  levelName: string;
  grade: number;
  bookSeries: string;
  topicNumber: string;
  topicName: string;
  lessonNumber: string;
  title: string;
  durationMinutes: number;
  slideCount: number;
  summary: string;
  learningObjectives: string[];
  slides: SlideItem[];
}

export interface StorageUnitRow {
  unit: string;
  symbol: string;
  factorLabel: string;
  bytesPowerLabel: string;
  bytesApprox: string;
  example: string;
}

export const STORAGE_UNITS_TABLE: StorageUnitRow[] = [
  {
    unit: "Bit",
    symbol: "bit",
    factorLabel: "1 bit",
    bytesPowerLabel: "1/8 Byte",
    bytesApprox: "0,125 B",
    example: "1 trạng thái bật/tắt (0 hoặc 1)",
  },
  {
    unit: "Byte",
    symbol: "B",
    factorLabel: "8 bit",
    bytesPowerLabel: "2^0 B",
    bytesApprox: "1 B",
    example: "1 kí tự ASCII (chữ A, số 5)",
  },
  {
    unit: "Kilobyte",
    symbol: "KB",
    factorLabel: "1024 B (2^10 B)",
    bytesPowerLabel: "2^10 B",
    bytesApprox: "1.024 B",
    example: "Khoảng nửa trang văn bản thuần",
  },
  {
    unit: "Megabyte",
    symbol: "MB",
    factorLabel: "1024 KB (2^10 KB)",
    bytesPowerLabel: "2^20 B",
    bytesApprox: "1.048.576 B",
    example: "1 bức ảnh JPG (~0,5–3 MB) hoặc 1 sách eBook",
  },
  {
    unit: "Gigabyte",
    symbol: "GB",
    factorLabel: "1024 MB (2^10 MB)",
    bytesPowerLabel: "2^30 B",
    bytesApprox: "1.073.741.824 B",
    example: "Thẻ nhớ 16 GB, USB 64 GB, bộ phim Full HD",
  },
  {
    unit: "Terabyte",
    symbol: "TB",
    factorLabel: "1024 GB (2^10 GB)",
    bytesPowerLabel: "2^40 B",
    bytesApprox: "~1,1 nghìn tỉ B",
    example: "Ổ cứng SSD/HDD máy tính hiện đại",
  },
  {
    unit: "Petabyte",
    symbol: "PB",
    factorLabel: "1024 TB (2^10 TB)",
    bytesPowerLabel: "2^50 B",
    bytesApprox: "~1,12 triệu tỉ B",
    example: "Kho lưu trữ trung tâm dữ liệu (Data Center)",
  },
  {
    unit: "Exabyte",
    symbol: "EB",
    factorLabel: "1024 PB (2^10 PB)",
    bytesPowerLabel: "2^60 B",
    bytesApprox: "2^60 Byte",
    example: "Lưu lượng dữ liệu Internet toàn cầu",
  },
  {
    unit: "Zettabyte",
    symbol: "ZB",
    factorLabel: "1024 EB (2^10 EB)",
    bytesPowerLabel: "2^70 B",
    bytesApprox: "2^70 Byte",
    example: "Tổng dữ liệu số nhân loại tạo ra hàng năm",
  },
  {
    unit: "Yottabyte",
    symbol: "YB",
    factorLabel: "1024 ZB (2^10 ZB)",
    bytesPowerLabel: "2^80 B",
    bytesApprox: "2^80 Byte",
    example: "Quy mô siêu lưu trữ tương lai",
  },
];

export const LESSON_1_QUIZ_QUESTIONS: SlideQuizItem[] = [
  {
    id: "q1",
    question: "Phát biểu nào sau đây phân biệt đúng giữa Thông tin và Dữ liệu?",
    options: [
      "Thông tin và dữ liệu hoàn toàn đồng nhất với nhau.",
      "Dữ liệu là thông tin đã được đưa vào máy tính để máy tính nhận biết và xử lí.",
      "Dữ liệu chỉ tồn tại dưới dạng văn bản giấy, không tồn tại trong máy tính.",
      "Một dữ liệu luôn chỉ mang lại duy nhất một thông tin cố định.",
    ],
    correctIndex: 1,
    explanation:
      "Theo SGK Tin học 10 Kết nối tri thức (trang 7): Dữ liệu là thông tin đã được đưa vào máy tính (dưới dạng các dãy bit 0 và 1) để máy tính có thể nhận biết và xử lí được.",
  },
  {
    id: "q2",
    question: "Định nghĩa nào về Byte là chính xác nhất?",
    options: [
      "Byte là đơn vị nhỏ nhất của thông tin, gồm 1 kí hiệu 0 hoặc 1.",
      "Byte là đơn vị dữ liệu gồm 8 bit, thường dùng lưu trữ một kí tự.",
      "Byte là đơn vị bằng 1024 bit.",
      "Byte là đơn vị dùng riêng cho tốc độ mạng Internet.",
    ],
    correctIndex: 1,
    explanation:
      "Byte (kí hiệu B) là đơn vị dữ liệu nhỏ nhất mà máy tính có thể truy cập được, gồm 8 bit (1 Byte = 8 bit).",
  },
  {
    id: "q3",
    question: "Quy đổi 2 GB sang đơn vị KB ta thu được kết quả nào?",
    options: ["2.048 KB", "20.480 KB", "2.097.152 KB", "1.048.576 KB"],
    correctIndex: 2,
    explanation:
      "1 GB = 1024 MB và 1 MB = 1024 KB. Do đó 2 GB = 2 × 1024 × 1024 = 2.097.152 KB.",
  },
  {
    id: "q4",
    question:
      "Trong tình huống Hoạt động 1 (trang 7), An nói vở ghi là dữ liệu, Minh nói tệp Word là dữ liệu, Khoa nói tệp video bài giảng là dữ liệu. Ai nói đúng?",
    options: [
      "Chỉ có Minh nói đúng vì tệp Word ở trên máy tính.",
      "Chỉ có Minh và Khoa nói đúng.",
      "Chỉ có An nói đúng vì ghi chép trong vở là nguồn gốc.",
      "Cả ba bạn An, Minh và Khoa đều nói đúng.",
    ],
    correctIndex: 3,
    explanation:
      "Cả ba bạn đều nêu đúng các dạng dữ liệu khác nhau (văn bản viết tay, tệp văn bản số, tệp video) cùng thể hiện thông tin về bài giảng Tin học.",
  },
  {
    id: "q5",
    question:
      "Một cuốn sách số hóa cần 50 MB. Thư viện 2000 cuốn sách cần khoảng bao nhiêu GB và có lưu vừa thẻ nhớ 256 GB không?",
    options: [
      "Khoảng 97,66 GB — hoàn toàn lưu vừa trong thẻ nhớ 256 GB.",
      "Khoảng 100 GB — không thể lưu vừa trong thẻ nhớ 256 GB.",
      "Khoảng 297,66 GB — cần thẻ nhớ 512 GB.",
      "Khoảng 10,24 GB — lưu vừa trong USB 16 GB.",
    ],
    correctIndex: 0,
    explanation:
      "Tổng dung lượng = 2000 × 50 MB = 100.000 MB. Đổi ra GB: 100.000 : 1024 ≈ 97,66 GB < 256 GB, nên chứa vừa thẻ nhớ 256 GB.",
  },
];

export const SLIDE_CHAPTERS = [
  {
    label: "Khởi động & Mục tiêu Bài 1",
    slideIdx: 0,
    rangeLabel: "S01–S02",
    imageUrl: "/images/slides/s01-overview-digital-class.svg",
  },
  {
    label: "1. Quá trình xử lí thông tin (Hình 1.1)",
    slideIdx: 2,
    rangeLabel: "S03–S04",
    imageUrl: "/images/slides/s03-processing-pipeline.svg",
  },
  {
    label: "Phân biệt Thông tin & Dữ liệu (HĐ1 tr.7)",
    slideIdx: 4,
    rangeLabel: "S05–S06",
    imageUrl: "/images/slides/s05-data-carriers.svg",
  },
  {
    label: "Đa dạng vật mang tin & Câu hỏi tr.8",
    slideIdx: 6,
    rangeLabel: "S07–S08",
    imageUrl: "/images/slides/s07-information-forms.svg",
  },
  {
    label: "2. Đơn vị đo dữ liệu: Bit, Byte & Bảng 1.1",
    slideIdx: 8,
    rangeLabel: "S09–S10",
    imageUrl: "/images/slides/s09-bit-byte-binary.svg",
  },
  {
    label: "Giải Câu hỏi 2 tr.8 & Số hóa 2000 sách",
    slideIdx: 10,
    rangeLabel: "S11–S12",
    imageUrl: "/images/slides/s11-library-digitization.svg",
  },
  {
    label: "3. Thiết bị số (HĐ1, HĐ2 tr.9 - Hình 1.2)",
    slideIdx: 12,
    rangeLabel: "S13–S15",
    imageUrl: "/images/slides/s13-smart-devices.jpg",
  },
  {
    label: "Luyện tập 1 & 2 (Trang 10 - Thẻ nhớ 16 GB)",
    slideIdx: 15,
    rangeLabel: "S16–S17",
    imageUrl: "/images/slides/s17-camera-sdcard.svg",
  },
  {
    label: "Vận dụng 1 & 2 (CCCD chip & Chụp ảnh số)",
    slideIdx: 17,
    rangeLabel: "S18–S19",
    imageUrl: "/images/slides/s18-cccd-qr-chip.svg",
  },
  {
    label: "Tổng kết & Trắc nghiệm củng cố",
    slideIdx: 19,
    rangeLabel: "S20",
    imageUrl: "/images/slides/s20-summary-mastery.svg",
  },
];

export const GRADE_10_LESSON_1_SLIDES: SlideItem[] = [
  {
    id: 1,
    code: "B01-S01",
    kind: "theory",
    sectionLabel: "Mở đầu & Mục tiêu",
    title: "Bài 1: Thông tin và xử lí thông tin",
    subtitle:
      "Chủ đề 1: Máy tính và xã hội tri thức — Tin học 10 (Bộ sách Kết nối tri thức với cuộc sống — SGK Mới 2026)",
    imageUrl: "/images/slides/s01-overview-digital-class.svg",
    imageCaption:
      "Không gian học tập Tin học 10: sách giáo khoa, luồng dữ liệu nhị phân 0/1, vi xử lí CPU và thiết bị số.",
    keyPoints: [
      {
        heading: "Mục tiêu 1: Thông tin & Dữ liệu",
        body: "Phân biệt được thông tin với dữ liệu trong giải quyết vấn đề và hiểu quy trình xử lí 3 bước của máy tính.",
      },
      {
        heading: "Mục tiêu 2: Đơn vị lưu trữ dữ liệu",
        body: "Biết đơn vị cơ bản Bit, Byte và quy đổi thành thạo các bội số KB, MB, GB, TB theo lũy thừa 2^10 = 1024.",
        formulaOrCode: "1 Byte = 8 bit  |  Đơn vị sau = 1024 × đơn vị trước",
      },
      {
        heading: "Mục tiêu 3: Ưu việt của thiết bị số",
        body: "Đánh giá được ưu thế vượt trội của thiết bị số trong lưu trữ, xử lí, tìm kiếm và truyền thông tin.",
      },
    ],
    interactiveWidget: "roadmap-overview",
    speakerNotes:
      "Slide mở đầu bộ bài giảng 20 slide trực quan theo SGK Tin học 10 Kết nối tri thức. Học sinh có thể bấm vào 4 chặng bên dưới để xem lộ trình bài học hoặc dùng phím mũi tên để đi tuần tự từ Slide 01 đến Slide 20.",
  },
  {
    id: 2,
    code: "B01-S02",
    kind: "activity",
    sectionLabel: "Mở đầu & Mục tiêu",
    title: "Khởi động (Trang 6): Trong bộ nhớ chỉ có bit 0 và 1?",
    subtitle:
      "Tin học nghiên cứu phương pháp xử lí thông tin tự động bằng máy tính. Nếu mọi thứ trong máy tính đều là dãy bit 0 và 1, vậy dữ liệu và thông tin khác nhau thế nào?",
    imageUrl: "/images/slides/s09-bit-byte-binary.svg",
    imageCaption:
      "Khởi động (tr.6): cách máy tính mã hóa kí tự bằng 8 bit 0/1 ghép thành 1 Byte trong bộ nhớ.",
    keyPoints: [
      {
        heading: "Thế giới bên trong máy tính",
        body: "Bộ nhớ máy tính chỉ lưu giữ và xử lí các dãy bit gồm hai kí hiệu 0 và 1 (tương ứng hai trạng thái dòng điện).",
        formulaOrCode: "01010100 01101001 01101110  ->  'Tin'",
      },
      {
        heading: "Thế giới nhận thức của con người",
        body: "Con người cần ý nghĩa, tri thức và sự hiểu biết rút ra từ các con số, văn bản, hình ảnh hoặc âm thanh.",
      },
    ],
    textbookTask: {
      badge: "Khởi động SGK",
      page: "Trang 6",
      prompt:
        "Thông tin được biểu diễn trong máy tính bằng các dãy bit (0, 1). Vậy dữ liệu và thông tin khác nhau như thế nào?",
      solutionSteps: [
        "Thông tin gắn với nhận thức của con người — là tất cả những gì đem lại sự hiểu biết về thế giới xung quanh.",
        "Dữ liệu là thông tin đã được đưa vào máy tính (biểu diễn bằng dãy bit 0 và 1) để máy tính có thể nhận biết và xử lí.",
      ],
      conclusion:
        "Dữ liệu là hình thức thể hiện để máy tính thao tác; Thông tin là ý nghĩa mà con người thu nhận sau khi đọc hoặc xử lí dữ liệu.",
    },
    interactiveWidget: "warmup-bit-reveal",
    speakerNotes:
      "Dùng widget tương tác để học sinh nhập một chữ cái hoặc từ ngắn (ví dụ: TIN, 10A) và quan sát ngay máy tính 'nhìn' thấy chuỗi bit 0/1 ra sao trong khi học sinh đọc thấy chữ có nghĩa.",
  },
  {
    id: 3,
    code: "B01-S03",
    kind: "lab",
    sectionLabel: "1. Thông tin & Dữ liệu",
    title: "Quá trình xử lí thông tin của máy tính (Hình 1.1)",
    subtitle:
      "Quá trình xử lí dữ liệu trong máy tính diễn ra theo chu trình khép kín gồm 3 bước liên hoàn.",
    imageUrl: "/images/slides/s03-processing-pipeline.svg",
    imageCaption:
      "Hình 1.1 (SGK tr.6): Sơ đồ quy trình 3 bước Thu nhận -> Xử lí -> Xuất ra thông tin.",
    keyPoints: [
      {
        heading: "Bước 1: Tiếp nhận dữ liệu",
        body: "Thu thập thông tin từ thế giới thực qua bàn phím, chuột, cảm biến, máy ảnh, tệp tin để chuyển thành dữ liệu số (dãy bit).",
      },
      {
        heading: "Bước 2: Xử lí dữ liệu",
        body: "CPU và bộ nhớ trong biến đổi, tính toán, sắp xếp hoặc đối chiếu dữ liệu đầu vào để tạo ra dữ liệu mới có cấu trúc.",
      },
      {
        heading: "Bước 3: Đưa ra kết quả",
        body: "Xuất kết quả ra màn hình, loa, máy in dưới dạng con người hiểu được hoặc lưu trữ lâu dài vào bộ nhớ ngoài.",
      },
    ],
    interactiveWidget: "info-data-pipeline",
    speakerNotes:
      "Cho học sinh chuyển đổi qua lại 3 tình huống thực tế trên Hình 1.1: (1) Tra cứu dự báo thời tiết, (2) Tính điểm trung bình môn, (3) Áp bộ lọc ảnh số trên điện thoại.",
  },
  {
    id: 4,
    code: "B01-S04",
    kind: "theory",
    sectionLabel: "1. Thông tin & Dữ liệu",
    title: "Phân biệt rạch ròi: Thông tin và Dữ liệu",
    subtitle:
      "So sánh trực diện hai khái niệm nền tảng của môn Tin học lớp 10 (SGK Trang 6–7).",
    imageUrl: "/images/slides/s03-processing-pipeline.svg",
    imageCaption:
      "Chuyển hóa giữa dữ liệu thô đầu vào (con số, kí tự, bit) và thông tin mang ý nghĩa cho con người.",
    keyPoints: [
      {
        heading: "Thông tin (Information)",
        body: "Là tất cả những gì đem lại cho con người sự hiểu biết về thế giới xung quanh và về chính bản thân mình.",
        formulaOrCode: "Đặc trưng: Mang ý nghĩa, phụ thuộc nhận thức & ngữ cảnh",
      },
      {
        heading: "Dữ liệu (Data)",
        body: "Là thông tin đã được đưa vào máy tính (hoặc ghi trên vật mang tin) dưới dạng kí hiệu, con số, văn bản, hình ảnh, âm thanh hay dãy bit.",
        formulaOrCode: "Đặc trưng: Nguyên liệu thô để máy tính lưu trữ & xử lí",
      },
    ],
    knowledgeBox: {
      title: "Hộp kiến thức (Trang 7 SGK)",
      bullets: [
        "Trong Tin học, dữ liệu là thông tin đã được đưa vào máy tính để máy tính có thể nhận biết và xử lí được.",
        "Thông tin và dữ liệu không tách rời hoàn toàn nhưng cũng không đồng nhất: dữ liệu là phương tiện mang, thông tin là nội dung ý nghĩa.",
      ],
    },
    speakerNotes:
      "Nhấn mạnh cụm từ khóa trọng tâm: Dữ liệu là thông tin ĐÃ ĐƯỢC ĐƯA VÀO MÁY TÍNH. Nếu chỉ là con số viết trên giấy chưa mã hóa cho máy tính, trong đời sống gọi là số liệu/vật mang tin, khi đưa vào máy tính sẽ thành dữ liệu số.",
  },
  {
    id: 5,
    code: "B01-S05",
    kind: "activity",
    sectionLabel: "1. Thông tin & Dữ liệu",
    title: "Hoạt động 1 (Trang 7): Bạn An, Minh hay Khoa nói đúng?",
    subtitle:
      "Khi nói về dữ liệu của một tiết giảng Tin học, ba bạn học sinh đưa ra ba ý kiến khác nhau. Hãy kiểm chứng lập luận của từng bạn.",
    imageUrl: "/images/slides/s05-data-carriers.svg",
    imageCaption:
      "Hoạt động 1 (tr.7): Ba vật mang tin của An (vở ghi), Minh (ảnh chụp), Khoa (tệp đa phương tiện trên USB).",
    keyPoints: [
      {
        heading: "Ý kiến của An",
        body: "Bài ghi chép bằng chữ viết trong vở của em là dữ liệu.",
      },
      {
        heading: "Ý kiến của Minh",
        body: "Tệp bài soạn bằng phần mềm Word của cô giáo là dữ liệu.",
      },
      {
        heading: "Ý kiến của Khoa",
        body: "Tệp video ghi lại hình ảnh và âm thanh tiết giảng của cô giáo là dữ liệu.",
      },
    ],
    textbookTask: {
      badge: "Hoạt động 1",
      page: "Trang 7",
      prompt:
        "Có thể đồng nhất thông tin với dữ liệu được không? Theo em, trong 3 bạn An, Minh và Khoa, bạn nào nói đúng?",
      solutionSteps: [
        "Không thể đồng nhất thông tin với dữ liệu: thông tin là hiểu biết rút ra từ tiết học, còn dữ liệu là cách ghi lại thông tin đó.",
        "Cả ba bạn An, Minh và Khoa đều nói đúng: mỗi bạn chỉ ra một dạng dữ liệu khác nhau (chữ viết tay trên giấy, tệp văn bản số, tệp video đa phương tiện) cùng thể hiện nội dung tiết giảng.",
      ],
      conclusion:
        "Cùng một nội dung thông tin có thể được lưu trữ dưới nhiều hình thức dữ liệu khác nhau.",
    },
    interactiveWidget: "activity-1-debate",
    speakerNotes:
      "Học sinh bấm lần lượt vào thẻ của An, Minh, Khoa hoặc 'Cả 3 bạn' ngay trên slide để tự kiểm chứng đáp án trước khi xem lời giải chi tiết.",
  },
  {
    id: 6,
    code: "B01-S06",
    kind: "lab",
    sectionLabel: "1. Thông tin & Dữ liệu",
    title: "Tính độc lập tương đối (Chiều 1): Một thông tin — Nhiều dữ liệu",
    subtitle:
      "Cùng một thông tin nhưng có thể được biểu diễn bằng nhiều dạng dữ liệu hoàn toàn khác nhau tùy hoàn cảnh sử dụng.",
    imageUrl: "/images/slides/s07-information-forms.svg",
    imageCaption:
      "Các dạng biểu diễn dữ liệu: văn bản, hình ảnh, âm thanh và ngữ cảnh đều thể hiện cùng thông tin.",
    keyPoints: [
      {
        heading: "Ví dụ 1: Quy định 'Cấm hút thuốc'",
        body: "Có thể viết thành dòng chữ 'Cấm hút thuốc lá', vẽ biển báo điếu thuốc gạch chéo đỏ, hoặc phát thông báo bằng âm thanh.",
      },
      {
        heading: "Ví dụ 2: Thời tiết 'Nắng nóng 38°C'",
        body: "Có thể hiển thị dạng bản tin văn bản, biểu tượng mặt trời + nhiệt độ trên điện thoại, hoặc dãy bit truyền từ cảm biến.",
      },
    ],
    textbookTask: {
      badge: "Câu hỏi 1",
      page: "Trang 8",
      prompt: "Em hãy cho một ví dụ về thông tin có nhiều cách thể hiện khác nhau.",
      solutionSteps: [
        "Thông tin 'Cấm hút thuốc tại nơi công cộng' thể hiện qua: (1) Biển báo hình điếu thuốc bị gạch chéo, (2) Dòng chữ cảnh báo, (3) Âm thanh nhắc nhở.",
        "Hoặc thông tin 'Ngày mai trời mưa' thể hiện qua bản tin truyền hình, biểu tượng đám mây có giọt mưa trên ứng dụng điện thoại, hay tin nhắn văn bản.",
      ],
      conclusion:
        "Thay đổi hình thức dữ liệu biểu diễn không làm thay đổi bản chất thông tin cần truyền đạt.",
    },
    interactiveWidget: "multi-form-info",
    speakerNotes:
      "Cho học sinh bấm chuyển đổi 4 dạng dữ liệu (Văn bản, Biển báo đồ họa, Thông báo thoại, Dãy bit) cho cùng một thông tin để thấy ý nghĩa vẫn giữ nguyên.",
  },
  {
    id: 7,
    code: "B01-S07",
    kind: "lab",
    sectionLabel: "1. Thông tin & Dữ liệu",
    title: "Tính độc lập tương đối (Chiều 2): Ngữ cảnh quyết định thông tin",
    subtitle:
      "Ngược lại, một dữ liệu duy nhất có thể mang lại nhiều thông tin khác nhau tùy vào ngữ cảnh, hoặc trở nên vô nghĩa nếu thiếu tính toàn vẹn.",
    imageUrl: "/images/slides/s05-data-carriers.svg",
    imageCaption:
      "Cùng một nội dung dữ liệu có thể rút ra nhiều thông tin khác nhau tùy ngữ cảnh khai thác.",
    keyPoints: [
      {
        heading: "Một dữ liệu — Nhiều thông tin",
        body: "Từ một Bảng điểm tổng kết lớp, ta có thể rút ra: điểm riêng từng bạn, điểm trung bình cả lớp, danh sách học sinh giỏi, hoặc môn có điểm cao nhất.",
      },
      {
        heading: "Tính toàn vẹn của thông tin",
        body: "Con số '08' đứng một mình không cho biết đó là 8 điểm, ngày mùng 8, hay số thứ tự 08. Thiếu ngữ cảnh hoặc mất dữ liệu đính kèm sẽ dẫn đến hiểu sai.",
      },
    ],
    textbookTask: {
      badge: "Câu hỏi 2",
      page: "Trang 8",
      prompt: "Em hãy cho một ví dụ về dữ liệu thể hiện nhiều thông tin khác nhau.",
      solutionSteps: [
        "Ví dụ 1: Bảng dữ liệu điểm thi của lớp 10A cho biết học lực của từng em, môn học thế mạnh của lớp và tỉ lệ đạt chuẩn.",
        "Ví dụ 2: Tấm ảnh chụp bầu trời vừa cho biết thời tiết lúc chụp, vừa cho biết thời gian (sáng/chiều), địa điểm hoặc cảnh quan xung quanh.",
      ],
      conclusion:
        "Thông tin rút ra từ dữ liệu phụ thuộc vào mục đích khai thác và ngữ cảnh đi kèm dữ liệu đó.",
    },
    interactiveWidget: "context-integrity",
    speakerNotes:
      "Yêu cầu học sinh bấm thử các ngữ cảnh cho dữ liệu '08' và '10/03' (Điểm kiểm tra / Ngày thi / Số thứ tự / Mất nhãn) để thấy tầm quan trọng của tính toàn vẹn.",
  },
  {
    id: 8,
    code: "B01-S08",
    kind: "summary",
    sectionLabel: "1. Thông tin & Dữ liệu",
    title: "Chốt kiến thức Phần 1: Chuỗi giá trị Dữ liệu → Thông tin",
    subtitle:
      "Tổng hợp những nguyên tắc bất biến của Thông tin và Dữ liệu trước khi chuyển sang đo lường dung lượng.",
    imageUrl: "/images/slides/s07-information-forms.svg",
    imageCaption:
      "Tổng hợp chuyển hóa hai chiều giữa Thông tin, Dữ liệu đa phương thức và Ngữ cảnh toàn vẹn.",
    keyPoints: [
      {
        heading: "Nguyên tắc 1: Chuyển hóa hai chiều",
        body: "Con người biến thông tin thành dữ liệu để đưa vào máy tính; máy tính xử lí dữ liệu để trả về thông tin phục vụ con người.",
        formulaOrCode: "Thông tin  --(Mã hóa)-->  Dữ liệu  --(Xử lí)-->  Thông tin mới",
      },
      {
        heading: "Nguyên tắc 2: Độc lập tương đối & Toàn vẹn",
        body: "Một thông tin có thể biểu diễn bằng nhiều dạng dữ liệu. Ngược lại, dữ liệu chỉ tạo ra thông tin chuẩn xác khi giữ đủ ngữ cảnh và tính toàn vẹn.",
      },
    ],
    knowledgeBox: {
      title: "Ghi nhớ chuẩn SGK Kết nối tri thức",
      bullets: [
        "Thông tin là hiểu biết của con người; Dữ liệu là thông tin đã đưa vào máy tính.",
        "Cùng một thông tin có thể có nhiều dữ liệu thể hiện; cùng một dữ liệu có thể mang lại nhiều thông tin khác nhau.",
      ],
    },
    speakerNotes:
      "Dừng lại 1 phút cho học sinh hệ thống lại toàn bộ Phần 1. Đây là phần thường ra câu hỏi trắc nghiệm lý thuyết phân biệt đúng/sai trong đề kiểm tra giữa kì.",
  },
  {
    id: 9,
    code: "B01-S09",
    kind: "lab",
    sectionLabel: "2. Đơn vị lưu trữ",
    title: "Bit và Byte: Hai đơn vị cơ bản đo lượng dữ liệu",
    subtitle:
      "Mọi tệp văn bản, hình ảnh hay video trong máy tính đều được đo lường bắt đầu từ Bit và Byte.",
    imageUrl: "/images/slides/s09-bit-byte-binary.svg",
    imageCaption:
      "Cấu tạo 1 Byte = 8 bit liên tiếp: ví dụ 01000001 (64 + 1 = 65) biểu diễn chữ cái 'A' trong bộ nhớ.",
    keyPoints: [
      {
        heading: "Bit (Binary Digit)",
        body: "Là đơn vị nhỏ nhất dùng để đo lượng dữ liệu. Mỗi bit chỉ biểu diễn một trong hai trạng thái 0 hoặc 1.",
        formulaOrCode: "1 bit ∈ {0, 1}   (2 trạng thái phân biệt)",
      },
      {
        heading: "Byte (kí hiệu: B)",
        body: "Là đơn vị dữ liệu nhỏ nhất mà máy tính có thể truy cập trực tiếp. Một Byte gồm đúng 8 bit, đủ biểu diễn 256 tổ hợp (lưu vừa 1 kí tự bảng mã ASCII).",
        formulaOrCode: "1 Byte = 8 bit  |  2^8 = 256 trạng thái",
      },
    ],
    interactiveWidget: "bit-byte-toggle",
    speakerNotes:
      "Học sinh bật/tắt 8 công tắc bit ngay trên slide để thấy cách 8 bit ghép thành 1 Byte tạo ra chữ cái 'A' (01000001 = 65), chữ 'T' (01010100 = 84) hay kí tự bất kì.",
  },
  {
    id: 10,
    code: "B01-S10",
    kind: "lab",
    sectionLabel: "2. Đơn vị lưu trữ",
    title: "Bảng 1.1: Thang đơn vị lưu trữ (Bội số 2^10 = 1024)",
    subtitle:
      "Trong tin học, hai đơn vị đo dung lượng liền kề nhau chênh lệch đúng 1024 lần (tức 2 lũy thừa 10), không phải 1000 lần.",
    imageUrl: "/images/slides/s10-unit-scale.svg",
    imageCaption:
      "Bảng 1.1 (SGK tr.8): Thang bậc đơn vị tăng theo hệ số 2^10 = 1024 từ Bit, Byte tới KB, MB, GB, TB.",
    keyPoints: [
      {
        heading: "Quy luật nhân/chia 1024",
        body: "Đổi từ đơn vị lớn sang đơn vị nhỏ hơn liền kề ta nhân với 1024; đổi từ đơn vị nhỏ sang đơn vị lớn hơn liền kề ta chia cho 1024.",
        formulaOrCode: "B -> KB -> MB -> GB -> TB -> PB -> EB -> ZB -> YB",
      },
      {
        heading: "Bối cảnh thực tế của các bậc đơn vị",
        body: "Văn bản nhẹ tính bằng KB; ảnh chụp và nhạc tính bằng MB; thẻ nhớ, phim và hệ điều hành tính bằng GB; ổ cứng và máy chủ tính bằng TB, PB.",
      },
    ],
    interactiveWidget: "unit-ladder",
    speakerNotes:
      "Cho học sinh bấm từng bậc từ Bit -> Byte -> KB -> MB -> GB -> TB -> PB -> YB trên thang Bảng 1.1 để nắm vững lũy thừa 2^10, 2^20, 2^30, 2^40.",
  },
  {
    id: 11,
    code: "B01-S11",
    kind: "exercise",
    sectionLabel: "2. Đơn vị lưu trữ",
    title: "Giải Câu hỏi Trang 8: Quy đổi MB, GB, B sang KB",
    subtitle:
      "Áp dụng Bảng 1.1 để giải quyết trọn vẹn 2 câu hỏi kiểm tra kiến thức cuối mục 2 (SGK Trang 8).",
    imageUrl: "/images/slides/s10-unit-scale.svg",
    imageCaption:
      "Sơ đồ chuyển đổi bậc thang × 1024 giúp giải nhanh a) 3 MB, b) 2 GB và c) 2048 B sang KB.",
    keyPoints: [
      {
        heading: "Câu 1: Định nghĩa nào về Byte là đúng?",
        body: "Byte là đơn vị dữ liệu gồm 8 bit (thường tương ứng dung lượng lưu 1 kí tự).",
      },
      {
        heading: "Câu 2: Quy đổi ra KB — a) 3 MB | b) 2 GB | c) 2048 B",
        body: "Nhớ quy tắc bắc cầu: từ GB sang KB đi qua 2 bậc nên nhân 1024 × 1024 = 1.048.576; từ B sang KB chia 1024.",
        formulaOrCode: "3 MB = 3.072 KB  |  2 GB = 2.097.152 KB  |  2048 B = 2 KB",
      },
    ],
    textbookTask: {
      badge: "Câu hỏi 1 & 2",
      page: "Trang 8",
      prompt: "Quy đổi các lượng tin sau ra KB: a) 3 MB; b) 2 GB; c) 2048 B.",
      solutionSteps: [
        "a) 3 MB = 3 × 1024 KB = 3.072 KB.",
        "b) 2 GB = 2 × 1024 MB = 2 × 1024 × 1024 KB = 2.097.152 KB.",
        "c) 2048 B = 2048 : 1024 KB = 2 KB.",
      ],
      conclusion:
        "Kết quả lần lượt là 3.072 KB, 2.097.152 KB và 2 KB.",
    },
    interactiveWidget: "unit-converter-questions",
    speakerNotes:
      "Học sinh có thể bấm vào 3 nút mẫu a) 3 MB, b) 2 GB, c) 2048 B để xem từng phép tính trung gian, hoặc tự nhập số mới để luyện thêm.",
  },
  {
    id: 12,
    code: "B01-S12",
    kind: "lab",
    sectionLabel: "2. Đơn vị lưu trữ",
    title: "Bài toán thực tế: Số hóa thư viện 2.000 cuốn sách",
    subtitle:
      "Ứng dụng đổi đơn vị lưu trữ để đánh giá khả năng chứa toàn bộ thư viện trường học trong một chiếc thẻ nhớ.",
    imageUrl: "/images/slides/s11-library-digitization.svg",
    imageCaption:
      "Thư viện 2.000 cuốn sách (× 50 MB = 100.000 MB ≈ 97,66 GB) nằm gọn trong ổ cứng SSD / thẻ nhớ 256 GB.",
    keyPoints: [
      {
        heading: "Bước 1: Tính tổng dung lượng theo MB",
        body: "Mỗi cuốn sách số hóa (văn bản và hình ảnh) chiếm khoảng 50 MB. Vậy 2.000 cuốn sách cần tổng cộng 100.000 MB.",
        formulaOrCode: "2.000 × 50 MB = 100.000 MB",
      },
      {
        heading: "Bước 2: Quy đổi ra GB và đối chiếu thẻ nhớ 256 GB",
        body: "Chia 100.000 MB cho 1024 ta được xấp xỉ 97,66 GB. Vì 97,66 GB < 256 GB nên thẻ nhớ 256 GB chứa hoàn toàn thoải mái.",
        formulaOrCode: "100.000 : 1024 ≈ 97,66 GB  <  256 GB",
      },
    ],
    textbookTask: {
      badge: "Câu hỏi SGK",
      page: "Trang 9–10",
      prompt:
        "Một cuốn sách số hóa cần khoảng 50 MB. Thư viện có 2000 cuốn sách: cần khoảng bao nhiêu GB và có chứa được trong thẻ nhớ 256 GB không?",
      solutionSteps: [
        "Tổng dung lượng cần thiết: 2000 × 50 MB = 100.000 MB.",
        "Đổi sang đơn vị GB: 100.000 : 1024 ≈ 97,66 GB (làm tròn ~98 GB).",
        "So sánh với thẻ nhớ: 97,66 GB < 256 GB.",
      ],
      conclusion:
        "Cần khoảng 97,66 GB và hoàn toàn chứa vừa cả thư viện 2.000 cuốn sách vào một chiếc thẻ nhớ 256 GB nhỏ gọn.",
    },
    interactiveWidget: "library-digitization",
    speakerNotes:
      "Khuyến khích học sinh kéo thanh trượt số cuốn sách từ 2.000 lên 5.000 hoặc 8.000 cuốn để xem khi nào vượt ngưỡng thẻ nhớ 128 GB và 256 GB.",
  },
  {
    id: 13,
    code: "B01-S13",
    kind: "activity",
    sectionLabel: "3. Thiết bị số",
    title: "Hoạt động 1 & 2 (Trang 9): Nhận diện & So sánh thiết bị số (Hình 1.2)",
    subtitle:
      "Thiết bị làm việc với thông tin số (lưu trữ, truyền dữ liệu, xử lí thông tin số) được gọi chung là thiết bị số.",
    imageUrl: "/images/slides/s13-smart-devices.jpg",
    imageCaption:
      "Hình 1.2 (SGK tr.9): Bộ thu phát Wi-Fi, thẻ nhớ SD, laptop cùng cặp đồng hồ & quạt cơ / thông minh.",
    keyPoints: [
      {
        heading: "Hoạt động 1: Phân loại thiết bị trong Hình 1.2",
        body: "Bộ thu phát Wi-Fi, Thẻ nhớ và Máy tính xách tay là thiết bị số. Đồng hồ cơ và Quạt điện cơ là thiết bị thường — có phiên bản số tương ứng là Đồng hồ thông minh và Quạt thông minh.",
      },
      {
        heading: "Hoạt động 2: So sánh thiết bị thường và thiết bị số",
        body: "Giống nhau ở chức năng gốc (xem giờ, làm mát); khác nhau ở năng suất, tính chính xác, tự động hóa hẹn giờ và điều khiển kết nối từ xa.",
      },
    ],
    textbookTask: {
      badge: "Hoạt động 1 & 2",
      page: "Trang 9",
      prompt:
        "Trong Hình 1.2, thiết bị nào là thiết bị số? Hãy so sánh thiết bị không thuộc loại số với thiết bị số tương ứng.",
      solutionSteps: [
        "Thiết bị số: Bộ thu phát Wi-Fi, Thẻ nhớ, Laptop. Thiết bị thường: Đồng hồ cơ (-> Đồng hồ thông minh), Quạt điện cơ (-> Quạt thông minh).",
        "Giống nhau: Đều thực hiện chức năng cơ bản ban đầu (xem giờ, tạo gió mát).",
        "Khác nhau: Thiết bị số có bộ vi xử lí nên chạy chính xác, tự động lập lịch, đo thêm chỉ số sức khỏe/môi trường và điều khiển qua ứng dụng điện thoại.",
      ],
      conclusion:
        "Thiết bị số kế thừa chức năng gốc nhưng bổ sung trí tuệ xử lí, tự động hóa và khả năng kết nối mạng.",
    },
    interactiveWidget: "device-activity-2",
    speakerNotes:
      "Học sinh bấm chọn từng thiết bị trong danh sách Hình 1.2 trên slide để kiểm tra phân loại và xem bảng so sánh chi tiết từng cặp.",
  },
  {
    id: 14,
    code: "B01-S14",
    kind: "lab",
    sectionLabel: "3. Thiết bị số",
    title: "4 ưu điểm vượt trội của thiết bị số (Thư bưu điện vs Email)",
    subtitle:
      "Vì sao xã hội hiện đại chuyển dịch mạnh mẽ từ giấy tờ thủ công sang thiết bị số?",
    imageUrl: "/images/slides/s14-mail-vs-email.jpg",
    imageCaption:
      "Đối chiếu trực quan: gửi thư bưu điện vật lí nhiều ngày với gửi thư điện tử (Email) tức thời qua mạng toàn cầu.",
    keyPoints: [
      {
        heading: "1. Xử lí tốc độ cao, chính xác, ổn định",
        body: "Bộ vi xử lí thực hiện hàng tỉ phép tính mỗi giây mà không mệt mỏi hay sai sót chủ quan như tính nhẩm thủ công.",
      },
      {
        heading: "2. Lưu trữ khổng lồ, giá rẻ & Tìm kiếm nhanh",
        body: "Một thẻ nhớ nhỏ bằng móng tay chứa cả thư viện sách, hỗ trợ tìm kiếm từ khóa và sao chép trong tích tắc.",
      },
      {
        heading: "3. Truyền thông tin tức thời toàn cầu",
        body: "Gửi thư bưu điện mất vài ngày đến nhiều tuần và tốn tem phí; gửi thư điện tử (Email) chỉ mất vài giây, đính kèm được cả ảnh, video, tài liệu.",
      },
    ],
    interactiveWidget: "device-comparison",
    speakerNotes:
      "Học sinh chuyển 4 tab Lưu trữ / Xử lí / Tìm kiếm / Truyền tin (Thư bưu điện vs Email) để thấy rõ lợi thế cụ thể của thiết bị số ở từng khía cạnh.",
  },
  {
    id: 15,
    code: "B01-S15",
    kind: "theory",
    sectionLabel: "3. Thiết bị số",
    title: "Thiết bị số trong thực tế: Phân tích chiếc Điện thoại thông minh",
    subtitle:
      "Một thiết bị số quen thuộc hằng ngày hội tụ đủ cả ba năng lực: Lưu trữ — Xử lí — Truyền thông tin.",
    imageUrl: "/images/slides/s13-smart-devices.jpg",
    imageCaption:
      "Hệ sinh thái thiết bị số thông minh: đồng hồ thông minh, laptop, router Wi-Fi và thẻ nhớ SD gắn kết dữ liệu.",
    keyPoints: [
      {
        heading: "Lưu trữ thông tin số",
        body: "Bộ nhớ trong 128 GB – 512 GB cùng lưu trữ đám mây giúp lưu hàng chục nghìn bức ảnh, video, danh bạ và tài liệu học tập dưới dạng dãy bit.",
      },
      {
        heading: "Xử lí thông tin tự động",
        body: "CPU và chip AI xử lí dữ liệu từ camera để mở khóa khuôn mặt, khử nhiễu ảnh chụp, dịch văn bản tức thì và chạy ứng dụng học tập.",
      },
      {
        heading: "Truyền thông tin qua Internet",
        body: "Kết nối Wi-Fi và mạng 4G/5G giúp truyền tải thông điệp, gọi video và đồng bộ bài học đi khắp thế giới trong vài mili-giây.",
      },
    ],
    knowledgeBox: {
      title: "Hộp kiến thức (Trang 9–10 SGK)",
      bullets: [
        "Thiết bị số xử lí thông tin với tốc độ rất cao, độ chính xác và tính ổn định vượt trội.",
        "Thiết bị số giúp lưu trữ lượng dữ liệu khổng lồ với chi phí nhỏ gọn, dễ tìm kiếm và truyền tin tốc độ cao.",
      ],
    },
    speakerNotes:
      "Liên hệ ngay thiết bị các em đang cầm trên tay (Smartphone/Laptop) để minh họa 3 chức năng cốt lõi của thiết bị số.",
  },
  {
    id: 16,
    code: "B01-S16",
    kind: "exercise",
    sectionLabel: "4. Luyện tập & Vận dụng",
    title: "Luyện tập 1 (Trang 10): Rút thông tin từ dữ liệu điểm các môn học",
    subtitle:
      "Từ bảng dữ liệu điểm số, có thể rút ra những thông tin gì và mô tả sơ bộ quá trình xử lí để tạo ra thông tin đó.",
    imageUrl: "/images/slides/s16-gradebook-analytics.jpg",
    imageCaption:
      "Luyện tập 1 (tr.10): Trực quan hóa bảng điểm học sinh thành biểu đồ cột, biểu đồ tròn và xếp loại học lực.",
    keyPoints: [
      {
        heading: "Những thông tin có thể rút ra",
        body: "Điểm trung bình các môn (ĐTB), xếp loại học lực (Tốt/Khá/Đạt), môn học thế mạnh (điểm cao nhất), môn cần cải thiện (điểm thấp nhất).",
      },
      {
        heading: "Mô tả 3 bước xử lí tính Điểm trung bình",
        body: "(1) Tiếp nhận: Nhập điểm từng môn; (2) Xử lí: Cộng tổng điểm rồi chia cho số môn; (3) Xuất kết quả: Hiển thị ĐTB giúp nhận biết học lực.",
      },
    ],
    textbookTask: {
      badge: "Luyện tập 1",
      page: "Trang 10",
      prompt:
        "Từ dữ liệu điểm các môn học của học sinh, có thể rút ra những thông tin gì? Mô tả sơ bộ xử lí để ra một thông tin trong số đó.",
      solutionSteps: [
        "Thông tin rút ra: Điểm trung bình, xếp loại học lực, môn điểm cao nhất/thấp nhất, xu hướng tiến bộ qua các kì.",
        "Xử lí tính ĐTB: Tiếp nhận các con số điểm -> Tính tổng điểm chia cho số môn -> Đưa ra kết quả ĐTB trên màn hình.",
      ],
      conclusion:
        "Cùng một bảng điểm dữ liệu, phép xử lí khác nhau sẽ mang lại nhiều thông tin giá trị phục vụ việc học tập.",
    },
    interactiveWidget: "gradebook-lab",
    speakerNotes:
      "Học sinh nhập/chỉnh sửa điểm 5 môn ngay trên bảng điểm tương tác của slide để quan sát hệ thống tự chạy 3 bước xử lí và xếp loại học lực theo thời gian thực.",
  },
  {
    id: 17,
    code: "B01-S17",
    kind: "exercise",
    sectionLabel: "4. Luyện tập & Vận dụng",
    title: "Luyện tập 2 (Trang 10): Thẻ nhớ 16 GB chứa được bao nhiêu ảnh?",
    subtitle:
      "Sử dụng danh sách dung lượng 4 tệp ảnh mẫu trong Hình 1.3 để tính sức chứa tối đa của thẻ nhớ máy ảnh số.",
    imageUrl: "/images/slides/s17-camera-sdcard.svg",
    imageCaption:
      "Hình 1.3 (SGK tr.10): Máy ảnh số, thẻ nhớ 16 GB và 4 tệp ảnh mẫu (438, 585, 418, 741 KB).",
    keyPoints: [
      {
        heading: "Bước 1: Tính dung lượng trung bình 1 ảnh (Hình 1.3)",
        body: "4 tệp ảnh mẫu có dung lượng: 438 KB, 585 KB, 418 KB, 741 KB. Trung bình = (438 + 585 + 418 + 741) / 4 = 545,5 KB/ảnh.",
        formulaOrCode: "TB = 2.182 KB : 4 = 545,5 KB",
      },
      {
        heading: "Bước 2: Quy đổi 16 GB ra KB & Chia cho trung bình",
        body: "16 GB = 16 × 1024 × 1024 = 16.777.216 KB. Chia cho 545,5 KB thu được tối đa xấp xỉ 30.755 ảnh.",
        formulaOrCode: "16.777.216 KB : 545,5 KB ≈ 30.755 ảnh",
      },
    ],
    textbookTask: {
      badge: "Luyện tập 2",
      page: "Trang 10",
      prompt:
        "Hình 1.3 là danh sách các tệp ảnh từ thẻ nhớ máy ảnh số. Em hãy tính xem thẻ nhớ 16 GB có thể chứa tối đa bao nhiêu ảnh theo độ lớn trung bình?",
      solutionSteps: [
        "Độ lớn trung bình 1 ảnh = (438 + 585 + 418 + 741) / 4 = 545,5 KB.",
        "Đổi dung lượng thẻ nhớ: 16 GB = 16 × 1024 × 1024 KB = 16.777.216 KB.",
        "Số ảnh tối đa = 16.777.216 / 545,5 ≈ 30.755 ảnh (lấy phần nguyên).",
      ],
      conclusion:
        "Một thẻ nhớ 16 GB có thể chứa khoảng 30.755 bức ảnh có dung lượng trung bình 545,5 KB.",
    },
    interactiveWidget: "sdcard-16gb-lab",
    speakerNotes:
      "Lưu ý học sinh phép đổi 16 GB sang KB phải nhân 1024 hai lần (GB -> MB -> KB). Học sinh có thể đổi thử thẻ nhớ 8 GB, 32 GB, 64 GB ngay trên slide.",
  },
  {
    id: 18,
    code: "B01-S18",
    kind: "exercise",
    sectionLabel: "4. Luyện tập & Vận dụng",
    title: "Vận dụng 1 (Trang 10): Thẻ Căn cước công dân gắn chip & QR code",
    subtitle:
      "Tại sao thông tin công dân vừa được in trực tiếp trên mặt thẻ, vừa mã hóa thành mã QR và ghi vào chip nhớ điện tử?",
    imageUrl: "/images/slides/s18-cccd-qr-chip.svg",
    imageCaption:
      "Vận dụng 1 (tr.10): Căn cước công dân kết hợp chữ in, mã QR 2D và chip RFID/NFC bảo mật đa lớp.",
    keyPoints: [
      {
        heading: "1. Đọc nhanh & Thuận tiện thủ tục hành chính",
        body: "Quét mã QR hoặc đầu đọc chip giúp nhập tự động chính xác họ tên, ngày sinh, số định danh chỉ trong 1 giây, loại bỏ sai sót gõ tay.",
      },
      {
        heading: "2. Bảo mật cao & Chống giả mạo",
        body: "Dữ liệu trong chip điện tử được mã hóa mật mã học kèm sinh trắc học (vân tay, khuôn mặt), cực kì khó làm giả.",
      },
      {
        heading: "3. Tích hợp dữ liệu đa ngành",
        body: "Chip nhớ có dung lượng đủ lớn để tích hợp thêm Bảo hiểm y tế, Giấy phép lái xe, thông tin cư trú mà không cần mang nhiều thẻ giấy.",
      },
    ],
    textbookTask: {
      badge: "Vận dụng 1",
      page: "Trang 10",
      prompt:
        "Trong thẻ CCCD gắn chip, thông tin được in trên thẻ, mã hóa trong QR code và ghi vào chip nhớ. Theo em, điều đó có lợi gì?",
      solutionSteps: [
        "Lưu trữ phong phú & tích hợp đa ngành (BHYT, GPLX, định danh điện tử) trong một tấm thẻ gọn nhẹ.",
        "Bảo mật cao, dữ liệu số được mã hóa chống sao chép và làm giả.",
        "Tiết kiệm thời gian làm thủ tục: máy quét QR/chip tiếp nhận dữ liệu tự động thay vì nhập liệu thủ công.",
      ],
      conclusion:
        "Là ví dụ điển hình của một dữ liệu định danh được biểu diễn qua nhiều dạng (chữ in, mã vạch 2D, bộ nhớ chip) để tối ưu độ chính xác và tiện ích.",
    },
    interactiveWidget: "cccd-chip-lab",
    speakerNotes:
      "Cho học sinh bấm qua 3 lớp trên thẻ CCCD mô phỏng (Chữ in / Mã QR / Chip NFC) để thấy cùng một dữ liệu công dân được biểu diễn ra sao ở từng lớp.",
  },
  {
    id: 19,
    code: "B01-S19",
    kind: "exercise",
    sectionLabel: "4. Luyện tập & Vận dụng",
    title: "Vận dụng 2 (Trang 10): Thiết bị số thay đổi cơ bản việc chụp ảnh",
    subtitle:
      "So sánh máy ảnh dùng cuộn phim truyền thống với máy ảnh kĩ thuật số và smartphone ngày nay.",
    imageUrl: "/images/slides/s19-film-vs-digital.svg",
    imageCaption:
      "Vận dụng 2 (tr.10): Chuyển dịch từ cuộn phim analog (36 kiểu, tráng hóa chất) sang cảm biến CMOS đa điểm ảnh.",
    keyPoints: [
      {
        heading: "Từ giới hạn 36 kiểu phim đến hàng nghìn ảnh số",
        body: "Máy ảnh phim chỉ chụp được 24–36 kiểu mỗi cuộn và phải mang tráng rửa hóa chất mới xem được; thẻ nhớ số lưu hàng chục nghìn ảnh và xem lại ngay lập tức.",
      },
      {
        heading: "Xử lí thông minh & Không tốn hóa chất",
        body: "Cảm biến số, tự động lấy nét, chống rung và thuật toán cân bằng sáng giúp chụp đẹp mọi hoàn cảnh, xóa ảnh hỏng ngay không gây rác thải hóa chất.",
      },
      {
        heading: "Chỉnh sửa & Chia sẻ tức thì qua Internet",
        body: "Ảnh là tệp dữ liệu số nên dễ dàng cắt ghép, chỉnh màu bằng phần mềm và gửi cho người thân toàn cầu chỉ trong vài giây.",
      },
    ],
    textbookTask: {
      badge: "Vận dụng 2",
      page: "Trang 10",
      prompt:
        "Hãy tìm hiểu và mô tả vai trò của thiết bị số trong việc làm thay đổi cơ bản việc chụp ảnh.",
      solutionSteps: [
        "Lưu trữ & Xem lại: Lưu hàng nghìn ảnh trên thẻ nhớ, xem trước và xóa ngay ảnh chưa ưng ý mà không tốn phim hay hóa chất rửa ảnh.",
        "Chất lượng xử lí: Tích hợp cảm biến số, AI lấy nét khuôn mặt, chống rung quang học giúp ai cũng chụp được ảnh rõ nét.",
        "Chỉnh sửa & Chia sẻ: Tệp ảnh dễ sao chép, hậu kì trên điện thoại/máy tính và truyền tải tức thời qua mạng xã hội, email.",
      ],
      conclusion:
        "Thiết bị số đã biến chụp ảnh từ quy trình cơ-hóa học tốn kém thành hoạt động xử lí dữ liệu nhanh, thông minh và thân thiện môi trường.",
    },
    interactiveWidget: "photo-revolution-lab",
    speakerNotes:
      "Học sinh bấm đối chiếu 4 khía cạnh (Lưu trữ, Xem lại, Chỉnh sửa, Chia sẻ) giữa máy ảnh phim xưa và thiết bị số nay.",
  },
  {
    id: 20,
    code: "B01-S20",
    kind: "summary",
    sectionLabel: "Tổng kết & Trắc nghiệm",
    title: "Tổng kết Bài 1 & Kiểm tra nhanh 5 câu trắc nghiệm",
    subtitle:
      "Hoàn thành 20/20 slide của Bài 1: Thông tin và xử lí thông tin. Hãy thử sức ngay với 5 câu hỏi ôn tập chuẩn SGK Mới 2026!",
    imageUrl: "/images/slides/s20-summary-mastery.svg",
    imageCaption:
      "Bản đồ tư duy hệ thống hóa 4 trụ cột Bài 1 trước khi thực hiện 5 câu trắc nghiệm đánh giá.",
    keyPoints: [
      {
        heading: "Trụ cột 1: Thông tin ≠ Dữ liệu",
        body: "Dữ liệu là thông tin đã đưa vào máy tính (dãy bit). Tính độc lập tương đối & tính toàn vẹn quyết định ý nghĩa thông tin.",
      },
      {
        heading: "Trụ cột 2: Thang đơn vị 2^10 = 1024",
        body: "1 Byte = 8 bit; B → KB → MB → GB → TB → PB → EB → ZB → YB (nhân/chia 1024).",
      },
      {
        heading: "Trụ cột 3: 4 ưu thế thiết bị số",
        body: "Xử lí nhanh ổn định — Lưu trữ khổng lồ giá rẻ — Tìm kiếm chỉnh sửa dễ — Truyền thông tức thời.",
      },
    ],
    interactiveWidget: "final-quiz",
    speakerNotes:
      "Chúc mừng học sinh hoàn thành trọn vẹn 20 slide Bài 1! Thực hiện 5 câu trắc nghiệm ngay trên màn hình để kiểm tra mức độ nắm vững kiến thức trước khi sang Bài 2: Vai trò của thiết bị thông minh và tin học đối với xã hội.",
  },
];

function createStandardLessonSlides(params: {
  prefix: string;
  title: string;
  topic: string;
  gradeLabel: string;
  concepts: { heading: string; body: string; code?: string }[];
  activityPrompt: string;
  activityAnswer: string[];
  activityConclusion: string;
  practiceItems: { heading: string; body: string; code?: string }[];
  summaryBullets: string[];
}): SlideItem[] {
  return [
    {
      id: 1,
      code: `${params.prefix}-S01`,
      kind: "theory",
      sectionLabel: "Khởi động",
      title: params.title,
      subtitle: `${params.topic} — ${params.gradeLabel} (Kết nối tri thức với cuộc sống)`,
      imageUrl: "/images/slides/s01-overview-digital-class.svg",
      imageCaption: `Tổng quan ${params.title} (${params.gradeLabel}) — Mục tiêu và lộ trình tự học trực quan.`,
      keyPoints: [
        {
          heading: "Vị trí bài học",
          body: `Bài học mở đầu giúp học sinh ${params.gradeLabel} làm quen khái niệm cốt lõi thuộc ${params.topic}.`,
        },
        {
          heading: "Phương pháp tự học",
          body: "Đọc từng slide theo thứ tự, quan sát hình minh họa, đối chiếu hộp kiến thức chuẩn SGK và tự trả lời câu hỏi vận dụng ở cuối bài.",
        },
      ],
      speakerNotes: `Slide mở đầu của bài ${params.title}. Dùng phím mũi tên trái/phải để lật trang.`,
    },
    {
      id: 2,
      code: `${params.prefix}-S02`,
      kind: "theory",
      sectionLabel: "Kiến thức trọng tâm",
      title: `Khám phá kiến thức: ${params.concepts[0]?.heading ?? params.title}`,
      subtitle: "Nội dung lý thuyết trọng tâm theo chuẩn Chương trình GDPT Mới.",
      imageUrl: "/images/slides/s03-processing-pipeline.svg",
      imageCaption: `Minh họa quy trình khái niệm cốt lõi: ${params.concepts[0]?.heading ?? params.title}.`,
      keyPoints: params.concepts.slice(0, 2).map((item) => ({
        heading: item.heading,
        body: item.body,
        formulaOrCode: item.code,
      })),
      speakerNotes: "Trình bày khái niệm cốt lõi kèm ví dụ gần gũi với học sinh.",
    },
    {
      id: 3,
      code: `${params.prefix}-S03`,
      kind: "theory",
      sectionLabel: "Phân tích & Mở rộng",
      title: params.concepts[2]?.heading ?? "Ứng dụng trong đời sống",
      subtitle: "Mở rộng liên hệ thực tế và lưu ý khi thao tác với máy tính.",
      imageUrl: "/images/slides/s05-data-carriers.svg",
      imageCaption: `Liên hệ thực tiễn & đa dạng tình huống ứng dụng của ${params.title}.`,
      keyPoints: params.concepts.slice(2).length
        ? params.concepts.slice(2).map((item) => ({
            heading: item.heading,
            body: item.body,
            formulaOrCode: item.code,
          }))
        : params.concepts.slice(0, 2).map((item) => ({
            heading: item.heading,
            body: item.body,
            formulaOrCode: item.code,
          })),
      knowledgeBox: {
        title: "Hộp kiến thức cần ghi nhớ",
        bullets: params.summaryBullets,
      },
      speakerNotes: "Giúp học sinh chốt được quy tắc hoặc nhận diện đúng đối tượng.",
    },
    {
      id: 4,
      code: `${params.prefix}-S04`,
      kind: "activity",
      sectionLabel: "Hoạt động thảo luận",
      title: "Hoạt động thực hành & Vận dụng SGK",
      subtitle: "Vận dụng kiến thức vừa học để giải quyết tình huống thực tế.",
      imageUrl: "/images/slides/s13-smart-devices.jpg",
      imageCaption: `Hoạt động thảo luận & thực hành trực quan (${params.gradeLabel}).`,
      keyPoints: [
        {
          heading: "Tình huống đặt ra",
          body: params.activityPrompt,
        },
        {
          heading: "Hướng dẫn tư duy",
          body: params.activityConclusion,
        },
      ],
      textbookTask: {
        badge: "Hoạt động SGK",
        page: params.gradeLabel,
        prompt: params.activityPrompt,
        solutionSteps: params.activityAnswer,
        conclusion: params.activityConclusion,
      },
      speakerNotes: "Học sinh tự suy nghĩ 1 phút trước khi đối chiếu phần Gợi ý giải SGK.",
    },
    {
      id: 5,
      code: `${params.prefix}-S05`,
      kind: "exercise",
      sectionLabel: "Luyện tập",
      title: "Bài tập củng cố & Thực hành nhanh",
      subtitle: "Rèn luyện kĩ năng phân biệt và thao tác đúng quy trình.",
      imageUrl: "/images/slides/s16-gradebook-analytics.jpg",
      imageCaption: `Bài tập thực hành củng cố kĩ năng phân tích & xử lí dữ liệu (${params.gradeLabel}).`,
      keyPoints: params.practiceItems.map((item) => ({
        heading: item.heading,
        body: item.body,
        formulaOrCode: item.code,
      })),
      speakerNotes: "Kiểm tra nhanh khả năng vận dụng kiến thức vào tình huống cụ thể.",
    },
    {
      id: 6,
      code: `${params.prefix}-S06`,
      kind: "summary",
      sectionLabel: "Tổng kết bài học",
      title: `Tổng kết: ${params.title}`,
      subtitle: "Tóm tắt toàn bộ các ý cốt lõi chuẩn bị cho bài học tiếp theo.",
      imageUrl: "/images/slides/s20-summary-mastery.svg",
      imageCaption: `Bản đồ tổng kết trọng tâm kiến thức bài ${params.title}.`,
      keyPoints: params.summaryBullets.map((b, idx) => ({
        heading: `Ghi nhớ ${idx + 1}`,
        body: b,
      })),
      knowledgeBox: {
        title: "Chốt bài học",
        bullets: params.summaryBullets,
      },
      speakerNotes:
        "Có thể chuyển sang Bài 1 Tin học 10 (20 slide) ở kho bài giảng để trải nghiệm đầy đủ sơ đồ minh họa và phòng thí nghiệm Bit/Byte tương tác.",
    },
  ];
}

export const MULTI_GRADE_DECKS: PresentationDeck[] = [
  {
    id: "th10-kntt-b01",
    catalogCode: "TH10-KNTT-B01",
    level: "thpt",
    levelName: "THPT (Lớp 10–12)",
    grade: 10,
    bookSeries: "Kết nối tri thức (SGK Mới 2026)",
    topicNumber: "Chủ đề 1",
    topicName: "Máy tính và xã hội tri thức",
    lessonNumber: "Bài 1",
    title: "Thông tin và xử lí thông tin",
    durationMinutes: 45,
    slideCount: GRADE_10_LESSON_1_SLIDES.length,
    summary:
      "Bộ bài giảng tương tác đầy đủ 20 slide kèm hình minh họa trực quan: phân biệt Thông tin & Dữ liệu, tính độc lập tương đối, bảng đơn vị Bit/Byte/KB/MB/GB/TB (2^10 = 1024), ưu điểm thiết bị số và giải trọn vẹn Hoạt động, Câu hỏi, Luyện tập 1–2, Vận dụng 1–2 SGK.",
    learningObjectives: [
      "Phân biệt được thông tin và dữ liệu, tính độc lập tương đối và tính toàn vẹn của thông tin.",
      "Nắm vững Bit, Byte và quy đổi chính xác các đơn vị đo dung lượng theo bội số 1024.",
      "Đánh giá được ưu thế vượt trội của thiết bị số trong lưu trữ, xử lí và truyền thông tin.",
    ],
    slides: GRADE_10_LESSON_1_SLIDES,
  },
  {
    id: "th03-kntt-b01",
    catalogCode: "TH03-KNTT-B01",
    level: "tieu-hoc",
    levelName: "Tiểu học (Lớp 3–5)",
    grade: 3,
    bookSeries: "Kết nối tri thức",
    topicNumber: "Chủ đề 1",
    topicName: "Máy tính và em",
    lessonNumber: "Bài 1",
    title: "Thông tin và quyết định",
    durationMinutes: 35,
    slideCount: 6,
    summary:
      "Nhận biết 3 dạng thông tin thường gặp (chữ, hình ảnh, âm thanh), giác quan tiếp nhận thông tin và cách con người đưa ra quyết định đúng từ thông tin thu được.",
    learningObjectives: [
      "Nhận biết được ba dạng thông tin cơ bản: chữ, hình ảnh, âm thanh.",
      "Nêu được ví dụ về việc thu nhận thông tin qua giác quan và ra quyết định phù hợp.",
    ],
    slides: createStandardLessonSlides({
      prefix: "TH03B01",
      title: "Bài 1: Thông tin và quyết định",
      topic: "Chủ đề 1: Máy tính và em",
      gradeLabel: "Tin học 3",
      concepts: [
        {
          heading: "Ba dạng thông tin thường gặp",
          body: "Trong cuộc sống hằng ngày, thông tin xuất hiện dưới ba dạng chính: dạng chữ (biển tên lớp, trang sách), dạng hình ảnh (biển báo giao thông, tranh vẽ) và dạng âm thanh (tiếng trống trường, còi xe cứu hỏa).",
        },
        {
          heading: "Thông tin dẫn đến quyết định",
          body: "Bộ não tiếp nhận thông tin qua các giác quan (mắt nhìn, tai nghe...) để xử lí và giúp con người đưa ra quyết định hành động an toàn, chính xác.",
        },
        {
          heading: "Ví dụ đèn tín hiệu giao thông",
          body: "Mắt nhìn thấy đèn giao thông chuyển sang màu đỏ (thông tin dạng hình ảnh/màu sắc) -> Em quyết định dừng xe lại trước vạch kẻ đường.",
        },
      ],
      activityPrompt:
        "Khi nghe tiếng trống trường vang lên vào giờ ra chơi (lúc 9 giờ 30), đó là thông tin dạng gì và em quyết định làm gì?",
      activityAnswer: [
        "Tiếng trống trường là thông tin dạng âm thanh mà tai em thu nhận được.",
        "Thông tin này báo hiệu đến giờ ra chơi hoặc vào lớp, giúp em quyết định thu dọn sách vở để ra sân chơi hoặc nhanh chóng trở về chỗ ngồi.",
      ],
      activityConclusion: "Thông tin chính xác giúp chúng ta đưa ra quyết định kịp thời và hợp lí.",
      practiceItems: [
        {
          heading: "Tình huống 1: Trời chuyển mây đen",
          body: "Nhìn thấy mây đen và sấm chớp (hình ảnh + âm thanh) -> Quyết định mang theo áo mưa khi đi học.",
        },
        {
          heading: "Tình huống 2: Biển chỉ dẫn 'Lối thoát hiểm'",
          body: "Đọc dòng chữ và mũi tên xanh (dạng chữ + hình ảnh) -> Đi đúng hướng thoát hiểm an toàn.",
        },
      ],
      summaryBullets: [
        "Có 3 dạng thông tin thường gặp: dạng chữ, dạng hình ảnh và dạng âm thanh.",
        "Con người tiếp nhận thông tin qua giác quan để suy nghĩ và đưa ra quyết định.",
      ],
    }),
  },
  {
    id: "th04-kntt-b01",
    catalogCode: "TH04-KNTT-B01",
    level: "tieu-hoc",
    levelName: "Tiểu học (Lớp 3–5)",
    grade: 4,
    bookSeries: "Kết nối tri thức",
    topicNumber: "Chủ đề 1",
    topicName: "Máy tính và em",
    lessonNumber: "Bài 1",
    title: "Phần cứng và phần mềm máy tính",
    durationMinutes: 35,
    slideCount: 6,
    summary:
      "Phân biệt phần cứng (thiết bị hữu hình nhìn thấy, chạm được) với phần mềm (chương trình điều khiển) và hiểu vai trò gắn kết giữa chúng.",
    learningObjectives: [
      "Nêu được tên một số thiết bị phần cứng và phần mềm quen thuộc.",
      "Giải thích được máy tính chỉ hoạt động khi có cả phần cứng và phần mềm.",
    ],
    slides: createStandardLessonSlides({
      prefix: "TH04B01",
      title: "Bài 1: Phần cứng và phần mềm máy tính",
      topic: "Chủ đề 1: Máy tính và em",
      gradeLabel: "Tin học 4",
      concepts: [
        {
          heading: "Phần cứng máy tính (Hardware)",
          body: "Là những thiết bị vật lí hữu hình mà em có thể nhìn thấy và chạm tay vào được như màn hình, thân máy, bàn phím, chuột, loa, máy in.",
        },
        {
          heading: "Phần mềm máy tính (Software)",
          body: "Là các chương trình chỉ dẫn cho phần cứng cách làm việc (không cầm nắm trực tiếp được), ví dụ: Hệ điều hành Windows, phần mềm luyện gõ phím, trình duyệt web.",
        },
        {
          heading: "Mối quan hệ không thể tách rời",
          body: "Phần cứng như 'cơ thể', phần mềm như 'lệnh điều khiển'. Thiếu phần mềm thì phần cứng không biết làm gì; thiếu phần cứng thì phần mềm không có nơi chạy.",
        },
      ],
      activityPrompt:
        "Trong các đối tượng sau, đối tượng nào là phần cứng, đối tượng nào là phần mềm: Chuột máy tính, Phần mềm vẽ Paint, Màn hình cảm ứng, Trò chơi học Toán?",
      activityAnswer: [
        "Phần cứng: Chuột máy tính, Màn hình cảm ứng (vì có hình khối vật lí, sờ chạm được).",
        "Phần mềm: Phần mềm vẽ Paint, Trò chơi học Toán (là chương trình chạy trên máy tính).",
      ],
      activityConclusion: "Nhận biết nhanh: chạm vào được là phần cứng, chạy bên trong màn hình là phần mềm.",
      practiceItems: [
        {
          heading: "Thao tác đúng bảo vệ phần cứng",
          body: "Không ấn mạnh lên màn hình, không làm đổ nước vào bàn phím, tắt máy đúng trình tự Shut down.",
        },
        {
          heading: "Sử dụng phần mềm bản quyền",
          body: "Chỉ cài đặt phần mềm học tập an toàn theo hướng dẫn của thầy cô và phụ huynh.",
        },
      ],
      summaryBullets: [
        "Phần cứng là các thiết bị hữu hình; Phần mềm là các chương trình chỉ dẫn máy tính làm việc.",
        "Máy tính cần có cả phần cứng và phần mềm phối hợp thì mới hoạt động được.",
      ],
    }),
  },
  {
    id: "th05-kntt-b01",
    catalogCode: "TH05-KNTT-B01",
    level: "tieu-hoc",
    levelName: "Tiểu học (Lớp 3–5)",
    grade: 5,
    bookSeries: "Kết nối tri thức",
    topicNumber: "Chủ đề 1",
    topicName: "Máy tính và em",
    lessonNumber: "Bài 1",
    title: "Em có thể làm gì với máy tính?",
    durationMinutes: 35,
    slideCount: 6,
    summary:
      "Khám phá các ứng dụng thiết thực của máy tính trong học tập, tìm kiếm tri thức, soạn thảo trình chiếu, sáng tạo và liên lạc an toàn.",
    learningObjectives: [
      "Kể được những việc máy tính giúp ích cho con người trong học tập và đời sống.",
      "Sử dụng máy tính điều độ, đúng mục đích học tập.",
    ],
    slides: createStandardLessonSlides({
      prefix: "TH05B01",
      title: "Bài 1: Em có thể làm gì với máy tính?",
      topic: "Chủ đề 1: Máy tính và em",
      gradeLabel: "Tin học 5",
      concepts: [
        {
          heading: "Học tập và Tìm kiếm thông tin",
          body: "Máy tính giúp tra cứu kiến thức trên Internet, học ngoại ngữ, làm bài tập trực tuyến và thực hành lập trình kéo thả.",
        },
        {
          heading: "Sáng tạo sản phẩm số & Liên lạc",
          body: "Em có thể vẽ tranh, soạn thảo văn bản, tạo bài trình chiếu nhóm và gửi thư điện tử hoặc trò chuyện cùng người thân.",
        },
        {
          heading: "Nguyên tắc sử dụng lành mạnh",
          body: "Máy tính giúp nâng cao hiệu quả công việc nhưng cần phân bổ thời gian hợp lí, giữ tư thế ngồi đúng để bảo vệ mắt.",
        },
      ],
      activityPrompt:
        "Nhóm em cần làm một bài giới thiệu về danh lam thắng cảnh quê hương. Máy tính giúp nhóm thực hiện những công đoạn nào?",
      activityAnswer: [
        "1) Tìm kiếm thông tin, số liệu và hình ảnh đẹp về địa danh trên website tin cậy.",
        "2) Dùng phần mềm trình chiếu sắp xếp thành các trang chiếu sinh động để thuyết trình trước lớp.",
      ],
      activityConclusion: "Máy tính là công cụ hỗ trợ học tập và sáng tạo nhóm cực kì hiệu quả.",
      practiceItems: [
        {
          heading: "Nhóm việc học tập",
          body: "Đọc sách điện tử, làm bài kiểm tra trắc nghiệm, luyện tập gõ phím 10 ngón.",
        },
        {
          heading: "Nhóm việc giải trí hợp lí",
          body: "Nghe nhạc thiếu nhi, xem phim khoa học khám phá thiên nhiên có chọn lọc.",
        },
      ],
      summaryBullets: [
        "Máy tính giúp học tập, tìm kiếm thông tin, tạo sản phẩm số, liên lạc và giải trí lành mạnh.",
        "Cần sử dụng máy tính đúng mục đích và điều độ để bảo vệ sức khỏe.",
      ],
    }),
  },
  {
    id: "th06-kntt-b01",
    catalogCode: "TH06-KNTT-B01",
    level: "thcs",
    levelName: "THCS (Lớp 6–9)",
    grade: 6,
    bookSeries: "Kết nối tri thức",
    topicNumber: "Chủ đề 1",
    topicName: "Máy tính và cộng đồng",
    lessonNumber: "Bài 1",
    title: "Thông tin và dữ liệu",
    durationMinutes: 45,
    slideCount: 6,
    summary:
      "Làm quen khái niệm Thông tin, Dữ liệu và Vật mang tin ở bậc THCS — tiền đề trực tiếp trước khi lên lớp 10 học sâu về dữ liệu số và đơn vị bit/byte.",
    learningObjectives: [
      "Phân biệt được thông tin, dữ liệu và vật mang tin qua ví dụ cụ thể.",
      "Hiểu tầm quan trọng của thông tin trong cuộc sống và hoạt động nhận thức.",
    ],
    slides: createStandardLessonSlides({
      prefix: "TH06B01",
      title: "Bài 1: Thông tin và dữ liệu",
      topic: "Chủ đề 1: Máy tính và cộng đồng",
      gradeLabel: "Tin học 6",
      concepts: [
        {
          heading: "Thông tin, Dữ liệu và Vật mang tin",
          body: "Thông tin là những gì đem lại hiểu biết cho con người. Dữ liệu là thông tin được thể hiện bằng chữ, số, hình ảnh, âm thanh. Vật mang tin là phương tiện dùng để lưu trữ và truyền tải thông tin (giấy, thẻ nhớ, đĩa CD).",
          code: "Trang giấy (Vật mang tin) -> Dòng chữ (Dữ liệu) -> Ý nghĩa hiểu biết (Thông tin)",
        },
        {
          heading: "Các bước xử lí thông tin của con người",
          body: "Thu nhận -> Lưu trữ -> Xử lí -> Truyền thông tin. Bộ não là trung tâm xử lí thông tin quan trọng nhất của con người.",
        },
        {
          heading: "Kết nối lên Tin học 10",
          body: "Ở lớp 6 dữ liệu là chữ, số, hình ảnh trên vật mang tin nói chung; lên lớp 10 dữ liệu được chuẩn hóa thành dãy bit trong máy tính.",
        },
      ],
      activityPrompt:
        "Tấm bảng lịch kiểm tra học kì dán ở bảng tin lớp học: đâu là vật mang tin, đâu là dữ liệu và đâu là thông tin?",
      activityAnswer: [
        "Vật mang tin: Tấm giấy in bảng lịch.",
        "Dữ liệu: Các con số ngày giờ, tên môn học in trên giấy.",
        "Thông tin: Em biết được ngày nào thi môn Tin học để lên kế hoạch ôn tập.",
      ],
      activityConclusion: "Phân biệt đúng 3 thành phần giúp hiểu bản chất lưu trữ và truyền tin.",
      practiceItems: [
        {
          heading: "Ví dụ 1: Tệp bài hát MP3 trong USB",
          body: "USB là vật mang tin; sóng âm số hóa là dữ liệu; giai điệu nghe được là thông tin.",
        },
        {
          heading: "Ví dụ 2: Biển báo tốc độ 40 km/h",
          body: "Tấm biển kim loại là vật mang tin; số 40 và vòng tròn đỏ là dữ liệu; quy định tốc độ tối đa là thông tin.",
        },
      ],
      summaryBullets: [
        "Thông tin đem lại hiểu biết; Dữ liệu là hình thức thể hiện thông tin; Vật mang tin là phương tiện lưu giữ.",
        "Tầm quan trọng của thông tin giúp con người lựa chọn hành động phù hợp.",
      ],
    }),
  },
  {
    id: "th07-kntt-b01",
    catalogCode: "TH07-KNTT-B01",
    level: "thcs",
    levelName: "THCS (Lớp 6–9)",
    grade: 7,
    bookSeries: "Kết nối tri thức",
    topicNumber: "Chủ đề 1",
    topicName: "Máy tính và cộng đồng",
    lessonNumber: "Bài 1",
    title: "Thiết bị vào và thiết bị ra",
    durationMinutes: 45,
    slideCount: 6,
    summary:
      "Phân loại thiết bị vào (Input), thiết bị ra (Output) và thiết bị vừa vào vừa ra; nguyên tắc lắp ghép, kết nối thiết bị ngoại vi an toàn.",
    learningObjectives: [
      "Phân biệt được thiết bị vào và thiết bị ra theo chiều di chuyển dữ liệu.",
      "Biết cách kết nối an toàn các cổng USB, HDMI, Jack âm thanh.",
    ],
    slides: createStandardLessonSlides({
      prefix: "TH07B01",
      title: "Bài 1: Thiết bị vào và thiết bị ra",
      topic: "Chủ đề 1: Máy tính và cộng đồng",
      gradeLabel: "Tin học 7",
      concepts: [
        {
          heading: "Thiết bị vào (Input Devices)",
          body: "Tiếp nhận thông tin từ thế giới bên ngoài để chuyển thành dữ liệu đưa vào máy tính: Bàn phím, chuột, micro, webcam, máy quét.",
          code: "Thế giới thực --(Input)--> Dữ liệu trong máy tính",
        },
        {
          heading: "Thiết bị ra (Output Devices)",
          body: "Biến dữ liệu trong máy tính thành dạng con người cảm nhận được: Màn hình, loa, tai nghe, máy in, máy chiếu.",
          code: "Dữ liệu máy tính --(Output)--> Hình ảnh / Âm thanh / Bản in",
        },
        {
          heading: "Thiết bị lưỡng tính (Input & Output)",
          body: "Màn hình cảm ứng trên điện thoại vừa hiển thị hình ảnh (ra) vừa nhận chạm tay điều khiển (vào).",
        },
      ],
      activityPrompt:
        "Khi em gọi video cho người thân qua máy tính xách tay, thiết bị nào đóng vai trò thiết bị vào và thiết bị nào là thiết bị ra?",
      activityAnswer: [
        "Thiết bị vào: Webcam (thu hình ảnh của em) và Micro (thu giọng nói của em).",
        "Thiết bị ra: Màn hình (hiện hình người thân) và Loa (phát tiếng nói người thân).",
      ],
      activityConclusion: "Xác định theo chiều dữ liệu đi vào máy tính hay đi ra phục vụ con người.",
      practiceItems: [
        {
          heading: "An toàn kết nối phần cứng",
          body: "Kiểm tra đúng chiều đầu cắm USB/HDMI trước khi ấn; không cắm rút mạnh khi tay ướt.",
        },
        {
          heading: "Chỉnh âm lượng & Độ sáng",
          body: "Điều chỉnh loa vừa đủ nghe và độ sáng màn hình phù hợp ánh sáng phòng học.",
        },
      ],
      summaryBullets: [
        "Thiết bị vào đưa dữ liệu vào máy tính; Thiết bị ra đưa thông tin ra cho con người.",
        "Màn hình cảm ứng là thiết bị vừa vào vừa ra.",
      ],
    }),
  },
  {
    id: "th08-kntt-b01",
    catalogCode: "TH08-KNTT-B01",
    level: "thcs",
    levelName: "THCS (Lớp 6–9)",
    grade: 8,
    bookSeries: "Kết nối tri thức",
    topicNumber: "Chủ đề 1",
    topicName: "Máy tính và cộng đồng",
    lessonNumber: "Bài 1",
    title: "Lược sử máy tính",
    durationMinutes: 45,
    slideCount: 6,
    summary:
      "Hành trình phát triển từ máy tính cơ học (Pascal, Babbage) đến 5 thế hệ máy tính điện tử hiện đại và tác động xã hội của chúng.",
    learningObjectives: [
      "Tóm tắt được các mốc phát triển lớn từ công cụ tính cơ học tới máy tính điện tử 5 thế hệ.",
      "Nhận thấy xu hướng thu nhỏ kích thước, tăng tốc độ và phổ cập cá nhân hóa.",
    ],
    slides: createStandardLessonSlides({
      prefix: "TH08B01",
      title: "Bài 1: Lược sử máy tính",
      topic: "Chủ đề 1: Máy tính và cộng đồng",
      gradeLabel: "Tin học 8",
      concepts: [
        {
          heading: "Thời kì sơ khai & Cơ học",
          body: "Từ bàn tính cổ đại đến máy tính cơ học Pascaline (Blaise Pascal, 1642) và máy phân tích của Charles Babbage (ý tưởng đầu tiên về máy tính lập trình được).",
        },
        {
          heading: "5 thế hệ máy tính điện tử",
          body: "Thế hệ 1: Đèn điện tử chân không (ENIAC); Thế hệ 2: Bóng bán dẫn; Thế hệ 3: Mạch tích hợp (IC); Thế hệ 4: Bộ vi xử lí; Thế hệ 5: Siêu tích hợp & Trí tuệ nhân tạo.",
          code: "Đèn chân không -> Bán dẫn -> Mạch IC -> Vi xử lí -> AI",
        },
        {
          heading: "Tác động đổi thay thế giới",
          body: "Máy tính ngày càng nhỏ gọn (từ căn phòng 30 tấn thu gọn còn chiếc đồng hồ thông minh) nhưng tốc độ xử lí tăng hàng tỉ lần.",
        },
      ],
      activityPrompt:
        "Vì sao máy tính thế hệ thứ tư sử dụng bộ vi xử lí lại tạo ra bước ngoặt phổ cập máy tính cá nhân (PC)?",
      activityAnswer: [
        "Bộ vi xử lí tích hợp hàng triệu linh kiện trên một con chip nhỏ, giúp giá thành giảm mạnh và kích thước đủ gọn để đặt trên bàn làm việc.",
        "Nhờ vậy, máy tính không còn chỉ thuộc về các phòng thí nghiệm lớn mà đến được từng trường học, gia đình.",
      ],
      activityConclusion: "Công nghệ vi xử lí đặt nền móng cho xã hội thông tin hiện đại.",
      practiceItems: [
        {
          heading: "Charles Babbage & Ada Lovelace",
          body: "Babbage được coi là 'cha đẻ máy tính', Ada Lovelace viết những thuật toán đầu tiên.",
        },
        {
          heading: "Alan Turing & John von Neumann",
          body: "Đề xuất kiến trúc máy tính lưu chương trình trong bộ nhớ — nền tảng máy tính ngày nay.",
        },
      ],
      summaryBullets: [
        "Lịch sử máy tính trải qua chặng đường từ cơ học đến 5 thế hệ điện tử.",
        "Xu hướng xuyên suốt: nhỏ gọn hơn, rẻ hơn, nhanh hơn và thông minh hơn.",
      ],
    }),
  },
  {
    id: "th09-kntt-b01",
    catalogCode: "TH09-KNTT-B01",
    level: "thcs",
    levelName: "THCS (Lớp 6–9)",
    grade: 9,
    bookSeries: "Kết nối tri thức",
    topicNumber: "Chủ đề 1",
    topicName: "Máy tính và cộng đồng",
    lessonNumber: "Bài 1",
    title: "Thế giới kĩ thuật số",
    durationMinutes: 45,
    slideCount: 6,
    summary:
      "Nhận diện sự hiện diện của bộ xử lí thông tin nhúng trong đồ gia dụng thông minh, giao thông, y tế và những thách thức khi sử dụng công nghệ số.",
    learningObjectives: [
      "Nhận biết máy tính nhúng có mặt trong hầu hết thiết bị số xung quanh.",
      "Đánh giá hai mặt tác động tích cực và tiêu cực của công nghệ kĩ thuật số.",
    ],
    slides: createStandardLessonSlides({
      prefix: "TH09B01",
      title: "Bài 1: Thế giới kĩ thuật số",
      topic: "Chủ đề 1: Máy tính và cộng đồng",
      gradeLabel: "Tin học 9",
      concepts: [
        {
          heading: "Bộ xử lí nhúng ở khắp mọi nơi",
          body: "Không chỉ laptop hay điện thoại mới có máy tính: máy giặt thông minh, ti vi, tủ lạnh, ô tô tự lái, máy đo nhịp tim đều chứa vi xử lí thu thập dữ liệu cảm biến.",
        },
        {
          heading: "Tác động tích cực của công nghệ số",
          body: "Tự động hóa sản xuất, y học chính xác, học tập trực tuyến xuyên biên giới, kết nối và quản lí đô thị thông minh.",
        },
        {
          heading: "Mặt trái cần phòng tránh",
          body: "Nguy cơ lộ dữ liệu cá nhân, tin giả, lừa đảo qua mạng, lệ thuộc thiết bị và rác thải điện tử.",
        },
      ],
      activityPrompt:
        "Hãy chỉ ra một thiết bị gia dụng trong nhà em có gắn bộ xử lí thông tin và cho biết nó xử lí thông tin gì?",
      activityAnswer: [
        "Ví dụ Máy điều hòa Inverter: tiếp nhận nhiệt độ phòng từ cảm biến -> xử lí so sánh với nhiệt độ cài đặt -> điều chỉnh tốc độ máy nén tiết kiệm điện.",
        "Hoặc Robot hút bụi: nhận dữ liệu từ cảm biến va chạm/laser -> lập bản đồ phòng -> tự động tránh vật cản và quay về trạm sạc.",
      ],
      activityConclusion: "Máy tính nhúng biến các đồ vật quen thuộc thành thiết bị thông minh.",
      practiceItems: [
        {
          heading: "Ứng xử văn minh & An toàn số",
          body: "Kiểm chứng nguồn tin trước khi chia sẻ, bảo vệ mật khẩu và cân bằng thời gian thực - ảo.",
        },
        {
          heading: "Chuẩn bị bước vào Tin học THPT",
          body: "Nắm chắc khái niệm thiết bị số ở lớp 9 giúp học sinh học tốt Bài 1 và Bài 2 Tin học 10.",
        },
      ],
      summaryBullets: [
        "Bộ xử lí thông tin hiện diện rộng khắp trong các thiết bị số gia dụng, y tế, giao thông.",
        "Cần phát huy lợi ích công nghệ số song song với phòng tránh rủi ro an toàn và đạo đức số.",
      ],
    }),
  },
  {
    id: "th10-kntt-b04",
    catalogCode: "TH10-KNTT-B04",
    level: "thpt",
    levelName: "THPT (Lớp 10–12)",
    grade: 10,
    bookSeries: "Kết nối tri thức",
    topicNumber: "Chủ đề 1",
    topicName: "Máy tính và xã hội tri thức",
    lessonNumber: "Bài 4",
    title: "Hệ nhị phân và dữ liệu số nguyên",
    durationMinutes: 45,
    slideCount: 6,
    summary:
      "Chuyển đổi số nguyên giữa hệ thập phân (cơ số 10) và hệ nhị phân (cơ số 2), thực hiện phép cộng/nhân nhị phân và hiểu cách máy tính biểu diễn số nguyên có dấu.",
    learningObjectives: [
      "Biết cách đổi số tự nhiên từ hệ thập phân sang nhị phân (chia liên tiếp cho 2) và ngược lại.",
      "Thực hiện được phép cộng hai số nhị phân cơ bản.",
    ],
    slides: createStandardLessonSlides({
      prefix: "TH10B04",
      title: "Bài 4: Hệ nhị phân và dữ liệu số nguyên",
      topic: "Chủ đề 1: Máy tính và xã hội tri thức",
      gradeLabel: "Tin học 10",
      concepts: [
        {
          heading: "Hệ nhị phân (Cơ số 2)",
          body: "Chỉ sử dụng hai chữ số 0 và 1. Giá trị mỗi chữ số ở vị trí thứ k (tính từ phải sang, bắt đầu từ 0) được nhân với trọng số 2^k.",
          code: "(1101)₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13",
        },
        {
          heading: "Đổi từ Thập phân sang Nhị phân",
          body: "Thực hiện chia liên tiếp số thập phân cho 2 và lấy các số dư viết theo thứ tự ngược lại từ phép chia cuối lên đầu.",
          code: "13 : 2 = 6 dư 1 | 6 : 2 = 3 dư 0 | 3 : 2 = 1 dư 1 | 1 : 2 = 0 dư 1 => 1101",
        },
        {
          heading: "Phép cộng trong hệ nhị phân",
          body: "Tuân theo quy tắc: 0 + 0 = 0; 0 + 1 = 1; 1 + 0 = 1; 1 + 1 = 0 nhớ 1 sang hàng bên trái.",
        },
      ],
      activityPrompt:
        "Hãy chuyển đổi số thập phân 25 sang biểu diễn nhị phân 8 bit và kiểm tra kết quả ngược lại.",
      activityAnswer: [
        "Chia liên tiếp 25 cho 2: 25 = 16 + 8 + 1 = 2^4 + 2^3 + 2^0.",
        "Biểu diễn nhị phân: 11001. Viết đủ dạng 8 bit (1 Byte): 00011001.",
      ],
      activityConclusion: "Mọi số nguyên trong máy tính đều được mã hóa thành dãy bit dựa trên lũy thừa cơ số 2.",
      practiceItems: [
        {
          heading: "Mẹo kiểm tra nhanh bằng trọng số",
          body: "Ghi sẵn dãy trọng số 128 - 64 - 32 - 16 - 8 - 4 - 2 - 1 để cộng nhẩm cực nhanh.",
        },
        {
          heading: "Thực hành tại Lab Bit/Byte",
          body: "Mở tab 'Lab Bit/Byte' ở khung bên phải hoặc Slide 09 của Bài 1 để bật/tắt 8 bit trực quan.",
        },
      ],
      summaryBullets: [
        "Hệ nhị phân dùng hai kí hiệu 0 và 1 để biểu diễn trực tiếp mọi số nguyên trong máy tính.",
        "Thuần thục quy tắc chia lấy dư cho 2 và nhân trọng số 2^k.",
      ],
    }),
  },
  {
    id: "th11-kntt-b01",
    catalogCode: "TH11-KNTT-B01",
    level: "thpt",
    levelName: "THPT (Lớp 10–12)",
    grade: 11,
    bookSeries: "Kết nối tri thức",
    topicNumber: "Chủ đề 1",
    topicName: "Máy tính và xã hội tri thức",
    lessonNumber: "Bài 1",
    title: "Hệ điều hành",
    durationMinutes: 45,
    slideCount: 6,
    summary:
      "Vai trò cầu nối của hệ điều hành giữa phần cứng và phần mềm ứng dụng; sự tiến hóa của Windows, Linux, macOS và hệ điều hành di động (iOS, Android).",
    learningObjectives: [
      "Trình bày được lịch sử phát triển và đặc trưng của hệ điều hành máy tính cá nhân và di động.",
      "Giải thích được mối quan hệ giữa phần cứng, hệ điều hành và phần mềm ứng dụng.",
    ],
    slides: createStandardLessonSlides({
      prefix: "TH11B01",
      title: "Bài 1: Hệ điều hành",
      topic: "Chủ đề 1: Máy tính và xã hội tri thức",
      gradeLabel: "Tin học 11",
      concepts: [
        {
          heading: "5 nhóm chức năng của Hệ điều hành",
          body: "Quản lí thiết bị phần cứng (CPU, RAM, ổ đĩa), quản lí tệp và thư mục, cung cấp giao diện người dùng (GUI/CLI), bảo mật và môi trường cho phần mềm ứng dụng.",
        },
        {
          heading: "Hệ điều hành PC vs Thiết bị di động",
          body: "PC (Windows, macOS, Linux) tối ưu đa nhiệm bàn phím-chuột; Di động (Android, iOS) tối ưu màn hình cảm ứng, tiết kiệm pin và kết nối không dây GPS/4G/5G.",
        },
        {
          heading: "Mô hình phân lớp",
          body: "Người dùng <-> Phần mềm ứng dụng <-> Hệ điều hành <-> Phần cứng máy tính.",
          code: "App  -->  OS Kernel / Drivers  -->  CPU / RAM / I/O",
        },
      ],
      activityPrompt:
        "Vì sao một chiếc điện thoại thông minh mới xuất xưởng nếu chưa cài hệ điều hành (Android hoặc iOS) thì người dùng không thể chạy bất kì ứng dụng nào?",
      activityAnswer: [
        "Bởi vì phần mềm ứng dụng không giao tiếp trực tiếp với phần cứng mà phải thông qua hệ điều hành.",
        "Hệ điều hành đóng vai trò trung gian phân bổ CPU, bộ nhớ và điều khiển màn hình, loa cho từng ứng dụng.",
      ],
      activityConclusion: "Thiết bị xử lí đa năng bắt buộc phải có hệ điều hành để điều phối tài nguyên.",
      practiceItems: [
        {
          heading: "Giao diện dòng lệnh (CLI) & Đồ họa (GUI)",
          body: "GUI dùng cửa sổ, biểu tượng trực quan; CLI gõ lệnh tốc độ cao cho quản trị hệ thống.",
        },
        {
          heading: "Phần mềm nguồn mở Linux",
          body: "Được cộng đồng toàn cầu đóng góp, là nền tảng của hầu hết máy chủ đám mây và lõi Android.",
        },
      ],
      summaryBullets: [
        "Hệ điều hành là cầu nối bắt buộc giữa phần cứng máy tính và phần mềm ứng dụng.",
        "Hệ điều hành di động nổi bật ở giao diện chạm cảm ứng, quản lí năng lượng và cảm biến tích hợp.",
      ],
    }),
  },
  {
    id: "th12-kntt-b01",
    catalogCode: "TH12-KNTT-B01",
    level: "thpt",
    levelName: "THPT (Lớp 10–12)",
    grade: 12,
    bookSeries: "Kết nối tri thức",
    topicNumber: "Chủ đề 1",
    topicName: "Máy tính và xã hội tri thức",
    lessonNumber: "Bài 1",
    title: "Làm quen với Trí tuệ nhân tạo (AI)",
    durationMinutes: 45,
    slideCount: 6,
    summary:
      "Khái niệm AI, 5 đặc trưng cốt lõi của hệ thống trí tuệ nhân tạo (học, suy luận, nhận thức, hiểu ngôn ngữ, giải quyết vấn đề) và lưu ý trách nhiệm khi ứng dụng AI.",
    learningObjectives: [
      "Giải thích được khái niệm AI và nêu được 5 đặc trưng cơ bản của AI.",
      "Phân biệt được AI hẹp (ANI) hiện tại với AI tổng quát (AGI) và nhận diện rủi ro đạo đức.",
    ],
    slides: createStandardLessonSlides({
      prefix: "TH12B01",
      title: "Bài 1: Làm quen với Trí tuệ nhân tạo (AI)",
      topic: "Chủ đề 1: Máy tính và xã hội tri thức",
      gradeLabel: "Tin học 12",
      concepts: [
        {
          heading: "Trí tuệ nhân tạo (Artificial Intelligence)",
          body: "Là khả năng của máy tính thực hiện các công việc mang tính trí tuệ của con người như đọc hiểu ngôn ngữ, nhận diện hình ảnh, học từ dữ liệu và ra quyết định.",
        },
        {
          heading: "5 đặc trưng cơ bản của AI",
          body: "(1) Khả năng học (Machine Learning); (2) Khả năng suy luận logic; (3) Khả năng nhận thức môi trường; (4) Hiểu ngôn ngữ tự nhiên; (5) Giải quyết vấn đề phức tạp.",
          code: "Dữ liệu lớn + Thuật toán học máy  -->  Mô hình AI",
        },
        {
          heading: "Ứng dụng & Trách nhiệm số",
          body: "AI hỗ trợ chẩn đoán y tế, xe tự hành, dịch thuật; nhưng đòi hỏi con người kiểm chứng thông tin để tránh tin giả (deepfake) và lệ thuộc thụ động.",
        },
      ],
      activityPrompt:
        "Tính năng mở khóa khuôn mặt (Face ID) và trợ lí ảo trả lời giọng nói trên điện thoại thể hiện những đặc trưng nào của AI?",
      activityAnswer: [
        "Face ID thể hiện khả năng nhận thức thị giác (nhận dạng đặc điểm khuôn mặt) và khả năng học thích nghi theo thời gian.",
        "Trợ lí ảo thể hiện khả năng hiểu ngôn ngữ tự nhiên và suy luận để phản hồi đúng ngữ cảnh câu hỏi.",
      ],
      activityConclusion: "AI đang hiện diện sâu trong hầu hết phần mềm và thiết bị số quanh ta.",
      practiceItems: [
        {
          heading: "AI hẹp (Narrow AI)",
          body: "Chuyên sâu từng nhiệm vụ (chơi cờ, nhận diện ảnh, dịch văn bản) — phổ biến hiện nay.",
        },
        {
          heading: "Tư duy phản biện khi dùng AI",
          body: "Luôn đối chiếu dữ liệu gốc, không giao phó toàn quyền quyết định đạo đức hay học tập cho AI.",
        },
      ],
      summaryBullets: [
        "AI mô phỏng năng lực trí tuệ con người thông qua 5 đặc trưng: học, suy luận, nhận thức, ngôn ngữ, giải quyết vấn đề.",
        "Dữ liệu chất lượng là nhiên liệu cốt lõi để huấn luyện các mô hình AI chính xác.",
      ],
    }),
  },
];
