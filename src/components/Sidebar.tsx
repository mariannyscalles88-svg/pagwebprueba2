import React from 'react';

export type ScreenTab =
  | 'overview'
  | 'plant-inventory'
  | 'watering-calendar'
  | 'sunlight-and-environment'
  | 'fertilization-and-nutrients'
  | 'care-history'
  | 'settings';

interface SidebarProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
  urgentCount: number;
  currentSeason: string;
  conservatoryTemp: number;
  conservatoryHumidity: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  urgentCount,
  currentSeason,
  conservatoryTemp,
  conservatoryHumidity,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems: { id: ScreenTab; label: string; icon: string; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: 'grid_view' },
    { id: 'plant-inventory', label: 'Plant Inventory', icon: 'potted_plant' },
    { id: 'watering-calendar', label: 'Watering Calendar', icon: 'water_drop', badge: urgentCount > 0 ? urgentCount : undefined },
    { id: 'sunlight-and-environment', label: 'Sunlight & Environment', icon: 'wb_sunny' },
    { id: 'fertilization-and-nutrients', label: 'Fertilization & Nutrients', icon: 'eco' },
    { id: 'care-history', label: 'Care History', icon: 'history' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-[#f5f3ee] z-50 flex flex-col justify-between py-6 px-4 shadow-[0_1px_8px_rgba(27,43,33,0.04)] border-r border-[#eae8e3] transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-3">
              <img
                alt="Verdant Plant Care Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeatpLeGsVi1jHeMOfhrREIuhLgpMhK1GDpp3nClVhbkpPHVTBUlha6AMH_HRLVD9QReJoUGeeQzJe2lJEPGF-9AVt8jXQPUXeYhmOhe8uQL3e-4B2soZ-C6VDs7gZZAfTJvGiAJUob6zMry5PP4lcwZqbaw2cC_BKbl20VwxtohgjRXug1jTGNGF_tnaVsYuKPAPe7zbYnefaIUyofmvkuFCBGoZFK5hMeGPEXuJ9BkVTh_PpTwUC"
              />
              <div className="flex flex-col">
                <span className="font-headline text-[22px] font-semibold text-[#012d1d] tracking-tight leading-none">
                  Verdant
                </span>
                <span className="font-body text-[11px] font-semibold text-[#414844] tracking-wider uppercase mt-1">
                  Botanica Care
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-[#414844] hover:bg-[#eae8e3]"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Active Care Cycle Badge */}
          <div className="px-3">
            <div className="bg-[#eae8e3] rounded-lg p-3 flex items-center justify-between shadow-[0_1px_2px_rgba(27,43,33,0.02)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#99452b] animate-pulse"></span>
                <span className="font-body text-[11px] font-semibold text-[#1b1c19]">Care Cycle: Active</span>
              </div>
              <span className="font-body text-[11px] font-bold text-[#99452b] uppercase tracking-wide">
                {currentSeason}
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left transition-all group font-body text-[14px] font-semibold ${
                    isActive
                      ? 'bg-[#012d1d] text-white shadow-[0_2px_8px_rgba(27,43,33,0.08)]'
                      : 'text-[#414844] hover:bg-[#eae8e3] hover:text-[#1b1c19]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] transition-colors ${
                        isActive ? 'text-[#c1ecd4]' : 'text-[#717973] group-hover:text-[#012d1d]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-[#ffdbd0] text-[#762c13]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Conservatory Sensor Telemetry Card */}
        <div className="px-3 pt-4">
          <div className="p-3.5 rounded-xl bg-[#eae8e3] flex flex-col gap-2 shadow-sm border border-[#e4e2dd]">
            <div className="flex items-center justify-between text-[#012d1d]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">temp_preferences_custom</span>
                <span className="font-body text-[11px] font-semibold tracking-wide">Conservatory Sensor</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#1b4332] animate-pulse" title="Connected Live"></span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-headline text-[22px] font-medium text-[#1b1c19]">
                {conservatoryTemp.toFixed(1)}°C
              </span>
              <span className="font-body text-[11px] font-semibold text-[#414844]">
                {conservatoryHumidity}% RH
              </span>
            </div>
            <div className="w-full bg-[#e4e2dd] rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#012d1d] h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (conservatoryHumidity / 80) * 100)}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#717973] pt-0.5">
              <span>Telemetry: Active</span>
              <span>Alpha-01</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
