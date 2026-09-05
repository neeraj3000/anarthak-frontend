// src/components/search/SearchModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { Search, X, ArrowRight, Sparkles, Clock, TrendingUp } from 'lucide-react';

export const SearchModal = () => {
  const navigate = useNavigate();
  const { isSearchOpen, setIsSearchOpen, formatPrice } = useStore();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Tirupur 320 GSM', 'Kaal Chakra', 'Acid Wash', 'Manifesto Puff']);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fit.toLowerCase().includes(q) ||
          p.specs.fabric.toLowerCase().includes(q) ||
          p.specs.weight.toLowerCase().includes(q) ||
          p.colors.some((c) => c.name.toLowerCase().includes(q))
        );
      });

  const handleSelectProduct = (productId) => {
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches((prev) => [query.trim(), ...prev.slice(0, 4)]);
    }
    navigate(`/product/${productId}`);
    setIsSearchOpen(false);
  };

  const handleTagClick = (tag) => {
    setQuery(tag);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center pt-16 sm:pt-24 px-4 pb-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#141418] border border-brand-border dark:border-brand-borderDark rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] animate-fade-in text-brand-black dark:text-white">
        {/* Search Header Input */}
        <div className="p-4 sm:p-6 border-b border-brand-border dark:border-brand-borderDark flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-red shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by fabric, Tirupur cotton, GSM, cut, drop..."
            className="w-full bg-transparent text-brand-black dark:text-white placeholder-brand-grey font-body text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-brand-grey hover:text-brand-black dark:hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="hidden sm:inline-flex px-2.5 py-1 text-[11px] font-mono text-brand-grey border border-brand-border dark:border-brand-borderDark rounded hover:border-brand-red"
          >
            ESC
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {query.trim() === '' ? (
            <>
              {/* Recent Searches */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-grey mb-3">
                  <Clock className="w-3.5 h-3.5 text-brand-red" />
                  <span>Recent Inquiries</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleTagClick(item)}
                      className="px-3 py-1.5 rounded-full bg-brand-bg dark:bg-[#1B1B22] hover:bg-brand-red hover:text-white text-xs text-brand-black dark:text-zinc-300 border border-brand-border dark:border-brand-borderDark transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Categories */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-grey mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-red" />
                  <span>Trending Categories</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['Tirupur 320+ GSM', 'Oversized Boxy', 'Kutch Acid Wash', 'Anti-Bacon Collar'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleTagClick(cat)}
                      className="p-3 bg-brand-bg dark:bg-[#1B1B22] border border-brand-border dark:border-brand-borderDark rounded-lg text-left hover:border-brand-red transition-colors cursor-pointer"
                    >
                      <p className="text-xs font-semibold">{cat}</p>
                      <span className="text-[10px] font-mono text-brand-red font-bold">Explore &rarr;</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Curated Pieces */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-grey mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                  <span>Anarthak Highlights</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PRODUCTS.slice(0, 2).map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.id)}
                      className="flex items-center gap-3.5 p-3 rounded-lg bg-brand-bg dark:bg-[#181820] border border-brand-border dark:border-brand-borderDark hover:border-brand-red cursor-pointer transition-colors"
                    >
                      <img src={prod.images[0]} alt={prod.name} className="w-14 h-16 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="anarthak-tag text-[9px] py-0">{prod.gsm} GSM</span>
                          <span className="text-[10px] font-mono text-brand-red font-bold">{prod.fit}</span>
                        </div>
                        <h4 className="text-xs font-bold truncate">{prod.name}</h4>
                        <p className="text-xs font-mono text-brand-grey">{formatPrice(prod.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Results View */
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-brand-grey mb-4 pb-2 border-b border-brand-border dark:border-brand-borderDark">
                <span>FOUND {filteredProducts.length} PIECES MATCHING "{query.toUpperCase()}"</span>
                <span>ESC to close</span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <p className="text-sm text-brand-grey">No garments found matching your query.</p>
                  <p className="text-xs font-mono text-brand-grey">
                    Try searching for "Kaal Chakra", "Tirupur", "320 GSM", or "Acid Wash".
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod.id)}
                      className="flex items-center justify-between p-3 rounded-lg bg-brand-bg dark:bg-[#181820] border border-brand-border dark:border-brand-borderDark hover:border-brand-red cursor-pointer transition-all hover:translate-x-1"
                    >
                      <div className="flex items-center gap-3.5">
                        <img src={prod.images[0]} alt={prod.name} className="w-12 h-14 rounded object-cover" />
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="anarthak-tag text-[9px] py-0">{prod.gsm} GSM</span>
                            <span className="text-[10px] font-mono text-brand-grey">{prod.edition}</span>
                          </div>
                          <h4 className="text-xs font-bold">{prod.name}</h4>
                          <p className="text-[11px] text-brand-grey">{prod.subtitle}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-mono font-bold block">
                          {formatPrice(prod.price)}
                        </span>
                        <span className="text-[10px] font-mono text-brand-red font-bold flex items-center justify-end gap-1">
                          Inspect <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
