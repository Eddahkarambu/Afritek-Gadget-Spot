const id = n => `b0000000-0000-4000-8000-${String(n).padStart(12, '0')}`;
const categories = ['POWER_BANK', 'CHARGER', 'EARBUDS', 'OTHER_ACCESSORY'];
const names = ['Everyday power bank', 'USB-C wall charger', 'Wireless earbuds', 'USB-C cable'];
const options = ['10,000 mAh', '25W USB-C', 'Standard', '1 metre'];
const products = Array.from({ length: 16 }, (_, n) => {
  const i = n % 4;
  return { id: id(n + 1), slug: `accessory-${n}`, name: `${names[i]}${n >= 4 ? ` ${Math.floor(n / 4) + 1}` : ''}`, brand: i === 0 ? 'Sample' : 'Demo', category: categories[i], description: 'Fictional product for local storefront review.', accessorySpecs: i === 0 ? 'USB-C input and output. Check your device’s charging requirements.' : 'Check connections and device compatibility before buying.', display: '', processor: '', battery: '', cameras: '', network: '', images: [{ id: `image-${n}`, alt: names[i], variantId: null }], variants: [{ id: id(100 + n), storageGb: null, ramGb: 0, optionLabel: options[i], colour: 'Black', priceMinor: 150000 + i * 50000, available: true }] };
});
products[0].variants.push({ id: id(200), storageGb: null, ramGb: 0, optionLabel: '20,000 mAh', colour: 'Black', priceMinor: 250000, available: true }, { id: id(201), storageGb: null, ramGb: 0, optionLabel: '20,000 mAh', colour: 'White', priceMinor: 250000, available: false });
products[0].images.push({ id: 'powerbank-large', alt: 'Large power bank', variantId: id(200) });
const phone = { id: id(300), slug: 'sample-phone', name: 'Sample phone', brand: 'Sample', category: 'PHONE', description: 'Fictional phone.', images: [], variants: [{ id: id(301), storageGb: 128, ramGb: 8, colour: 'Black', priceMinor: 1200000, available: true }] };
module.exports = { products, phone, id };
