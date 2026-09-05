// src/components/collections/CollectionsView.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { COLLECTIONS } from '../../data/collections';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../shop/ProductCard';
import { ArrowLeft, Sparkles, Layers } from 'lucide-react';

export const CollectionsView = () => {
  const { category } = useParams();

  // Match collection by slug or by categoryFilter
  const collection = COLLECTIONS.find(
    (c) => c.slug === category || c.categoryFilter === category
  ) || COLLECTIONS[0];

  const items = PRODUCTS.filter((p) => p.category === collection.categoryFilter);

  return (
    <div className="pt-28 pb-24 bg-brand-bg dark:bg-brand-bgDark min-h-screen">
      <div className="container-custom">
        {/* Navigation & Collection Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-mono text-brand-grey hover:text-brand-red uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Drops</span>
          </Link>

          {/* Quick Collection Switcher Tabs */}
          <div className="flex flex-wrap gap-2">
            {COLLECTIONS.map((col) => (
              <Link
                key={col.id}
                to={`/collections/${col.slug}`}
                className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  col.id === collection.id
                    ? 'bg-brand-red text-white font-bold'
                    : 'bg-brand-surface dark:bg-brand-surfaceDark text-brand-grey border border-brand-border dark:border-brand-borderDark hover:border-brand-red'
                }`}
              >
                {col.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Collection Hero Header */}
        <div className="relative rounded-3xl overflow-hidden border border-brand-border dark:border-brand-borderDark bg-brand-black p-8 sm:p-14 mb-16 text-white">
          <img
            src={collection.heroImage}
            alt={collection.title}
            className="absolute inset-0 w-full h-full object-cover opacity-25 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/85 to-transparent" />

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="anarthak-tag text-[10px]">
              {collection.badge}
            </span>
            <h1 className="font-syne text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase">
              {collection.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              {collection.description}
            </p>
            <div className="pt-2 text-xs font-mono text-brand-red font-bold">
              <span>{items.length} SILHOUETTES CURATED FOR THIS DROP</span>
            </div>
          </div>
        </div>

        {/* Garment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
