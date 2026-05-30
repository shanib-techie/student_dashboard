# LearnOS — Student Learning Dashboard

A futuristic, production-quality student learning dashboard built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Supabase**.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Bento Grid Layout** | Responsive 1→2→3 column grid with semantic tiles |
| **Supabase Integration** | Server-side data fetching, RLS-protected, service-role key never exposed |
| **Framer Motion Animations** | Staggered page load, spring hover effects, animated progress bars |
| **Collapsible Sidebar** | Desktop: full labels; Tablet: icon-only; Mobile: bottom nav |
| **Activity Graph** | 52-week contribution heatmap with animated rendering |
| **Dark Glassmorphism UI** | Gradient cards, subtle borders, backdrop blur |
| **TypeScript Throughout** | Strict mode, typed interfaces for all data models |
| **Loading States** | `loading.tsx` skeleton with pulse animation |
| **Error Handling** | `error.tsx` boundary + graceful DB failure UI |

---

## 🗂️ Project Structure

```
student-learning-dashboard/
├── app/
│   ├── layout.tsx              # Root layout — Syne + Inter fonts
│   ├── globals.css             # Tailwind directives + custom utilities
│   ├── page.tsx                # Redirects / → /dashboard
│   └── dashboard/
│       ├── layout.tsx          # Dashboard shell (Sidebar + MobileNav)
│       ├── page.tsx            # ← Main page: Server Component, fetches Supabase
│       ├── loading.tsx         # Skeleton shown while page.tsx streams
│       ├── error.tsx           # Error boundary (Client Component)
│       └── courses/
│           └── page.tsx        # Stub courses page
├── components/
│   ├── ui/
│   │   └── DynamicIcon.tsx     # Maps icon_name strings → Lucide components
│   └── dashboard/
│       ├── Sidebar.tsx         # Collapsible desktop sidebar (Client)
│       ├── MobileNav.tsx       # Bottom navigation for mobile (Client)
│       ├── BentoGrid.tsx       # Grid layout wrapper (Server)
│       ├── HeroCard.tsx        # Welcome + streak tile (Client)
│       ├── CourseCard.tsx      # Per-course tile with progress bar (Client)
│       ├── StatsTile.tsx       # Overview stats tile (Client)
│       ├── ActivityCard.tsx    # Contribution graph (Client)
│       ├── LoadingSkeleton.tsx # Pulse skeleton grid (Server)
│       └── ErrorUI.tsx         # Error display with retry (Client)
├── lib/
│   ├── supabase.ts             # Server-side Supabase client + getCourses()
│   ├── activity.ts             # Activity data generation + streak calculation
│   └── variants.ts             # Framer Motion animation variant definitions
├── types/
│   └── index.ts                # TypeScript interfaces (Course, ActivityDay, etc.)
├── supabase/
│   └── schema.sql              # Table schema + RLS + seed data
├── .env.example                # Environment variable template
├── vercel.json                 # Vercel deployment config
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd student-learning-dashboard
npm install
```

### 2. Set Up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor → New Query**
3. Paste and run the contents of `supabase/schema.sql`
4. Go to **Settings → API** to get your keys

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

> ⚠️ **Never commit `.env.local`** — the service-role key has full database access.

### 4. Run Locally

```bash
npm run dev
# → http://localhost:3000
```

---

## 🗄️ Database Schema

```sql
create table courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null default 0 check (progress between 0 and 100),
  icon_name   text not null default 'BookOpen',
  created_at  timestamptz not null default now()
);
```

### Supported `icon_name` Values

| Value | Icon |
|---|---|
| `BookOpen` | Open book |
| `Code` | Code brackets |
| `FileCode` | Code file |
| `Brain` | Brain |
| `Layers` | Stacked layers |
| `Cpu` | Processor |
| `Terminal` | Terminal window |
| `Database` | Database |
| `Globe` | Globe |
| `Zap` | Lightning bolt |

---

## 🏗️ Architecture: Server vs Client Components

```
Server Components (0 client JS)          Client Components (interactive)
─────────────────────────────────        ──────────────────────────────
app/layout.tsx                           Sidebar.tsx        (useState, pathname)
app/dashboard/layout.tsx                 MobileNav.tsx      (pathname)
app/dashboard/page.tsx ← Supabase        HeroCard.tsx       (framer-motion)
components/BentoGrid.tsx                 CourseCard.tsx     (framer-motion)
components/LoadingSkeleton.tsx           ActivityCard.tsx   (framer-motion)
lib/supabase.ts ← service-role key       StatsTile.tsx      (framer-motion)
lib/activity.ts                          ErrorUI.tsx        (onClick reset)
```

**Key principle:** Data fetching happens entirely on the server. Client Components receive typed props and are responsible only for interactivity and animation. The `SUPABASE_SERVICE_ROLE_KEY` is never serialized into any client bundle.

---

## 🎨 Design System

### Colors
- Background: `#07070c` (near-black with blue undertone)
- Surface: `#0a0a0f`
- Border: `rgba(255,255,255,0.07)`
- Accent: Violet (`violet-500`) / Indigo gradient
- Secondary accents: Cyan, Emerald, Amber per card index

### Typography
- **Display (headings):** Syne — geometric, futuristic
- **Body:** Inter — clean, readable

### Animations
All animations use `transform` and `opacity` only — no layout-triggering properties:
- **Page load:** Staggered `fadeUpVariants` (0→1 opacity, 24px→0 translateY)
- **Hover:** Spring scale 1→1.02 (`stiffness: 300, damping: 20`)
- **Progress bars:** `scaleX` from 0 to `progress/100` with eased spring
- **Sidebar:** Spring width transition (`expanded: 240px`, `collapsed: 64px`)

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `< 768px` | Single column grid + bottom navigation bar |
| `768px–1024px` | 2-column grid + icon-only sidebar |
| `> 1024px` | 3-column bento grid + full sidebar with labels |

---

## ☁️ Deploy to Vercel

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel
# Follow prompts, then set env vars:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel --prod
```

### Option B — GitHub Integration

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add the three environment variables in the Vercel project settings
4. Deploy — Vercel auto-detects Next.js

### Required Environment Variables on Vercel

| Variable | Source |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API (keep secret!) |

---

## 🧩 Extending the Dashboard

### Add a new course field (e.g. `description`)

1. `ALTER TABLE courses ADD COLUMN description text;`
2. Update `types/index.ts` → add `description?: string` to `Course`
3. Update `CourseCard.tsx` to render it

### Add authentication

Install `@supabase/ssr` and `@supabase/auth-helpers-nextjs`, update `lib/supabase.ts` to use `createServerComponentClient`, and add a `/login` route.

---

## 🛠️ Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run type-check   # TypeScript check without emit
```

---

## 📄 License

MIT — free to use, modify, and deploy.
