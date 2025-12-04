import { LocaleLink as Link } from '@/components/locale-link';
import { CheckCircle, Globe, TrendingUp } from 'lucide-react';
import { NavbarClient } from '@/components/navbar-client';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('landing');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 transition-colors">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <NavbarClient />
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t('hero.title').split(t('hero.titleHighlight'))[0]}
            <span className="text-primary">{t('hero.titleHighlight')}</span>
            {t('hero.title').split(t('hero.titleHighlight'))[1]}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <Link 
              href="/register" 
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {t('hero.ctaPrimary')}
            </Link> */}
            <Link 
              href="/plans" 
              className="border border-border text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-colors"
            >
              {t('hero.ctaSecondary')}
            </Link>
            <Link 
              href="/docs/about" 
              className="border border-border text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-colors"
            >
              {t('hero.about')}
            </Link>
            <Link 
              href="/docs" 
              className="border border-border text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-colors"
            >
              {t('hero.docs')}
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {t('features.reliable.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('features.reliable.description')}
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {t('features.global.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('features.global.description')}
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {t('features.analytics.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('features.analytics.description')}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-border">
        <div className="text-center text-muted-foreground">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}