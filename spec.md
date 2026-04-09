# CreamyCryptoAI.org

## Current State
- Bangers font used only in Header/Footer, rest uses system-ui
- StickerOverlay component active; header mustache click triggers animation + opens player
- Footer contains Legal links (Imprint, Privacy Policy, Terms, Contact) + section heading
- AI and Crypto & Market tiles have border-border only, no permanent gold border
- "Creamy Vibes" player opened by clicking mustache logo in header
- Colors: mix of gold, white, gray across UI

## Requested Changes (Diff)

### Add
- "Creamy Vibes" button in header right side (left of language dropdown), styled like Connect Wallet button, with music note icon, clicking opens MP3 player
- Permanent thin gold border (1px solid #D4AF37) on AI and Crypto & Market tiles
- Bangers font applied globally to ALL text elements (body, buttons, headings, labels, nav, footer, modals, cards)
- Heading text: uppercase; body/button text: normal case
- Color palette: headings in Gold (#D4AF37), body text in creamy white (#FFF8E7)

### Modify
- Header mustache click: remove animation trigger (triggerSticker call removed), keep openPlayer
- Footer mustache/logo click: remove triggerSticker call, keep window.open to creamcoin.fun
- index.css: add Bangers global font-family rule
- MainTiles: add `border border-[#D4AF37]` permanent gold border to both tiles

### Remove
- StickerOverlay component from App.tsx render tree
- StickerOverlay.tsx file (can be deleted or left unused — imports removed)
- triggerSticker imports from Header.tsx and Footer.tsx
- Footer legal links section (legalLinks array, the <div> column with Imprint/Privacy/Terms/Contact and the section heading)
- All related translation keys usage for footer_impressum, footer_datenschutz, footer_terms, footer_kontakt, footer_legal in Footer.tsx
- Dead code: any remaining references to triggerSticker

## Implementation Plan
1. Update index.css: add `@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap')` and set global `font-family: 'Bangers', cursive` on body; headings uppercase, body/buttons normal-case
2. Update Header.tsx: remove `triggerSticker` import and call from handleLogoClick; add "Creamy Vibes" button in right controls area (before language select), styled like Connect Wallet, calls triggerPlayerOpen on click
3. Update Footer.tsx: remove `triggerSticker` import and call from handleLogoClick; remove legalLinks array and entire legal links column div
4. Update App.tsx: remove StickerOverlay import and <StickerOverlay /> from JSX
5. Update MainTiles.tsx: add permanent gold border to both tile buttons
6. Delete or neutralize StickerOverlay.tsx (remove from imports/usage)
