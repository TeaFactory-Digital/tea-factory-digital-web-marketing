# Tea Factory Digital, marketing site

The public site for the Tea Factory Digital platform: a branded supplier mobile
app and the office console that answers it. Trilingual (Sinhala, English,
Tamil), statically generated, no CMS.

```bash
npm install
npm run dev      # http://localhost:3100/en
```

`/` redirects to the best locale from `Accept-Language`, defaulting to English.

---

## The one thing this site must get right

**Tea Factory Digital does not replace the factory's existing system.** It sits
beside it. The platform handles the supplier experience and the office workflows
that answer it; leaf collection, weighing, rate entry, month close, payout runs
and bank files stay in the factory's own software.

That boundary is the sale, not a caveat, and it is stated on the home page three
times: in the hero, in the integration diagram, and in the terms. Copy that
blurs it is a bug.

### Claims the site must never make

Nothing here may say the platform performs leaf collection, weighing, rate
entry, month close, payout processing or bank-file generation. Nor may it invent
customer names, factory names, supplier counts, adoption percentages,
testimonials, certifications or production-deployment claims. Every figure on
screen is sample data from `src/lib/sample-data.ts` and every surface that shows
one is labelled as such.

When a pilot factory can be named, `ProofSection` is the component to replace.

---

## What is here

```
src/
  app/
    [locale]/            home · /app · /console · /demo · /legal/privacy · /legal/terms
    api/demo-request/    validates and records a demo request (see below)
    globals.css          design tokens, script-aware typography, section helpers
    robots.ts sitemap.ts
  components/
    ui/                  button, field, card, section, motion helpers
    mockups/             PhoneFrame, GreenLeafBill, ConsoleDashboard, charts
    sections/            one file per page section, named after the brief
    Navbar Footer Logo PlantationScene
  i18n/
    config.ts            the three locales
    dictionaries/        en.ts is the source of truth; si.ts and ta.ts are typed against it
  lib/
    sample-data.ts       every figure any mockup renders
    routes.ts            href(locale, path): the only way internal links are built
    site.ts utils.ts
```

## i18n

`en.ts` is written `as const` and `Dictionary` widens its literals, so **adding a
key to English breaks the build until Sinhala and Tamil have it too**. That is
the point: a missing translation is a compile error, not a blank space on a
page.

Three things are worth knowing before editing copy:

- **The marketing site defaults to English; the product defaults to Sinhala.**
  Different audiences: factory management evaluate software in English, and
  suppliers read Sinhala. Both are deliberate.
- **All three script fonts load on every page.** The trilingual section renders
  Sinhala, English and Tamil side by side whatever locale you are on, from the
  real dictionaries rather than a mockup of them.
- **Sinhala and Tamil get their own type treatment** via `:lang()` rules in
  `globals.css`: more line height, a smaller display scale, no uppercasing of
  eyebrows (neither script has a case), and smaller navbar labels. The navbar
  is the one row where word length decides whether the layout fits.

## Mockups: they are the product, not an impression of it

The phone screens and the console are **real markup reproduced from the two
product repos**, not screenshots and not a marketing interpretation. If you
change either product, change these too; a mockup that has drifted is worse
than no mockup, because a factory recognises its own console.

**Where each part comes from**

| On this site | Source of truth |
| --- | --- |
| `mockups/GreenLeafBill.tsx` | `tea-factory-digital-mobile-frontend` → `src/screens/home/HomeScreen.tsx` and `src/components/bill/*` |
| `mockups/ConsoleDashboard.tsx` | `tea-factory-digital-admin-frontend` → `apps/admin/src/modules/dashboard/DashboardScreen.tsx`, `layout/Sidebar.tsx`, `layout/Topbar.tsx`, `layout/navigation.ts` |
| `--color-app-*` in `globals.css` | `packages/brand/src/colors.ts`, overridden by the `default` (Galaboda) client: primary `#2E8B57`, muted `#DCEEE2` |
| The `bill` block in each dictionary | the mobile string table, `src/config/clients/default/strings.ts` |
| The `console` block in each dictionary | the console's own locales, `apps/admin/src/i18n/locales/*.ts` |
| The three white-label palettes | `src/config/clients/{default,clientA,clientB}`: Galaboda, Hill Country Tea, Highland Estate |

**True-size rendering.** Both mockups are written at the size the real product
runs at (a 384px phone screen, a 1280px console) using the product's own
spacing, radius and type values as plain pixels. `DeviceShot` scales the whole
screen into whatever space it is given, so a console in a 700px column and the
same console at full width are the same screen at different zooms. **Never
re-tune a value to make a placement look right**: that is exactly how these
drifted the first time. Change the size only if the product changed.

**The console is a light product.** It runs on an office laptop and its
background is `#F2F5F4`. The section around it on this site is dark; the console
inside it is not, and darkening it to suit the page would be the mismatch.

**The figures are consistent.** The daily kilos sum to the month's total, the
total times the total rate is the gross, the deductions subtract to the balance,
and the coins carried forward are the fraction the slip rounds off. Keep it that
way. A factory accountant reads a mockup like an account.

## Demo form

`POST /api/demo-request` validates the payload and logs it. **It does not send
anything anywhere yet**. The destination (email, CRM, sheet) is the operator's
choice, and there is a single `TODO` in the route marking where it goes. The
shape, the validation and the error contract are already what a real destination
needs. Validation runs in the browser for the message and again on the server
because the browser's copy is a convenience.

## Design

Deep forest green, a warm tea-leaf green, cream, charcoal, and a restrained
gold. Tokens are declared once in the `@theme` block in `globals.css`; nothing
uses a raw hex outside it except the three invented white-label brand palettes,
which are meant to be different.

Motion is Framer Motion and is deliberately restrained: section reveals, a
headline word rise, one marquee, a count-up on the two KPIs, and a slow drift on
the hero cards. `prefers-reduced-motion` is honoured throughout.

## Pages

Live: home, `/app`, `/console`, `/demo`, `/legal/privacy`, `/legal/terms`.

The header and footer link to sections of the home page for Features,
White-Label, Integration and Security, so there are no dead links. When those
become their own pages, change the paths in `Navbar.tsx` and `Footer.tsx` and
add routes under `src/app/[locale]/`; the section components already stand alone
and take `{ locale, t }`.

## Before going live

- `NEXT_PUBLIC_SITE_URL`, used by `robots.txt`, the sitemap and metadata.
- Complete the legal pages. Both carry a visible placeholder note: company
  registration details, the data-protection contact and any factory-specific
  terms are still blank. The app stores will ask for the privacy URL.
- Replace the placeholder email and phone in the footer contact block.
- Point the demo form at a real destination.
- Optionally drop in photography. See `public/images/README.md`.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
