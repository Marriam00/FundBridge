import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, ChevronLeft, CheckCircle2, Clock, FileText, Filter, Star, ShieldAlert, Globe } from 'lucide-react';
import { useLanguage } from '../i18n';

const MOCK_BANKS = [
  { id: 1, name: 'National Commercial Bank', type: 'Commercial', location: 'Cairo', sectors: ['Tech', 'Health', 'Agriculture'], fundingTypes: ['Loan', 'Working Capital'], successRate: '85%', reviews: 4.8, eligibility: 'Min 1 year in operation, positive cash flow.', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Islamic Finance House', type: 'Islamic', location: 'Alexandria', sectors: ['Education', 'Tech', 'Real Estate'], fundingTypes: ['Islamic Finance'], successRate: '92%', reviews: 4.9, eligibility: 'Sharia-compliant business model, no debt.', image: 'https://images.unsplash.com/photo-1574689049597-7e6f4bc2a5ce?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Development Bank of Egypt', type: 'Development', location: 'Cairo', sectors: ['Agriculture', 'Green Energy', 'Tech'], fundingTypes: ['Loan', 'Grants'], successRate: '78%', reviews: 4.5, eligibility: 'Focus on sustainable development goals.', image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Alexandria Trust Bank', type: 'Commercial', location: 'Alexandria', sectors: ['FinTech', 'Health', 'Education'], fundingTypes: ['Loan', 'Working Capital'], successRate: '81%', reviews: 4.6, eligibility: 'Min $50k annual revenue.', image: 'https://images.unsplash.com/photo-1523192193543-6e7296d960e4?auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'Green Growth Fund', type: 'Development', location: 'Giza', sectors: ['Green Energy', 'Agriculture'], fundingTypes: ['Grants', 'Working Capital'], successRate: '88%', reviews: 4.7, eligibility: 'Environmental impact assessment required.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80' },
  { id: 6, name: 'TechVentures Islamic', type: 'Islamic', location: 'Cairo', sectors: ['Tech', 'FinTech'], fundingTypes: ['Islamic Finance'], successRate: '95%', reviews: 5.0, eligibility: 'Tech-focused, scalable business model.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80' },
];

const MOCK_APPLICATIONS = [
  { id: 101, bank: 'National Commercial Bank', amount: '$500k', status: 'In Review', date: 'Oct 12, 2025' },
  { id: 102, bank: 'Islamic Finance House', amount: '$250k', status: 'Approved', date: 'Sep 28, 2025' },
];

export default function StartupDashboard({ onNavigate }: { onNavigate: (view: 'landing' | 'bank' | 'startup') => void }) {
  const { t, lang, setLang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'discover' | 'applications'>('discover');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sectorFilter, setSectorFilter] = useState('All');

  const filteredBanks = MOCK_BANKS.filter(b => 
    (typeFilter === 'All' || b.type === typeFilter) &&
    (sectorFilter === 'All' || b.sectors.includes(sectorFilter)) &&
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('landing')} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="font-bold text-xl tracking-tight">{t('startup.portal')}</div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <Globe className="w-4 h-4" />
            {lang === 'en' ? 'عربي' : 'English'}
          </button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
            S
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation & Filters */}
        <aside className="w-72 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col overflow-y-auto hidden md:flex">
          <div className="p-4 space-y-2 border-b border-slate-100">
            <button 
              onClick={() => setActiveTab('discover')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'discover' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Search className="w-5 h-5" />
              {t('tab.discover')}
            </button>
            <button 
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'applications' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <FileText className="w-5 h-5" />
              {t('tab.applications')}
            </button>
          </div>

          {activeTab === 'discover' && (
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <Filter className="w-5 h-5" />
                {t('filter.title')}
              </div>
              
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">{t('filter.bankType')}</label>
                <div className="space-y-2">
                  {['All', 'Commercial', 'Islamic', 'Development'].map(type => (
                    <label key={type} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="bankType" 
                        value={type}
                        checked={typeFilter === type}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500" 
                      />
                      {t(type.toLowerCase()) || type}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">{t('filter.mySector')}</label>
                <div className="space-y-2">
                  {['All', 'Tech', 'Health', 'Education', 'FinTech', 'Agriculture', 'Green Energy'].map(sector => (
                    <label key={sector} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input 
                        type="radio" 
                        name="startupSector" 
                        value={sector}
                        checked={sectorFilter === sector}
                        onChange={(e) => setSectorFilter(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500" 
                      />
                      {t(sector.toLowerCase()) || sector}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            
            {activeTab === 'discover' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">{t('discover.banks')}</h1>
                    <p className="text-slate-500 text-sm mt-1">{t('discover.banks.desc')}</p>
                  </div>
                  <div className="relative w-full sm:w-72">
                    <Search className={`w-5 h-5 text-slate-400 absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
                    <input 
                      type="text" 
                      placeholder={t('search.banks')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredBanks.map((bank, i) => (
                    <motion.div 
                      key={bank.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer flex flex-col"
                    >
                      <div className="h-32 relative overflow-hidden">
                        <img src={bank.image} alt={bank.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className={`absolute top-3 ${lang === 'ar' ? 'left-3' : 'right-3'} bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-slate-900 shadow-sm z-10`}>
                          {t(bank.type.toLowerCase()) || bank.type}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{bank.name}</h3>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {bank.location}
                          </div>
                          <div className="flex items-center gap-1 text-yellow-600 font-medium bg-yellow-50 px-1.5 py-0.5 rounded">
                            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                            {bank.reviews}
                          </div>
                        </div>

                        <div className="mt-auto space-y-3">
                          <div className="py-2 border-t border-slate-100">
                            <span className="text-xs text-slate-500 block mb-1">{t('card.supportedSectors')}</span>
                            <div className="flex flex-wrap gap-1">
                              {bank.sectors.map(s => (
                                <span key={s} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-1 rounded-md font-medium">{t(s.toLowerCase()) || s}</span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="py-2 border-t border-slate-100">
                            <div className="flex items-start gap-2 text-xs text-slate-600">
                              <ShieldAlert className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{bank.eligibility}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center py-2 border-t border-slate-100">
                            <span className="text-xs text-slate-500">{t('card.successRate')}</span>
                            <span className="font-semibold text-emerald-600 text-sm">{bank.successRate}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'applications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-slate-900">{t('app.status')}</h1>
                  <p className="text-slate-500 text-sm mt-1">{t('app.status.desc')}</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                  <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} text-sm`}>
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                      <tr>
                        <th className="px-6 py-4">{t('table.bank')}</th>
                        <th className="px-6 py-4">{t('table.amount')}</th>
                        <th className="px-6 py-4">{t('table.date')}</th>
                        <th className="px-6 py-4">{t('table.status')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_APPLICATIONS.map(app => (
                        <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{app.bank}</td>
                          <td className="px-6 py-4 text-slate-600">{app.amount}</td>
                          <td className="px-6 py-4 text-slate-500">{app.date}</td>
                          <td className="px-6 py-4">
                            {app.status === 'Approved' ? (
                              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {t('status.approved')}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium">
                                <Clock className="w-3.5 h-3.5" />
                                {t('status.inReview')}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
