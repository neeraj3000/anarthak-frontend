// src/components/cart/FullCartView.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Heart, 
  Truck, 
  Tag, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';

export const FullCartView = () => {
  const navigate = useNavigate();

  const {
    cart,
    cartSubtotal,
    cartDiscount,
    shippingFee,
    cartTotal,
    cartItemCount,
    freeShippingRemaining,
    freeShippingProgress,
    updateQuantity,
    removeFromCart,
    toggleWishlist,
    activePromo,
    applyPromoCode,
    removePromoCode,
    formatPrice
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput('');
  };

  const recommendations = PRODUCTS.slice(0, 3);

  if (cart.length === 0) {
    return (
      <div className="pt-36 pb-24 text-center container-custom min-h-[70vh] flex flex-col items-center justify-center font-mono">
        <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto mb-4 text-zinc-600">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-editorial text-2xl sm:text-3xl font-black text-[var(--text-primary)] mb-2">Your shopping bag is empty</h2>
        <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto mb-6">
          Discover Drop 01 of 300+ GSM heavyweight Tirupur combed cotton silhouettes.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="btn-anarthak-red text-xs py-3.5 px-8 font-bold tracking-wider"
        >
          Explore Drop 01
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[var(--bg-primary)] min-h-screen font-mono transition-colors duration-200">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[var(--border-subtle)] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#FF1E27] uppercase tracking-widest mb-2 font-bold">
              <ShoppingBag className="w-4 h-4" />
              <span>SHOPPING BAG // ANARTHAK</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
              YOUR BAG ({cartItemCount} PIECES)
            </h1>
          </div>

          <Link
            to="/shop"
            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-4 rounded-xl mb-8 max-w-2xl">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Truck className="w-4 h-4 text-[#FF1E27]" />
              {freeShippingRemaining > 0 ? (
                <span>Add <strong className="text-[#FF1E27]">{formatPrice(freeShippingRemaining)}</strong> more for Free Bluedart Air Courier</span>
              ) : (
                <span className="text-[#FF1E27] font-bold">Free Pan-India Express Shipping Unlocked!</span>
              )}
            </span>
            <span className="text-zinc-500">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF1E27] to-[#DC2626] rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* 2-Col Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Table Left (8 cols) */}
          <div className="lg:col-span-8 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="divide-y divide-[var(--border-subtle)]">
              {cart.map((item) => (
                <div key={item.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-24 rounded-lg object-cover bg-zinc-900 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="hallmark-tag text-[9px] py-0">{item.gsm} GSM</span>
                        <span className="text-[10px] text-zinc-500">Tirupur Combed</span>
                      </div>
                      <h3 className="font-editorial text-sm font-bold text-[var(--text-primary)] mb-1">{item.name}</h3>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {item.color} • Size <strong className="text-[var(--text-primary)]">{item.size}</strong>
                      </p>
                      <span className="text-xs font-bold text-[var(--text-primary)] mt-1 block">
                        {formatPrice(item.price)} each
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[var(--border-subtle)]">
                    <div className="flex items-center bg-[var(--bg-primary)] border border-zinc-700 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-zinc-400 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[var(--text-primary)]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-zinc-400 hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-[var(--text-primary)] min-w-[70px] text-right">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          toggleWishlist(item.productId);
                          removeFromCart(item.id);
                        }}
                        className="p-1.5 text-zinc-500 hover:text-[#FF1E27] transition-colors"
                        title="Move to Wishlist"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals & Checkout Panel Right (4 cols) */}
          <div className="lg:col-span-4 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28">
            <h3 className="font-editorial text-lg font-black text-[var(--text-primary)] pb-4 border-b border-[var(--border-subtle)]">
              Order Valuation
            </h3>

            <div>
              {activePromo ? (
                <div className="flex items-center justify-between p-2.5 rounded bg-[#FF1E27]/10 border border-[#FF1E27]/30 text-xs text-[#FF1E27]">
                  <span className="font-bold">PROMO '{activePromo.code}' (-{activePromo.discountPercent}%)</span>
                  <button onClick={removePromoCode} className="hover:underline text-zinc-400">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code (NOTLIKETHEM)"
                    className="input-hallmark text-xs uppercase"
                  />
                  <button type="submit" className="btn-anarthak-dark py-2 px-3 text-xs font-bold">
                    Apply
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-2.5 text-xs text-[var(--text-secondary)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[var(--text-primary)] font-bold">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#FF1E27] font-bold">
                  <span>Rebellion Privilege</span>
                  <span>-{formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Bluedart Air Shipping</span>
                <span className="text-[var(--text-primary)]">
                  {shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-between text-base font-bold text-[var(--text-primary)]">
                <span className="font-editorial">TOTAL DUE</span>
                <span className="text-[#FF1E27]">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-anarthak-red w-full py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 bg-[var(--bg-primary)] rounded-lg border border-[var(--border-subtle)] text-[11px] text-zinc-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF1E27] shrink-0" />
              <span>Includes 5% GST • Cash on Delivery & UPI Supported.</span>
            </div>
          </div>
        </div>

        {/* Cross-Sell */}
        <div className="mt-24 pt-16 border-t border-[var(--border-subtle)]">
          <h3 className="font-editorial text-2xl font-black text-[var(--text-primary)] mb-8">
            YOU MAY ALSO APPRECIATE
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendations.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
