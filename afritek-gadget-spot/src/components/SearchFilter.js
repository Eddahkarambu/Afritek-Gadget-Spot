import React, { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
export default function SearchFilter({ value: filters, onChange: notify }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(filters);
  const key = JSON.stringify(filters);
  useEffect(() => { setValue(JSON.parse(key)); }, [key]);
  function onChange(next) { setValue(next); notify(next); }
  return <div className="bg-white text-gray-900 rounded-xl border-2 border-teal-200 p-6">
    <button className="flex gap-2 items-center lg:hidden min-h-11" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="shop-filters"><Filter size={20} />Filters</button>
    <div id="shop-filters" className={`${open ? 'block' : 'hidden'} lg:block space-y-5`}>
      <h2 className="text-xl font-bold text-teal-900">Find your phone</h2>
      <label className="block">Search phones<input type="search" maxLength={100} value={value.search} onChange={e => onChange({ ...value, search: e.target.value })} className="mt-2 w-full border border-teal-600 p-3 rounded-lg" /></label>
      <label className="block">Brand<input type="text" maxLength={100} placeholder="Any brand" value={value.brand || ''} onChange={e => onChange({ ...value, brand: e.target.value })} className="mt-2 w-full border border-teal-600 p-3 rounded-lg" /></label>
      <div className="grid grid-cols-2 gap-3">{[['min', 'Min price (KES)'], ['max', 'Max price (KES)']].map(([name, label]) => <label key={name}>{label}<input type="number" min="0" max="20000000" step="1" value={value[name] || ''} onChange={e => onChange({ ...value, [name]: e.target.value })} className="mt-2 w-full border border-teal-600 p-3 rounded-lg" /></label>)}</div>
      <label className="flex gap-2 items-center"><input type="checkbox" checked={value.available} onChange={e => onChange({ ...value, available: e.target.checked })} />Available to order</label>
      <button className="text-teal-800 underline min-h-11" onClick={() => onChange({ search: '', available: false })}>Clear filters</button>
    </div>
  </div>;
}
