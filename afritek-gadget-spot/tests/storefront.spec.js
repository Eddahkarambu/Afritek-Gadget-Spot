const { test, expect } = require('@playwright/test');
const product = {
  id: 'a0000000-0000-4000-8000-000000000000', name: 'Test Galaxy', brand: 'Test', slug: 'test-galaxy', description: 'A fictional phone for browser testing.', display: '6 inch', processor: '', battery: '', cameras: '', network: '5G', images: [],
  variants: [
    { id: 'a0000000-0000-4000-8000-000000000001', storageGb: 128, ramGb: 8, colour: 'Black', priceMinor: 1200050, available: true },
    { id: 'a0000000-0000-4000-8000-000000000002', storageGb: 128, ramGb: 8, colour: 'White', priceMinor: 1300000, available: false },
  ],
};
const receipt = { reference: 'AGS-TEST-123', subtotalMinor: 1200050, deliveryFeeMinor: null, totalMinor: null, message: 'Order received.' };
async function mockShop(page, override = async () => false) {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/api/v1/**', async route => {
    if (await override(route)) return;
    const url = new URL(route.request().url());
    const path = url.pathname.replace('/api/v1', '');
    const data = path === '/shop' ? { name: 'Afritek Gadget Spot', phone: '+254712345678', email: 'shop@example.test', address: 'Test Nairobi branch' }
      : path === '/products/test-galaxy' ? product
      : path === '/products' ? { items: [product], total: 1, pages: 1, page: 1, pageSize: 12 }
      : path === '/orders' ? receipt : null;
    await route.fulfill({ status: data ? 200 : 404, contentType: 'application/json', body: JSON.stringify(data || { message: 'Phone not found.' }) });
  });
  await page.route('https://www.google.com/**', route => route.abort());
  return errors;
}
async function addPhone(page) {
  await page.goto('/products/test-galaxy');
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await page.getByRole('link', { name: 'View cart', exact: true }).click();
  await page.getByRole('link', { name: 'Proceed to Checkout' }).click();
}
async function fillCheckout(page) {
  await page.getByLabel('Full name').fill('Fictional Customer');
  await page.getByLabel('Kenyan mobile number').fill('0712 345 678');
  await page.getByLabel('Area or town').fill('Nairobi');
  await page.getByLabel('Delivery address or landmark').fill('Test landmark');
}
test('all routes render without runtime errors or horizontal overflow; local CSS works without CDN', async ({ page }, testInfo) => {
  const errors = await mockShop(page);
  for (const route of ['/', '/shop', '/products/test-galaxy', '/cart', '/checkout', '/payment', '/order-confirmation', '/about', '/contact', '/missing']) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('main h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator('nav').first().evaluate(el => getComputedStyle(el).position)).toBe('fixed');
    if (route === '/' || route === '/products/test-galaxy') { await expect(page.getByRole('heading', { name: 'Test Galaxy' })).toBeVisible(); await page.screenshot({ path: testInfo.outputPath(route === '/' ? 'home.png' : 'phone.png'), fullPage: true }); }
  }
  expect(errors).toEqual([]);
  expect(await page.locator('script[src*="tailwind"]').count()).toBe(0);
});
test('variants, cart reload and server receipt handling', async ({ page }) => {
  let body;
  await mockShop(page, async route => {
    if (route.request().method() === 'POST') { body = route.request().postDataJSON(); await route.fulfill({ json: receipt }); return true; }
  });
  await page.goto('/products/test-galaxy');
  await page.getByLabel('Storage, RAM and colour').selectOption(product.variants[1].id);
  await expect(page.getByRole('button', { name: 'Currently unavailable' })).toBeDisabled();
  await page.getByLabel('Storage, RAM and colour').selectOption(product.variants[0].id);
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await page.getByRole('link', { name: 'View cart', exact: true }).click();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Test Galaxy' })).toBeVisible();
  await page.getByRole('link', { name: 'Proceed to Checkout' }).click();
  await fillCheckout(page);
  await page.getByRole('button', { name: 'Place order — cash on delivery' }).click();
  await expect(page.getByRole('heading', { name: 'Order received' })).toBeVisible();
  expect(body.phone).toBe('+254712345678');
  expect(body.items).toEqual([{ variantId: product.variants[0].id, quantity: 1, expectedUnitPriceMinor: 1200050 }]);
  expect(body.email).toBeUndefined();
  await page.reload();
  await expect(page.getByText(receipt.reference)).toBeVisible();
  await page.goto('/cart');
  await expect(page.getByText('Your cart is empty')).toBeVisible();
});
test('lost response and reload preserve request ID and block changes until receipt', async ({ page }) => {
  const requests = [];
  await mockShop(page, async route => {
    if (route.request().method() !== 'POST') return false;
    requests.push(route.request().postDataJSON());
    if (requests.length === 1) await route.abort('failed');
    else await route.fulfill({ json: receipt });
    return true;
  });
  await addPhone(page); await fillCheckout(page);
  await page.getByRole('button', { name: 'Place order — cash on delivery' }).click();
  await expect(page.getByRole('alert')).toContainText('Connection interrupted');
  await page.reload();
  await expect(page.getByLabel('Full name')).toBeDisabled();
  await page.getByRole('button', { name: 'Retry same order request' }).click();
  await expect(page.getByRole('heading', { name: 'Order received' })).toBeVisible();
  expect(requests.length).toBe(2); expect(requests[0]).toEqual(requests[1]);
});
test('price conflict keeps cart and customer details; changes require explicit acceptance', async ({ page }) => {
  let changed = false;
  await mockShop(page, async route => {
    if (route.request().method() === 'POST') { changed = true; await route.fulfill({ status: 409, json: { message: 'Price has changed. Review your cart.' } }); return true; }
    if (changed && new URL(route.request().url()).pathname.endsWith('/products/test-galaxy')) { await route.fulfill({ json: { ...product, variants: [{ ...product.variants[0], priceMinor: 1500000 }] } }); return true; }
  });
  await addPhone(page); await fillCheckout(page);
  await page.getByRole('button', { name: 'Place order — cash on delivery' }).click();
  await expect(page.getByRole('alert')).toContainText('Price has changed');
  await expect(page.getByLabel('Full name')).toHaveValue('Fictional Customer');
  await page.getByRole('link', { name: 'Review cart prices and availability' }).click();
  await page.getByRole('button', { name: 'Review latest prices and availability' }).click();
  await expect(page.getByRole('button', { name: 'Accept cart updates' })).toBeVisible();
  await page.getByRole('button', { name: 'Accept cart updates' }).click();
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('afritek.cart.v2')));
  expect(saved[0].priceMinor).toBe(1500000);
});
test('filter URL and controls stay in sync and reset without losing unrelated selections', async ({ page, isMobile }) => {
  const urls = [];
  await mockShop(page, async route => { urls.push(route.request().url()); return false; });
  await page.goto('/shop?q=Galaxy&brand=Test&min=100&max=20000');
  if (isMobile) await page.getByRole('button', { name: 'Filters', exact: true }).click();
  await expect(page.getByLabel('Search phones', { exact: true })).toHaveValue('Galaxy');
  await expect(page.getByLabel('Brand', { exact: true })).toHaveValue('Test');
  await page.getByLabel('Available to order').check();
  await expect.poll(() => urls.some(url => url.includes('brand=Test') && url.includes('minPriceMinor=10000') && url.includes('availability=available'))).toBe(true);
  await page.getByRole('button', { name: 'Clear filters', exact: true }).click();
  await expect(page.getByLabel('Search phones', { exact: true })).toHaveValue('');
  await expect(page.getByLabel('Brand', { exact: true })).toHaveValue('');
});
test('loading failures have retry and contact opens a draft without claiming delivery', async ({ page }) => {
  let fail = true;
  await mockShop(page, async route => {
    if (fail && new URL(route.request().url()).pathname === '/api/v1/products') { fail = false; await route.fulfill({ status: 503, json: { message: 'Shop unavailable.' } }); return true; }
  });
  await page.goto('/shop'); await expect(page.getByRole('alert')).toContainText('Shop unavailable.');
  await page.getByRole('button', { name: 'Try again', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Test Galaxy' })).toBeVisible();
  await page.goto('/contact');
  await expect(page.getByRole('link', { name: '+254712345678' })).toHaveAttribute('href', 'tel:+254712345678');
  await page.evaluate(() => { window.open = (...args) => { window.testOpened = args; return null; }; });
  await page.getByLabel('Your Name').fill('Fictional Customer');
  await page.getByLabel('Subject', { exact: true }).fill('Phone question');
  await page.getByLabel('Message', { exact: true }).fill('Which colours are available?');
  await page.getByRole('button', { name: 'Open WhatsApp draft' }).click();
  await expect(page.getByRole('status')).toContainText('draft');
  await expect(page.getByLabel('Message', { exact: true })).toHaveValue('Which colours are available?');
  expect((await page.evaluate(() => window.testOpened))[0]).toContain('https://wa.me/254712345678?text=');
  await expect(page.getByText('Message Sent!', { exact: true })).toHaveCount(0);
});

test('cart caps quantities and removes unavailable items only after review', async ({ page }) => {
  let unavailable = false;
  await mockShop(page, async route => {
    if (unavailable && new URL(route.request().url()).pathname.endsWith('/products/test-galaxy')) { await route.fulfill({ json: { ...product, variants: product.variants.map(v => ({ ...v, available: false })) } }); return true; }
  });
  await page.goto('/products/test-galaxy');
  await page.getByLabel('Quantity', { exact: true }).fill('11');
  await expect(page.getByRole('button', { name: 'Add to Cart', exact: true })).toBeDisabled();
  await page.getByLabel('Quantity', { exact: true }).fill('10');
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('up to 10');
  await page.goto('/cart');
  await expect(page.getByRole('button', { name: 'Increase quantity' })).toBeDisabled();
  unavailable = true;
  await page.getByRole('button', { name: 'Review latest prices and availability' }).click();
  await expect(page.getByRole('status')).toContainText('will be removed');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('afritek.cart.v2')).length)).toBe(1);
  await page.getByRole('button', { name: 'Accept cart updates' }).click();
  await expect(page.getByText('Your cart is empty')).toBeVisible();
});

test('visible catalogue search, budget links and mobile navigation work together', async ({ page, isMobile }) => {
  await mockShop(page);
  await page.goto('/');
  await page.getByRole('search').getByRole('searchbox').fill('Galaxy');
  await page.getByRole('search').getByRole('button', { name: 'Search catalogue' }).click();
  await expect(page).toHaveURL(/\/shop\?q=Galaxy$/);
  await expect(page.getByLabel('Search phones', { exact: true })).toHaveValue('Galaxy');
  if (isMobile) {
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await expect(page.locator('#mobile-navigation')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-navigation')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeFocused();
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await page.locator('#mobile-navigation').getByRole('link', { name: 'Our story' }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator('#mobile-navigation')).toHaveCount(0);
  }
  await page.goto('/');
  await page.getByRole('link', { name: /Everyday essentials/ }).click();
  await expect(page).toHaveURL(/\/shop\?max=15000$/);
  await expect(page.getByLabel('Max price (KES)', { exact: true })).toHaveValue('15000');
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Cart, 0 items', exact: true })).toHaveCount(1);
});

test('empty home catalogue does not invent a spotlight product or a price', async ({ page }) => {
  await mockShop(page, async route => {
    if (new URL(route.request().url()).pathname === '/api/v1/products') { await route.fulfill({ json: { items: [], total: 0, pages: 0, page: 1, pageSize: 8 } }); return true; }
    return false;
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'New phones are on the way.' })).toBeVisible();
  await expect(page.locator('.phone-card')).toHaveCount(0);
  await expect(page.locator('.spotlight-link')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Shop phones', exact: true }).first()).toBeVisible();
});
