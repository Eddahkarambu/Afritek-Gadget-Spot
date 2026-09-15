import React from 'react';
import { Link } from 'react-router-dom';
import useResource from '../hooks/useResource';
import RequestState from './RequestState';
import ProductCard from './ProductCard';
export default function FeaturedProducts() {
  const result = useResource('/products?pageSize=4');
  return <section className="bg-gradient-to-b from-white to-teal-50 px-6 py-16 text-gray-900"><div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-teal-900 mb-8">Explore our phones</h2><RequestState {...result} />
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{result.data?.items.map(product => <ProductCard key={product.id} product={product} />)}</div>
    {result.data?.total === 0 && <p>Our phone catalogue is being updated. Please check back soon.</p>}
    <Link to="/shop" className="inline-block bg-teal-700 text-white px-6 py-3 rounded-lg mt-8">View all phones</Link>
  </div></section>;
}
