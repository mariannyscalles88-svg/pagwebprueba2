import React, { useState } from 'react';
import { NutrientProduct } from '../../data/botanicalData';

interface FertilizationViewProps {
  nutrients: NutrientProduct[];
  onOpenLogCare: () => void;
}

export const FertilizationView: React.FC<FertilizationViewProps> = ({
  nutrients,
  onOpenLogCare,
}) => {
  const [calcVolumeLiters, setCalcVolumeLiters] = useState<number>(2);
  const [calcPlantType, setCalcPlantType] = useState<string>('aroids');
  const [calcStrength, setCalcStrength] = useState<string>('half');

  const strengthMultipliers: Record<string, number> = {
    quarter: 0.5,
    half: 1.0,
    full: 2.0,
  };

  const calculatedMl = (calcVolumeLiters * 2.0 * (strengthMultipliers[calcStrength] || 1)).toFixed(1);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-[24px]">eco</span>
            <h1 className="font-headline text-[28px] text-[#012d1d] font-semibold tracking-tight">
              Fertilization &amp; Botanical Nutrition
            </h1>
          </div>
          <p className="font-body text-[14px] text-[#414844] mt-0.5">
            Macro and micronutrient cycles, slow-release depot tracking, and ionic balance
          </p>
        </div>

        <button
          onClick={onOpenLogCare}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#012d1d] text-white text-xs font-semibold shadow-sm hover:opacity-95"
        >
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          <span>Log Nutrient Feed</span>
        </button>
      </div>

      {/* Spring Growth Curve Banner */}
      <div className="bg-[#f5f3ee] rounded-xl p-6 shadow-sm border border-[#eae8e3]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#99452b] block mb-1">
              Active Phase: Spring Vegetative Surge (March - June)
            </span>
            <h2 className="font-headline text-[22px] font-semibold text-[#012d1d]">
              Nitrogen &amp; Potassium Demands at Annual Peak
            </h2>
            <p className="text-xs text-[#414844] mt-0.5 max-w-2xl leading-relaxed">
              Indoor photoperiod expansion triggers active cell division. Plants demand bi-weekly nitrogen-forward and organic kelp minerals to expand foliage surface without burning tender root tips.
            </p>
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#eae8e3] flex items-center gap-3">
            <span className="material-symbols-outlined text-[#012d1d] text-[26px]">biotech</span>
            <div>
              <span className="text-[11px] text-[#717973] uppercase font-bold block">Current Ratio</span>
              <span className="text-sm font-bold text-[#012d1d]">N-P-K 3-1-2 (Bio-chelated)</span>
            </div>
          </div>
        </div>

        {/* SVG Seasonal Curve */}
        <div className="w-full bg-white rounded-lg p-4 border border-[#eae8e3]">
          <div className="flex justify-between text-[11px] font-bold text-[#717973] mb-2">
            <span>Dormancy (Winter)</span>
            <span className="text-[#012d1d]">Spring Surge • (Current 1.5x)</span>
            <span>Midsummer Peak</span>
            <span>Fall Hardening</span>
          </div>

          <svg className="w-full h-20 text-[#012d1d]" fill="none" viewBox="0 0 600 80" preserveAspectRatio="none">
            <path
              d="M0 65 C 100 65, 140 60, 200 30 C 260 8, 360 8, 420 30 C 480 60, 520 65, 600 65"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            ></path>
            <path
              d="M0 65 C 100 65, 140 60, 200 30 C 260 8, 360 8, 420 30 C 480 60, 520 65, 600 65 L 600 80 L 0 80 Z"
              fill="currentColor"
              fillOpacity="0.08"
            ></path>
            <circle cx="230" cy="18" fill="#99452b" r="6"></circle>
            <circle cx="230" cy="18" r="12" stroke="#99452b" strokeOpacity="0.4" strokeWidth="2"></circle>
          </svg>

          <div className="flex justify-between text-[11px] text-[#414844] mt-2 font-semibold">
            <span>0.25x Taper</span>
            <span className="text-[#99452b] font-bold">1.5x Active Feeding (Current)</span>
            <span>1.0x Maintenance</span>
            <span>0.5x Winter Rest</span>
          </div>
        </div>
      </div>

      {/* Nutrients Inventory Cards */}
      <div>
        <h2 className="font-headline text-[20px] font-semibold text-[#012d1d] mb-3">
          Botanical Dispensary &amp; Stock Inventory
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nutrients.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-[#eae8e3] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#f5f3ee] text-[#012d1d]">
                    {prod.type}
                  </span>
                  <span className="text-xs font-bold text-[#012d1d]">
                    {prod.stockRemainingPercent}% in stock
                  </span>
                </div>

                <h3 className="font-body text-[16px] font-bold text-[#1b1c19] mb-1">
                  {prod.name}
                </h3>
                <span className="font-mono text-xs font-semibold text-[#99452b] block mb-2">
                  {prod.npkRatio}
                </span>

                <p className="text-xs text-[#414844] leading-relaxed mb-3">
                  {prod.description}
                </p>

                <div className="bg-[#f5f3ee] p-2.5 rounded-lg border border-[#eae8e3] space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Rate:</span>
                    <span className="font-semibold text-[#012d1d]">{prod.dilutionRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#717973]">Cadence:</span>
                    <span className="font-semibold text-[#1b1c19]">{prod.frequency}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#eae8e3] mt-3 flex items-center justify-between text-xs">
                <span className="text-[#717973]">Next: {prod.nextScheduledDate}</span>
                <button
                  onClick={onOpenLogCare}
                  className="text-xs font-bold text-[#012d1d] hover:underline"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Dilution Calculator */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eae8e3]">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#eae8e3]">
          <span className="material-symbols-outlined text-[#012d1d] text-[20px]">calculate</span>
          <h3 className="font-headline text-[18px] font-semibold text-[#012d1d]">
            Precision Dilution Calculator
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-[#1b1c19] mb-1">Target Specimen Genus</label>
            <select
              value={calcPlantType}
              onChange={(e) => setCalcPlantType(e.target.value)}
              className="w-full px-3 py-2 bg-[#f5f3ee] border border-[#eae8e3] rounded-lg text-xs font-semibold text-[#1b1c19] focus:outline-none"
            >
              <option value="aroids">Aroids (Monstera, Philodendron)</option>
              <option value="ficus">Ficus & Trees (Lyrata, Elastica)</option>
              <option value="ferns">Delicate Ferns & Calathea</option>
              <option value="succulents">Sansevieria & Succulents</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1b1c19] mb-1">Water Can Volume (L)</label>
            <input
              type="number"
              min="0.5"
              max="20"
              step="0.5"
              value={calcVolumeLiters}
              onChange={(e) => setCalcVolumeLiters(Number(e.target.value))}
              className="w-full px-3 py-2 bg-[#f5f3ee] border border-[#eae8e3] rounded-lg text-xs font-semibold text-[#1b1c19] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1b1c19] mb-1">Strength Target</label>
            <select
              value={calcStrength}
              onChange={(e) => setCalcStrength(e.target.value)}
              className="w-full px-3 py-2 bg-[#f5f3ee] border border-[#eae8e3] rounded-lg text-xs font-semibold text-[#1b1c19] focus:outline-none"
            >
              <option value="quarter">Quarter Strength (Gentle)</option>
              <option value="half">Half Strength (Recommended)</option>
              <option value="full">Full Strength (Heavy Feed)</option>
            </select>
          </div>

          <div className="bg-[#f5f3ee] p-3 rounded-lg border border-[#eae8e3] flex flex-col justify-center text-center">
            <span className="text-[10px] uppercase font-bold text-[#717973]">Calculated Elixir</span>
            <span className="font-headline text-[22px] font-bold text-[#012d1d]">
              {calculatedMl} ml
            </span>
            <span className="text-[10px] text-[#414844]">in {calcVolumeLiters}L filtered water</span>
          </div>
        </div>
      </div>
    </div>
  );
};
