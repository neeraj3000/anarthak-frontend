// src/components/home/Testimonials.jsx
import React from 'react';
import { REVIEWS } from '../../data/reviews';
import { Star, CheckCircle2, Flame } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section className="py-24 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] transition-colors duration-200">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <span className="text-xs font-mono text-[#FF1E27] uppercase tracking-widest block mb-2 font-bold">
              INDIAN STREET CULTURE CRITIQUE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              VERIFIED PATRON REVIEWS
            </h2>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0 font-mono text-xs text-[var(--text-secondary)]">
            <span className="flex items-center text-[#FF1E27]">
              {'★'.repeat(5)}
            </span>
            <span className="font-bold text-[var(--text-primary)]">4.9 / 5.0 Rating</span>
            <span>(Over 1,200+ Dispatches Nationwide)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex flex-col justify-between hover:border-[#FF1E27] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#FF1E27] text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FF1E27]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{rev.date}</span>
                </div>

                <h4 className="font-editorial text-sm font-bold text-[var(--text-primary)] mb-2 leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 font-light">
                  {rev.content}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-1.5 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)]">{rev.author}</span>
                  <div className="flex items-center gap-1 text-[10px] text-[#FF1E27] font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                  <span>{rev.location}</span>
                  <span className="text-[#FF1E27]">{rev.sizePurchased}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
