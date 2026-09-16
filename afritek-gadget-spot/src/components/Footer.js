import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
export default function Footer() {
  return <footer className="store-footer"><div className="store-container footer-layout"><div className="footer-intro"><Link to="/" className="footer-brand">Afritek<span>GADGET SPOT</span></Link><p>Your next phone, a little closer.<br />Shop online. Pay cash on delivery.</p></div><nav aria-label="Footer"><h2>Explore</h2><Link to="/shop">Shop phones</Link><Link to="/about">Our story</Link><Link to="/contact">Contact & delivery</Link></nav><div className="footer-social"><h2>Stay connected</h2><a href="https://www.instagram.com/afritek_gadget_spot" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={15} aria-hidden="true" /></a><a href="https://www.tiktok.com/@afritekgadget" target="_blank" rel="noopener noreferrer">TikTok <ArrowUpRight size={15} aria-hidden="true" /></a></div></div><div className="store-container footer-bottom"><p>© {new Date().getFullYear()} Afritek Gadget Spot</p><p>Delivery fees are agreed before confirmation.</p></div></footer>;
}
