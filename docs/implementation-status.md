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
