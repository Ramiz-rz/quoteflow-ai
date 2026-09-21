import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
}

export function BottomNav({ currentScreen, onSelectScreen }: BottomNavProps) {
  const tabs: { id: ScreenType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'create', label: 'Create', icon: 'add_circle' },
    { id: 'quotes', label: 'Quotes', icon: 'request_quote' },
    { id: 'clients', label: 'Clients', icon: 'group' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-1 py-1.5 bg-surface-container-lowest/90 backdrop-blur-lg shadow-lg border-t border-outline-variant/15 no-print"
    >
      <div className="flex w-full max-w-md mx-auto justify-around items-center">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectScreen(tab.id)}
              className={`flex flex-col items-center justify-center p-1 transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 400"
                }}
              >
                {tab.icon}
              </span>
              <span className="text-[11px] font-mono mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
