// src/components/common/SizeGuideModal.jsx
import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Ruler, Check, HelpCircle } from 'lucide-react';

export const SizeGuideModal = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'

  if (!isSizeGuideOpen) return null;

  const measurementsInches = [
    { size: 'XS', chest: '42.0', length: '27.0', shoulder: '20.0', sleeve: '8.5' },
    { size: 'S',  chest: '44.0', length: '28.0', shoulder: '21.0', sleeve: '9.0' },
    { size: 'M',  chest: '46.0', length: '29.0', shoulder: '22.0', sleeve: '9.5' },
    { size: 'L',  chest: '48.5', length: '30.0', shoulder: '23.5', sleeve: '10.0' },
    { size: 'XL', chest: '51.5', length: '31.0', shoulder: '24.5', sleeve: '10.5' },
    { size: 'XXL', chest: '54.5', length: '32.0', shoulder: '25.5', sleeve: '11.0' }
  ];

  const measurementsCm = [
    { size: 'XS', chest: '106.5', length: '68.5', shoulder: '50.8', sleeve: '21.5' },
    { size: 'S',  chest: '111.8', length: '71.0', shoulder: '53.3', sleeve: '22.8' },
    { size: 'M',  chest: '116.8', length: '73.6', shoulder: '55.8', sleeve: '24.1' },
    { size: 'L',  chest: '123.2', length: '76.2', shoulder: '59.7', sleeve: '25.4' },
    { size: 'XL', chest: '130.8', length: '78.7', shoulder: '62.2', sleeve: '26.7' },
    { size: 'XXL', chest: '138.4', length: '81.3', shoulder: '64.8', sleeve: '28.0' }
  ];

  const data = unit === 'in' ? measurementsInches : measurementsCm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-[#141418] border border-brand-border dark:border-brand-borderDark rounded-xl shadow-2xl overflow-hidden z-10 animate-fade-in max-h-[90vh] flex flex-col text-brand-black dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-brand-border dark:border-brand-borderDark">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-brand-red" />
            <div>
              <h3 className="font-syne text-lg font-bold tracking-wide uppercase">
                ANARTHAK BOXY FIT CALCULATOR
              </h3>
              <p className="text-xs font-mono text-brand-grey">Tirupur 300+ GSM Pre-Shrunk Sizing Specs</p>
            </div>
          </div>
          <button 
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 text-brand-grey hover:text-brand-black dark:hover:text-white rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Unit Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-brand-bg dark:bg-[#1B1B22] p-4 rounded-lg border border-brand-border dark:border-brand-borderDark">
            <div>
              <p className="text-xs font-semibold mb-0.5">Unit of Measure</p>
              <p className="text-[11px] text-brand-grey">Heavyweight silhouette measured flat</p>
            </div>

            <div className="flex items-center bg-brand-surface dark:bg-[#0E0E11] p-1 rounded border border-brand-border dark:border-zinc-800">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                  unit === 'in' ? 'bg-brand-red text-white font-bold' : 'text-brand-grey hover:text-brand-black dark:hover:text-white'
                }`}
              >
                Inches (IN)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                  unit === 'cm' ? 'bg-brand-red text-white font-bold' : 'text-brand-grey hover:text-brand-black dark:hover:text-white'
                }`}
              >
                Centimeters (CM)
              </button>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border dark:border-zinc-800 text-brand-grey font-mono uppercase text-[11px]">
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Chest Width</th>
                  <th className="py-2.5 px-3">Body Length</th>
                  <th className="py-2.5 px-3">Shoulder Drop</th>
                  <th className="py-2.5 px-3">Sleeve Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border dark:divide-zinc-900 font-mono">
                {data.map((row) => (
                  <tr key={row.size} className="hover:bg-brand-red/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-brand-red">{row.size}</td>
                    <td className="py-3 px-3">{row.chest}</td>
                    <td className="py-3 px-3">{row.length}</td>
                    <td className="py-3 px-3">{row.shoulder}</td>
                    <td className="py-3 px-3">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fit Advice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-brand-bg dark:bg-[#18181E] border border-brand-border dark:border-zinc-800 p-4 rounded-lg">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5 text-brand-red">
                <Check className="w-3.5 h-3.5" />
                Streetwear Silhouette Fit Rule
              </h4>
              <p className="text-xs text-brand-grey leading-relaxed">
                Our silhouettes are intentionally designed with a dropped shoulder and structured chest. Take your true size for our signature oversized boxy drape.
              </p>
            </div>

            <div className="bg-brand-bg dark:bg-[#18181E] border border-brand-border dark:border-zinc-800 p-4 rounded-lg">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5 text-brand-red">
                <HelpCircle className="w-3.5 h-3.5" />
                Anti-Bacon Ribbed Collar
              </h4>
              <p className="text-xs text-brand-grey leading-relaxed">
                Each neckband features 2x2 elastane-reinforced ribbing. Guaranteed to retain its tight circular form wash after wash.
              </p>
            </div>
          </div>
        </div>

        {/* Footer close */}
        <div className="p-4 border-t border-brand-border dark:border-brand-borderDark bg-brand-bg dark:bg-[#111115] flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="btn-anarthak-red py-2 px-6 text-xs cursor-pointer uppercase font-bold"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
