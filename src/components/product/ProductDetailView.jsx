// src/components/product/ProductDetailView.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import { REVIEWS } from '../../data/reviews';
import { ProductCard } from '../shop/ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  Ruler, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Clock, 
  Share2,
  ArrowRight,
  MapPin,
  Flame
} from 'lucide-react';

export const ProductDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    formatPrice, 
    setIsSizeGuideOpen,
    showToast
  } = useStore();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('specs');

  // Pincode Checker Simulation
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const inWish = isInWishlist(product.id);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeStatus({ valid: false, message: 'Please enter a valid 6-digit PIN code' });
      return;
    }
    setPincodeStatus({ 
      valid: true, 
      message: `Delivery available in 24-48 hrs via Bluedart Air Express to ${pincode} • COD Available` 
    });
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard', 'info');
    }
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-24 sm:pt-28 pb-32 lg:pb-24 bg-[var(--bg-primary)] min-h-screen transition-colors duration-200">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] mb-8 overflow-x-auto">
          <Link to="/" className="hover:text-[var(--text-primary)] transition-colors">
            ANARTHAK
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[var(--text-primary)] transition-colors">
            {product.category.toUpperCase()}
          </Link>
          <span>/</span>
          <span className="text-[#FF1E27] font-bold truncate">{product.name}</span>
        </nav>

        {/* Top Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24">
          {/* Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    activeImageIdx === idx 
                      ? 'border-[#FF1E27] ring-1 ring-[#FF1E27] opacity-100' 
                      : 'border-zinc-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Angle thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image Stage */}
            <div 
              className="relative flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)] group cursor-zoom-in shadow-xl"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                  isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'
                }`}
              />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 font-mono">
                <span className="hallmark-tag text-xs py-1 px-3">
                  {product.gsm} GSM TIRUPUR COTTON
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/90 text-white border border-zinc-700">
                  {product.fit}
                </span>
              </div>

              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md text-zinc-300 text-[10px] font-mono px-2.5 py-1 rounded border border-zinc-700 pointer-events-none">
                {isZoomed ? 'Click to minimize' : 'Click to inspect weave'}
              </div>
            </div>
          </div>

          {/* Purchasing Console (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-[#FF1E27] tracking-widest uppercase font-bold">
                  {product.edition}
                </span>
                <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                  <div className="flex text-[#FF1E27]">
                    {'★'.repeat(5)}
                  </div>
                  <span className="font-bold text-[var(--text-primary)]">{product.rating}</span>
                  <span>({product.reviewCount} Verified Patrons)</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] tracking-tight leading-tight mb-2">
                {product.name}
              </h1>

              <p className="text-xs font-mono text-[var(--text-secondary)] mb-4">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[var(--border-subtle)] font-mono">
                <span className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-zinc-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="text-xs font-bold text-[#FF1E27] bg-[#FF1E27]/10 px-2 py-0.5 rounded border border-[#FF1E27]/30">
                    SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Narrative Description */}
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-light mb-6">
                {product.description}
              </p>

              {/* Colorways */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                  <span className="text-[var(--text-secondary)]">
                    COLORWAY: <strong className="text-[var(--text-primary)]">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                        selectedColor === c.name ? 'border-[#FF1E27] scale-110 shadow-lg' : 'border-zinc-700 hover:border-zinc-400'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {selectedColor === c.name && (
                        <Check className={`w-4 h-4 ${c.hex === '#F4F4F6' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-6 font-mono">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-[var(--text-secondary)]">
                    SELECT SIZE: <strong className="text-[var(--text-primary)]">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#FF1E27] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#FF1E27] text-white border-[#FF1E27] shadow-lg'
                          : 'border-zinc-700 text-[var(--text-secondary)] hover:border-zinc-500 bg-[var(--bg-secondary)]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-3 text-xs text-[var(--text-secondary)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Currently allocated: <strong className="text-[var(--text-primary)]">{product.stock} pieces remaining</strong></span>
                </div>
              </div>

              {/* Pincode Delivery Checker */}
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] p-4 rounded-xl mb-6 font-mono">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] mb-2">
                  <MapPin className="w-4 h-4 text-[#FF1E27]" />
                  <span>Check Bluedart Express Delivery</span>
                </div>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit PIN code (e.g. 400050)"
                    className="input-hallmark text-xs flex-1"
                  />
                  <button
                    type="submit"
                    className="btn-anarthak-dark py-2 px-4 text-xs font-bold"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className={`text-xs mt-2 font-mono ${pincodeStatus.valid ? 'text-emerald-400' : 'text-red-400'}`}>
                    {pincodeStatus.message}
                  </p>
                )}
              </div>

              {/* Primary Actions */}
              <div className="space-y-3 font-mono">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="btn-anarthak-red flex-1 py-4 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 shadow-xl"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG — {formatPrice(product.price * quantity)}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-zinc-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${inWish ? 'fill-[#FF1E27] text-[#FF1E27]' : ''}`} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-zinc-500 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="Share Garment"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 bg-[#18181D] hover:bg-black text-white border border-[#FF1E27] rounded shadow-lg transition-all"
                >
                  <span>BUY NOW (INSTANT CHECKOUT)</span>
                  <ArrowRight className="w-4 h-4 text-[#FF1E27]" />
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="pt-6 border-t border-[var(--border-subtle)] grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-[var(--text-secondary)]">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#FF1E27]" />
                <span>Free Above ₹1,999</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-[#FF1E27]" />
                <span>7-Day Doorstep Pickup</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#FF1E27]" />
                <span>Anti-Bacon Collar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Accordions */}
        <div className="max-w-4xl mx-auto mb-24 border-t border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)] font-mono">
          <div>
            <button
              onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
              className="w-full py-5 flex items-center justify-between text-left text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[#FF1E27] transition-colors cursor-pointer"
            >
              <span>01. Technical Garment Specifications</span>
              {openAccordion === 'specs' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'specs' && (
              <div className="pb-6 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4 text-[var(--text-secondary)] animate-fade-in">
                <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] space-y-2">
                  <p><span className="text-zinc-500">Fabric Composition:</span> {product.specs.fabric}</p>
                  <p><span className="text-zinc-500">Fabric Weight:</span> {product.specs.weight}</p>
                  <p><span className="text-zinc-500">Textile Mill:</span> {product.specs.origin}</p>
                </div>
                <div className="p-4 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-subtle)] space-y-2">
                  <p><span className="text-zinc-500">Dye Process:</span> {product.specs.dyeMethod}</p>
                  <p><span className="text-zinc-500">Collar Spec:</span> {product.specs.collar}</p>
                  <p><span className="text-zinc-500">Seam Stitch:</span> {product.specs.stitch}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
              className="w-full py-5 flex items-center justify-between text-left text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[#FF1E27] transition-colors cursor-pointer"
            >
              <span>02. Climate Care Protocol</span>
              {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'care' && (
              <div className="pb-6 text-xs text-[var(--text-secondary)] leading-relaxed space-y-2 animate-fade-in font-light">
                <p>• Machine wash cold (30°C) with dark garments using gentle liquid detergent.</p>
                <p>• Do not use harsh bleaching agents or fabric softeners that break cotton fibers.</p>
                <p>• Line dry in shade; avoid harsh direct midday sunlight to preserve deep black/crimson pigment.</p>
                <p>• Iron inside out at medium heat; never touch irons to puff printed typography.</p>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
              className="w-full py-5 flex items-center justify-between text-left text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] hover:text-[#FF1E27] transition-colors cursor-pointer"
            >
              <span>03. Express Delivery & Cash on Delivery (COD)</span>
              {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openAccordion === 'shipping' && (
              <div className="pb-6 text-xs text-[var(--text-secondary)] leading-relaxed space-y-2 animate-fade-in font-light">
                <p>• Dispatched via Bluedart Apex Air Express from our central fulfillment hub.</p>
                <p>• Free shipping on orders exceeding ₹1,999.</p>
                <p>• Cash on Delivery (COD) is available with OTP verification.</p>
                <p>• 7-day doorstep exchange or return pickup across 19,000+ pincodes.</p>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mb-24 pt-16 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-mono text-[#FF1E27] uppercase tracking-widest block mb-1 font-bold">
                VERIFIED PATRON REVIEWS
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                CUSTOMER PRAISE ({product.reviewCount})
              </h3>
            </div>
            <div className="mt-4 sm:mt-0 font-mono text-xs text-[var(--text-secondary)] flex items-center gap-3">
              <span className="text-2xl font-bold text-[var(--text-primary)]">{product.rating}</span>
              <div className="text-[#FF1E27]">{'★'.repeat(5)}</div>
              <span>Based on {product.reviewCount} reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.id} className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#FF1E27] text-xs">
                    {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#FF1E27]" />)}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{r.date}</span>
                </div>
                <h4 className="font-editorial text-sm font-bold text-[var(--text-primary)]">{r.title}</h4>
                <p className="text-xs text-[var(--text-secondary)] font-light leading-relaxed">{r.content}</p>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-[var(--border-subtle)]">
                  <span className="text-[var(--text-primary)] font-bold">{r.author} ({r.location})</span>
                  <span className="text-[#FF1E27] font-bold">{r.fitFeedback}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Silhouettes */}
        <div className="pt-16 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-editorial text-xl sm:text-2xl font-black text-[var(--text-primary)]">
              MORE FROM DROP 01
            </h3>
            <Link
              to="/shop"
              className="text-xs font-mono text-[#FF1E27] hover:underline font-bold"
            >
              Explore Full Collection &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar on Mobile */}
      <div className="fixed bottom-14 left-0 right-0 z-30 lg:hidden bg-white/95 dark:bg-[#121216]/95 backdrop-blur-xl border-t border-zinc-200 dark:border-white/10 p-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-mono text-[var(--text-secondary)] uppercase truncate max-w-[120px]">
              {product.name}
            </p>
            <p className="text-sm font-bold font-mono text-[var(--text-primary)]">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="p-2.5 rounded border border-zinc-700 text-xs text-[var(--text-primary)] font-bold"
            >
              {selectedSize}
            </button>
            <button
              onClick={handleAddToCart}
              className="btn-anarthak-red py-2.5 px-5 text-xs font-bold tracking-wider uppercase"
            >
              Add To Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
