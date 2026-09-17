export const PENDING_KEY = 'afritek.pending-order.v1';
export const RECEIPT_KEY = 'afritek.receipt.v1';
export function readSession(key) {
  try { return JSON.parse(sessionStorage.getItem(key) || 'null'); } catch { return null; }
}
export function receiptValid(value) {
  return value && typeof value.reference === 'string' && value.reference.length > 0 && Number.isSafeInteger(value.subtotalMinor) && value.subtotalMinor > 0 && value.deliveryFeeMinor === null && value.totalMinor === null;
}
export function pendingOrder() {
  const value = readSession(PENDING_KEY);
  return value && typeof value.requestId === 'string' && Array.isArray(value.items) && typeof value.customerName === 'string' ? value : null;
}
export function normalizePhone(value) {
  const compact = value.replace(/[\s()-]/g, '');
  if (/^0[17]\d{8}$/.test(compact)) return `+254${compact.slice(1)}`;
  if (/^254[17]\d{8}$/.test(compact)) return `+${compact}`;
  return compact;
}

export const DRAFT_KEY = 'afritek.checkout-draft.v1';
export function checkoutDraft() {
  const saved = readSession(DRAFT_KEY);
  return Object.fromEntries(Object.entries({ customerName: 120, phone: 30, area: 120, address: 500, instructions: 1000 }).map(([key, limit]) => [key, typeof saved?.[key] === 'string' ? saved[key].slice(0, limit) : '']));
}
export function saveCheckoutDraft(form) {
  const draft = Object.fromEntries(['customerName', 'phone', 'area', 'address', 'instructions'].map(key => [key, form[key] || '']));
  try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch { /* Editing still works without storage; submission checks storage separately. */ }
}
