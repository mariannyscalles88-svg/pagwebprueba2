import React, { useState } from 'react';
import { PlantSpecimen } from '../data/botanicalData';

interface AddPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlant: (plant: PlantSpecimen) => void;
}

const PRESET_IMAGES = [
  {
    name: 'Monstera Deliciosa',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe9ELSkIjr_x5dyU9zfXGqY5eYeHOZ4aghmbUkXGcCTvEu5aJ6ChyC1zeLAz5LtmAgAwjiBiYBIdrR7p5K4OzbK1GCufsrz45QZoz4SnUP3MqUYg2PVfB2L4SOkMXMGYod8yWVgyb0kZjq62YPW86IQjXD20A3xJ0FknSsqxgRUUXpOaE6IKrQDBrv3_ZI6Le6Ldo6GUOuJkPAKmEPbWjve-wBAqTxCGVWnGVUVIDKep9j20H0b7e2'
  },
  {
    name: 'Fiddle Leaf Fig',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIIOwE4tFcGVukJSAY82ezosJ7Xwo5uTP07ntqHiVgy2oPx7QvjfGRjnn5eqkIdG6GrrAX4ggLV5o6ZQwDtIbdKGDmkGTtiCI8U0y2AohhEqER0x09w0Y0Clnjo7Ewy_xz8vu34kU2fkJXKELk8GatNJZMCCwbF2iDwNB00Mwjjrjhna5uESPT3OEpNPHEiLu6qz9_J--8BEqNhavtKPMxWhhY5i63JN8NgxEV-S2rxvzEJlAWwwGo'
  },
  {
    name: 'Calathea Orbifolia',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWaoEOwgI92_qZLuRjOTVMe-Scah-nQipbQb7zWNgUYUTfJ9z9l6YCpTF_QwAPMAniMveQKJAhWvAv2R1t0tVkd6YF2Btp7JhtZl4E274hCyh_7czHNkjTFovFm5HxxbchbDYzETI19BxTI8QZvCg701S9B-NdMVVjm0rrvAmQfG1RXFq8kfNhRa_7Yvn7kcunCwenllp7NdtnHy2vJ2bFJyGNMt-wN-dYqDUKnurCqj3GtDM30J6M'
  },
  {
    name: 'Snake Plant',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAy6DHffnetcuc_EAs1tXwnK86bEMz0k8ndopZdWRQWZGar5VMAJ2HaVeH7Xf2tcV8KihgqHyW__nAPQI94puGda_IuvjAlfceJb90XOTi94iqfzB40fqd4-cDY4Tk0lH9Q6ZwXxEhEA3ROEdxEnLfbFn4U3i0PRirYqH20VRpa5wL-gKar76FUyyFwWbHud74ZStzCwMLTo2014zOvOZbatt_tbh79XCOcD1n0aWXrfStfONjhFVcP'
  },
  {
    name: 'Bird of Paradise',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpalOkgwccLoZceURtDYbXTOWGW4xWSb5LWGl_NgUoxO7Oa_USDkdlnF9OX0Ed7FDwuP9Tpita-my2bKot3klGkNhzbDUCzJnbouwMyP4fWRghNXAVvGeeQmDe5QbWfPNQUVFApcD34G78q4CqPwcHoqHeBXA2S7AgreflQIIT3_1WbGpQiEKX9wiAtH1reE5T3yayFARBvdKkJvmTbzmsfPToBRdKRkzqeO1n7Wmgep5FIcQLx3wG'
  },
  {
    name: 'Golden Pothos',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY_Nsdg5s4iuL47MhpoNBFzgFeOc3x75aS47I1khHSkY-hdCl6Lj5rlC6LASnXZPqGdK2d9sYsPm26oRST0B09NBtLJ4II8jem4oxyMkM1pzlsDSw9WrJxl8RCKXKyIqj7ND7UWh9JPpjbLN0bTDruN7gFZbId9jdwJ37-gTQfc2KqScjQQqHHcmnNE46lJnfsj_x6pUrzzfcecYuqZmwrO4AfuVteaeUj9GV_WrboTPdf1nlxB9YG'
  }
];

export const AddPlantModal: React.FC<AddPlantModalProps> = ({ isOpen, onClose, onAddPlant }) => {
  const [name, setName] = useState('');
  const [scientificName, setScientificName] = useState('');
  const [room, setRoom] = useState('Living Area');
  const [subLocation, setSubLocation] = useState('East Bay Alcove');
  const [lightCategory, setLightCategory] = useState<'direct' | 'bright-indirect' | 'moderate' | 'low'>('bright-indirect');
  const [fcRange, setFcRange] = useState('600-900 FC');
  const [photoperiod, setPhotoperiod] = useState('6-8 hrs/day • Filtered');
  const [waterCadenceDays, setWaterCadenceDays] = useState(7);
  const [feedSchedule, setFeedSchedule] = useState('Bi-weekly Liquid Kelp');
  const [potType, setPotType] = useState('Unglazed Terracotta');
  const [potSize, setPotSize] = useState('10 inch');
  const [substrate, setSubstrate] = useState('Aroid Chunky Bark & Pumice Mix');
  const [volumeWaterMl, setVolumeWaterMl] = useState(350);
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0].url);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPlant: PlantSpecimen = {
      id: `specimen-${Date.now()}`,
      name: name.trim(),
      scientificName: scientificName.trim() || name.trim(),
      room,
      subLocation,
      lightExposure: `${lightCategory === 'direct' ? 'Direct Sunlight' : lightCategory === 'bright-indirect' ? 'Bright Indirect' : lightCategory === 'moderate' ? 'Mod-Bright' : 'Low Light'} • ${fcRange}`,
      lightCategory,
      fcRange,
      photoperiod,
      soilMoisture: 65,
      moistureStatus: 'Moist',
      waterCadenceDays: Number(waterCadenceDays),
      cadenceDescription: `Water: Every ${waterCadenceDays} Days`,
      feedSchedule: `Feed: ${feedSchedule}`,
      image: selectedImage,
      potType,
      potSize,
      substrate,
      volumeWaterMl: Number(volumeWaterMl),
      health: 'thriving',
      lastWatered: 'Just added',
      notes: notes.trim() || 'Newly cataloged into Station Alpha collection.'
    };

    onAddPlant(newPlant);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#fbf9f4] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#eae8e3] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#f5f3ee] border-b border-[#eae8e3] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#012d1d] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-headline text-[18px] font-semibold text-[#012d1d]">
                Catalog New Botanical Specimen
              </h3>
              <p className="font-body text-[11px] text-[#414844]">
                Register plant taxonomy, micro-zone location, and watering telemetry
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

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Preset Image Picker */}
          <div>
            <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-2">
              Select Botanical Photo
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {PRESET_IMAGES.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all group ${
                    selectedImage === img.url
                      ? 'border-[#012d1d] ring-2 ring-[#012d1d]/20 scale-102'
                      : 'border-transparent hover:border-[#c1c8c2]'
                  }`}
                >
                  <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  {selectedImage === img.url && (
                    <div className="absolute inset-0 bg-[#012d1d]/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-[20px]">check</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
                Common Name *
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Philodendron Gloriosum"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
              />
            </div>
            <div>
              <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
                Scientific Taxonomy (Latin)
              </label>
              <input
                type="text"
                placeholder="e.g. Philodendron gloriosum André"
                value={scientificName}
                onChange={(e) => setScientificName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm italic text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
                Room / Micro-Zone
              </label>
              <select
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
              >
                <option value="Sunroom">Sunroom (High Solar)</option>
                <option value="Living Area">Living Area & Patio</option>
                <option value="Bedside">Bedside Sanctuary</option>
                <option value="Office">Office Nook</option>
                <option value="Conservatory">Conservatory Alpha</option>
              </select>
            </div>
            <div>
              <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
                Sub-Location / Exposure
              </label>
              <input
                type="text"
                placeholder="e.g. South Tier 2 Glass Shelf"
                value={subLocation}
                onChange={(e) => setSubLocation(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
                Light Intensity
              </label>
              <select
                value={lightCategory}
                onChange={(e) => setLightCategory(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
              >
                <option value="direct">Direct Sun (1500+ FC)</option>
                <option value="bright-indirect">Bright Indirect (800-1200 FC)</option>
                <option value="moderate">Medium Filtered (400-600 FC)</option>
                <option value="low">Low Light (100-300 FC)</option>
              </select>
            </div>
            <div>
              <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
                Water Cadence (Days)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={waterCadenceDays}
                onChange={(e) => setWaterCadenceDays(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
              />
            </div>
            <div>
              <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
                Water Volume (ml)
              </label>
              <input
                type="number"
                min="50"
                max="2000"
                step="50"
                value={volumeWaterMl}
                onChange={(e) => setVolumeWaterMl(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
                Pot Specification
              </label>
              <input
                type="text"
                placeholder="e.g. Terracotta 10 inch"
                value={`${potType} - ${potSize}`}
                onChange={(e) => setPotType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
              />
            </div>
            <div>
              <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
                Substrate Composition
              </label>
              <input
                type="text"
                placeholder="e.g. Chunky Aroid bark, pumice, charcoal"
                value={substrate}
                onChange={(e) => setSubstrate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-body text-[12px] font-semibold text-[#1b1c19] mb-1">
              Curator Notes / Seasonal Guidelines
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Emerging leaf fenestrations observed. Keep humidity above 55%."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#eae8e3] rounded-lg text-sm text-[#1b1c19] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/20"
            ></textarea>
          </div>

          <div className="pt-2 border-t border-[#eae8e3] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-[#414844] hover:bg-[#eae8e3] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold bg-[#012d1d] text-white hover:opacity-95 rounded-lg shadow-sm transition-all"
            >
              Catalog Specimen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
