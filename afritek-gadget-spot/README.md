# Afritek Gadget Spot storefront

This is the existing React storefront, repaired in place. React, React Router, Create React App and the original branding/page layouts remain. The phone catalogue and guest checkout use the existing Afritek NestJS API; the browser never connects directly to the database or R2.

## Run locally

Use Node 24. From this application directory:

```sh
npm ci --include=dev
cp .env.example .env.local
npm start
```

The example starts the storefront on port 3001. For a local API, set `REACT_APP_API_URL=http://localhost:3000/api/v1` and add the exact storefront origin to the backend `STOREFRONT_ORIGINS`. `localhost` and `127.0.0.1` are different origins. React environment variables are public; never include secrets.

## Verify

```sh
CI=true npm test -- --watchAll=false --runInBand
npx playwright install chromium
npm run test:e2e
```

Browser tests use fictional intercepted API responses on desktop and mobile. They do not create remote orders. The backend repository separately tests real database checkout, origin isolation, photo access, price validation and retry idempotency.

## Vercel deployment

Keep the existing project; set its Root Directory to `afritek-gadget-spot`, install command `npm ci --include=dev`, build command `npm run build`, and output directory `build`. The included `vercel.json` serves known SPA paths on refresh while leaving missing file requests as 404s. Unknown SPA paths render a Page not found screen.

Set `REACT_APP_API_URL=https://afritek-admin-testing.onrender.com/api/v1` (also the default). Deploy the backend integration before the storefront branch: it adds `GET /shop`, filters, storefront CORS and public photo embedding. The backend defaults to allowing `https://afritek-gadget-spot.vercel.app`. Additional preview/custom domains must be explicitly included in backend `STOREFRONT_ORIGINS`; never allow all Vercel previews. A build does not itself update the current Vercel deployment.

Publish reviewed phone models, variants and photos in the admin and fill in shop contact settings. Embedded demonstration products and testimonials are no longer displayed or imported automatically. Existing product assets and unused legacy components remain available in git for owner review.

## Ordering and storage

- One product page offers exact storage/RAM/colour variants. Unavailable configurations cannot be ordered.
- Cart quantities are 1–10 per variant, with up to 20 variants; prices use integer KES minor units.
- Cart IDs from the old hardcoded catalogue cannot map safely to backend variants. New API carts use a separate local-storage version.
- Checkout needs name, Kenyan mobile, area, address/landmark and optional instructions. Email/postal code are not required.
- Session storage holds the exact pending request before submission, including its UUID. On an uncertain result, retry the same request; do not clear browser storage and place it again. If the problem persists, contact the shop.
- Only a server receipt clears the cart and opens the received screen. This means receipt of a NEW order, not payment or shop confirmation. The delivery fee/final total remain unagreed.
- Cart price refresh shows changed prices/unavailable items and requires explicit acceptance. The server always revalidates prices at submission.
- Contact opens a WhatsApp draft for the customer to send. It does not claim message delivery.

## Hosting performance

The static page and bundled CSS load independently of Render. API data, product photos and checkout still depend on the backend. Render Free sleeps after 15 idle minutes and can take about a minute to wake up: https://render.com/docs/free . The UI waits up to two minutes and offers explicit retry without silently creating new order requests. Paid always-on compute removes idle spin-up, but does not eliminate network/database latency. No paid plan has been provisioned.

See `../docs/implementation-status.md` for the review findings and remaining launch checks.

For the repository's existing Netlify integrations, root `netlify.toml` explicitly selects the application and publishes only its `build` output. It includes the routed SPA paths. A Netlify preview's exact origin must be added to the backend allowlist before API testing; a successful static deployment alone does not establish working checkout.
