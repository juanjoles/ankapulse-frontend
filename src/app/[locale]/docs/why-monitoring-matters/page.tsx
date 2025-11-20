'use client';

import { AlertTriangle, Clock, DollarSign, TrendingUp, Shield, Zap, Target, CheckCircle } from 'lucide-react';
import { LocaleLink as Link } from '@/components/locale-link';
import { useTranslations } from 'next-intl';

export default function WhyMonitoringMattersPage() {
  const t = useTranslations('docs.whyMonitoringPage');
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('subtitle')}
        </p>
      </div>

      {/* Intro */}
      <div className="bg-card border rounded-lg p-8 mb-12">
        <p className="text-muted-foreground mb-4">
          {t('intro')}
        </p>
      </div>

      {/* El costo del downtime */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-destructive" />
          {t('costDowntime.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-destructive" />
              {t('costDowntime.economic.title')}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t('costDowntime.economic.description')}
            </p>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h4 className="font-semibold text-card-foreground mb-2">
                {t('costDowntime.economic.examplesTitle')}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>{t('costDowntime.economic.payment')}</strong></li>
                <li>• <strong>{t('costDowntime.economic.auth')}</strong></li>
                <li>• <strong>{t('costDowntime.economic.thirdParty')}</strong></li>
              </ul>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              {t('costDowntime.reputation.title')}
            </h3>
            <p className="text-muted-foreground">
              {t('costDowntime.reputation.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Detección temprana */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
          {t('earlyDetection.title')}
        </h2>

        <div className="bg-accent/30 border rounded-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {t('earlyDetection.beforeUsers.title')}
          </h3>
          <p className="text-muted-foreground mb-6">
            {t('earlyDetection.beforeUsers.description')}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h4 className="font-semibold text-destructive mb-2">
                {t('earlyDetection.beforeUsers.without.title')}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>{t('earlyDetection.beforeUsers.without.timeline.1')}</li>
                <li>{t('earlyDetection.beforeUsers.without.timeline.2')}</li>
                <li>{t('earlyDetection.beforeUsers.without.timeline.3')}</li>
                <li>{t('earlyDetection.beforeUsers.without.timeline.4')}</li>
                <li>{t('earlyDetection.beforeUsers.without.timeline.5')}</li>
              </ul>
              <p className="font-semibold text-destructive mt-2">
                {t('earlyDetection.beforeUsers.without.downTotal')}
              </p>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <h4 className="font-semibold text-success mb-2">
                {t('earlyDetection.beforeUsers.with.title')}
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>{t('earlyDetection.beforeUsers.with.timeline.1')}</li>
                <li>{t('earlyDetection.beforeUsers.with.timeline.2')}</li>
                <li>{t('earlyDetection.beforeUsers.with.timeline.3')}</li>
                <li>{t('earlyDetection.beforeUsers.with.timeline.4')}</li>
              </ul>
              <p className="font-semibold text-success mt-2">
                {t('earlyDetection.beforeUsers.with.downTotal')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            {t('earlyDetection.beyond.title')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('earlyDetection.beyond.description')}
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-card-foreground mb-1">
                {t('earlyDetection.beyond.responseTime.title')}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t('earlyDetection.beyond.responseTime.description')}
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-card-foreground mb-1">
                {t('earlyDetection.beyond.statusCodes.title')}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t('earlyDetection.beyond.statusCodes.description')}
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-card-foreground mb-1">
                {t('earlyDetection.beyond.validContent.title')}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t('earlyDetection.beyond.validContent.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Para LATAM */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Target className="w-6 h-6 text-primary" />
          {t('latam.title')}
        </h2>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {t('latam.context.title')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('latam.context.description')}
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-semibold text-card-foreground mb-2">
                {t('latam.context.infrastructure.title')}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t('latam.context.infrastructure.description')}
              </p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-semibold text-card-foreground mb-2">
                {t('latam.context.thirdParty.title')}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t('latam.context.thirdParty.description')}
              </p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-semibold text-card-foreground mb-2">
                {t('latam.context.resources.title')}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t('latam.context.resources.description')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-accent/30 border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t('latam.credibility.title')}
          </h3>
          <p className="text-muted-foreground">
            {t('latam.credibility.description')}{' '}
            <strong className="text-foreground">{t('latam.credibility.quote')}</strong>{' '}
            {t('latam.credibility.vs')}{' '}
            <em>{t('latam.credibility.bad')}</em>.
          </p>
        </div>
      </div>

      {/* ROI del monitoreo */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-success" />
          {t('roi.title')}
        </h2>

        <div className="bg-success/10 border border-success/20 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {t('roi.calculation.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground mb-4">
                {t('roi.calculation.description')}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">{t('roi.calculation.cost')}</strong></li>
                <li><strong className="text-foreground">{t('roi.calculation.avoided')}</strong></li>
                <li><strong className="text-foreground">{t('roi.calculation.loss')}</strong></li>
                <li><strong className="text-success text-lg">{t('roi.calculation.result')}</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                {t('roi.intangible.title')}
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✅ {t('roi.intangible.sleep')}</li>
                <li>✅ {t('roi.intangible.productive')}</li>
                <li>✅ {t('roi.intangible.confidence')}</li>
                <li>✅ {t('roi.intangible.data')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-primary/5 border border-primary/20 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          {t('cta.title')}
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          <strong className="text-foreground">{t('cta.subtitle')}</strong>
        </p>
        <p className="text-muted-foreground mb-6">
          {t('cta.description')}
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          {t('cta.button')}
        </Link>
        <p className="text-sm text-muted-foreground mt-4">
          {t('cta.footer')}
        </p>
      </div>
    </div>
  );
}