import React, { useState } from 'react';

interface SettingsViewProps {
  currentSeason: string;
  onSeasonChange: (season: string) => void;
  onResetData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentSeason,
  onSeasonChange,
  onResetData,
}) => {
  const [stationName, setStationName] = useState('Horticultural Station Alpha');
  const [curatorName, setCuratorName] = useState('Elena Rostova');
  const [moistureAlertThreshold, setMoistureAlertThreshold] = useState(20);
  const [syncInterval, setSyncInterval] = useState('15');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#012d1d] text-[24px]">settings</span>
          <h1 className="font-headline text-[28px] text-[#012d1d] font-semibold tracking-tight">
            Station &amp; Telemetry Settings
          </h1>
        </div>
        <p className="font-body text-[14px] text-[#414844] mt-0.5">
          Configure sensor synchronization, seasonal vegetative curves, and hydration thresholds
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Station Identity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eae8e3]">
          <h3 className="font-headline text-[18px] font-semibold text-[#012d1d] mb-4 pb-2 border-b border-[#eae8e3]">
            Station Identity &amp; Curator
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1b1c19] mb-1">
                Station Name
              </label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                className="w-full px-3 py-2 bg-[#f5f3ee] border border-[#eae8e3] rounded-lg text-xs font-semibold text-[#1b1c19] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1b1c19] mb-1">
                Botanical Lead / Curator
              </label>
              <input
                type="text"
                value={curatorName}
                onChange={(e) => setCuratorName(e.target.value)}
                className="w-full px-3 py-2 bg-[#f5f3ee] border border-[#eae8e3] rounded-lg text-xs font-semibold text-[#1b1c19] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Seasonal Care Cycle */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eae8e3]">
          <h3 className="font-headline text-[18px] font-semibold text-[#012d1d] mb-4 pb-2 border-b border-[#eae8e3]">
            Active Botanical Care Cycle
          </h3>

          <p className="text-xs text-[#414844] mb-3">
            The active cycle recalibrates all automatic feeding formulas, water cadences, and photoperiod warnings.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'Spring', label: 'Spring Surge', desc: '1.5x N-P-K growth multiplier' },
              { id: 'Summer', label: 'Peak Sun', desc: 'Maximum hydration & misting' },
              { id: 'Autumn', label: 'Fall Taper', desc: 'Gradual fertilizer reduction' },
              { id: 'Winter', label: 'Dormancy', desc: 'Minimal moisture, 0x feeds' },
            ].map((cycle) => (
              <button
                key={cycle.id}
                type="button"
                onClick={() => onSeasonChange(cycle.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  currentSeason.toLowerCase() === cycle.id.toLowerCase()
                    ? 'bg-[#012d1d] text-white border-[#012d1d] shadow-sm'
                    : 'bg-[#f5f3ee] text-[#414844] border-[#eae8e3] hover:bg-[#eae8e3]'
                }`}
              >
                <span className="font-bold text-xs block mb-1">{cycle.label}</span>
                <span
                  className={`text-[11px] block leading-tight ${
                    currentSeason.toLowerCase() === cycle.id.toLowerCase()
                      ? 'text-[#c1ecd4]'
                      : 'text-[#717973]'
                  }`}
                >
                  {cycle.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry & Alert Thresholds */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eae8e3]">
          <h3 className="font-headline text-[18px] font-semibold text-[#012d1d] mb-4 pb-2 border-b border-[#eae8e3]">
            Telemetry Sampling &amp; Moisture Thresholds
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Critical Soil Dehydration Threshold</span>
                <span className="text-[#99452b]">{moistureAlertThreshold}% Moisture</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={moistureAlertThreshold}
                onChange={(e) => setMoistureAlertThreshold(Number(e.target.value))}
                className="w-full accent-[#012d1d]"
              />
              <p className="text-[11px] text-[#717973] mt-1">
                Plants dipping below this value automatically trigger an Urgent Care Routine task card.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#eae8e3]">
              <div>
                <label className="block text-xs font-bold text-[#1b1c19] mb-1">
                  Subterranean Sensor Polling Frequency
                </label>
                <select
                  value={syncInterval}
                  onChange={(e) => setSyncInterval(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f5f3ee] border border-[#eae8e3] rounded-lg text-xs font-semibold text-[#1b1c19] focus:outline-none"
                >
                  <option value="5">Every 5 Minutes (High Precision)</option>
                  <option value="15">Every 15 Minutes (Balanced Battery)</option>
                  <option value="60">Hourly (Low Power Conservation)</option>
                  <option value="manual">Manual Pull Only</option>
                </select>
              </div>

              <div className="flex flex-col justify-center space-y-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="accent-[#012d1d] rounded"
                  />
                  <span className="text-xs font-semibold text-[#1b1c19]">
                    Push notification for urgent water events
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundAlerts}
                    onChange={(e) => setSoundAlerts(e.target.checked)}
                    className="accent-[#012d1d] rounded"
                  />
                  <span className="text-xs font-semibold text-[#1b1c19]">
                    Audible chime on sensor telemetry sync
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onResetData}
            className="px-4 py-2 rounded-lg bg-[#ffdad6] text-[#93000a] text-xs font-bold hover:bg-[#ffb59f] transition-colors"
          >
            Reset Seed Data
          </button>

          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="text-xs font-bold text-[#012d1d] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Preferences Saved!</span>
              </span>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#012d1d] text-white text-xs font-bold hover:opacity-95 shadow-sm transition-all"
            >
              Save Configuration
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
