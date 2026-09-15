import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import RequestState from './RequestState';
import ProductCard from './ProductCard';
export default function FeaturedProducts({ result }) {
  return <section className="store-container catalogue-section" aria-labelledby="catalogue-heading">
    <div className="section-heading"><div><p className="eyebrow">THE PHONE EDIT</p><h2 id="catalogue-heading">Find your everyday upgrade.</h2></div><Link className="text-link" to="/shop">View all phones <ArrowRight size={18} aria-hidden="true" /></Link></div>
    <RequestState {...result} />
    {!result.error && <div className="phone-grid">{result.data?.items.map(product => <ProductCard key={product.id} product={product} />)}</div>}
    {result.data?.total === 0 && <div className="catalogue-empty"><h3>New phones are on the way.</h3><p>Our catalogue is being updated. Check back soon or contact the shop for help.</p><Link className="text-link" to="/contact">Contact the shop <ArrowRight size={18} /></Link></div>}
  </section>;
}
