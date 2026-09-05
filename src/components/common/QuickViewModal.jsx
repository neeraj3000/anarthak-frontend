// src/components/common/QuickViewModal.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { X, Heart, ShoppingBag, ArrowRight, Check } from 'lucide-react';

export const QuickViewModal = () => {
  const navigate = useNavigate();
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    formatPrice,
    setIsSizeGuideOpen
  } = useStore();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]?.name || '');
      setSelectedSize(quickViewProduct.sizes[0] || 'L');
      setQuantity(1);
      setActiveImageIdx(0);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWish = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedColor, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#141418] border border-brand-border dark:border-brand-borderDark rounded-xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col md:flex-row text-brand-black dark:text-white">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-brand-grey hover:text-brand-black dark:hover:text-white bg-black/10 dark:bg-black/50 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Left */}
        <div className="w-full md:w-1/2 bg-brand-bg dark:bg-[#0C0C0E] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-brand-border dark:border-brand-borderDark">
          <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-brand-bg dark:bg-zinc-900 mb-4">
            <img 
              src={quickViewProduct.images[activeImageIdx] || quickViewProduct.images[0]} 
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {/* GSM Hallmark Tag */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="anarthak-tag text-[10px]">
                {quickViewProduct.gsm} GSM
              </span>
              {quickViewProduct.badge && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-red text-white">
                  {quickViewProduct.badge}
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {quickViewProduct.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative w-14 h-16 rounded overflow-hidden border shrink-0 transition-all ${
                  activeImageIdx === idx ? 'border-brand-red opacity-100' : 'border-brand-border dark:border-zinc-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Right */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh] md:max-h-[90vh]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-brand-red uppercase tracking-widest font-bold">
                {quickViewProduct.edition}
              </span>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className="text-brand-grey hover:text-brand-red transition-colors p-1"
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWish ? 'fill-brand-red text-brand-red' : ''}`} />
              </button>
            </div>

            <h2 className="font-syne text-xl sm:text-2xl font-bold uppercase tracking-tight mb-2">
              {quickViewProduct.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-xl font-bold font-mono text-brand-red">
                {formatPrice(quickViewProduct.price)}
              </span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <span className="text-sm font-mono text-brand-grey line-through">
                  {formatPrice(quickViewProduct.originalPrice)}
                </span>
              )}
              <span className="text-[11px] font-mono text-brand-black dark:text-zinc-300 bg-brand-border dark:bg-zinc-800 px-2 py-0.5 rounded">
                {quickViewProduct.fit}
              </span>
            </div>

            <p className="text-xs text-brand-grey leading-relaxed mb-6">
              {quickViewProduct.description}
            </p>

            {/* Color Swatches */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-brand-grey font-mono">COLORWAY: <strong className="text-brand-black dark:text-white">{selectedColor}</strong></span>
              </div>
              <div className="flex gap-2.5">
                {quickViewProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`group relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor === c.name ? 'border-brand-red scale-110' : 'border-brand-border dark:border-zinc-700 hover:border-brand-grey'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor === c.name && (
                      <Check className={`w-3.5 h-3.5 ${c.hex === '#EAE6DF' || c.hex === '#F5F4F0' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-brand-grey font-mono">SELECT SIZE: <strong className="text-brand-black dark:text-white">{selectedSize}</strong></span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[11px] text-brand-red font-mono hover:underline cursor-pointer"
                >
                  Size & Fit Guide
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {quickViewProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 text-xs font-mono font-semibold rounded border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-brand-red text-white border-brand-red shadow'
                        : 'border-brand-border dark:border-zinc-800 text-brand-grey hover:border-brand-grey bg-brand-bg dark:bg-[#16161B]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-brand-grey mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Only {quickViewProduct.stock} pieces remaining in current Tirupur lot</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-4 border-t border-brand-border dark:border-brand-borderDark">
            <button
              onClick={handleAdd}
              className="btn-anarthak-red w-full py-3.5 text-xs font-bold tracking-wider cursor-pointer flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO BAG — {formatPrice(quickViewProduct.price)}</span>
            </button>

            <button
              onClick={() => {
                navigate(`/product/${quickViewProduct.id}`);
                setQuickViewProduct(null);
              }}
              className="w-full text-center text-xs font-mono text-brand-grey hover:text-brand-red flex items-center justify-center gap-1.5 transition-colors py-1 cursor-pointer"
            >
              <span>View Full Provenance & Specs</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
