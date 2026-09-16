import VisitShop from '../components/VisitShop';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import useResource from '../hooks/useResource';
import RequestState from '../components/RequestState';
import ProductImage from '../components/ProductImage';
import { cartItem, money, imageUrl, variantLabel } from '../lib/api';

export default function ProductDetail({ addToCart }) {
  const { slug } = useParams();
  const result = useResource(`/products/${encodeURIComponent(slug)}`);
  return <div className="min-h-screen bg-white pt-28 pb-20 text-gray-900"><div className="max-w-7xl mx-auto px-6">
    <Link to="/shop" className="text-teal-800 underline inline-block mb-8">Back to phones</Link>
    <RequestState {...result} />
    {result.data && <Product key={result.data.id} product={result.data} addToCart={addToCart} />}
  </div></div>;
}
function Product({ product, addToCart }) {
  const [variantId, setVariantId] = useState(product.variants.find(v => v.available)?.id || product.variants[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState('');
  const variant = product.variants.find(v => v.id === variantId);
  const photos = product.images.filter(i => !i.variantId || i.variantId === variantId);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const photo = photos.find(i => i.id === selectedPhoto) || photos[0];
  return <>
    <div className="grid md:grid-cols-2 gap-12">
      <div><ProductImage src={imageUrl(photo)} alt={photo?.alt || product.name} className="h-80 sm:h-96 w-full object-contain bg-teal-50 rounded-2xl" />
        <div className="flex gap-3 flex-wrap mt-4">{photos.length > 1 && photos.map(i => <button key={i.id} aria-label={`View ${i.alt || 'photo'}`} aria-pressed={i.id === photo?.id} onClick={() => setSelectedPhoto(i.id)} className="border border-teal-600 rounded-lg p-1"><ProductImage src={imageUrl(i)} alt={i.alt || product.name} className="w-16 h-16 object-contain" /></button>)}</div>
      </div>
      <div><p className="text-teal-700 font-bold mb-3">{product.brand}</p><h1 className="text-3xl sm:text-4xl font-bold mb-6">{product.name}</h1>
        <label className="block font-semibold mb-6">Storage, RAM and colour<select className="block w-full border border-teal-600 p-3 mt-2 rounded-lg" value={variantId || ''} onChange={e => { setVariantId(e.target.value); setNotice(''); }}>
          {product.variants.map(v => <option key={v.id} value={v.id}>{variantLabel(v)}{!v.available ? ' — unavailable' : ''}</option>)}
        </select></label>
        {variant && <p className="text-3xl font-bold text-teal-800 mb-6">{money(variant.priceMinor)}</p>}
        <label className="block mb-6">Quantity<input className="block w-24 border border-teal-600 p-3 mt-2 rounded-lg" type="number" min="1" max="10" value={quantity} onChange={e => setQuantity(e.target.value)} /></label>
        <button disabled={!variant?.available || !Number.isInteger(Number(quantity)) || Number(quantity) < 1 || Number(quantity) > 10} onClick={() => {
          const added = addToCart(cartItem(product, variant), Number(quantity));
          setNotice(added ? 'Added to your cart.' : 'Your cart allows up to 10 of each configuration and 20 configurations.');
        }} className="w-full bg-teal-700 hover:bg-teal-800 text-white py-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"><ShoppingCart size={20} />{variant?.available ? 'Add to Cart' : 'Currently unavailable'}</button>
        <p role="status" className="mt-3">{notice} {notice.startsWith('Added') && <Link className="underline text-teal-800" to="/cart">View cart</Link>}</p>
        <VisitShop productName={`${product.name}${variant ? ` (${variantLabel(variant)})` : ''}`} /><div className="border-t border-gray-200 mt-6 pt-6"><p className="font-bold">Cash on delivery</p><p className="mt-2">Delivery fee to be confirmed. We will contact you to agree the final amount and delivery arrangements.</p></div>
      </div>
    </div>
    <section className="mt-12"><h2 className="text-2xl font-bold mb-5">About this phone</h2><p className="whitespace-pre-wrap">{product.description}</p>
      <dl className="grid sm:grid-cols-2 gap-5 mt-6">{['display', 'processor', 'battery', 'cameras', 'network'].filter(key => product[key]).map(key => <div key={key} className="bg-teal-50 p-5 rounded-lg"><dt className="capitalize font-bold">{key}</dt><dd className="mt-2">{product[key]}</dd></div>)}</dl>
    </section>
  </>;
}
