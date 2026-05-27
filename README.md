# AEDLER — Landing Page

Premium B2B landing page for the AEDLER brand by Schedpol Sp. z o.o. — European bathroom engineering with patented Stabildense® technology.

## Tech

- Single-file landing (`index.html`) with split CSS/JS in `assets/`
- Multi-language (PL · EN · DE) via lightweight `data-i18n` system in `assets/i18n.js`
- Mobile-first responsive design (DM Sans + JetBrains Mono)
- No build step — vanilla HTML/CSS/JS

## Files

```
index.html                  Main landing page
assets/
  styles.css                Full design system
  app.js                    Language switcher, carousel, lightbox, counters
  i18n.js                   PL/EN/DE translations (extensible)
  *.png / *.jpg / *.svg     Brand assets, renders, logos

Ulotka AEDLER A4.html       Print-ready 2-page A4 brochure
Ulotka AEDLER A4-print.html Auto-print variant (Cmd+P / Ctrl+P)
```

## Adding a new language

In `assets/i18n.js`, copy the `pl: { ... }` block, rename the key (e.g. `ro:` for Romanian) and translate values. Add a button to the language switcher in `index.html`:

```html
<button type="button" data-lang="ro">RO</button>
```

## Local preview

Just open `index.html` in a browser. For local server (recommended):

```bash
python3 -m http.server 8000
# or
npx serve
```

## License & ownership

© 2026 Schedpol Sp. z o.o. — All rights reserved.
