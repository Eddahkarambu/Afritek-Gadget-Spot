import VisitShop from '../components/VisitShop';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api, ApiError, money } from '../lib/api';
import { DRAFT_KEY, checkoutDraft, saveCheckoutDraft, PENDING_KEY, RECEIPT_KEY, pendingOrder, receiptValid, normalizePhone } from '../lib/checkout';
import RequestState from '../components/RequestState';

const fields = [
  ['customerName', 'Full name', 'text', 120, 2, 'name'],
  ['phone', 'Kenyan mobile number', 'tel', 30, 10, 'tel'],
  ['area', 'Area or town', 'text', 120, 2, 'address-level2'],
  ['address', 'Delivery address or landmark', 'text', 500, 3, 'street-address'],
];
export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [pending, setPending] = useState(pendingOrder);
  const [form, setForm] = useState(() => pendingOrder() || checkoutDraft());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const busy = useRef(false);
  const [receipt, setReceipt] = useState(null);
  useEffect(() => { if (!receipt) saveCheckoutDraft(form); }, [form, receipt]);
  const subtotal = cart.reduce((sum, item) => sum + item.priceMinor * item.quantity, 0);

  async function submit(event) {
    event.preventDefault();
    if (busy.current || receipt) return;
    setError('');
    const phone = normalizePhone(form.phone);
    if (!pending && !/^\+254[17]\d{8}$/.test(phone)) { setError('Enter a Kenyan mobile number, for example 0712 345 678.'); return; }
    busy.current = true;
    setLoading(true);
    let body = pending;
    try {
      if (!body) {
        if (!cart.length || !Number.isSafeInteger(subtotal) || subtotal > 2000000000) throw new ApiError('Please review your cart before submitting.', 400);
        body = { requestId: crypto.randomUUID(), customerName: form.customerName.trim(), phone, area: form.area.trim(), address: form.address.trim(), instructions: form.instructions.trim(), items: cart.map(item => ({ variantId: item.id, quantity: item.quantity, expectedUnitPriceMinor: item.priceMinor })) };
        // Persist before sending. A reload or uncertain network response must reuse this exact request.
        sessionStorage.setItem(PENDING_KEY, JSON.stringify(body));
        setPending(body);
      }
      const result = await api('/orders', { method: 'POST', body: JSON.stringify(body) });
      if (!receiptValid(result)) throw new ApiError('Unexpected order response. Retry to retrieve the receipt for this same request.');
      setReceipt(result);
      try { sessionStorage.removeItem(DRAFT_KEY); sessionStorage.setItem(RECEIPT_KEY, JSON.stringify(result)); sessionStorage.removeItem(PENDING_KEY); } catch { /* The receipt remains visible in memory. */ }
      clearCart();
      navigate('/order-confirmation', { replace: true, state: { receipt: result } });
    } catch (error) {
      const definitive = error instanceof ApiError && [400, 403, 404, 409, 413, 422, 429].includes(error.status);
      if (definitive) { setPending(null); try { sessionStorage.removeItem(PENDING_KEY); } catch { /* no saved state */ } }
      setError(error instanceof ApiError ? error.message : 'Allow session storage in your browser before placing an order. Your order has not been sent.');
    } finally { busy.current = false; setLoading(false); }
  }
  if (!cart.length && !pending) return <div className="pt-32 pb-20 px-6 text-gray-900 text-center"><h1 className="text-3xl font-bold mb-5">Your cart is empty</h1><Link to="/shop" className="underline">Continue shopping</Link></div>;
  return <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto text-gray-900">
    <Link to="/cart" className="underline text-teal-800">Back to cart</Link><h1 className="text-3xl sm:text-4xl font-bold my-8">Checkout details</h1>
    {!pending && <VisitShop />}
    <div><form onSubmit={submit} className="bg-white p-5 sm:p-8 rounded-3xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Contact and delivery</h2>
      {pending && <p role="status" className="p-4 mb-5 border border-cyan-500 rounded-lg">This order request is awaiting a receipt. Retry the same request to check its result. Keep these details unchanged until we know whether it was received.</p>}
      <fieldset disabled={loading || !!pending} className="space-y-5 disabled:opacity-75">
        {fields.map(([name, label, type, maxLength, minLength, autoComplete]) => <label key={name} className="block">{label}<input required name={name} type={type} maxLength={maxLength} minLength={minLength} autoComplete={autoComplete} value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} className="block mt-2 w-full bg-white border border-gray-400 text-gray-900 p-3 rounded-lg" /></label>)}
        <label className="block">Delivery instructions (optional)<textarea maxLength={1000} value={form.instructions || ''} onChange={e => setForm({ ...form, instructions: e.target.value })} className="block mt-2 w-full bg-white border border-gray-400 text-gray-900 p-3 rounded-lg" /></label>
      </fieldset>
      <p className="mt-6">We use these details to contact you and arrange delivery of this order.</p>
      {error && <div role="alert" className="border border-red-400 rounded-lg p-4 mt-5"><p>{error}</p>{!pending && <Link to="/cart" className="underline">Review cart prices and availability</Link>}</div>}
      {loading && <RequestState loading />}
      <section aria-labelledby="order-summary-heading" className="bg-teal-50 rounded-2xl p-5 border border-teal-200 mt-6"><h2 id="order-summary-heading" className="text-2xl font-bold mb-6">Order summary</h2>
      {pending ? <p>The saved request contains {pending.items.reduce((sum, item) => sum + item.quantity, 0)} phone(s).</p> : cart.map(item => <div className="border-b border-gray-200 py-4" key={item.id}><p>{item.name}</p><p className="text-gray-600 text-sm">{item.specs} × {item.quantity}</p><p>{money(item.priceMinor * item.quantity)}</p></div>)}
      <p className="text-xl font-bold mt-6">Subtotal: {money(pending ? pending.items.reduce((sum, item) => sum + item.expectedUnitPriceMinor * item.quantity, 0) : subtotal)}</p>
      <p className="mt-4">Delivery fee to be confirmed.</p><p className="mt-4">Pay cash on delivery. We will call you to agree availability, delivery arrangements and the final amount before confirming your order.</p>
    </section>
      <button disabled={loading || !!receipt} type="submit" className="w-full mt-6 text-white bg-teal-700 hover:bg-teal-800 py-4 rounded-xl font-bold disabled:opacity-50">{loading ? 'Waiting for order receipt…' : pending ? 'Retry same order request' : 'Place order — cash on delivery'}</button>
    </form></div>
  </div>;
}
