export const CART_KEY = 'afritek.cart.v2';
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function readCart() {
  try {
    const items = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    if (!Array.isArray(items)) return [];
    const seen = new Set();
    return items.filter(item => {
      if (!item || !uuid.test(item.id) || seen.has(item.id) || typeof item.slug !== 'string' || typeof item.name !== 'string' || !Number.isSafeInteger(item.priceMinor) || item.priceMinor < 1 || item.priceMinor > 2000000000 || !Number.isSafeInteger(item.quantity) || item.quantity < 1 || item.quantity > 10) return false;
      seen.add(item.id); return true;
    }).slice(0, 20).map(item => ({ ...item, price: item.priceMinor / 100 }));
  } catch { return []; }
}
