// src/components/home/FabricStory.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { Flame, CheckCircle2, ArrowRight } from 'lucide-react';

export const FabricStory = () => {
  const navigate = useNavigate();
  const { setIsSizeGuideOpen } = useStore();
  const [activePoint, setActivePoint] = useState(0);

  const hotspots = [
    {
      id: 0,
      title: "1.25\" High-Recovery Neck Ribbing",
      subtitle: "Anti-Bacon Dual-Needle Stay Stitch",
      description: "Tested across extreme humidity and 80+ rigorous wash cycles. Infused with elastomeric core yarn so your collar never wrinkles, curls, or looks bacon-like.",
      stat: "Zero Baconing Guarantee",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 1,
      title: "Engineered Drop-Shoulder Angle",
      subtitle: "Calculated 2.5\" Street Drop",
      description: "Reinforced with inner twill taping along the shoulder seam. Provides generous armhole volume without bunching or losing clean rectangular lines.",
      stat: "2.5\" Measured Drop",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "320 GSM Tirupur Combed Cotton",
      subtitle: "Extra-Long Staple Combed Harvest",
      description: "Zero synthetic cheap polyester. Pure long-staple combed cotton that breathes naturally in 40°C heat while maintaining heavy outerwear weight.",
      stat: "320 Grams/m² Purity",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Blind-Stitched Clean Edge Hem",
      subtitle: "Invisible Tailoring Finish",
      description: "Crafted using vintage blind-stitch machines that grab only the internal cotton loops, creating an immaculate drape over trousers with no visible thread lines.",
      stat: "100% Blind Stitch",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const current = hotspots[activePoint];

  return (
    <section className="py-24 bg-white dark:bg-[#0A0A0C] border-t border-zinc-200 dark:border-white/10 transition-colors duration-200">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FF1E27]/10 text-[#FF1E27] border border-[#FF1E27]/30 text-[11px] font-mono tracking-widest uppercase mb-4 font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>INTERACTIVE FABRIC ANATOMY</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-black text-zinc-950 dark:text-white tracking-tight mb-4 uppercase">
            ANATOMY OF A 320 GSM TEE
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto font-light leading-relaxed font-mono">
            Inspect the 4 architectural touchpoints that prove Anarthak is not like commercial fast-fashion.
          </p>
        </div>

        {/* 2-Col Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Buttons */}
          <div className="lg:col-span-5 space-y-3 font-mono">
            {hotspots.map((spot, idx) => (
              <button
                key={spot.id}
                onClick={() => setActivePoint(idx)}
                className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                  activePoint === idx
                    ? 'bg-zinc-50 dark:bg-[#18181D] border-[#FF1E27] shadow-md translate-x-2'
                    : 'bg-white dark:bg-[#121215] border-zinc-200 dark:border-white/10 opacity-75 hover:opacity-100 hover:border-zinc-400 dark:hover:border-zinc-600'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black text-[#FF1E27]">0{idx + 1}</span>
                    <h3 className="font-editorial text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                      {spot.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">{spot.subtitle}</p>
                </div>

                <span className="text-[10px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded shrink-0">
                  {spot.stat}
                </span>
              </button>
            ))}

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-[#FF1E27] hover:underline flex items-center gap-1.5 cursor-pointer font-bold"
              >
                <span>Check Size & Fit Guide</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Active Card */}
          <div className="lg:col-span-7 bg-zinc-50 dark:bg-[#18181D] border border-zinc-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-8 items-center shadow-lg animate-fade-in">
            <div className="w-full sm:w-1/2 aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 shrink-0 relative">
              <img 
                src={current.image} 
                alt={current.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/90 px-3 py-1 rounded text-[10px] font-mono text-[#FF1E27] font-bold border border-zinc-700">
                POINT 0{activePoint + 1} // ANARTHAK
              </div>
            </div>

            <div className="w-full sm:w-1/2 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FF1E27] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>NOT LIKE THEM BENCHMARK</span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-zinc-950 dark:text-white leading-tight">
                {current.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-light">
                {current.description}
              </p>

              <div className="pt-4 border-t border-zinc-200 dark:border-white/10 font-mono text-xs">
                <span className="text-zinc-500">ENGINEERED STANDARD: </span>
                <span className="text-zinc-900 dark:text-white font-bold">{current.stat}</span>
              </div>

              <button
                onClick={() => navigate('/shop')}
                className="btn-anarthak-red w-full py-3 text-xs font-bold uppercase tracking-wider"
              >
                Shop 320+ GSM Heavyweight
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
