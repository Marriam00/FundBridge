import { motion } from 'motion/react';
import { Building2, Rocket, ShieldCheck, Target, Star, ArrowRight, Globe } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function LandingPage({ onNavigate }: { onNavigate: (view: 'landing' | 'bank' | 'startup') => void }) {
  const { t, lang, setLang } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen bg-brand-surface selection:bg-brand-accent selection:text-brand-primary">
      {/* Header */}
      <header className="px-6 py-5 flex items-center justify-between border-b border-slate-200/60 bg-white/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2.5 text-brand-primary">
          <div className="bg-brand-secondary p-1.5 rounded-lg text-white">
            <Rocket className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">{t('app.name')}</span>
        </div>
        <nav className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-primary transition-all group">
              <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              {lang === 'en' ? 'عربي' : 'English'}
            </button>
            <button onClick={() => onNavigate('startup')} className="text-sm font-semibold text-slate-500 hover:text-brand-primary transition-colors">{t('nav.startups')}</button>
            <button onClick={() => onNavigate('bank')} className="text-sm font-semibold text-slate-500 hover:text-brand-primary transition-colors">{t('nav.banks')}</button>
          </div>
          <button 
            onClick={() => onNavigate('startup')} 
            className="bg-brand-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-brand-secondary transition-all shadow-lg shadow-brand-primary/10 active:scale-95"
          >
            {t('nav.getStarted')}
          </button>
        </nav>
      </header>
      
      <main className="flex-1">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-br from-brand-secondary/5 to-transparent blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-brand-accent/5 to-transparent blur-3xl -z-10"></div>

        {/* Hero Section */}
        <section className="pt-24 pb-20 md:pt-40 md:pb-32 px-6 max-w-6xl mx-auto text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-secondary/5 border border-brand-secondary/10 text-brand-secondary text-[10px] font-bold uppercase tracking-widest mb-10">
              Professional Funding Ecosystem
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-primary mb-8 leading-tight">
              {t('hero.title1')} <br className="hidden sm:block" />
              <span className="text-brand-secondary">{t('hero.title2')}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button 
                onClick={() => onNavigate('startup')} 
                className="flex items-center justify-center gap-3 bg-brand-primary text-white px-10 py-5 rounded-2xl font-bold hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/10 hover:-translate-y-1 text-lg w-full sm:w-auto"
              >
                <Rocket className="w-5 h-5" />
                {t('hero.btn.startup')}
              </button>
              <button 
                onClick={() => onNavigate('bank')} 
                className="flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-brand-primary px-10 py-5 rounded-2xl font-bold hover:border-brand-primary transition-all hover:-translate-y-1 text-lg w-full sm:w-auto shadow-sm"
              >
                <Building2 className="w-5 h-5" />
                {t('hero.btn.bank')}
              </button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-32 bg-white relative">
          <div className="absolute inset-0 bg-slate-50/50 -skew-y-3 origin-center scale-x-110 -z-10"></div>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Target className="w-6 h-6" />,
                  title: t('feat1.title'),
                  desc: t('feat1.desc'),
                  accent: 'bg-indigo-50 border-indigo-100 text-indigo-600'
                },
                {
                  icon: <ShieldCheck className="w-6 h-6" />,
                  title: t('feat2.title'),
                  desc: t('feat2.desc'),
                  accent: 'bg-emerald-50 border-emerald-100 text-emerald-600'
                },
                {
                  icon: <Star className="w-6 h-6" />,
                  title: t('feat3.title'),
                  desc: t('feat3.desc'),
                  accent: 'bg-amber-50 border-amber-100 text-amber-600'
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }} 
                  className="group bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand-primary/5 transition-all hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className={`w-14 h-14 rounded-3xl border flex items-center justify-center mb-8 ${feature.accent}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-brand-primary mb-4">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-lg">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-brand-primary">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-brand-secondary)_0%,_transparent_70%)]"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 tracking-tight leading-tight">{t('cta.title')}</h2>
            <button 
              onClick={() => onNavigate('startup')} 
              className="group inline-flex items-center gap-4 bg-brand-secondary text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all text-lg shadow-xl shadow-brand-secondary/20"
            >
              {t('cta.btn')}
              <ArrowRight className={`w-6 h-6 group-hover:translate-x-2 transition-transform ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-3 text-brand-primary">
            <div className="bg-brand-secondary p-1.5 rounded-lg text-white">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase">{t('app.name')}</span>
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-brand-secondary transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-secondary transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-secondary transition-colors">Contact</a>
          </div>
          <p className="text-slate-400 text-sm font-medium">{t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  );
}
