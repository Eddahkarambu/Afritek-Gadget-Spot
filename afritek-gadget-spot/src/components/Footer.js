import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer() {
  return <footer className="bg-gray-900 text-gray-300 px-6 py-12"><div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-8">
    <div><h2 className="text-xl font-bold text-white mb-3">Afritek Gadget Spot</h2><p>Phones in Kenya. Order online and pay cash on delivery.</p></div>
    <nav aria-label="Footer" className="flex flex-col gap-3"><Link to="/shop">Shop phones</Link><Link to="/about">About us</Link><Link to="/contact">Contact and delivery questions</Link></nav>
    <div><p className="mb-4">Delivery fee to be confirmed with each order.</p><a className="underline block mb-3" href="https://www.instagram.com/afritek_gadget_spot" target="_blank" rel="noopener noreferrer">Instagram</a><a className="underline" href="https://www.tiktok.com/@afritekgadget" target="_blank" rel="noopener noreferrer">TikTok</a></div>
  </div><p className="max-w-7xl mx-auto mt-8 border-t border-gray-700 pt-6">© {new Date().getFullYear()} Afritek Gadget Spot</p></footer>;
}
