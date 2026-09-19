/**
 * English dictionary: the source of truth for the site's copy.
 *
 * `si.ts` and `ta.ts` are typed against `Dictionary`, so a key added here
 * fails the build until it is translated. Copy rules live in the repo README:
 * no invented customers, no invented statistics, and no claim that the
 * platform runs leaf collection, weighing, rates, month close or payouts.
 */
export const en = {
  meta: {
    siteName: 'Tea Factory Digital',
    title: "Tea Factory Digital: your suppliers' phone, your office's inbox.",
    description:
      'A branded mobile app that puts the monthly Green Leaf Account in every supplier’s hand, and one console where the office answers everything the app can ask. Works alongside the factory system you already run.',
  },

  common: {
    requestDemo: 'Request a Demo',
    /** The navbar has the least room of anywhere on the site. */
    requestDemoShort: 'Request a Demo',
    signIn: 'Sign In',
    explorePlatform: 'Explore the Platform',
    learnMore: 'Learn more',
    sampleData: 'Sample data',
    sampleDataNote: 'Interface shown with sample data for illustration.',
    language: 'Language',
    menu: 'Menu',
    close: 'Close',
    backToHome: 'Back to home',
    supplierApp: 'Supplier App',
    officeConsole: 'Office Console',
  },

  nav: {
    product: 'Product',
    features: 'Features',
    forSuppliers: 'For Suppliers',
    forFactories: 'For Factories',
    whiteLabel: 'White-Label',
    security: 'Security',
  },

  hero: {
    eyebrow: 'Built for modern tea factories',
    title: "Put Every Green Leaf Account in Your Supplier's Hand.",
    subtitle:
      'Connect your suppliers and office with one branded digital experience, without replacing the factory system you already use.',
    ctaPrimary: 'Request a Demo',
    ctaSecondary: 'See How It Works',
    trust: 'Supplier App + Office Console',
    alongside: 'Works alongside the factory system you already run',
    floating: {
      accountReady: 'Monthly Account Ready',
      accountReadyMeta: 'July 2026 · 1,245 kg',
      requestApproved: 'Request Approved',
      requestApprovedMeta: 'Advance · Rs. 25,000.00',
      inquiry: 'Supplier Inquiry',
      inquiryMeta: 'Replied by the office',
    },
  },

  activity: {
    label: 'See how the platform connects everyday work',
    heading: 'One connected experience. From supplier to office.',
    note: 'An illustration of the workflow, not live production activity.',
    items: {
      accountReady: 'Green Leaf Account Ready',
      advanceRequest: 'Advance Request Received',
      inquiry: 'Inquiry Submitted',
      bankChange: 'Bank Detail Change Requested',
      newsPublished: 'News Published',
      approved: 'Request Approved',
    },
  },

  problem: {
    eyebrow: 'The everyday friction',
    heading: 'Too many questions still start with a phone call.',
    cards: {
      one: 'How many kilos did I supply?',
      two: "What's my current balance?",
      three: 'Was my request approved?',
    },
    support:
      "Tea suppliers shouldn't need to visit or call the office every time they need an answer.",
    resolution:
      'Tea Factory Digital puts those answers directly in the supplier’s phone, while giving the office one place to respond.',
  },

  split: {
    eyebrow: 'The platform',
    heading: 'One platform. Two connected experiences.',
    caption: 'Every supplier action becomes a manageable workflow for the office.',
    app: {
      label: 'Supplier App',
      tagline: 'What the supplier carries',
      items: {
        account: 'Green Leaf Account',
        income: 'Income History',
        savings: 'Savings',
        credit: 'Credit Facilities',
        requests: 'Requests',
        news: 'News',
        notifications: 'Notifications',
      },
    },
    console: {
      label: 'Office Console',
      tagline: 'What the office answers with',
      items: {
        dashboard: 'Dashboard',
        supplierRequests: 'Supplier Requests',
        creditQueue: 'Credit Queue',
        teaPacketQueue: 'Tea Packet Queue',
        inquiries: 'Inquiries',
        cms: 'Content Management',
        configuration: 'Configuration',
        users: 'Users & Roles',
        audit: 'Audit Log',
      },
    },
  },

  greenLeaf: {
    eyebrow: 'The account they already understand',
    heading: 'The Green Leaf Account, reimagined.',
    subtitle:
      'Give suppliers a clear view of the monthly account they already understand, now available anytime from their phone.',
    callouts: {
      currentMonth: 'Current Month',
      dailySupply: 'Daily Supply',
      deductions: 'Deduction Breakdown',
      savings: 'Savings',
      paymentMethod: 'Payment Method',
    },
    dailySupplyTitle: 'Daily Supply',
    dailySupplyNote: 'Every day of the month, with the kilos recorded against it.',
    incomeTitle: 'Income History',
    incomeNote: 'Twelve months of totals, with any month one tap away.',
  },

  /**
   * The supplier app's own strings, taken from the mobile string table
   * (`config/clients/default/strings.ts`). The mockups render the product, so
   * they must say what the product says: "Transport charges", not "Transport".
   *
   * Factory, supplier and bill identifiers are *data*, not copy: the app shows
   * one configured value whatever language it is in, so they do not change
   * between locales.
   */
  bill: {
    factoryName: 'Galaboda Tea Factory',
    factoryLocation: 'Akuressa, Sri Lanka',
    factoryPhone: '041-2283282',
    factoryRegNo: 'M.F. 1041',
    supplierCode: '5708 (MAKADURA)',
    supplierName: 'K. Wijesinghe',
    billNo: 'GL-26-07-5708',
    phoneLabel: 'Phone',
    monthOverline: 'JULY 2026',
    monthLabel: 'July 2026',
    billNoLabel: 'Bill No.',
    dateLabel: 'Date',
    billDate: '31 July 2026',
    savePdf: 'Save as PDF',
    finalBalance: 'Final balance',
    totalKg: 'Total kg',
    rateSection: 'Rate',
    totalKilograms: 'Total kilograms',
    ratePerKg: 'Rate per kg',
    extraRatePerKg: 'Extra rate per kg',
    totalRatePerKg: 'Total rate per kg',
    deductionsSection: 'Deductions',
    totalDeductions: 'Total deductions',
    deductions: {
      transport: 'Transport charges',
      tea: 'Tea',
      savings: 'Savings',
      loansAdvance: 'Loans / advance',
      advance: 'Advance',
      manure: 'Manure',
      otherCards: 'Other cards',
      stamps: 'Stamps',
      previousDebts: 'Previous debts',
    },
    balanceSection: 'Balance',
    balanceAmount: 'Balance amount',
    coinsCarried: 'Coins carried forward',
    paymentMethod: 'Payment method',
    paymentMethodValue: 'Bank transfer',
    dailySection: 'Daily supply',
    dailyChartTitle: 'Kilograms supplied per day',
    savingsSection: 'Savings',
    savingsToDate: 'To date',
    kg: 'kg',
    perKg: '/kg',
    currency: 'Rs.',
  },


  features: {
    eyebrow: 'Features',
    heading: 'Everything suppliers need. Everything the office needs to respond.',
    subtitle:
      'Four groups of capability. The first two live on the supplier’s phone; the last two are how the office keeps up with them.',
    money: {
      title: 'Supplier Money',
      description: 'The monthly account, and the history behind it.',
      items: {
        account: { title: 'Green Leaf Account', desc: 'The month’s rate, kilos, gross, deductions and balance in the order the printed slip states them.' },
        calendar: { title: 'Daily Supply Calendar', desc: 'Day 1 to 31 with the kilos recorded against each, plus a bar chart of the month.' },
        income: { title: 'Income History', desc: 'Past months as a graph, a list or a chart, with any month’s full account one tap away.' },
        deductions: { title: 'Deduction Breakdown', desc: 'Where the money went: transport, tea, savings, loan, advance, manure and the rest, itemised.' },
        savings: { title: 'Savings Ledger', desc: 'This month, the previous balance and the running total, with a trend over time.' },
        payment: { title: 'Payment Method', desc: 'Cheque, bank transfer or cash, with the current bank details visible at any time.' },
      },
    },
    credit: {
      title: 'Credit & Store Requests',
      description: 'Each facility switched on or off per factory.',
      items: {
        advance: { title: 'Advance', desc: 'Cash against leaf already supplied this month, within the ceiling the factory sets.' },
        loans: { title: 'Loans', desc: 'Lent against income history, with the repayment spread over the number of accounts the supplier chooses.' },
        manure: { title: 'Manure', desc: 'A fertiliser request with a recovery period, priced by the factory after the request.' },
        teaPackets: { title: 'Tea Packets', desc: 'Packets of made tea from the factory store, collected at the factory or sent on the transport vehicle.' },
        limits: { title: 'Configurable Credit Limits', desc: 'Basis, multiplier, months to average, history required and cap, set per facility, per factory, without a release.' },
        history: { title: 'Facility History', desc: 'Every request the supplier has made, with the amount asked for, the term and the decision.' },
      },
    },
    requests: {
      title: 'Requests & Support',
      description: 'The open loops between a supplier and the office.',
      items: {
        bank: { title: 'Bank Detail Changes', desc: 'Submitted for approval. The app keeps showing the current details until the office signs off.' },
        payment: { title: 'Payment Method Changes', desc: 'Cheque, transfer or cash, changed the same way: as a request, never applied silently.' },
        inquiries: { title: 'Supplier Inquiries', desc: 'A subject and a message that reaches the office, with the reply visible in the app.' },
        attachments: { title: 'Attachments', desc: 'A photo or document alongside an inquiry, so the office sees what the supplier sees.' },
        status: { title: 'Request Status', desc: 'Pending, approved or rejected, on the supplier’s screen without anyone being called.' },
        queues: { title: 'Approval Queues', desc: 'Every pending item in the app appears as a queue in the office, with the age of the oldest one.' },
      },
    },
    communication: {
      title: 'Communication',
      description: 'What the factory says, and how it reaches the phone.',
      items: {
        news: { title: 'News', desc: 'Articles with a cover image and an excerpt, published by the office and read in the app.' },
        banners: { title: 'Promotional Banners', desc: 'A full-width announcement with a live window and one button, shown on the way into the app.' },
        push: { title: 'Push Notifications', desc: 'Account ready, request decided, inquiry replied and news. Each category is opted into by the supplier.' },
        history: { title: 'Notification History', desc: 'The factory’s record of what it sent, readable even when push is switched off entirely.' },
        faq: { title: 'FAQ', desc: 'Questions the office answers once, in the app, instead of answering at the counter.' },
        content: { title: 'Static Content', desc: 'Terms, support pages and help text, edited by the office in each language.' },
      },
    },
  },

  creditFlow: {
    eyebrow: 'How a request travels',
    heading: 'From request to decision, without the paperwork.',
    subtitle:
      'A supplier asks on their phone. The office sees a queue, not a queue of people.',
    steps: {
      one: { title: 'Supplier submits request', desc: 'Amount, purpose and repayment term, inside the ceiling the factory configured.' },
      two: { title: 'Office receives request', desc: 'It lands in the credit queue with the supplier, the amount and how long it has waited.' },
      three: { title: 'Manager reviews', desc: 'Approve, adjust or decline. Above a threshold only a manager may decide.' },
      four: { title: 'Supplier receives notification', desc: 'The decision reaches the phone, and the request history records it.' },
    },
    example: {
      title: 'Advance Request',
      amountLabel: 'Amount',
      amountValue: 'Rs. 25,000.00',
      statusLabel: 'Status',
      statusValue: 'Pending Review',
      termLabel: 'Repayment',
      termValue: '3 monthly accounts',
    },
    queue: {
      title: 'New Advance Request',
      supplierLabel: 'Supplier',
      supplierValue: 'S. Perera',
      amountLabel: 'Amount',
      amountValue: 'Rs. 25,000.00',
      waitingLabel: 'Waiting',
      waitingValue: '2h 14m',
      action: 'Review Request',
    },
  },

  language: {
    eyebrow: 'Trilingual by default',
    heading: 'Built for the way Sri Lankan suppliers communicate.',
    message: 'Sinhala, English and Tamil, with Sinhala as the default experience.',
    highlight: 'Every label matters.',
    highlightNote:
      'Deduction names, month names and request statuses are translated too, not just the menu. A supplier reading their account should never meet an English word they have to guess at.',
    samples: {
      account: 'Green Leaf Account',
      balance: 'Balance',
      savings: 'Savings',
      loan: 'Loan',
      status: 'Request Status',
    },
  },

  whiteLabel: {
    eyebrow: 'White-label platform',
    heading: 'Your factory. Your brand.',
    subtitle: 'One platform can power multiple branded supplier apps.',
    summary: {
      same: 'Same platform.',
      different: 'Different brand.',
      config: 'Different configuration.',
    },
    /** Real clients from the mobile repo's config, not invented brands. */
    factories: {
      a: 'Galaboda Tea Factory',
      b: 'Hill Country Tea',
      c: 'Highland Estate',
    },
    configurable: {
      logo: 'Logo',
      colors: 'Colors',
      content: 'Content',
      banks: 'Bank list',
      savings: 'Savings options',
      flags: 'Feature flags',
      factory: 'Factory configuration',
    },
    cta: 'Explore White-Label',
  },

  integration: {
    eyebrow: 'Integration',
    heading: 'Works alongside the system you already run.',
    subtitle:
      'Tea Factory Digital handles the supplier experience and office workflows while your existing factory system continues running its internal processes.',
    nodes: {
      supplier: 'Supplier Mobile App',
      platform: 'Tea Factory Digital Platform',
      console: 'Office Console',
      existing: 'Existing Factory System',
      existingNote: 'Leaf collection · Weighing · Rates · Month close · Payouts',
    },
    assurances: {
      one: 'No data migration.',
      two: 'No second weighing system.',
      three: 'No need to replace your existing factory software.',
    },
    boundaryLabel: 'Stays where it is',
    cta: 'See Integration',
  },

  console: {
    eyebrow: 'Office console',
    heading: 'One inbox for every supplier request.',
    subtitle: 'The queues, the content and the configuration in one place, so nothing a supplier asks for sits unanswered because nobody could see it.',
    /**
     * From here down the strings are the console's own
     * (`apps/admin/src/i18n/locales/*.ts`), so the dashboard mockup reads
     * exactly as the shipped screen does. `{age}`, `{count}` and
     * `{value}` are substituted in the component.
     */
    pageTitle: 'Dashboard',
    pageSubtitle: 'The day at a glance',
    queuesTitle: 'Queues',
    oldestWaiting: 'Oldest {age}',
    pastTarget: '{count} past target',
    queue: {
      changeRequests: 'Change requests',
      advanceRequests: 'Advances',
      loanRequests: 'Loans',
      manureRequests: 'Manure',
      teaPacketRequests: 'Tea packets',
      inquiries: 'Inquiries',
    },
    appAdoption: 'App adoption',
    appAdoptionHint: 'How much of the supplier base is actually using it',
    appInstalled: '{withApp} of {total} suppliers signed in',
    appWithout: '{count} have never installed it',
    appDevices: '{count} devices registered for notifications',
    appRequestShare: 'Requests raised in the app this month: {value}',
    contentHealth: 'Content',
    contentHealthHint: 'What the app is showing that nobody has been told about',
    bannersLive: 'banners live right now',
    contentArticlesWithGaps: '{count} published articles fall back to English',
    contentBannersExpired: '{count} published banners have finished their window',
    alerts: 'Needs attention',
    alertOne: '4 change requests have been waiting longer than 3 days.',
    alertTwo: 'The auction result for July 2026 has not been entered yet.',
    adoptionTrend: 'App adoption, last 12 months',
    adoptionTrendHint: 'Share of requests raised in the app rather than at the counter.',
    nav: {
      sectionOverview: 'Overview',
      sectionQueues: 'Queues',
      sectionSupport: 'Supplier support',
      sectionContent: 'Content',
      sectionAdmin: 'Administration',
      dashboard: 'Dashboard',
      suppliers: 'Suppliers',
      changeRequests: 'Change requests',
      credit: 'Credit queues',
      teaPackets: 'Tea packets',
      inquiries: 'Inquiries',
      bills: 'Bills',
      news: 'News',
      banners: 'Promo banners',
      content: 'Static content',
      notifications: 'Notifications',
      reports: 'Reports',
      audit: 'Audit log',
      configuration: 'Configuration',
      users: 'Users & roles',
    },
    user: { name: 'R. Gunawardena', role: 'manager' },
  },


  analytics: {
    eyebrow: 'Adoption reporting',
    heading: 'See how your digital channel is performing.',
    subtitle:
      'Understand whether suppliers are actually using the digital channel, and where the office workload is shifting.',
    kpiOne: 'App Adoption',
    kpiTwo: 'Requests Moved to Digital',
    charts: {
      adoption: 'App adoption over 12 months',
      devices: 'Registered devices',
      activity: 'Supplier activity',
      requests: 'Requests through the app',
      reach: 'Notification reach',
    },
    note: 'Figures shown are sample data for illustration.',
  },

  security: {
    eyebrow: 'Trust',
    heading: 'Secure by design.',
    subtitle: 'Designed with practical security controls for supplier and office workflows.',
    cards: {
      one: { title: 'Supplier ID + Password', desc: 'Sign-in by the supplier code the factory already issues. No email account required. The first password must be changed on first sign-in.' },
      two: { title: 'Biometric Unlock', desc: 'Face or fingerprint unlock once credentials are saved, with credentials held in the device keychain.' },
      three: { title: 'PIN & Auto-Lock', desc: 'An app PIN and a configurable lock on inactivity or when the app moves to the background.' },
      four: { title: 'Role-Based Access', desc: 'Clerk, manager, editor, factory admin and platform admin, with each capability granted per role.' },
      five: { title: 'Audit Logs', desc: 'Who decided what, and when, recorded for every approval, edit and publish in the console.' },
      six: { title: 'Controlled Feature Access', desc: 'A facility a factory does not run is refused by the server, not merely hidden in the interface.' },
    },
    disclaimer:
      'These describe product controls. No certification or compliance accreditation is claimed.',
  },

  connectivity: {
    eyebrow: 'Field conditions',
    heading: 'Designed for real-world connectivity.',
    points: {
      one: 'Works with intermittent mobile connectivity',
      two: 'Offline reads for cached information',
      three: 'Designed for low-end Android devices',
      four: 'Accessible typography and touch targets',
    },
    note: 'Offline reading only. Submitting a request needs a connection.',
    signal: 'Weak signal',
  },

  audience: {
    eyebrow: 'Who it is for',
    heading: 'Four people have to agree before a platform lands.',
    cards: {
      owner: { role: 'Factory Owner / GM', desc: 'Improve supplier communication and retention.' },
      manager: { role: 'Factory Manager / Accountant', desc: 'Manage requests without changing your core ledger.' },
      it: { role: 'IT / Factory System Vendor', desc: 'Clear integration boundaries and controlled platform access.' },
      supplier: { role: 'Suppliers', desc: 'Get account information and support directly from your phone.' },
    },
  },

  wlBanner: {
    headline: {
      one: 'One platform.',
      two: 'Many factories.',
      three: 'Your brand.',
    },
    text: 'Scale the same digital foundation across multiple factories without rebuilding the platform for each one.',
    cta: 'Talk About Your Factory',
  },

  proof: {
    eyebrow: 'Why this shape',
    heading: 'Built for the realities of tea-factory operations.',
    points: {
      one: 'Supplier-first design',
      two: 'Existing-system friendly',
      three: 'Sinhala / English / Tamil',
      four: 'Configurable per factory',
      five: 'Role-based office workflows',
      six: 'Mobile-first supplier experience',
    },
  },

  finalCta: {
    headline: 'Ready to put your suppliers first?',
    text: 'See how Tea Factory Digital can connect your suppliers and office without replacing the system your factory already relies on.',
    primary: 'Request a Demo',
    secondary: 'Explore the Platform',
  },

  footer: {
    description: 'Digital experiences for modern tea factories.',
    product: {
      title: 'Product',
      app: 'Supplier App',
      console: 'Office Console',
      features: 'Features',
      whiteLabel: 'White-Label',
    },
    resources: {
      title: 'Resources',
      integration: 'Integration',
      security: 'Security',
      support: 'Support',
      demo: 'Demo',
    },
    legal: {
      title: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    contact: {
      title: 'Contact',
      email: 'hello@teafactorydigital.lk',
      phone: '+94 11 000 0000',
      country: 'Sri Lanka',
    },
    copyright: '© 2026 Tea Factory Digital',
    tagline: 'Built for modern tea-factory operations.',
  },

  appPage: {
    eyebrow: 'For suppliers',
    title: 'The account in your pocket.',
    subtitle:
      'Everything a supplier walks to the office to ask: the kilos, the balance, the decision on a request, answered on the phone they already carry.',
    sections: {
      account: {
        title: 'The monthly account, as it is printed',
        body: 'The app follows the Green Leaf Account slip a supplier already reads: the rate and extra rate, the kilos, the gross, every deduction line in order, the balance and the coins carried forward. Nothing is renamed and nothing is reordered, because the point is recognition, not redesign.',
      },
      history: {
        title: 'Twelve months, three ways to read them',
        body: 'Income history opens as a graph, a list or a breakdown chart. The graph is the shape of the year, the list is the months in order, and the chart answers the question suppliers actually ask: where did the money go. Any row opens that month’s full account.',
      },
      requests: {
        title: 'Ask without walking',
        body: 'Advances, loans, manure and tea packets are each a short form with the ceiling shown before anything is typed, and the per-account repayment quoted as the amount changes. A request carries its status from the moment it is sent, so nobody calls the office to ask whether it arrived.',
      },
      settings: {
        title: 'Their details, their security',
        body: 'Language, theme, font size, avatar and notification categories are the supplier’s. Bank details and payment method are the factory’s to approve. The app shows the current details with a pending badge until the office decides. Sign-in is by supplier ID, with biometric unlock, a PIN and auto-lock available.',
      },
    },
    highlights: {
      one: 'Sinhala, English and Tamil',
      two: 'Biometric unlock and auto-lock',
      three: 'Offline reads for cached data',
      four: 'Built for low-end Android',
    },
  },

  consolePage: {
    eyebrow: 'For factories',
    title: 'One place to answer the app.',
    subtitle:
      'Every pending item on a supplier’s phone is a queue in the console. The office sees what is waiting, how long it has waited, and who may decide it.',
    sections: {
      queues: {
        title: 'Four queues, one promise',
        body: 'Credit, tea packets, change requests and inquiries. Each queue shows the number pending, the age of the oldest item and how many have passed the response target, because three requests sitting four days is worse than twenty from this morning.',
      },
      content: {
        title: 'What the factory says',
        body: 'News articles, promotional banners and the static pages the app renders, each edited per language. The dashboard names the quiet failures: an article falling back to English, a banner whose window has closed, a page nobody has written yet.',
      },
      configuration: {
        title: 'A new factory is configuration, not a release',
        body: 'Identity, branding, languages, collection points, bank list, savings rates, tea-packet policy, push categories, the feature flags and the credit rules. The ceiling a supplier reads in the app is calculated from the same rule the queue checks against: one calculation, not two that agree until the first policy change.',
      },
      governance: {
        title: 'Who may decide, and what they decided',
        body: 'Five roles on a capability matrix, with approvals above a threshold reserved for a manager. The audit log records every approval, edit and publish. The console authorises nothing on its own: a hidden button is a courtesy, and the server enforces the same matrix per endpoint.',
      },
    },
    highlights: {
      one: 'Queue age and response targets',
      two: 'Per-language content editing',
      three: 'Fourteen configurable feature flags',
      four: 'Role-based access and audit log',
    },
  },

  demo: {
    eyebrow: 'Request a demo',
    title: 'See it with your factory in mind.',
    subtitle:
      'Tell us how your factory works today and we will walk you through the supplier app and the office console, and where the boundary with your existing system sits.',
    form: {
      fullName: 'Full Name',
      company: 'Company / Factory',
      role: 'Role',
      email: 'Email',
      phone: 'Phone',
      suppliers: 'Number of Suppliers',
      factories: 'Number of Factories',
      interest: 'What are you interested in?',
      interestOptions: {
        app: 'Supplier App',
        console: 'Office Console',
        whiteLabel: 'White-Label',
        integration: 'Integration',
        complete: 'Complete Platform',
      },
      message: 'Message',
      messagePlaceholder: 'Anything you would like us to prepare for the walkthrough.',
      optional: 'Optional',
      required: 'Required',
      submit: 'Request a Demo',
      submitting: 'Sending…',
    },
    validation: {
      required: 'This field is required.',
      email: 'Enter a valid email address.',
      interest: 'Choose at least one option.',
    },
    success: {
      title: 'Thank you. Our team will contact you shortly.',
      body: 'We will reply to the email address you gave us. If it is urgent, call the number in the footer.',
      again: 'Send another request',
    },
    aside: {
      title: 'What a walkthrough covers',
      items: {
        one: 'The supplier app on a phone, in the language your suppliers read.',
        two: 'The office console and the four queues your staff would work.',
        three: 'Where the boundary with your existing factory system sits.',
        four: 'What configuring a factory actually involves.',
      },
      duration: 'Around 45 minutes',
    },
  },

  legal: {
    lastUpdated: 'Last updated',
    lastUpdatedValue: '19 September 2026',
    placeholderNote:
      'This document is a template prepared for the Tea Factory Digital platform. Company registration details, the data-protection contact and any factory-specific terms must be completed before publication.',
    privacy: {
      title: 'Privacy Policy',
      intro:
        'This policy explains what Tea Factory Digital collects, why it is collected, and who it is shared with. It covers this website, the supplier mobile app and the office console.',
      sections: {
        controller: {
          title: 'Who is responsible for your data',
          body: 'For the supplier mobile app, the tea factory that issued your supplier account is the controller of your account data. Tea Factory Digital operates the platform on that factory’s instructions as a processor. For this website, Tea Factory Digital is the controller.',
        },
        collect: {
          title: 'What we collect',
          body: 'From suppliers: the supplier code and account details the factory already holds, the monthly account figures the factory publishes, requests you submit, inquiries you send, your chosen language and display settings, and, if you enable notifications, a device token. From website visitors: the details you enter in the demo request form, and basic technical information such as browser type and approximate region.',
        },
        why: {
          title: 'Why we use it',
          body: 'To show you your monthly account and its history, to carry your requests to the factory office and its decisions back to you, to send the notification categories you have opted into, and to respond to demo enquiries. We do not sell personal data and we do not use supplier data for advertising.',
        },
        sharing: {
          title: 'Who it is shared with',
          body: 'Your account and request data is visible to authorised staff at your own factory, under role-based access. It is not shared with other factories on the platform. We use service providers for hosting and push notification delivery, who process data on our instructions only.',
        },
        biometrics: {
          title: 'Biometrics and device security',
          body: 'Biometric unlock is handled entirely by your device. The app asks the operating system whether the unlock succeeded; it never receives, stores or transmits your fingerprint or face data. Saved sign-in credentials are held in the device keychain, not in ordinary app storage.',
        },
        retention: {
          title: 'How long it is kept',
          body: 'Account and request records are kept for as long as your factory requires them for its own record-keeping and any period the law requires. Demo request details are kept for as long as needed to respond and to keep a record of the enquiry.',
        },
        rights: {
          title: 'Your rights',
          body: 'You may ask for a copy of your data, ask for it to be corrected, or ask about how it is used. Because your factory controls your supplier account, requests about account data are directed to the factory office; we will assist the factory in answering them.',
        },
        children: {
          title: 'Children',
          body: 'The supplier app is issued to registered tea suppliers and is not directed at children.',
        },
        changes: {
          title: 'Changes to this policy',
          body: 'If this policy changes materially, the new version will be published here and, where the change affects the app, announced in the app.',
        },
        contact: {
          title: 'Contact',
          body: 'Questions about this policy can be sent to the contact address in the footer of this site. Questions about your own supplier account should go to your factory office.',
        },
      },
    },
    terms: {
      title: 'Terms & Conditions',
      intro:
        'These terms govern the use of the Tea Factory Digital website, the supplier mobile app and the office console.',
      sections: {
        scope: {
          title: 'What the platform does',
          body: 'Tea Factory Digital provides a supplier mobile app and an office console. It presents account information published by your factory and carries requests between suppliers and the factory office. It does not perform leaf collection, weighing, rate entry, month close, payout processing or bank file generation. Those remain with your factory’s own systems.',
        },
        accounts: {
          title: 'Accounts',
          body: 'Supplier accounts are issued by the factory, not by Tea Factory Digital. You are responsible for keeping your password confidential and for changing the password issued to you at first sign-in. Tell your factory office immediately if you believe someone else has access to your account.',
        },
        figures: {
          title: 'Account figures',
          body: 'The figures shown in the app are published by your factory from its own records. Where a figure in the app differs from the factory’s record, the factory’s record governs. Queries about a figure should be raised with your factory office, including through the inquiry feature in the app.',
        },
        requests: {
          title: 'Requests and decisions',
          body: 'Submitting a request through the app is an application, not an agreement. The factory decides every request and may approve a different amount or a different term from the one asked for. A displayed credit ceiling is the maximum the factory has configured, not an offer of credit.',
        },
        availability: {
          title: 'Availability',
          body: 'We aim to keep the platform available, but it depends on mobile networks and third-party services and may be unavailable at times. Cached information may be readable offline; submitting anything requires a connection.',
        },
        acceptable: {
          title: 'Acceptable use',
          body: 'Do not attempt to access another supplier’s account, interfere with the service, or submit unlawful or abusive content through inquiries or attachments.',
        },
        ip: {
          title: 'Intellectual property',
          body: 'The platform, its software and its design are owned by Tea Factory Digital. A factory’s name, logo and published content remain that factory’s property.',
        },
        liability: {
          title: 'Liability',
          body: 'The platform is provided for information and workflow purposes. To the extent permitted by law, we are not liable for losses arising from reliance on displayed figures that differ from the factory’s own records, or from unavailability of the service.',
        },
        changes: {
          title: 'Changes to these terms',
          body: 'These terms may be updated. The current version is always the one published on this page, with the date of the last change shown above.',
        },
        law: {
          title: 'Governing law',
          body: 'These terms are governed by the laws of Sri Lanka.',
        },
      },
    },
  },
} as const;

/**
 * `as const` above pins every value to its literal type, which is what keeps
 * the key set honest, but a translation is a different string, so the literals
 * have to widen before `si` and `ta` can be typed against the shape. `Widen`
 * keeps the structure and replaces each leaf literal with `string`.
 */
type Widen<T> = T extends string ? string : { readonly [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;
