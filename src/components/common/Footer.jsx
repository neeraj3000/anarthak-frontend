// src/components/common/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, Feather, Flame } from 'lucide-react';

export const Footer = () => {
  const { setIsSizeGuideOpen, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Registered for private drop allocations', 'success');
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="bg-[#0A0A0C] border-t border-[#27272A] text-[#A1A1AA] pt-16 pb-24 lg:pb-12">
      {/* Guarantees Bar - Logistics & Fabric Excellence */}
      <div className="border-b border-[#27272A] pb-12 mb-16">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <Feather className="w-5 h-5 text-[#FF1E27] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-1 font-mono">
                300+ GSM Tirupur Cotton
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Extra-long staple combed cotton. Zero polyester blends.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Truck className="w-5 h-5 text-[#FF1E27] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-1 font-mono">
                Bluedart Apex Air
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Free 24-48 hr air shipping on orders over ₹1,999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <RefreshCw className="w-5 h-5 text-[#FF1E27] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-1 font-mono">
                7-Day Easy Exchange
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Doorstep courier pickup across 19,000+ pincodes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#FF1E27] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-1 font-mono">
                Anti-Bacon Collar
              </h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                1.25" Twin-needle rib guaranteed never to stretch or sag.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand Column */}
        <div className="lg:col-span-2 pr-0 lg:pr-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-editorial text-2xl sm:text-3xl font-black tracking-tight text-white">
              ANARTHAK
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#FF1E27] text-white text-[9px] font-mono font-bold">
              अनर्थक
            </span>
          </div>
          <p className="text-xs font-mono text-[#FF1E27] uppercase tracking-widest font-bold mb-4">
            "NOT LIKE THEM"
          </p>
          <p className="text-xs leading-relaxed text-zinc-400 mb-6 max-w-md font-light">
            We reject the disposable, fragile, paper-thin fast-fashion flooding the market. Anarthak crafts heavyweight, structured, drop-shoulder luxury garments engineered from combed cottons with brutalist silhouettes and raw attitude.
          </p>

          {/* Newsletter Box */}
          <div className="bg-[#121216] border border-[#27272A] p-5 rounded-lg max-w-md">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-1 font-mono flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-[#FF1E27]" />
              Join the Anarthak Blacklist
            </h5>
            <p className="text-[11px] text-zinc-400 mb-3">
              Receive private drop keys 30 minutes before numbered editions go live.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-[#FF1E27] text-xs font-mono py-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are on the VIP drop notification list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your phone or email"
                  required
                  className="bg-[#18181D] border border-zinc-700 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF1E27] flex-1 font-mono"
                />
                <button
                  type="submit"
                  className="btn-anarthak-red py-2 px-5 text-xs font-mono cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Column 1: Drops */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.18em] mb-5 font-mono text-[#FF1E27]">
            Archival Drops
          </h4>
          <ul className="space-y-3 text-xs font-mono">
            <li>
              <Link to="/shop" className="hover:text-white transition-colors">
                All Silhouettes
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-white transition-colors">
                300+ GSM Heavyweight
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-white transition-colors">
                Oversized Drop-Shoulder
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-white transition-colors">
                Devanagari Graphics
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-white transition-colors">
                Kutch Mineral Acid Washed
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Science & Sizing */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.18em] mb-5 font-mono text-[#FF1E27]">
            Fabric Science
          </h4>
          <ul className="space-y-3 text-xs font-mono">
            <li>
              <button 
                onClick={() => setIsSizeGuideOpen(true)}
                className="hover:text-[#FF1E27] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Interactive Size Calculator</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27]"></span>
              </button>
            </li>
            <li className="text-zinc-500">Tirupur Heavy Combed Cotton</li>
            <li className="text-zinc-500">Anti-Bacon Collar Engineering</li>
            <li className="text-zinc-500">Pre-Shrunk Cold Wash Protocol</li>
            <li className="text-zinc-500">All-Season Breathability</li>
          </ul>
        </div>

        {/* Column 3: Concierge */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-[0.18em] mb-5 font-mono text-[#FF1E27]">
            Support & Delivery
          </h4>
          <ul className="space-y-3 text-xs font-mono">
            <li>
              <Link to="/account" className="hover:text-white transition-colors">
                Track Bluedart Air Order
              </Link>
            </li>
            <li>
              <Link to="/account" className="hover:text-white transition-colors">
                Client Account Portal
              </Link>
            </li>
            <li className="text-zinc-500">UPI & Cash on Delivery (COD)</li>
            <li className="text-zinc-500">19,000+ Pincode Coverage</li>
            <li className="text-zinc-500">Doorstep Return Pickups</li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Payment Providers Row */}
      <div className="container-custom pt-8 border-t border-[#27272A] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
        <div>
          © {new Date().getFullYear()} ANARTHAK (अनर्थक) STREETWEAR PVT. LTD. ALL RIGHTS RESERVED.
        </div>

        <div className="flex items-center gap-6">
          <span>PRIVACY CHARTER</span>
          <span>TERMS OF ARCHIVE</span>
          <span>HEAVYWEIGHT ARCHIVE</span>
        </div>

        <div className="flex items-center gap-2.5 text-zinc-400">
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-[#FF1E27]">UPI</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-bold">GPAY</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-bold">PHONEPE</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-bold">RUPAY</span>
          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px]">COD</span>
        </div>
      </div>
    </footer>
  );
};
