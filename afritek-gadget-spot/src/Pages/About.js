import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, MessageCircle, Truck } from 'lucide-react';
export default function About() {
  return <div className="editorial-page"><div className="store-container">
    <header className="page-intro"><p className="eyebrow">OUR STORY</p><h1>Your next phone.<br />A little closer.</h1><p>Afritek Gadget Spot sells phones in Kenya, online and through one physical branch.</p></header>
    <section className="story-intro"><div><h2>A phone that fits your everyday.</h2><p>Start with your budget, explore the phones and choose the storage and colour that work for you. If you need a hand deciding, speak with the shop.</p><p>You can browse online and talk to us about your choice before placing an order.</p><Link className="solid-button" to="/shop">Explore phones →</Link></div><aside className="story-note"><p className="eyebrow">ONLINE. IN PERSON. IN TOUCH.</p><h2>One shop.<br />A conversation away.</h2><p>Have a question about a phone or planning a visit? Find our contact details and branch address in one place.</p><Link to="/contact">Talk to the shop →</Link></aside></section>
    <section className="story-process"><p className="eyebrow">HOW IT WORKS</p><h2>From finding it to making it yours.</h2><div className="contact-cards">{[
      [Smartphone, '01', 'Choose your phone', 'Browse by brand and budget, then select the available storage and colour you want.'],
      [MessageCircle, '02', 'Confirm the details', 'Place your order. We contact you to confirm availability, delivery timing and the delivery fee.'],
      [Truck, '03', 'Pay on delivery', 'We arrange delivery with our rider. You pay cash when your order arrives.']
    ].map(([Icon, step, title, text]) => <article className="information-card" key={step}><div className="process-step"><Icon size={24} /><span>{step}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="story-help"><h2>A few details make a better decision.</h2><p>Phone prices are shown for each configuration. Delivery is agreed separately. Ask us about warranty and return terms for your chosen phone before ordering.</p><Link to="/contact">Ask us a question →</Link></section>
  </div></div>;
}
