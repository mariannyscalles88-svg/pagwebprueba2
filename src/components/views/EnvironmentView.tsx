import React, { useState } from 'react';
import { MicroZone } from '../../data/botanicalData';

interface EnvironmentViewProps {
  zones: MicroZone[];
  onSyncSensors: () => void;
  isSyncing: boolean;
  syncSuccessMessage: string | null;
}

export const EnvironmentView: React.FC<EnvironmentViewProps> = ({
  zones,
  onSyncSensors,
  isSyncing,
  syncSuccessMessage,
}) => {
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [selectedZone, setSelectedZone] = useState<MicroZone>(zones[0]);

  const convertTemp = (c: number) => {
    if (tempUnit === 'F') {
      return (c * 1.8 + 32).toFixed(1);
    }
    return c.toFixed(1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-[24px]">wb_sunny</span>
            <h1 className="font-headline text-[28px] text-[#012d1d] font-semibold tracking-tight">
              Sunlight &amp; Micro-Zone Telemetry
            </h1>
          </div>
          <p className="font-body text-[14px] text-[#414844] mt-0.5">
            Real-time photometric and atmospheric readings across 5 monitored spaces
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* °C / °F Toggle */}
          <div className="bg-[#eae8e3] p-1 rounded-lg flex items-center border border-[#e4e2dd] text-xs font-bold">
            <button
              onClick={() => setTempUnit('C')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                tempUnit === 'C' ? 'bg-[#012d1d] text-white' : 'text-[#414844]'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setTempUnit('F')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                tempUnit === 'F' ? 'bg-[#012d1d] text-white' : 'text-[#414844]'
              }`}
            >
              °F
            </button>
          </div>

          <button
            onClick={onSyncSensors}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#012d1d] text-white text-xs font-semibold shadow-sm hover:opacity-95 active:scale-95 transition-all"
          >
            <span
              className={`material-symbols-outlined text-[16px] ${
                isSyncing ? 'animate-spin' : ''
              }`}
            >
              sync
            </span>
            <span>{isSyncing ? 'Syncing...' : syncSuccessMessage || 'Sync All Sensors'}</span>
          </button>
        </div>
      </div>

      {/* 5 Micro-Zones Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {zones.map((zone) => {
          const isSelected = selectedZone.id === zone.id;
          const isAlert = zone.status === 'Alert';

          return (
            <div
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#012d1d] ring-2 ring-[#012d1d]/20 shadow-md'
                  : 'bg-white border-[#eae8e3] hover:border-[#012d1d]/30 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="font-body text-[13px] font-bold text-[#1b1c19] truncate">
                    {zone.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      isAlert
                        ? 'bg-[#ffdbd0] text-[#99452b]'
                        : 'bg-[#c1ecd4] text-[#002114]'
                    }`}
                  >
                    {zone.status}
                  </span>
                </div>

                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-headline text-[24px] font-bold text-[#012d1d]">
                    {convertTemp(zone.tempC)}°{tempUnit}
                  </span>
                  <span className="font-body text-[13px] font-semibold text-[#414844]">
                    {zone.humidityRH}% RH
                  </span>
                </div>

                {/* Progress Mini Gauges */}
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#717973] font-semibold mb-0.5">
                      <span>Light (FC)</span>
                      <span className="text-[#012d1d] font-bold">{zone.lightFC} FC</span>
                    </div>
                    <div className="w-full bg-[#f0eee9] rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#012d1d] h-full rounded-full"
                        style={{ width: `${Math.min(100, (zone.lightFC / 1500) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-[#717973] font-semibold mb-0.5">
                      <span>Humidity RH</span>
                      <span className={isAlert ? 'text-[#99452b] font-bold' : 'text-[#012d1d] font-bold'}>
                        {zone.humidityRH}%
                      </span>
                    </div>
                    <div className="w-full bg-[#f0eee9] rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isAlert ? 'bg-[#99452b]' : 'bg-[#1b4332]'
                        }`}
                        style={{ width: `${zone.humidityRH}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#eae8e3] mt-3 flex items-center justify-between text-[11px] text-[#717973]">
                <span>{zone.plantCount} Specimens</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#012d1d]">battery_5_bar</span>
                  <span>{zone.battery}%</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Zone Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-xl p-6 shadow-sm border border-[#eae8e3]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#eae8e3]">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#717973] font-bold">
                Sensor Station Telemetry
              </span>
              <h2 className="font-headline text-[22px] font-semibold text-[#012d1d]">
                {selectedZone.name} • {selectedZone.sensorId}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#012d1d] animate-pulse"></span>
              <span className="text-xs font-semibold text-[#012d1d]">Continuous Sampling (1 Hz)</span>
            </div>
          </div>

          {/* Graphical simulation of 24h Light Curve */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#414844] mb-2">
              <span>24-Hour Photoperiod &amp; Solar Influx (Foot-Candles)</span>
              <span className="text-[#012d1d] font-bold">Peak: {selectedZone.lightFC} FC</span>
            </div>
            <div className="bg-[#f5f3ee] rounded-xl p-4 border border-[#eae8e3]">
              <svg className="w-full h-32 text-[#012d1d]" fill="none" viewBox="0 0 600 120" preserveAspectRatio="none">
                <path
                  d="M0 110 C 100 110, 150 100, 200 40 C 250 10, 350 10, 400 40 C 450 100, 500 110, 600 110"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M0 110 C 100 110, 150 100, 200 40 C 250 10, 350 10, 400 40 C 450 100, 500 110, 600 110 L 600 120 L 0 120 Z"
                  fill="currentColor"
                  fillOpacity="0.07"
                ></path>
                {/* Midday peak circle */}
                <circle cx="300" cy="18" fill="#99452b" r="6"></circle>
              </svg>

              <div className="flex justify-between text-[11px] text-[#717973] font-semibold mt-2">
                <span>06:00 (Dawn)</span>
                <span>09:00</span>
                <span className="text-[#99452b] font-bold">13:00 (Solar Noon)</span>
                <span>17:00</span>
                <span>21:00 (Dusk)</span>
              </div>
            </div>
          </div>

          {/* Environmental parameters grid */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-[#f5f3ee] p-3 rounded-lg border border-[#eae8e3]">
              <span className="text-[11px] font-semibold uppercase text-[#717973] block mb-1">
                DLI (Daily Light Integral)
              </span>
              <span className="font-headline text-[18px] font-bold text-[#012d1d]">14.2 mol/m²/d</span>
              <span className="text-[11px] text-[#414844] block mt-0.5">High tropical photosynthetic grade</span>
            </div>

            <div className="bg-[#f5f3ee] p-3 rounded-lg border border-[#eae8e3]">
              <span className="text-[11px] font-semibold uppercase text-[#717973] block mb-1">
                UV Index Peak
              </span>
              <span className="font-headline text-[18px] font-bold text-[#012d1d]">
                {selectedZone.uvIndex} UVI
              </span>
              <span className="text-[11px] text-[#414844] block mt-0.5">Filtered through double glazing</span>
            </div>

            <div className="bg-[#f5f3ee] p-3 rounded-lg border border-[#eae8e3]">
              <span className="text-[11px] font-semibold uppercase text-[#717973] block mb-1">
                VPD (Vapor Deficit)
              </span>
              <span className="font-headline text-[18px] font-bold text-[#012d1d]">0.85 kPa</span>
              <span className="text-[11px] text-[#414844] block mt-0.5">Optimal transpiration comfort</span>
            </div>
          </div>
        </div>

        {/* Environmental Advice & Calibrations (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-6 shadow-sm border border-[#eae8e3] flex flex-col justify-between">
          <div>
            <h3 className="font-headline text-[18px] font-semibold text-[#012d1d] mb-2">
              Zone Biological Assessment
            </h3>
            <p className="text-xs text-[#414844] leading-relaxed mb-4">
              Recommendations calculated based on light indices, thermal stability, and current spring humidity curve.
            </p>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-[#f5f3ee] border border-[#eae8e3]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#012d1d] text-[18px]">verified</span>
                  <span className="font-body text-[13px] font-bold text-[#1b1c19]">
                    Prime Specimen Compatibility
                  </span>
                </div>
                <p className="text-xs text-[#414844]">
                  Ideal for Ficus lyrata, Monstera deliciosa, and large Aroid foliage. High foot-candle exposure fosters thick cuticle leaves.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#ffdbd0]/40 border border-[#ffdbd0]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#99452b] text-[18px]">warning</span>
                  <span className="font-body text-[13px] font-bold text-[#762c13]">
                    Airflow Regulation
                  </span>
                </div>
                <p className="text-xs text-[#762c13]">
                  Avoid placing Calathea directly into drafts. Maintain ambient humidity above 50% via ultrasonic diffuser.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#eae8e3] mt-6">
            <div className="flex items-center justify-between text-xs text-[#717973]">
              <span>Sensor Firmware</span>
              <span className="font-mono font-bold text-[#012d1d]">v2.4.1-Lora</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
