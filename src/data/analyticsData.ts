import { Quote, MonthlyPerformanceRecord } from '../types';

export const HISTORICAL_MONTHLY_DATA: MonthlyPerformanceRecord[] = [
  {
    month: 'May 2024',
    shortMonth: 'May',
    quoteValue: 18400,
    quotesCount: 11,
    acceptedCount: 8,
    winRate: 73,
    avgDealSize: 2300,
  },
  {
    month: 'Jun 2024',
    shortMonth: 'Jun',
    quoteValue: 24600,
    quotesCount: 14,
    acceptedCount: 11,
    winRate: 79,
    avgDealSize: 2236,
  },
  {
    month: 'Jul 2024',
    shortMonth: 'Jul',
    quoteValue: 22100,
    quotesCount: 13,
    acceptedCount: 10,
    winRate: 77,
    avgDealSize: 2210,
  },
  {
    month: 'Aug 2024',
    shortMonth: 'Aug',
    quoteValue: 29500,
    quotesCount: 17,
    acceptedCount: 14,
    winRate: 82,
    avgDealSize: 2107,
  },
  {
    month: 'Sep 2024',
    shortMonth: 'Sep',
    quoteValue: 34200,
    quotesCount: 20,
    acceptedCount: 17,
    winRate: 85,
    avgDealSize: 2011,
  },
  {
    month: 'Oct 2024',
    shortMonth: 'Oct',
    quoteValue: 39800,
    quotesCount: 24,
    acceptedCount: 21,
    winRate: 88,
    avgDealSize: 1895,
  },
];

/**
 * Computes monthly performance metrics dynamically by combining historical baseline
 * with the active quotes created and updated in the application.
 */
export function getMonthlyPerformance(quotes: Quote[]): MonthlyPerformanceRecord[] {
  // Calculate active quotes total value
  const activeQuotesTotal = quotes.reduce((acc, q) => {
    const subtotal = (q.items || []).reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);
    const discount = subtotal * ((q.discountPercent || 0) / 100);
    return acc + (subtotal - discount);
  }, 0);

  const acceptedQuotesCount = quotes.filter((q) => q.status === 'Accepted').length;
  const totalLiveQuotes = quotes.length;

  return HISTORICAL_MONTHLY_DATA.map((item, index) => {
    // Dynamically augment the latest month with live active quote data
    if (index === HISTORICAL_MONTHLY_DATA.length - 1) {
      const dynamicValue = 32000 + Math.round(activeQuotesTotal);
      const dynamicTotal = 19 + totalLiveQuotes;
      const dynamicAccepted = 16 + acceptedQuotesCount;
      const dynamicWinRate = Math.min(96, Math.round((dynamicAccepted / Math.max(1, dynamicTotal)) * 100));

      return {
        ...item,
        quoteValue: dynamicValue,
        quotesCount: dynamicTotal,
        acceptedCount: dynamicAccepted,
        winRate: dynamicWinRate,
        avgDealSize: Math.round(dynamicValue / Math.max(1, dynamicAccepted)),
      };
    }
    return item;
  });
}
