import React, { useState } from 'react';
import { PlantSpecimen } from '../../data/botanicalData';

interface PlantInventoryViewProps {
  plants: PlantSpecimen[];
  onSelectPlant: (plant: PlantSpecimen) => void;
  onWaterPlant: (plantId: string) => void;
  onOpenAddPlant: () => void;
  searchQuery: string;
}

export const PlantInventoryView: React.FC<PlantInventoryViewProps> = ({
  plants,
  onSelectPlant,
  onWaterPlant,
  onOpenAddPlant,
  searchQuery,
}) => {
  const [selectedRoom, setSelectedRoom] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'critical' | 'thriving'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const rooms = ['All', 'Sunroom', 'Living Area', 'Bedside', 'Office', 'Conservatory'];

  const filtered = plants.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.room.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRoom = selectedRoom === 'All' || p.room.toLowerCase().includes(selectedRoom.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'critical' ? p.soilMoisture < 30 : p.soilMoisture >= 30);

    return matchesSearch && matchesRoom && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-[24px]">potted_plant</span>
            <h1 className="font-headline text-[28px] text-[#012d1d] font-semibold tracking-tight">
              Botanical Specimen Inventory
            </h1>
          </div>
          <p className="font-body text-[14px] text-[#414844] mt-0.5">
            Complete horticultural registry across 5 indoor micro-zones ({plants.length} specimens total)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="bg-[#eae8e3] p-1 rounded-lg flex items-center gap-1 border border-[#e4e2dd]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-[#012d1d] shadow-sm' : 'text-[#717973]'
              }`}
              title="Grid View"
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table' ? 'bg-white text-[#012d1d] shadow-sm' : 'text-[#717973]'
              }`}
              title="Table View"
            >
              <span className="material-symbols-outlined text-[18px]">table_rows</span>
            </button>
          </div>

          <button
            onClick={onOpenAddPlant}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#012d1d] text-white font-body text-[13px] font-semibold shadow-sm hover:opacity-95 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Add Plant</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#f5f3ee] rounded-xl border border-[#eae8e3]">
        {/* Room Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
          {rooms.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRoom(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedRoom === r
                  ? 'bg-[#012d1d] text-white'
                  : 'bg-white text-[#414844] hover:bg-[#eae8e3] border border-[#eae8e3]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#717973] font-semibold">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="px-2.5 py-1.5 bg-white border border-[#eae8e3] rounded-lg text-xs text-[#1b1c19] focus:outline-none"
          >
            <option value="All">All Soil States</option>
            <option value="critical">Critical (&lt; 30%)</option>
            <option value="thriving">Hydrated (30%+)</option>
          </select>
        </div>
      </div>

      {/* Content Rendering */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((plant) => {
            const isLow = plant.soilMoisture < 25;
            return (
              <div
                key={plant.id}
                onClick={() => onSelectPlant(plant)}
                className="bg-white rounded-xl shadow-sm border border-[#eae8e3] overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#012d1d]/30 transition-all cursor-pointer group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-[#eae8e3]">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider">
                        {plant.room}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-md ${
                          isLow ? 'bg-[#ffdbd0] text-[#99452b]' : 'bg-[#c1ecd4] text-[#002114]'
                        }`}
                      >
                        {plant.soilMoisture}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <h3 className="font-body text-[16px] font-bold text-[#012d1d] leading-snug group-hover:underline">
                        {plant.name}
                      </h3>
                      <p className="font-body text-[12px] text-[#717973] italic">
                        {plant.scientificName}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5 text-xs text-[#414844] mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-[#717973]">
                          location_on
                        </span>
                        <span className="truncate">{plant.subLocation}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-[#717973]">
                          wb_sunny
                        </span>
                        <span className="truncate">{plant.fcRange}</span>
                      </div>
                    </div>

                    {/* Moisture Gauge */}
                    <div className="bg-[#f5f3ee] p-2.5 rounded-lg border border-[#eae8e3]">
                      <div className="flex justify-between text-[11px] font-semibold mb-1">
                        <span className="text-[#414844]">Moisture Index</span>
                        <span className={isLow ? 'text-[#99452b] font-bold' : 'text-[#012d1d]'}>
                          {plant.soilMoisture}% ({plant.moistureStatus})
                        </span>
                      </div>
                      <div className="w-full bg-[#e4e2dd] rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isLow ? 'bg-[#99452b]' : 'bg-[#012d1d]'
                          }`}
                          style={{ width: `${plant.soilMoisture}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card footer buttons */}
                <div className="p-4 pt-0 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onWaterPlant(plant.id);
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isLow
                        ? 'bg-[#99452b] text-white hover:opacity-95'
                        : 'bg-[#f5f3ee] text-[#012d1d] hover:bg-[#eae8e3]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">water_drop</span>
                    <span>{isLow ? 'Water Now' : 'Hydrate'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlant(plant);
                    }}
                    className="p-2 rounded-lg bg-[#f5f3ee] text-[#717973] hover:text-[#012d1d] hover:bg-[#eae8e3] transition-colors"
                    title="Specimen telemetry & logs"
                  >
                    <span className="material-symbols-outlined text-[18px]">info</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl shadow-sm border border-[#eae8e3] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f5f3ee] text-[#414844] font-body text-[11px] uppercase tracking-wider border-b border-[#eae8e3]">
                  <th className="py-3 px-6 font-semibold">Specimen</th>
                  <th className="py-3 px-4 font-semibold">Room &amp; Sub-Zone</th>
                  <th className="py-3 px-4 font-semibold">Light Requirement</th>
                  <th className="py-3 px-4 font-semibold">Moisture</th>
                  <th className="py-3 px-4 font-semibold">Volume / Cadence</th>
                  <th className="py-3 px-6 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f3ee] text-[13px] text-[#1b1c19]">
                {filtered.map((plant) => (
                  <tr
                    key={plant.id}
                    onClick={() => onSelectPlant(plant)}
                    className="hover:bg-[#f5f3ee]/60 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <span className="font-bold text-[#012d1d] block">{plant.name}</span>
                          <span className="text-xs text-[#717973] italic">{plant.scientificName}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-[#1b1c19] block">{plant.room}</span>
                      <span className="text-xs text-[#717973]">{plant.subLocation}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#414844]">
                      {plant.lightExposure}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-bold text-xs ${
                          plant.soilMoisture < 25 ? 'text-[#99452b]' : 'text-[#012d1d]'
                        }`}
                      >
                        {plant.soilMoisture}% ({plant.moistureStatus})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#414844]">
                      {plant.volumeWaterMl}ml • {plant.cadenceDescription}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onWaterPlant(plant.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#012d1d] text-white text-xs font-semibold hover:opacity-90"
                      >
                        Water
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
