import { useState, useEffect } from 'react';
import { Quote, ScreenType } from '../types';
import { printQuoteToPdf } from '../utils/printPdf';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenType) => void;
  quotes: Quote[];
  onSelectQuote: (quote: Quote) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  onNavigate,
  quotes,
  onSelectQuote,
  onShowToast,
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle palette
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredQuotes = quotes.filter((q) =>
    q.title.toLowerCase().includes(query.toLowerCase()) ||
    q.clientName.toLowerCase().includes(query.toLowerCase()) ||
    q.companyName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="bg-surface-container border border-primary/30 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150 glow-indigo">
        {/* Input */}
        <div className="flex items-center px-4 py-3 border-b border-outline-variant/20 bg-surface-container-lowest">
          <span className="material-symbols-outlined text-primary text-[20px] mr-2">search</span>
          <input
            autoFocus
            type="text"
            placeholder="Search commands, quotes, clients, or prompts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none text-on-surface placeholder:text-outline focus:outline-none text-body-md font-mono"
          />
          <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-surface-container-high text-outline font-mono border border-outline-variant/30">
            ESC
          </kbd>
        </div>

        {/* Quick Actions */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-mono text-body-sm">
          <div className="text-[11px] text-outline uppercase px-2 py-1 font-semibold">
            Actions
          </div>
          <button
            onClick={() => {
              onNavigate('create');
              onClose();
            }}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-high text-on-surface hover:text-primary transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">add_circle</span>
              <span>Create New Quote with AI</span>
            </div>
            <span className="text-[11px] text-outline">↵ Enter</span>
          </button>

          <button
            onClick={() => {
              onNavigate('quotes');
              onClose();
            }}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-high text-on-surface hover:text-primary transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-secondary">description</span>
              <span>Open A4 Statement of Work Preview</span>
            </div>
            <span className="text-[11px] text-outline">Tab</span>
          </button>

          <button
            onClick={() => {
              const targetQuote = quotes[0];
              onShowToast('Compiling A4 PDF statement...', 'downloading');
              onClose();
              if (targetQuote) {
                printQuoteToPdf(
                  targetQuote,
                  undefined,
                  (status) => {
                    if (status === 'blocked') {
                      onShowToast('Print blocked in preview frame — Open in a new tab to export', 'open_in_new');
                    }
                  }
                );
              } else {
                try {
                  window.print();
                } catch (e) {
                  console.warn('Print blocked by sandbox iframe', e);
                  onShowToast('Print blocked in preview frame — Open in a new tab', 'open_in_new');
                }
              }
            }}
            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-high text-on-surface hover:text-primary transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-tertiary">picture_as_pdf</span>
              <span>Export PDF Quote</span>
            </div>
            <span className="text-[11px] text-outline">⌘P</span>
          </button>

          <div className="text-[11px] text-outline uppercase px-2 pt-3 pb-1 font-semibold">
            Quotes ({filteredQuotes.length})
          </div>
          {filteredQuotes.map((quote) => (
            <button
              key={quote.id}
              onClick={() => {
                onSelectQuote(quote);
                onNavigate('quotes');
                onClose();
              }}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer text-left"
            >
              <div>
                <div className="font-medium text-body-sm text-on-surface truncate">
                  {quote.title}
                </div>
                <div className="text-[11px] text-outline">
                  {quote.clientName} • {quote.currency}
                  {(quote.items || []).reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0).toLocaleString()}
                </div>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-outline border border-outline-variant/30">
                {quote.status}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
