// src/components/home/FeaturedDrop.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

export const FeaturedDrop = () => {
  const navigate = useNavigate();

  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-24 bg-[var(--bg-primary)] transition-colors duration-200">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E27] uppercase tracking-widest mb-2 font-bold">
              <Flame className="w-4 h-4" />
              <span>DROP 01 // HEAVYWEIGHT BLANKS</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              FEATURED DESI REBELLION PIECES
            </h2>
          </div>

          <button
            onClick={() => navigate('/shop')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)] hover:text-[#FF1E27] uppercase tracking-wider group cursor-pointer"
          >
            <span>View All 8 Silhouettes</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#FF1E27]" />
          </button>
        </div>

        {/* 4-Col Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
