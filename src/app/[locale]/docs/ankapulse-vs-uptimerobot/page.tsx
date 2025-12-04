import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { CheckCircle, XCircle, AlertCircle, Clock, DollarSign, Zap, Globe, Bell, BarChart3, Shield } from 'lucide-react';
import { LocaleLink } from '@/components/locale-link';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  
  const titles = {
    es: "AnkaPulse vs UptimeRobot: Comparación Completa 2024 | Guía Definitiva",
    en: "AnkaPulse vs UptimeRobot: Complete 2024 Comparison | Definitive Guide"
  };

  const descriptions = {
    es: "Comparación detallada entre AnkaPulse y UptimeRobot: características, precios, pros y contras. Descubre cuál es mejor para tu proyecto en 2024.",
    en: "Detailed comparison between AnkaPulse and UptimeRobot: features, pricing, pros and cons. Discover which is better for your project in 2024."
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://ankapulse.app/${locale}/docs/ankapulse-vs-uptimerobot`,
      languages: {
        es: '/es/docs/ankapulse-vs-uptimerobot',
        en: '/en/docs/ankapulse-vs-uptimerobot'
      }
    },
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      type: 'article',
    }
  };
}

export default function AnkaPulseVsUptimeRobotPage() {
  const t = useTranslations('docs.comparison');

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

      {/* Quick Summary */}
      <div className="mb-12 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          {t('quickSummary.title')}
        </h2>
        <p className="mb-4">{t('quickSummary.text')}</p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-card rounded-lg border">
            <p className="font-semibold mb-2">✅ {t('quickSummary.chooseAnkapulse')}</p>
            <p className="text-sm text-muted-foreground">{t('quickSummary.ankapulseReason')}</p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <p className="font-semibold mb-2">⚠️ {t('quickSummary.chooseUptimerobot')}</p>
            <p className="text-sm text-muted-foreground">{t('quickSummary.uptimerobotReason')}</p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 bg-muted/50 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          {t('toc.title')}
        </h2>
        <ul className="space-y-2">
          <li><a href="#overview" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.overview')}</a></li>
          <li><a href="#comparison-table" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.comparisonTable')}</a></li>
          <li><a href="#pricing" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.pricing')}</a></li>
          <li><a href="#features" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.features')}</a></li>
          <li><a href="#pros-cons" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.prosCons')}</a></li>
          <li><a href="#use-cases" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.useCases')}</a></li>
          <li><a href="#verdict" className="text-primary hover:underline hover:text-primary/80 transition-colors">{t('toc.verdict')}</a></li>
        </ul>
      </nav>

      {/* Section 1: Overview */}
      <section id="overview" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6">{t('overview.title')}</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 border rounded-lg bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-2xl">🦅</div>
              <h3 className="text-xl font-bold">AnkaPulse</h3>
            </div>
            <p className="text-muted-foreground mb-4">{t('overview.ankapulse.description')}</p>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">{t('overview.founded')}:</span> {t('overview.ankapulse.founded')}</p>
              <p><span className="font-semibold">{t('overview.target')}:</span> {t('overview.ankapulse.target')}</p>
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-2xl">🤖</div>
              <h3 className="text-xl font-bold">UptimeRobot</h3>
            </div>
            <p className="text-muted-foreground mb-4">{t('overview.uptimerobot.description')}</p>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">{t('overview.founded')}:</span> {t('overview.uptimerobot.founded')}</p>
              <p><span className="font-semibold">{t('overview.target')}:</span> {t('overview.uptimerobot.target')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Comparison Table */}
      <section id="comparison-table" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6">{t('comparisonTable.title')}</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2">
                <th className="text-left p-4 font-semibold">{t('comparisonTable.feature')}</th>
                <th className="text-center p-4 font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <span>🦅</span>
                    <span>AnkaPulse</span>
                  </div>
                </th>
                <th className="text-center p-4 font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <span>🤖</span>
                    <span>UptimeRobot</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Free Plan */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{t('comparisonTable.rows.freePlan')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.ankapulse.freePlan')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.freePlan')}</td>
              </tr>

              {/* Free Checks */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{t('comparisonTable.rows.freeChecks')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.ankapulse.freeChecks')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.freeChecks')}</td>
              </tr>
              
              {/* Starter Price */}
              <tr className="border-b hover:bg-muted/30 bg-primary/5">
                <td className="p-4 font-medium">{t('comparisonTable.rows.starterPrice')}</td>
                <td className="p-4 text-center font-semibold text-success">{t('comparisonTable.values.ankapulse.starterPrice')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.starterPrice')}</td>
              </tr>

              {/* Starter Monitors */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{t('comparisonTable.rows.starterMonitors')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.ankapulse.starterMonitors')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.starterMonitors')}</td>
              </tr>
              
              {/* Check Frequency */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{t('comparisonTable.rows.checkFrequency')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.ankapulse.checkFrequency')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.checkFrequency')}</td>
              </tr>

              {/* Pro Plan */}
              <tr className="border-b hover:bg-muted/30 bg-primary/5">
                <td className="p-4 font-medium">{t('comparisonTable.rows.proPlan')}</td>
                <td className="p-4 text-center font-semibold text-success">{t('comparisonTable.values.ankapulse.proPlan')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.proPlan')}</td>
              </tr>

              {/* Pro Monitors */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{t('comparisonTable.rows.proMonitors')}</td>
                <td className="p-4 text-center font-semibold text-success">{t('comparisonTable.values.ankapulse.proMonitors')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.proMonitors')}</td>
              </tr>
              
              {/* Email Alerts */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{t('comparisonTable.rows.emailAlerts')}</td>
                <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
                <td className="p-4 text-center"><CheckCircle className="w-5 h-5 text-success mx-auto" /></td>
              </tr>
              
              {/* Telegram Alerts */}
              <tr className="border-b hover:bg-muted/30 bg-primary/5">
                <td className="p-4 font-medium">{t('comparisonTable.rows.telegramAlerts')}</td>
                <td className="p-4 text-center font-semibold text-success">{t('comparisonTable.values.ankapulse.telegramAlerts')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.telegramAlerts')}</td>
              </tr>
              
              {/* SMS Alerts */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{t('comparisonTable.rows.smsAlerts')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.ankapulse.smsAlerts')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.smsAlerts')}</td>
              </tr>
              
              {/* Status Page */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{t('comparisonTable.rows.statusPage')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.ankapulse.statusPage')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.statusPage')}</td>
              </tr>

              {/* API Access */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{t('comparisonTable.rows.apiAccess')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.ankapulse.apiAccess')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.apiAccess')}</td>
              </tr>
              
              {/* LATAM Payment */}
              <tr className="border-b hover:bg-muted/30 bg-primary/5">
                <td className="p-4 font-medium">{t('comparisonTable.rows.latamPayment')}</td>
                <td className="p-4 text-center font-semibold text-success">{t('comparisonTable.values.ankapulse.latamPayment')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.latamPayment')}</td>
              </tr>
              
              {/* Data Retention */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{t('comparisonTable.rows.dataRetentionPaid')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.ankapulse.dataRetentionPaid')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.dataRetentionPaid')}</td>
              </tr>

              {/* Support */}
              <tr className="border-b hover:bg-muted/30">
                <td className="p-4 font-medium">{t('comparisonTable.rows.support')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.ankapulse.support')}</td>
                <td className="p-4 text-center">{t('comparisonTable.values.uptimerobot.support')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Pricing Deep Dive */}
      <section id="pricing" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <DollarSign className="w-8 h-8 text-primary" />
          {t('pricing.title')}
        </h2>
        
        <p className="mb-8 text-lg text-muted-foreground">{t('pricing.intro')}</p>

        {/* Free Comparison */}
        <div className="mb-8 p-6 bg-muted/50 border-l-4 border-muted rounded-r-lg">
          <h3 className="text-xl font-semibold mb-3">{t('pricing.freeComparison.title')}</h3>
          <div className="space-y-2">
            <p className="text-sm">• {t('pricing.freeComparison.ankapulseFree')}</p>
            <p className="text-sm">• {t('pricing.freeComparison.uptimerobotFree')}</p>
            <p className="font-semibold text-sm mt-3">{t('pricing.freeComparison.verdict')}</p>
            <p className="text-sm text-muted-foreground italic">{t('pricing.freeComparison.but')}</p>
          </div>
        </div>

        {/* Starter Comparison */}
        <div className="mb-8 p-6 bg-success/10 border-l-4 border-success rounded-r-lg">
          <h3 className="text-xl font-semibold mb-3">{t('pricing.starterComparison.title')}</h3>
          <div className="space-y-2">
            <p className="text-sm">• {t('pricing.starterComparison.ankapulseStarter')}</p>
            <p className="text-sm">• {t('pricing.starterComparison.uptimerobotSolo')}</p>
            <p className="font-bold text-success mt-3">{t('pricing.starterComparison.savings')}</p>
            <p className="font-semibold text-sm">{t('pricing.starterComparison.verdict')}</p>
          </div>
        </div>

        {/* Pro Comparison */}
        <div className="mb-8 p-6 bg-primary/10 border-l-4 border-primary rounded-r-lg">
          <h3 className="text-xl font-semibold mb-3">{t('pricing.proComparison.title')}</h3>
          <div className="space-y-2">
            <p className="text-sm">• {t('pricing.proComparison.ankapulsePro')}</p>
            <p className="text-sm">• {t('pricing.proComparison.uptimerobotTeam')}</p>
            <p className="font-semibold text-sm mt-3">{t('pricing.proComparison.pricePerMonitor')}</p>
            <p className="text-sm ml-4">- {t('pricing.proComparison.ankapulseRate')}</p>
            <p className="text-sm ml-4">- {t('pricing.proComparison.uptimerobotRate')}</p>
            <p className="font-bold text-primary mt-3">{t('pricing.proComparison.savings')}</p>
            <p className="font-semibold text-sm">{t('pricing.proComparison.verdict')}</p>
          </div>
        </div>

        {/* LATAM Bonus */}
        <div className="mb-8 p-6 bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-500 rounded-r-lg">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-orange-500" />
            {t('pricing.latamBonus.title')}
          </h3>
          <p className="mb-3">{t('pricing.latamBonus.text')}</p>
          <p className="text-sm">✅ {t('pricing.latamBonus.mercadopago')}</p>
          <p className="text-sm text-muted-foreground mt-2">{t('pricing.latamBonus.comparison')}</p>
        </div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border-2 border-primary rounded-lg bg-card">
            <h3 className="text-2xl font-bold mb-4">AnkaPulse</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-lg">{t('pricing.ankapulse.free.title')}</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• {t('pricing.ankapulse.free.monitors')}</li>
                  <li>• {t('pricing.ankapulse.free.frequency')}</li>
                  <li>• {t('pricing.ankapulse.free.retention')}</li>
                  <li>• {t('pricing.ankapulse.free.alerts')}</li>
                </ul>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="font-semibold text-lg">{t('pricing.ankapulse.starter.title')}</p>
                <p className="text-2xl font-bold text-primary mb-2">{t('pricing.ankapulse.starter.price')}</p>
                <ul className="space-y-1 text-sm">
                  <li>• {t('pricing.ankapulse.starter.monitors')}</li>
                  <li>• {t('pricing.ankapulse.starter.frequency')}</li>
                  <li>• {t('pricing.ankapulse.starter.telegram')}</li>
                  <li>• {t('pricing.ankapulse.starter.retention')}</li>
                  <li>• {t('pricing.ankapulse.starter.regions')}</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-lg">{t('pricing.ankapulse.pro.title')}</p>
                <p className="text-xl font-bold mb-2">{t('pricing.ankapulse.pro.price')}</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {t('pricing.ankapulse.pro.monitors')}</li>
                  <li>• {t('pricing.ankapulse.pro.everything')}</li>
                  <li>• {t('pricing.ankapulse.pro.retention')}</li>
                  <li>• {t('pricing.ankapulse.pro.api')}</li>
                  <li>• {t('pricing.ankapulse.pro.support')}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-2xl font-bold mb-4">UptimeRobot</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-lg">{t('pricing.uptimerobot.free.title')}</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• {t('pricing.uptimerobot.free.monitors')}</li>
                  <li>• {t('pricing.uptimerobot.free.frequency')}</li>
                  <li>• {t('pricing.uptimerobot.free.integrations')}</li>
                  <li>• {t('pricing.uptimerobot.free.statusPage')}</li>
                </ul>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold text-lg">{t('pricing.uptimerobot.solo.title')}</p>
                <p className="text-2xl font-bold mb-2">{t('pricing.uptimerobot.solo.price')}</p>
                <ul className="space-y-1 text-sm">
                  <li>• {t('pricing.uptimerobot.solo.monitors')}</li>
                  <li>• {t('pricing.uptimerobot.solo.frequency')}</li>
                  <li>• {t('pricing.uptimerobot.solo.integrations')}</li>
                  <li>• {t('pricing.uptimerobot.solo.note')}</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-lg">{t('pricing.uptimerobot.team.title')}</p>
                <p className="text-xl font-bold mb-2">{t('pricing.uptimerobot.team.price')}</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {t('pricing.uptimerobot.team.monitors')}</li>
                  <li>• {t('pricing.uptimerobot.team.frequency')}</li>
                  <li>• {t('pricing.uptimerobot.team.integrations')}</li>
                  <li>• {t('pricing.uptimerobot.team.seats')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Key Features */}
      <section id="features" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6">{t('features.title')}</h2>
        
        <div className="space-y-6">
          {/* Value Proposition */}
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-primary" />
              {t('features.valueProposition.title')}
            </h3>
            <p className="mb-4 text-muted-foreground">{t('features.valueProposition.description')}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <p className="font-semibold mb-2">🦅 AnkaPulse</p>
                <p className="text-sm">{t('features.valueProposition.ankapulse')}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">🤖 UptimeRobot</p>
                <p className="text-sm">{t('features.valueProposition.uptimerobot')}</p>
              </div>
            </div>
            <p className="mt-4 text-sm font-semibold text-primary">{t('features.valueProposition.difference')}</p>
          </div>

          {/* Check Frequency */}
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              {t('features.checkFrequency.title')}
            </h3>
            <p className="mb-4 text-muted-foreground">{t('features.checkFrequency.description')}</p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-semibold mb-2">{t('features.checkFrequency.equal')}</p>
              <p className="text-sm text-muted-foreground">{t('features.checkFrequency.note')}</p>
            </div>
          </div>

          {/* Scaling */}
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              {t('features.scaling.title')}
            </h3>
            <p className="mb-4 text-muted-foreground">{t('features.scaling.description')}</p>
            <div className="space-y-3">
              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <p className="font-semibold mb-2">🦅 AnkaPulse</p>
                <p className="text-sm">{t('features.scaling.ankapulse')}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">🤖 UptimeRobot</p>
                <p className="text-sm">{t('features.scaling.uptimerobot')}</p>
              </div>
              <p className="mt-4 text-sm font-semibold text-success">{t('features.scaling.verdict')}</p>
            </div>
          </div>

          {/* Alerts */}
          <div className="p-6 border rounded-lg bg-card">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary" />
              {t('features.alerts.title')}
            </h3>
            <p className="mb-4 text-muted-foreground">{t('features.alerts.description')}</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{t('features.alerts.email')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{t('features.alerts.telegram')}</p>
                  <p className="text-sm text-muted-foreground">{t('features.alerts.telegramDetail')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{t('features.alerts.slack')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">{t('features.alerts.sms')}</p>
                  <p className="text-sm text-muted-foreground">{t('features.alerts.smsDetail')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Pros & Cons */}
      <section id="pros-cons" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6">{t('prosCons.title')}</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* AnkaPulse */}
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>🦅</span>
              <span>AnkaPulse</span>
            </h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {t('prosCons.pros')}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.ankapulse.pros.1')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.ankapulse.pros.2')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.ankapulse.pros.3')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.ankapulse.pros.4')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.ankapulse.pros.5')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.ankapulse.pros.6')}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-orange-500 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {t('prosCons.cons')}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.ankapulse.cons.1')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.ankapulse.cons.2')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.ankapulse.cons.3')}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* UptimeRobot */}
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>🤖</span>
              <span>UptimeRobot</span>
            </h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {t('prosCons.pros')}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.uptimerobot.pros.1')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.uptimerobot.pros.2')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.uptimerobot.pros.3')}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-destructive mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                {t('prosCons.cons')}
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.uptimerobot.cons.1')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.uptimerobot.cons.2')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.uptimerobot.cons.3')}</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>{t('prosCons.uptimerobot.cons.4')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Use Cases */}
      <section id="use-cases" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6">{t('useCases.title')}</h2>
        
        <div className="space-y-6">
          <div className="p-6 border-l-4 border-primary rounded-r-lg bg-card">
            <h3 className="text-xl font-semibold mb-3">{t('useCases.chooseAnkapulse.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                <span>{t('useCases.chooseAnkapulse.case1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                <span>{t('useCases.chooseAnkapulse.case2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                <span>{t('useCases.chooseAnkapulse.case3')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                <span>{t('useCases.chooseAnkapulse.case4')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                <span>{t('useCases.chooseAnkapulse.case5')}</span>
              </li>
            </ul>
          </div>

          <div className="p-6 border-l-4 border-blue-500 rounded-r-lg bg-card">
            <h3 className="text-xl font-semibold mb-3">{t('useCases.chooseUptimerobot.title')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>{t('useCases.chooseUptimerobot.case1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>{t('useCases.chooseUptimerobot.case2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <span>{t('useCases.chooseUptimerobot.case3')}</span>
              </li>
            </ul>
          </div>

          {/* Real Examples */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="p-5 bg-muted rounded-lg">
              <p className="font-semibold mb-2">💼 {t('useCases.examples.startup.title')}</p>
              <p className="text-sm text-muted-foreground">{t('useCases.examples.startup.description')}</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <p className="font-semibold mb-2">📈 {t('useCases.examples.growing.title')}</p>
              <p className="text-sm text-muted-foreground">{t('useCases.examples.growing.description')}</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <p className="font-semibold mb-2">👨‍💻 {t('useCases.examples.freelancer.title')}</p>
              <p className="text-sm text-muted-foreground">{t('useCases.examples.freelancer.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Final Verdict */}
      <section id="verdict" className="mb-16 scroll-mt-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          {t('verdict.title')}
        </h2>
        
        <div className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary">
          <p className="text-lg mb-6">{t('verdict.summary')}</p>
          
          <div className="space-y-6 mb-6">
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-bold text-lg mb-3 text-success">{t('verdict.forPaid.title')}</h3>
              <p className="mb-3">{t('verdict.forPaid.text')}</p>
              <ul className="space-y-2 text-sm">
                <li>{t('verdict.forPaid.starter')}</li>
                <li>{t('verdict.forPaid.pro')}</li>
                <li>{t('verdict.forPaid.scaling')}</li>
              </ul>
            </div>
            
            <div className="p-5 bg-card rounded-lg border">
              <h3 className="font-bold text-lg mb-3 text-blue-500">{t('verdict.forFree.title')}</h3>
              <p className="mb-2">{t('verdict.forFree.text')}</p>
              <p className="text-sm text-muted-foreground italic">{t('verdict.forFree.but')}</p>
            </div>

            <div className="p-5 bg-primary/10 rounded-lg border border-primary">
              <h3 className="font-bold text-lg mb-3">{t('verdict.recommendation.title')}</h3>
              <p className="text-sm">{t('verdict.recommendation.text')}</p>
            </div>
          </div>

          <div className="text-center">
            <LocaleLink 
              href="/plans"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-bold text-lg"
            >
              {t('verdict.cta')}
              <Zap className="w-5 h-5" />
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="mt-16 p-8 bg-gradient-to-br from-muted/50 to-muted rounded-xl border">
        <h2 className="text-2xl font-bold mb-4">{t('conclusion.title')}</h2>
        <p className="text-lg leading-relaxed mb-4">{t('conclusion.text')}</p>
        <p className="text-muted-foreground italic">{t('conclusion.final')}</p>
      </section>
    </div>
  );
}