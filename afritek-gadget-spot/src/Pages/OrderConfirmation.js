import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { RECEIPT_KEY, readSession, receiptValid } from '../lib/checkout';
import { money } from '../lib/api';
export default function OrderConfirmation() {
  const location = useLocation();
  const receipt = location.state?.receipt || readSession(RECEIPT_KEY);
  if (!receiptValid(receipt)) return <div className="pt-32 pb-20 px-6 text-white text-center"><h1 className="text-3xl font-bold mb-4">No order receipt available</h1><p>Opening this page does not place an order.</p><Link to="/checkout" className="underline inline-block mt-6">Return to checkout</Link></div>;
  return <div className="pt-32 pb-20 px-6 max-w-3xl mx-auto text-white"><div className="bg-[#111827] rounded-3xl border border-gray-800 p-6 sm:p-10">
    <CheckCircle size={56} className="text-green-400 mb-5" /><h1 className="text-3xl font-bold mb-4">Order received</h1><p>Thank you. We will contact you to agree availability, delivery and the final amount.</p>
    <dl className="space-y-5 my-8"><div><dt className="text-gray-300">Order reference</dt><dd className="text-2xl font-bold break-words">{receipt.reference}</dd></div><div><dt className="text-gray-300">Subtotal</dt><dd>{money(receipt.subtotalMinor)}</dd></div><div><dt className="text-gray-300">Delivery fee</dt><dd>To be confirmed</dd></div><div><dt className="text-gray-300">Payment</dt><dd>Cash on delivery — no payment collected online</dd></div></dl>
    <p>Your order is awaiting confirmation by the shop.</p><div className="flex flex-wrap gap-4 mt-8"><button onClick={() => window.print()} className="bg-teal-700 px-5 py-3 rounded-lg">Print receipt</button><Link to="/shop" className="border border-gray-500 px-5 py-3 rounded-lg">Continue shopping</Link><Link to="/contact" className="underline px-5 py-3">Contact the shop</Link></div>
  </div></div>;
}
