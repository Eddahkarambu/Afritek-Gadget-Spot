import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { SHOP_ADDRESS, SHOP_MAP_QUERY, SHOP_HOURS } from '../lib/shopLocation';
import useResource from '../hooks/useResource';
import RequestState from '../components/RequestState';
export default function Contact() {
  const shop = useResource('/shop');
  const [params] = useSearchParams();
  const { hash } = useLocation();
  useEffect(() => { if (!shop.loading && hash === '#shop-location') document.getElementById('shop-location')?.scrollIntoView(); }, [shop.loading, hash]);
  useEffect(() => {
    if (!shop.loading && hash === '#contact-message') {
      const field = document.getElementById('contact-message');
      field?.focus({ preventScroll: true });
      field?.scrollIntoView({ block: 'center' });
    }
  }, [shop.loading, hash]);
  const [message, setMessage] = useState(() => (params.get('message') || '').slice(0, 1000));
  const [notice, setNotice] = useState('');
  const phone = shop.data?.phone;
  const configuredAddress = shop.data?.address?.trim();
  const address = configuredAddress || SHOP_ADDRESS;
  const mapQuery = !configuredAddress || configuredAddress === SHOP_ADDRESS ? SHOP_MAP_QUERY : configuredAddress;
  function submit(event) {
    event.preventDefault();
    if (!phone || !message.trim()) return;
    const text = message.trim();
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setNotice('Your WhatsApp draft is ready. Send it in WhatsApp to contact us. If a new tab did not open, allow pop-ups and try again.');
  }
  return <div className="editorial-page"><div className="store-container">
    <header className="page-intro"><p className="eyebrow">VISIT OUR SHOP</p><h1>Walk in. Find your phone.</h1><p>Visit us at The Bazaar, Moi Avenue, Nairobi to browse and buy in person. No online order is needed. You can also contact us about a phone or delivery.</p></header>
    <RequestState {...shop} />
    {!shop.loading && !shop.error && <div className="contact-cards">
      <section className="information-card"><Phone size={22} /><h2>Call the shop</h2><p>Discuss a phone or your order.</p>{phone ? <a href={`tel:${phone}`}>{phone}</a> : <p>Phone details are not available yet.</p>}</section>
      <section className="information-card"><Mail size={22} /><h2>Email us</h2><p>Include your order reference if you have one.</p>{shop.data?.email ? <a href={`mailto:${shop.data.email}`}>{shop.data.email}</a> : <p>Email details are not available yet.</p>}</section>
      <section className="information-card"><MapPin size={22} /><h2>Visit our shop</h2><p>Walk-in customers are welcome. Come in to explore phones and speak with us in person.</p><p>{address || 'Contact the shop for location and opening hours before visiting.'}</p>{address && <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noreferrer">Find on Google Maps <ArrowUpRight size={16} /></a>}</section>
    </div>}
    {address && <section id="shop-location" className="information-card shop-location" aria-labelledby="shop-location-heading">
      <h2 id="shop-location-heading">Find our physical shop</h2>
      <p>Visit us at {address}. Walk in for help choosing your next phone.</p><p><strong>Opening hours:</strong> {SHOP_HOURS}. Contact us to confirm opening days and holiday hours.</p>
      <iframe title="Afritek Gadget Spot shop location" src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`} width="100%" height="360" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen style={{ border: 0, borderRadius: 8 }} />
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`} target="_blank" rel="noreferrer">Open shop location in Google Maps <ArrowUpRight size={16} /></a>
    </section>}
    <div className="contact-layout"><section className="information-card contact-form"><MessageCircle size={24} /><h2>Start a WhatsApp conversation</h2><p>This form prepares a message. You’ll review and send it in WhatsApp.</p>
      <form onSubmit={submit}>
      <label htmlFor="contact-message"><span id="message-label">Message</span><textarea aria-labelledby="message-label" id="contact-message" required maxLength={1000} rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us the phone you’re interested in, or include your order reference." /></label>
      <button className="solid-button" disabled={!phone || !message.trim()} type="submit">Open WhatsApp draft</button>
      {!phone && <p className="field-help">WhatsApp is available once the shop’s phone details have loaded.</p>}
      {notice && <p role="status" className="draft-notice">{notice}</p>}</form>
    </section><section className="shopping-questions"><p className="eyebrow">GOOD TO KNOW</p><h2>Before you order</h2>{[
      ['Do I need to order online before visiting?', 'No. Walk in to browse and buy at our Bazaar shop. Contact us before travelling to confirm opening days and your preferred phone’s availability.'],
      ['How do I pay for a delivery order?', 'Pay cash on delivery. No online payment is required.'],
      ['How much is delivery?', 'We agree the delivery fee and timing with you before confirming your order. The fee is separate from the phone price.'],
      ['What happens after I place an order?', 'The shop contacts you to confirm availability and delivery arrangements with our rider. Keep your order reference for any questions.'],
      ['What about warranty and returns?', 'Ask the shop about the terms for your specific phone before ordering.']
    ].map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}<Link className="text-button" to="/shop">Back to shopping →</Link></section></div>
  </div></div>;
}
