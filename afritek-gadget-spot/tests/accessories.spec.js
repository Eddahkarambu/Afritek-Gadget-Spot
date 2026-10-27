const { test, expect } = require('@playwright/test');
const { products, phone } = require('./fixtures/accessories.cjs');
async function catalogue(page, override = async () => false) {
  const items = structuredClone([...products, phone]);
  const urls = [], orders = [], errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.route('https://www.google.com/**', r => r.abort());
  await page.route('**/api/v1/**', async route => {
    const url = new URL(route.request().url()), path = url.pathname.replace('/api/v1', ''); urls.push(url);
    if (await override(route, items)) return;
    if (path === '/shop') return route.fulfill({ json: { phone: '+254712345678', email: 'shop@example.test', address: '' } });
    if (path.startsWith('/images/')) return route.fulfill({ contentType: 'image/svg+xml', body: '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect x="90" y="30" rx="25" width="120" height="240" fill="#285b50"/><rect x="140" y="45" width="20" height="8" fill="#dce9c9"/></svg>' });
    if (path === '/products') {
      const c = url.searchParams.get('category') || 'PHONE';
      let matches = items.filter(p => c === 'ALL' || c === 'ACCESSORIES' ? c === 'ALL' || p.category !== 'PHONE' : p.category === c);
      const search = (url.searchParams.get('search') || '').toLowerCase(), brand = (url.searchParams.get('brand') || '').toLowerCase();
      matches = matches.filter(p => `${p.name} ${p.brand}`.toLowerCase().includes(search) && (!brand || p.brand.toLowerCase() === brand));
      matches = matches.filter(p => p.variants.some(v => (url.searchParams.get('availability') !== 'available' || v.available) && (!url.searchParams.has('minPriceMinor') || v.priceMinor >= Number(url.searchParams.get('minPriceMinor'))) && (!url.searchParams.has('maxPriceMinor') || v.priceMinor <= Number(url.searchParams.get('maxPriceMinor')))));
      const pageNumber = Number(url.searchParams.get('page') || 1), size = Number(url.searchParams.get('pageSize') || 12);
      return route.fulfill({ json: { items: matches.slice((pageNumber - 1) * size, pageNumber * size), total: matches.length, pages: Math.ceil(matches.length / size), page: pageNumber } });
    }
    if (path.startsWith('/products/')) { const product = items.find(p => p.slug === path.split('/').at(-1)); return route.fulfill({ status: product ? 200 : 404, json: product || { message: 'Product not found.' } }); }
    if (path === '/orders') { const body = route.request().postDataJSON(); orders.push(body); return route.fulfill({ json: { reference: 'AGS-ACCESSORY-TEST', subtotalMinor: body.items.reduce((sum, i) => sum + i.quantity * i.expectedUnitPriceMinor, 0), deliveryFeeMinor: null, totalMinor: null } }); }
    return route.fulfill({ status: 404, json: { message: 'Not found' } });
  });
  return { urls, orders, errors, items };
}
async function details(page) {
  await page.getByLabel('Full name', { exact: true }).fill('Fictional Customer');
  await page.getByLabel('Kenyan mobile number').fill('0712345678');
  await page.getByLabel('Area or town').fill('Nairobi');
  await page.getByLabel('Delivery address or landmark').fill('Example landmark');
}
test('accessories categories, filters, pagination and catalogue return retain their context', async ({ page, isMobile }) => {
  const { urls, errors } = await catalogue(page);
  await page.goto('/accessories');
  await expect(page.getByText('16 products', { exact: true })).toBeVisible();
  await expect(page.locator('.phone-card')).toHaveCount(12);
  await expect(page.locator('.phone-card').first()).not.toContainText('GB');
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByText('Page 2 of 2')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Product results' })).toBeFocused();
  await page.locator('.phone-card-link').first().click();
  await page.getByRole('link', { name: 'Back to accessories' }).click();
  await expect(page).toHaveURL(/accessories\?page=2$/);
  await expect(page.locator('.phone-card-link').first()).toBeFocused();
  await page.getByRole('navigation', { name: 'Accessory categories' }).getByRole('link', { name: /Power banks/ }).click();
  await expect(page).toHaveURL(/accessories\?category=POWER_BANK$/);
  if (isMobile) await page.getByRole('button', { name: 'Filters', exact: true }).click();
  await page.getByLabel('Brand', { exact: true }).fill('Sample');
  await page.getByLabel('Max price (KES)').fill('2000');
  await page.getByLabel('Available to order', { exact: true }).check();
  await page.getByRole('button', { name: 'Apply filters' }).click();
  await expect.poll(() => urls.some(u => u.searchParams.get('category') === 'POWER_BANK' && u.searchParams.get('maxPriceMinor') === '200000' && u.searchParams.get('brand') === 'Sample')).toBe(true);
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
  await expect(page).toHaveURL(/accessories\?category=POWER_BANK$/);
  await page.getByRole('link', { name: 'All accessories', exact: true }).click();
  await expect(page.getByText('16 products', { exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});
test('accessory options, gallery, mixed cart, reload and checkout use the selected configurations', async ({ page }) => {
  const { orders } = await catalogue(page);
  await page.goto('/products/accessory-0');
  await expect(page.getByRole('heading', { name: 'Specifications & compatibility' })).toBeVisible();
  await page.getByLabel('Option and colour').selectOption(products[0].variants[2].id);
  await expect(page.getByRole('button', { name: 'Currently unavailable', exact: true })).toBeDisabled();
  await page.getByLabel('Option and colour').selectOption(products[0].variants[1].id);
  await page.getByRole('button', { name: 'View Large power bank' }).click();
  await expect(page.locator('main img').first()).toHaveAttribute('alt', 'Large power bank');
  await expect(page.locator('main img').first()).toHaveAttribute('src', /powerbank-large/);
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await page.goto('/products/sample-phone');
  await expect(page.getByLabel('Storage, RAM and colour')).toBeVisible();
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await page.goto('/cart'); await page.reload();
  await expect(page.getByText('20,000 mAh / Black', { exact: true })).toBeVisible();
  await expect(page.getByText('128GB / 8GB RAM / Black', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'Proceed to Checkout' }).click();
  await details(page);
  await page.getByRole('button', { name: 'Place order — cash on delivery' }).click();
  await expect(page.getByRole('heading', { name: 'Order received' })).toBeVisible();
  expect(orders[0].items).toEqual([{ variantId: products[0].variants[1].id, quantity: 1, expectedUnitPriceMinor: 250000 }, { variantId: phone.variants[0].id, quantity: 1, expectedUnitPriceMinor: 1200000 }]);
  await page.goto('/cart'); await expect(page.getByText('Your cart is empty')).toBeVisible();
});
test('all accessory types expose appropriate options and enquiry drafts without phone memory', async ({ page }) => {
  await catalogue(page);
  for (let i = 0; i < 4; i++) {
    await page.goto(`/products/accessory-${i}`); await page.reload();
    await expect(page.getByLabel('Option and colour')).toBeVisible();
    await expect(page.getByText(/nullGB|0GB|GB RAM/)).toHaveCount(0);
    await page.getByRole('link', { name: 'Ask about this accessory' }).click();
    await expect(page.getByLabel('Message', { exact: true })).toHaveValue(new RegExp(products[i].name));
    await expect(page.getByLabel('Message', { exact: true })).toBeFocused();
  }
});
test('accessory price review and uncertain checkout preserve the exact request across reload', async ({ page }) => {
  const requests = []; let priceChanged = false;
  await catalogue(page, async (route, items) => {
    if (route.request().method() !== 'POST') return false;
    requests.push(route.request().postDataJSON());
    if (!priceChanged) { priceChanged = true; items[0].variants[0].priceMinor = 180000; await route.fulfill({ status: 409, json: { message: 'Price changed. Review your cart.' } }); }
    else if (requests.length === 2) await route.abort('failed');
    else await route.fulfill({ json: { reference: 'AGS-RETRY-ACCESSORY', subtotalMinor: 180000, deliveryFeeMinor: null, totalMinor: null } });
    return true;
  });
  await page.goto('/products/accessory-0'); await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await page.goto('/checkout'); await details(page); await page.getByRole('button', { name: 'Place order — cash on delivery' }).click();
  await page.getByRole('link', { name: 'Review cart prices and availability' }).click();
  await page.getByRole('button', { name: 'Review latest prices and availability' }).click();
  await page.getByRole('button', { name: 'Accept cart updates' }).click();
  await page.getByRole('link', { name: 'Proceed to Checkout' }).click();
  await expect(page.getByLabel('Full name')).toHaveValue('Fictional Customer');
  await page.getByRole('button', { name: 'Place order — cash on delivery' }).click();
  await expect(page.getByRole('alert')).toContainText('Connection interrupted');
  await page.reload(); await page.getByRole('button', { name: 'Retry same order request' }).click();
  await expect(page.getByRole('heading', { name: 'Order received' })).toBeVisible();
  expect(requests[1]).toEqual(requests[2]); expect(requests[1].requestId).not.toBe(requests[0].requestId);
});
test('global search finds accessories and empty/error states recover', async ({ page }) => {
  let fail = true;
  await catalogue(page, async route => {
    const url = new URL(route.request().url());
    if (fail && url.searchParams.get('category') === 'ACCESSORIES') { fail = false; await route.fulfill({ status: 503, json: { message: 'Catalogue temporarily unavailable.' } }); return true; }
    return false;
  });
  await page.goto('/accessories'); await expect(page.getByRole('alert')).toContainText('Catalogue temporarily unavailable.');
  await page.getByRole('button', { name: 'Try again', exact: true }).click();
  await expect(page.locator('.phone-card')).toHaveCount(12);
  await page.getByRole('searchbox', { name: 'Search catalogue' }).fill('charger');
  await page.getByRole('button', { name: 'Search catalogue' }).click();
  await expect(page).toHaveURL(/category=ALL/);
  await expect(page.locator('.phone-card')).toHaveCount(4);
  await page.goto('/accessories?category=EARBUDS&max=1');
  await expect(page.getByText('No products found', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Clear All Filters' }).click();
  await expect(page.locator('.phone-card')).toHaveCount(4);
  await expect(page).toHaveURL(/category=EARBUDS$/);
});
