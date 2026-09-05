// src/components/home/CollectionGrid.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLLECTIONS } from '../../data/collections';
import { useStore } from '../../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';

export const CollectionGrid = () => {
  const navigate = useNavigate();
  const { setActiveCategoryFilter } = useStore();

  const handleSelectCollection = (col) => {
    setActiveCategoryFilter(col.categoryFilter);
    navigate(`/collections/${col.slug}`);
  };

  return (
    <section className="py-24 bg-[var(--bg-primary)] transition-colors duration-200">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-[#FF1E27] uppercase tracking-widest block mb-2 font-bold">
            ARCHIVAL CURATIONS
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
            EXPLORE BY SILHOUETTE & TECHNIQUE
          </h2>
        </div>

        {/* 2x2 Big Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => handleSelectCollection(col)}
              className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-[var(--border-subtle)] bg-zinc-950"
            >
              <img
                src={col.heroImage}
                alt={col.title}
                className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-110 group-hover:scale-105 group-hover:brightness-[0.8] transition-all duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />

              {/* Top badges */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10 font-mono">
                <span className="px-3 py-1 rounded text-[10px] font-bold bg-[#FF1E27] text-white">
                  {col.badge}
                </span>

                <span className="text-[11px] text-zinc-400 bg-black/70 px-2.5 py-1 rounded border border-zinc-800">
                  {col.itemCount} Garments
                </span>
              </div>

              {/* Bottom Title & Action */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
                <div>
                  <p className="text-xs font-mono text-zinc-300 uppercase tracking-widest mb-1">
                    {col.subtitle}
                  </p>
                  <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-[#FF1E27] transition-colors leading-tight">
                    {col.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-1 max-w-sm font-light">
                    {col.description}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#FF1E27] text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
