import React, { useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  urgentTasksCount: number;
  onOpenMobileMenu: () => void;
  onNavigateToCalendar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  urgentTasksCount,
  onOpenMobileMenu,
  onNavigateToCalendar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Monstera Hydration Critical',
      desc: 'Substrate moisture reached 18% in Living Room Zone 1.',
      time: '15m ago',
      unread: true,
    },
    {
      id: '2',
      title: 'Nutrient Feed Scheduled',
      desc: 'Liquid Kelp Seaweed batch prepared for this Saturday.',
      time: '2h ago',
      unread: true,
    },
    {
      id: '3',
      title: 'Sensor Sync Complete',
      desc: 'All 5 horticultural micro-zones report optimal telemetry.',
      time: '4h ago',
      unread: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#fbf9f4]/90 backdrop-blur-xl z-40 border-b border-[#eae8e3] px-4 sm:px-8 flex items-center justify-between gap-4 shadow-[0_1px_8px_rgba(27,43,33,0.04)]">
      {/* Mobile menu button */}
      <button
        onClick={onOpenMobileMenu}
        className="lg:hidden p-2 rounded-lg text-[#414844] hover:bg-[#eae8e3] focus:outline-none"
        aria-label="Open menu"
      >
        <span className="material-symbols-outlined text-[24px]">menu</span>
      </button>

      {/* Global Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-[#717973] text-[20px] pointer-events-none">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#f5f3ee] border border-transparent focus:border-[#012d1d]/20 rounded-full font-body text-[13px] text-[#1b1c19] placeholder:text-[#717973] focus:outline-none focus:ring-2 focus:ring-[#012d1d]/15 transition-all shadow-inner"
            placeholder="Search your indoor jungle (e.g. Monstera, Sunroom, Ficus)..."
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-[#717973] hover:text-[#1b1c19] p-0.5"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Urgent tasks chip */}
        <button
          onClick={onNavigateToCalendar}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-[#ffdbd0] text-[#3a0a00] hover:bg-[#ffb59f] rounded-full shadow-[0_1px_2px_rgba(27,43,33,0.02)] transition-colors cursor-pointer"
          title="Click to view full calendar"
        >
          <span className="material-symbols-outlined text-[#99452b] text-[18px]">assignment_late</span>
          <span className="font-body text-[12px] font-semibold text-[#3a0a00]">
            {urgentTasksCount} tasks due today
          </span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            aria-label="Notifications"
            className="relative p-2 rounded-full text-[#414844] hover:bg-[#eae8e3] hover:text-[#1b1c19] transition-colors focus:outline-none"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#99452b] ring-2 ring-[#fbf9f4]"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#eae8e3] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#eae8e3]">
                <div className="flex items-center gap-2">
                  <span className="font-headline text-[15px] font-semibold text-[#012d1d]">Telemetry Alerts</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#ffdbd0] text-[#99452b]">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] font-semibold text-[#012d1d] hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2.5 py-3 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-2.5 rounded-lg border transition-colors ${
                      n.unread
                        ? 'bg-[#f5f3ee] border-[#eae8e3]'
                        : 'bg-white border-transparent hover:bg-[#f5f3ee]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-body text-[13px] font-semibold text-[#1b1c19]">{n.title}</h4>
                      <span className="text-[10px] text-[#717973] whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className="font-body text-[11px] text-[#414844] mt-0.5 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#eae8e3] text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="w-full py-1.5 text-xs font-semibold text-[#012d1d] hover:bg-[#f5f3ee] rounded-lg transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-[1px] bg-[#c1c8c2]/60"></div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 pl-1 focus:outline-none group text-left"
          >
            <img
              alt="Elena Rostova Botanical Lead"
              className="w-8 h-8 rounded-full object-cover shadow-[0_1px_2px_rgba(27,43,33,0.08)] ring-1 ring-[#012d1d]/10 group-hover:ring-[#012d1d]/30 transition-all"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuALJ8nYBnZsuLOjjyagmXGFmALqaySZf6-mHaqFw_e7H8pRJx4W4bvN8RCrwAoL62FG-XOmeWLrxeTCRP9-4QT1zWlt2zDAkaGd4EIrbxaKJF0pSUzKyisThWcYRq7BuA8n4CDYGKyxj3YT1n0jh8Wi1BLv_j8WBV9isJSG33TiUJfwkB7mGkT07MyvrqufVTw2PkTtqEpqrCc4pasQBBIypbFv_Mru03Up_L7E2VBx5fx7AT0KLlsV"
            />
            <div className="hidden md:flex flex-col">
              <span className="font-body text-[12px] font-semibold text-[#1b1c19] leading-tight group-hover:text-[#012d1d]">
                Elena Rostova
              </span>
              <span className="font-body text-[11px] text-[#414844] leading-tight">
                Botanical Lead
              </span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#eae8e3] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center gap-3 pb-3 border-b border-[#eae8e3]">
                <img
                  alt="Elena Rostova"
                  className="w-10 h-10 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuALJ8nYBnZsuLOjjyagmXGFmALqaySZf6-mHaqFw_e7H8pRJx4W4bvN8RCrwAoL62FG-XOmeWLrxeTCRP9-4QT1zWlt2zDAkaGd4EIrbxaKJF0pSUzKyisThWcYRq7BuA8n4CDYGKyxj3YT1n0jh8Wi1BLv_j8WBV9isJSG33TiUJfwkB7mGkT07MyvrqufVTw2PkTtqEpqrCc4pasQBBIypbFv_Mru03Up_L7E2VBx5fx7AT0KLlsV"
                />
                <div>
                  <h4 className="font-body text-[14px] font-semibold text-[#1b1c19]">Elena Rostova</h4>
                  <p className="text-[11px] text-[#717973]">Station Alpha Curator</p>
                </div>
              </div>
              <div className="py-2 flex flex-col gap-1 text-[13px] text-[#414844]">
                <div className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-[#f5f3ee]">
                  <span>Active Micro-Zones</span>
                  <span className="font-bold text-[#012d1d]">5 Zones</span>
                </div>
                <div className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-[#f5f3ee]">
                  <span>Tracked Specimens</span>
                  <span className="font-bold text-[#012d1d]">18 Plants</span>
                </div>
                <div className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-[#f5f3ee]">
                  <span>Current Station</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#ceeacf] text-[#092010] font-semibold">Alpha Online</span>
                </div>
              </div>
              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full mt-2 py-2 text-xs font-semibold text-[#012d1d] bg-[#f5f3ee] hover:bg-[#eae8e3] rounded-lg transition-colors"
              >
                Close Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
