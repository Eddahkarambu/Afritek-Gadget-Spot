import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, MapPin, ShoppingBag } from 'lucide-react';
export default function About() {
  return <div className="editorial-page"><div className="store-container">
    <header className="page-intro"><p className="eyebrow">OUR STORY</p><h1>Your next phone.<br />A little closer.</h1><p>Visit Afritek Gadget Spot at The Bazaar, Moi Avenue, Nairobi. Browse and buy in person, or order online for delivery.</p></header>
    <section className="story-intro"><div><h2>A phone that fits your everyday.</h2><p>Start with your budget, explore the phones and choose the storage and colour that work for you. If you need a hand deciding, speak with the shop.</p><p>Browse online to get ideas, then walk in and buy. You do not need to place an online order before visiting.</p><Link className="solid-button" to="/shop">Explore phones →</Link></div><aside className="story-note"><p className="eyebrow">ONLINE. IN PERSON. IN TOUCH.</p><h2>One shop.<br />A conversation away.</h2><p>Find us in Wing 5, Mezzanine floor, The Bazaar, Moi Avenue. Opening hours are 7:00 am–7:00 pm, Nairobi time. Confirm opening days and your preferred phone before travelling.</p><Link to="/contact">Visit our shop →</Link></aside></section>
    <section className="story-process"><p className="eyebrow">HOW IT WORKS</p><h2>From finding it to making it yours.</h2><div className="contact-cards">{[
      [Smartphone, '01', 'Choose your phone', 'Browse by brand and budget, then select the available storage and colour you want.'],
      [MapPin, '02', 'Visit The Bazaar', 'Walk into our shop in Wing 5, Mezzanine floor. No online order or reservation is needed.'],
      [ShoppingBag, '03', 'Choose and buy in person', 'Speak with us about the available phones and configurations, then buy your chosen phone at the shop.']
    ].map(([Icon, step, title, text]) => <article className="information-card" key={step}><div className="process-step"><Icon size={24} /><span>{step}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="story-help"><h2>Prefer delivery?</h2><p>Order online and we’ll contact you to confirm availability, agree the delivery fee and arrange our rider. Online orders are paid cash on delivery.</p><Link to="/shop">Browse phones for delivery →</Link></section><section className="story-help"><h2>A few details make a better decision.</h2><p>Phone prices are shown for each configuration. Delivery is agreed separately. Ask us about warranty and return terms for your chosen phone before ordering.</p><Link to="/contact">Ask us a question →</Link></section>
  </div></div>;
}
