import { Quote, DeliverableItem } from '../types';

interface A4ProposalSheetProps {
  quote: Quote;
  items: DeliverableItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  finalTotal: number;
}

export function A4ProposalSheet({
  quote,
  items,
  subtotal,
  discountPercent,
  discountAmount,
  finalTotal,
}: A4ProposalSheetProps) {
  return (
    <article className="printable-proposal-sheet bg-[#ffffff] text-[#11131a] rounded-lg shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden border border-gray-200 min-h-[640px]">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-gray-200 pb-5">
        <div>
          <div className="text-[20px] font-bold tracking-tight text-gray-900 font-headline-sm">
            STATEMENT OF WORK &amp; QUOTE
          </div>
          <div className="text-[12px] font-medium text-gray-500 font-mono mt-0.5">
            REF: {quote.refNumber} • ISSUE DATE: OCT 7, 2024
          </div>
        </div>
        <div className="text-right">
          <div className="text-[14px] font-bold text-indigo-600 font-headline-sm">
            QuoteFlow AI
          </div>
          <div className="text-[11px] text-gray-500 font-mono">
            Verified Agency Partner
          </div>
        </div>
      </div>

      {/* Client & Agency Metadata */}
      <div className="grid grid-cols-2 gap-4 text-[12px] font-body-sm text-gray-700">
        <div>
          <div className="text-[10px] uppercase font-semibold text-gray-400 font-mono">
            Prepared For
          </div>
          <div className="font-bold text-gray-900 mt-0.5">{quote.clientName}</div>
          <div>{quote.companyName}</div>
          <div className="text-gray-500">{quote.clientEmail}</div>
        </div>
        <div>
          <div className="text-[10px] uppercase font-semibold text-gray-400 font-mono">
            Project Specifications
          </div>
          <div className="font-medium text-gray-900 mt-0.5">{quote.title}</div>
          <div>Duration: {quote.timeline}</div>
          <div className="text-gray-500">Target Delivery: {quote.deliveryDate}, 2024</div>
        </div>
      </div>

      {/* A4 Table Layout */}
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-mono uppercase">
            <tr>
              <th className="py-2.5 px-3 font-semibold">Scope Deliverable</th>
              <th className="py-2.5 px-2 text-center font-semibold">Qty</th>
              <th className="py-2.5 px-3 text-right font-semibold">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {items.map((it) => (
              <tr key={it.id}>
                <td className="py-2.5 px-3">
                  <div className="font-medium text-gray-900">{it.name}</div>
                  <div className="text-[10px] text-gray-500">{it.description}</div>
                </td>
                <td className="py-2.5 px-2 text-center font-mono">{it.qty}</td>
                <td className="py-2.5 px-3 text-right font-mono font-medium">
                  {quote.currency}
                  {(it.price * it.qty).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* A4 Document Totals */}
      <div className="flex justify-end pt-2">
        <div className="w-64 space-y-1.5 text-[12px]">
          <div className="flex justify-between text-gray-600">
            <span>Gross Total:</span>
            <span className="font-mono text-gray-900">
              {quote.currency}
              {subtotal.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between text-indigo-600">
            <span>Early Sign Discount ({discountPercent}%):</span>
            <span className="font-mono">
              -{quote.currency}
              {discountAmount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between font-bold text-[14px] text-gray-900 border-t border-gray-200 pt-1.5">
            <span>Final Investment:</span>
            <span className="font-mono text-indigo-700">
              {quote.currency}
              {finalTotal.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Terms & Payment summary for print */}
      <div className="p-3 bg-gray-50 rounded border border-gray-200 text-[10px] text-gray-600 space-y-1">
        <div>
          <span className="font-semibold text-gray-800">Payment Schedule:</span> {quote.paymentTerms}
        </div>
        <div>
          <span className="font-semibold text-gray-800">Revisions &amp; Scope:</span> {quote.revisionTerms}
        </div>
        {quote.clientNotes && (
          <div className="pt-1 border-t border-gray-200 mt-1">
            <span className="font-semibold text-gray-800">Client Brief &amp; Pre-Call Notes:</span>{' '}
            <span className="text-gray-700 italic">{quote.clientNotes}</span>
          </div>
        )}
      </div>

      {/* A4 Signature Block */}
      <div className="pt-8 border-t border-gray-200 grid grid-cols-2 gap-6 text-[11px] text-gray-500">
        <div>
          <div className="h-10 border-b border-gray-300 mb-1 flex items-end pb-1 font-serif italic text-gray-400">
            Sign above
          </div>
          <div className="font-semibold text-gray-800">{quote.clientName} (Client Authorization)</div>
          <div className="text-[10px]">{quote.companyName}</div>
        </div>
        <div>
          <div className="h-10 border-b border-gray-300 mb-1 flex items-end pb-1 text-indigo-600 font-serif italic text-[14px]">
            Alex Vance
          </div>
          <div className="font-semibold text-gray-800">Authorized Lead Architect</div>
          <div className="text-[10px]">QuoteFlow AI Partner Studio</div>
        </div>
      </div>
    </article>
  );
}
