# Storefront design direction

## First iteration — 15 September 2026

Build on the existing React storefront and retain Afritek Gadget Spot. The owner requested that we start the UI/UX work after reviewing the live storefront. This first iteration is for review in a PR; the owner merges.

Use warm off-white surfaces, deep teal for primary actions, and a small amount of pale lime for emphasis. Keep one visual hierarchy across the homepage, shared navigation/footer, product cards and catalogue page. System fonts avoid another network request.

### Shopping experience

- Persistent search on desktop and mobile. One cart link with a quantity count; mobile navigation supports Escape and returns focus to its button.
- Shorter home introduction with one primary shopping action. The spotlight selects an available published phone from the same response used for the eight home product cards; its price and link come from the API. No fake discount or bestseller claim. Empty/loading/error states retain the search and shopping navigation.
- Four product columns on desktop and two on smaller screens. Cards expose storage, colour, availability and the relevant starting price. Selecting a card opens the existing variant-selection page.
- Budget and brand shortcuts use the existing shop query parameters. Brand shortcuts are a curated list, not a claim that every brand is always stocked; empty results remain supported.
- Whole-shilling amounts omit unnecessary `.00`; fractional amounts retain up to two decimals. Integer minor-unit pricing and checkout validation remain unchanged.
- Small delivery/payment information strip: cash on delivery, delivery fee agreed before confirmation, and access to shop contact. No invented dispatch, warranty or refund promises.
- Matching light shop page and concise shared footer. Existing order submission and cart rules remain intact.

### Next design iterations

1. Product detail: storage buttons, labelled colours, clearer photo gallery, mobile purchase action and confirmed model-specific information.
2. Catalogue discovery: selectable brands, active filter chips and stronger filter hierarchy.
3. Cart, checkout and receipt: consistent surfaces and order summary placement while preserving explicit price-change acceptance and uncertain-order retry handling.
4. Contact/about: verified shop details, real branch photos and approved delivery/warranty information.

### Review and verification

Use the production build for local previews. Automated browser scenarios use intercepted fictional API data and do not submit remote orders. Visual previews additionally use a saved copy of the temporary catalogue and its images; those photos and screenshots are local ignored artifacts, not application assets.

Preview deployments need their exact origin in the backend allowlist to fetch live products. A GitHub PR does not itself change that allowlist. The existing production storefront remains unchanged until the owner merges and deployment completes.
