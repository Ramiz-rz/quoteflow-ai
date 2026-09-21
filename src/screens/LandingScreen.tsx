import { useState } from 'react';
import { LOGO_URL } from '../data/mockData';
import { ScreenType } from '../types';

interface LandingScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export function LandingScreen({ onNavigate, onShowToast }: LandingScreenProps) {
  const [interactiveStep, setInteractiveStep] = useState<'messy' | 'processing' | 'polished'>('polished');

  const handleSimulateTransformation = () => {
    setInteractiveStep('processing');
    onShowToast("Synthesizing client brief...", "sync");
    setTimeout(() => {
      setInteractiveStep('polished');
      onShowToast("Quote generated with precision pricing!", "verified");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface antialiased pb-24 selection:bg-primary-container selection:text-on-primary-container">
      {/* Sticky Blurred TopNavBar */}
      <header className="sticky top-0 z-40 w-full bg-surface-container-lowest/80 backdrop-blur-md shadow-sm border-b border-outline-variant/15">
        <div className="flex justify-between items-center w-full px-space-md max-w-7xl mx-auto h-14">
          <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => onNavigate('landing')}>
            <img
              alt="QuoteFlow AI Logo"
              className="w-7 h-7 rounded-md object-contain"
              src={LOGO_URL}
            />
            <span className="text-headline-sm font-headline-sm font-semibold tracking-tight text-on-surface">
              QuoteFlow AI
            </span>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              onClick={() => {
                onNavigate('dashboard');
                onShowToast("Signed into Alex Vance (Acme Agency)", "person");
              }}
              className="px-3 py-1.5 rounded-lg text-body-sm font-body-sm text-on-surface-variant hover:text-on-surface transition-colors active:scale-[0.98]"
            >
              Log In
            </button>
            <button
              onClick={() => onNavigate('create')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container text-body-sm font-body-sm font-medium shadow-sm hover:brightness-110 transition-all active:scale-[0.98]"
            >
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full px-space-md pt-6 pb-12 max-w-md mx-auto">
        {/* Micro Badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/30 text-secondary text-label-sm font-label-sm shadow-sm">
            <span className="material-symbols-outlined text-secondary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span>✨ Powered by Vision &amp; Text AI</span>
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="text-center mt-4">
          <h1 className="text-display-hero-mobile font-display-hero-mobile text-on-surface tracking-tight leading-tight">
            Turn client messages into professional quotes.
          </h1>
          <p className="text-body-md font-body-md text-on-surface-variant mt-3 px-1 leading-relaxed">
            Paste what your client asked for. QuoteFlow AI turns messy DMs, WhatsApps, or emails into a clear scope, pricing breakdown, timeline, and ready-to-send proposal.
          </p>
        </div>

        {/* Interactive Hero Demo Card (Linear/Raycast aesthetic) */}
        <div className="mt-8 rounded-xl bg-surface-container-low border border-outline-variant/30 p-space-md glow-subtle">
          {/* Unstructured Client Message */}
          <div className="rounded-lg bg-surface-container-lowest border border-outline-variant/40 p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">
                  Messy Incoming DM (WhatsApp)
                </span>
              </div>
              <span className="text-label-sm font-label-sm text-outline-variant">Just now</span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface/90 italic font-mono bg-surface-container/60 p-2.5 rounded border border-outline-variant/20">
              "I need a Shopify website with 10 products, payment integration and delivery setup. Need it within 2 weeks."
            </p>
          </div>

          {/* Processing Transition Button */}
          <div
            onClick={handleSimulateTransformation}
            className="flex items-center justify-center my-3 gap-2 cursor-pointer group"
          >
            <div className="h-px bg-outline-variant/30 flex-1"></div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high border border-primary/30 text-primary text-label-sm font-label-sm shadow-sm group-hover:border-primary/70 transition-colors">
              <span className={`material-symbols-outlined text-[14px] text-primary ${interactiveStep === 'processing' ? 'animate-spin' : ''}`}>
                sync
              </span>
              <span>{interactiveStep === 'processing' ? 'Extracting Scope...' : 'AI Structuring Requirements...'}</span>
            </div>
            <div className="h-px bg-outline-variant/30 flex-1"></div>
          </div>

          {/* Resulting Polished Quote Card Preview */}
          <div
            onClick={() => onNavigate('quotes')}
            className="rounded-lg bg-surface-container border border-primary/20 p-3.5 relative overflow-hidden glow-indigo cursor-pointer hover:border-primary/40 transition-all"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <h3 className="text-headline-sm font-headline-sm font-semibold text-on-surface">Shopify Website Development</h3>
                </div>
                <p className="text-label-sm font-label-sm text-on-surface-variant mt-0.5">Automated SOW · Scope Proposal #QF-809</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 border border-secondary/30 text-secondary text-label-sm font-label-sm">
                Ready to Send
              </span>
            </div>

            {/* Deliverables */}
            <div className="space-y-1.5 mb-3 bg-surface-container-lowest/60 p-2.5 rounded border border-outline-variant/20">
              <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-tertiary text-[14px]">check_circle</span>
                  Website setup &amp; theme architecture
                </span>
                <span className="font-code-md text-code-md text-on-surface-variant shrink-0 ml-2">$450</span>
              </div>
              <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-tertiary text-[14px]">check_circle</span>
                  10 product listings &amp; variant config
                </span>
                <span className="font-code-md text-code-md text-on-surface-variant shrink-0 ml-2">$350</span>
              </div>
              <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-tertiary text-[14px]">check_circle</span>
                  Payment integration (Stripe &amp; Apple Pay)
                </span>
                <span className="font-code-md text-code-md text-on-surface-variant shrink-0 ml-2">$400</span>
              </div>
              <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-tertiary text-[14px]">check_circle</span>
                  Delivery configuration &amp; shipping rules
                </span>
                <span className="font-code-md text-code-md text-on-surface-variant shrink-0 ml-2">$300</span>
              </div>
            </div>

            {/* Meta Footer Summary */}
            <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20">
              <div className="flex items-center gap-1 text-label-md font-label-md text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-tertiary">schedule</span>
                <span>Timeline: <strong className="text-on-surface">2 weeks</strong></span>
              </div>
              <div className="text-right">
                <span className="text-label-sm font-label-sm text-on-surface-variant mr-1">Total:</span>
                <span className="text-headline-sm font-headline-sm font-semibold text-primary font-code-md">$1,500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            onClick={() => onNavigate('create')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-headline-sm font-medium shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Create Your First Quote</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
          <button
            onClick={() => {
              onNavigate('dashboard');
              onShowToast("Opened Live Performance Dashboard", "dashboard");
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 text-on-surface font-body-md text-body-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">play_circle</span>
            <span>See Live Dashboard</span>
          </button>
        </div>

        {/* Trust Line */}
        <p className="text-center text-label-md font-label-md text-outline mt-4">
          Built for freelancers, agencies &amp; service businesses
        </p>

        {/* How It Works Carousel / Vertical Flow */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-label-sm font-label-sm text-primary uppercase tracking-wider">3-Step Velocity</span>
              <h2 className="text-headline-md font-headline-md text-on-surface font-semibold">How It Works</h2>
            </div>
            <span className="text-label-sm font-label-sm text-outline-variant font-mono">Zero Manual Math</span>
          </div>
          <div className="space-y-3">
            {/* Step 1 */}
            <div
              onClick={() => onNavigate('create')}
              className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3 hover:border-outline-variant/60 cursor-pointer transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-label-md font-label-md font-semibold text-primary shrink-0">
                01
              </div>
              <div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface font-medium">Paste</h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Paste raw client email, WhatsApp voice transcript, or Slack DM. No formatting necessary.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div
              onClick={() => onNavigate('create')}
              className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3 hover:border-outline-variant/60 cursor-pointer transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-label-md font-label-md font-semibold text-secondary shrink-0">
                02
              </div>
              <div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface font-medium">Generate</h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  AI automatically extracts deliverable scope, sets realistic pricing, and structures schedule blocks.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              onClick={() => onNavigate('quotes')}
              className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3 hover:border-outline-variant/60 cursor-pointer transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center justify-center text-label-md font-label-md font-semibold text-tertiary shrink-0">
                03
              </div>
              <div>
                <h3 className="text-headline-sm font-headline-sm text-on-surface font-medium">Send</h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Review fine details, export a branded signature-ready PDF or share an interactive Web link.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid (6 Sleek Linear-inspired cards) */}
        <section className="mt-14">
          <div className="mb-4">
            <span className="text-label-sm font-label-sm text-primary uppercase tracking-wider">Engineered for Closing</span>
            <h2 className="text-headline-md font-headline-md text-on-surface font-semibold">Everything needed to close fast</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {/* Feature 1 */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface font-medium">1. AI Requirement Extraction</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Isolate implicit requirements and unstated technical dependencies before scoping pitfalls happen.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary mb-3">
                <span className="material-symbols-outlined text-[20px]">checklist_rtl</span>
              </div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface font-medium">2. Smart Scope &amp; Deliverables</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Turn generic requests into discrete, audit-ready milestone lists with distinct boundaries.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary mb-3">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface font-medium">3. Dynamic Pricing Breakdown</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Tuned to agency market rates or your historical benchmarks with instant currency conversion.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined text-[20px]">date_range</span>
              </div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface font-medium">4. Realistic Project Timeline</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Defensible phases, review buffers, and milestone completion dates clients understand immediately.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary mb-3">
                <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
              </div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface font-medium">5. Professional Branded PDF</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Executive layout styling, your custom company wordmark, and clean digital signature blocks.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary mb-3">
                <span className="material-symbols-outlined text-[20px]">mark_chat_read</span>
              </div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface font-medium">6. AI Client Follow-Up Messages</h3>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Autopilot courteous nudges and response sequences to reduce sales friction and ghosting.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans Comparison Teaser */}
        <section className="mt-14">
          <div className="text-center mb-6">
            <span className="text-label-sm font-label-sm text-primary uppercase tracking-wider">Predictable Value</span>
            <h2 className="text-headline-md font-headline-md text-on-surface font-semibold">Pricing Plans</h2>
            <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">Choose the speed your pipeline demands.</p>
          </div>
          <div className="space-y-3">
            {/* Free Plan */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-headline-sm font-headline-sm text-on-surface font-medium">Starter</h3>
                <span className="text-headline-md font-headline-md font-code-md text-on-surface">$0</span>
              </div>
              <p className="text-body-sm font-body-sm text-on-surface-variant mb-3">Ideal for side-hustlers and quick tests.</p>
              <ul className="text-body-sm font-body-sm text-on-surface-variant space-y-1 mb-4">
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[16px]">check</span> 3 quotes per month</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[16px]">check</span> Standard PDF export</li>
              </ul>
              <button
                onClick={() => {
                  onNavigate('create');
                  onShowToast("Starter plan active (3 quotes/mo)");
                }}
                className="w-full py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-body-sm font-body-sm text-on-surface border border-outline-variant/30 active:scale-[0.98] transition-all cursor-pointer"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Plan (Highlighted) */}
            <div className="p-4 rounded-xl bg-surface-container border border-primary/40 relative overflow-hidden glow-indigo">
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-label-sm font-label-sm border border-primary/30">
                Most Popular
              </div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">Pro</h3>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-headline-lg font-headline-lg font-code-md text-primary">$9</span>
                  <span className="text-label-sm font-label-sm text-outline">/mo</span>
                </div>
              </div>
              <p className="text-body-sm font-body-sm text-on-surface-variant mb-3">For active solo freelancers &amp; consultants.</p>
              <ul className="text-body-sm font-body-sm text-on-surface space-y-1.5 mb-4">
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[16px]">check_circle</span> Unlimited AI quote creation</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[16px]">check_circle</span> Custom branding &amp; watermark removal</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[16px]">check_circle</span> WhatsApp &amp; Slack transcript parser</li>
              </ul>
              <button
                onClick={() => {
                  onNavigate('create');
                  onShowToast("Pro 7-day trial initiated!", "verified");
                }}
                className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-headline-sm font-medium shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
              >
                Start 7-Day Free Trial
              </button>
            </div>

            {/* Business Plan */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-headline-sm font-headline-sm text-on-surface font-medium">Business</h3>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-headline-md font-headline-md font-code-md text-on-surface">$29</span>
                  <span className="text-label-sm font-label-sm text-outline">/mo</span>
                </div>
              </div>
              <p className="text-body-sm font-body-sm text-on-surface-variant mb-3">For boutiques, studios, and agencies.</p>
              <ul className="text-body-sm font-body-sm text-on-surface-variant space-y-1 mb-4">
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[16px]">check</span> Team workspace &amp; seat management</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[16px]">check</span> CRM &amp; invoicing auto-sync</li>
                <li className="flex items-center gap-1.5"><span className="material-symbols-outlined text-primary text-[16px]">check</span> Custom contract boilerplate clause AI</li>
              </ul>
              <button
                onClick={() => onShowToast("Enterprise sales inquiry forwarded!", "mail")}
                className="w-full py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-body-sm font-body-sm text-on-surface border border-outline-variant/30 active:scale-[0.98] transition-all cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-outline-variant/20 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img alt="QuoteFlow AI Logo" className="w-5 h-5 rounded object-contain" src={LOGO_URL} />
            <span className="text-headline-sm font-headline-sm font-semibold text-on-surface">QuoteFlow AI</span>
          </div>
          <p className="text-body-sm font-body-sm text-outline mb-4">Transform conversations into closed revenue.</p>
          <div className="flex justify-center items-center gap-4 text-label-md font-label-md text-on-surface-variant mb-6">
            <button onClick={() => onShowToast("Privacy Policy: End-to-end client confidentiality")} className="hover:text-primary transition-colors">Privacy</button>
            <span>·</span>
            <button onClick={() => onShowToast("Terms: Agency commercial license")} className="hover:text-primary transition-colors">Terms</button>
            <span>·</span>
            <button onClick={() => onShowToast("Security: SOC-2 certified architecture")} className="hover:text-primary transition-colors">Security</button>
            <span>·</span>
            <button onClick={() => onShowToast("Changelog: v2.4.0 Live")} className="hover:text-primary transition-colors">Changelog</button>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-label-sm font-label-sm text-outline border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Systems Operational v2.4.0</span>
          </div>
          <div className="mt-6 text-label-sm font-label-sm text-outline/60 font-mono">
            © 2025 QuoteFlow AI Inc. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
