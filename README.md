# Kaysolo Portfolio

An editorial portfolio for Kaysolo, a product and brand designer based in Lagos, Nigeria.

Built with Vite, React, TypeScript, Tailwind CSS, Framer Motion, Lenis and Three.js.

## Features

1. White canvas with black typography and an earthy visual accent palette.
2. A real time three dimensional hero sculpture that responds to pointer movement, keyboard input and scroll.
3. Perspective project cards, warm cursor glow, magnetic buttons and scroll driven process panels.
4. Responsive navigation, project filters and reduced motion support.
5. Project covers taken from the matching Behance entries, with direct links to each project and the full profile.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

The repository is configured for Vite and outputs production files to `dist`.

## Assets and project content

Portrait artwork is stored in `public/portrait.jpg` and `public/portrait.png`. Project titles, descriptions, Behance links and cover image URLs are maintained in `src/data.ts`.
