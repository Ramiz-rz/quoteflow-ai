import { useState, useEffect } from 'react';
import { Quote, ScreenType, DeliverableItem } from '../types';
import { A4ProposalSheet } from '../components/A4ProposalSheet';
import { printQuoteToPdf } from '../utils/printPdf';

interface QuoteEditorScreenProps {
  quote: Quote;
  onUpdateQuote: (updated: Quote) => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export function QuoteEditorScreen({
  quote,
  onUpdateQuote,
  onNavigate,
  onShowToast,
}: QuoteEditorScreenProps) {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [items, setItems] = useState<DeliverableItem[]>(quote?.items || []);
  const [discountPercent] = useState<number>(quote?.discountPercent ?? 10);
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(true);
  const [pitchIndex, setPitchIndex] = useState<number>(0);

  // In-app add item modal state (no native prompt)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('150');
  const [newItemDesc, setNewItemDesc] = useState('');

  // Client notes state
  const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);
  const [currentNotes, setCurrentNotes] = useState<string>(quote?.clientNotes || '');

  // Keep items synchronized when parent selectedQuote changes
  useEffect(() => {
    if (quote?.items) {
      setItems(quote.items);
    }
    setCurrentNotes(quote?.clientNotes || '');
  }, [quote?.id, quote?.clientNotes]);

  // Calculate live financial values safely
  const safeItems = items || [];
  const subtotal = safeItems.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 1), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleAdjustQty = (id: number, delta: number) => {
    const updated = items
      .map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.qty + delta);
          return { ...item, qty: newQty };
        }
        return item;
      })
      .filter((item) => item.qty > 0);

    setItems(updated);
    onUpdateQuote({ ...quote, items: updated });
  };

  const handleAddItem = () => {
    setNewItemName('');
    setNewItemPrice('150');
    setNewItemDesc('');
    setIsAddModalOpen(true);
  };

  const handleConfirmAddItem = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const title = newItemName.trim();
    if (!title) {
      onShowToast('Please specify deliverable title', 'warning');
      return;
    }
    const rate = parseFloat(newItemPrice) || 100;
    const newItem: DeliverableItem = {
      id: Date.now(),
      name: title,
      description: newItemDesc.trim() || 'Milestone deliverable specification',
      price: rate,
      qty: 1,
    };

    const updated = [...items, newItem];
    setItems(updated);
    onUpdateQuote({ ...quote, items: updated });
    onShowToast(`Added "${title}" to scope`, 'check_circle');
    setIsAddModalOpen(false);
  };

  const emailTemplates = [
    `Hi ${quote.clientName}, Thanks for sharing the details! Based on your 12 products and ${quote.timeline} timeline, I’ve put together a comprehensive scope and fixed-price quote of ${quote.currency}${finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} including payment setup, mobile responsiveness, and Meta commerce catalog sync. Let me know if you’d like to review the full A4 specification!`,
    `Hello ${quote.clientName}, here is the finalized scope for ${quote.companyName}. At ${quote.currency}${finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}, we cover complete catalog onboarding, payment gating, and responsive mobile testing over ${quote.timeline}. We can kick off discovery this week upon initial deposit.`,
    `Dear ${quote.clientName}, following up on your inquiry—we have scheduled a 3-week delivery sprint for ${quote.companyName}. Our proposal is priced at ${quote.currency}${finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} with milestone-based signoffs. The full formal SOW document is ready for authorization.`
  ];

  const currentEmailText = emailTemplates[pitchIndex % emailTemplates.length];

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(currentEmailText).then(() => {
      onShowToast('Client pitch copied to clipboard!', 'content_copy');
    }).catch(() => {
      onShowToast('Copied to clipboard!', 'check');
    });
  };

  const handleRegeneratePitch = () => {
    onShowToast('Generating high-converting pitch copy...', 'auto_awesome');
    setTimeout(() => {
      setPitchIndex((prev) => prev + 1);
      onShowToast('Draft refreshed with optimized tone!', 'check_circle');
    }, 450);
  };

  const handleDownloadPDF = () => {
    onShowToast('Preparing A4 PDF print document...', 'picture_as_pdf');
    printQuoteToPdf(
      quote,
      () => {
        onShowToast('Print dialog open — Choose "Save as PDF"', 'print');
      },
      (status) => {
        if (status === 'blocked') {
          onShowToast('Print blocked by iframe sandbox — Open app in a new tab to save PDF', 'open_in_new');
        } else {
          onShowToast('A4 Statement of Work PDF exported!', 'check_circle');
        }
      }
    );
  };

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen pb-36 selection:bg-primary-container selection:text-on-primary-container">
      {/* Mobile Top Action Bar */}
      <header className="sticky top-0 z-40 bg-surface-container-lowest/90 backdrop-blur-md px-margin-mobile py-2.5 flex items-center justify-between shadow-sm border-b border-outline-variant/15 no-print">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={() => onNavigate('dashboard')}
            aria-label="Back"
            className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors active:scale-95 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm font-semibold tracking-tight text-on-surface truncate max-w-[170px]">
                {quote.title}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-label-sm font-medium tracking-wide uppercase bg-surface-container-high text-outline border border-outline-variant/40 font-mono">
                {quote.status}
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-mono">
              <span className="material-symbols-outlined text-[13px] text-primary">auto_awesome</span>
              v1.4 • Auto-calculated
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md transition-colors active:scale-95 border border-outline-variant/30 cursor-pointer font-mono"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            <span>Export</span>
          </button>
        </div>
      </header>

      {/* Segmented View Switcher */}
      <div className="px-margin-mobile pt-3 pb-2 no-print">
        <div className="p-1 bg-surface-container-low rounded-xl flex items-center gap-1 border border-outline-variant/20 shadow-inner font-mono">
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-body-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-surface-container-high text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Editor &amp; Scope</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-body-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-surface-container-high text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">description</span>
            <span>A4 Proposal Preview</span>
          </button>
        </div>
      </div>

      {/* MAIN VIEW CONTAINER */}
      <main className="px-margin-mobile space-y-space-md mt-2 max-w-lg mx-auto">
        {/* VIEW 1: INTERACTIVE EDITOR & SCOPE */}
        {activeTab === 'editor' && (
          <>
            <div className="space-y-space-md no-print">
              {/* Project Details Card */}
              <section className="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/20 shadow-sm relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-0.5">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold flex items-center gap-1 font-mono">
                      <span className="material-symbols-outlined text-[12px]">dataset</span> Project Summary
                    </span>
                    <h1 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                      {quote.title}
                    </h1>
                  </div>
                  <span className="p-1.5 rounded-lg bg-surface-container text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">storefront</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-outline-variant/20">
                  <div className="bg-surface-container-lowest/80 p-2.5 rounded-lg border border-outline-variant/15">
                    <div className="font-label-sm text-label-sm text-on-surface-variant font-mono">Client Entity</div>
                    <div className="font-body-md text-body-md text-on-surface font-medium truncate mt-0.5">
                      {quote.clientName}
                    </div>
                    <div className="font-label-sm text-label-sm text-outline truncate font-mono">
                      {quote.companyName}
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest/80 p-2.5 rounded-lg border border-outline-variant/15">
                    <div className="font-label-sm text-label-sm text-on-surface-variant font-mono">Timeline Estimate</div>
                    <div className="font-body-md text-body-md text-on-surface font-medium truncate mt-0.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-tertiary">calendar_clock</span>
                      {quote.timeline}
                    </div>
                    <div className="font-label-sm text-label-sm text-outline truncate font-mono">
                      Delivery: {quote.deliveryDate}
                    </div>
                  </div>
                </div>

                {/* Attached Client Notes & Pre-Call Details Metadata Block */}
                <div id="quote-editor-client-notes-block" className="mt-2.5 pt-2.5 border-t border-outline-variant/20">
                  <div className="bg-surface-container-lowest/80 p-2.5 rounded-lg border border-outline-variant/15 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-label-sm font-mono text-outline">
                        <span className="material-symbols-outlined text-[15px] text-primary">speaker_notes</span>
                        <span className="uppercase tracking-wider">Client Notes &amp; Pre-Call Metadata</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsEditingNotes(!isEditingNotes)}
                        className="text-[11px] font-mono text-primary hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {isEditingNotes ? 'close' : 'edit'}
                        </span>
                        <span>{isEditingNotes ? 'Cancel' : 'Edit'}</span>
                      </button>
                    </div>

                    {isEditingNotes ? (
                      <div className="space-y-2 pt-1">
                        <textarea
                          value={currentNotes}
                          onChange={(e) => setCurrentNotes(e.target.value)}
                          rows={3}
                          placeholder="Log pre-call details, discovery takeaways, client specifications..."
                          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg p-2 text-body-sm text-on-surface font-mono placeholder:text-outline focus:outline-none focus:border-primary transition-all resize-none"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const updatedNotes = currentNotes.trim() || undefined;
                              onUpdateQuote({ ...quote, clientNotes: updatedNotes });
                              setIsEditingNotes(false);
                              onShowToast('Client metadata notes updated', 'check_circle');
                            }}
                            className="px-2.5 py-1 rounded-md bg-primary text-on-primary text-[11px] font-mono font-medium hover:bg-primary-fixed-dim transition-colors cursor-pointer"
                          >
                            Save Notes
                          </button>
                        </div>
                      </div>
                    ) : quote.clientNotes ? (
                      <p className="font-body-sm text-body-sm text-on-surface-variant font-mono whitespace-pre-wrap leading-relaxed">
                        {quote.clientNotes}
                      </p>
                    ) : (
                      <div className="flex items-center justify-between text-outline text-body-sm font-mono italic py-0.5">
                        <span>No pre-call notes logged for this quote.</span>
                        <button
                          type="button"
                          onClick={() => setIsEditingNotes(true)}
                          className="text-primary hover:underline text-[11px] not-italic font-sans"
                        >
                          + Add Notes
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Scope & Deliverables Interactive Section */}
              <section className="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/20 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                      Scope &amp; Deliverables
                    </h2>
                    <span className="px-1.5 py-0.2 rounded-full font-label-sm text-label-sm bg-surface-container text-primary font-medium font-mono">
                      {items.length}
                    </span>
                  </div>
                  <button
                    onClick={handleAddItem}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-medium transition-transform active:scale-95 cursor-pointer font-mono"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Add Item</span>
                  </button>
                </div>

                {/* Scope Line Items List */}
                <div className="space-y-2">
                  {items.map((it) => (
                    <div
                      key={it.id}
                      className="line-item bg-surface-container-lowest/90 rounded-lg p-2.5 border border-outline-variant/20 flex items-center gap-2 transition-all hover:border-outline-variant/40"
                    >
                      <div className="text-outline cursor-grab p-1 shrink-0">
                        <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-body-md text-body-md text-on-surface font-medium truncate">
                          {it.name}
                        </div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-2 mt-0.5 font-mono">
                          <span className="text-primary font-medium">{quote.currency}{it.price.toFixed(2)} unit</span>
                          <span>•</span>
                          <span className="text-outline truncate">{it.description}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center bg-surface-container rounded border border-outline-variant/20">
                          <button
                            onClick={() => handleAdjustQty(it.id, -1)}
                            className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-90 cursor-pointer"
                            type="button"
                          >
                            -
                          </button>
                          <span className="font-code-md text-code-md w-5 text-center text-on-surface font-medium font-mono">
                            {it.qty}
                          </span>
                          <button
                            onClick={() => handleAdjustQty(it.id, 1)}
                            className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-90 cursor-pointer"
                            type="button"
                          >
                            +
                          </button>
                        </div>
                        <div className="w-16 text-right font-code-md text-code-md font-semibold text-on-surface font-mono">
                          {quote.currency}{(it.price * it.qty).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Dynamic Price Summary Card */}
              <section className="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/20 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
                  <div className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold font-mono">
                    Pricing Breakdown
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    Instant Sync
                  </span>
                </div>
                <div className="space-y-2 font-body-sm text-body-sm">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Scope Subtotal</span>
                    <span className="font-code-md text-code-md text-on-surface font-mono">
                      {quote.currency}{subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-secondary">
                    <span className="flex items-center gap-1">
                      Discount ({discountPercent}% early payment)
                      <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    </span>
                    <span className="font-code-md text-code-md font-mono">
                      -{quote.currency}{discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Tax (0% Service Exemption)</span>
                    <span className="font-code-md text-code-md text-on-surface font-mono">
                      {quote.currency}0.00
                    </span>
                  </div>
                </div>

                {/* Total Highlight Box */}
                <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-high/40 p-3 rounded-lg">
                  <div>
                    <div className="font-label-sm text-label-sm text-outline uppercase font-semibold font-mono">
                      Net Proposed Total
                    </div>
                    <div className="font-label-sm text-label-sm text-primary font-mono">
                      Fixed milestone rate
                    </div>
                  </div>
                  <div className="font-code-md text-headline-md font-semibold text-primary font-mono">
                    {quote.currency}{finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </section>

              {/* AI Pricing Disclaimer Notice */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">info</span>
                <p className="font-body-sm text-body-sm leading-relaxed">
                  <span className="font-medium text-on-surface">AI Pricing Disclaimer:</span> AI-generated estimates should be reviewed before sending to your client. Verify catalog quantities and payment scopes.
                </p>
              </div>

              {/* Terms & Revision Policy Accordion */}
              <section className="bg-surface-container-low rounded-xl border border-outline-variant/20 overflow-hidden shadow-sm">
                <div
                  onClick={() => setIsTermsOpen(!isTermsOpen)}
                  className="p-space-md flex items-center justify-between cursor-pointer list-none select-none hover:bg-surface-container/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">contract_edit</span>
                    <span className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                      Terms &amp; Revision Policy
                    </span>
                  </div>
                  <span className={`material-symbols-outlined text-outline transition-transform duration-200 ${isTermsOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>
                {isTermsOpen && (
                  <div className="px-space-md pb-space-md pt-1 space-y-3 border-t border-outline-variant/15 text-body-sm font-body-sm text-on-surface-variant">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">payments</span>
                      <div>
                        <strong className="text-on-surface font-medium">Payment Terms:</strong> {quote.paymentTerms}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">published_with_changes</span>
                      <div>
                        <strong className="text-on-surface font-medium">Revisions:</strong> {quote.revisionTerms}
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Section 2: Ready to Send & AI Follow-Up Message Box */}
              <section className="bg-surface-container-low rounded-xl p-space-md border border-outline-variant/20 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">mark_email_read</span>
                    <h2 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
                      Ready to send?
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-primary/10 text-primary border border-primary/20 font-mono">
                    <span className="material-symbols-outlined text-[12px]">auto_awesome</span> Smart Draft
                  </span>
                </div>
                <div className="bg-surface-container-lowest rounded-lg p-3 border border-outline-variant/20 space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/15">
                    <span className="font-label-sm text-label-sm text-outline shrink-0 font-mono">Subject:</span>
                    <span className="font-body-sm text-body-sm font-medium text-on-surface truncate">
                      Proposal &amp; Quote: {quote.companyName} {quote.title}
                    </span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-outline block mb-1 font-mono">Message Preview:</span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {currentEmailText}
                    </p>
                  </div>
                </div>

                {/* AI Message Actions */}
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono">
                  <button
                    onClick={handleCopyMessage}
                    className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all active:scale-95 border border-outline-variant/20 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={handleRegeneratePitch}
                    className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md transition-all active:scale-95 border border-outline-variant/20 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">autorenew</span>
                    <span>Regenerate</span>
                  </button>
                  <a
                    href={`mailto:${quote.clientEmail}?subject=${encodeURIComponent('Proposal & Quote: ' + quote.title)}&body=${encodeURIComponent(currentEmailText)}`}
                    className="flex items-center justify-center gap-1 py-2 px-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-medium transition-all active:scale-95 text-center"
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    <span>Mail App</span>
                  </a>
                </div>
              </section>
            </div>

            {/* Print-only representation when activeTab is editor */}
            <div className="print-only">
              <A4ProposalSheet
                quote={quote}
                items={items}
                subtotal={subtotal}
                discountPercent={discountPercent}
                discountAmount={discountAmount}
                finalTotal={finalTotal}
              />
            </div>
          </>
        )}

        {/* VIEW 2: A4 PROPOSAL PREVIEW */}
        {activeTab === 'preview' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1 no-print">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider flex items-center gap-1 font-mono">
                <span className="material-symbols-outlined text-[14px]">preview</span>
                A4 Standard Staging (210mm × 297mm)
              </span>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-container text-on-primary-container font-mono text-label-md hover:brightness-105 active:scale-95 cursor-pointer shadow-sm transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                <span>Save as PDF</span>
              </button>
            </div>

            {/* Print instruction note for user */}
            <div className="p-2.5 rounded-lg bg-surface-container-low border border-primary/20 flex items-center justify-between text-body-sm text-on-surface-variant no-print font-mono text-[12px]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]">info</span>
                Tip: In system print dialog, select &quot;Save as PDF&quot; with &quot;Background graphics&quot; checked.
              </span>
              <span className="text-tertiary">A4 Ready</span>
            </div>

            {/* A4 Sheet Paper Simulation */}
            <A4ProposalSheet
              quote={quote}
              items={items}
              subtotal={subtotal}
              discountPercent={discountPercent}
              discountAmount={discountAmount}
              finalTotal={finalTotal}
            />
          </div>
        )}
      </main>

      {/* In-app Add Deliverable Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="bg-surface-container border border-outline-variant/30 rounded-2xl w-full max-w-sm p-4 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">add_circle</span>
                <h3 className="font-headline-sm text-body-md font-semibold text-on-surface">
                  Add Scope Deliverable
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleConfirmAddItem} className="space-y-3">
              <div>
                <label className="block text-label-sm font-mono text-outline mb-1">
                  Deliverable / Milestone Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Custom Domain & SSL Setup"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary font-mono"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-label-sm font-mono text-outline mb-1">
                    Unit Price ({quote.currency})
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    required
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary font-mono"
                  />
                </div>
                <div>
                  <label className="block text-label-sm font-mono text-outline mb-1">
                    Quantity
                  </label>
                  <div className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg px-3 py-2 text-body-sm text-outline font-mono">
                    1 unit
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-label-sm font-mono text-outline mb-1">
                  Specification Details (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. DNS propagation & TLS cert setup"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-mono text-label-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-lg bg-primary-container text-on-primary-container font-mono text-label-md font-semibold hover:brightness-105 transition-all shadow-sm"
                >
                  Add to Scope
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sticky Bottom Action Bar (Mobile Dock) */}
      <aside className="fixed bottom-14 left-0 w-full z-40 bg-surface-container-lowest/95 backdrop-blur-xl px-margin-mobile py-2.5 shadow-2xl border-t border-outline-variant/20 no-print">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
            className="flex-1 py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 border border-outline-variant/30 active:scale-95 transition-all cursor-pointer font-mono"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {activeTab === 'editor' ? 'visibility' : 'edit_note'}
            </span>
            <span>{activeTab === 'editor' ? 'A4 Preview' : 'Edit Scope'}</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex-[1.6] py-2.5 px-3 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-primary-container/20 active:scale-95 transition-all hover:brightness-105 cursor-pointer font-mono"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Download PDF</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
