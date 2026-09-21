import { useState, useEffect } from 'react';
import { ScreenType, Quote, ClientProfile } from './types';
import { INITIAL_QUOTES } from './data/mockData';
import { LandingScreen } from './screens/LandingScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { CreateQuoteScreen } from './screens/CreateQuoteScreen';
import { QuoteEditorScreen } from './screens/QuoteEditorScreen';
import { ClientsScreen } from './screens/ClientsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { WorkspaceSwitcherModal } from './components/WorkspaceSwitcherModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('landing');
  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const saved = localStorage.getItem('quoteflow_quotes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved quotes', e);
      }
    }
    return INITIAL_QUOTES;
  });

  const [selectedQuote, setSelectedQuote] = useState<Quote>(() => quotes[0] || INITIAL_QUOTES[0]);
  const [workspace, setWorkspace] = useState<string>('Acme Agency Workspace • Pro AI Tier');
  const [toast, setToast] = useState<{ message: string | null; icon?: string }>({ message: null });
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('quoteflow_quotes', JSON.stringify(quotes));
  }, [quotes]);

  // Global ⌘K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message: string, icon = 'check') => {
    setToast({ message, icon });
  };

  const handleUpdateQuote = (updatedQuote: Quote) => {
    setSelectedQuote(updatedQuote);
    setQuotes((prev) => prev.map((q) => (q.id === updatedQuote.id ? updatedQuote : q)));
  };

  const handleQuoteCreated = (newQuote: Quote) => {
    setQuotes((prev) => [newQuote, ...prev]);
    setSelectedQuote(newQuote);
    showToast('Quote draft initialized with AI!', 'verified');
  };

  const handleStartQuoteForClient = (client: ClientProfile) => {
    const clientQuote: Quote = {
      id: 'qf-' + Math.floor(Math.random() * 900 + 100),
      refNumber: 'QF-2024-' + Math.floor(Math.random() * 900 + 100),
      title: `${client.company} Project Scope`,
      clientName: client.name,
      companyName: client.company,
      clientEmail: client.email,
      status: 'Draft',
      timeline: '3 Weeks',
      deliveryDate: 'Nov 12',
      currency: '$',
      businessProfile: 'Agency',
      initialMessage: `Scoping brief for ${client.name} at ${client.company}.`,
      dateCreated: 'Today',
      updatedAgo: 'Just now',
      discountPercent: 10,
      taxPercent: 0,
      paymentTerms: '50% upfront deposit, 50% on completion.',
      revisionTerms: '2 revision iterations included.',
      items: [
        { id: 1, name: 'Discovery & UX Architecture', description: 'User flows and technical specs', price: 650, qty: 1 },
        { id: 2, name: 'Production Sprint Implementation', description: 'Core deliverables and testing', price: 1200, qty: 1 }
      ]
    };
    setQuotes((prev) => [clientQuote, ...prev]);
    setSelectedQuote(clientQuote);
    setCurrentScreen('quotes');
    showToast(`New proposal started for ${client.name}!`, 'edit_note');
  };

  const handleResetData = () => {
    localStorage.removeItem('quoteflow_quotes');
    setQuotes(INITIAL_QUOTES);
    setSelectedQuote(INITIAL_QUOTES[0]);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-body-md selection:bg-primary-container selection:text-on-primary-container">
      {/* Toast Feedback */}
      <Toast
        message={toast.message}
        icon={toast.icon}
        onClose={() => setToast({ message: null })}
      />

      {/* Workspace Switcher Modal */}
      <WorkspaceSwitcherModal
        isOpen={isWorkspaceModalOpen}
        onClose={() => setIsWorkspaceModalOpen(false)}
        currentWorkspace={workspace}
        onSelectWorkspace={(name) => {
          setWorkspace(name);
          showToast(`Switched to workspace: ${name.split('•')[0]}`);
        }}
      />

      {/* ⌘K Command Palette Modal */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(screen) => setCurrentScreen(screen)}
        quotes={quotes}
        onSelectQuote={(q) => setSelectedQuote(q)}
        onShowToast={showToast}
      />

      {/* Screen Views */}
      <div className="flex-1 w-full">
        {currentScreen === 'landing' && (
          <LandingScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            quotes={quotes}
            onSelectQuote={(q) => setSelectedQuote(q)}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
            currentWorkspace={workspace}
            onToggleWorkspaceModal={() => setIsWorkspaceModalOpen(true)}
          />
        )}

        {currentScreen === 'create' && (
          <CreateQuoteScreen
            onQuoteCreated={handleQuoteCreated}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'quotes' && (
          <QuoteEditorScreen
            quote={selectedQuote || quotes[0] || INITIAL_QUOTES[0]}
            onUpdateQuote={handleUpdateQuote}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'clients' && (
          <ClientsScreen
            onStartQuoteForClient={handleStartQuoteForClient}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            currentWorkspace={workspace}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onShowToast={showToast}
            onResetData={handleResetData}
          />
        )}
      </div>

      {/* Fixed Bottom Navigation (visible across all screens) */}
      <BottomNav
        currentScreen={currentScreen}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
      />
    </div>
  );
}
