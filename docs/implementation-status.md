# Existing storefront repair

Keep the existing React application, branding and page components. The application root is `afritek-gadget-spot/`.

## Completed: cart reliability

- Proceed to Checkout now navigates to the existing checkout page.
- Cart additions, quantities and removals survive reloads through browser local storage.
- Functional state updates preserve multiple additions in one React update.
- Invalid stored data or unavailable browser storage do not crash shopping.
- Verified four regression tests and production build (three existing unused-variable warnings).

## Remaining issues identified in source

- Catalogue is embedded in frontend code; connect products, variants, prices and images to the existing Afritek public API.
- Checkout opens WhatsApp and shows confirmation after a timer without a server order. Replace with the guest order API and server receipt; keep WhatsApp as optional contact.
- Match checkout to cash on delivery and delivery fees agreed with the customer; remove mandatory email and postal code.
- Remove unsupported confirmation, invoice, tracking and payment claims.
- Verify mobile layout, navigation and deployment routes against the existing Vercel deployment.

This iteration does not make checkout operational or deploy changes to the existing Vercel site. Backend integration remains required before accepting real orders.
