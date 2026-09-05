// src/components/wishlist/WishlistView.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { Heart, Trash2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export const WishlistView = () => {
  const { 
    wishlist, 
    toggleWishlist, 
    moveWishlistToCart, 
    formatPrice 
  } = useStore();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="pt-28 pb-24 bg-brand-bg dark:bg-brand-bgDark min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-brand-border dark:border-brand-borderDark flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-red uppercase tracking-widest mb-2 font-bold">
              <Heart className="w-4 h-4 fill-brand-red text-brand-red" />
              <span>SAVED ARCHIVAL SELECTIONS</span>
            </div>
            <h1 className="font-syne text-3xl sm:text-5xl font-extrabold text-brand-black dark:text-white tracking-tight uppercase">
              YOUR WISHLIST ({wishlist.length})
            </h1>
            <p className="text-xs sm:text-sm text-brand-grey dark:text-zinc-400 mt-2 font-light">
              Tirupur cotton silhouettes reserved in your private vault. Limited lot availability.
            </p>
          </div>

          {savedProducts.length > 0 && (
            <button
              onClick={() => {
                savedProducts.forEach((p) => moveWishlistToCart(p.id, 'L'));
              }}
              className="btn-anarthak-red text-xs py-3 px-6 cursor-pointer flex items-center gap-2 uppercase font-bold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>MOVE ALL TO SHOPPING BAG</span>
            </button>
          )}
        </div>

        {/* Content */}
        {savedProducts.length === 0 ? (
          <div className="text-center py-24 bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-8 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-bg dark:bg-brand-black border border-brand-border dark:border-brand-borderDark flex items-center justify-center mx-auto text-brand-grey">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-syne text-xl font-bold text-brand-black dark:text-white uppercase">Your Wishlist is Empty</h3>
            <p className="text-xs text-brand-grey dark:text-zinc-400 leading-relaxed">
              Save your preferred heavyweight boxy silhouettes to track drop restocks and limited numbered editions.
            </p>
            <div className="pt-2">
              <Link
                to="/shop"
                className="btn-anarthak-red inline-block text-xs py-3 px-8 uppercase font-mono font-bold"
              >
                Explore Current Drop
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <div key={product.id} className="relative flex flex-col justify-between">
                <ProductCard product={product} />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => moveWishlistToCart(product.id, 'L')}
                    className="flex-1 py-2 px-3 bg-brand-black dark:bg-zinc-800 hover:bg-brand-red dark:hover:bg-brand-red text-white border border-brand-border dark:border-brand-borderDark rounded text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 bg-brand-surface dark:bg-brand-surfaceDark hover:bg-red-500/20 text-brand-grey hover:text-red-500 border border-brand-border dark:border-brand-borderDark rounded transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
