import { readCart, CART_KEY } from './lib/cart';
import { normalizePhone, receiptValid } from './lib/checkout';
import { api, ApiError } from './lib/api';
beforeEach(() => { localStorage.clear(); });
test.each(['bad json', '{}', '[null,{"id":1,"quantity":-1}]'])('invalid saved cart is harmless: %s', saved => {
  localStorage.setItem(CART_KEY, saved);
  expect(readCart()).toEqual([]);
});
test('saved carts cannot supply fractional quantities, duplicate variants or a conflicting display price', () => {
  const item = { id: 'a0000000-0000-4000-8000-000000000001', slug: 'phone', name: 'Phone', priceMinor: 1200050, price: 1, quantity: 2 };
  localStorage.setItem(CART_KEY, JSON.stringify([item, item, { ...item, id: 'a0000000-0000-4000-8000-000000000002', quantity: 1.5 }]));
  expect(readCart()).toEqual([{ ...item, price: 12000.5 }]);
});
test('checkout accepts Kenyan local mobile formats and never mistakes an old WhatsApp order for a receipt', () => {
  expect(normalizePhone('0712 345 678')).toBe('+254712345678');
  expect(normalizePhone('254112345678')).toBe('+254112345678');
  expect(receiptValid({ orderId: 'ORD-1', total: 100 })).toBe(false);
  expect(receiptValid({ reference: 'AGS-1', subtotalMinor: 100, totalMinor: null, deliveryFeeMinor: null })).toBe(true);
});
test('failed order requests are not retried automatically and omit cookies', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('offline'));
  await expect(api('/orders', { method: 'POST', body: '{}' })).rejects.toBeInstanceOf(ApiError);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch.mock.calls[0][1].credentials).toBe('omit');
});
