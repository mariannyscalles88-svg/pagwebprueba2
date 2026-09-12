import React from 'react';
import { PlantSpecimen } from '../data/botanicalData';

interface PlantDetailModalProps {
  plant: PlantSpecimen | null;
  onClose: () => void;
  onWaterPlant: (plantId: string) => void;
  onFeedPlant: (plantId: string) => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  onClose,
  onWaterPlant,
  onFeedPlant,
}) => {
  if (!plant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fbf9f4] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#eae8e3] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header Image & Badge */}
        <div className="relative h-64 bg-[#012d1d] shrink-0">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors backdrop-blur-sm"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#c1ecd4] text-[#002114] font-body text-[11px] font-bold tracking-wide uppercase mb-1.5">
                {plant.room} • {plant.subLocation}
              </span>
              <h2 className="font-headline text-[26px] font-semibold text-white tracking-tight leading-tight">
                {plant.name}
              </h2>
              <p className="font-body text-[13px] text-[#ceeacf] italic">
                {plant.scientificName}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-white/70 block">Hydration</span>
              <span
                className={`font-headline text-[24px] font-bold ${
                  plant.soilMoisture < 25
                    ? 'text-[#fe9474]'
                    : plant.soilMoisture > 70
                    ? 'text-[#c1ecd4]'
                    : 'text-white'
                }`}
              >
                {plant.soilMoisture}%
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body Info */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Telemetry quick bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#f5f3ee] p-3 rounded-xl">
              <span className="text-[11px] font-semibold uppercase text-[#717973] block mb-1">
                Light Exposure
              </span>
              <span className="text-[13px] font-bold text-[#012d1d] block truncate">
                {plant.fcRange}
              </span>
              <span className="text-[11px] text-[#414844]">{plant.photoperiod}</span>
            </div>

            <div className="bg-[#f5f3ee] p-3 rounded-xl">
              <span className="text-[11px] font-semibold uppercase text-[#717973] block mb-1">
                Water Cadence
              </span>
              <span className="text-[13px] font-bold text-[#012d1d] block">
                {plant.cadenceDescription}
              </span>
              <span className="text-[11px] text-[#414844]">{plant.volumeWaterMl}ml Volume</span>
            </div>

            <div className="bg-[#f5f3ee] p-3 rounded-xl">
              <span className="text-[11px] font-semibold uppercase text-[#717973] block mb-1">
                Substrate
              </span>
              <span className="text-[13px] font-bold text-[#012d1d] block truncate">
                {plant.potSize}
              </span>
              <span className="text-[11px] text-[#414844] truncate block">{plant.potType}</span>
            </div>

            <div className="bg-[#f5f3ee] p-3 rounded-xl">
              <span className="text-[11px] font-semibold uppercase text-[#717973] block mb-1">
                Feed Schedule
              </span>
              <span className="text-[13px] font-bold text-[#012d1d] block truncate">
                {plant.feedSchedule.replace('Feed: ', '')}
              </span>
              <span className="text-[11px] text-[#414844]">Active Spring</span>
            </div>
          </div>

          {/* Moisture Bar */}
          <div className="bg-white p-4 rounded-xl border border-[#eae8e3]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-body text-[13px] font-semibold text-[#1b1c19]">
                Subterranean Soil Moisture Level
              </span>
              <span
                className={`font-body text-[12px] font-bold ${
                  plant.soilMoisture < 25 ? 'text-[#99452b]' : 'text-[#012d1d]'
                }`}
              >
                {plant.soilMoisture}% ({plant.moistureStatus})
              </span>
            </div>
            <div className="w-full bg-[#f0eee9] rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  plant.soilMoisture < 25
                    ? 'bg-[#99452b]'
                    : plant.soilMoisture < 45
                    ? 'bg-[#fe9474]'
                    : 'bg-[#1b4332]'
                }`}
                style={{ width: `${plant.soilMoisture}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-[#717973] mt-1.5">
              <span>0% Dry Substrate</span>
              <span>Target: 40-70% (Botanical Zone)</span>
              <span>100% Fully Saturated</span>
            </div>
          </div>

          {/* Substrate & Botanical Notes */}
          <div className="space-y-3">
            <div>
              <h4 className="font-headline text-[15px] font-semibold text-[#012d1d] mb-1">
                Substrate & Potting Architecture
              </h4>
              <p className="font-body text-[13px] text-[#414844] leading-relaxed bg-white p-3 rounded-xl border border-[#eae8e3]">
                {plant.substrate}. Potted in {plant.potSize} {plant.potType} with active drainage channel.
              </p>
            </div>

            <div>
              <h4 className="font-headline text-[15px] font-semibold text-[#012d1d] mb-1">
                Curator Guidelines & Observations
              </h4>
              <p className="font-body text-[13px] text-[#414844] leading-relaxed bg-[#f5f3ee] p-3 rounded-xl border border-[#eae8e3]">
                {plant.notes}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 bg-[#f5f3ee] border-t border-[#eae8e3] flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-[#717973]">
            Last watered: <strong className="text-[#1b1c19]">{plant.lastWatered}</strong>
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                onFeedPlant(plant.id);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-[#ceeacf] text-[#092010] hover:bg-[#b2cdb4] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">science</span>
              <span>Feed Nutrient</span>
            </button>
            <button
              onClick={() => {
                onWaterPlant(plant.id);
                onClose();
              }}
              className="px-5 py-2 rounded-lg bg-[#012d1d] text-white hover:opacity-95 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">water_drop</span>
              <span>Water {plant.volumeWaterMl}ml</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
