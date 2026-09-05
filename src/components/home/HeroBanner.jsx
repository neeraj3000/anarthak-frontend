// src/components/home/HeroBanner.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';

export const HeroBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-16 overflow-hidden bg-white dark:bg-[#0A0A0C] text-zinc-900 dark:text-white transition-colors duration-200">
      {/* Background Editorial Media with Adaptive Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=2000&auto=format&fit=crop"
          alt="Anarthak Indian Streetwear"
          className="w-full h-full object-cover object-center opacity-10 dark:opacity-25 filter grayscale contrast-125"
        />
        {/* Light mode gradient: from white to transparent; Dark mode: from #0A0A0C */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#0A0A0C] dark:via-[#0A0A0C]/75 dark:to-[#0A0A0C]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/70 to-white dark:via-[#0A0A0C]/60 dark:to-[#0A0A0C]" />
      </div>

      {/* Hero Content */}
      <div className="container-custom relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Top Hallmark Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-[#18181D] border border-zinc-200 dark:border-[#27272A] backdrop-blur-md mb-6 animate-fade-in shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-ping"></span>
          <span className="text-[11px] font-mono tracking-[0.22em] text-zinc-800 dark:text-zinc-200 uppercase font-bold">
            DROP 01 LIVE • 300–340 GSM TIRUPUR COTTON
          </span>
        </div>

        {/* Devanagari Brand Monogram */}
        <span className="text-3xl sm:text-4xl text-[#FF1E27] font-mono font-bold tracking-[0.4em] mb-1 select-none">
          अनर्थक
        </span>

        {/* Grand Headline */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-zinc-950 dark:text-white leading-[1.0] mb-4 uppercase">
          ANARTHAK <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-[#FF1E27] dark:from-white dark:via-zinc-300 dark:to-[#FF1E27]">
            NOT LIKE THEM.
          </span>
        </h1>

        {/* Manifesto Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
          We refuse to make flimsy fast-fashion. Engineered in the textile heartland of Tirupur and Coimbatore from 320 GSM combed cotton. Structured drop-shoulders with an anti-bacon collar that never dies.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate('/shop')}
            className="btn-anarthak-red w-full sm:w-auto py-4 px-8 text-xs sm:text-sm font-mono font-bold tracking-wider flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>DISCOVER DROP 01</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/shop')}
            className="btn-anarthak-dark w-full sm:w-auto py-4 px-8 text-xs sm:text-sm font-mono font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-[#FF1E27]" />
            <span>EXPLORE 320+ GSM BLANKS</span>
          </button>
        </div>

        {/* 4 Technical Hallmark Indian Specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 mt-16 pt-10 border-t border-zinc-200 dark:border-[#27272A] w-full text-left font-mono">
          <div>
            <span className="block text-[10px] text-[#FF1E27] uppercase tracking-widest font-bold mb-0.5">
              FABRIC WEIGHT
            </span>
            <span className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">320 GSM</span>
            <p className="text-[11px] text-zinc-500">Tirupur Combed Long-Staple</p>
          </div>

          <div>
            <span className="block text-[10px] text-[#FF1E27] uppercase tracking-widest font-bold mb-0.5">
              COLLAR ENGINEERING
            </span>
            <span className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">1.25" HEAVY RIB</span>
            <p className="text-[11px] text-zinc-500">Zero Baconing Guaranteed</p>
          </div>

          <div>
            <span className="block text-[10px] text-[#FF1E27] uppercase tracking-widest font-bold mb-0.5">
              CUT PROFILE
            </span>
            <span className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">BOXY DROP</span>
            <p className="text-[11px] text-zinc-500">Sculptural Street Drape</p>
          </div>

          <div>
            <span className="block text-[10px] text-[#FF1E27] uppercase tracking-widest font-bold mb-0.5">
              LOGISTICS
            </span>
            <span className="text-lg sm:text-xl font-bold text-zinc-950 dark:text-white">BLUEDART AIR</span>
            <p className="text-[11px] text-zinc-500">24-48 Hr Pan-India Shipping</p>
          </div>
        </div>
      </div>
    </section>
  );
};
