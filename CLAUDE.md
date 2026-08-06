# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 frontend for the gowoobro personal portfolio site. Displays projects, collects visitor questions via a chat interface, and shows IP-based Q&A history via a floating action button (FAB). Supports Korean/English via i18n routing.

## Dev & Build Commands

```bash
npm run dev      # Dev server on port 9007
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
npx tsc --noEmit # Type check without emitting
```

## Architecture

```
app/
├── [lang]/                  # i18n route segment (ko | en)
│   ├── layout.tsx           # Root HTML shell, Emotion registry, React Query provider
│   ├── page.tsx             # Main page — SSR, composes all sections
│   ├── admin/
│   │   ├── layout.tsx       # Password gate for all /admin routes (NEXT_PUBLIC_ADMIN_PASSWORD)
│   │   ├── answers/page.tsx # Admin Q&A management — list questions, write answers
│   │   └── projects/        # Project CRUD admin pages
│   └── app/[id]/page.tsx    # Individual app detail page
├── components/
│   ├── ChatInterface.tsx    # Question submission form + hint toast
│   ├── FAB.tsx              # Floating action button + IP-based Q&A history panel
│   ├── Header.tsx           # Fixed nav with glassmorphism + project dropdowns
│   ├── Footer.tsx           # Multi-section footer
│   ├── IntegrationsGrid.tsx # 3D scattered project icon grid
│   ├── SuiteGrid.tsx        # App/Web showcase cards
│   └── PageLayout.tsx       # Main, HeroSection layout primitives
├── api/                     # Axios client functions (one file per domain)
│   ├── questions.ts
│   ├── answers.ts
│   ├── ipblock.ts
│   └── projects.ts
├── types/models.ts          # Shared TypeScript interfaces
├── dictionaries/            # i18n strings
│   ├── ko.json
│   └── en.json
├── get-dictionary.ts        # Lang → dictionary loader
├── lib/axios.ts             # Axios instance (baseURL from NEXT_PUBLIC_API_URL)
├── providers.tsx            # React Query provider
└── registry.tsx             # Emotion SSR registry
```

## Key Patterns

- **Styling**: Emotion.js (`styled`) for all components. No inline styles except one-offs. Design tokens: primary `#7c3aed / #6d28d9 / #a78bfa`, background `#f9f9fb`, dark `#0f071e`.
- **Animation**: Framer Motion (`motion`, `AnimatePresence`) for all transitions. Spring physics for interactive elements.
- **Server/Client split**: `page.tsx` is a server component (SSR data fetch). Interactive components are `'use client'` with Jotai/React Query.
- **IP detection**: `fetch('https://api.ipify.org?format=json')` in `useEffect` — used by both `ChatInterface` and `FAB` independently.
- **i18n**: Middleware rewrites `/` → `/ko` or `/en`. `getDictionary(lang)` loads the JSON. Dict is passed as `dict` prop down to components.

## IP-based Q&A Flow

1. Visitor lands → `ChatInterface` fetches their IP via ipify
2. Visitor submits question → stored in `questions_tb` with their IP
3. Admin answers via `/ko/admin/answers` → stored in `answers_tb` (FK to `questions_tb.q_id`)
4. Visitor clicks FAB → panel fetches `GET /api/answers?address={ip}` → shows their Q&A history
5. Red notification dot on FAB when answered count > last-seen count (persisted in `localStorage`)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend base URL for the browser (default: `https://gowoobro.com/api`) |
| `API_URL` | Server-only backend base URL for SSR fetch (docker: `http://gowoobro_go:8007/api`; falls back to `NEXT_PUBLIC_API_URL`) |
| `NEXT_PUBLIC_EMAIL` | Contact email shown in footer |
| `NEXT_PUBLIC_IMAGE_URL` | CDN base for project icons |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Password for `/admin` routes (checked client-side, stored in sessionStorage) |

## Admin Access

URL: `/ko/admin/answers` or `/en/admin/answers`
Password: set in `.env` as `NEXT_PUBLIC_ADMIN_PASSWORD`
Session persists within the browser tab via `sessionStorage`.
