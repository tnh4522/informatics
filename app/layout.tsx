import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Kho Thuyết Trình Tin Học Phổ Thông — Tin học 10 Bài 1: Thông tin và xử lí thông tin (20 Slide)",
  description:
    "Website thuyết trình môn Tin học đa cấp học (Tiểu học, THCS, THPT) theo chương trình Kết nối tri thức (SGK Mới 2026). Bài giảng 20 slide Tin học 10 Bài 1: Thông tin và xử lí thông tin đồng bộ video và phòng thí nghiệm Bit/Byte.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F1EA] text-[#141A23]">
        {children}
      </body>
    </html>
  );
}
