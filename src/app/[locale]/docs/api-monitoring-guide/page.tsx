import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { CheckCircle, AlertTriangle, Clock, Server, Bell, BarChart3, Zap, Shield } from 'lucide-react';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    es: "Guía Completa: Monitoreo de APIs y Servicios REST/GraphQL 2025 | AnkaPulse",
    en: "Complete Guide: API Monitoring and REST/GraphQL Services 2025 | AnkaPulse"
  };

  const descriptions = {
    es: "Aprende todo sobre monitoreo de APIs: uptime, latencia, alertas y mejores prácticas. Guía completa en español para desarrolladores.",
    en: "Learn everything about API monitoring: uptime, latency, alerts and best practices. Complete guide for developers."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://ankapulse.app/${locale}/docs/api-monitoring-guide`,
      languages: {
        es: '/es/docs/api-monitoring-guide',
        en: '/en/docs/api-monitoring-guide'
      }
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: 'article',
    }
  };
}

export default function ApiMonitoringGuidePage() {
  const t = useTranslations('docs.apiMonitoringGuide');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {t('category')}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {t('readTime')}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">{t('description')}</p>
      </header>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 bg-muted/50 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          {t('toc.title')}
        </h2>
        <ul className="space-y-2">
          <li><a href="#what-is" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.whatIs')}</a></li>
          <li><a href="#types" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.types')}</a></li>
          <li><a href="#glossary" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.glossary')}</a></li>
          <li><a href="#setup" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.setup')}</a></li>
          <li><a href="#best-practices" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.bestPractices')}</a></li>
          <li><a href="#tools" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.tools')}</a></li>
        </ul>
      </nav>

      {/* Section 1: What is API Monitoring */}
      <section id="what-is" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Server className="w-8 h-8 text-primary" />
          {t('whatIs.title')}
        </h2>
        <p className="mb-4 text-lg leading-relaxed">{t('whatIs.intro')}</p>
        <p className="mb-6 text-lg leading-relaxed">{t('whatIs.definition')}</p>
        
        <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-6">
          <p className="text-sm italic">{t('whatIs.quote')}</p>
        </div>

        <h3 className="text-2xl font-semibold mb-4 mt-8">{t('whatIs.whyImportant')}</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
            <span>{t('whatIs.reason1')}</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
            <span>{t('whatIs.reason2')}</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
            <span>{t('whatIs.reason3')}</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
            <span>{t('whatIs.reason4')}</span>
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4 mt-8">{t('whatIs.useCases')}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-card">
            <h4 className="font-semibold mb-2">💼 {t('whatIs.useCase1Title')}</h4>
            <p className="text-sm text-muted-foreground">{t('whatIs.useCase1')}</p>
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <h4 className="font-semibold mb-2">🚀 {t('whatIs.useCase2Title')}</h4>
            <p className="text-sm text-muted-foreground">{t('whatIs.useCase2')}</p>
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <h4 className="font-semibold mb-2">🛒 {t('whatIs.useCase3Title')}</h4>
            <p className="text-sm text-muted-foreground">{t('whatIs.useCase3')}</p>
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <h4 className="font-semibold mb-2">🔗 {t('whatIs.useCase4Title')}</h4>
            <p className="text-sm text-muted-foreground">{t('whatIs.useCase4')}</p>
          </div>
        </div>
      </section>

      {/* Section 2: Types of Monitoring */}
      <section id="types" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" />
          {t('types.title')}
        </h2>
        
        <div className="space-y-6">
          <div className="p-6 border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('types.uptime.title')}</h3>
                <p className="mb-3 text-muted-foreground">{t('types.uptime.description')}</p>
                <div className="bg-muted/50 p-3 rounded text-sm">
                  <span className="font-mono">{t('types.uptime.example')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('types.performance.title')}</h3>
                <p className="mb-3 text-muted-foreground">{t('types.performance.description')}</p>
                <div className="bg-muted/50 p-3 rounded text-sm">
                  <span className="font-mono">{t('types.performance.example')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('types.errors.title')}</h3>
                <p className="mb-3 text-muted-foreground">{t('types.errors.description')}</p>
                <div className="bg-muted/50 p-3 rounded text-sm">
                  <span className="font-mono">{t('types.errors.example')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{t('types.health.title')}</h3>
                <p className="mb-3 text-muted-foreground">{t('types.health.description')}</p>
                <div className="bg-muted/50 p-3 rounded text-sm">
                  <span className="font-mono">{t('types.health.example')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Glossary */}
      <section id="glossary" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6">{t('glossary.title')}</h2>
        <p className="mb-6 text-lg text-muted-foreground">{t('glossary.intro')}</p>
        
        <div className="space-y-4">
          {['uptime', 'downtime', 'latency', 'responseTime', 'checkInterval', 'statusCodes', 'alerts', 'statusPage'].map((term) => (
            <div key={term} className="p-5 bg-muted/50 rounded-lg border border-border/50">
              <h4 className="font-semibold text-lg mb-2 text-foreground">{t(`glossary.terms.${term}.title`)}</h4>
              <p className="text-muted-foreground">{t(`glossary.terms.${term}.definition`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Setup Guide */}
      <section id="setup" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6">{t('setup.title')}</h2>
        <p className="mb-8 text-lg text-muted-foreground">{t('setup.intro')}</p>

        <div className="space-y-8">
          <div className="relative pl-8 border-l-2 border-primary/30">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
            <h3 className="text-xl font-semibold mb-3">{t('setup.step1.title')}</h3>
            <p className="mb-4 text-muted-foreground">{t('setup.step1.description')}</p>
            <div className="bg-muted p-4 rounded-lg border">
              <pre className="text-sm overflow-x-auto"><code>{t('setup.step1.code')}</code></pre>
            </div>
          </div>

          <div className="relative pl-8 border-l-2 border-primary/30">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
            <h3 className="text-xl font-semibold mb-3">{t('setup.step2.title')}</h3>
            <p className="mb-4 text-muted-foreground">{t('setup.step2.description')}</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>{t('setup.step2.item1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>{t('setup.step2.item2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <span>{t('setup.step2.item3')}</span>
              </li>
            </ul>
          </div>

          <div className="relative pl-8 border-l-2 border-primary/30">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
            <h3 className="text-xl font-semibold mb-3">{t('setup.step3.title')}</h3>
            <p className="text-muted-foreground">{t('setup.step3.description')}</p>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
            <h3 className="text-xl font-semibold mb-3">{t('setup.step4.title')}</h3>
            <p className="text-muted-foreground">{t('setup.step4.description')}</p>
          </div>
        </div>
      </section>

      {/* Section 5: Best Practices */}
      <section id="best-practices" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Bell className="w-8 h-8 text-primary" />
          {t('bestPractices.title')}
        </h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">{t('bestPractices.frequency.title')}</h3>
            <p className="mb-4 text-muted-foreground">{t('bestPractices.frequency.description')}</p>
            <div className="bg-card border rounded-lg p-5">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <span>{t('bestPractices.frequency.tip1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <span>{t('bestPractices.frequency.tip2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <span>{t('bestPractices.frequency.tip3')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t('bestPractices.endpoints.title')}</h3>
            <p className="mb-4 text-muted-foreground">{t('bestPractices.endpoints.description')}</p>
            <div className="bg-card border rounded-lg p-5">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('bestPractices.endpoints.tip1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('bestPractices.endpoints.tip2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('bestPractices.endpoints.tip3')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('bestPractices.endpoints.tip4')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t('bestPractices.alerts.title')}</h3>
            <p className="mb-4 text-muted-foreground">{t('bestPractices.alerts.description')}</p>
            <div className="bg-card border rounded-lg p-5">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{t('bestPractices.alerts.tip1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{t('bestPractices.alerts.tip2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{t('bestPractices.alerts.tip3')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">{t('bestPractices.retention.title')}</h3>
            <p className="mb-4 text-muted-foreground">{t('bestPractices.retention.description')}</p>
            <div className="bg-card border rounded-lg p-5">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{t('bestPractices.retention.tip1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{t('bestPractices.retention.tip2')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Tools */}
      <section id="tools" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6">{t('tools.title')}</h2>
        <p className="mb-8 text-lg text-muted-foreground">{t('tools.intro')}</p>
        
        <div className="p-8 border-2 border-primary rounded-xl bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center text-3xl flex-shrink-0">
              🦅
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">AnkaPulse</h3>
              <p className="text-muted-foreground">{t('tools.ankapulse')}</p>
            </div>
          </div>
          <a 
            href="/plans" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            {t('tools.cta')}
            <CheckCircle className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mt-16 p-8 bg-gradient-to-br from-muted/50 to-muted rounded-xl border">
        <h2 className="text-2xl font-bold mb-4">{t('conclusion.title')}</h2>
        <p className="text-lg leading-relaxed mb-4">{t('conclusion.text')}</p>
        <p className="text-muted-foreground">{t('conclusion.cta')}</p>
      </section>
    </div>
  );
}