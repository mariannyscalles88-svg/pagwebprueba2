import React, { useState } from 'react';
import { PlantSpecimen, CareTask } from '../../data/botanicalData';
import { ScreenTab } from '../Sidebar';

interface OverviewViewProps {
  plants: PlantSpecimen[];
  tasks: CareTask[];
  onCompleteTask: (taskId: string) => void;
  onOpenAddPlant: () => void;
  onOpenLogCare: () => void;
  onSelectPlant: (plant: PlantSpecimen) => void;
  onNavigateTab: (tab: ScreenTab) => void;
  searchQuery: string;
  onSyncSensors: () => void;
  isSyncing: boolean;
  syncSuccessMessage: string | null;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  plants,
  tasks,
  onCompleteTask,
  onOpenAddPlant,
  onOpenLogCare,
  onSelectPlant,
  onNavigateTab,
  searchQuery,
  onSyncSensors,
  isSyncing,
  syncSuccessMessage,
}) => {
  const [selectedRoomFilter, setSelectedRoomFilter] = useState('All Rooms');

  // Filter tasks and calculations
  const totalTasks = tasks.length;
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedTasksCount / totalTasks) * 100);

  const urgentWaterCount = plants.filter((p) => p.soilMoisture < 25).length;
  const totalWaterVolumeNeeded = plants
    .filter((p) => p.soilMoisture < 35)
    .reduce((acc, p) => acc + p.volumeWaterMl, 0);

  // Filter plants for the table
  const filteredPlants = plants.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRoom =
      selectedRoomFilter === 'All Rooms' ||
      p.room.toLowerCase().includes(selectedRoomFilter.toLowerCase());

    return matchesSearch && matchesRoom;
  });

  const roomCounts = {
    'All Rooms': plants.length,
    Sunroom: plants.filter((p) => p.room.toLowerCase().includes('sunroom')).length,
    'Living Area': plants.filter((p) => p.room.toLowerCase().includes('living')).length,
    Bedside: plants.filter((p) => p.room.toLowerCase().includes('bedside')).length,
    Office: plants.filter((p) => p.room.toLowerCase().includes('office')).length,
  };

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Top Banner & Quick Status Section */}
      <section className="relative rounded-2xl bg-[#f5f3ee] p-6 sm:p-8 shadow-sm overflow-hidden border border-[#eae8e3]">
        <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-[#c1ecd4]/25 blur-3xl pointer-events-none"></div>
        <div className="absolute right-32 bottom-0 w-64 h-64 rounded-full bg-[#ffdbd0]/30 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#eae8e3]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e4e2dd] text-[#012d1d] font-body text-[11px] font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#012d1d] animate-pulse"></span>
              <span>Horticultural Station Alpha • Live Telemetry</span>
            </div>
            <h1 className="font-headline text-[32px] sm:text-[40px] text-[#012d1d] font-semibold tracking-tight leading-tight">
              Welcome back, Flora!{' '}
              <span
                role="img"
                aria-label="leaf"
                className="inline-block transform hover:rotate-12 transition-transform cursor-pointer"
              >
                🌿
              </span>
            </h1>
            <p className="font-body text-[15px] sm:text-[16px] text-[#414844] mt-1">
              Your indoor jungle is thriving.{' '}
              <span className="font-body font-bold text-[#012d1d]">
                {tasks.filter((t) => !t.completed).length} botanical tasks
              </span>{' '}
              demand your gentle touch before nightfall.
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenAddPlant}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#012d1d] text-white font-body text-[14px] font-semibold shadow-sm hover:opacity-95 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Add New Plant</span>
            </button>
            <button
              onClick={onOpenLogCare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#e4e2dd] text-[#012d1d] font-body text-[14px] font-semibold hover:bg-[#eae8e3] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
              <span>Log Quick Care</span>
            </button>
            <button
              onClick={onSyncSensors}
              disabled={isSyncing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#fbf9f4] text-[#414844] font-body text-[14px] font-semibold shadow-sm hover:text-[#012d1d] active:scale-95 transition-all border border-[#eae8e3]"
            >
              <span
                className={`material-symbols-outlined text-[18px] text-[#012d1d] ${
                  isSyncing ? 'animate-spin' : ''
                }`}
              >
                sync
              </span>
              <span>{isSyncing ? 'Syncing Sensors...' : syncSuccessMessage || 'Run Sensor Sync'}</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* Card 1 */}
          <div
            onClick={() => onNavigateTab('plant-inventory')}
            className="bg-white rounded-xl p-5 shadow-sm border border-[#eae8e3] flex items-start justify-between cursor-pointer hover:border-[#012d1d]/30 transition-all"
          >
            <div>
              <span className="font-body text-[11px] text-[#414844] font-semibold tracking-wider uppercase block mb-1">
                Active Specimen
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-[32px] font-bold text-[#012d1d]">
                  {plants.length}
                </span>
                <span className="font-body text-[11px] text-[#1b4332] font-semibold">+2 this month</span>
              </div>
              <span className="font-body text-[12px] text-[#414844] mt-1 block">
                Spanning 5 micro-zones
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#eae8e3] text-[#012d1d]">
              <span className="material-symbols-outlined text-[24px]">potted_plant</span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => onNavigateTab('watering-calendar')}
            className="bg-white rounded-xl p-5 shadow-sm border border-[#eae8e3] flex items-start justify-between cursor-pointer hover:border-[#99452b]/30 transition-all"
          >
            <div>
              <span className="font-body text-[11px] text-[#99452b] font-semibold tracking-wider uppercase block mb-1">
                Due for Water
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-[32px] font-bold text-[#99452b]">
                  {urgentWaterCount}
                </span>
                <span className="font-body text-[11px] text-[#99452b] font-semibold">Urgent</span>
              </div>
              <span className="font-body text-[12px] text-[#414844] mt-1 block">
                Total volume ~{totalWaterVolumeNeeded}ml needed
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#ffdbd0] text-[#3a0a00]">
              <span className="material-symbols-outlined material-symbols-fill text-[24px]">water_drop</span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => onNavigateTab('fertilization-and-nutrients')}
            className="bg-white rounded-xl p-5 shadow-sm border border-[#eae8e3] flex items-start justify-between cursor-pointer hover:border-[#012d1d]/30 transition-all"
          >
            <div>
              <span className="font-body text-[11px] text-[#414844] font-semibold tracking-wider uppercase block mb-1">
                Nutrient Feeds
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-[32px] font-bold text-[#012d1d]">2</span>
                <span className="font-body text-[11px] text-[#012d1d] font-semibold">This Week</span>
              </div>
              <span className="font-body text-[12px] text-[#414844] mt-1 block">
                Spring vegetative ratio
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#ceeacf] text-[#092010]">
              <span className="material-symbols-outlined text-[24px]">science</span>
            </div>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => onNavigateTab('sunlight-and-environment')}
            className="bg-white rounded-xl p-5 shadow-sm border border-[#eae8e3] flex items-start justify-between cursor-pointer hover:border-[#012d1d]/30 transition-all"
          >
            <div>
              <span className="font-body text-[11px] text-[#414844] font-semibold tracking-wider uppercase block mb-1">
                Mean Atmosphere
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-headline text-[32px] font-bold text-[#012d1d]">58%</span>
                <span className="font-body text-[11px] text-[#002114] bg-[#c1ecd4] px-2 py-0.5 rounded-full font-semibold">
                  Optimal
                </span>
              </div>
              <span className="font-body text-[12px] text-[#414844] mt-1 block">
                22.4°C conservatory temp
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#eae8e3] text-[#012d1d]">
              <span className="material-symbols-outlined text-[24px]">humidity_mid</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Urgent Routine & Daily Schedule Queue */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#99452b]"></span>
              <h2 className="font-headline text-[24px] sm:text-[28px] text-[#012d1d] font-medium tracking-tight">
                Today's Care Routine &amp; Urgent Tasks
              </h2>
            </div>
            <p className="font-body text-[14px] text-[#414844] mt-0.5">
              Prioritized by soil depletion and photoperiod cycles
            </p>
          </div>

          <div className="flex items-center gap-2 text-[#414844] font-body text-[13px]">
            <span>Cycle Progress:</span>
            <div className="w-32 bg-[#e4e2dd] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#012d1d] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="font-semibold text-[#012d1d]">
              {completedTasksCount} of {totalTasks} done
            </span>
          </div>
        </div>

        {/* Task Cards Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {tasks.map((task) => {
            const isCompleted = task.completed;
            return (
              <div
                key={task.id}
                className={`relative bg-white rounded-xl p-5 shadow-sm border border-[#eae8e3] flex flex-col justify-between transition-all duration-300 ${
                  isCompleted ? 'opacity-65 scale-[0.99] bg-[#f5f3ee]' : 'hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-body text-[11px] font-semibold ${
                        task.type === 'water'
                          ? 'bg-[#ffdbd0] text-[#762c13]'
                          : task.type === 'fertilizer'
                          ? 'bg-[#ceeacf] text-[#092010]'
                          : task.type === 'mist'
                          ? 'bg-[#fe9474]/25 text-[#762c13]'
                          : 'bg-[#c1ecd4] text-[#002114]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {task.type === 'water'
                          ? 'water_drop'
                          : task.type === 'fertilizer'
                          ? 'science'
                          : task.type === 'mist'
                          ? 'shower'
                          : 'check'}
                      </span>
                      <span>{task.badgeLabel}</span>
                    </span>
                    <span
                      className={`font-body text-[11px] font-bold ${
                        task.type === 'water' ? 'text-[#99452b]' : 'text-[#012d1d]'
                      }`}
                    >
                      {task.metricLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={task.image}
                      alt={task.plantName}
                      className="w-12 h-12 rounded-lg object-cover shadow-sm shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-body text-[15px] font-semibold text-[#1b1c19] truncate">
                        {task.plantName}
                      </h3>
                      <p className="font-body text-[12px] text-[#414844] truncate">{task.subLocation}</p>
                    </div>
                  </div>

                  <p className="font-body text-[12px] text-[#414844] mb-3 leading-relaxed">
                    {task.description}
                  </p>

                  {/* Indicator Box */}
                  <div className="bg-[#f5f3ee] rounded-lg p-2.5 mb-4 border border-[#eae8e3]">
                    <div className="flex justify-between items-center text-[11px] font-semibold mb-1">
                      <span className="text-[#414844]">{task.detailLabel}</span>
                      <span
                        className={
                          task.severity === 'urgent'
                            ? 'text-[#99452b]'
                            : task.severity === 'warning'
                            ? 'text-[#99452b]'
                            : 'text-[#012d1d]'
                        }
                      >
                        {task.detailValue}
                      </span>
                    </div>
                    <div className="w-full bg-[#e4e2dd] rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          task.severity === 'urgent'
                            ? 'bg-[#99452b]'
                            : task.severity === 'warning'
                            ? 'bg-[#fe9474]'
                            : 'bg-[#1b4332]'
                        }`}
                        style={{ width: `${task.progressValue}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                {task.type === 'autonomous' ? (
                  <div className="w-full py-2.5 px-3 rounded-lg bg-[#e4e2dd] text-[#414844] font-body text-[13px] font-semibold flex items-center justify-center gap-2 select-none">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Status Optimal</span>
                  </div>
                ) : (
                  <button
                    disabled={isCompleted}
                    onClick={() => onCompleteTask(task.id)}
                    className={`w-full py-2.5 px-3 rounded-lg font-body text-[13px] font-semibold flex items-center justify-center gap-2 transition-all ${
                      isCompleted
                        ? 'bg-[#c1ecd4] text-[#002114] cursor-not-allowed opacity-80'
                        : task.type === 'water'
                        ? 'bg-[#99452b] text-white hover:opacity-95 active:scale-95'
                        : task.type === 'fertilizer'
                        ? 'bg-[#012d1d] text-white hover:opacity-95 active:scale-95'
                        : 'bg-[#e4e2dd] text-[#012d1d] hover:bg-[#eae8e3] active:scale-95'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isCompleted ? 'check' : task.type === 'fertilizer' ? 'eco' : 'check_circle'}
                    </span>
                    <span>{isCompleted ? 'Completed' : task.actionText}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Plant Collection & Environmental Profiles Table/Cards */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline text-[24px] sm:text-[28px] text-[#012d1d] font-medium tracking-tight">
              Plant Collection &amp; Environmental Profiles
            </h2>
            <p className="font-body text-[14px] text-[#414844]">
              Photoperiod calibration, light indices (FC/UV), and subterranean moisture telemetry
            </p>
          </div>

          {/* Pill Room Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {(['All Rooms', 'Sunroom', 'Living Area', 'Bedside', 'Office'] as const).map((r) => {
              const isActive = selectedRoomFilter === r;
              const count = roomCounts[r] || 0;
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRoomFilter(r)}
                  className={`px-3.5 py-1.5 rounded-full font-body text-[12px] font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#012d1d] text-white shadow-sm'
                      : 'bg-[#f5f3ee] text-[#414844] hover:text-[#012d1d] hover:bg-[#eae8e3]'
                  }`}
                >
                  {r} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Collection Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-[#eae8e3] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f5f3ee] text-[#414844] font-body text-[11px] uppercase tracking-wider border-b border-[#eae8e3]">
                  <th className="py-3.5 px-6 font-semibold">Botanical Specimen</th>
                  <th className="py-3.5 px-4 font-semibold">Location &amp; Exposure</th>
                  <th className="py-3.5 px-4 font-semibold">Photoperiod &amp; Light Intensity</th>
                  <th className="py-3.5 px-4 font-semibold">Soil Hydration</th>
                  <th className="py-3.5 px-4 font-semibold">Care Cadence</th>
                  <th className="py-3.5 px-6 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f5f3ee] font-body text-[13px] text-[#1b1c19]">
                {filteredPlants.map((plant) => {
                  const isLow = plant.soilMoisture < 25;
                  return (
                    <tr
                      key={plant.id}
                      className="hover:bg-[#f5f3ee]/60 transition-colors group cursor-pointer"
                      onClick={() => onSelectPlant(plant)}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="w-11 h-11 rounded-lg object-cover shadow-sm ring-1 ring-[#eae8e3]"
                          />
                          <div>
                            <span className="font-body text-[15px] font-semibold text-[#012d1d] block leading-snug group-hover:underline">
                              {plant.name}
                            </span>
                            <span className="font-body text-[12px] text-[#717973] italic">
                              {plant.scientificName}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-body text-[13px] font-semibold text-[#1b1c19]">
                            {plant.room}
                          </span>
                          <span className="text-[#717973] font-body text-[12px]">
                            {plant.subLocation}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1">
                          <div
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-body text-[11px] font-semibold w-max ${
                              plant.lightCategory === 'direct'
                                ? 'bg-[#ffdbd0] text-[#762c13]'
                                : plant.lightCategory === 'bright-indirect'
                                ? 'bg-[#ffdbd0]/80 text-[#762c13]'
                                : 'bg-[#c1ecd4] text-[#002114]'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {plant.lightCategory === 'direct'
                                ? 'sunny'
                                : plant.lightCategory === 'bright-indirect'
                                ? 'wb_sunny'
                                : 'filter_vintage'}
                            </span>
                            <span>{plant.lightExposure}</span>
                          </div>
                          <span className="text-[#717973] font-body text-[11px]">
                            {plant.photoperiod}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="w-36">
                          <div className="flex justify-between font-body text-[11px] mb-1">
                            <span className={`font-bold ${isLow ? 'text-[#99452b]' : 'text-[#012d1d]'}`}>
                              {plant.soilMoisture}%
                            </span>
                            <span className={isLow ? 'text-[#99452b] font-medium' : 'text-[#717973]'}>
                              {plant.moistureStatus}
                            </span>
                          </div>
                          <div className="w-full bg-[#e4e2dd] rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isLow ? 'bg-[#99452b]' : 'bg-[#012d1d]'
                              }`}
                              style={{ width: `${plant.soilMoisture}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-col font-body text-[12px]">
                          <span>
                            {plant.cadenceDescription.split(':')[0]}:{' '}
                            <strong className={isLow ? 'text-[#99452b]' : 'text-[#012d1d]'}>
                              {plant.cadenceDescription.split(':')[1] || plant.cadenceDescription}
                            </strong>
                          </span>
                          <span className="text-[#717973]">{plant.feedSchedule}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPlant(plant);
                          }}
                          className="p-2 rounded-lg text-[#717973] hover:bg-[#eae8e3] hover:text-[#012d1d] transition-colors"
                          title="View botanical details"
                        >
                          <span className="material-symbols-outlined text-[20px]">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Fertilization & Nutrition Tracker + Weekly Care Matrix (Split Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Fertilization & Nutrition Tracker (7 Cols) */}
        <section className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#012d1d] text-[22px]">compost</span>
              <h2 className="font-headline text-[24px] sm:text-[28px] text-[#012d1d] font-medium tracking-tight">
                Fertilization &amp; Nutrition Tracker
              </h2>
            </div>
            <p className="font-body text-[14px] text-[#414844]">
              Soil mineral reserves, slow-release renewals, and seasonal vegetative curves
            </p>
          </div>

          {/* Seasonal Feeding Timeline Banner */}
          <div className="bg-[#f5f3ee] rounded-xl p-6 shadow-sm border border-[#eae8e3]">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#012d1d] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">energy_savings_leaf</span>
                </div>
                <div>
                  <span className="font-body text-[16px] font-bold text-[#012d1d] block leading-snug">
                    Spring/Summer Active Growth Phase
                  </span>
                  <span className="font-body text-[12px] text-[#414844]">
                    Higher nitrogen consumption • Bi-weekly cycle recommended
                  </span>
                </div>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#c1ecd4] text-[#002114] font-body text-[11px] font-bold">
                Active Surge
              </span>
            </div>

            {/* Visual Timeline Curve SVG */}
            <div className="w-full bg-white rounded-lg p-4 mb-4 border border-[#eae8e3]">
              <div className="flex justify-between items-center text-[11px] font-semibold text-[#414844] mb-2">
                <span>Dormancy (Nov-Feb)</span>
                <span className="text-[#012d1d] font-bold">Spring Surge (Mar-Jun) • CURRENT</span>
                <span>Peak Sun (Jul-Aug)</span>
                <span>Fall Taper (Sep-Oct)</span>
              </div>
              <svg className="w-full h-16 text-[#012d1d]" fill="none" preserveAspectRatio="none" viewBox="0 0 500 64">
                <path
                  d="M0 54 C 80 54, 120 48, 160 30 C 200 14, 250 8, 300 8 C 360 8, 420 28, 500 50"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                ></path>
                <path
                  d="M0 54 C 80 54, 120 48, 160 30 C 200 14, 250 8, 300 8 C 360 8, 420 28, 500 50 L 500 64 L 0 64 Z"
                  fill="currentColor"
                  fillOpacity="0.08"
                ></path>
                {/* Active marker point */}
                <circle cx="215" cy="18" fill="#99452b" r="5"></circle>
                <circle cx="215" cy="18" r="10" stroke="#99452b" strokeOpacity="0.4" strokeWidth="2"></circle>
              </svg>
              <div className="flex items-center justify-between text-[11px] mt-2 text-[#414844]">
                <span>0.5x Dosage</span>
                <span className="text-[#99452b] font-bold">1.5x Vegetative Formula (Current)</span>
                <span>1.0x Balanced</span>
                <span>0.25x Fall Taper</span>
              </div>
            </div>

            {/* Upcoming Nutrient Cycle Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div
                onClick={() => onNavigateTab('fertilization-and-nutrients')}
                className="bg-white rounded-lg p-4 shadow-sm border border-[#eae8e3] flex flex-col justify-between cursor-pointer hover:border-[#012d1d]/30 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#012d1d] text-[18px]">water</span>
                    <span className="font-body text-[15px] font-bold text-[#012d1d]">
                      Liquid Kelp Seaweed
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdbd0] text-[#762c13] font-body text-[11px] font-bold">
                    Saturday
                  </span>
                </div>
                <p className="font-body text-[12px] text-[#414844] mb-3 leading-relaxed">
                  Targeted for Aroid foliage health (Monstera, Philodendron, Anthurium). Micro-elements &amp; bio-stimulants.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#eae8e3] text-[11px]">
                  <span className="text-[#717973]">4 Specimens scheduled</span>
                  <span className="text-[#012d1d] font-bold">4ml / 2L Ratio</span>
                </div>
              </div>

              <div
                onClick={() => onNavigateTab('fertilization-and-nutrients')}
                className="bg-white rounded-lg p-4 shadow-sm border border-[#eae8e3] flex flex-col justify-between cursor-pointer hover:border-[#012d1d]/30 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#012d1d] text-[18px]">grain</span>
                    <span className="font-body text-[15px] font-bold text-[#012d1d]">
                      Osmocote Pellets
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#e4e2dd] text-[#414844] font-body text-[11px] font-bold">
                    In 14 Days
                  </span>
                </div>
                <p className="font-body text-[12px] text-[#414844] mb-3 leading-relaxed">
                  Slow-release resin bead renewal for Boston Fern, Hoyas, and Sansevieria. 6-month continuous depot.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#eae8e3] text-[11px]">
                  <span className="text-[#717973]">Substrate dressing</span>
                  <span className="text-[#012d1d] font-bold">1 Tbsp / 6" Pot</span>
                </div>
              </div>
            </div>

            {/* Health Tip Callout */}
            <div className="mt-4 rounded-lg bg-[#e4e2dd]/60 p-4 flex items-start gap-3 border border-[#eae8e3]">
              <span className="material-symbols-outlined text-[#99452b] text-[22px] shrink-0 mt-0.5">
                lightbulb
              </span>
              <div className="font-body text-[12px] text-[#414844] leading-relaxed">
                <strong className="font-body text-[14px] font-bold text-[#012d1d] block leading-tight mb-0.5">
                  Nutritional Warning Sign
                </strong>
                Beware of white crust salt buildup along terracotta rims or brown leaf tips—classic indications of over-fertilization. Always flush with clear distilled water once every 6 weeks.
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Care Matrix (5 Cols) */}
        <section className="lg:col-span-5 flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#012d1d] text-[22px]">calendar_view_week</span>
              <h2 className="font-headline text-[24px] sm:text-[28px] text-[#012d1d] font-medium tracking-tight">
                Weekly Care Matrix
              </h2>
            </div>
            <p className="font-body text-[14px] text-[#414844]">7-day forecast distribution (Mon - Sun)</p>
          </div>

          {/* Weekly Matrix Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#eae8e3] flex flex-col gap-4">
            {/* Day Pills Strip */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {/* Mon */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#f5f3ee] opacity-70">
                <span className="font-body text-[11px] text-[#414844]">Mon</span>
                <span className="font-body text-[15px] text-[#1b1c19] my-1 font-semibold">14</span>
                <span className="material-symbols-outlined text-[16px] text-[#012d1d]">check_circle</span>
              </div>
              {/* Tue */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#f5f3ee] opacity-70">
                <span className="font-body text-[11px] text-[#414844]">Tue</span>
                <span className="font-body text-[15px] text-[#1b1c19] my-1 font-semibold">15</span>
                <span className="material-symbols-outlined text-[16px] text-[#012d1d]">check_circle</span>
              </div>
              {/* Wed (Today) */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#012d1d] text-white shadow-sm ring-2 ring-[#012d1d]/20">
                <span className="font-body text-[10px] text-[#c1ecd4] uppercase tracking-wider font-bold">
                  Today
                </span>
                <span className="font-body text-[15px] text-white my-1 font-bold">16</span>
                <div className="flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffdbd0]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c1ecd4]"></span>
                </div>
              </div>
              {/* Thu */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#f5f3ee] hover:bg-[#eae8e3] transition-colors cursor-pointer">
                <span className="font-body text-[11px] text-[#414844]">Thu</span>
                <span className="font-body text-[15px] text-[#1b1c19] my-1 font-semibold">17</span>
                <span className="material-symbols-outlined text-[16px] text-[#414844]">water_drop</span>
              </div>
              {/* Fri */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#f5f3ee] hover:bg-[#eae8e3] transition-colors cursor-pointer">
                <span className="font-body text-[11px] text-[#414844]">Fri</span>
                <span className="font-body text-[15px] text-[#1b1c19] my-1 font-semibold">18</span>
                <span className="material-symbols-outlined text-[16px] text-[#717973]">remove</span>
              </div>
              {/* Sat */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#ffdbd0]/50 hover:bg-[#ffdbd0] transition-colors cursor-pointer">
                <span className="font-body text-[11px] text-[#99452b] font-bold">Sat</span>
                <span className="font-body text-[15px] text-[#1b1c19] my-1 font-semibold">19</span>
                <span className="material-symbols-outlined text-[16px] text-[#99452b]">science</span>
              </div>
              {/* Sun */}
              <div className="flex flex-col items-center p-2 rounded-lg bg-[#f5f3ee] hover:bg-[#eae8e3] transition-colors cursor-pointer">
                <span className="font-body text-[11px] text-[#414844]">Sun</span>
                <span className="font-body text-[15px] text-[#1b1c19] my-1 font-semibold">20</span>
                <span className="material-symbols-outlined text-[16px] text-[#012d1d]">water_drop</span>
              </div>
            </div>

            {/* Weekly Distribution Detail List */}
            <div className="flex flex-col gap-2.5 pt-2">
              <h4 className="font-body text-[11px] text-[#717973] uppercase tracking-wider font-semibold">
                Scheduled Activity Feed
              </h4>
              {/* Event 1 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#f5f3ee] border border-[#eae8e3]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ffdbd0] text-[#762c13] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">water_drop</span>
                  </div>
                  <div>
                    <span className="font-body text-[13px] font-semibold text-[#1b1c19] block">
                      Today: Monstera &amp; Calathea
                    </span>
                    <span className="font-body text-[11px] text-[#414844]">
                      350ml hydration + foliage mist
                    </span>
                  </div>
                </div>
                <span className="font-body text-[11px] text-[#99452b] font-bold">Due Now</span>
              </div>

              {/* Event 2 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#f5f3ee] border border-[#eae8e3]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#eae8e3] text-[#012d1d] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">water_drop</span>
                  </div>
                  <div>
                    <span className="font-body text-[13px] font-semibold text-[#1b1c19] block">
                      Thu, Apr 17: Golden Pothos
                    </span>
                    <span className="font-body text-[11px] text-[#414844]">
                      Even soil soak • 200ml
                    </span>
                  </div>
                </div>
                <span className="font-body text-[11px] text-[#717973]">Tomorrow</span>
              </div>

              {/* Event 3 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#f5f3ee] border border-[#eae8e3]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ceeacf] text-[#092010] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">science</span>
                  </div>
                  <div>
                    <span className="font-body text-[13px] font-semibold text-[#1b1c19] block">
                      Sat, Apr 19: Seaweed Kelp Application
                    </span>
                    <span className="font-body text-[11px] text-[#414844]">
                      Aroids collective feeding cycle
                    </span>
                  </div>
                </div>
                <span className="font-body text-[11px] text-[#012d1d] font-bold">In 3 Days</span>
              </div>

              {/* Event 4 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#f5f3ee] border border-[#eae8e3]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#eae8e3] text-[#012d1d] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[16px]">water_drop</span>
                  </div>
                  <div>
                    <span className="font-body text-[13px] font-semibold text-[#1b1c19] block">
                      Sun, Apr 20: Bird of Paradise
                    </span>
                    <span className="font-body text-[11px] text-[#414844]">
                      Deep basin soak • 600ml
                    </span>
                  </div>
                </div>
                <span className="font-body text-[11px] text-[#717973]">In 4 Days</span>
              </div>
            </div>

            {/* Weekly Summary Footer */}
            <div className="mt-2 pt-3 border-t border-[#eae8e3] flex items-center justify-between text-[12px] font-body text-[#414844]">
              <span>
                Weekly target: <strong className="text-[#1b1c19]">5 Waterings</strong> •{' '}
                <strong className="text-[#1b1c19]">2 Feedings</strong>
              </span>
              <button
                onClick={() => onNavigateTab('watering-calendar')}
                className="text-[#012d1d] font-body text-[12px] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Month</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
