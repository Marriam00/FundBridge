import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Star, MapPin, Building2, ChevronLeft, ShieldCheck, Globe, CheckCircle2, Briefcase } from 'lucide-react';
import { useLanguage } from '../i18n';

const MOCK_STARTUPS = [
  { id: 1, name: 'AgriTech Solutions', sector: 'Agriculture', location: 'Alexandria', fundingNeeded: '$500k', type: 'Working Capital', rank: 4.8, verified: true, score: 92, image: 'https://images.unsplash.com/photo-1586771107445-d3afce0d4511?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'HealthAI', sector: 'Health', location: 'Cairo', fundingNeeded: '$1.2M', type: 'Loan', rank: 4.9, verified: true, score: 95, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'EduSmart', sector: 'Education', location: 'Giza', fundingNeeded: '$250k', type: 'Islamic Finance', rank: 4.5, verified: true, score: 88, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'FinFlow', sector: 'FinTech', location: 'Mansoura', fundingNeeded: '$800k', type: 'Loan', rank: 4.7, verified: false, score: 85, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'GreenEnergy', sector: 'Tech', location: 'Aswan', fundingNeeded: '$2M', type: 'Working Capital', rank: 4.6, verified: true, score: 90, image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=400&q=80' },
  { id: 6, name: 'LogisTech', sector: 'Tech', location: 'Cairo', fundingNeeded: '$1.5M', type: 'Working Capital', rank: 4.4, verified: false, score: 82, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80' },
];

export default function BankDashboard({ onNavigate }: { onNavigate: (view: 'landing' | 'bank' | 'startup') => void }) {
  const { t, lang, setLang } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');

  const filteredStartups = MOCK_STARTUPS.filter(s => 
    (sectorFilter === 'All' || s.sector === sectorFilter) &&
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <Building2 className="w-4 h-4" />
            </div>
            <div className="font-bold text-xl uppercase tracking-tight">{t('bank.portal')}</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors group">
            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            {lang === 'en' ? 'عربي' : 'English'}
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-white/10 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-6">
            <div className="text-right rtl:text-left hidden sm:block">
              <p className="text-xs font-bold text-white leading-none">Investment Officer</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">NCB Global</p>
            </div>
            <div className="w-10 h-10 bg-brand-secondary rounded-2xl flex items-center justify-center font-black text-sm shadow-inner ring-2 ring-white/10">
              B
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Filters */}
        <aside className="w-80 bg-white border-r border-slate-200/60 p-8 overflow-y-auto hidden lg:block">
          <div className="flex items-center gap-3 mb-10 text-brand-primary">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/5 flex items-center justify-center">
              <Filter className="w-4 h-4" />
            </div>
            <span className="font-black uppercase tracking-[0.2em] text-[10px]">{t('filter.title')}</span>
          </div>
          
          <div className="space-y-10">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block leading-none">{t('filter.startupType')}</label>
              <div className="space-y-1">
                {['All', 'Tech', 'Health', 'Education', 'FinTech', 'Agriculture'].map(sector => (
                  <label key={sector} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${sectorFilter === sector ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/10' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <span className="text-sm font-bold">{t(sector.toLowerCase()) || sector}</span>
                    <input 
                      type="radio" 
                      name="sector" 
                      value={sector}
                      checked={sectorFilter === sector}
                      onChange={(e) => setSectorFilter(e.target.value)}
                      className="hidden" 
                    />
                    {sectorFilter === sector && <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></div>}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block leading-none">{t('filter.fundingType')}</label>
              <div className="space-y-3">
                {['Loan', 'Islamic Finance', 'Working Capital'].map(type => (
                  <label key={type} className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-brand-secondary checked:border-brand-secondary transition-all" />
                      <CheckCircle2 className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-semibold group-hover:text-brand-primary transition-colors">{t(type.toLowerCase().replace(' ', '')) || type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <label className="flex items-center gap-3 text-sm text-slate-900 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-brand-secondary checked:border-brand-secondary transition-all" />
                  <Star className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity fill-current" />
                </div>
                <span className="font-bold">{t('filter.verifiedOnly')}</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl font-black text-brand-primary tracking-tighter"
                >
                  {t('discover.startups')}
                </motion.h1>
                <p className="text-slate-500 font-medium mt-2">{t('discover.startups.desc')}</p>
              </div>
              <div className="relative w-full md:w-96 group">
                <Search className={`w-5 h-5 text-slate-400 absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 group-focus-within:text-brand-secondary transition-colors`} />
                <input 
                  type="text" 
                  placeholder={t('search.startups')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${lang === 'ar' ? 'pr-12 pl-6' : 'pl-12 pr-6'} py-4 bg-white border-2 border-slate-100 rounded-3xl text-sm font-bold shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-secondary/5 focus:border-brand-secondary transition-all`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredStartups.map((startup, idx) => (
                <motion.div 
                  key={startup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand-primary/10 transition-all flex flex-col"
                >
                  <div className="h-56 relative overflow-hidden">
                    <img 
                      src={startup.image} 
                      alt={startup.name} 
                      referrerPolicy="no-referrer" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-transparent to-transparent"></div>
                    
                    <div className={`absolute top-5 ${lang === 'ar' ? 'left-5' : 'right-5'} bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-black text-brand-primary flex items-center gap-1.5 shadow-xl z-10 border border-white/20`}>
                      <Star className="w-3.5 h-3.5 fill-brand-accent text-brand-accent" />
                      {startup.rank}
                    </div>
                    
                    {startup.verified && (
                      <div className={`absolute top-5 ${lang === 'ar' ? 'right-5' : 'left-5'} bg-white text-emerald-600 p-2 rounded-xl shadow-xl z-10 border border-emerald-50`} title="Verified Startup">
                        <ShieldCheck className="w-5 h-5 fill-current" />
                      </div>
                    )}

                    <div className={`absolute bottom-5 ${lang === 'ar' ? 'right-6' : 'left-6'}`}>
                      <span className="bg-brand-accent text-brand-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 shadow-lg">
                        {t(startup.sector.toLowerCase()) || startup.sector}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-brand-primary group-hover:text-brand-secondary transition-colors mb-2 line-clamp-1">{startup.name}</h3>
                      <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5" />
                          {t(startup.sector.toLowerCase()) || startup.sector}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {startup.location}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5 mb-8">
                      <div className="flex justify-between items-center py-3 border-b border-slate-50">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">{t('card.fundingNeeded')}</span>
                        <span className="font-bold text-brand-primary text-xl tracking-tight">{startup.fundingNeeded}</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2.5">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">{t('card.readinessScore')}</span>
                          <span className="text-xs font-black text-brand-secondary">{startup.score}%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 shadow-inner">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${startup.score}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-brand-secondary to-indigo-400 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    </div>

                    <button className="mt-auto w-full bg-brand-primary text-white py-4.5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-brand-secondary transition-all active:scale-[0.98] shadow-lg shadow-brand-primary/10">
                      Evaluate Venture
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
