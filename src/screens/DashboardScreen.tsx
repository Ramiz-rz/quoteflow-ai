import { useState } from 'react';
import { LOGO_URL } from '../data/mockData';
import { Quote, ScreenType } from '../types';
import { MonthlyPerformanceChart } from '../components/MonthlyPerformanceChart';

interface DashboardScreenProps {
  quotes: Quote[];
  onSelectQuote: (quote: Quote) => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string, icon?: string) => void;
  currentWorkspace: string;
  onToggleWorkspaceModal: () => void;
}

export function DashboardScreen({
  quotes,
  onSelectQuote,
  onNavigate,
  onShowToast,
  currentWorkspace,
  onToggleWorkspaceModal,
}: DashboardScreenProps) {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [showNotifications, setShowNotifications] = useState(false);

  // Compute live metrics
  const totalQuotesCount = quotes.length + 33; // realistic agency count
  const draftCount = quotes.filter((q) => q.status === 'Draft').length;
  const sentCount = quotes.filter((q) => q.status === 'Sent').length + 10;
  const acceptedCount = quotes.filter((q) => q.status === 'Accepted').length + 22;

  const filteredQuotes = quotes.filter((quote) => {
    if (filterStatus === 'All') return true;
    return quote.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusBadge = (status: Quote['status']) => {
    switch (status) {
      case 'Accepted':
        return 'bg-secondary-container/20 text-secondary border-secondary-container/40';
      case 'Sent':
        return 'bg-primary-container/20 text-primary border-primary-container/40';
      case 'Needs Clarification':
        return 'bg-tertiary-container/30 text-tertiary border-tertiary-container/50';
      case 'Draft':
      default:
        return 'bg-surface-container text-on-surface-variant border-outline-variant/30';
    }
  };

  const calculateQuoteTotal = (quote: Quote) => {
    const subtotal = quote.items.reduce((acc, it) => acc + it.price * it.qty, 0);
    const discount = subtotal * (quote.discountPercent / 100);
    return subtotal - discount;
  };

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col font-body-md text-body-md select-none pb-24">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-surface-container-lowest/80 backdrop-blur-md shadow-sm border-b border-outline-variant/15">
        <div className="flex justify-between items-center w-full px-space-md max-w-md mx-auto h-14">
          {/* Leading Brand & Logo */}
          <div
            className="flex items-center gap-space-sm cursor-pointer"
            onClick={() => onNavigate('landing')}
          >
            <img
              alt="QuoteFlow AI Logo"
              className="w-8 h-8 rounded-lg object-contain p-1 bg-surface-container-high border border-outline-variant/30"
              src={LOGO_URL}
            />
            <span className="text-headline-sm font-headline-sm font-semibold tracking-tight text-on-surface">
              QuoteFlow AI
            </span>
          </div>

          {/* Trailing Action: Notification & User Avatar */}
          <div className="flex items-center gap-space-sm relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                onShowToast("You have 1 new client clarification pending", "notifications");
              }}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors active:scale-[0.98] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-tertiary"></span>
            </button>
            <div
              onClick={onToggleWorkspaceModal}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-secondary-container to-primary-container p-[1px] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-full h-full rounded-full bg-surface-container-low flex items-center justify-center text-primary font-headline-sm text-xs font-semibold">
                AL
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Scroll Area */}
      <main className="flex-1 w-full max-w-md mx-auto px-margin-mobile pt-space-md pb-24 space-y-space-lg overflow-y-auto">
        {/* Header Section */}
        <section className="space-y-space-xs">
          <div className="flex items-center justify-between">
            <h1 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">
              Good morning, Alex 👋
            </h1>
          </div>
          <p className="text-body-md font-body-md text-on-surface-variant">
            Create your next quote in seconds.
          </p>

          {/* Workspace Switcher Pill */}
          <div className="pt-1">
            <button
              onClick={onToggleWorkspaceModal}
              className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container border border-outline-variant/20 hover:border-outline-variant/40 transition-colors text-left cursor-pointer active:scale-95"
            >
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="text-label-sm font-label-sm text-on-surface font-mono">
                {currentWorkspace}
              </span>
              <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
                expand_more
              </span>
            </button>
          </div>
        </section>

        {/* Primary Action Card (Hero Banner) */}
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-b from-surface-container-high to-surface-container-low p-space-lg border border-primary/20 shadow-[0_4px_24px_-4px_rgba(99,102,241,0.25)]">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative space-y-space-md">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/30 border border-secondary-container/50">
                <span className="material-symbols-outlined text-secondary text-[14px]">
                  auto_awesome
                </span>
                <span className="text-label-sm font-label-sm text-secondary font-mono">
                  Instant AI Parsing
                </span>
              </div>
              <span className="text-label-sm font-label-sm text-on-surface-variant font-mono">
                ⌘K to trigger
              </span>
            </div>
            <div className="space-y-1">
              <h2 className="text-headline-sm font-headline-sm font-semibold text-on-surface">
                Create a New Quote
              </h2>
              <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                Turn an unstructured client email or chat into a formal proposal in seconds.
              </p>
            </div>
            <button
              onClick={() => onNavigate('create')}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-sm font-semibold tracking-tight shadow-md hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Start with Client Message →</span>
            </button>
          </div>
        </section>

        {/* AI Activity & Quick Action Banner */}
        <section
          onClick={() => {
            const clarifyQuote = quotes.find((q) => q.status === 'Needs Clarification') || quotes[0];
            onSelectQuote(clarifyQuote);
            onShowToast("Opened quote requiring client specification review", "psychology_alt");
          }}
          className="rounded-xl bg-surface-container-low border border-outline-variant/30 p-space-md flex items-center justify-between gap-space-sm shadow-sm cursor-pointer hover:border-primary/40 transition-colors"
        >
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary shrink-0 border border-outline-variant/20">
              <span className="material-symbols-outlined text-[18px]">psychology_alt</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="inline-block px-1.5 py-0.2 rounded bg-tertiary-container/30 border border-tertiary-container text-tertiary text-label-sm font-label-sm uppercase font-mono">
                  Needs Clarification (1)
                </span>
              </div>
              <p className="text-body-sm font-body-sm text-on-surface-variant truncate mt-0.5">
                Acme Corp request missing delivery timeline.
              </p>
            </div>
          </div>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors shrink-0">
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </section>

        {/* Metric Cards Grid (2x2) */}
        <section className="space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider font-mono">
              Performance Overview
            </span>
            <span className="text-label-sm font-label-sm text-outline font-mono">
              Real-time update
            </span>
          </div>
          <div className="grid grid-cols-2 gap-space-sm">
            {/* Card 1: Total Quotes */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-sm flex flex-col justify-between h-32">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="text-body-sm font-body-sm text-on-surface-variant">Total Quotes</span>
                <span className="material-symbols-outlined text-[18px]">request_quote</span>
              </div>
              <div className="space-y-0.5">
                <div className="text-headline-lg font-headline-lg font-bold text-on-surface">
                  {totalQuotesCount}
                </div>
                <div className="text-label-sm font-label-sm text-tertiary font-mono">
                  +$14.2k this month
                </div>
              </div>
            </div>

            {/* Card 2: Draft Quotes */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-sm flex flex-col justify-between h-32">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="text-body-sm font-body-sm text-on-surface-variant">Draft Quotes</span>
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
              </div>
              <div className="space-y-0.5">
                <div className="text-headline-lg font-headline-lg font-bold text-on-surface">
                  {draftCount}
                </div>
                <div className="text-label-sm font-label-sm text-on-surface-variant font-mono">
                  Needs review
                </div>
              </div>
            </div>

            {/* Card 3: Sent Quotes */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-sm flex flex-col justify-between h-32">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="text-body-sm font-body-sm text-on-surface-variant">Sent Quotes</span>
                <span className="material-symbols-outlined text-[18px]">outbox</span>
              </div>
              <div className="space-y-0.5">
                <div className="text-headline-lg font-headline-lg font-bold text-on-surface">
                  {sentCount}
                </div>
                <div className="text-label-sm font-label-sm text-on-surface-variant font-mono">
                  Awaiting client
                </div>
              </div>
            </div>

            {/* Card 4: Accepted Quotes */}
            <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-sm flex flex-col justify-between h-32">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="text-body-sm font-body-sm text-on-surface-variant">
                  Accepted Quotes
                </span>
                <span className="material-symbols-outlined text-[18px] text-primary">verified</span>
              </div>
              <div className="space-y-0.5">
                <div className="text-headline-lg font-headline-lg font-bold text-on-surface">
                  {acceptedCount}
                </div>
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary text-label-sm font-label-sm font-medium font-mono">
                  84% win rate
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monthly Quote Values & Win Rates Visualization */}
        <MonthlyPerformanceChart quotes={quotes} onShowToast={onShowToast} />

        {/* Recent Quotes Section */}
        <section className="space-y-space-md pt-space-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
              Recent Quotes
            </h2>
            <button
              onClick={() => setFilterStatus('All')}
              className="text-label-md font-label-md text-primary hover:underline cursor-pointer font-mono"
            >
              View all
            </button>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {['All', 'Draft', 'Sent', 'Accepted', 'Expired'].map((tab) => {
              const active = filterStatus === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={`px-3 py-1.5 rounded-lg text-label-sm font-label-sm shrink-0 transition-colors cursor-pointer font-mono ${
                    active
                      ? 'bg-surface-container-high text-primary font-medium'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Recent Quotes List */}
          <div className="space-y-space-xs">
            {filteredQuotes.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface-variant">
                No quotes matching status "{filterStatus}".
              </div>
            ) : (
              filteredQuotes.map((quote) => {
                const total = calculateQuoteTotal(quote);
                const initials = quote.clientName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div
                    key={quote.id}
                    onClick={() => {
                      onSelectQuote(quote);
                      onNavigate('quotes');
                    }}
                    className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/50 transition-colors space-y-space-sm cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-space-sm">
                      <div className="flex items-center gap-space-sm min-w-0">
                        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-headline-sm text-xs font-semibold shrink-0">
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <div className="text-body-md font-body-md font-medium text-on-surface truncate">
                            {quote.clientName}
                          </div>
                          <div className="text-body-sm font-body-sm text-on-surface-variant truncate">
                            {quote.title}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onShowToast(`Options for ${quote.clientName}: Edit, Duplicate, Archive`);
                        }}
                        className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container"
                      >
                        <span className="material-symbols-outlined text-[18px]">more_vert</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-outline-variant/10">
                      <span className="text-code-md font-code-md font-medium text-on-surface">
                        {quote.currency}
                        {total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-label-sm font-label-sm text-outline font-mono">
                          {quote.dateCreated}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-label-sm font-label-sm border font-mono ${getStatusBadge(
                            quote.status
                          )}`}
                        >
                          {quote.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
