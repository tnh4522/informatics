# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are Vietnamese students across multiple school levels (Tiểu học, THCS, THPT) reviewing Informatics (Tin học) lessons, completing textbook exercises, and practicing interactively online at home or in study environments. Teachers and presenters can also step through slides in full-screen presentation mode.

## Product Purpose

An interactive web platform hosting Informatics presentation decks across school levels (Tiểu học, THCS, THPT) aligned with the Vietnamese 2018/2026 General Education Curriculum (Chương trình GDPT Mới — Kết nối tri thức với cuộc sống). Its flagship interactive presentation is **Tin học 10 — Bài 1: Thông tin và xử lí thông tin (Kết nối tri thức - SGK Mới 2026)** consisting of a complete **20-slide** deck enriched with custom dark-slate slide illustrations, zoomable image previews, interactive Bit/Byte labs, and full textbook activity walkthroughs (Khởi động, Hoạt động 1–2, Câu hỏi, Luyện tập 1–2, Vận dụng 1–2).

## Positioning

Unlike static PDF/PowerPoint downloads or passive video-only portals, this platform combines live interactive slide decks (keyboard arrow navigation, 20-slide illustrated overview grid, full-screen presentation mode, zoomable 16:9 slide illustrations, speaker/study notes, progress tracking) directly with embedded interactive Informatics labs, illustrated chapter outlines, and textbook problem walkthroughs in one coherent study workspace.

## Operating Context

Students use the web app on laptops, desktops, or tablets when reviewing classroom lessons, preparing for exams, or practicing textbook activities from *Tin học 10 - Kết nối tri thức với cuộc sống*. Users switch between browsing the multi-grade curriculum library (Tiểu học, THCS, THPT) and stepping through interactive slide decks with keyboard navigation (`←` / `→`, `F` for fullscreen, `G` for slide grid overview, `Esc` to close enlarged artwork), slide illustrations, and live simulations.

## Capabilities and Constraints

- Multi-grade Informatics presentation catalog spanning Tiểu học (Lớp 3–5), THCS (Lớp 6–9), and THPT (Lớp 10–12), with playable illustrated interactive slide decks for every listed lesson.
- Complete 20-slide interactive presentation for **Tin học 10 Bài 1: Thông tin và xử lí thông tin (Kết nối tri thức - SGK Mới 2026)** aligned step-by-step with the textbook progression (`Khởi động` -> `1. Thông tin và dữ liệu` -> `2. Đơn vị lưu trữ` -> `3. Xử lí thông tin & Luyện tập/Vận dụng`).
- Interactive Informatics labs embedded inside slides and the study workbench: 3-step Information Processing Pipeline, Bit/Byte 8-bit toggle encoder, Tabular Data Unit Converter (`1024 = 2^10` scale), Library Digitization calculator, 16 GB SD Card image capacity calculator, Gradebook processing lab, CCCD chip/QR inspector, and 5-question quick assessment.
- Illustrated chapter outline and speaker-notes workbench (`Mục lục`, `Bit & Byte`, `Giải SGK`, `Kho lớp`) with thumbnail previews and lightbox artwork zoom (`public/images/slides/`).
- Client-side Next.js application (no external database or third-party video embeds required; runs cleanly with `next build --webpack` on this Windows host).

## Product Principles

- Keep the slide stage uncluttered and readable at projection/study distance while putting real interactive tools directly inside the learning flow.
- Pair every abstract concept (Information vs. Data, Bit/Byte, $2^{10}=1024$, Digital Advantages) with an immediate hands-on simulation or textbook example.
- Maintain curriculum fidelity across Vietnamese school levels (Tiểu học, THCS, THPT) under the *Kết nối tri thức với cuộc sống* program.

## Accessibility & Inclusion

- High-contrast daylight paper desk (`#F4F1EA`) and deep slate stage (`#141A23`), keyboard-navigable controls, visible `:focus-visible` outlines, semantic ARIA tabs and live regions, and `prefers-reduced-motion` support.
