import React, { useEffect, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
const brands = ['Samsung', 'Xiaomi', 'Poco', 'Tecno', 'Infinix', 'Itel', 'Oppo', 'Vivo', 'Honor', 'Apple', 'Nokia', 'Realme'];
export default function SearchFilter({ value: filters, onChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(filters);
  const [error, setError] = useState('');
  const key = JSON.stringify(filters);
  useEffect(() => { setValue(JSON.parse(key)); setError(''); }, [key]);
  function update(name, next) { setValue(v => ({ ...v, [name]: next })); setError(''); }
  function apply(event) {
    event.preventDefault();
    if (value.min !== '' && value.max !== '' && Number(value.min) > Number(value.max)) { setError('Maximum price must be at least the minimum price.'); return; }
    onChange(value);
  }
  const choices = value.brand && !brands.includes(value.brand) ? [value.brand, ...brands] : brands;
  return <aside className="filter-panel">
    <button className="filter-toggle lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="shop-filters"><SlidersHorizontal size={18} />Filters</button>
    <form id="shop-filters" onSubmit={apply} className={`${open ? 'block' : 'hidden'} lg:block`}>
      <h2>Refine your search</h2>
      <label>Search phones<input type="search" maxLength={100} value={value.search} onChange={e => update('search', e.target.value)} placeholder="Model or keyword" /></label>
      <label><span id="brand-label">Brand</span><select aria-labelledby="brand-label" value={value.brand} onChange={e => update('brand', e.target.value)}><option value="">Any brand</option>{choices.map(brand => <option key={brand}>{brand}</option>)}</select></label>
      <p className="field-help">Brand availability varies. Try any brand to see more phones.</p>
      <fieldset><legend>Your budget</legend><div className="budget-inputs">{[['min', 'Min price (KES)'], ['max', 'Max price (KES)']].map(([name, label]) => <label key={name}>{label}<input type="number" min="0" max="20000000" step="0.01" value={value[name]} onChange={e => update(name, e.target.value)} placeholder={name === 'min' ? '0' : 'Any'} /></label>)}</div></fieldset>
      {error && <p role="alert" className="filter-error">{error}</p>}
      <label className="availability-check"><input type="checkbox" checked={value.available} onChange={e => update('available', e.target.checked)} />Available to order</label>
      <button className="solid-button" type="submit">Apply filters</button>
      <button className="text-button" type="button" onClick={() => { setValue({ search: '', available: false, brand: '', min: '', max: '' }); onChange({}); }}>Clear filters</button>
    </form>
  </aside>;
}
