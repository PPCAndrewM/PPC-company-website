# PPC Philton — 2026 website mock-up

A from-scratch redesign mock-up of ppcphilton.com, built to run entirely locally
with no build step and no server. **Phase 1 and Phase 2 are both complete** —
all 25 pages in the planned sitemap are built and cross-linked. See
[Status](#status) below for what that covers and what's intentionally left
for a future pass.

## How to run it

Double-click `index.html` (or right-click → Open with → your browser). That's it —
no `npm install`, no local server, no build step. Every page, stylesheet, script
and font is a plain file on disk; fonts are embedded as base64 so they render
correctly even under the `file://` protocol, which blocks ordinary font/CSS
network requests in some browsers.

## Status

All 25 pages are built, cross-linked and validated (every `src`/`href`
resolves, no broken internal links, balanced HTML tags, valid JS):

**Home** — `index.html`

**Products** — `pages/products.html` (hub) plus all five product pages:
dry bulk container liners, flexitanks, containment bags, industrial
packaging, bladder tanks & agriculture

**Services** — `pages/services.html` (hub) plus all four service pages:
Flexitank inspection, emergency cross-pumping, installation services,
dry bulk emergency response — content and imagery based on the
equivalent pages on the live ppcphilton.com site

**Industries** — `pages/industries.html` (hub) plus all five industry
pages: chemical manufacturing, food & beverage, logistics & freight,
agriculture & commodities, pharmaceutical & healthcare

**Company** — about, manufacturing, quality & certifications, sustainability,
news / knowledge centre, FAQs

**Contact** — full enquiry form + regional contact directory

### What's intentionally not done

This is a mock-up, not a production build. Left for a real build phase:

- **No working backend.** Every form shows a client-side "submitted"
  message (see `js/main.js`) but sends nothing anywhere — there's nothing
  to send it to. Wire this to your real form handler/CRM before launch.
- **No individual news article pages.** `pages/news.html` lists eight real
  article titles/dates/excerpts (reused from the live site) as cards
  linking to the most relevant product page, rather than eight separate
  full article pages — a proportionate choice for a mock-up, but a real
  knowledge centre would give each its own page and URL.
- **No hreflang/translated pages.** The audit flagged the old site's
  untranslated locale stubs as a real problem; this mock-up deliberately
  ships one authoritative English site rather than repeating that mistake.
  If genuine multi-market translation is wanted, that's a distinct project.
- **Regional contact table** on the Contact page reproduces real data from
  the live site, grouped by region instead of one long table — but it's
  still a static list. An interactive map (mentioned as an idea in the
  audit) would need a mapping library and is out of scope for a
  no-build-step static mock-up.

## Project structure

```
PPC-company-website/
├── index.html                          Homepage
├── pages/
│   ├── products.html                   Products hub + "which product do I need" guide
│   ├── product-dry-bulk-container-liners.html
│   ├── product-flexitanks.html
│   ├── product-containment-bags.html
│   ├── product-industrial-packaging.html
│   ├── product-bladder-tanks.html
│   ├── services.html                   Services hub
│   ├── service-flexitank-inspection.html
│   ├── service-emergency-cross-pumping.html
│   ├── service-installation-services.html
│   ├── service-dry-bulk-emergency-response.html
│   ├── industries.html                 Industries hub
│   ├── industry-chemical.html
│   ├── industry-food-beverage.html
│   ├── industry-logistics.html
│   ├── industry-agriculture.html
│   ├── industry-pharmaceutical.html
│   ├── about.html
│   ├── manufacturing.html
│   ├── quality-certifications.html
│   ├── sustainability.html
│   ├── faqs.html
│   ├── news.html                       Knowledge centre / News
│   └── contact.html
├── css/
│   ├── tokens.css                      Colour, type, spacing variables + embedded fonts
│   ├── base.css                        Reset, typography, layout primitives, utilities
│   └── components.css                  Header, nav, cards, forms, accordion, gallery, footer…
├── js/
│   ├── partials.js                     Injects the shared header/footer/icon-sprite (see below)
│   └── main.js                         Nav, scroll-reveal, accordion, lightbox, back-to-top, forms
├── assets/
│   ├── images/                         Processed, web-sized images (see Asset provenance)
│   └── icons/sprite.svg                Human-readable source of the icon set
├── Media/                              Your original supplied assets — untouched, kept as source
│                                        (excluded from git — see .gitignore)
├── _process_images.py                  One-off script: Phase 1 Media/ → assets/images/
├── _process_images_phase2.py           One-off script: Phase 2 additional assets
├── _process_images_phase3.py           One-off script: Phase 3, homepage hero carousel images
├── _process_images_phase4.py           One-off script: Phase 4, flexitank CGI cards + real-photo galleries
├── _process_images_phase5.py           One-off script: Phase 5, page-hero carousel rollout (one new image)
├── _process_images_phase6.py           One-off script: Phase 6, homepage carousel image swap
├── _process_images_phase7.py           One-off script: Phase 7, Flexitanks "Trailer & Reefer" card CGI swap
├── _process_images_phase8.py           One-off script: Phase 8, homepage carousel image swap
├── _process_images_phase9.py           One-off script: Phase 9, new Services section images
└── README.md                           This file
```

## Design decisions

A few choices were made deliberately and are worth understanding.

**Colour palette.** Kept and refined your live site's actual brand colours
(confirmed from the production CSS): signal blue `#00A1E6` and safety orange
`#F55118`. These are now a full tonal scale (`css/tokens.css`) rather than
the original two flat hex values, which is what makes the new design feel
more premium without abandoning brand recognition.

**Typography.** Barlow Semi Condensed (headings — a technical, engineering
character) paired with Work Sans (body/UI — highly legible, neutral) and
IBM Plex Mono (specs, data, badges — reinforces "certified/technical" content
at a glance). Fonts are embedded as base64 inside `tokens.css` specifically
so the site renders identically whether opened via `file://` or a real
server — linked `.woff2` files are blocked by some browsers' CORS rules when
there's no server origin. **If/when this is deployed to a real host**,
switch these to normal linked `.woff2` files under `assets/fonts/` — it will
cut `tokens.css` from ~240KB to a few KB and let browsers cache fonts
properly across pages.

**Shared header/footer without a server.** The brief asks for reusable
components in a site that must run by double-clicking `index.html`. True
HTML includes (`fetch('header.html')`) are blocked by the browser's
same-origin policy under `file://` — there's no server to grant an origin,
so the request silently fails in Chrome/Edge. `js/partials.js` solves this
by injecting the header/footer markup from an inline script instead of
fetching it, which works identically under `file://` and `http(s)://`.
Every one of the 25 pages sets `data-base` (`""` at root, `"../"` inside
`/pages/`) and `data-page` (for nav active-state highlighting) on `<body>` —
`partials.js` reads both to build correct relative links and highlight the
right nav item automatically. The trade-off: header/nav/footer won't appear
with JavaScript disabled, and "View Source" won't show them. Given the real
constraint (must run with no server), this was judged the better trade-off —
but if this becomes a real site, switch to server-side includes, a
static-site generator, or a templating build step instead.

**Same reasoning applies to the icon sprite** — `assets/icons/sprite.svg` is
kept as a human-readable source of the icon designs, but the actual icons
render from a copy of the same markup inlined by `partials.js`, because
`<use href="external.svg#id">` is also blocked cross-file under `file://`
in Chrome. **If you add or change an icon, update both files.**

**No dark mode.** This is a B2B product-marketing site, not an application —
neither of the two inspiration sites (labaronne-citaf.com, trustflexitanks.com)
nor any category leader researched for the audit ships a dark theme.

**Clean URLs.** Genuinely clean URLs (no `.html`) require server-side
rewrite rules, which don't exist when opening files directly. Once deployed
to a real server, adding rewrite rules (or exporting through a static-site
generator) will give you clean URLs without changing any page content.

**"Bladder Tanks & Agriculture" is marked as new throughout.** This product
line only exists on the live site as one June 2026 news post, so every
page referencing it (product page, homepage card, agriculture industry
page) is honest about it being newly launched rather than presenting it as
an established, fully-specified range — see `pages/product-bladder-tanks.html`
in particular.

## Asset provenance

Real assets from your supplied `Media/` folder were used wherever suitable,
processed (resized + compressed for web) into `assets/images/`. Highlights:

| Used for | Source |
|---|---|
| Logo (header/footer) | `Media/PPC Logo/PPC-Philton-Large-Logo trans - clear background.png` — genuinely transparent PNG; replaced the original opaque-background version, which was the cause of a white box appearing behind the logo on the dark footer |
| Favicon | `Media/PPC Logo/PPC logo.png` |
| Hero image carousel (4 slides) | `Media/Flexitanks photographs/Flexitank-rail-testing.jpg`, `Media/Flexitanks photographs/Ground Storage Tank.JPG`, `Media/Dry bulk phtographs/Dry Bulk End fill liner 009.jpg`, `Media/Flexitanks photographs/Flexitank-unloading-trailer.jpg` (the last one cropped from portrait to a 16:9 landscape band — see `_process_images_phase3.py`); auto-advances every 6s, pauses on keyboard focus and when the tab is hidden (not on mouse hover, by design), and skips autoplay entirely under `prefers-reduced-motion` |
| ISO 9001 badge | `Media/SGS ISO9001 Logo/SGS ISO 9001 UKAS_TCL_HR.jpg` — genuine certificate; processed copy kept in `assets/images/certifications/` but no longer displayed on the page (removed as part of the sitewide icon/graphic clean-up, see "Fixes applied after first review") |
| Manufacturing photos | `Media/About us photographs/*` (production line, testing platform, 1974 facility photo) |
| Dry bulk liner sub-types (8) | `Media/Product CGIs/1-8*.png` |
| Flexitank format cards (6) | `Media/Product CGIs/9.,10.,11.,12.,13.,14.*` — mirrors the dry bulk liner page's card format; `12. Trailer1 valve` was newly processed for the Trailer &amp; Reefer card |
| Dry bulk / flexitank product-page galleries | Both galleries were swapped to real photographs only (no CGI renders) — dry bulk adds `Media/Dry bulk phtographs/DSC_2650 klein.jpg` and `dry-bulk-advert-2-pic-2.jpg`; flexitank adds `Media/Flexitanks photographs/flexi-1.jpg`, `flexi-2.jpg` and `recirculation-system.jpg` |
| Containment &amp; industrial packaging galleries | `Media/Industrial packaging photographs/*`, `Media/Product CGIs/15-27*.png` |
| Bladder tanks &amp; agriculture gallery | `Media/Bladder tanks and agriculture applications CGIs/*` |
| Brochures (EN/CN/ES) | `Media/Brochures/*` |
| Testimonials (5, homepage) | `Media/Testimonials/Letters/*.pdf` (MUTO — Korea, Artlant PTA — Portugal, Kukla Spedition — Germany) and `Media/Testimonials/Marketing Graphics/*.png` (Keymac Packaging, Shetland Islands Council) — all real, named, quoted with attribution |
| Contact page world map | `assets/images/map/world-map.svg` — not from `Media/`; this is Wikimedia Commons' "Simple world map.svg" (CC0/public domain, no attribution required), recoloured to match the site palette |
| Page-hero carousels (all 20 interior pages) | Each page-hero banner is now a 4-image auto-advancing carousel (same mechanism as the homepage hero, just at the page-hero's existing shorter height). Almost every image is reused from a page's own Gallery section or another already-processed real photo elsewhere on the site — `Media/Industrial packaging photographs/industrial-cover-for-double-decker-buses.jpg` was the one genuinely new source photo (Industrial Packaging page). The Bladder Tanks & Agriculture page is a deliberate exception: no real photograph of that product exists anywhere in `Media/`, so its carousel uses its own CGI renders instead |

Full mapping for every image is in `_process_images.py` (Phase 1),
`_process_images_phase2.py` (Phase 2), `_process_images_phase3.py`
(Phase 3), `_process_images_phase4.py` (Phase 4) and
`_process_images_phase5.py` (Phase 5) — each line is one source →
destination pair, so you can trace any image on the site back to its
original file.

**`Media/` was reorganised** from the original flat `reference letters/`
folder into `Media/Testimonials/Letters/` (signed PDF/Word reference
letters) and `Media/Testimonials/Marketing Graphics/` (existing promotional
graphics with embedded customer quotes) — clearer now that there are five
sources instead of one. Files were renamed for clarity (e.g. `Artlant.pdf`
→ `Artlant-PTA-Portugal.pdf`); nothing was deleted except two Windows
`Thumbs.db` cache files, which contain no content.

No invented company facts, certifications or client claims appear anywhere.
Where real data wasn't available (bladder tank capacity specs, sustainability
metrics), the copy says so explicitly rather than inventing numbers — see
`pages/sustainability.html` and `pages/product-bladder-tanks.html`.

## Fixes applied after first review

- **Button contrast**: `.btn-secondary` (e.g. "Explore our products",
  "Download brochures") was rendering dark navy text on a dark background
  in the hero and any CTA band, invisible until hover. Fixed in
  `css/base.css` — both contexts now get white text and a light border by
  default, matching the existing `.section--dark` treatment.
- **Footer logo white box**: the original `PPC Philton Large Logo.png` had
  an opaque white background baked in (not transparent), so the CSS trick
  used to recolour it white for the dark footer (`filter: brightness(0)
  invert(1)`) turned the *entire rectangular canvas* white, not just the
  logo strokes. Replaced with the genuinely transparent logo file you
  supplied — the filter now only whitens the visible logo pixels.
- **Testimonials expanded from 1 to 5**: found four more real, signed/
  attributed customer references in the reorganised `Media/Testimonials/`
  folder (Artlant PTA — Portugal, Robert Kukla GmbH — Germany, Keymac
  Packaging Systems — UK, Shetland Islands Council — UK) and added them
  all to the homepage, replacing the placeholder second-testimonial card
  entirely.
- **Testimonials redesigned as compact snippet cards**: the first version
  used narrow, tall columns with full multi-sentence quotes, which was
  hard to read. Cards are now wide horizontal rectangles — avatar, a
  single trimmed sentence, and attribution — with a wider grid minimum so
  fewer, larger cards appear per row.
- **Footer logo colour**: after fixing the white-box issue, the logo was
  still being forced fully white via a CSS filter. Removed the filter
  entirely — the logo now renders in its real brand colours (blue
  "Philton" wordmark, blue rectangles with the white "PPC" cut-out)
  against the dark footer, using the transparent PNG supplied.
- **Lavina Wines references removed** from this README and the codebase
  per your request. The original `.doc` file is untouched on disk in
  `Media/Testimonials/Letters/` — only mentions of it were removed, not
  the file itself.
- **Interactive regional map added to the Contact page** (`pages/contact.html`):
  a CC0/public-domain world map (Wikimedia Commons, recoloured to match
  the site) with 19 clickable pins, one per sales/manufacturing region.
  Clicking a pin shows contact name, phone and email in a side panel.
  Pin positions are approximate (converted from each location's real
  latitude/longitude) — nudge the `left`/`top` percentages in
  `pages/contact.html` if any look visually off once you've viewed it.
  The full text tables remain underneath, now corrected and completed
  with real email addresses for every European contact (previously only
  phone numbers were shown for UK/Europe, France, Spain, Scandinavia &
  Baltics, Turkey and Ukraine) — re-verified directly against the live
  site's own contact-page data rather than the earlier homepage summary.
- **Decorative icons removed sitewide, deployed live to Render**: per
  feedback, every purely decorative icon/graphic was stripped — mega-menu
  category icons, feature-card and download-card icons, checklist bullets,
  card "view →" arrows, trust-strip icons, testimonial quote marks, the
  footer LinkedIn glyph, and the ISO 9001 badge image + colour icons on the
  homepage and Quality &amp; Certifications page (the certification text
  itself stays, just without the graphics). Breadcrumb chevrons became a
  plain "/" separator. Functional icons that a control actually depends on
  were kept: the hamburger/close toggle, the mega-menu dropdown chevron,
  the FAQ/spec-sheet accordion plus/minus, the lightbox close button, and
  the phone/mail icons inside the interactive contact-map panel. The icon
  sprite (`assets/icons/sprite.svg` and its mirror in `js/partials.js`) was
  trimmed down to just those six surviving icons.
- **Footer ISO 9001/14001/22000 tags removed** per feedback — the footer
  now ends with just the legal/registration line.

## Accessibility

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `footer`), one `<h1>`
  per page, logical heading order
- Skip-to-content link on every page
- Visible focus states (`:focus-visible`) on all interactive elements,
  3px outline meeting WCAG 2.4.7
- All images carry descriptive `alt` text; decorative icons are `aria-hidden`
- Accordion (FAQs) and mega-menus use `aria-expanded`/`aria-controls`;
  mobile nav and lightbox are keyboard-operable
- Form fields have associated `<label>`s; forms validate via native HTML5
  `required`/`type` attributes
- Respects `prefers-reduced-motion` — scroll-reveal and smooth-scroll
  animations disable themselves automatically
- Worth a final automated contrast audit (e.g. axe DevTools) once real
  content stabilises, particularly the orange-on-white CTA button

## SEO

- Unique, keyword-relevant `<title>` and meta description on all 25 pages
- Open Graph + Twitter Card tags on every page
- Real JSON-LD throughout: `Organization`/`WebSite` on the homepage,
  `Product` + `FAQPage` + `BreadcrumbList` on every product page,
  `Service` + `BreadcrumbList` on every service page, `BreadcrumbList`
  on every industry/company/news/FAQ page, `AboutPage` on the About
  page — this directly fixes the "no Product schema anywhere" finding
  from the site audit
- One `<h1>` per page, ordered H2/H3 hierarchy throughout
- Dense internal linking: products ↔ industries ↔ related products ↔
  FAQs ↔ news

## What this fixes from the site audit

- Homepage leads with one clear value proposition and a single H1, not a
  4-slide carousel with no coherent message
- Real ISO/certification proof (JSON-LD structured data, not just
  text-only claims) with a dedicated Quality & Certifications page
- A genuine, attributed testimonial instead of no social proof at all
- FAQ content, spec tables, and galleries on every product page — none
  existed on the live site
- Clean URL structure and Product schema, addressing the duplicate-URL
  and missing-schema findings
- The old "Global Reach" table (which dominated every page) is now a
  compact, linked strip on every page, with full regional detail moved to
  its own Contact page, grouped by region instead of one long table
- Industry-led navigation (Chemical, Food & Beverage, Logistics,
  Agriculture, Pharmaceutical) added alongside product-led navigation —
  the audit's top structural recommendation
- A genuine FAQ page and per-product FAQ sections, previously absent
  sitewide

## Next steps

1. **Review all 25 pages** and flag anything that reads wrong before this
   goes further — copy, imagery choices, or structure.
2. **Decide on a real backend** for the contact/enquiry forms — currently
   client-side only with no submission destination.
3. When ready to go live: swap embedded base64 fonts for linked files,
   add a caching/CDN layer, and set up server-side URL rewrites for clean
   URLs — all flagged inline above and in code comments.
