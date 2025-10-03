'use client';

import { Check, X, Mail } from 'lucide-react';
import { usePlan } from '@/hooks/usePlan';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const plans = [
  {
    type: 'free',
    name: 'Free',
    price: 0,
    features: [
      '10 checks',
      'Intervalo mínimo: 30 minutos',
      'Email alerts',
      '7 días retención',
      '1 región'
    ],
    limitations: [
      'Sin Slack/Discord',
      'Sin API access',
      'Sin métricas avanzadas'
    ]
  },
  {
    type: 'starter',
    name: 'Starter',
    price: 5,
    popular: true,
    features: [
      '20 checks',
      'Intervalo mínimo: 5 minutos',
      'Email + Telegram alerts',
      '30 días retención',
      '3 regiones',
      'API básica'
    ],
    limitations: [
      'Sin webhooks personalizados',
      'Sin SLA reports'
    ]
  },
  {
    type: 'pro',
    name: 'Pro',
    price: 15,
    features: [
      '50 checks',
      'Intervalo mínimo: 1 minuto',
      'Todos los canales de alerta',
      '90 días retención',
      'Todas las regiones',
      'API completa',
      'Webhooks personalizados',
      'SLA reports',
      'Soporte prioritario'
    ],
    limitations: []
  }
];

export default function PricingPage() {
  const { usage, createPreference } = usePlan();
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (planType: 'starter' | 'pro') => {
    setLoading(planType);
    await createPreference(planType);
    setLoading(null);
  };

  const currentPlan = usage?.plan?.type || 'free';

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Planes y Precios</h1>
        <p className="text-xl text-muted-foreground">
          Elige el plan que mejor se adapte a tus necesidades
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.type}
            className={`relative transition-all hover:shadow-lg ${
              plan.popular 
                ? 'border-2 border-primary shadow-lg' 
                : 'border border-border'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm">
                  Más Popular
                </Badge>
              </div>
            )}

            <CardContent className="p-8">
              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-card-foreground">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2 text-card-foreground">
                  ${plan.price}
                  <span className="text-lg font-normal text-muted-foreground">/mes</span>
                </div>
                {currentPlan === plan.type && (
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                    Plan Actual
                  </Badge>
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
              {plan.type === 'free' ? (
                currentPlan === 'free' ? (
                  <button 
                    className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-semibold cursor-not-allowed" 
                    disabled
                  >
                    Plan Actual
                  </button>
                ) : (
                  <button 
                    className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-semibold cursor-not-allowed" 
                    disabled
                  >
                    No disponible
                  </button>
                )
              ) : (
                <button
                  onClick={() => handleUpgrade(plan.type as 'starter' | 'pro')}
                  disabled={currentPlan === plan.type || loading !== null}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    currentPlan === plan.type
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {loading === plan.type
                    ? 'Procesando...'
                    : currentPlan === plan.type
                    ? 'Plan Actual'
                    : 'Actualizar Plan'}
                </button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enterprise Section */}
      <Card className="mt-16">
        <CardContent className="text-center p-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-card-foreground">¿Necesitas más?</h3>
            <p className="text-muted-foreground mb-6">
              Contactanos para planes enterprise personalizados con límites custom,
              SLA garantizado y soporte dedicado.
            </p>
            <button className="inline-flex items-center space-x-2 bg-card-foreground text-card px-8 py-3 rounded-lg font-semibold hover:bg-card-foreground/90 transition-colors">
              <Mail className="w-5 h-5" />
              <span>Contactar Ventas</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Current Usage Info - Solo mostrar si usage existe y tiene la estructura correcta */}
      {usage && usage.usage && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-card-foreground">Uso Actual</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-accent rounded-lg">
                <p className="text-2xl font-bold text-accent-foreground">
                  {usage.usage.checks?.current || 0}
                </p>
                <p className="text-sm text-muted-foreground">
                  de {usage.usage.checks?.limit || 0} checks
                </p>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <p className="text-2xl font-bold text-accent-foreground">
                  {usage.plan?.name || 'Free'}
                </p>
                <p className="text-sm text-muted-foreground">Plan actual</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}