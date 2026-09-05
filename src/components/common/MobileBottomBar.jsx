// src/components/common/MobileBottomBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';

export const MobileBottomBar = () => {
  const location = useLocation();
  const { 
    cartItemCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen 
  } = useStore();

  const isHome = location.pathname === '/';
  const isShop = location.pathname.startsWith('/shop') || location.pathname.startsWith('/collections');
  const isWishlist = location.pathname === '/wishlist';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 dark:bg-[#0A0A0C]/95 backdrop-blur-xl border-t border-brand-border dark:border-brand-borderDark py-2 px-3 safe-area-pb shadow-lg">
      <div className="flex items-center justify-around">
        <Link
          to="/"
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors cursor-pointer ${
            isHome ? 'text-brand-red font-bold' : 'text-brand-grey hover:text-brand-black dark:hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-mono">Home</span>
        </Link>

        <Link
          to="/shop"
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors cursor-pointer ${
            isShop ? 'text-brand-red font-bold' : 'text-brand-grey hover:text-brand-black dark:hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-mono">Catalog</span>
        </Link>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-1 p-1.5 text-brand-grey hover:text-brand-red transition-colors cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-mono">Search</span>
        </button>

        <Link
          to="/wishlist"
          className={`flex flex-col items-center gap-1 p-1.5 transition-colors relative cursor-pointer ${
            isWishlist ? 'text-brand-red font-bold' : 'text-brand-grey hover:text-brand-black dark:hover:text-white'
          }`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-mono">Saved</span>
          {wishlist.length > 0 && (
            <span className="absolute top-0.5 right-2 w-3.5 h-3.5 rounded-full bg-brand-red text-white text-[9px] font-mono font-bold flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 p-1.5 text-brand-black dark:text-white transition-colors relative cursor-pointer hover:text-brand-red"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-mono">Bag</span>
          {cartItemCount > 0 && (
            <span className="absolute top-0.5 right-2 w-4 h-4 rounded-full bg-brand-red text-white text-[9px] font-mono font-bold flex items-center justify-center shadow">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
