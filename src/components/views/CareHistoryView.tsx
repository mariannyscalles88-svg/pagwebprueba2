import React, { useState } from 'react';
import { CareLogItem } from '../../data/botanicalData';

interface CareHistoryViewProps {
  logs: CareLogItem[];
  onOpenLogCare: () => void;
}

export const CareHistoryView: React.FC<CareHistoryViewProps> = ({
  logs,
  onOpenLogCare,
}) => {
  const [filterAction, setFilterAction] = useState('All');
  const [searchNotes, setSearchNotes] = useState('');

  const filteredLogs = logs.filter((item) => {
    const matchesAction = filterAction === 'All' || item.action === filterAction;
    const matchesSearch =
      !searchNotes ||
      item.plantName.toLowerCase().includes(searchNotes.toLowerCase()) ||
      item.notes.toLowerCase().includes(searchNotes.toLowerCase()) ||
      item.zone.toLowerCase().includes(searchNotes.toLowerCase());
    return matchesAction && matchesSearch;
  });

  const exportJournal = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(logs, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `verdant_care_journal_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-[24px]">history</span>
            <h1 className="font-headline text-[28px] text-[#012d1d] font-semibold tracking-tight">
              Botanical Care History Ledger
            </h1>
          </div>
          <p className="font-body text-[14px] text-[#414844] mt-0.5">
            Chronological audit trail of watering events, nutrients, misting, and pruning
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportJournal}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#f5f3ee] hover:bg-[#eae8e3] text-[#012d1d] text-xs font-semibold border border-[#eae8e3] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export Journal</span>
          </button>
          <button
            onClick={onOpenLogCare}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#012d1d] text-white text-xs font-semibold shadow-sm hover:opacity-95"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>New Care Entry</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border border-[#eae8e3] shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Hydration', 'Nutrient Feed', 'Foliage Mist', 'Pruning', 'Sensor Calibration'].map(
            (action) => (
              <button
                key={action}
                onClick={() => setFilterAction(action)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterAction === action
                    ? 'bg-[#012d1d] text-white'
                    : 'bg-[#f5f3ee] text-[#414844] hover:bg-[#eae8e3]'
                }`}
              >
                {action}
              </button>
            )
          )}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search records by notes or plant..."
            value={searchNotes}
            onChange={(e) => setSearchNotes(e.target.value)}
            className="w-full px-3 py-1.5 bg-[#f5f3ee] border border-[#eae8e3] rounded-lg text-xs text-[#1b1c19] focus:outline-none"
          />
        </div>
      </div>

      {/* Timeline List */}
      <div className="bg-white rounded-xl shadow-sm border border-[#eae8e3] p-6">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#eae8e3]">
          {filteredLogs.map((item) => {
            const isWater = item.action === 'Hydration';
            const isFeed = item.action === 'Nutrient Feed';

            return (
              <div key={item.id} className="relative group">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white ${
                    isWater
                      ? 'bg-[#ffdbd0] text-[#762c13]'
                      : isFeed
                      ? 'bg-[#ceeacf] text-[#092010]'
                      : 'bg-[#e4e2dd] text-[#012d1d]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {isWater ? 'water_drop' : isFeed ? 'science' : 'eco'}
                  </span>
                </div>

                <div className="bg-[#fbf9f4] p-4 rounded-xl border border-[#eae8e3] hover:border-[#012d1d]/20 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-[15px] font-bold text-[#012d1d]">
                        {item.plantName}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isWater
                            ? 'bg-[#ffdbd0] text-[#762c13]'
                            : isFeed
                            ? 'bg-[#ceeacf] text-[#092010]'
                            : 'bg-[#e4e2dd] text-[#414844]'
                        }`}
                      >
                        {item.action}
                      </span>
                    </div>

                    <span className="text-[11px] text-[#717973] font-semibold">{item.timestamp}</span>
                  </div>

                  {item.amount && (
                    <div className="text-xs font-semibold text-[#1b1c19] mb-1">
                      Amount: <span className="text-[#99452b]">{item.amount}</span>
                    </div>
                  )}

                  <p className="text-xs text-[#414844] leading-relaxed mb-2">{item.notes}</p>

                  <div className="flex items-center justify-between text-[11px] text-[#717973] pt-2 border-t border-[#eae8e3]/60">
                    <span>Micro-Zone: {item.zone}</span>
                    <span>Curator: {item.operator}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
