import { Quote } from '../types';

/**
 * Triggers browser native print dialog configured for clean A4 PDF export
 * using CSS @media print and @page rules.
 */
export function printQuoteToPdf(
  quote: Quote,
  onInitiated?: () => void,
  onFinished?: (status: 'printed' | 'blocked') => void
) {
  const originalTitle = document.title;
  
  // Sanitize filename for standard PDF saving
  const safeCompany = (quote?.companyName || 'Quote')
    .trim()
    .replace(/[^a-zA-Z0-9_\-]/g, '_');
  const safeRef = (quote?.refNumber || 'Draft')
    .trim()
    .replace(/[^a-zA-Z0-9_\-]/g, '_');
  
  // Set browser title which becomes the default PDF file name in Chrome / Safari / Edge / Firefox
  document.title = `${safeCompany}_Proposal_${safeRef}`;

  if (onInitiated) {
    onInitiated();
  }

  // Small delay to allow any pending DOM reflow and title sync
  setTimeout(() => {
    let finished = false;
    const cleanup = (status: 'printed' | 'blocked' = 'printed') => {
      if (finished) return;
      finished = true;
      document.title = originalTitle;
      window.removeEventListener('afterprint', onAfterPrint);
      if (onFinished) {
        onFinished(status);
      }
    };

    const onAfterPrint = () => cleanup('printed');
    window.addEventListener('afterprint', onAfterPrint, { once: true });

    try {
      window.print();
    } catch (err) {
      console.warn('Print trigger blocked or not allowed in sandbox iframe:', err);
      cleanup('blocked');
      return;
    }

    // Fallback timer if afterprint event does not fire in some iframe environments
    setTimeout(() => cleanup('printed'), 2500);
  }, 100);
}
