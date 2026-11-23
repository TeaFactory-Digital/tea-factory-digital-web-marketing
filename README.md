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
Its figure band shows facts about the platform itself (languages, queues) until
`src/lib/impact.ts` holds reported figures with the month they were true for;
fill that file and the band switches to them on its own. Leave it empty rather
than estimate.

The "What changes for the factory" section (`BenefitsSection`) follows the same rule:
today beside the same task with the platform, each row something the products really do
(queues with response targets, the bill explained, change requests held for approval,
the factory system left in place), and no time-saved or percentage claims. Its subtitle
says results will be published once a factory reports them.

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
    mockups/             PhoneFrame, DeviceShot, AppChrome, AppIcon, GreenLeafBill,
                         InquiryThread, TeaBreeze, ConsoleChrome, ConsoleDashboard,
                         ConsoleInquiry, ConsoleFactorySystem, ConsoleImport,
                         ConsoleSlipComparison, charts
    sections/            one file per page section, named after the brief
                         (home order: Hero, ActivityTicker, Problem, Benefits,
                         Walkthrough, AppConsoleSplit, ... Proof, Faq, FinalCTA)
    Navbar Footer Logo PlantationScene
  i18n/
    config.ts            the three locales
    dictionaries/        en.ts is the source of truth; si.ts and ta.ts are typed against it
  lib/
    sample-data.ts       every figure any mockup renders
    routes.ts            href(locale, path): the only way internal links are built
    site.ts              site URL, WhatsApp number and `whatsappLink(text)`
    photos.ts            whether the photographs are present (build time)
    utils.ts
scripts/
  images.mjs             `npm run images`: the WebP copies of the photographs
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
- **One font stack serves all three scripts.** `--font-sans` and `--font-display`
  list the Latin face first, then Noto Sans Sinhala and Noto Sans Tamil, so a
  Sinhala heading renders in Noto at the intended weight instead of whatever the
  OS falls back to, and Latin numerals look the same in every locale. Do not set
  `fontFamily` per locale or per element.
- **All three script fonts load on every page.** The trilingual section renders
  Sinhala, English and Tamil side by side whatever locale you are on, from the
  real dictionaries rather than a mockup of them.
- **Sinhala and Tamil get their own type treatment** via `:lang()` rules in
  `globals.css`: more line height, a smaller display scale, no uppercasing of
  eyebrows (neither script has a case), and smaller navbar labels. The navbar
  is the one row where word length decides whether the layout fits. The rules
  match any element's `lang`, not only `<html>`'s, and they retune
  `leading-relaxed` and `leading-snug` too, so those utilities are safe on
  Sinhala and Tamil copy.

## Mockups: they are the product, not an impression of it

The phone screens and the console are **real markup reproduced from the two
product repos**: React components drawn at the product's true size, not screenshot
images and not a marketing interpretation. If you
change either product, change these too; a mockup that has drifted is worse
than no mockup, because a factory recognises its own console.

**Where each part comes from**

| On this site | Source of truth |
| --- | --- |
| `mockups/GreenLeafBill.tsx` | `tea-factory-digital-mobile-frontend` → `src/screens/home/HomeScreen.tsx` and `src/components/bill/*`. The `monthToDate` prop draws "This month so far" (`MonthToDateCard.tsx`) above the bill, as the app does with `enableMonthToDate` on; the home Hero, the Green Leaf Account section and block 02 of the App page pass it |
| `mockups/TeaBreeze.tsx` | mobile → `src/components/bill/TeaBreeze.tsx`, `TeaLandscape.tsx` |
| `mockups/AppChrome.tsx`, `AppIcon.tsx` | mobile → `src/navigation/AppHeader.tsx`, `AppTabs.ios.tsx`, `src/components/icons/Icon.tsx`, `components/ui/Avatar.tsx` |
| `mockups/InquiryThread.tsx` | mobile → `src/screens/inquiry/InquiryThreadScreen.tsx` |
| `mockups/ConsoleChrome.tsx` | `tea-factory-digital-admin-frontend` → `apps/admin/src/layout/{AppShell,Sidebar,Topbar,NotificationBell,UserMenu}.tsx` and `navigation.ts`, `components/ui/{Card,PageHeader}.tsx`, `public/brand/logo.svg`. The sidebar is drawn per role from `DEFAULT_ROLE_MATRIX` (`packages/domain/src/rbac.ts`); the *Factory records* section shows only with the sync off, and the factory admin sees it too, with read-only access |
| `mockups/ConsoleDashboard.tsx` | admin → `apps/admin/src/modules/dashboard/DashboardScreen.tsx` |
| `mockups/ConsoleFactorySystem.tsx` | admin → `apps/admin/src/modules/configuration/ConfigurationScreen.tsx`, `FactorySystemSection.tsx`, `SectionFooter.tsx` |
| `mockups/ConsoleImport.tsx` | admin → `apps/admin/src/components/ImportDialog.tsx`, `components/ui/Dialog.tsx`, `modules/deliveries/DeliveriesScreen.tsx` |
| `mockups/ConsoleSlipComparison.tsx` | admin → `apps/admin/src/modules/bills/SlipComparisonCard.tsx` on `modules/months/MonthCloseScreen.tsx`; block 07 of the Console page |
| `mockups/ConsoleInquiry.tsx` | admin → `apps/admin/src/modules/inquiries/InquiryDetailScreen.tsx`, `ReplyDialog.tsx`, `InquiryOfficeCards.tsx` |
| The `thread` block and `console.inquiry` | the mobile `inquiry.*` strings and the console's `inquiries.*` strings |
| `--color-app-*` in `globals.css` | `packages/brand/src/colors.ts`, overridden by the `default` (Galaboda) client: primary `#2E8B57`, muted `#DCEEE2` |
| The `bill` block in each dictionary | the mobile string table, `src/config/clients/default/strings.ts` |
| The `console` block in each dictionary | the console's own locales, `apps/admin/src/i18n/locales/*.ts` |
| The white-label palettes | Galaboda's is the mobile `default` client's; the other two are samples, labelled as such |

**True-size rendering.** The mockups are written at the size the real product
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
gross is the total times the total rate plus last month's coins brought forward
(as the app's Earnings block adds them), the deductions subtract to the balance,
and the coins carried forward are the fraction the slip rounds off (the sample pays
whole rupees; a factory may pay in fives or tens). Keep it that
way. A factory accountant reads a mockup like an account. The same goes for the
console: the queue ages sit inside or past the console's real response targets,
and the inquiry on the phone is the same conversation, 27 h old, that the
console shows and the dashboard counts as its oldest.

**Last matched to the products on 24 November 2026**, against fresh screenshots of both:
the Account tab's newer cards (when the figures were fetched, the change against June with
why it changed, "Your bill, explained" closed, the last six months, "Share or save PDF"),
"Your work today" on the dashboard, the redesigned inquiry screen (who and how in the header,
Pass to the manager and Close unanswered in the conversation's header, pills for the
suggestions, the supplier card holding when it came and who has it), the sidebar's adoption
meter with its count behind an "i", the factory administrator reading the credit queues,
"About this screen" on Configuration and "How to fix it" on the slip comparison. The June
figures in `sample-data.ts` are consistent with July (coins, `INCOME_SERIES`) and the
reasons follow the app's own `explainChange`.

## Demo form

The demo page leads with **WhatsApp** (+94 77 995 1056, `whatsappLink` in
`src/lib/site.ts`, the message already typed in the reader's language); the footer links
it too. The form below asks for three things only: name, factory and phone. Role, email,
size, interest and a message sit behind "Add more details", all optional; an email, when
given, must be a valid one. The server checks the same rules.

`POST /api/demo-request` validates the request and emails it to the company inbox
through [Resend](https://resend.com). When they gave an email, the email's Reply-To is
the person who asked, so replying answers them directly; otherwise the office calls the
phone number. Missing optional fields show as "-". The form says "thank you" only when the email
was sent; otherwise it keeps what they typed and shows the contact address. A
hidden field catches simple bots.

Settings (see `.env.example`; locally in `.env.local`, in production in the host):

| Setting | Value |
|---|---|
| `RESEND_API_KEY` | API key from resend.com. Without it the form reports a failure. |
| `DEMO_REQUEST_TO` | Receiving inbox, comma-separated for several. |
| `DEMO_REQUEST_FROM` | `onboarding@resend.dev` until the domain is verified in Resend. |

Until `teafactorydigital.lk` is verified in Resend, Resend sends only from
`onboarding@resend.dev` and only **to the email the Resend account was created
with**. After verifying the domain (DNS records in Resend → Domains), set
`DEMO_REQUEST_FROM` to an address on it and `DEMO_REQUEST_TO` to any inbox.

## Design

Deep forest green, a warm tea-leaf green, cream, charcoal, and a restrained
gold. Tokens are declared once in the `@theme` block in `globals.css`; nothing
uses a raw hex outside it except the three invented white-label brand palettes,
which are meant to be different.

**Type scale.** Use the classes in `globals.css` rather than one-off sizes:
`t-display` (hero), `t-h2` (section), `t-h3` (block), `t-h4` (card title),
`t-lead` (section and hero descriptions), `t-body` (card copy), `t-meta`
(captions, notes) and `t-eyebrow`. Every section uses `Section`, whose padding
(`py-24 md:py-32 lg:py-40`) is the site's rhythm.

**Contrast.** Secondary text is at least `text-char-500` on light surfaces and
`text-cream-100/70` on the forest ones, which is about 6:1 and 7:1. Suppliers
read this outdoors on a phone; do not go lighter. The mockups keep the products'
own colours (their secondary text is already above 5:1).

**Interaction.** Scannable cards take `hover-lift` (or `hover-lift-dark` on
forest), or `<Card interactive>`: one lift, one shadow, one border shift
everywhere. The solid buttons carry a `btn-sheen` gradient that slides on hover
and a two-tone focus ring sized for the surface the variant sits on.

Motion is Framer Motion and is deliberately restrained: section reveals, a
headline word rise, one marquee, a count-up on the KPIs, a slow drift on the
hero cards, and a crossfade between the Supplier App and Office Console tabs in
the platform section (one screen at a time, keyboard operable).
`prefers-reduced-motion` is honoured throughout.

The **walkthrough** (`Walkthrough` and `WalkthroughPlayer`, in place of a video) shows five
real mockups in the order a month uses them: leaf records imported, the bill on the phone,
a question in the app, the office answering, the dashboard. It moves on every 6.5 s while
on screen, stops while hovered or focused, stops on any step chosen, has a pause button
(WCAG 2.2.2) and never starts with reduced motion. The steps are a keyboard-operable tab
list. The **FAQ** (`FaqSection`) is plain `<details>` with FAQPage structured data; every
answer restates something another section or the products show.

The hero's entrance (`.hero-in`, `.hero-device`) and the headline word rise
(`RevealWords`, `.word-in`) are CSS animations, not Framer Motion: they start with the
first paint instead of after the JavaScript has run, which on a slow phone kept the
subtitle (the page's largest paint) hidden for seconds.

## Performance

Measured on 24 November 2026 against `next build && next start`, as a phone (390 px,
4x CPU slowdown, about 1.6 Mbps, 150 ms latency):

| Page | LCP before | LCP after |
|---|---|---|
| Home (en) | 7.6 s | 2.2 s |
| Home (si) | 8.1 s | 3.8 s |
| Console page | 6.1 s | 3.2 s |

What changed: the photographs are served as WebP at the size each slot needs (the hero's
1.7 MB JPEG is 308 KB on a desktop and 156 KB on a phone; the demo page's blurred copy is
27 KB; `npm run images` makes them, `image-set()` in `globals.css` picks them, the JPEGs
stay as the fallback); the hero entrance moved to CSS; the Tamil font is no longer
preloaded on every page (Sinhala keeps its preload, being the default, so Sinhala pages
do not shift when it swaps in). CLS stays under 0.1 everywhere. The hero photograph is
deliberately not preloaded: Chrome does not count a full-screen backdrop as the largest
paint, and a preload hint travels in the home page's prefetch, so every other page would
download it too.

Still heavy, and worth watching: the home page is about 9,400 elements (each mockup is
real markup, and the walkthrough alone holds five), about 260 KB of HTML over the wire.

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
- Replace the placeholder email in the footer contact block.
- Verify `teafactorydigital.lk` in Resend and point `DEMO_REQUEST_TO` at the company inbox.
- Photography: `public/images/plantation.jpg` and `tea-estate.jpg` are in place and
  picked up at build time (`src/lib/photos.ts`); remove either and the drawn
  `PlantationScene` backdrop shows instead. After replacing one, run `npm run images`
  so the WebP copies match.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```
