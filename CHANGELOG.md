# Changelog

All notable changes to PlantCarePro will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Landing Page Animations** - Beautiful entrance animations using anime.js
  - Hero section fade-in and slide-up effects
  - Floating status cards with continuous bob animation
  - Scroll-triggered feature and testimonial reveals
  - Animated number counters (500k+ plants saved, 10k+ users)
- **AnimationService** - Reusable OOP animation service class (`src/services/animation/AnimationService.ts`)
- **useScrollAnimation Hook** - Custom React hook for IntersectionObserver-based animations

## [0.2.0] - 2026-01-20

### Added
- Full marketing landing page matching reference design
- Auth modal component for login/signup with demo mode
- Dark mode toggle fix using Tailwind v4 `@custom-variant` selector

### Fixed
- Hydration errors in AuthContext and ThemeContext
- Calendar dots only show on days with actual tasks
- Encyclopedia filters now functional (category, difficulty)

### Changed
- Plant interface standardized with category, difficulty, petFriendly fields
- Updated ThemeContext to use `useMemo` for resolvedTheme

## [0.1.0] - 2026-01-15

### Added
- Initial project setup with Next.js 16, Tailwind CSS v4, anime.js
- Dashboard with Greenhouse Overview
- My Jungle page with plant collection
- Schedule page with calendar and task management
- Encyclopedia page with plant database
- Care Logs page with history tracking
- Service layer architecture (Plant, Task, User, CareLog services)
- Global theming with light/dark mode support
