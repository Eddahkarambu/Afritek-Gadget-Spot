# Storefront UX backlog

Audit date: 17 September 2026. Reviewed existing storefront and the deployed walk-in changes from PR #9. This is a discussion backlog, not approval to implement every suggestion. The owner selected batches A and B (UX-01 through UX-05).

## Evidence and scope

- Production build, six unit tests and 26 Chromium desktop/mobile browser scenarios passed.
- Live browsing, product details, adding to cart, contact details and rendered map checked. No live orders submitted.
- Mocked checkout covered success, interrupted responses/retries, price conflicts, unavailable items and cart persistence. Additional exploratory checks reproduced the issues below.
- Checked responsive layouts at 320, 390, 768 and 1440px without observed horizontal overflow in the checked views. Physical-device Safari, full accessibility conformance and production performance/load testing remain unverified.
- Initial live requests showed delays; later catalogue loads succeeded. Cause and typical latency were not established.

## Confirmed journey issues

UX-01 through UX-05 are implemented on this PR branch and awaiting owner merge. Other items remain open.

| ID | Priority | Finding | Acceptance check |
| --- | --- | --- | --- |
| UX-01 | High | Product “Back to phones” resets filters and page to `/shop`. | Return to the originating catalogue query/page and restore browsing position; direct product links still have a safe shop fallback. |
| UX-02 | High | Next/Previous keeps customers at the bottom of the catalogue after new results arrive. | After successful pagination, show and focus the results heading below the fixed header; keep loading layout stable. |
| UX-03 | High | Checkout fields disappear after navigating to the cart to resolve a price conflict. | Preserve the draft through cart review and return; keep uncertain-order payloads immutable and clear saved personal details at the appropriate completion point. |
| UX-04 | High | Mobile order summary and delivery-fee explanation appear after Place order. | Customers encounter items, subtotal and unagreed delivery fee before the final submit action on mobile and desktop. |
| UX-05 | High | Product enquiry prefills a message but lands at the top of Contact, above cards and the map. | Enquiry navigation reveals the prefilled message directly with appropriate focus, while Visit links still lead to the map. |

## Proposed improvement batches

### A — Browsing and enquiries (recommended first)

UX-01, UX-02 and UX-05. These support customers browsing phones before visiting the physical shop. Preserve existing filter/loading behaviour, map navigation and message-only WhatsApp flow.

### B — Checkout continuity

UX-03 and UX-04. Verify conflict recovery, reload/retry behaviour and prevention of duplicate orders using mocked submissions.

### C — Walk-in clarity

- UX-06: Replace “our Bazaar shop” with wording that distinguishes Afritek Gadget Spot from The Bazaar building. Preserve the confirmed map pin.
- UX-07: State Cash and M-Pesa for in-store purchases; online orders remain cash on delivery.
- UX-08: Shorten repeated visit banners in cart/checkout so the main task stays easy to reach.

## Further design opportunities

| ID | Area | Proposal / dependency |
| --- | --- | --- |
| UX-09 | Product detail | Clearer storage/RAM and colour selection, selected-photo styling and image enlargement. Respect actual variant combinations and availability. |
| UX-10 | Catalogue | Server-side price sorting and catalogue-derived brand choices. Requires API support; never sort only the current page as if it were the whole catalogue. |
| UX-11 | Mobile filters | Collapse after successful application and bring results into view, preserving validation feedback. |
| UX-12 | Cart | Make checkout the strongest action, reduce competing gradients and standardise currency presentation. |
| UX-13 | Our Story / visits | Add owner-provided shop/frontage photos and directions within the building. Avoid invented business history. |
| UX-14 | Receipt | Copy-reference action and order-specific enquiry; retain clear awaiting-confirmation wording. |
| UX-15 | Accessibility / page context | Manage keyboard focus after route changes and provide descriptive route/product page titles. Conduct broader accessibility testing. |

## Content and launch follow-ups

- Verify public phone/email settings. Audit saw `+254712345678` and `info@afritek.co.ke`; ownership/reachability was not verified.
- Replace/remove intentionally temporary catalogue products before taking real customer orders; test listings are not confirmed Afritek offers.
- Confirm opening days and holiday exceptions. Confirmed hours: 7 am–7 pm Nairobi time; do not infer daily opening.
- Obtain approved warranty/return terms and privacy information.
- Measure cold-start and mobile-network behaviour separately before deciding performance work.

## Confirmed shop facts

Afritek Gadget Spot is the shop. The Bazaar is the building: Wing 5, Mezzanine floor, Moi Avenue, Nairobi, Kenya. Original confirmed map coordinates: -1.2819548,36.8216073. Walk-ins are the main customer path and do not require an online order. No inventory management is in launch scope.

## Tracking

- 17 September: owner selected A and B. Implemented UX-01 through UX-05 on `fix/storefront-journey-continuity`; owner merge pending.
- Returning through “Back to phones” retains query/page and focuses the originating card after results load. Direct product visits fall back to `/shop`.
- Next/Previous reveals and focuses the results heading only after the matching response succeeds.
- Product enquiries reveal/focus the prefilled message after contact loading; map links retain their separate destination.
- Checkout drafts persist in tab-scoped session storage across cart review and reload, then clear on a valid receipt. Pending request handling remains separate and immutable. Draft persistence is best effort if storage is unavailable.
- Order summary and delivery terms precede submission on mobile and desktop.
- Batches C and further opportunities remain unselected.

