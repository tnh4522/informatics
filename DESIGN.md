---
name: Kho Thuyết Trình Tin Học Phổ Thông
description: Dual-polarity "Bàn Học Tập Đa Năng" visual system combining a daylight Birch Desk workspace with a high-contrast dark Slate projection stage for K-12 Informatics lessons.
colors:
  primary: "#1D4ED8"
  primary-hover: "#1E40AF"
  secondary: "#B45309"
  tertiary: "#15803D"
  alert-crimson: "#B91C1C"
  birch-ground: "#F4F1EA"
  birch-surface: "#FAF8F3"
  birch-elevated: "#ECE7DB"
  birch-border: "#D5CFC0"
  stage-slate: "#141A23"
  stage-panel: "#1C2431"
  stage-border: "#2C384B"
  ink-primary: "#141A23"
  ink-secondary: "#3E4856"
  ink-muted: "#5A6575"
typography:
  display:
    fontFamily: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif"
    fontWeight: 700
    fontSize: "24px"
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif"
    fontWeight: 700
    fontSize: "18px"
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif"
    fontWeight: 600
    fontSize: "16px"
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif"
    fontWeight: 400
    fontSize: "14px"
    lineHeight: 1.625
    letterSpacing: "0em"
  compact:
    fontFamily: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif"
    fontWeight: 400
    fontSize: "13px"
    lineHeight: 1.55
    letterSpacing: "0em"
  label:
    fontFamily: "'Be Vietnam Pro', system-ui, -apple-system, sans-serif"
    fontWeight: 600
    fontSize: "12px"
    lineHeight: 1.33
    letterSpacing: "0em"
  mono:
    fontFamily: "'JetBrains Mono', monospace"
    fontWeight: 600
    fontSize: "11px"
    lineHeight: 1.33
    letterSpacing: "0em"
  micro:
    fontFamily: "'JetBrains Mono', monospace"
    fontWeight: 600
    fontSize: "10px"
    lineHeight: 1.25
    letterSpacing: "0em"
rounded:
  sm: "4px"
spacing:
  unit: "4px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary: "Electric Cobalt action button for advancing slides and launching interactive study actions"
  chip-filter: "Daylight pill selector for switching school levels and filtering the multi-grade deck catalog"
  input-search: "Crisp white search field framed by a 1px parchment border on the birch study desk"
  tab-workbench: "Four-column bottom-bordered tab strip switching between Mục lục, Bit & Byte, Giải SGK, and Kho lớp"
  card-stage: "Dark slate structural container inside the slide canvas separating learning objectives and interactive labs"
  timeline-tick: "20-column calibrated slide rail indexing B01-S01 through B01-S20 in real time"
---

# Design System: Kho Thuyết Trình Tin Học Phổ Thông

## Overview

**Creative North Star: "Bàn Học Tập Đa Năng"**

Kho Thuyết Trình Tin Học Phổ Thông pairs two intentional optical surfaces side by side: a warm, daylight Birch Desk notebook workspace on the right and catalog surfaces, contrasted against a high-legibility deep Slate projection stage on the left. This dual-polarity composition keeps students oriented between visual slide presentation and active problem solving—inspecting crisp 16:9 slide illustrations in focused dark contrast while testing UTF-8 binary encodings, comparing storage multipliers, and stepping through illustrated `Mục lục` chapters on paper-toned study tools beside it.

Density is disciplined and utilitarian. Controls rely on crisp `1px` hairlines (`#D5CFC0` on birch paper, `#2C384B` on dark slate), compact `4px` corner radii (`rounded-sm`), tabular monospace telemetry, and semantic state colors reserved strictly for interactive status—active slide ticks, quiz validation, and pedagogical activities. Confirmed anti-patterns excluded by design include frosted-glass blur headers, ambient gradient hero backplates, drop-shadow elevation cards, emoji glyphs in UI controls, and ungrounded eyebrow kickers above headings.

**Key Characteristics:**
- Dual-surface split desk: dark Slate stage (`#141A23` / `#1C2431`) paired natively with daylight Birch Paper (`#F4F1EA` / `#FAF8F3`).
- Hairline structural containment (`1px` borders) replacing blurry shadows or heavy bevels.
- Vietnamese-first typography with Be Vietnam Pro for prose and JetBrains Mono (`tabular-nums`) for binary bits, unit powers (`2^10 = 1024`), slide indices, and slide IDs (`B01-S01`–`B01-S20`).
- Zero-distraction crisp geometric SVG icons (`1.75` stroke weight) and bespoke dark-slate 16:9 lesson illustrations instead of emoji or Unicode pictographs.

## Colors

The palette anchors functional dual-polarity study surfaces with disciplined Electric Cobalt interaction highlights and strict semantic feedback hues.

### Primary
- **Electric Cobalt** (`primary`): Anchors primary slide progression buttons (`Slide tiếp theo`), active timeline ticks, active tab indicators (`border-bottom`), inline slide outline links, and grade-level active tags.
- **Deep Cobalt Action** (`primary-hover`): Hover state shift for Electric Cobalt action buttons, deepening contrast while holding sharp text legibility (`#FAF8F3`).

### Secondary
- **Signal Amber** (`secondary`): Reserved strictly for hands-on classroom activities (`Hoạt động`), warnings, and investigative highlights inside slide labs rather than general branding.

### Tertiary
- **Verify Emerald** (`tertiary`): Strictly validates correct answers in quizzes, textbook solution reveals, and verified storage comparisons; **Alert Crimson** (`alert-crimson`) handles incorrect quiz choices and negative boundary checks.

### Neutral
- **Birch Paper Ground** (`birch-ground`): Global page backdrop supporting sustained daytime textbook reading.
- **Warm Paper Surface** (`birch-surface`): Card, sticky header, right workbench container, and slide navigation footer surfaces on light zones, also serving as high-contrast ink on dark stage tiles.
- **Trimmed Manila Elevated** (`birch-elevated`): Inactive filter pills, inactive tablist rails, custom scrollbar tracks, and header strip shading inside catalog tables.
- **Parchment Hairline** (`birch-border`): `1px` crisp dividers separating catalog rows, workbench tabs, and inputs on daylight surfaces.
- **Stage Midnight Slate** (`stage-slate`): Projection frame chrome, timeline track housing, monospace badge anchor (`B01-Sxx`), and sticky icon emblem background.
- **Stage Charcoal Canvas** (`stage-panel`): Main slide canvas surface holding white/warm-paper text, embedded interactive labs, and slide grid preview cards.
- **Stage Slate Border** (`stage-border`): `1px` crisp structural divider separating telemetry bars, stage objective cards, and timeline ticks.
- **Deep Graphite Ink** (`ink-primary`): Primary body copy, table headings, and active pill fills on birch surfaces.
- **Slate Body Ink** (`ink-secondary`): Secondary explanatory paragraphs, inactive tab labels, and textbook metadata notes on birch paper.
- **Muted Caption Ink** (`ink-muted`): Search input placeholders and subtle helper annotations on light backgrounds.

### Named Rules
**The Dual-Polarity Territory Rule.** Keep `Stage Midnight Slate` and `Stage Charcoal Canvas` confined strictly to the left projection stage (`SlideStage`), modals, and icon anchors; keep `Birch Paper Ground` and `Warm Paper Surface` across the workbench pane, catalog tables, and navigation chrome so projection focus stays unmistakable.

**The State-Only Accent Rule.** Never apply `Signal Amber`, `Verify Emerald`, or `Alert Crimson` for decorative flair—each hue appears strictly on slide-kind badges, quiz grading feedback, or textbook solution states.

## Typography

**Display Font:** Be Vietnam Pro (with `system-ui, -apple-system, sans-serif` fallback)
**Body Font:** Be Vietnam Pro (with `system-ui, -apple-system, sans-serif` fallback)
**Label/Mono Font:** JetBrains Mono (with `monospace` fallback)

**Character:** Precision Vietnamese geometric sans-serif paired with tabular monospace numbers (`tabular-nums`) so Vietnamese diacritics read effortlessly at small UI sizes while binary strings (`01010100`), powers of `1024`, and slide IDs (`B01-S09`) stay vertically aligned.

### Hierarchy
- **Display** (`700`, `24px`, `1.25`): Slide main titles on the dark Slate projection canvas (`letter-spacing: -0.02em`, `text-wrap: balance`).
- **Headline** (`700`, `18px`, `1.3`): Major section headings including the multi-grade catalog (`#kho-bai-giang`) and `Bảng 1.1` reference header (`letter-spacing: -0.02em`).
- **Title** (`600`, `16px`, `1.4`): Top header application title, active deck context bar title, and slide card headers.
- **Body** (`400`, `14px`, `1.625`): Explanations, textbook answers, and interactive lab copy (`max-width` constrained around `65ch–70ch` via `text-wrap: pretty`).
- **Compact** (`400`, `13px`, `1.55`): Slide bullet points, key takeaways, and revealed SGK solutions inside dark projection panels.
- **Label** (`600`, `12px`, `1.33`): Filter pills, action buttons, table column titles, and workbench tab controls.
- **Mono** (`600`, `11px`, `1.33`): Calibrated timeline ticks (`01`–`20`), slide telemetry badges (`B01-S01`), chapter slide markers, binary byte outputs, and unit table metrics using `.tabular-data` (`font-variant-numeric: tabular-nums`).
- **Micro** (`600`, `10px`, `1.25`): Compact grid slide status tags, catalog table pills, and interactive byte slot counters.

### Named Rules
**The Tabular Numeric Rule.** Every slide tick (`01`–`20`), slide code badge (`B01-S01`), UTF-8 hex byte, and `1.024`-step unit conversion cell uses `JetBrains Mono` with `font-variant-numeric: tabular-nums` so numbers align cleanly down columns without jitter.

## Layout

Desktop uses a sticky header (`max-width: 1440px`, `16px`–`24px` horizontal padding) above an active deck breadcrumb bar and a 12-column responsive dual-pane workspace (`gap: 16px`). Columns 1–8 (`lg:col-span-8`, ~65%) house the dark Slate `SlideStage` (`min-height: 460px` canvas); columns 9–12 (`lg:col-span-4`, ~35%, `max-height: 720px`) house the synchronized `StudyWorkbenchPanel` with independent internal vertical scroll. Below the fold stack the searchable multi-grade presentation table (`#kho-bai-giang`) and `Bảng 1.1` unit reference grid (`overflow-x-auto` wrapper for small viewports). Mobile (`< 640px` / `1024px`) collapses the split panes vertically and wraps the 20-tick timeline rail from 1 row (`sm:grid-cols-20`) cleanly into 2 equal rows of 10 (`grid-cols-10`). Spacing follows a strict `4px` base unit (`4px`, `8px`, `16px`, `24px`, `32px`).

## Elevation & Depth

No drop shadows are used anywhere at rest or hover. Spatial hierarchy and grouping rely exclusively on surface tonal shifts (Warm Paper Surface vs. Trimmed Manila Elevated; Stage Midnight Slate vs. Stage Charcoal Canvas) framed by crisp `1px solid` borders (`#D5CFC0` on birch paper, `#2C384B` on slate dark panes) plus a subtle `190ms` upward settle transition (`cubic-bezier(0.16, 1, 0.3, 1)`) when switching slides (`prefers-reduced-motion` clears durations to `0.01ms`).

### Named Rules
**The Zero-Drop-Shadow Rule.** Containers and cards stay strictly flat at `box-shadow: none`; communicate containment and active state via `1px` border color shifts and clean background plane contrast instead of soft shadows or blurs.

## Shapes

Every interactive surface shares a disciplined architectural `4px` small corner radius (`rounded-sm`: `4px`) across buttons, chips, badges, search inputs, timeline ticks, stage cards, and modal panels. Zero oversized pill capsules (`rounded-full`) or inconsistent `12px–24px` blobs appear inside the workspacechrome, reinforcing precision engineering notebook geometry.

## Components

### Buttons
Crisp flat rectangular actions with `4px` radius (`rounded-sm`), clear `12px` semibold typography, and direct color shifts on hover.
- **Shape:** Uniform small radius (`4px`).
- **Primary:** Solid `Electric Cobalt` (`#1D4ED8`) fill, `Warm Paper Surface` (`#FAF8F3`) text, `10px 14px`–`12px 16px` compact padding, no border shadow.
- **Hover / Focus:** Transitions smoothly over `150ms` to `Deep Cobalt Action` (`#1E40AF`) with a `2px solid #1D4ED8` `:focus-visible` outline (`2px` offset).
- **Secondary:** `Stage Charcoal Canvas` (`#1C2431`) with `1px solid #2C384B` border and slate text (`#CBD5E1`) on dark stage controls, shifting border to `#475569` on hover.

### Chips
Compact single-line level selectors and deck count badges styled as rectangular architectural tags (`4px` radius).
- **Style:** `Trimmed Manila Elevated` (`#ECE7DB`) fill with `#3E4856` ink (`10px`–`12px` semibold, `4px 10px` padding).
- **State:** Active chip flips to solid `Deep Graphite Ink` (`#141A23`) with `#FAF8F3` text for navigation pills, or `Electric Cobalt` (`#1D4ED8`) with `#FAF8F3` text on deck grade tags.

### Cards / Containers
Tonal compartments with `1px` hairlines (`4px` radius) separating slide objectives, interactive labs, and repository sections.
- **Corner Style:** Small architectural corners (`4px`).
- **Background:** `Warm Paper Surface` (`#FAF8F3`) on the daylight study desk; `Stage Charcoal Canvas` (`#1C2431`) or `Stage Midnight Slate` (`#141A23`) inside the dark projection canvas.
- **Shadow Strategy:** Zero box shadows (`none`).
- **Border:** `1px solid #D5CFC0` (birch light) or `1px solid #2C384B` (slate dark).
- **Internal Padding:** `12px`–`24px` scaling with viewport width.

### Inputs / Fields
Clean white form wells on daylight birch containers with unmistakable focus outlines.
- **Style:** `1px solid #D5CFC0` stroke, pure `#FFFFFF` surface fill, `4px` radius (`6px 12px 6px 32px` padding when paired with an inline left geometric search icon).
- **Focus:** System-wide `:focus-visible` ring (`2px solid #1D4ED8`, `outline-offset: 2px`) paired with `#1D4ED8` caret color.

### Navigation
Sticky full-bleed daylight header paired with an equal-4 workbench tab strip (`Mục lục`, `Bit & Byte`, `Giải SGK`, `Kho lớp`).
- **Style:** Header uses `#FAF8F3` with `#D5CFC0` bottom rule; workbench tabs sit inside an `#ECE7DB` 4-column grid with `whitespace-nowrap`, `11px`–`12px` semibold labels, and a `2px` bottom indicator bar (`#1D4ED8` when active, `transparent` when idle).

### Calibrated 20-Tick Timeline Rail
Signature multi-slide navigation strip rendered inside a darkened telemetry band (`#11161E`) beneath the stage header. Uses `grid-cols-10 sm:grid-cols-20` with `4px` gaps so all 20 slide buttons (`01`–`20`, `24px` tall, `JetBrains Mono 11px`) remain visible and directly clickable in one horizontal line on desktop (`>= 640px`) and two balanced 10-tick rows on mobile (`< 640px`). Active ticks glow with `#1D4ED8` fill and `#60A5FA` border; visited ticks show `#1E293B` with `#93C5FD` ink.

## Do's and Don'ts

### Do:
- **Do** keep dark Slate surfaces exclusive to the slide projection stage (`SlideStage`) and daylight Birch surfaces on the side workbench and curriculum catalog so visual hierarchy stays dual-polarity.
- **Do** format every slide code (`B01-S01`), chapter range badge (`S01–S02`), binary sequence, and base-`1024` table figure with `JetBrains Mono` and `tabular-nums`.
- **Do** pair `1px solid` borders with flat tonal contrast instead of box shadows across all buttons, cards, tabs, and inputs.
- **Do** size grid navigation tabs evenly (`grid-cols-4`, compact `11px`/`12px` padding) without `truncate` hiding tab names on desktop or mobile viewports.

### Don't:
- **Don't** add `backdrop-blur`, translucent glass panels, ambient gradient text/backgrounds, or hard offset shadows anywhere in the workspace.
- **Don't** place ungrounded eyebrow kickers above main page or section headings, and don't substitute emoji glyphs for `1.75`-stroke SVG UI icons.
- **Don't** hide inactive slide ticks behind a collapsed progress bar or horizontal-scroll carousel; keep every slide (`01`–`20`) accessible in the calibrated tick grid.
