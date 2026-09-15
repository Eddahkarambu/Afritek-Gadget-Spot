import React from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { imageUrl, money } from '../lib/api';
export default function ProductCard({ product }) {
  const available = product.variants.filter(v => v.available);
  const prices = (available.length ? available : product.variants).map(v => v.priceMinor);
  return <article className="group bg-[#111827] text-white rounded-2xl border border-gray-800 overflow-hidden">
    <Link to={`/products/${product.slug}`}>
      <ProductImage src={imageUrl(product.images[0])} alt={product.images[0]?.alt || product.name} className="h-56 w-full object-contain bg-[#161b22]" />
      <div className="p-4"><p className="text-cyan-400 text-xs font-bold uppercase mb-1">{product.brand}</p><h3 className="font-bold mb-2">{product.name}</h3>
        <p className="text-gray-300 mb-3">{product.variants.length} configuration{product.variants.length === 1 ? '' : 's'}</p>
        {prices.length > 0 && <p className="text-lg font-bold mb-4">From {money(Math.min(...prices))}</p>}
        <span className="block text-center bg-teal-700 rounded-lg px-4 py-3 font-bold">{available.length ? 'Choose options' : 'Currently unavailable'}</span>
      </div>
    </Link>
  </article>;
}
