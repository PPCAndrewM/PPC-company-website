# PPC Philton — 2026 website mock-up

A from-scratch redesign mock-up of ppcphilton.com, built to run entirely locally
with no build step and no server. This is **Phase 1** of a phased build — see 
[Status](#status--whats-built-vs-planned) below for exactly what's live today.

## How to run it

Double-click `index.html` (or right-click → Open with → your browser). That's it —
no `npm install`, no local server, no build step. Every page, stylesheet, script
and font is a plain file on disk; fonts are embedded as base64 so they render
correctly even under the `file://` protocol, which blocks ordinary font/CSS
network requests in some browsers.

Pages currently built and clickable:

- `index.html` — homepage
- `pages/product-flexitanks.html` — full product page template
- `pages/industry-chemical.html` — full industry page template

Every other link in the navigation (About, other four products, other four
industries, Manufacturing, Quality & Certifications, Sustainability, News,
FAQs, Resources, Contact) is wired into the real navigation structure but
**does not have a page yet** — clicking it will 404 in the browser. This is
intentional for Phase 1: the plan was to agree the design system and page
templates on a representative sample before generating the remaining ~15
pages against them. See [Next steps](#next-steps) below.

## Project structure

```
company-website/
├── index.html                          Homepage
├── pages/
│   ├── product-flexitanks.html         Full product page template
│   └── industry-chemical.html          Full industry page template
├── css/
│   ├── tokens.css                      Colour, type, spacing variables + embedded fonts
│   ├── base.css                        Reset, typography, layout primitives, utilities
│   └── components.css                  Header, nav, cards, forms, accordion, gallery, footer…
├── js/
│   ├── partials.js                     Injects the shared header/footer/icon-sprite (see below)
│   └── main.js                         Nav, scroll-reveal, accordion, lightbox, back-to-top, forms
├── assets/
│   ├── images/                         Processed, web-sized images (see Asset provenance)
│   ├── icons/sprite.svg                Human-readable source of the icon set
│   └── downloads/                      Brochure PDF(s)
├── Media/                              Your original supplied assets — untouched, kept as source
├── _process_images.py                  One-off script used to resize Media/ → assets/images/
└── README.md                           This file
```

## Design decisions

A few choices were made deliberately and are worth understanding before this
goes further — flagged here rather than buried in code comments.

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
The trade-off: header/nav/footer won't appear with JavaScript disabled, and
"View Source" won't show them. Given the real constraint (must run with no
server), this was judged the better trade-off — but if this becomes a real
site, switch to server-side includes, a static-site generator, or a
templating build step (11ty, Astro, or even plain PHP includes) instead.

**Same reasoning applies to the icon sprite** — `assets/icons/sprite.svg` is
kept as a human-readable source of the icon designs, but the actual icons
render from a copy of the same markup inlined by `partials.js`, because
`<use href="external.svg#id">` is also blocked cross-file under `file://`
in Chrome. **If you add or change an icon, update both files** — this is
the one piece of manual duplication in the codebase and it's called out
in comments in both places.

**No dark mode.** This is a B2B product-marketing site, not an application —
neither of the two inspiration sites (labaronne-citaf.com, trustflexitanks.com)
nor any category leader researched for the audit ships a dark theme. Adding
one would be effort spent on a feature with no evidence of buyer demand in
this category.

**Clean URLs.** Genuinely clean URLs (no `.html`) require server-side
rewrite rules, which don't exist when opening files directly. Every internal
link uses `.html` for that reason. Once deployed to a real server, adding
rewrite rules (or exporting through a static-site generator) will give you
clean URLs without changing any page content.

## Asset provenance

Real assets from your supplied `Media/` folder were used wherever suitable,
processed (resized + compressed for web) into `assets/images/`:

| Used for | Source |
|---|---|
| Logo (header/footer) | `Media/PPC Logo/PPC Philton Large Logo.png` |
| Favicon | `Media/PPC Logo/PPC logo.png` |
| Hero image | `Media/Flexitanks photographs/Flexitank-rail-testing.jpg` |
| ISO 9001 badge | `Media/SGS ISO9001 Logo/SGS ISO 9001 UKAS_TCL_HR.jpg` — genuine certificate, safe to use as-is |
| Manufacturing photos | `Media/About us photographs/*` (production line, testing platform, 1974 facility photo) |
| Product category cards + flexitank gallery | `Media/Product CGIs/*`, `Media/Flexitanks photographs/*` |
| Chemical industry photo | `Media/Emergency response photographs/crosspump-with-manufacturer-name-removed.png` |
| Flexitank brochure download | `Media/Brochures/Brochure FLEXITANKS 12 07 23.pdf` |
| Testimonial | `Media/reference letters/Reference-MUTO.pdf` — real, signed reference letter, quoted with attribution per your confirmation |

**Not yet used:** the "Bladder tanks and agriculture" CGI set (product page
not yet built — Phase 2), the CN/ES brochure variants, and the Lavina Wines
reference letter (`.doc` format — I can't read binary Word docs with my
current tools; if you paste or convert its text I can add it as the second
testimonial, currently a clearly-labelled placeholder on the homepage).

No invented company facts, certifications or client claims appear anywhere —
every stat on these three pages traces back to either the audit's source
material (live site content, ISO history) or a genuine document in `Media/`.

## Accessibility

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `footer`), one `<h1>`
  per page, logical heading order
- Skip-to-content link on every page
- Visible focus states (`:focus-visible`) on all interactive elements,
  3px outline meeting WCAG 2.4.7
- All images carry descriptive `alt` text; decorative icons are
  `aria-hidden`
- Accordion (FAQs) and mega-menus use `aria-expanded`/`aria-controls`;
  mobile nav and lightbox are keyboard-operable and trap focus sensibly
- Form fields have associated `<label>`s; the demo form validates via
  native HTML5 `required`/`type` attributes
- Respects `prefers-reduced-motion` — scroll-reveal and smooth-scroll
  animations disable themselves automatically
- Brand blue/orange/ink values were chosen for contrast against both white
  and the dark navy sections — worth a final automated contrast audit
  (e.g. axe DevTools) once real content stabilises, particularly the
  orange-on-white CTA button

## SEO

- Unique, keyword-relevant `<title>` and meta description per page
- Open Graph + Twitter Card tags on every page
- Real JSON-LD: `Organization`/`WebSite` on the homepage, `Product` +
  `FAQPage` + `BreadcrumbList` on the flexitank product page — this
  directly fixes the "no Product schema anywhere" finding from the site
  audit. Extend this pattern to every product/page in Phase 2.
- One `<h1>` per page (fixes the audit's 4-H1-homepage finding), ordered
  H2/H3 hierarchy throughout
- Internal linking between products ↔ industries ↔ related products

## What this fixes from the site audit

Direct references to findings in the earlier audit report:

- Homepage now leads with one clear value proposition and a single H1,
  not a 4-slide carousel with no coherent message
- Real ISO/certification proof (badge image + JSON-LD) instead of
  text-only claims
- A genuine, attributed testimonial instead of no social proof at all
- FAQ content, a spec table, and a gallery on the product page — none
  existed on the live site
- Clean, single canonical URL structure and Product schema, addressing
  the duplicate-URL and missing-schema findings
- The old "Global Reach" table (which dominated every page) is now a
  compact, linked strip — full detail belongs on its own Contact page
  (Phase 2)

## Next steps

Before generating the remaining ~15 pages, please sign off on:

1. **This design system and these three pages** — colours, type, spacing,
   component patterns (cards, nav, buttons, accordion, gallery) will be
   reused as-is across every remaining page.
2. **The information architecture** in the nav (Products / Industries /
   Company / Resources / Contact) — every remaining page is already
   linked from the header and footer using this structure.
3. **The Lavina Wines testimonial** — send the letter text (or confirm
   using MUTO alone is fine) so it can be added properly.

Once confirmed, Phase 2 builds out: About, Manufacturing, Quality &
Certifications, Sustainability, the remaining four product pages, the
remaining four industry pages, Resources, FAQs, News/Knowledge Centre and
Contact — all against the templates approved here.
