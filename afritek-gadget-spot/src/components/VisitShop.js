import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
export default function VisitShop({ productName }) {
  const inquiry = productName ? `/contact?message=${encodeURIComponent(`Hi, I’d like to visit your Bazaar shop to buy ${productName}. Could you confirm availability before I come in?`)}` : '/contact';
  return <section className="visit-shop-note"><MapPin size={22} aria-hidden="true" /><div><h2>Walk in and buy at The Bazaar</h2><p>Visit Wing 5, Mezzanine floor, Moi Avenue, Nairobi. No online order is needed. Ask about your preferred phone before travelling.</p><div className="visit-shop-actions"><Link to="/contact#shop-location">Visit our shop →</Link>{productName && <Link to={inquiry}>Ask about this phone →</Link>}</div></div></section>;
}
