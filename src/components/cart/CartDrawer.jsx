// src/components/cart/CartDrawer.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Heart, 
  Truck, 
  Tag, 
  ShieldCheck 
} from 'lucide-react';

export const CartDrawer = () => {
  const navigate = useNavigate();

  const {
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput('');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleViewFullCart = () => {
    setIsCartOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 font-mono">
        <div className="w-screen max-w-md bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#FF1E27]" />
                <h3 className="font-editorial text-lg font-black text-[var(--text-primary)] tracking-wider">
                  SHOPPING BAG
                </h3>
                <span className="text-xs text-white bg-[#FF1E27] px-2 py-0.5 rounded font-bold">
                  {cartItemCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 text-zinc-400 hover:text-white rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                  <Truck className="w-3.5 h-3.5 text-[#FF1E27]" />
                  {freeShippingRemaining > 0 ? (
                    <span>Add <strong className="text-[#FF1E27]">{formatPrice(freeShippingRemaining)}</strong> for Free Bluedart Air</span>
                  ) : (
                    <span className="text-[#FF1E27] font-bold">Free Express Shipping Unlocked!</span>
                  )}
                </span>
                <span className="text-zinc-500">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FF1E27] to-[#DC2626] transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-editorial text-base font-bold text-[var(--text-primary)] mb-1">Your bag is empty</h4>
                  <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto">
                    Explore Drop 01 of 300+ GSM heavyweight combed cotton silhouettes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="btn-anarthak-red text-xs py-2.5 px-6 cursor-pointer"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex gap-4 transition-all"
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded bg-zinc-900 shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{item.name}</h4>
                        <span className="text-xs font-bold text-[var(--text-primary)] shrink-0">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[var(--text-secondary)]">
                        <span className="flex items-center gap-1">
                          <span 
                            className="w-2.5 h-2.5 rounded-full inline-block border border-zinc-700" 
                            style={{ backgroundColor: item.colorHex || '#333' }}
                          />
                          {item.color}
                        </span>
                        <span>•</span>
                        <span className="font-bold text-[#FF1E27]">Size {item.size}</span>
                        <span>•</span>
                        <span>{item.gsm} GSM</span>
                      </div>
                    </div>

                    {/* Steppers and Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] mt-2">
                      <div className="flex items-center bg-[var(--bg-primary)] border border-zinc-700 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs text-[var(--text-primary)] font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            toggleWishlist(item.productId);
                            removeFromCart(item.id);
                          }}
                          className="text-zinc-500 hover:text-[#FF1E27] transition-colors p-1"
                          title="Save to Wishlist"
                        >
                          <Heart className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] space-y-4">
              {/* Promo code */}
              <div>
                {activePromo ? (
                  <div className="flex items-center justify-between p-2 rounded bg-[#FF1E27]/10 border border-[#FF1E27]/30 text-xs text-[#FF1E27]">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      PROMO '{activePromo.code}' (-{activePromo.discountPercent}%)
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-xs hover:underline text-zinc-400 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Try NOTLIKETHEM or DESI20"
                      className="input-hallmark text-xs uppercase"
                    />
                    <button
                      type="submit"
                      className="btn-anarthak-dark py-1.5 px-3 text-xs font-bold"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
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
                <div className="flex justify-between text-sm font-bold text-[var(--text-primary)] pt-2 border-t border-zinc-800">
                  <span className="font-editorial">TOTAL DUE</span>
                  <span className="text-[#FF1E27]">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="btn-anarthak-red w-full py-3.5 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleViewFullCart}
                  className="w-full text-center text-xs text-zinc-400 hover:text-white py-1 transition-colors hover:underline"
                >
                  View Full Shopping Bag Page &rarr;
                </button>
              </div>

              <p className="text-[10px] text-zinc-500 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#FF1E27]" />
                GST Included • COD & Instant UPI Available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
