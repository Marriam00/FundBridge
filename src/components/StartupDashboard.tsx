import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, ChevronLeft, CheckCircle2, Clock, FileText, Filter, Star, ShieldAlert, Globe, Rocket } from 'lucide-react';
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
    <div className="min-h-screen bg-brand-surface flex flex-col selection:bg-brand-accent selection:text-brand-primary">
      <header className="bg-brand-primary text-white px-6 py-5 flex items-center justify-between sticky top-0 z-50 shadow-xl shadow-brand-primary/10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('landing')} 
            className="p-2 hover:bg-white/10 rounded-xl transition-all active:scale-95 group"
          >
            <ChevronLeft className={`w-5 h-5 group-hover:${lang === 'ar' ? 'translate-x-1' : '-translate-x-1'} transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-brand-secondary p-1 rounded-md">
              <Rocket className="w-4 h-4" />
            </div>
            <div className="font-bold text-xl uppercase tracking-tight">{t('startup.portal')}</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors group">
            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            {lang === 'en' ? 'عربي' : 'English'}
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-white/10 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6">
            <div className="text-right rtl:text-left hidden sm:block">
              <p className="text-xs font-bold text-white leading-none">Founder Dashboard</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">Unicorn Hunt</p>
            </div>
            <div className="w-10 h-10 bg-brand-secondary rounded-2xl flex items-center justify-center font-black text-sm shadow-inner ring-2 ring-white/10">
              S
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation & Filters */}
        <aside className="w-80 bg-white border-r border-slate-200/60 flex-shrink-0 flex flex-col overflow-y-auto hidden lg:flex">
          <div className="p-8 space-y-3">
            <button 
              onClick={() => setActiveTab('discover')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'discover' ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/10 scale-[1.02]' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Search className="w-5 h-5" />
              {t('tab.discover')}
            </button>
            <button 
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === 'applications' ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/10 scale-[1.02]' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <FileText className="w-5 h-5" />
              {t('tab.applications')}
            </button>
          </div>

          {activeTab === 'discover' && (
            <div className="px-8 pb-8 space-y-10 border-t border-slate-50 pt-10">
              <div className="flex items-center gap-3 text-brand-primary">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/5 flex items-center justify-center">
                  <Filter className="w-4 h-4" />
                </div>
                <span className="font-black uppercase tracking-[0.2em] text-[10px]">{t('filter.title')}</span>
              </div>
              
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block leading-none">{t('filter.bankType')}</label>
                <div className="space-y-1">
                  {['All', 'Commercial', 'Islamic', 'Development'].map(type => (
                    <label key={type} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${typeFilter === type ? 'bg-brand-secondary text-white shadow-lg shadow-brand-secondary/10' : 'text-slate-600 hover:bg-slate-50'}`}>
                      <span className="text-sm font-bold">{t(type.toLowerCase()) || type}</span>
                      <input 
                        type="radio" 
                        name="bankType" 
                        value={type}
                        checked={typeFilter === type}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="hidden" 
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block leading-none">{t('filter.mySector')}</label>
                <div className="space-y-1">
                  {['All', 'Tech', 'Health', 'Education', 'FinTech', 'Agriculture', 'Green Energy'].map(sector => (
                    <label key={sector} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${sectorFilter === sector ? 'bg-brand-secondary text-white shadow-lg shadow-brand-secondary/10' : 'text-slate-600 hover:bg-slate-50'}`}>
                      <span className="text-sm font-bold">{t(sector.toLowerCase()) || sector}</span>
                      <input 
                        type="radio" 
                        name="startupSector" 
                        value={sector}
                        checked={sectorFilter === sector}
                        onChange={(e) => setSectorFilter(e.target.value)}
                        className="hidden" 
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            
            {activeTab === 'discover' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                  <div>
                    <motion.h1 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-4xl font-black text-brand-primary tracking-tighter"
                    >
                      {t('discover.banks')}
                    </motion.h1>
                    <p className="text-slate-500 font-medium mt-2">{t('discover.banks.desc')}</p>
                  </div>
                  <div className="relative w-full md:w-96 group">
                    <Search className={`w-5 h-5 text-slate-400 absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 group-focus-within:text-brand-secondary transition-colors`} />
                    <input 
                      type="text" 
                      placeholder={t('search.banks')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full ${lang === 'ar' ? 'pr-12 pl-6' : 'pl-12 pr-6'} py-4 bg-white border-2 border-slate-100 rounded-3xl text-sm font-bold shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-secondary/5 focus:border-brand-secondary transition-all`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredBanks.map((bank, idx) => (
                    <motion.div 
                      key={bank.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -8 }}
                      className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 transition-all flex flex-col"
                    >
                      <div className="h-48 relative overflow-hidden">
                        <img 
                          src={bank.image} 
                          alt={bank.name} 
                          referrerPolicy="no-referrer" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-transparent to-transparent"></div>
                        
                        <div className={`absolute top-5 ${lang === 'ar' ? 'left-5' : 'right-5'} bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-brand-primary flex items-center gap-1.5 shadow-xl z-10 border border-white/20`}>
                          <Star className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                          {bank.reviews}
                        </div>
                        
                        <div className={`absolute bottom-5 ${lang === 'ar' ? 'right-6' : 'left-6'}`}>
                          <span className="bg-brand-secondary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 shadow-lg">
                            {t(bank.type.toLowerCase()) || bank.type}
                          </span>
                        </div>
                      </div>

                      <div className="p-8 flex-1 flex flex-col">
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-brand-primary group-hover:text-brand-secondary transition-colors mb-2 line-clamp-1">{bank.name}</h3>
                          <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <MapPin className="w-3.5 h-3.5" />
                            {bank.location}
                          </div>
                        </div>

                        <div className="space-y-4 mb-8">
                          <div className="py-2 border-t border-slate-50">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none block mb-2">{t('card.supportedSectors')}</span>
                            <div className="flex flex-wrap gap-1.5">
                              {bank.sectors.map(s => (
                                <span key={s} className="bg-slate-50 text-slate-600 text-[9px] px-2.5 py-1 rounded-lg font-black uppercase tracking-wider border border-slate-100">{t(s.toLowerCase()) || s}</span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="py-3 border-y border-slate-50">
                            <div className="flex items-start gap-3 text-xs font-medium text-slate-600 leading-relaxed">
                              <ShieldAlert className="w-4 h-4 text-brand-secondary shrink-0" />
                              <span>{bank.eligibility}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center py-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{t('card.successRate')}</span>
                            <span className="font-bold text-emerald-600 text-lg tracking-tight">{bank.successRate}</span>
                          </div>
                        </div>

                        <button className="mt-auto w-full bg-brand-primary text-white py-4.5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/10">
                          Submit Application
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'applications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-12">
                  <h1 className="text-4xl font-black text-brand-primary tracking-tighter">{t('app.status')}</h1>
                  <p className="text-slate-500 font-medium mt-2">{t('app.status.desc')}</p>
                </div>

                <div className="bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className={`w-full ${lang === 'ar' ? 'text-right' : 'text-left'} text-sm`}>
                      <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        <tr>
                          <th className="px-8 py-5 tracking-[0.2em]">{t('table.bank')}</th>
                          <th className="px-8 py-5 tracking-[0.2em]">{t('table.amount')}</th>
                          <th className="px-8 py-5 tracking-[0.2em]">{t('table.date')}</th>
                          <th className="px-8 py-5 tracking-[0.2em]">{t('table.status')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {MOCK_APPLICATIONS.map(app => (
                          <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-6 font-bold text-brand-primary">{app.bank}</td>
                            <td className="px-8 py-6 text-slate-500 font-medium">{app.amount}</td>
                            <td className="px-8 py-6 text-slate-400 font-medium">{app.date}</td>
                            <td className="px-8 py-6">
                              {app.status === 'Approved' ? (
                                <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  {t('status.approved')}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
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
                </div>
              </motion.div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
