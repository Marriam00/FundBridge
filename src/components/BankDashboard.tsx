import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Star, MapPin, Briefcase, ChevronLeft, ShieldCheck, Globe } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('landing')} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="font-bold text-xl tracking-tight">{t('bank.portal')}</div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <Globe className="w-4 h-4" />
            {lang === 'en' ? 'عربي' : 'English'}
          </button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
            B
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Filters */}
        <aside className="w-72 bg-white border-r border-slate-200 p-6 overflow-y-auto hidden md:block">
          <div className="flex items-center gap-2 mb-6 text-slate-900 font-semibold">
            <Filter className="w-5 h-5" />
            {t('filter.title')}
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">{t('filter.startupType')}</label>
              <div className="space-y-2">
                {['All', 'Tech', 'Health', 'Education', 'FinTech', 'Agriculture'].map(sector => (
                  <label key={sector} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input 
                      type="radio" 
                      name="sector" 
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

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">{t('filter.fundingType')}</label>
              <div className="space-y-2">
                {['Loan', 'Islamic Finance', 'Working Capital'].map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    {t(type.toLowerCase().replace(' ', '')) || type}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">{t('filter.verification')}</label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                {t('filter.verifiedOnly')}
              </label>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{t('discover.startups')}</h1>
                <p className="text-slate-500 text-sm mt-1">{t('discover.startups.desc')}</p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className={`w-5 h-5 text-slate-400 absolute ${lang === 'ar' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
                <input 
                  type="text" 
                  placeholder={t('search.startups')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStartups.map((startup, i) => (
                <motion.div 
                  key={startup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer flex flex-col"
                >
                  <div className="h-40 relative overflow-hidden">
                    <img src={startup.image} alt={startup.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className={`absolute top-3 ${lang === 'ar' ? 'left-3' : 'right-3'} bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-900 flex items-center gap-1 shadow-sm z-10`}>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {startup.rank}
                    </div>
                    {startup.verified && (
                      <div className={`absolute top-3 ${lang === 'ar' ? 'right-3' : 'left-3'} bg-emerald-500 text-white p-1.5 rounded-full shadow-sm z-10`} title="Verified Startup">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-slate-900 line-clamp-1">{startup.name}</h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        {startup.sector}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {startup.location}
                      </div>
                    </div>

                    <div className="mt-auto space-y-3">
                      <div className="flex justify-between items-center py-2 border-t border-slate-100">
                        <span className="text-xs text-slate-500">{t('card.fundingNeeded')}</span>
                        <span className="font-semibold text-slate-900">{startup.fundingNeeded}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t border-slate-100">
                        <span className="text-xs text-slate-500">{t('card.readinessScore')}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${startup.score}%` }}></div>
                          </div>
                          <span className="font-semibold text-blue-600 text-sm">{startup.score}</span>
                        </div>
                      </div>
                    </div>
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
