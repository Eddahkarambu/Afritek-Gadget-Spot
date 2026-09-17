import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ProductImage from './ProductImage';
import { imageUrl, money } from '../lib/api';
export default function ProductCard({ product }) {
  const location = useLocation();
  const catalogue = location.pathname === "/shop" ? { search: location.search, productId: product.id } : null;
  const available = product.variants.filter(v => v.available);
  const prices = (available.length ? available : product.variants).map(v => v.priceMinor);
  const storage = [...new Set(product.variants.map(v => v.storageGb))].sort((a, b) => a - b);
  const colours = [...new Set(product.variants.map(v => v.colour))];
  return <article className="phone-card">
    <Link to={`/products/${product.slug}`} className="phone-card-link" state={catalogue ? { catalogue } : null} id={`phone-${product.id}`}>
      <div className="phone-image-wrap"><ProductImage src={imageUrl(product.images[0])} alt={product.images[0]?.alt || product.name} className="phone-image" /><span className={`phone-status ${available.length ? '' : 'unavailable'}`}>{available.length ? 'Available to order' : 'Currently unavailable'}</span></div>
      <div className="phone-card-body"><p className="phone-brand">{product.brand}</p><h3>{product.name}</h3><p className="phone-config">{storage.map(value => `${value}GB`).join(' / ')} <span aria-hidden="true">·</span> {colours.length === 1 ? colours[0] : `${colours.length} colours`}</p>
        <div className="phone-card-bottom"><div><span className="price-caption">{new Set(prices).size > 1 ? 'From' : 'Price'}</span>{prices.length > 0 && <p className="phone-price">{money(Math.min(...prices))}</p>}</div><span className="phone-arrow" aria-hidden="true"><ArrowUpRight size={21} /></span></div>
        <span className="phone-options">{available.length ? 'Choose options' : 'View phone'}</span>
      </div>
    </Link>
  </article>;
}
