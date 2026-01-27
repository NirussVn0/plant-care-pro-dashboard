# Bolt's Journal

## 2025-02-23 - [Initial Setup]
**Learning:** The project is a Next.js application with React 19 and Tailwind CSS.
**Action:** Starting performance analysis.

## 2025-02-23 - [Image Optimization & Type Consistency]
**Learning:** Found a pattern of using `div` with `backgroundImage` for plant cards, bypassing Next.js Image Optimization. Also discovered `Task` model was out of sync with usage (using `dueDate` vs `date`), which blocked build verification.
**Action:** Replace background images with `next/image` using `fill` prop. Fix `Task` interface to match codebase usage before running build.
