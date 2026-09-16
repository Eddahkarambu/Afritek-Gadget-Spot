import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import useResource from '../hooks/useResource';
import RequestState from '../components/RequestState';
export default function Contact() {
  const shop = useResource('/shop');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [notice, setNotice] = useState('');
  const phone = shop.data?.phone;
  const configuredAddress = shop.data?.address?.trim();
  const address = configuredAddress || 'The Bazaar, Wing 5, Mezzanine floor, Moi Avenue, Nairobi, Kenya';
  const mapQuery = configuredAddress || '-1.2819548,36.8216073';
  function submit(event) {
    event.preventDefault();
    if (!phone) return;
    const text = `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\nMessage: ${form.message}`;
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setNotice('Your WhatsApp draft is ready. Send it in WhatsApp to contact us. If a new tab did not open, allow pop-ups and try again.');
  }
  return <div className="editorial-page"><div className="store-container">
    <header className="page-intro"><p className="eyebrow">CONTACT & DELIVERY</p><h1>Let’s talk phones.</h1><p>Need help choosing, arranging delivery or checking an order? Talk to the shop.</p></header>
    <RequestState {...shop} />
    {!shop.loading && !shop.error && <div className="contact-cards">
      <section className="information-card"><Phone size={22} /><h2>Call the shop</h2><p>Discuss a phone or your order.</p>{phone ? <a href={`tel:${phone}`}>{phone}</a> : <p>Phone details are not available yet.</p>}</section>
      <section className="information-card"><Mail size={22} /><h2>Email us</h2><p>Include your order reference if you have one.</p>{shop.data?.email ? <a href={`mailto:${shop.data.email}`}>{shop.data.email}</a> : <p>Email details are not available yet.</p>}</section>
      <section className="information-card"><MapPin size={22} /><h2>Visit our shop</h2><p>Walk-in customers are welcome. Come in to explore phones and speak with us in person.</p><p>{address || 'Contact the shop for location and opening hours before visiting.'}</p>{address && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noreferrer">Find on Google Maps <ArrowUpRight size={16} /></a>}</section>
    </div>}
    {address && <section className="information-card shop-location" aria-labelledby="shop-location-heading">
      <h2 id="shop-location-heading">Find our physical shop</h2>
      <p>Visit us at {address}. Walk in for help choosing your next phone.</p>
      <iframe title="Afritek Gadget Spot shop location" src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`} width="100%" height="360" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen style={{ border: 0, borderRadius: 8 }} />
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noreferrer">Open shop location in Google Maps <ArrowUpRight size={16} /></a>
    </section>}
    <div className="contact-layout"><section className="information-card contact-form"><MessageCircle size={24} /><h2>Start a WhatsApp conversation</h2><p>This form prepares a message. You’ll review and send it in WhatsApp.</p>
      <form onSubmit={submit}>{[['name', 'Your Name', 'text', 120], ['email', 'Your Email (optional)', 'email', 254], ['subject', 'Subject', 'text', 120]].map(([name, label, type, max]) => <label key={name} htmlFor={`contact-${name}`}>{label}<input id={`contact-${name}`} type={type} maxLength={max} required={name !== 'email'} autoComplete={name === 'subject' ? 'off' : name} value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} /></label>)}
      <label htmlFor="contact-message"><span id="message-label">Message</span><textarea aria-labelledby="message-label" id="contact-message" required maxLength={1000} rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us the phone you’re interested in, or include your order reference." /></label>
      <button className="solid-button" disabled={!phone} type="submit">Open WhatsApp draft</button>
      {!phone && <p className="field-help">WhatsApp is available once the shop’s phone details have loaded.</p>}
      {notice && <p role="status" className="draft-notice">{notice}</p>}</form>
    </section><section className="shopping-questions"><p className="eyebrow">GOOD TO KNOW</p><h2>Before you order</h2>{[
      ['How do I pay?', 'Pay cash on delivery. No online payment is required.'],
      ['How much is delivery?', 'We agree the delivery fee and timing with you before confirming your order. The fee is separate from the phone price.'],
      ['What happens after I place an order?', 'The shop contacts you to confirm availability and delivery arrangements with our rider. Keep your order reference for any questions.'],
      ['What about warranty and returns?', 'Ask the shop about the terms for your specific phone before ordering.']
    ].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}<Link className="text-button" to="/shop">Back to shopping →</Link></section></div>
  </div></div>;
}
