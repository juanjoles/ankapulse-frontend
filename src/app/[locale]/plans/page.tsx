'use client';

import { Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LocaleLink as Link } from '@/components/locale-link';
import { NavbarClient } from '@/components/navbar-client';
import { useTranslations } from 'next-intl';

export default function PublicPlansPage() {
  const t = useTranslations('plans');
  
  const plans = [
    {
      type: 'free',
      name: t('free.name'),
      price: 0,
      features: [
        t('free.features.checks'),
        t('free.features.interval'),
        t('free.features.emailAlerts'),
        t('free.features.statusPage'),
        t('free.features.retention'),
        t('free.features.region')
      ],
      limitations: [
        t('free.limitations.noSlack'),
        t('free.limitations.noApi'),
        t('free.limitations.noAdvanced')
      ]
    },
    {
      type: 'starter',
      name: t('starter.name'),
      price: 5,
      popular: true,
      features: [
        t('starter.features.checks'),
        t('starter.features.interval'),
        t('starter.features.emailAlerts'),
        t('starter.features.telegramAlerts'),
        t('starter.features.statusPage'),
        t('starter.features.retention'),
        t('starter.features.regions'),
        t('starter.features.api')
      ],
      limitations: [
        t('starter.limitations.noWebhooks'),
        t('starter.limitations.noSla')
      ]
    },
    {
      type: 'pro',
      name: t('pro.name'),
      price: 15,
      features: [
        t('pro.features.checks'),
        t('pro.features.interval'),
        t('pro.features.allAlerts'),
        t('pro.features.statusPage'),
        t('pro.features.retention'),
        t('pro.features.allRegions'),
        t('pro.features.api'),
        t('pro.features.webhooks'),
        t('pro.features.sla'),
        t('pro.features.support')
      ],
      limitations: []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 transition-colors">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <NavbarClient />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.type}
                className={`relative transition-all hover:shadow-lg ${
                  plan.popular 
                    ? 'border-2 border-primary shadow-lg scale-105' 
                    : 'border border-border'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm">
                      {t('popular')}
                    </Badge>
                  </div>
                )}

                <CardContent className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2 text-card-foreground">
                      {plan.name}
                    </h3>
                    <div className="text-4xl font-bold mb-4 text-card-foreground">
                      ${plan.price}
                      <span className="text-lg font-normal text-muted-foreground">
                        {t('perMonth')}
                      </span>
                    </div>
                    {plan.price === 0 && (
                      <p className="text-sm text-muted-foreground">
                        {t('perfectStart')}
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="w-5 h-5 text-success mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-card-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, idx) => (
                      <div key={idx} className="flex items-start opacity-60">
                        <X className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link
                    href="/register"
                    className={`w-full py-3 rounded-lg font-semibold transition-colors text-center block ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-card-foreground text-card hover:bg-card-foreground/90'
                    }`}
                  >
                    {plan.price === 0 ? t('startFree') : t('choosePlan')}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Options */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t('payment.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('payment.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-lg border border-border text-center">
                <div className="text-4xl mb-3">💳</div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {t('payment.creditCard.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('payment.creditCard.status')}
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-lg border border-border text-center">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {t('payment.mercadopago.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('payment.mercadopago.description')}
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-lg border border-border text-center">
                <div className="text-4xl mb-3">₿</div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {t('payment.crypto.title')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('payment.crypto.status')}
                </p>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {t('payment.footer')}
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              {t('faq.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-card-foreground">
                    {t('faq.q1.question')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('faq.q1.answer')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-card-foreground">
                    {t('faq.q2.question')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('faq.q2.answer')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-card-foreground">
                    {t('faq.q3.question')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('faq.q3.answer')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-card-foreground">
                    {t('faq.q4.question')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('faq.q4.answer')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 py-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('cta.subtitle')}
            </p>
            <Link
              href="/register"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-border">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2025 AnkaPulse. {t('footer')}</p>
        </div>
      </footer>
    </div>
  );
}