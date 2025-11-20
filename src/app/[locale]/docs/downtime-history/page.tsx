'use client';

import { AlertTriangle, Clock, DollarSign, TrendingUp, Zap, Building, Plane, Facebook, ShoppingCart, BarChart3 } from 'lucide-react';
import { LocaleLink as Link } from '@/components/locale-link';
import { useTranslations } from 'next-intl';

export default function DowntimeHistoryPage() {
  const t = useTranslations('docs.downtimeHistoryPage');
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground mb-4">
          {t('subtitle')}
        </p>
      </div>

      {/* Intro */}
      <div className="bg-card border rounded-lg p-8 mb-12">
        <p className="text-muted-foreground mb-4">
          {t('intro.p1')}
        </p>
        <p className="text-muted-foreground mb-4">
          {t('intro.p2')}
        </p>
        <p className="text-muted-foreground">
          {t('intro.p3')}{' '}
          <strong className="text-foreground">{t('intro.p3Bold')}</strong>
          {t('intro.p3End')}
        </p>
      </div>

      {/* Case 1: Amazon */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-orange-500" />
          {t('amazon.title')}
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">
            {t('amazon.story.title')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('amazon.story.p1')}
          </p>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
            <ul className="text-sm space-y-1">
              <li><strong>{t('amazon.story.timeline.start')}</strong></li>
              <li><strong>{t('amazon.story.timeline.crash')}</strong></li>
            </ul>
          </div>
          <p className="text-muted-foreground mb-4">
            {t('amazon.story.p2')}
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">{t('amazon.story.problem')}</strong>{' '}
            {t('amazon.story.problemDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-destructive" />
              {t('amazon.numbers.title')}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">{t('amazon.numbers.loss')}</strong></li>
              <li><strong className="text-foreground">{t('amazon.numbers.duration')}</strong></li>
              <li><strong className="text-foreground">{t('amazon.numbers.users')}</strong></li>
              <li><strong className="text-foreground">{t('amazon.numbers.stocks')}</strong></li>
            </ul>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mt-4">
              <p className="text-sm font-semibold text-destructive">
                {t('amazon.numbers.perMinute')}
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">
              {t('amazon.lesson.title')}
            </h4>
            <p className="text-muted-foreground mb-4 text-sm">
              {t('amazon.lesson.p1')}
            </p>
            <p className="text-muted-foreground text-sm">
              {t('amazon.lesson.p2')}{' '}
              <strong className="text-foreground">{t('amazon.lesson.p2Bold')}</strong>
              {t('amazon.lesson.p2End')}
            </p>
          </div>
        </div>

        <div className="bg-accent/30 border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-3">
            {t('amazon.apply.title')}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t('amazon.apply.items.1')}</li>
              <li>• {t('amazon.apply.items.2')}</li>
              <li>• {t('amazon.apply.items.3')}</li>
            </ul>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t('amazon.apply.items.4')}</li>
              <li>• {t('amazon.apply.items.5')}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Case 2: Facebook */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Facebook className="w-6 h-6 text-blue-500" />
          {t('facebook.title')}
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">
            {t('facebook.story.title')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('facebook.story.p1')}{' '}
            <strong className="text-foreground">{t('facebook.story.literally')}</strong>
          </p>
          <p className="text-muted-foreground mb-4">
            {t('facebook.story.p2')}
          </p>
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{t('facebook.story.problem')}</strong>{' '}
              {t('facebook.story.problemDesc')}
            </p>
          </div>
          <p className="text-muted-foreground">
            <strong className="text-destructive">{t('facebook.story.worst')}</strong>{' '}
            {t('facebook.story.worstDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">
              {t('facebook.numbers.title')}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">{t('facebook.numbers.loss')}</strong></li>
              <li><strong className="text-foreground">{t('facebook.numbers.duration')}</strong></li>
              <li><strong className="text-foreground">{t('facebook.numbers.users')}</strong></li>
              <li><strong className="text-foreground">{t('facebook.numbers.stocks')}</strong></li>
              <li><strong className="text-foreground">{t('facebook.numbers.value')}</strong></li>
            </ul>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mt-4">
              <p className="text-sm font-semibold text-destructive">
                {t('facebook.numbers.zuck')}
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">
              {t('facebook.lesson.title')}
            </h4>
            <p className="text-muted-foreground mb-4 text-sm">
              {t('facebook.lesson.p1')}
            </p>
            <p className="text-muted-foreground text-sm">
              <strong className="text-foreground">{t('facebook.lesson.conclusion')}</strong>{' '}
              {t('facebook.lesson.conclusionDesc')}
            </p>
          </div>
        </div>
      </div>
      {/* Case 3: British Airways */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Plane className="w-6 h-6 text-blue-600" />
          {t('britishAirways.title')}
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">
            {t('britishAirways.story.title')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('britishAirways.story.p1')}
          </p>
          <p className="text-muted-foreground mb-4">
            {t('britishAirways.story.p2')}
          </p>
          <p className="text-muted-foreground">
            <strong className="text-destructive">{t('britishAirways.story.result')}</strong>{' '}
            {t('britishAirways.story.resultDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">
              {t('britishAirways.numbers.title')}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">{t('britishAirways.numbers.cost')}</strong></li>
              <li><strong className="text-foreground">{t('britishAirways.numbers.flights')}</strong></li>
              <li><strong className="text-foreground">{t('britishAirways.numbers.passengers')}</strong></li>
              <li><strong className="text-foreground">{t('britishAirways.numbers.duration')}</strong></li>
              <li><strong className="text-foreground">{t('britishAirways.numbers.fine')}</strong></li>
            </ul>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">
              {t('britishAirways.lesson.title')}
            </h4>
            <p className="text-muted-foreground mb-4 text-sm">
              {t('britishAirways.lesson.p1')}
            </p>
            <p className="text-muted-foreground text-sm">
              {t('britishAirways.lesson.p2')}{' '}
              <strong className="text-foreground">{t('britishAirways.lesson.conclusion')}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Case 4: Delta Airlines */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Plane className="w-6 h-6 text-red-500" />
          {t('delta.title')}
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">
            {t('delta.story.title')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('delta.story.p1')}
          </p>
          <p className="text-muted-foreground mb-4">
            {t('delta.story.p2')}{' '}
            <strong className="text-destructive">{t('delta.story.fails')}</strong>
            {t('delta.story.p2End')}
          </p>
          <p className="text-muted-foreground">
            {t('delta.story.p3')}
          </p>
        </div>

        <div className="bg-warning/10 border border-warning/20 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-foreground mb-3">
            {t('delta.lesson.title')}
          </h4>
          <p className="text-muted-foreground text-sm mb-3">
            {t('delta.lesson.p1')}
          </p>
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">{t('delta.lesson.p2')}</strong>{' '}
            {t('delta.lesson.p2End')}
          </p>
        </div>
      </div>

      {/* Case 5: Knight Capital */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-green-500" />
          {t('knight.title')}
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">
            {t('knight.story.title')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('knight.story.p1')}
          </p>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-destructive">{t('knight.story.problem')}</strong>{' '}
              {t('knight.story.problemDesc')}
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            {t('knight.story.p2')}{' '}
            <strong className="text-foreground">{t('knight.story.seven')}</strong>{' '}
            {t('knight.story.p2End')}
          </p>
          <p className="text-muted-foreground">
            {t('knight.story.p3')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">
              {t('knight.numbers.title')}
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">{t('knight.numbers.loss')}</strong></li>
              <li><strong className="text-foreground">{t('knight.numbers.duration')}</strong></li>
              <li><strong className="text-foreground">{t('knight.numbers.volume')}</strong></li>
              <li><strong className="text-foreground">{t('knight.numbers.consequence')}</strong></li>
            </ul>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mt-4">
              <p className="text-sm font-semibold text-destructive">
                {t('knight.numbers.perMinute')}
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">
              {t('knight.lesson.title')}
            </h4>
            <p className="text-muted-foreground mb-4 text-sm">
              {t('knight.lesson.p1')}
            </p>
            <p className="text-muted-foreground text-sm">
              <strong className="text-foreground">{t('knight.lesson.conclusion')}</strong>{' '}
              {t('knight.lesson.conclusionDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Pattern */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-warning" />
          {t('pattern.title')}
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <p className="text-muted-foreground mb-4">{t('pattern.intro')}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2 text-muted-foreground">
              <li>• {t('pattern.items.1')}</li>
              <li>• {t('pattern.items.2')}</li>
              <li>• {t('pattern.items.3')}</li>
            </ul>
            <ul className="space-y-2 text-muted-foreground">
              <li>• {t('pattern.items.4')}</li>
              <li>• {t('pattern.items.5')}</li>
              <li>• <strong className="text-foreground">{t('pattern.items.6')}</strong></li>
            </ul>
          </div>
        </div>

        <div className="bg-success/10 border border-success/20 rounded-lg p-6">
          <p className="font-semibold text-success text-center">
            {t('pattern.goodNews')}
          </p>
        </div>
      </div>

      {/* Applied Lessons */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
          {t('appliedLessons.title')}
        </h2>
        
        <div className="bg-accent/30 border rounded-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            {t('appliedLessons.notAmazon.title')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('appliedLessons.notAmazon.p1')}
          </p>
          <p className="text-muted-foreground">
            {t('appliedLessons.notAmazon.p2')}
          </p>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-6">
          {t('appliedLessons.universal.title')}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {t('appliedLessons.universal.monitoring.title')}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t('appliedLessons.universal.monitoring.description')}
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3">
              {t('appliedLessons.universal.backups.title')}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t('appliedLessons.universal.backups.description')}
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3">
              {t('appliedLessons.universal.infrastructure.title')}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t('appliedLessons.universal.infrastructure.description')}
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3">
              {t('appliedLessons.universal.documentation.title')}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t('appliedLessons.universal.documentation.description')}
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3">
              {t('appliedLessons.universal.automation.title')}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t('appliedLessons.universal.automation.description')}
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3">
              {t('appliedLessons.universal.deployment.title')}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t('appliedLessons.universal.deployment.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Real Cost */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-destructive" />
          {t('realCost.title')}
        </h2>
        
        <div className="bg-card border rounded-lg p-8">
          <p className="text-muted-foreground mb-4">
            {t('realCost.intro')}
          </p>
          <h3 className="font-semibold text-foreground mb-4">{t('realCost.isTitle')}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-muted-foreground">
              <li>• {t('realCost.items.1')}</li>
              <li>• {t('realCost.items.2')}</li>
              <li>• {t('realCost.items.3')}</li>
              <li>• {t('realCost.items.4')}</li>
            </ul>
            <ul className="space-y-2 text-muted-foreground">
              <li>• {t('realCost.items.5')}</li>
              <li>• {t('realCost.items.6')}</li>
              <li>• {t('realCost.items.7')}</li>
              <li>• {t('realCost.items.8')}</li>
            </ul>
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mt-6">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">{t('realCost.comparison.amazon')}</strong><br />
              <strong className="text-destructive">{t('realCost.comparison.startup')}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          {t('conclusion.title')}
        </h2>
        
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
          <p className="text-muted-foreground mb-4">
            {t('conclusion.intro')}
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ul className="space-y-2 text-muted-foreground">
              <li>✅ {t('conclusion.points.1')}</li>
              <li>✅ {t('conclusion.points.2')}</li>
            </ul>
            <ul className="space-y-2 text-muted-foreground">
              <li>✅ {t('conclusion.points.3')}</li>
              <li>✅ {t('conclusion.points.4')}</li>
            </ul>
          </div>
          <p className="text-muted-foreground mb-4">
            {t('conclusion.need')}
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {t('conclusion.items.1')}</li>
              <li>• {t('conclusion.items.2')}</li>
            </ul>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {t('conclusion.items.3')}</li>
              <li>• {t('conclusion.items.4')}</li>
            </ul>
          </div>
          <div className="text-center bg-card border rounded-lg p-4">
            <p className="font-semibold text-foreground">
              {t('conclusion.final.main')}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {t('conclusion.final.sub')}
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-primary/5 border border-primary/20 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          {t('cta.title')}
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          {t('cta.subtitle')}
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