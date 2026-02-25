import { motion } from 'motion/react';
import { Building2, Rocket, ShieldCheck, Target, Star, ArrowRight, Globe } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function LandingPage({ onNavigate }: { onNavigate: (view: 'landing' | 'bank' | 'startup') => void }) {
  const { t, lang, setLang } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 text-blue-600">
          <Rocket className="w-6 h-6" />
          <span className="font-bold text-xl tracking-tight">{t('app.name')}</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            <Globe className="w-4 h-4" />
            {lang === 'en' ? 'عربي' : 'English'}
          </button>
          <button onClick={() => onNavigate('startup')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">{t('nav.startups')}</button>
          <button onClick={() => onNavigate('bank')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">{t('nav.banks')}</button>
          <button onClick={() => onNavigate('startup')} className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">
            {t('nav.getStarted')}
          </button>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6 max-w-5xl mx-auto text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              {t('hero.title1')} <br className="hidden sm:block" />
              <span className="text-blue-600">{t('hero.title2')}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => onNavigate('startup')} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md text-lg">
                <Rocket className="w-5 h-5" />
                {t('hero.btn.startup')}
              </button>
              <button onClick={() => onNavigate('bank')} className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-900 px-8 py-4 rounded-full font-medium hover:bg-slate-50 transition-all shadow-sm hover:shadow-md text-lg">
                <Building2 className="w-5 h-5" />
                {t('hero.btn.bank')}
              </button>
            </div>
          </motion.div>
        </section>

        {/* Minimal Features Section */}
        <section className="py-24 bg-slate-50 px-6 border-y border-slate-100">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Target className="w-7 h-7" />,
                title: t('feat1.title'),
                desc: t('feat1.desc')
              },
              {
                icon: <ShieldCheck className="w-7 h-7" />,
                title: t('feat2.title'),
                desc: t('feat2.desc')
              },
              {
                icon: <Star className="w-7 h-7" />,
                title: t('feat3.title'),
                desc: t('feat3.desc')
              }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }} 
                className="text-center"
              >
                <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Simple CTA */}
        <section className="py-32 px-6 max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">{t('cta.title')}</h2>
            <button onClick={() => onNavigate('startup')} className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 text-lg group">
              {t('cta.btn')}
              <ArrowRight className={`w-5 h-5 group-hover:${lang === 'ar' ? '-translate-x-1' : 'translate-x-1'} transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-900">
            <Rocket className="w-5 h-5 text-blue-600" />
            <span className="font-bold tracking-tight">{t('app.name')}</span>
          </div>
          <p className="text-slate-500 text-sm">{t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  );
}
