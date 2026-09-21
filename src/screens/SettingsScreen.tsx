import { useState } from 'react';
import { ScreenType } from '../types';

interface SettingsScreenProps {
  currentWorkspace: string;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onResetData: () => void;
}

export function SettingsScreen({
  currentWorkspace,
  onNavigate,
  onShowToast,
  onResetData,
}: SettingsScreenProps) {
  const [hourlyRate, setHourlyRate] = useState<number>(85);
  const [currency, setCurrency] = useState<string>('USD ($)');
  const [autoDiscount, setAutoDiscount] = useState<boolean>(true);
  const [aiModel, setAiModel] = useState<string>('Gemini 2.5 Flash Scoper');
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);

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
            Settings &amp; Workspace
          </h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-margin-mobile pt-space-md space-y-space-md">
        {/* Workspace Account */}
        <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
          <div className="text-label-sm font-mono uppercase text-primary font-semibold">
            Active Organization
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-body-md text-on-surface">{currentWorkspace}</div>
              <div className="text-label-sm font-mono text-outline">Pro AI Tier • 8 Seats</div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container/30 text-secondary text-label-sm font-mono border border-secondary/30">
              Verified
            </span>
          </div>
        </div>

        {/* Pricing Benchmarks */}
        <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-3">
          <div className="text-label-sm font-mono uppercase text-outline font-semibold">
            Pricing Defaults &amp; Benchmarks
          </div>

          <div className="space-y-1">
            <label className="text-body-sm text-on-surface-variant flex justify-between font-mono">
              <span>Standard Blended Hourly Rate:</span>
              <span className="text-primary font-semibold">${hourlyRate}/hr</span>
            </label>
            <input
              type="range"
              min={40}
              max={250}
              step={5}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10 text-body-sm">
            <span className="text-on-surface-variant font-mono">Primary Currency</span>
            <select
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
                onShowToast(`Currency updated to ${e.target.value}`);
              }}
              className="bg-surface-container border border-outline-variant/30 rounded-lg px-2 py-1 text-label-sm font-mono text-on-surface focus:outline-none"
            >
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-outline-variant/10 text-body-sm">
            <span className="text-on-surface-variant font-mono">Early Sign 10% Discount</span>
            <input
              type="checkbox"
              checked={autoDiscount}
              onChange={(e) => {
                setAutoDiscount(e.target.checked);
                onShowToast(e.target.checked ? "Default 10% early payment discount on" : "Discount off");
              }}
              className="w-4 h-4 accent-primary rounded cursor-pointer"
            />
          </div>
        </div>

        {/* AI Model Scoping Config */}
        <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
          <div className="text-label-sm font-mono uppercase text-outline font-semibold">
            AI Synthesis Engine
          </div>
          <div className="flex items-center justify-between text-body-sm">
            <span className="text-on-surface-variant font-mono">Parsing Intelligence</span>
            <span className="font-mono text-primary text-label-sm bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              {aiModel}
            </span>
          </div>
          <p className="text-[12px] text-outline leading-relaxed">
            Extracts implicit technical dependencies, third-party integrations, and milestone timelines automatically from raw communications.
          </p>
        </div>

        {/* Reset / Backup */}
        <div className="pt-2">
          {showConfirmReset ? (
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-error/40 space-y-2.5 animate-in fade-in">
              <div className="flex items-center gap-2 text-error text-body-sm font-semibold">
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <span>Reset all quote records?</span>
              </div>
              <p className="text-[12px] text-on-surface-variant font-mono leading-relaxed">
                This will restore initial sample client quotes and clear locally stored draft scopes.
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-label-sm">
                <button
                  type="button"
                  onClick={() => setShowConfirmReset(false)}
                  className="flex-1 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onResetData();
                    setShowConfirmReset(false);
                    onShowToast("Sample quotes restored!", "check");
                  }}
                  className="flex-1 py-1.5 rounded-lg bg-error-container text-error font-semibold hover:brightness-110 transition-all border border-error/30"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmReset(true)}
              className="w-full py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-outline-variant/30 text-body-sm font-mono transition-colors cursor-pointer"
            >
              Reset Default Mockup Data
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
