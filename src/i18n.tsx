import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Landing
    'app.name': 'FundBridge',
    'nav.startups': 'For Startups',
    'nav.banks': 'For Banks',
    'nav.getStarted': 'Get Started',
    'hero.title1': 'Where Ambitious Startups',
    'hero.title2': 'Meet Smart Capital.',
    'hero.subtitle': 'The intelligent bridge connecting ambitious startups with the right capital. Transparent, secure, and data-driven.',
    'hero.btn.startup': "I'm a Startup",
    'hero.btn.bank': "I'm an Investor",
    'feat1.title': 'Smart Matching',
    'feat1.desc': 'AI-powered connections based on real data, sector focus, and verified profiles.',
    'feat2.title': 'Milestone Funding',
    'feat2.desc': 'Secure, step-by-step capital release that protects investments and rewards progress.',
    'feat3.title': 'Verified Trust',
    'feat3.desc': 'Transparent ranking and dual credit scores to build mutual confidence.',
    'cta.title': 'Ready to transform how you fund or get funded?',
    'cta.btn': 'Join FundBridge Today',
    'footer.rights': '© 2025 FundBridge. All rights reserved.',
    
    // Bank Dashboard
    'bank.portal': 'Bank Portal',
    'filter.title': 'Filters',
    'filter.startupType': 'Startup Type',
    'filter.fundingType': 'Funding Type',
    'filter.verification': 'Verification',
    'filter.verifiedOnly': 'Verified Only',
    'discover.startups': 'Discover Startups',
    'discover.startups.desc': 'Find high-potential ventures matching your criteria.',
    'search.startups': 'Search startups...',
    'card.fundingNeeded': 'Funding Needed',
    'card.readinessScore': 'Readiness Score',
    
    // Startup Dashboard
    'startup.portal': 'Startup Portal',
    'tab.discover': 'Discover Banks',
    'tab.applications': 'My Applications',
    'filter.bankType': 'Bank Type',
    'filter.mySector': 'My Sector',
    'discover.banks': 'Find the Right Partner',
    'discover.banks.desc': 'Browse banks that support your sector and funding needs.',
    'search.banks': 'Search banks...',
    'card.supportedSectors': 'Supported Sectors',
    'card.successRate': 'Success Rate',
    'app.status': 'Application Status',
    'app.status.desc': 'Track your funding requests and milestones.',
    'table.bank': 'Bank',
    'table.amount': 'Amount',
    'table.date': 'Date',
    'table.status': 'Status',
    'status.approved': 'Approved',
    'status.inReview': 'In Review',
    
    // Common
    'all': 'All',
    'tech': 'Tech',
    'health': 'Health',
    'education': 'Education',
    'fintech': 'FinTech',
    'agriculture': 'Agriculture',
    'greenEnergy': 'Green Energy',
    'realEstate': 'Real Estate',
    'loan': 'Loan',
    'islamicFinance': 'Islamic Finance',
    'workingCapital': 'Working Capital',
    'grants': 'Grants',
    'commercial': 'Commercial',
    'islamic': 'Islamic',
    'development': 'Development',
  },
  ar: {
    // Landing
    'app.name': 'فاند بريدج',
    'nav.startups': 'للشركات الناشئة',
    'nav.banks': 'للبنوك',
    'nav.getStarted': 'ابدأ الآن',
    'hero.title1': 'حيث تلتقي الشركات الطموحة',
    'hero.title2': 'برأس المال الذكي.',
    'hero.subtitle': 'الجسر الذكي الذي يربط الشركات الناشئة الطموحة برأس المال المناسب. شفاف، آمن، ومبني على البيانات.',
    'hero.btn.startup': "أنا شركة ناشئة",
    'hero.btn.bank': "أنا مستثمر",
    'feat1.title': 'مطابقة ذكية',
    'feat1.desc': 'اتصالات مدعومة بالذكاء الاصطناعي بناءً على بيانات حقيقية، والتركيز على القطاع، والملفات الموثقة.',
    'feat2.title': 'تمويل مرحلي',
    'feat2.desc': 'إصدار رأس مال آمن وخطوة بخطوة يحمي الاستثمارات ويكافئ التقدم.',
    'feat3.title': 'ثقة موثقة',
    'feat3.desc': 'تصنيف شفاف ودرجات ائتمان مزدوجة لبناء الثقة المتبادلة.',
    'cta.title': 'هل أنت مستعد لتغيير طريقة التمويل أو الحصول عليه؟',
    'cta.btn': 'انضم إلى فاند بريدج اليوم',
    'footer.rights': '© 2025 فاند بريدج. جميع الحقوق محفوظة.',
    
    // Bank Dashboard
    'bank.portal': 'بوابة البنك',
    'filter.title': 'التصنيفات',
    'filter.startupType': 'نوع الشركة الناشئة',
    'filter.fundingType': 'نوع التمويل',
    'filter.verification': 'التوثيق',
    'filter.verifiedOnly': 'الموثقة فقط',
    'discover.startups': 'اكتشف الشركات الناشئة',
    'discover.startups.desc': 'ابحث عن المشاريع ذات الإمكانات العالية التي تطابق معاييرك.',
    'search.startups': 'ابحث عن الشركات الناشئة...',
    'card.fundingNeeded': 'التمويل المطلوب',
    'card.readinessScore': 'درجة الجاهزية',
    
    // Startup Dashboard
    'startup.portal': 'بوابة الشركات الناشئة',
    'tab.discover': 'اكتشف البنوك',
    'tab.applications': 'طلباتي',
    'filter.bankType': 'نوع البنك',
    'filter.mySector': 'قطاعي',
    'discover.banks': 'ابحث عن الشريك المناسب',
    'discover.banks.desc': 'تصفح البنوك التي تدعم قطاعك واحتياجاتك التمويلية.',
    'search.banks': 'ابحث عن البنوك...',
    'card.supportedSectors': 'القطاعات المدعومة',
    'card.successRate': 'نسبة النجاح',
    'app.status': 'حالة الطلب',
    'app.status.desc': 'تتبع طلبات التمويل والمراحل الخاصة بك.',
    'table.bank': 'البنك',
    'table.amount': 'المبلغ',
    'table.date': 'التاريخ',
    'table.status': 'الحالة',
    'status.approved': 'مقبول',
    'status.inReview': 'قيد المراجعة',
    
    // Common
    'all': 'الكل',
    'tech': 'تكنولوجيا',
    'health': 'صحة',
    'education': 'تعليم',
    'fintech': 'تكنولوجيا مالية',
    'agriculture': 'زراعة',
    'greenEnergy': 'طاقة خضراء',
    'realEstate': 'عقارات',
    'loan': 'قرض',
    'islamicFinance': 'تمويل إسلامي',
    'workingCapital': 'رأس مال عامل',
    'grants': 'منح',
    'commercial': 'تجاري',
    'islamic': 'إسلامي',
    'development': 'تنموي',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
