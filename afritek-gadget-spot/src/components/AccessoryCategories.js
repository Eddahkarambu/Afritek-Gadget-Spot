import React from 'react';
import { Link } from 'react-router-dom';
import { BatteryCharging, Plug, Headphones, Cable, ArrowUpRight } from 'lucide-react';
import { accessoryCategories } from '../lib/categories';
const icons = { battery: BatteryCharging, plug: Plug, audio: Headphones, cable: Cable };
export default function AccessoryCategories({ selected, search = '' }) {
  return <nav className="accessory-categories" aria-label="Accessory categories">{accessoryCategories.map(category => {
    const Icon = icons[category.icon];
    const params = new URLSearchParams(search); params.set('category', category.value); params.delete('page');
    return <Link key={category.value} to={`/accessories?${params}`} className="accessory-category" aria-current={selected === category.value ? 'page' : undefined}><Icon size={28} strokeWidth={1.5} aria-hidden="true" /><span><strong>{category.label}</strong><small>{category.note}</small></span><ArrowUpRight size={18} aria-hidden="true" /></Link>;
  })}</nav>;
}
