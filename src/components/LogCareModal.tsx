import React, { useState } from 'react';
import { PlantSpecimen } from '../data/botanicalData';

interface LogCareModalProps {
  isOpen: boolean;
  onClose: () => void;
  plants: PlantSpecimen[];
  onLogCare: (data: {
    plantId: string;
    plantName: string;
    action: 'Hydration' | 'Nutrient Feed' | 'Foliage Mist' | 'Repotting' | 'Pruning';
    amount: string;
    notes: string;
    room: string;
  }) => void;
  preselectedPlantId?: string;
}

export const LogCareModal: React.FC<LogCareModalProps> = ({
  isOpen,
  onClose,
  plants,
  onLogCare,
  preselectedPlantId,
}) => {
  const [plantId, setPlantId] = useState(preselectedPlantId || (plants[0]?.id ?? ''));
  const [action, setAction] = useState<'Hydration' | 'Nutrient Feed' | 'Foliage Mist' | 'Repotting' | 'Pruning'>('Hydration');
  const [amount, setAmount] = useState('350ml filtered water');
  const [notes, setNotes] = useState('Routine botanical care applied.');

  if (!isOpen) return null;

  const currentPlant = plants.find((p) => p.id === plantId) || plants[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPlant) return;

    onLogCare({
      plantId: currentPlant.id,
      plantName: currentPlant.name,
      action,
      amount,
      notes,
      room: currentPlant.room,
    });
    onClose();
  };

  const actionPresets: Record<string, string> = {
    Hydration: `${currentPlant?.volumeWaterMl || 350}ml filtered water`,
    'Nutrient Feed': '2.5ml / 1L Liquid Kelp Formula',
    'Foliage Mist': 'Distilled ultrasonic micro-droplets',
    Repotting: 'Fresh aroid substrate renewal + mycorrhizae',
    Pruning: 'Sanitized dead foliage trim',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fbf9f4] w-full max-w-lg rounded-2xl shadow-2xl border border-[#eae8e3] overflow-hidden">
        <div className="px-6 py-4 bg-[#f5f3ee] border-b border-[#eae8e3] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#99452b] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
            </div>
            <div>
              <h3 className="font-headline text-[18px] font-semibold text-[#012d1d]">
                Log Botanical Care
              </h3>
              <p className="font-body text-[11px] text-[#414844]">
                Record intervention into Station Alpha history ledger
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#717973] hover:bg-[#eae8e3] hover:text-[#1b1c19] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
              Select Specimen
            </label>
            <select
              value={plantId}
              onChange={(e) => {
                setPlantId(e.target.value);
                const pl = plants.find((p) => p.id === e.target.value);
                if (pl && action === 'Hydration') {
                  setAmount(`${pl.volumeWaterMl}ml filtered water`);
                }
              }}
              className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
            >
              {plants.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.room} • {p.soilMoisture}% moisture)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
              Care Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Hydration', 'Nutrient Feed', 'Foliage Mist'] as const).map((act) => (
                <button
                  key={act}
                  type="button"
                  onClick={() => {
                    setAction(act);
                    setAmount(actionPresets[act] || '');
                  }}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    action === act
                      ? 'bg-[#012d1d] text-white border-[#012d1d]'
                      : 'bg-white text-[#414844] border-[#eae8e3] hover:bg-[#f5f3ee]'
                  }`}
                >
                  {act}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
              Dosage / Volume / Application
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
            />
          </div>

          <div>
            <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
              Notes & Observations
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
              placeholder="e.g. Cleared salt residue, soil absorbed water readily."
            ></textarea>
          </div>

          <div className="pt-3 border-t border-[#eae8e3] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-[#414844] hover:bg-[#eae8e3] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold bg-[#99452b] text-white hover:opacity-95 rounded-lg shadow-sm transition-all"
            >
              Save Care Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
