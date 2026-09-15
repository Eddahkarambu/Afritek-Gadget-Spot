export const API_BASE = (process.env.REACT_APP_API_URL || 'https://afritek-admin-testing.onrender.com/api/v1').replace(/\/$/, '');
export class ApiError extends Error {
  constructor(message, status = 0) { super(message); this.status = status; }
}
export async function api(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120000);
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options, credentials: 'omit', signal: controller.signal,
      headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) throw new ApiError(typeof data?.message === 'string' ? data.message : Array.isArray(data?.message) ? data.message.join(' ') : 'The shop could not complete this request. Please try again.', response.status);
    if (!data) throw new ApiError('The shop returned an unexpected response. Please try again.');
    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Connection interrupted. Please try again. The shop may take a minute to wake up.');
  } finally { clearTimeout(timer); }
}
export const money = minor => new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(minor / 100);
export const variantLabel = v => `${v.storageGb}GB${v.ramGb ? ` / ${v.ramGb}GB RAM` : ''} / ${v.colour}`;
export const imageUrl = image => image ? `${API_BASE}/images/${image.id}/content` : '';
export function cartItem(product, variant) {
  const image = product.images.find(i => i.variantId === variant.id) || product.images.find(i => !i.variantId) || product.images[0];
  return { id: variant.id, slug: product.slug, name: product.name, specs: variantLabel(variant), priceMinor: variant.priceMinor, price: variant.priceMinor / 100, image: imageUrl(image) };
}
