# Fitlek — Site vitrine

Site 100% Next.js (App Router, TypeScript, Tailwind CSS) : landing page + pages simples (fonctionnalités, tarifs, à propos, contact).

## Démarrer

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000

## Build production

```bash
npm run build
npm start
```

## Structure

- `app/page.tsx` — landing page
- `app/fonctionnalites/page.tsx`
- `app/tarifs/page.tsx`
- `app/a-propos/page.tsx`
- `app/contact/page.tsx`
- `components/Header.tsx`, `components/Footer.tsx`
- `app/globals.css` — design system (fond chromé, couleurs, typographies)
