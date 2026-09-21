import { useState } from 'react';
import { PROMPT_PRESETS } from '../data/mockData';
import { Quote, ScreenType } from '../types';

interface CreateQuoteScreenProps {
  onQuoteCreated: (newQuote: Quote) => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export function CreateQuoteScreen({
  onQuoteCreated,
  onNavigate,
  onShowToast,
}: CreateQuoteScreenProps) {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [demoMode, setDemoMode] = useState<boolean>(true);
  const [currency, setCurrency] = useState<'$' | '€' | '£'>('$');
  const [businessProfile, setBusinessProfile] = useState<'Agency' | 'Freelance'>('Agency');
  const [message, setMessage] = useState<string>(
    'Hey! We need a clean e-commerce store built on Shopify for our handmade ceramics brand. We have about 12 products, need Stripe/Apple Pay checkout, Instagram shop sync, and basic shipping rates configured. We want to launch in 3 weeks max. Our budget is around $2k-$2.5k.'
  );
  const [clientNotes, setClientNotes] = useState<string>(
    'Client intro call: Elena emphasized mobile checkout conversion as primary objective. Hard deadline of 3 weeks for upcoming launch event. Will supply product copy and high-res stills.'
  );
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [synthesisProgress, setSynthesisProgress] = useState<number>(75);

  const PRESET_CLIENT_NOTES = [
    { label: '+ Discovery Call', text: 'Intro Discovery: Met with primary stakeholder; discussed key target outcomes, urgent deadlines, and deliverable priorities.' },
    { label: '+ Scope & Tech', text: 'Technical Context: Needs integration with existing payment gateway, clean mobile UI, and zero downtime launch.' },
    { label: '+ Stakeholder', text: 'Stakeholders: Direct sign-off with founder; deposit approved for fast-track milestone kickoff.' }
  ];

  // Clarification choices
  const [q1Choice, setQ1Choice] = useState<number>(0); // 0: Yes, 1: +$600, 2: +$150
  const [q2Choice, setQ2Choice] = useState<number>(1); // 0: Custom liquid (+$800), 1: Premium ($$)

  // Calculate dynamic preview estimate
  const baseEstimate = 1800;
  const q1Delta = q1Choice === 1 ? 600 : q1Choice === 2 ? 150 : 0;
  const q2Delta = q2Choice === 0 ? 800 : 0;
  const calculatedDraftTotal = baseEstimate + q1Delta + q2Delta;

  const handleSelectPreset = (presetText: string) => {
    setMessage(presetText);
    onShowToast("Preset loaded into brief canvas!", "auto_awesome");
  };

  const handleGenerateAIQuote = () => {
    setIsSynthesizing(true);
    setActiveStep(2);
    setSynthesisProgress(25);
    onShowToast("Initiating Gemini scope extraction...", "sync");

    setTimeout(() => {
      setSynthesisProgress(50);
    }, 400);

    setTimeout(() => {
      setSynthesisProgress(75);
    }, 800);

    setTimeout(() => {
      setSynthesisProgress(100);
      setIsSynthesizing(false);
      onShowToast("Scope structured & milestones calibrated!", "check_circle");
    }, 1300);
  };

  const handleViewDraftPreview = () => {
    // Generate new quote object or update current
    const newQuote: Quote = {
      id: 'qf-' + Math.floor(Math.random() * 900 + 100),
      refNumber: 'QF-2024-0' + Math.floor(Math.random() * 900 + 100),
      title: message.toLowerCase().includes('mobile')
        ? 'Mobile App MVP Wireframing & UX Flow'
        : message.toLowerCase().includes('brand')
        ? 'Brand Identity & Guidelines'
        : 'Shopify Store Launch & Payment Integration',
      clientName: 'Elena Rostova',
      companyName: 'Ceramic Craft Co.',
      clientEmail: 'elena@ceramiccraft.co',
      status: 'Draft',
      timeline: '3 Weeks',
      deliveryDate: 'Oct 28',
      currency: currency,
      businessProfile: businessProfile,
      initialMessage: message,
      clientNotes: clientNotes.trim() || undefined,
      dateCreated: 'Today',
      updatedAgo: 'Just now',
      discountPercent: 10,
      taxPercent: 0,
      paymentTerms: '50% upfront deposit required to initiate discovery; remaining 50% upon project completion and DNS transfer.',
      revisionTerms: '2 rounds of design and layout revisions included. Additional scope adjustments billed at standard $85/hour.',
      items: [
        { id: 1, name: 'Theme Setup & Responsive Storefront', description: 'Clean Shopify 2.0 architecture', price: 750, qty: 1 },
        { id: 2, name: '12 Product Catalog Upload & SEO', description: 'Meta tags & alt image tags', price: 400, qty: 1 },
        { id: 3, name: 'Stripe, Apple Pay & Shipping Setup', description: 'Custom zones & tax rules', price: 450, qty: 1 },
        { id: 4, name: 'Instagram / Meta Commerce Sync', description: 'Shoppable feed configuration', price: 250, qty: 1 },
        { id: 5, name: 'Client Handoff & Training Video', description: 'Loom walkthrough & documentation', price: 150, qty: 1 },
        ...(q1Choice === 1 ? [{ id: 6, name: 'Professional Studio Photography (12 Items)', description: 'Hi-res product stills & color grading', price: 600, qty: 1 }] : []),
        ...(q2Choice === 0 ? [{ id: 7, name: 'Custom Liquid Template Engineering', description: 'Bespoke Shopify theme codebase', price: 800, qty: 1 }] : []),
      ]
    };

    onQuoteCreated(newQuote);
    onNavigate('quotes');
  };

  const getParsedCategory = () => {
    const lower = message.toLowerCase();
    if (lower.includes('shopify') || lower.includes('ecommerce') || lower.includes('store')) {
      return 'Shopify E-commerce';
    }
    if (lower.includes('mobile') || lower.includes('ios') || lower.includes('app')) {
      return 'Mobile App UI/UX';
    }
    if (lower.includes('brand') || lower.includes('logo')) {
      return 'Branding & Design';
    }
    return 'Custom Digital Project';
  };

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container pb-28">
      {/* Header Anchor / Mobile Navigation Header */}
      <header className="sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-md px-margin-mobile h-14 flex items-center justify-between shadow-sm border-b border-outline-variant/15">
        <div className="flex items-center gap-space-sm">
          <button
            onClick={() => onNavigate('dashboard')}
            aria-label="Go back"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface">
              New Quote
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-label-sm uppercase tracking-wider bg-surface-container-high text-primary border border-outline-variant/30 font-mono">
              v2.4
            </span>
          </div>
        </div>

        {/* Demo Mode Toggle & Quick Settings */}
        <div className="flex items-center gap-space-sm">
          <label className="flex items-center gap-1.5 cursor-pointer select-none bg-surface-container-low px-2 py-1 rounded-full border border-outline-variant/30">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">Demo</span>
            <input
              type="checkbox"
              checked={demoMode}
              onChange={(e) => {
                setDemoMode(e.target.checked);
                onShowToast(e.target.checked ? "Demo auto-fill enabled" : "Demo mode off");
              }}
              className="sr-only peer"
            />
            <div className="w-7 h-4 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:border-surface after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-primary-container relative"></div>
          </label>
          <button
            onClick={() => onShowToast("AI Analysis ready. Click 'Generate Quote with AI'", "auto_awesome")}
            aria-label="Spark suggestions"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary">auto_awesome</span>
          </button>
        </div>
      </header>

      {/* Step Segmented Control */}
      <div className="px-margin-mobile pt-3 pb-2 sticky top-14 z-30 bg-surface-container-lowest/80 backdrop-blur-md">
        <div className="grid grid-cols-3 p-1 rounded-xl bg-surface-container-low border border-outline-variant/20 gap-1 text-center font-mono">
          <button
            onClick={() => setActiveStep(1)}
            className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-label-md transition-all ${
              activeStep === 1
                ? 'bg-surface-container-high text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold">
              1
            </span>
            <span className="truncate">Message</span>
          </button>
          <button
            onClick={() => setActiveStep(2)}
            className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-label-md transition-all ${
              activeStep === 2
                ? 'bg-surface-container-high text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center text-[10px]">
              2
            </span>
            <span className="truncate">Extraction</span>
          </button>
          <button
            onClick={handleViewDraftPreview}
            className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-on-surface-variant hover:text-on-surface text-label-md"
          >
            <span className="w-4 h-4 rounded-full bg-surface-container text-on-surface-variant/70 flex items-center justify-center text-[10px]">
              3
            </span>
            <span className="truncate">Editor</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Container */}
      <main className="px-margin-mobile py-2 flex flex-col gap-space-md flex-1 max-w-lg mx-auto w-full">
        {/* Active Input Card */}
        <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5 font-semibold">
                What did your client ask for?
                <span className="material-symbols-outlined text-secondary text-sm">chat_bubble</span>
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                Paste email, WhatsApp message, DM, voice note transcript, or bullet points.
              </p>
            </div>
          </div>

          {/* Quick Presets Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 mb-2">
            <span className="text-[10px] font-mono text-outline uppercase tracking-wider shrink-0">
              Presets:
            </span>
            {PROMPT_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p.text)}
                className="px-2 py-0.5 rounded-md bg-surface-container text-[11px] font-mono text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors shrink-0 border border-outline-variant/20"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Conversational Input Canvas */}
          <div className="mt-space-sm relative rounded-lg border border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all bg-surface-container-lowest p-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent border-0 focus:ring-0 text-on-surface font-body-md text-body-md placeholder:text-outline resize-none p-0 focus:outline-none leading-relaxed"
              placeholder="Paste client brief here..."
              rows={5}
            />
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-outline-variant/20">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container text-tertiary font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                  Parsed: {getParsedCategory()}
                </span>
              </div>
              <span className="font-code-md text-code-md text-outline font-mono">
                {message.length} / 2,000
              </span>
            </div>
          </div>

          {/* Quick Upload & Parameter Selectors */}
          <div className="mt-space-sm grid grid-cols-2 gap-space-sm">
            {/* Document Upload Strip */}
            <label className="col-span-2 border border-dashed border-outline-variant/50 hover:border-primary/50 bg-surface-container-lowest/50 hover:bg-surface-container-lowest p-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-[0.99]">
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onShowToast(`Uploaded "${e.target.files[0].name}" - parsing brief`, "cloud_done");
                  }
                }}
              />
              <span className="material-symbols-outlined text-outline">cloud_upload</span>
              <span className="font-label-md text-label-md text-on-surface-variant font-mono">
                Drop PDF/Brief or tap to upload
              </span>
              <span className="font-label-sm text-label-sm text-outline px-1 rounded bg-surface-container font-mono">
                Max 25MB
              </span>
            </label>

            {/* Currency Selector */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-outline font-mono">Quote Currency</label>
              <div className="flex bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-0.5 font-mono">
                {(['$', '€', '£'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`flex-1 py-1 rounded text-center font-label-sm text-label-sm transition-colors ${
                      currency === c
                        ? 'bg-surface-container-high text-primary font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {c === '$' ? '$ USD' : c === '€' ? '€ EUR' : '£ GBP'}
                  </button>
                ))}
              </div>
            </div>

            {/* Business Type Selector */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-outline font-mono">Business Profile</label>
              <div className="flex bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-0.5 font-mono">
                <button
                  onClick={() => setBusinessProfile('Agency')}
                  className={`flex-1 py-1 rounded text-center font-label-sm text-label-sm truncate px-1 transition-colors ${
                    businessProfile === 'Agency'
                      ? 'bg-surface-container-high text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Agency
                </button>
                <button
                  onClick={() => setBusinessProfile('Freelance')}
                  className={`flex-1 py-1 rounded text-center font-label-sm text-label-sm truncate px-1 transition-colors ${
                    businessProfile === 'Freelance'
                      ? 'bg-surface-container-high text-primary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Freelance
                </button>
              </div>
            </div>
          </div>

          {/* Client Notes Text Area (Pre-call Details attached to Quote Metadata) */}
          <div
            id="client-notes-container"
            className="mt-space-sm bg-surface-container-lowest rounded-lg border border-outline-variant/30 p-3 space-y-2"
          >
            <div className="flex items-center justify-between">
              <label
                htmlFor="client-notes-textarea"
                className="font-label-sm text-label-sm text-on-surface flex items-center gap-1.5 font-semibold font-mono"
              >
                <span className="material-symbols-outlined text-primary text-[16px]">speaker_notes</span>
                <span>Client Notes</span>
              </label>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-surface-container text-outline border border-outline-variant/30">
                Pre-Call Metadata
              </span>
            </div>

            <p className="font-body-sm text-[12px] text-outline leading-snug">
              Log client discovery takeaways, pre-call briefing notes, or internal context. These are automatically attached to this quote's metadata.
            </p>

            {/* Quick preset chips for rapid note entry */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[10px] font-mono text-outline shrink-0">Quick Add:</span>
              {PRESET_CLIENT_NOTES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setClientNotes((prev) => (prev.trim() ? `${prev.trim()}\n${preset.text}` : preset.text));
                    onShowToast(`Appended note: "${preset.label}"`, 'note_add');
                  }}
                  className="px-2 py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-[10px] font-mono text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/20 shrink-0 cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <textarea
              id="client-notes-textarea"
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              rows={3}
              placeholder="e.g., Intro call notes: Client highlighted priority on mobile UX and requested expedited 3-week delivery. Decision maker is Elena..."
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-2.5 text-body-sm text-on-surface font-mono placeholder:text-outline focus:outline-none focus:border-primary transition-all resize-none leading-relaxed"
            />

            <div className="flex items-center justify-between text-[11px] font-mono text-outline pt-0.5">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span>Auto-attaches to created quote</span>
              </span>
              <span>{clientNotes.length} chars</span>
            </div>
          </div>

          {/* Primary Action CTA */}
          <button
            onClick={handleGenerateAIQuote}
            disabled={isSynthesizing}
            className="mt-space-md w-full bg-primary text-on-primary font-headline-sm text-body-lg font-medium py-3 rounded-lg shadow-lg hover:bg-primary-fixed-dim active:scale-[0.98] transition-all flex items-center justify-center gap-2 border-t border-white/20 cursor-pointer"
          >
            <span>{isSynthesizing ? 'Synthesizing Quote...' : 'Generate Quote with AI'}</span>
            <span
              className={`material-symbols-outlined ${isSynthesizing ? 'animate-spin' : ''}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isSynthesizing ? 'progress_activity' : 'auto_awesome'}
            </span>
          </button>
        </div>

        {/* AI Real-Time Processing Stepper Overlay / Card */}
        <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/15">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-ping"></div>
              <span className="font-headline-sm text-body-md font-semibold text-on-surface">
                AI Synthesis Pipeline
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/30 px-2 py-0.5 rounded-full border border-secondary/30 font-mono">
              {synthesisProgress}% Complete
            </span>
          </div>

          {/* Stepper List */}
          <div className="mt-3 space-y-2.5">
            {/* Step 1 */}
            <div className="flex items-center gap-2.5 text-on-surface">
              <span
                className="material-symbols-outlined text-tertiary text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-body-sm text-body-sm text-on-surface flex-1">
                Understanding requirements &amp; deliverables
              </span>
              <span className="font-code-md text-label-sm text-outline font-mono">0.4s</span>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-2.5 text-on-surface">
              <span
                className="material-symbols-outlined text-tertiary text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="font-body-sm text-body-sm text-on-surface flex-1">
                Structuring scope &amp; milestones (3 phases)
              </span>
              <span className="font-code-md text-label-sm text-outline font-mono">0.9s</span>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-2.5 text-primary bg-primary/10 p-2 rounded-lg border border-primary/20">
              <span className="material-symbols-outlined text-primary animate-spin text-base">
                progress_activity
              </span>
              <span className="font-body-sm text-body-sm font-medium flex-1">
                Calculating dynamic market pricing...
              </span>
              <span className="font-label-sm text-label-sm text-primary animate-pulse font-mono">
                Running
              </span>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-2.5 text-outline">
              <span className="material-symbols-outlined text-outline text-base">
                radio_button_unchecked
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant flex-1">
                Preparing terms &amp; follow-up message
              </span>
              <span className="font-label-sm text-label-sm text-outline font-mono">Queued</span>
            </div>
          </div>
        </div>

        {/* Attached Client Notes Metadata Card */}
        {clientNotes && (
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 shadow-sm flex items-start gap-2.5">
            <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">speaker_notes</span>
            <div className="space-y-0.5 overflow-hidden flex-1">
              <div className="flex items-center justify-between">
                <span className="text-label-sm font-mono uppercase tracking-wider text-outline">
                  Attached Client Notes (Metadata)
                </span>
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="text-[11px] font-mono text-primary hover:underline cursor-pointer"
                >
                  Edit Note
                </button>
              </div>
              <p className="text-body-sm font-mono text-on-surface-variant line-clamp-2 leading-snug">
                {clientNotes}
              </p>
            </div>
          </div>
        )}

        {/* AI Safety & Clarification Notice Card */}
        <div className="p-space-md rounded-xl bg-surface-container-low border border-secondary/30 relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-high text-secondary border border-secondary/40 font-medium font-mono">
                <span className="material-symbols-outlined text-xs">warning</span>
                Needs Clarification
              </span>
            </div>
            <span className="font-code-md text-label-sm text-outline font-mono">
              Accuracy +28%
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            AI identified <strong className="text-on-surface font-semibold">2 ambiguous specifications</strong> before finalizing scope:
          </p>

          {/* Clarification Questions & Answer Chips */}
          <div className="mt-3 space-y-3">
            {/* Question 1 */}
            <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
              <div className="flex items-start gap-2">
                <span className="font-label-sm text-label-sm text-secondary font-bold font-mono">
                  Q1
                </span>
                <p className="font-body-sm text-body-sm text-on-surface leading-tight">
                  Will client provide professional photography for the 12 ceramics products?
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2 ml-5">
                <button
                  onClick={() => setQ1Choice(0)}
                  className={`px-2 py-1 rounded-full text-label-sm font-label-sm font-mono active:scale-95 transition-all cursor-pointer ${
                    q1Choice === 0
                      ? 'bg-primary/20 text-primary border border-primary/40 font-medium'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/30'
                  }`}
                >
                  ✓ Yes, client provides
                </button>
                <button
                  onClick={() => setQ1Choice(1)}
                  className={`px-2 py-1 rounded-full text-label-sm font-label-sm font-mono active:scale-95 transition-all cursor-pointer ${
                    q1Choice === 1
                      ? 'bg-primary/20 text-primary border border-primary/40 font-medium'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/30'
                  }`}
                >
                  No, add shoot ($600)
                </button>
                <button
                  onClick={() => setQ1Choice(2)}
                  className={`px-2 py-1 rounded-full text-label-sm font-label-sm font-mono active:scale-95 transition-all cursor-pointer ${
                    q1Choice === 2
                      ? 'bg-primary/20 text-primary border border-primary/40 font-medium'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/30'
                  }`}
                >
                  Stock/AI placeholders
                </button>
              </div>
            </div>

            {/* Question 2 */}
            <div className="p-2.5 rounded-lg bg-surface-container-lowest border border-outline-variant/20">
              <div className="flex items-start gap-2">
                <span className="font-label-sm text-label-sm text-secondary font-bold font-mono">
                  Q2
                </span>
                <p className="font-body-sm text-body-sm text-on-surface leading-tight">
                  Is custom theme development required, or a pre-built premium theme customization?
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2 ml-5">
                <button
                  onClick={() => setQ2Choice(0)}
                  className={`px-2 py-1 rounded-full text-label-sm font-label-sm font-mono active:scale-95 transition-all cursor-pointer ${
                    q2Choice === 0
                      ? 'bg-primary/20 text-primary border border-primary/40 font-medium'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/30'
                  }`}
                >
                  Custom Liquid Code ($$$)
                </button>
                <button
                  onClick={() => setQ2Choice(1)}
                  className={`px-2 py-1 rounded-full text-label-sm font-label-sm font-mono active:scale-95 transition-all cursor-pointer ${
                    q2Choice === 1
                      ? 'bg-primary/20 text-primary border border-primary/40 font-medium'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface border border-outline-variant/30'
                  }`}
                >
                  ✓ Premium Theme Setup ($$)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Draft Drawer Launcher Strip */}
        <div className="pt-1">
          <button
            onClick={handleViewDraftPreview}
            className="w-full bg-surface-container-high hover:bg-surface-bright text-on-surface font-body-md py-2.5 px-4 rounded-xl border border-outline-variant/40 flex items-center justify-between group active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary"></span>
              <span className="font-body-md text-body-md text-on-surface">View Draft Preview</span>
              <span className="font-code-md text-code-md text-primary font-semibold font-mono">
                ({currency}{calculatedDraftTotal.toLocaleString()})
              </span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant group-hover:text-on-surface">
              <span className="font-label-sm text-label-sm font-mono">3 Milestones</span>
              <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
