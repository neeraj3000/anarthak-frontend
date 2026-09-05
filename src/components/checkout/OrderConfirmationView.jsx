// src/components/checkout/OrderConfirmationView.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  CreditCard, 
  Printer, 
  ArrowRight, 
  Clock, 
  ShieldCheck,
  Sparkles 
} from 'lucide-react';

export const OrderConfirmationView = () => {
  const navigate = useNavigate();
  const { activeOrder, orders, formatPrice } = useStore();

  const order = activeOrder || orders[0];

  if (!order) {
    return (
      <div className="pt-36 pb-24 text-center container-custom">
        <h2 className="text-xl font-bold text-brand-black dark:text-white mb-4">No active order detected</h2>
        <Link to="/shop" className="btn-anarthak-red text-xs py-3 px-6 uppercase font-mono font-bold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-24 bg-brand-bg dark:bg-brand-bgDark min-h-screen">
      <div className="container-custom max-w-4xl mx-auto">
        {/* Success Splash Card */}
        <div className="bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-3xl p-8 sm:p-12 text-center shadow-2xl mb-12 animate-fade-in relative overflow-hidden">
          {/* Background red glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-16 h-16 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center mx-auto mb-6 text-brand-red">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono text-brand-red uppercase tracking-widest block mb-2 font-bold">
            अनर्थक ALLOCATION CONFIRMED
          </span>

          <h1 className="font-syne text-3xl sm:text-5xl font-extrabold text-brand-black dark:text-white tracking-tight mb-4 uppercase">
            Dhanyavaad for Your Patronage
          </h1>

          <p className="text-xs sm:text-sm text-brand-grey dark:text-zinc-300 max-w-lg mx-auto font-light leading-relaxed mb-6">
            Your piece has been registered in the Anarthak drop records. Our team in Tirupur is packaging your heavyweight streetwear garment with our signature anti-counterfeit seal.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-brand-bg dark:bg-brand-black border border-brand-border dark:border-brand-borderDark rounded-full px-6 py-2.5 text-xs font-mono text-brand-grey dark:text-zinc-300">
            <span>ORDER NUMBER: <strong className="text-brand-red">{order.id}</strong></span>
            <span>•</span>
            <span>BLUEDART AWB: <strong className="text-brand-black dark:text-white">{order.trackingNumber}</strong></span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              to="/account"
              className="btn-anarthak-red text-xs py-3 px-6 uppercase font-bold tracking-wider flex items-center gap-2"
            >
              <span>TRACK ORDER IN ACCOUNT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={handlePrint}
              className="btn-anarthak-dark text-xs py-3 px-6 uppercase font-mono tracking-wider cursor-pointer flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT TAX INVOICE</span>
            </button>
          </div>
        </div>

        {/* Visual Live Order Tracking Timeline */}
        <div className="bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-6 sm:p-8 mb-12 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border dark:border-brand-borderDark">
            <div>
              <h3 className="font-syne text-lg font-bold text-brand-black dark:text-white uppercase">
                Live Indian Courier Tracking
              </h3>
              <p className="text-xs font-mono text-brand-grey">Courier Partner: {order.carrier || 'Bluedart Express'}</p>
            </div>
            <span className="text-xs font-mono text-brand-red bg-brand-red/10 px-2.5 py-1 rounded border border-brand-red/20 font-bold">
              STATUS: {order.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {order.timeline.map((step, idx) => (
              <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
                  step.completed 
                    ? 'bg-brand-red text-white shadow-lg ring-2 ring-brand-red/30' 
                    : 'bg-brand-border dark:bg-zinc-800 text-brand-grey'
                }`}>
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-black dark:text-white">{step.step}</h4>
                  <p className="text-[10px] font-mono text-brand-grey">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Destination & Logistics */}
          <div className="bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-6 space-y-4">
            <h3 className="font-syne text-base font-bold text-brand-black dark:text-white uppercase border-b border-brand-border dark:border-brand-borderDark pb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-red" />
              Delivery Destination
            </h3>

            <div className="space-y-1 text-xs font-mono text-brand-grey dark:text-zinc-300">
              <p className="font-bold text-brand-black dark:text-white">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
              <p className="text-brand-grey">{order.shippingAddress.country || 'India'}</p>
              <p className="text-brand-black dark:text-white font-bold pt-1">{order.shippingAddress.phone}</p>
            </div>

            <div className="pt-3 border-t border-brand-border dark:border-brand-borderDark text-xs font-mono">
              <span className="text-brand-grey block mb-0.5">SHIPPING SPEED:</span>
              <span className="text-brand-black dark:text-white font-bold">{order.shippingMethod?.name || 'Bluedart Express'}</span>
            </div>
          </div>

          {/* Payment & Valuation */}
          <div className="bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-6 space-y-4">
            <h3 className="font-syne text-base font-bold text-brand-black dark:text-white uppercase border-b border-brand-border dark:border-brand-borderDark pb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-brand-red" />
              Payment Details
            </h3>

            <div className="space-y-2 text-xs font-mono text-brand-grey">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-brand-black dark:text-white">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-brand-red font-bold">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-brand-black dark:text-white">{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Integrated GST (12%)</span>
                <span className="text-brand-black dark:text-white">{formatPrice(order.tax)}</span>
              </div>
              <div className="pt-3 border-t border-brand-border dark:border-brand-borderDark flex justify-between font-bold text-sm text-brand-black dark:text-white">
                <span className="font-syne uppercase">PAID TOTAL</span>
                <span className="text-brand-red">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-6 mb-12">
          <h3 className="font-syne text-base font-bold text-brand-black dark:text-white uppercase mb-4">
            Ordered Garments ({order.items.length})
          </h3>
          <div className="divide-y divide-brand-border dark:divide-brand-borderDark">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-14 h-16 rounded object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-brand-black dark:text-white">{item.name}</h4>
                    <p className="text-[11px] font-mono text-brand-grey">
                      {item.color} • Size {item.size} • Qty {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-brand-black dark:text-white">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs font-mono text-brand-grey hover:text-brand-red uppercase tracking-widest hover:underline"
          >
            &larr; Return to Anarthak Home
          </Link>
        </div>
      </div>
    </div>
  );
};
