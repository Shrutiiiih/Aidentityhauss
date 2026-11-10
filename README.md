# AIdentityHaus site

Next.js 15 + TypeScript. GSAP/ScrollTrigger for motion, Lenis for scroll, React Three Fiber for the hero only (lazy-loaded).

    npm install
    npm run dev

## Structure
- `lib/content.ts`       all copy, nav links, CTA link (swap the CTA href for the real booking URL)
- `lib/capability.tsx`   reduced-motion / pointer / low-power / WebGL detection, used by every animation
- `lib/motion/gsap.ts`   plugin registration, shared easings, the roofline clip-path wipes
- `components/layout`    Shell, Preloader, Nav, MobileMenu, StickyCTA, SmoothScroll
- `components/hero`      Hero (choreography), HeroScene (R3F), HeroFallback (static SVG)
- `components/ui`        MagneticButton, Cursor, Grain, Stub (placeholder sections)

## Status
Done: tokens, motion utilities, preloader, nav (desktop / tablet / phone), hero, anchor scrolling + scroll-spy.
Next: Services, Work, Team, Testimonials, Contact (currently `Stub` anchors).

## Assets
The hero object is built from primitives. To use real 3D artwork, replace `HeroScene` with an image/video/GLB inside `.hero__stage`; nothing else depends on it.

## Fonts
Loaded from Google Fonts in `app/layout.tsx`. Move to `next/font` before launch.


Updated direction: the original warm editorial base is preserved, with additional Process, Why the Haus?, Haus Notes and conversion-flow sections layered into the homepage.

## Latest changes
- Preloader now animates the primary logo (`public/logo-primary-*.png`); nav + footer use `public/logo-icon.png`; favicon is `app/icon.png`.
- All "Schedule a Discovery Call" buttons dial `+91 96622 70555` (set in `lib/content.ts` → `PHONE`).
- Team section shows the four team members (photos in `public/team/`).
- Icons added to services, process, why, contact and footer (`components/ui/Icons.tsx`).
- Mobile fix: the sticky call button and mobile menu used an undefined `--coral` colour (transparent), so they floated over the page. Now solid.
