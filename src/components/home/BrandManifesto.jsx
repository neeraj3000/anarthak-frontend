// src/components/home/BrandManifesto.jsx
import React from 'react';
import { Flame } from 'lucide-react';

export const BrandManifesto = () => {
  const pillars = [
    {
      num: "01",
      title: "TIRUPUR 320+ GSM COTTON",
      desc: "We exclusively source extra-long staple combed cotton from Tamil Nadu. Dense, durable, and breathable across Mumbai humid summers and Delhi winters without cling.",
      tag: "100% COMBED LONG-STAPLE"
    },
    {
      num: "02",
      title: "ZERO-BACON ANTI-SAG COLLAR",
      desc: "Engineered with a 1.25\" high-recovery rib reinforced with elastomeric core yarn and twin-needle stay stitching. Never curls or wrinkles like mall-brand tees.",
      tag: "ANTI-BACON GUARANTEE"
    },
    {
      num: "03",
      title: "DECADENT STREET DRAPE",
      desc: "Deliberate drop-shoulder geometry and widened chest dimensions create a clean architectural drape that falls straight down without hugging the waistline.",
      tag: "ARCHITECTURAL FIT"
    },
    {
      num: "04",
      title: "UNAPOLOGETIC REBELLION",
      desc: "Anarthak (अनर्थक) rejects mainstream fast-fashion mediocrity. Every run is strictly limited, numbered, and crafted with high-density matte prints.",
      tag: "NOT LIKE THEM"
    }
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#0E0E12] border-y border-zinc-200 dark:border-white/10 transition-colors duration-200">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#FF1E27] uppercase tracking-widest mb-2 font-bold">
              <Flame className="w-3.5 h-3.5" />
              <span>THE ANARTHAK MANIFESTO</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 dark:text-white tracking-tight uppercase">
              WHY WE ARE <br />
              <span className="text-[#FF1E27]">NOT LIKE THEM</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mt-4 md:mt-0 font-light leading-relaxed font-mono">
            Fast fashion has turned t-shirts into disposable rags. Anarthak builds heavy, uncompromising garments with the structural integrity of outerwear.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="p-8 rounded-xl bg-white dark:bg-[#18181D] border border-zinc-200 dark:border-white/10 hover:border-[#FF1E27] dark:hover:border-[#FF1E27] transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-black text-white bg-[#FF1E27] px-2 py-0.5 rounded">
                    {pillar.num}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-semibold">
                    ANARTHAK SPEC
                  </span>
                </div>

                <h3 className="font-editorial text-lg font-bold text-zinc-950 dark:text-white mb-3 group-hover:text-[#FF1E27] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-light">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-white/10">
                <span className="text-[10px] font-mono text-[#FF1E27] font-bold tracking-wider">
                  {pillar.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
