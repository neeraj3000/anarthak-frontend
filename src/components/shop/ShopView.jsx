// src/components/shop/ShopView.jsx
import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS, CATEGORIES, FITS, GSM_WEIGHTS, SIZES } from '../../data/products';
import { ProductCard } from './ProductCard';
import { 
  SlidersHorizontal, 
  X, 
  RotateCcw,
  Sparkles 
} from 'lucide-react';

export const ShopView = () => {
  const { activeCategoryFilter, setActiveCategoryFilter, formatPrice } = useStore();

  // Filters
  const [selectedFit, setSelectedFit] = useState('all');
  const [selectedGsm, setSelectedGsm] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [maxPrice, setMaxPrice] = useState(3500);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sort & Layout
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeCategoryFilter !== 'all') count++;
    if (selectedFit !== 'all') count++;
    if (selectedGsm !== 'all') count++;
    if (selectedSize !== 'all') count++;
    if (maxPrice < 3500) count++;
    if (inStockOnly) count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [activeCategoryFilter, selectedFit, selectedGsm, selectedSize, maxPrice, inStockOnly, searchQuery]);

  const clearAllFilters = () => {
    setActiveCategoryFilter('all');
    setSelectedFit('all');
    setSelectedGsm('all');
    setSelectedSize('all');
    setMaxPrice(3500);
    setInStockOnly(false);
    setSearchQuery('');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (activeCategoryFilter !== 'all' && product.category !== activeCategoryFilter) {
        return false;
      }
      if (selectedFit !== 'all' && product.fit !== selectedFit) {
        return false;
      }
      if (selectedGsm !== 'all' && product.gsm !== Number(selectedGsm)) {
        return false;
      }
      if (selectedSize !== 'all' && !product.sizes.includes(selectedSize)) {
        return false;
      }
      if (product.price > maxPrice) {
        return false;
      }
      if (inStockOnly && product.stock <= 0) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match = 
          product.name.toLowerCase().includes(q) ||
          product.subtitle.toLowerCase().includes(q) ||
          product.fit.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'gsm-high') return b.gsm - a.gsm;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeCategoryFilter, selectedFit, selectedGsm, selectedSize, maxPrice, inStockOnly, searchQuery, sortBy]);

  return (
    <div className="pt-28 pb-24 bg-[var(--bg-primary)] min-h-screen transition-colors duration-200">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-[var(--border-subtle)] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E27] uppercase tracking-widest mb-2 font-bold">
              <span>ANARTHAK CATALOG</span>
              <span>/</span>
              <span>TIRUPUR HEAVYWEIGHT COTTONS</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight">
              {activeCategoryFilter === 'all' 
                ? 'ALL STREET SILHOUETTES' 
                : activeCategoryFilter.toUpperCase()}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2 max-w-xl font-light font-mono">
              Engineered with 280–340 GSM combed cotton. Zero polyester blends, pre-shrunk cold washed, and guaranteed anti-bacon necklines.
            </p>
          </div>

          {/* Filter count & Reset */}
          <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-secondary)]">
            <span>SHOWING {filteredProducts.length} OF {PRODUCTS.length} SILHOUETTES</span>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 text-[#FF1E27] hover:underline cursor-pointer font-bold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-subtle)]">
          {/* Left: Mobile Filter & Search */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 py-2.5 px-4 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-primary)] cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#FF1E27]" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, fabric, or cut..."
              className="input-hallmark w-full sm:w-64 font-mono text-xs"
            />
          </div>

          {/* Right: Sort & Grid Switcher */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto font-mono text-xs">
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <span className="hidden sm:inline">SORT:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded px-3 py-2 text-xs text-[var(--text-primary)] font-mono focus:outline-none focus:border-[#FF1E27] cursor-pointer"
              >
                <option value="featured">Featured Drops</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="gsm-high">Fabric Weight (Heaviest GSM)</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Grid density switcher */}
            <div className="hidden md:flex items-center bg-[var(--bg-elevated)] p-1 rounded border border-[var(--border-subtle)] gap-1">
              {[2, 3, 4].map((cols) => (
                <button
                  key={cols}
                  onClick={() => setGridCols(cols)}
                  className={`px-2 py-1 rounded text-xs font-mono font-bold transition-colors ${
                    gridCols === cols ? 'bg-[#FF1E27] text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {cols} Col
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <aside aria-label="Catalog Filters" className="hidden lg:block lg:col-span-3 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-xl p-6 space-y-6 sticky top-28 font-mono">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
              <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF1E27]" />
                Filter Pieces
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-[#FF1E27] hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category */}
            <div>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-3 font-bold">Category</p>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryFilter(cat.id)}
                    className={`w-full text-left py-1.5 px-2 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      activeCategoryFilter === cat.id
                        ? 'bg-[#FF1E27]/15 text-[#FF1E27] font-bold border border-[#FF1E27]/40'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-zinc-500">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cut / Fit */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-3 font-bold">Silhouette / Fit</p>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedFit('all')}
                  className={`w-full text-left py-1 px-2 rounded text-xs cursor-pointer ${
                    selectedFit === 'all' ? 'text-[#FF1E27] font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  All Fits
                </button>
                {FITS.map((fit) => (
                  <button
                    key={fit}
                    onClick={() => setSelectedFit(fit)}
                    className={`w-full text-left py-1 px-2 rounded text-xs cursor-pointer ${
                      selectedFit === fit ? 'text-[#FF1E27] font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            {/* GSM Weight */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-3 font-bold">Fabric Density (GSM)</p>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setSelectedGsm('all')}
                  className={`py-1.5 px-2 rounded text-[11px] border transition-colors cursor-pointer ${
                    selectedGsm === 'all'
                      ? 'border-[#FF1E27] text-[#FF1E27] bg-[#FF1E27]/10 font-bold'
                      : 'border-zinc-700 text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                  }`}
                >
                  Any GSM
                </button>
                {GSM_WEIGHTS.map((w) => (
                  <button
                    key={w.value}
                    onClick={() => setSelectedGsm(w.value.toString())}
                    className={`py-1.5 px-2 rounded text-[11px] border transition-colors cursor-pointer ${
                      selectedGsm === w.value.toString()
                        ? 'border-[#FF1E27] text-[#FF1E27] bg-[#FF1E27]/10 font-bold'
                        : 'border-zinc-700 text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                    }`}
                  >
                    {w.value} GSM
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-3 font-bold">Size</p>
              <div className="grid grid-cols-3 gap-1.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(selectedSize === sz ? 'all' : sz)}
                    className={`py-2 text-xs font-bold rounded border transition-colors cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#FF1E27] text-white border-[#FF1E27]'
                        : 'border-zinc-700 text-[var(--text-secondary)] hover:border-zinc-500 bg-[var(--bg-elevated)]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-2">
                <span>MAX PRICE:</span>
                <span className="text-[var(--text-primary)] font-bold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="1400"
                max="3500"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#FF1E27] cursor-pointer"
              />
            </div>
          </aside>

          {/* Grid (9 cols) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 space-y-4">
                <Sparkles className="w-8 h-8 text-[#FF1E27] mx-auto opacity-80" />
                <h3 className="font-editorial text-xl font-bold text-[var(--text-primary)]">No silhouettes match your criteria</h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto font-mono">
                  Reset your filters or adjust the price slider to explore all Anarthak pieces.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-anarthak-red text-xs py-2.5 px-6 cursor-pointer font-mono"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                gridCols === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : gridCols === 3
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] p-6 overflow-y-auto flex flex-col justify-between font-mono">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
                <h3 className="font-editorial text-base font-bold text-[var(--text-primary)]">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-zinc-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Category */}
              <div className="mb-6">
                <p className="text-xs text-zinc-400 mb-2">CATEGORY</p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategoryFilter(cat.id)}
                      className={`w-full text-left py-1.5 text-xs ${activeCategoryFilter === cat.id ? 'text-[#FF1E27] font-bold' : 'text-zinc-300'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Sizes */}
              <div className="mb-6">
                <p className="text-xs text-zinc-400 mb-2">SIZE</p>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(selectedSize === sz ? 'all' : sz)}
                      className={`py-2 text-xs rounded border ${selectedSize === sz ? 'bg-[#FF1E27] text-white border-[#FF1E27]' : 'border-zinc-700 text-[var(--text-primary)]'}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border-subtle)] space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn-anarthak-red w-full py-3 text-xs"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full text-center text-xs text-zinc-400 hover:underline py-1"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
