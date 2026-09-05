// src/components/shop/ProductCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { 
    formatPrice, 
    isInWishlist, 
    toggleWishlist, 
    addToCart,
    setQuickViewProduct 
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const inWish = isInWishlist(product.id);

  const handleQuickAddSize = (e, size) => {
    e.stopPropagation();
    addToCart(product, selectedColor, size, 1);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="group relative flex flex-col cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] group-hover:border-[#FF1E27] transition-all duration-300">
        {/* Base Image */}
        <img 
          src={product.images[0]} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Hover Alt Image */}
        {product.images[1] && (
          <img 
            src={product.images[1]} 
            alt={`${product.name} angle`}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="hallmark-tag text-[10px]">
            {product.gsm} GSM
          </span>
          {product.badge && (
            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
              product.badge === 'LIMITED RUN' 
                ? 'bg-[#FF1E27] text-white shadow-lg' 
                : product.badge === 'NEW DROP'
                ? 'bg-white text-black'
                : 'bg-zinc-900 text-zinc-300 border border-zinc-700'
            }`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWish ? 'fill-[#FF1E27] text-[#FF1E27]' : ''}`} />
        </button>

        {/* Quick View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className={`absolute top-13 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Quick Size Pills Bar on Hover */}
        <div className={`absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-all duration-300 z-10 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}>
          <p className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest text-center mb-1.5">
            Quick Add Size
          </p>
          <div className="flex items-center justify-center gap-1.5">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                onClick={(e) => handleQuickAddSize(e, sz)}
                className="w-7 h-7 rounded bg-[#18181D] hover:bg-[#FF1E27] hover:text-white border border-zinc-700 text-[10px] font-mono font-bold text-white transition-colors cursor-pointer flex items-center justify-center"
                title={`Quick Add ${sz}`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Metadata */}
      <div className="pt-3 pb-1 space-y-1">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <span className="text-[#FF1E27] font-bold">{product.fit}</span>
          <span>{product.colors.length} COLORWAYS</span>
        </div>

        <h3 className="font-editorial text-sm font-bold text-[var(--text-primary)] group-hover:text-[#FF1E27] transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-[11px] text-[var(--text-secondary)] truncate">
          {product.subtitle}
        </p>

        <div className="flex items-center justify-between pt-1 font-mono">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[var(--text-primary)]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-zinc-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <span className="text-[10px] text-zinc-400">
            ★ {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 pt-1.5">
          {product.colors.map((c) => (
            <button
              key={c.name}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(c.name);
              }}
              className={`w-3 h-3 rounded-full border transition-all ${
                selectedColor === c.name ? 'scale-125 border-white ring-1 ring-[#FF1E27]' : 'border-zinc-700 opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
