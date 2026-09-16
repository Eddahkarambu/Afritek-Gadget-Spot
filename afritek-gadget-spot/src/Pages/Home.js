import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Banknote, Truck, MessageCircle, Smartphone } from 'lucide-react';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductImage from '../components/ProductImage';
import useResource from '../hooks/useResource';
import { imageUrl, money } from '../lib/api';

export default function Home() {
  const result = useResource('/products?pageSize=8');
  const spotlight = result.data?.items.find(product => product.variants.some(variant => variant.available));
  const startingPrice = spotlight ? Math.min(...spotlight.variants.filter(v => v.available).map(v => v.priceMinor)) : null;
  return <div className="store-home">
    <section className="home-hero"><div className="store-container hero-layout">
      <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT PHONE STARTS HERE</p><h1>Big possibilities.<br /><span>One great phone.</span></h1><p className="hero-description">For the everyday, the next chapter and everything in between. Find your phone at Afritek Gadget Spot.</p><Link to="/shop" className="store-button">Shop phones <ArrowRight size={19} aria-hidden="true" /></Link><p className="hero-note"><Banknote size={17} aria-hidden="true" /> Choose online. Pay cash on delivery.</p></div>
      <div className="hero-feature">
        <div className="feature-kicker"><span>IN THE SPOTLIGHT</span><Smartphone size={19} aria-hidden="true" /></div>
        {spotlight ? <Link to={`/products/${spotlight.slug}`} className="spotlight-link"><ProductImage src={imageUrl(spotlight.images[0])} alt={spotlight.name} className="spotlight-image" loading="eager" /><div className="spotlight-caption"><div><span className="spotlight-brand">{spotlight.brand}</span><p>{spotlight.name}</p><span className="spotlight-price">From {money(startingPrice)}</span></div><span className="spotlight-arrow" aria-hidden="true"><ArrowUpRight size={24} /></span></div></Link> : <div className="spotlight-placeholder"><Smartphone size={64} strokeWidth={1} aria-hidden="true" /><p>A phone for your next chapter.</p><span>Explore models, colours and configurations.</span></div>}
      </div>
    </div></section>
    <div className="shopping-notes"><div className="store-container notes-layout"><p><Banknote size={21} aria-hidden="true" /><span><strong>Cash on delivery</strong><small>No online payment needed</small></span></p><p><Truck size={21} aria-hidden="true" /><span><strong>Delivery, agreed with you</strong><small>Confirm the fee before your order is confirmed</small></span></p><p><MessageCircle size={21} aria-hidden="true" /><span><strong>A little help choosing?</strong><Link to="/contact">Talk to the shop <ArrowUpRight size={13} aria-hidden="true" /></Link></span></p></div></div>
    <FeaturedProducts result={result} />
    <section className="store-container discovery-section" aria-labelledby="budget-heading"><div className="section-heading"><div><p className="eyebrow">YOUR PHONE. YOUR BUDGET.</p><h2 id="budget-heading">Start with what works for you.</h2></div></div><div className="budget-grid">{[{label:'Up to KSh 15,000',note:'Everyday essentials',to:'/shop?max=15000'},{label:'KSh 15,000–30,000',note:'Room for more',to:'/shop?min=15000&max=30000'},{label:'Above KSh 30,000',note:'Explore your next upgrade',to:'/shop?min=30000.01'}].map(budget => <Link to={budget.to} key={budget.label} className="budget-card"><span>{budget.note}<strong>{budget.label}</strong></span><ArrowUpRight size={24} aria-hidden="true" /></Link>)}</div></section>
    <section className="store-container brand-section" aria-labelledby="brand-heading"><h2 id="brand-heading">Have a brand in mind?</h2><div className="brand-links">{['Samsung','Xiaomi','Poco','Oppo','Tecno','Infinix','Itel','Vivo','Honor'].map(brand => <Link key={brand} to={`/shop?brand=${encodeURIComponent(brand)}`}>{brand}<ArrowUpRight size={15} aria-hidden="true" /></Link>)}</div></section>
    <section className="store-container help-section"><div><p className="eyebrow">LET’S FIND YOUR FIT</p><h2>Not sure which phone to choose?</h2><p>Tell us what matters to you. We’ll help you explore your options and arrange delivery.</p></div><Link className="store-button button-light" to="/contact">Talk to the shop <ArrowUpRight size={19} aria-hidden="true" /></Link></section>
  </div>;
}
