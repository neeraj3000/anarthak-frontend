// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ArrowRight,
  Flame
} from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { 
    cartItemCount, 
    wishlist, 
    setIsCartOpen, 
    setIsSearchOpen, 
    theme, 
    toggleTheme,
    setActiveCategoryFilter
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'All Drops', path: '/shop', category: 'all' },
    { label: '300+ GSM Heavyweight', path: '/shop', category: 'Heavyweight' },
    { label: 'Oversized Protocol', path: '/shop', category: 'Oversized' },
    { label: 'Anarthak Graphics', path: '/shop', category: 'Graphic Tees' },
    { label: 'Kutch Acid Wash', path: '/shop', category: 'Acid Washed' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-zinc-100 text-zinc-700 border-b border-zinc-200 dark:bg-[#0A0A0C] dark:text-[#A1A1AA] dark:border-[#27272A] py-1.5 text-xs font-mono overflow-hidden transition-colors">
        <div className="container-custom flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-[11px] text-[#FF1E27]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-ping"></span>
            <span className="font-bold tracking-widest">DROP 01 LIVE: TIRUPUR HEAVYWEIGHT COTTONS</span>
          </div>
          
          <div className="mx-auto md:mx-0 text-center tracking-normal sm:tracking-widest text-[10px] sm:text-[11px] font-medium text-zinc-800 dark:text-zinc-300 px-2 truncate sm:overflow-visible">
            <span className="hidden sm:inline">FREE EXPRESS BLUEDART SHIPPING ACROSS INDIA OVER ₹1,999 • COD AVAILABLE</span>
            <span className="inline sm:hidden">FREE BLUEDART SHIPPING OVER ₹1,999 • COD AVAILABLE</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px]">
            <span className="text-zinc-500 dark:text-zinc-400 font-semibold">19,000+ PINCODES COVERED</span>
            <Link to="/account" className="hover:text-[#FF1E27] dark:hover:text-white transition-colors">
              Patron Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-[#0A0A0C]/95 backdrop-blur-xl py-2.5 sm:py-3 shadow-md border-b border-zinc-200 dark:border-white/10' 
          : 'bg-white dark:bg-[#0A0A0C] backdrop-blur-md py-2.5 sm:py-3.5 border-b border-zinc-200 dark:border-white/10'
      }`}>
        <div className="container-custom flex items-center justify-between gap-2">
          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 sm:p-2 text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white focus:outline-none cursor-pointer shrink-0"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Desktop Links Left */}
          <div className="hidden lg:flex items-center space-x-6 text-xs font-mono uppercase tracking-[0.14em]">
            <Link
              to="/shop"
              onClick={() => setActiveCategoryFilter('all')}
              className={`transition-colors hover:text-[#FF1E27] ${
                location.pathname === '/shop' 
                  ? 'text-zinc-950 dark:text-white font-bold' 
                  : 'text-zinc-600 dark:text-zinc-300'
              }`}
            >
              Shop All
            </Link>
            <Link
              to="/shop"
              onClick={() => setActiveCategoryFilter('Heavyweight')}
              className="text-zinc-600 dark:text-zinc-300 hover:text-[#FF1E27] transition-colors"
            >
              300+ GSM Heavyweight
            </Link>
            <Link
              to="/shop"
              onClick={() => setActiveCategoryFilter('Oversized')}
              className="text-zinc-600 dark:text-zinc-300 hover:text-[#FF1E27] transition-colors"
            >
              Oversized
            </Link>
            <Link
              to="/shop"
              onClick={() => setActiveCategoryFilter('Graphic Tees')}
              className="text-zinc-600 dark:text-zinc-300 hover:text-[#FF1E27] transition-colors"
            >
              Graphics
            </Link>
          </div>

          {/* Brand Logo: Anarthak - Not like them */}
          <Link 
            to="/"
            className="flex flex-col items-center cursor-pointer group select-none text-center shrink min-w-0"
          >
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-editorial text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-[-0.04em] text-zinc-950 dark:text-white group-hover:text-[#FF1E27] transition-colors">
                ANARTHAK
              </span>
              <span className="inline-flex items-center justify-center px-1 sm:px-1.5 py-0.5 rounded bg-[#FF1E27] text-white text-[8px] sm:text-[9px] font-mono font-bold tracking-widest">
                अनर्थक
              </span>
            </div>
            <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.32em] text-[#FF1E27] font-bold whitespace-nowrap">
              NOT LIKE THEM
            </span>
          </Link>

          {/* Actions Right: Dark/Light Switcher, Search, Account, Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-800 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Search Trigger (hidden on mobile; available in bottom bar) */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex p-2 text-zinc-700 hover:text-[#FF1E27] dark:text-zinc-300 dark:hover:text-[#FF1E27] transition-colors cursor-pointer"
              title="Search collection (⌘K)"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Profile Link (hidden on mobile; accessible via drawer or bottom bar) */}
            <Link 
              to="/account"
              className="hidden sm:flex p-2 text-zinc-700 hover:text-[#FF1E27] dark:text-zinc-300 dark:hover:text-[#FF1E27] transition-colors"
              title="Patron Profile & Orders"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Link (hidden on mobile; available in bottom bar) */}
            <Link 
              to="/wishlist"
              className="hidden sm:flex p-2 text-zinc-700 hover:text-[#FF1E27] dark:text-zinc-300 dark:hover:text-[#FF1E27] transition-colors relative cursor-pointer"
              title="Saved Pieces"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF1E27] text-white text-[10px] font-bold flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 py-1.5 px-2.5 sm:py-2 sm:px-3.5 rounded bg-[#FF1E27] hover:bg-[#DC2626] text-white transition-all font-mono font-bold text-xs tracking-wider cursor-pointer shadow-md"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{cartItemCount}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-[#121215] text-zinc-900 dark:text-white border-r border-zinc-200 dark:border-white/10 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-zinc-200 dark:border-white/10">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-editorial text-xl font-black text-zinc-950 dark:text-white">ANARTHAK</span>
                    <span className="text-[10px] font-mono bg-[#FF1E27] text-white px-1 rounded">अनर्थक</span>
                  </div>
                  <p className="text-[10px] font-mono text-[#FF1E27] tracking-widest font-bold">NOT LIKE THEM</p>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <div className="py-6 space-y-4 font-mono text-xs uppercase tracking-wider">
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 tracking-[0.2em]">DROPS & SILHOUETTES</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => {
                      setActiveCategoryFilter(link.category);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between py-2.5 text-zinc-700 hover:text-[#FF1E27] dark:text-zinc-300 dark:hover:text-[#FF1E27] border-b border-zinc-100 dark:border-white/5"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </Link>
                ))}
              </div>

              {/* Theme toggle mobile */}
              <div className="pt-2 pb-4">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between py-3 px-4 bg-zinc-100 dark:bg-zinc-800 rounded text-xs font-mono cursor-pointer"
                >
                  <span>Active Theme: <strong className="uppercase text-[#FF1E27]">{theme}</strong></span>
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-800" />}
                </button>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-zinc-200 dark:border-white/10 space-y-3 font-mono">
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#FF1E27] text-white rounded text-xs font-bold uppercase tracking-wider"
              >
                <User className="w-4 h-4" />
                <span>Patron Account & Orders</span>
              </Link>
              <p className="text-center text-[10px] text-zinc-400 dark:text-zinc-500">
                © {new Date().getFullYear()} ANARTHAK (अनर्थक) • NOT LIKE THEM
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
