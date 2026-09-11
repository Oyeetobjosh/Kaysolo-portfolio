# Kaysolo — Portfolio

A design-hungry, motion-heavy portfolio for **Kaysolo** (Odewole Kehinde), a full-stack
designer working across UI/UX, graphics, branding, and security / anti-counterfeit design.

Built with **Vite + React + TypeScript + Tailwind CSS + Framer Motion + Lenis**.

## Features
- Animated aurora / mesh-gradient background that reacts to pointer + scroll
- Custom magnetic cursor with contextual labels (desktop)
- Kinetic word-by-word text reveals, parallax, count-up stats
- 3D mouse-tilt project cards with filtering
- Sticky horizontal-scroll "process" section (desktop) / stacked cards (mobile)
- Lenis smooth scrolling, respects `prefers-reduced-motion`
- Fully responsive (phone / tablet / desktop)

## Local development
```bash
npm install
npm run dev      # http://localhost:5173
```

## Production build
```bash
npm run build    # outputs to /dist
npm run preview  # preview the build
```

## Deploy to Vercel
This repo is Vercel-ready (`vercel.json` sets framework = Vite, output = `dist`).

1. Go to https://vercel.com/new
2. Import this GitHub repository.
3. Vercel auto-detects the settings — just click **Deploy**.

No environment variables are required.

## Assets
- `public/portrait.jpg` — profile photo
- `public/works/*` — project cover images
- `public/hero-poster.png` — abstract hero visual

Project data lives in `src/data.ts` — edit there to add projects, tweak copy, or
update contact links (`src/sections/Contact.tsx`).
