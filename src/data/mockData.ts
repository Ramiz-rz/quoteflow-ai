import { Quote, ClientProfile, ClarificationQuestion } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1UlrDsXBkUmbSM84OtCsrhIr2LKu-ZuALsoXKSGyS6cogvvyXbjVBfquZMLsJaSSgIXrQvH_BdXAzeFBqdF-VcR2ctv53GyFe08Y8wRhiQeshNfxsP3v6ocjZQKTvUWaAG32aelfb1OsZpiXJdEbLhVX8dMdpVzzX8pkMwCBql-nO9p48IxPoIxnWv7nDAvc_6OjZvfYcF0wh2c8WEHTlDqGEZtSQmgoU-1pc01rf4uF6ceCQU39GB6wss";

export const INITIAL_QUOTES: Quote[] = [
  {
    id: 'qf-809',
    refNumber: 'QF-2024-0891',
    title: 'Shopify Store Launch & Payment Integration',
    clientName: 'Elena Rostova',
    companyName: 'Ceramic Craft Co.',
    clientEmail: 'elena@ceramiccraft.co',
    status: 'Draft',
    timeline: '3 Weeks',
    deliveryDate: 'Oct 28',
    currency: '$',
    businessProfile: 'Agency',
    initialMessage: 'Hey! We need a clean e-commerce store built on Shopify for our handmade ceramics brand. We have about 12 products, need Stripe/Apple Pay checkout, Instagram shop sync, and basic shipping rates configured. We want to launch in 3 weeks max. Our budget is around $2k-$2.5k.',
    clientNotes: 'Pre-call briefing: Met with Elena (Founder). Primary goal is direct-to-consumer launch before seasonal craft fair. Client already owns domain and has Shopify basic plan setup.',
    dateCreated: 'Today',
    updatedAgo: 'Just now',
    discountPercent: 10,
    taxPercent: 0,
    paymentTerms: '50% upfront deposit required to initiate discovery and storefront staging; remaining 50% upon project completion and DNS transfer.',
    revisionTerms: '2 rounds of design and layout revisions included. Additional scope adjustments billed at standard $85/hour.',
    items: [
      {
        id: 1,
        name: 'Theme Setup & Responsive Storefront',
        description: 'Clean Shopify 2.0 architecture',
        price: 750,
        qty: 1
      },
      {
        id: 2,
        name: '12 Product Catalog Upload & SEO',
        description: 'Meta tags & alt image tags',
        price: 400,
        qty: 1
      },
      {
        id: 3,
        name: 'Stripe, Apple Pay & Shipping Setup',
        description: 'Custom zones & tax rules',
        price: 450,
        qty: 1
      },
      {
        id: 4,
        name: 'Instagram / Meta Commerce Sync',
        description: 'Shoppable feed configuration',
        price: 250,
        qty: 1
      },
      {
        id: 5,
        name: 'Client Handoff & Training Video',
        description: 'Loom walkthrough & documentation',
        price: 150,
        qty: 1
      }
    ],
    clarifications: [
      {
        id: 'q1',
        question: 'Will client provide professional photography for the 12 ceramics products?',
        options: [
          { text: '✓ Yes, client provides', priceDelta: 0, selected: true },
          { text: 'No, add shoot ($600)', priceDelta: 600, selected: false },
          { text: 'Stock/AI placeholders', priceDelta: 150, selected: false }
        ]
      },
      {
        id: 'q2',
        question: 'Is custom theme development required, or a pre-built premium theme customization?',
        options: [
          { text: 'Custom Liquid Code ($$$)', priceDelta: 800, selected: false },
          { text: '✓ Premium Theme Setup ($$)', priceDelta: 0, selected: true }
        ]
      }
    ]
  },
  {
    id: 'qf-808',
    refNumber: 'QF-2024-0808',
    title: 'Shopify Store & Payment Flow',
    clientName: 'Sarah Jenkins',
    companyName: 'Jenkins Lifestyle Studio',
    clientEmail: 'sarah@jenkinsstudio.com',
    status: 'Accepted',
    timeline: '2 Weeks',
    deliveryDate: 'Oct 20',
    currency: '$',
    businessProfile: 'Freelance',
    initialMessage: 'I need a Shopify store with 10 products, payment integration and delivery setup within 2 weeks.',
    clientNotes: 'Discovery call notes: Sarah wants clean minimalist layout with Apple Pay quick checkout. Client will provide high-res JPEG photos and copy doc.',
    dateCreated: 'Today',
    updatedAgo: 'Today',
    discountPercent: 0,
    taxPercent: 0,
    paymentTerms: '50% deposit upon kickoff, 50% on deployment.',
    revisionTerms: '2 revision cycles included.',
    items: [
      { id: 101, name: 'Website setup & theme architecture', description: 'Store setup & liquid layout', price: 450, qty: 1 },
      { id: 102, name: '10 product listings & variant config', description: 'Copy, tags and variants', price: 350, qty: 1 },
      { id: 103, name: 'Payment integration (Stripe & Apple Pay)', description: 'Card processing & taxes', price: 400, qty: 1 },
      { id: 104, name: 'Delivery configuration & shipping rules', description: 'Tiered postal rates', price: 300, qty: 1 },
      { id: 105, name: 'Basic QA and Launch Assistance', description: 'Domain routing and live test', price: 350, qty: 1 }
    ]
  },
  {
    id: 'qf-807',
    refNumber: 'QF-2024-0807',
    title: 'Mobile App MVP Wireframing',
    clientName: 'Nexus Labs',
    companyName: 'Nexus AI Inc.',
    clientEmail: 'marcus@nexuslabs.ai',
    status: 'Sent',
    timeline: '4 Weeks',
    deliveryDate: 'Nov 05',
    currency: '$',
    businessProfile: 'Agency',
    initialMessage: 'Looking for a Figma design system and 18 interactive wireframe screens for our upcoming mobile AI assistant.',
    dateCreated: '2d ago',
    updatedAgo: '2d ago',
    discountPercent: 5,
    taxPercent: 0,
    paymentTerms: '30% upfront, 40% upon wireframe signoff, 30% final Figma asset export.',
    revisionTerms: 'Unlimited asynchronous comments during sprint weeks.',
    items: [
      { id: 201, name: 'Figma Design System Architecture', description: 'Color tokens, typography & auto-layout primitives', price: 1200, qty: 1 },
      { id: 202, name: '18 Core Mobile Screen Wireframes', description: 'High-fidelity wireframes in iOS Human Interface Guidelines', price: 1800, qty: 1 },
      { id: 203, name: 'Clickable Prototype & User Flow Spec', description: 'Interactive clickable user flows and handoff guide', price: 600, qty: 1 }
    ]
  },
  {
    id: 'qf-806',
    refNumber: 'QF-2024-0806',
    title: 'Brand Identity & Guidelines',
    clientName: 'Horizon Studio',
    companyName: 'Horizon Arch Partners',
    clientEmail: 'hello@horizonstudio.design',
    status: 'Draft',
    timeline: '2 Weeks',
    deliveryDate: 'Oct 25',
    currency: '$',
    businessProfile: 'Freelance',
    initialMessage: 'Need a refresh of our studio wordmark, font pairing guidelines, and pitch deck templates.',
    dateCreated: '3d ago',
    updatedAgo: '3d ago',
    discountPercent: 0,
    taxPercent: 0,
    paymentTerms: '100% upfront for expedited 2-week turnaround.',
    revisionTerms: '3 concept explorations, 2 refinement rounds on chosen direction.',
    items: [
      { id: 301, name: 'Logo Mark & Typographic Suite', description: 'Primary, secondary and icon marks with vector formats', price: 550, qty: 1 },
      { id: 302, name: 'Brand Guidelines Manual (PDF)', description: 'Color formulas, spacing systems, and usage boundaries', price: 250, qty: 1 },
      { id: 303, name: 'Keynote & Google Slides Deck Kit', description: '12 branded master slide layouts', price: 150, qty: 1 }
    ]
  },
  {
    id: 'qf-805',
    refNumber: 'QF-2024-0805',
    title: 'Full-Stack Web App',
    clientName: 'Vertex Digital',
    companyName: 'Vertex SaaS',
    clientEmail: 'cto@vertexdigital.io',
    status: 'Needs Clarification',
    timeline: '6 Weeks',
    deliveryDate: 'Nov 20',
    currency: '$',
    businessProfile: 'Agency',
    initialMessage: 'We need a customer portal in React with Node backend, Stripe billing, and user authentication.',
    dateCreated: '5d ago',
    updatedAgo: '5d ago',
    needsClarificationText: 'Vertex Digital request missing delivery timeline and database migration scope.',
    discountPercent: 0,
    taxPercent: 0,
    paymentTerms: '4 milestone-based payments tied to verified staging deployments.',
    revisionTerms: 'Standard sprint retrospectives and change-order pricing.',
    items: [
      { id: 401, name: 'React Frontend Dashboard & UI Shell', description: 'Responsive authenticated portal with tailwind', price: 2200, qty: 1 },
      { id: 402, name: 'Node.js REST API & PostgreSQL Schema', description: 'Secure auth, session management and database models', price: 2000, qty: 1 },
      { id: 403, name: 'Stripe Subscriptions & Webhook Listener', description: 'Pro/Enterprise tiers and customer portal webhook handlers', price: 1000, qty: 1 }
    ]
  }
];

export const CLIENT_PROFILES: ClientProfile[] = [
  {
    id: 'c1',
    name: 'Elena Rostova',
    company: 'Ceramic Craft Co.',
    email: 'elena@ceramiccraft.co',
    avatar: 'ER',
    totalSpent: 1800,
    activeQuotesCount: 1,
    status: 'Lead'
  },
  {
    id: 'c2',
    name: 'Sarah Jenkins',
    company: 'Jenkins Lifestyle Studio',
    email: 'sarah@jenkinsstudio.com',
    avatar: 'SJ',
    totalSpent: 1850,
    activeQuotesCount: 1,
    status: 'Active'
  },
  {
    id: 'c3',
    name: 'Nexus Labs',
    company: 'Nexus AI Inc.',
    email: 'marcus@nexuslabs.ai',
    avatar: 'NL',
    totalSpent: 3400,
    activeQuotesCount: 1,
    status: 'Active'
  },
  {
    id: 'c4',
    name: 'Horizon Studio',
    company: 'Horizon Arch Partners',
    email: 'hello@horizonstudio.design',
    avatar: 'HS',
    totalSpent: 950,
    activeQuotesCount: 1,
    status: 'Lead'
  },
  {
    id: 'c5',
    name: 'Vertex Digital',
    company: 'Vertex SaaS',
    email: 'cto@vertexdigital.io',
    avatar: 'VD',
    totalSpent: 5200,
    activeQuotesCount: 1,
    status: 'Active'
  }
];

export const PROMPT_PRESETS = [
  {
    label: 'Shopify E-Commerce Store',
    text: 'Hey! We need a clean e-commerce store built on Shopify for our handmade ceramics brand. We have about 12 products, need Stripe/Apple Pay checkout, Instagram shop sync, and basic shipping rates configured. We want to launch in 3 weeks max. Our budget is around $2k-$2.5k.'
  },
  {
    label: 'Mobile App Wireframing',
    text: 'Hi there! We are launching a fitness tracking iOS app. We need 15 core UX/UI wireframe screens designed in Figma with a reusable component design system and clickable prototype for seed investors. Need this delivered in 3 weeks.'
  },
  {
    label: 'Brand Identity & Guidelines',
    text: 'Hello team, we are rebranding our boutique coffee roasting business. We need a primary logo mark, secondary badge, brand color formulas, typography rules, packaging label templates for 3 coffee bag sizes, and a social media kit within 2 weeks.'
  },
  {
    label: 'Marketing Website & SEO',
    text: 'We need a high-converting 5-page marketing website for our B2B consulting firm with case studies, Calendly booking integration, speed optimization, and on-page SEO. Looking to wrap this up in 2-3 weeks.'
  }
];
