import React, { useState } from 'react';
import { PlantSpecimen } from '../../data/botanicalData';

interface WateringCalendarViewProps {
  plants: PlantSpecimen[];
  onWaterPlant: (plantId: string) => void;
  onOpenLogCare: () => void;
}

interface CalendarDayTask {
  id: string;
  plantId: string;
  plantName: string;
  room: string;
  type: 'water' | 'fertilizer' | 'mist';
  volume: string;
  done: boolean;
}

export const WateringCalendarView: React.FC<WateringCalendarViewProps> = ({
  plants,
  onWaterPlant,
  onOpenLogCare,
}) => {
  const [selectedDay, setSelectedDay] = useState(16); // Wed 16 is today

  // Build calendar task schedule
  const calendarTasks: Record<number, CalendarDayTask[]> = {
    14: [
      { id: 't1', plantId: 'zz-plant', plantName: 'ZZ Plant', room: 'Office', type: 'water', volume: '250ml', done: true },
    ],
    15: [
      { id: 't2', plantId: 'bird-of-paradise', plantName: 'Bird of Paradise', room: 'Living Area', type: 'water', volume: '600ml', done: true },
    ],
    16: [
      { id: 't3', plantId: 'monstera-deliciosa', plantName: 'Monstera Deliciosa', room: 'Living Area', type: 'water', volume: '350ml', done: false },
      { id: 't4', plantId: 'calathea-orbifolia', plantName: 'Calathea Orbifolia', room: 'Bedside', type: 'mist', volume: 'Fine Mist 45m', done: false },
      { id: 't5', plantId: 'ficus-lyrata', plantName: 'Ficus Lyrata', room: 'Sunroom', type: 'fertilizer', volume: '2.5ml N-P-K', done: false },
    ],
    17: [
      { id: 't6', plantId: 'golden-pothos', plantName: 'Golden Pothos', room: 'Conservatory', type: 'water', volume: '200ml', done: false },
      { id: 't7', plantId: 'maranta-leuconeura', plantName: 'Red Prayer Plant', room: 'Bedside', type: 'mist', volume: 'Foliage Mist', done: false },
    ],
    18: [
      { id: 't8', plantId: 'anthurium-clarinervium', plantName: 'Anthurium Clarinervium', room: 'Conservatory', type: 'water', volume: '220ml', done: false },
    ],
    19: [
      { id: 't9', plantId: 'all-aroids', plantName: 'All Aroids Batch', room: 'Multiple', type: 'fertilizer', volume: 'Liquid Kelp Seaweed 4ml/2L', done: false },
    ],
    20: [
      { id: 't10', plantId: 'bird-of-paradise', plantName: 'Bird of Paradise', room: 'Living Area', type: 'water', volume: '600ml', done: false },
      { id: 't11', plantId: 'alocasia-zebrina', plantName: 'Alocasia Zebrina', room: 'Sunroom', type: 'water', volume: '350ml', done: false },
    ],
    23: [
      { id: 't12', plantId: 'ficus-lyrata', plantName: 'Ficus Lyrata', room: 'Sunroom', type: 'water', volume: '800ml', done: false },
    ],
    24: [
      { id: 't13', plantId: 'snake-plant-laurentii', plantName: 'Snake Plant (Laurentii)', room: 'Office', type: 'water', volume: '300ml', done: false },
    ],
  };

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const activeDayTasks = calendarTasks[selectedDay] || [];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-[24px]">water_drop</span>
            <h1 className="font-headline text-[28px] text-[#012d1d] font-semibold tracking-tight">
              Watering &amp; Hydration Calendar
            </h1>
          </div>
          <p className="font-body text-[14px] text-[#414844] mt-0.5">
            April 2026 • Synchronized with subterranean sensor telemetry
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLogCare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#012d1d] text-white text-xs font-semibold shadow-sm hover:opacity-95"
          >
            <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
            <span>Log Care</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl border border-[#eae8e3] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs uppercase text-[#717973] font-semibold block mb-1">
              Volume Forecast
            </span>
            <span className="font-headline text-[24px] font-bold text-[#012d1d]">3,850 ml</span>
            <span className="text-xs text-[#414844] block mt-0.5">Filtered rainwater this week</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#ffdbd0] text-[#762c13] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">water</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#eae8e3] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs uppercase text-[#717973] font-semibold block mb-1">
              Active Watering Days
            </span>
            <span className="font-headline text-[24px] font-bold text-[#012d1d]">5 Days</span>
            <span className="text-xs text-[#414844] block mt-0.5">Optimal stagger cycle</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#ceeacf] text-[#092010] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">event_available</span>
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#eae8e3] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs uppercase text-[#717973] font-semibold block mb-1">
              Autonomous Specimens
            </span>
            <span className="font-headline text-[24px] font-bold text-[#012d1d]">6 Plants</span>
            <span className="text-xs text-[#414844] block mt-0.5">Drying at natural rhythm</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#e4e2dd] text-[#012d1d] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">nature</span>
          </div>
        </div>
      </div>

      {/* Main Calendar Grid & Day Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Grid (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-[#eae8e3] p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#eae8e3]">
            <h2 className="font-headline text-[18px] font-semibold text-[#012d1d]">
              April 2026
            </h2>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 text-[#99452b]">
                <span className="w-2 h-2 rounded-full bg-[#99452b]"></span>
                <span>Water</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[#012d1d] ml-2">
                <span className="w-2 h-2 rounded-full bg-[#012d1d]"></span>
                <span>Fertilizer</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[#762c13] ml-2">
                <span className="w-2 h-2 rounded-full bg-[#fe9474]"></span>
                <span>Mist</span>
              </span>
            </div>
          </div>

          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[11px] font-bold text-[#717973] uppercase tracking-wider">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-2">
            {/* Pad for April starting day */}
            <div className="aspect-square p-2 bg-[#f5f3ee]/30 rounded-xl opacity-30"></div>
            <div className="aspect-square p-2 bg-[#f5f3ee]/30 rounded-xl opacity-30"></div>

            {daysInMonth.map((day) => {
              const tasksOnDay = calendarTasks[day] || [];
              const isToday = day === 16;
              const isSelected = day === selectedDay;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square p-2 rounded-xl flex flex-col justify-between text-left transition-all border ${
                    isSelected
                      ? 'border-[#012d1d] ring-2 ring-[#012d1d]/20 bg-[#f5f3ee]'
                      : isToday
                      ? 'border-[#012d1d]/30 bg-[#f5f3ee]/80 hover:border-[#012d1d]'
                      : 'border-[#eae8e3] bg-white hover:border-[#c1c8c2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isToday
                          ? 'w-5 h-5 rounded-full bg-[#012d1d] text-white flex items-center justify-center'
                          : 'text-[#1b1c19]'
                      }`}
                    >
                      {day}
                    </span>
                    {tasksOnDay.length > 0 && (
                      <span className="text-[10px] font-bold text-[#717973]">
                        {tasksOnDay.length}
                      </span>
                    )}
                  </div>

                  {/* Indicator Dots */}
                  <div className="flex items-center gap-1 mt-auto">
                    {tasksOnDay.map((t, idx) => (
                      <span
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full ${
                          t.done
                            ? 'bg-[#c1c8c2]'
                            : t.type === 'water'
                            ? 'bg-[#99452b]'
                            : t.type === 'fertilizer'
                            ? 'bg-[#012d1d]'
                            : 'bg-[#fe9474]'
                        }`}
                      ></span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day Inspector & Scheduled Tasks (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-[#eae8e3] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#eae8e3] mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#717973]">
                  Selected Day
                </span>
                <h3 className="font-headline text-[20px] font-semibold text-[#012d1d]">
                  {selectedDay === 16 ? 'Today, April 16' : `April ${selectedDay}, 2026`}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#f5f3ee] text-xs font-semibold text-[#012d1d]">
                {activeDayTasks.length} tasks
              </span>
            </div>

            {activeDayTasks.length === 0 ? (
              <div className="py-12 text-center text-[#717973]">
                <span className="material-symbols-outlined text-[36px] text-[#c1c8c2] mb-2 block">
                  check_circle
                </span>
                <p className="text-sm font-semibold text-[#1b1c19]">Rest Period</p>
                <p className="text-xs text-[#414844] mt-1">
                  No interventions scheduled. Allow soil capillary drying.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeDayTasks.map((t) => (
                  <div
                    key={t.id}
                    className={`p-3 rounded-xl border transition-all ${
                      t.done
                        ? 'bg-[#f5f3ee] border-[#eae8e3] opacity-60'
                        : 'bg-[#fbf9f4] border-[#eae8e3] hover:border-[#012d1d]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-body text-[14px] font-bold text-[#1b1c19]">
                        {t.plantName}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          t.type === 'water'
                            ? 'bg-[#ffdbd0] text-[#762c13]'
                            : t.type === 'fertilizer'
                            ? 'bg-[#ceeacf] text-[#092010]'
                            : 'bg-[#fe9474]/30 text-[#762c13]'
                        }`}
                      >
                        {t.type}
                      </span>
                    </div>

                    <div className="text-xs text-[#414844] mb-2">
                      <span>{t.room}</span> • <span className="font-semibold text-[#012d1d]">{t.volume}</span>
                    </div>

                    {!t.done && (
                      <button
                        onClick={() => onWaterPlant(t.plantId)}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-[#012d1d] text-white text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        <span>Complete Task</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#eae8e3] mt-6">
            <button
              onClick={onOpenLogCare}
              className="w-full py-2.5 rounded-lg bg-[#f5f3ee] hover:bg-[#eae8e3] text-[#012d1d] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Schedule Custom Event</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
