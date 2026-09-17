# Existing storefront repair

The owner selected repairs to the existing React application. The application root is `afritek-gadget-spot/`. Keep the existing branding and reusable page layouts. As of 15 September 2026, push iterations as branches to the original repository and create PRs; the owner merges them.

## Implemented

- Cart checkout navigation, persistence, functional updates, quantity limits (1–10 per configuration, 20 configurations), and invalid-storage recovery.
- Public API catalogue, paginated search, brand/price/availability filters, and product detail routes. Black/white and storage/RAM combinations remain distinct selectable variants under one model.
- API images, variant photo selection, and a non-looping fallback for missing/broken photos.
- Home catalogue uses published backend products. Removed active hardcoded product prices, testimonial/statistic claims, pretend discounts, accessories/tablet categories and unapproved delivery guarantees.
- Checkout creates a guest order before showing its server receipt. Kenyan mobile normalization, cash on delivery, unagreed delivery fees, and no required email/postal code.
- Persisted pending request ID and exact payload protect retries after an uncertain response/reload. Cart clears only after a valid receipt. Confirmation refresh and legacy payment URLs are handled.
- Explicit review/acceptance of price changes and unavailable cart items. Backend revalidates prices and availability at order creation.
- Contact details come from public shop settings. Fixed the malformed phone link; WhatsApp opens a draft without claiming message delivery or clearing the form.
- Shared footer, unknown-route screen, accessible labels/focus, reduced-motion support, and mobile layouts.
- Locally compiled Tailwind CSS instead of runtime CDN styling. Compatible dependency security updates, Vercel SPA rewrites, CI and deployment instructions.

## Verification

- Six unit tests cover saved cart validation, Kenyan mobile formats, receipt recognition and non-automatic POST retries.
- Desktop/mobile browser scenarios cover all routes and overflow, product options, cart reload, checkout receipt, interrupted submission/reload/retry, price conflict/acceptance, filters/reset, connection retry, contact drafts and quantity/unavailability limits.
- Production build succeeds without ESLint warnings. JS bundle is approximately 78 KB gzipped; CSS approximately 8 KB.
- Mobile home/product screenshots reviewed using fictional catalogue fixtures.
- Companion backend: 66 API tests and 14 admin browser tests passed. Public CORS never allows credentials; storefront origins cannot perform admin writes. Public photos still require published products/active variants.
- Browser tests intercept fictional API responses; backend tests use isolated PostgreSQL databases. No remote orders or catalogue changes were made for verification.

## Remaining launch/deployment checks

1. Merge and deploy the companion backend PR first; then merge/deploy this storefront PR using the existing Vercel project and application root. No branch has been merged automatically.
2. Fill shop contact settings, publish reviewed phones/variants/photos, and test the deployed storefront against the deployed backend. Old demonstration catalogue data is not imported automatically, and numeric legacy cart IDs cannot map safely to API UUID variants.
3. Register any exact custom/preview origin in backend `STOREFRONT_ORIGINS`. The existing Vercel production origin is allowed by default. Never allow wildcard previews.
4. Decide on always-on hosting before launch. Render Free may take about a minute to wake after 15 idle minutes; static page assets can load independently, but products/photos/checkout still wait on the API.
5. The legacy Create React App build/test dependency tree still reports development-tool advisories after compatible fixes (29 at the 11 September audit; none critical). Runtime-only audit reported zero advisories. These are not proof that build tooling is risk-free. A separate build-tool upgrade is still needed; the existing React source can be retained. Do not run an exposed development server or force npm's proposed `react-scripts@0.0.0` replacement.

Unused legacy components/assets remain in the repository for review but are not routed/rendered by the repaired application. Business terms, browser support beyond tested Chromium desktop/mobile, actual provider account configuration and production load testing remain owner launch checks.

## Existing Netlify preview integrations

PR checks revealed two existing Netlify integrations. One reported a failed deployment without a public error summary; another published both `build/index.html` and `public/index.html`, indicating an overly broad publish directory. Added root `netlify.toml` specifying the existing application base, production build output and SPA routes. This config correction is reviewable in the PR; account-specific failures still require the deployment log. Netlify origins also require explicit backend allowlisting before API testing.

## Storefront design iteration 1 — 15 September 2026

- Added a shared light visual direction, persistent search, one responsive cart link, and keyboard-accessible mobile menu.
- Reworked the homepage around an API-backed spotlight, eight product cards, budget/brand links and concise COD/delivery information.
- Updated reusable product cards and catalogue surfaces; kept the existing React application and shopping flows.
- Whole-shilling price display omits `.00`, preserving fractional prices and all minor-unit calculations.
- See `docs/storefront-design.md` for the review scope and next product-detail/checkout iterations.
- Verification: six unit tests, production build, and 18 desktop/mobile browser scenarios. Visual checks with saved test-catalogue images at 1440, 768, 390 and 320 pixels found no horizontal overflow on home/shop.
- No remote orders, settings or catalogue mutations were performed for this design iteration. Temporary test data and screenshots remain outside Git. Owner review/merge and exact preview-origin configuration remain deployment steps.

## Storefront discovery and information pages — 16 September 2026

- Shop: selectable brands, draft/apply filters, decimal budget validation, removable applied chips, reset pagination and consistent empty-state action.
- Contact: matching light design, configured contact links and directions, clearer WhatsApp draft flow, disabled action without phone details, expandable delivery/payment questions.
- Our Story: concise confirmed business information and three-step ordering explanation; shared design replaces decorative gradients and generic claims.
- Added desktop/mobile regression coverage for invalid budgets, fractional API prices, applied-chip/history synchronization and missing shop contact data.
- Remaining product-detail, cart/checkout, server-side sorting/facets and owner-provided business content are tracked in docs/storefront-design.md.
- Verification: six unit tests, production build and all 22 desktop/mobile browser scenarios passed. Local visual review at 1440, 768, 390 and 320 pixels found no horizontal overflow on shop/contact/about. Reviewed desktop/mobile screenshots are included for the PR; no remote orders or settings were changed.

- PR #7 follow-up: restored the embedded map using the configured shop address and highlighted walk-in customers. No location fallback is used when the address is missing.

- Correction: restored the original storefront’s documented Bazaar branch address and exact coordinates (-1.2819548, 36.8216073) as defaults when backend address settings are empty. An explicit admin address overrides these defaults. Earlier statements about omitting the map for empty settings are superseded.

## Search, pagination and WhatsApp polish — 16 September 2026

- Moved the header search focus indicator outside the search box so it cannot overlap the first character; keyboard focus remains visible.
- Catalogue requests retain the previous cards/count/page controls while updating. A reserved status line announces updates and pagination buttons are disabled until the response arrives, preventing the loading-time page collapse that shifted the filter area.
- WhatsApp inquiry now requires only the message. Removed name/email/subject inputs; blank messages are blocked and the exact message is preserved after opening the draft.
- Regression coverage includes delayed page navigation, filter draft persistence, stable panel dimensions and message-only WhatsApp URLs.
- Verification: production build, six unit tests and all 24 desktop/mobile Playwright scenarios passed. Fresh screenshot capture was blocked by the automatic approval review service reporting capacity failure when starting the preview server.

## Walk-in buying — 16 September 2026

- Added a primary Visit our shop action, Bazaar location messaging across home/catalogue/product/cart/checkout/navigation/footer, and separate walk-in/delivery explanations in Our Story.
- Retained Bazaar address/pin; added confirmed 7 am–7 pm Nairobi hours without inventing opening days. Product inquiries prefill the message with the chosen configuration. Location links scroll to the map after asynchronous shop details load.
- Fixed checkout/receipt contrast while preserving delivery order creation and retries. Real branch photos and confirmed opening days remain content follow-ups.
- Verification: build, six unit tests and all 26 desktop/mobile browser scenarios passed, including walk-in navigation and configuration-specific inquiry text.
- Visual review at 1440, 768, 390 and 320px found no home/shop/contact overflow. PR previews use saved temporary catalogue data, blank contact settings and the real Bazaar map; the public live contact settings are not modified.

## UX audit — 17 September 2026

- Saved findings, acceptance checks, proposed batches and launch follow-ups in [the storefront UX backlog](storefront-ux-backlog.md). Batches A and B subsequently selected; see implementation below.
- Re-ran production build, six unit tests and 26 desktop/mobile browser scenarios successfully; exploratory checks identified additional navigation, enquiry and checkout UX gaps. No live orders submitted or application changes made during the audit.

## Browsing, enquiries and checkout continuity — 17 September 2026

- Implemented UX-01 through UX-05 from the [UX backlog](storefront-ux-backlog.md): catalogue return context, pagination result focus, direct enquiry focus, tab-scoped checkout drafts and review-before-submit layout.
- Pending orders still retry their exact saved request. A valid receipt clears the checkout draft; no backend schema or endpoint changes.
- Owner merge pending. Other backlog suggestions remain open.
- Verification: production build, six unit tests and all 28 desktop/mobile Playwright scenarios passed. Reviewed checkout/enquiry previews at 390 and 1440px with no horizontal overflow; screenshots use fictional local data and no live order submissions.
