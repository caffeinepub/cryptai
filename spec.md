# CreamyCryptoAI.org

## Current State
The site is a dark-themed, multilingual crypto/AI research membership platform. Background is a solid dark color (CSS variable `--background`). Text colors are mostly white/light gray. All pages (Homepage, /ai, /cryptoandmarket, /page-1 to /page-10) share the same App shell with Header, MusicPlayer, Footer.

## Requested Changes (Diff)

### Add
- `StarryNightBackground` component: Canvas-based animated night sky background
  - Deep dark background (near-black, very dark navy/black)
  - ~150 golden stars with twinkling/glow animation (random size, opacity flicker)
  - ~3-5 shooting stars at a time appearing randomly, with golden glowing tail effect
  - Canvas fills entire viewport, position fixed, z-index behind all content
  - Runs on all pages (placed in App shell)
  - Performant: uses requestAnimationFrame, stars pooled

### Modify
- `App.tsx`: Add `<StarryNightBackground />` as first child of the root div; remove `bg-background` from root div or set background to transparent so the canvas shows through
- `index.css`:
  - Body/html background set to `#000008` (very dark near-black)
  - Text color overrides: primary text → gold (`#D4AF37`), secondary/body text → deep red (`#C0392B` or `#E53E3E`)
  - Headings → gold
  - Body text, paragraphs, labels → red
  - Buttons: primary → gold border + gold text; secondary → red
  - Links → gold on hover
  - Keep white text only where absolutely necessary for contrast/readability (e.g. inside dark badges)

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/components/StarryNightBackground.tsx` -- Canvas animation component with stars + shooting stars
2. Add to `App.tsx` in the root div (behind all content)
3. Update `index.css` -- change body text to red (#C0392B), headings to gold (#D4AF37), background to very dark black, ensure canvas shows through
4. Validate build
