export type ScreenType = 'landing' | 'dashboard' | 'create' | 'quotes' | 'clients' | 'settings';

export interface DeliverableItem {
  id: number;
  name: string;
  description: string;
  price: number;
  qty: number;
}

export interface ClarificationOption {
  text: string;
  priceDelta?: number;
  selected?: boolean;
}

export interface ClarificationQuestion {
  id: string;
  question: string;
  options: ClarificationOption[];
}

export interface Quote {
  id: string;
  refNumber: string;
  title: string;
  clientName: string;
  companyName: string;
  clientEmail: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Needs Clarification' | 'Expired';
  timeline: string;
  deliveryDate: string;
  currency: '$' | '€' | '£';
  businessProfile: 'Agency' | 'Freelance';
  items: DeliverableItem[];
  discountPercent: number;
  taxPercent: number;
  paymentTerms: string;
  revisionTerms: string;
  initialMessage: string;
  dateCreated: string;
  updatedAgo: string;
  needsClarificationText?: string;
  clarifications?: ClarificationQuestion[];
  clientNotes?: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  company: string;
  email: string;
  avatar: string;
  totalSpent: number;
  activeQuotesCount: number;
  status: 'Active' | 'Lead' | 'Completed';
}

export interface MonthlyPerformanceRecord {
  month: string;
  shortMonth: string;
  quoteValue: number;
  quotesCount: number;
  acceptedCount: number;
  winRate: number;
  avgDealSize: number;
}
