export const accessoryCategories = [
  { value: 'POWER_BANK', label: 'Power banks', note: 'Power for the day ahead', icon: 'battery' },
  { value: 'CHARGER', label: 'Chargers', note: 'Find the right connection', icon: 'plug' },
  { value: 'EARBUDS', label: 'Earbuds', note: 'Listen on the move', icon: 'audio' },
  { value: 'OTHER_ACCESSORY', label: 'Other accessories', note: 'The everyday extras', icon: 'cable' },
];
export const categoryLabels = { PHONE: 'Phones', ALL: 'All products', ACCESSORIES: 'All accessories', ...Object.fromEntries(accessoryCategories.map(c => [c.value, c.label])) };
export const isAccessory = product => Boolean(product?.category && product.category !== 'PHONE');
