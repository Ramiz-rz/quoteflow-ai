import { useState } from 'react';
import { CLIENT_PROFILES } from '../data/mockData';
import { ClientProfile, ScreenType, Quote } from '../types';

interface ClientsScreenProps {
  onStartQuoteForClient: (client: ClientProfile) => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export function ClientsScreen({
  onStartQuoteForClient,
  onNavigate,
  onShowToast,
}: ClientsScreenProps) {
  const [clients] = useState<ClientProfile[]>(CLIENT_PROFILES);
  const [search, setSearch] = useState('');

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen pb-24 font-body-md select-none">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-md px-margin-mobile h-14 flex items-center justify-between shadow-sm border-b border-outline-variant/15">
        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
            Client Accounts
          </h1>
        </div>
        <button
          onClick={() => onShowToast('Client sync connected to HubSpot & Stripe', 'sync')}
          className="p-1 text-on-surface-variant hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[20px]">sync</span>
        </button>
      </header>

      <main className="max-w-md mx-auto px-margin-mobile pt-space-md space-y-space-md">
        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search clients or organizations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl py-2 pl-9 pr-3 text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary/60 font-mono"
          />
        </div>

        {/* Client List */}
        <div className="space-y-space-xs">
          {filtered.map((client) => (
            <div
              key={client.id}
              className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/50 transition-colors space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold text-xs font-mono">
                    {client.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-body-md text-on-surface">{client.name}</div>
                    <div className="text-body-sm text-on-surface-variant font-mono">
                      {client.company}
                    </div>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-label-sm font-mono border ${
                    client.status === 'Active'
                      ? 'bg-secondary-container/20 text-secondary border-secondary/30'
                      : 'bg-surface-container text-outline border-outline-variant/30'
                  }`}
                >
                  {client.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-label-sm font-mono pt-2 border-t border-outline-variant/10 text-on-surface-variant">
                <div>
                  Total closed: <span className="text-on-surface font-semibold">${client.totalSpent.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => onStartQuoteForClient(client)}
                  className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary flex items-center gap-1 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  <span>Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
