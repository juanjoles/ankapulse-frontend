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
      'Status Page',
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
      'Email alerts',
      'Telegram alerts',
      'Status Page',
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
      'Status Page',
      'API completa - Próximamente',
      'Webhooks - Próximamente',
      'SLA reports - Próximamente',
      'Soporte prioritario'
    ],
    limitations: []
  }
];

export default function PricingPage() {
  const { usage, createPreference, downgradeToPlan } = usePlan();
  const [loading, setLoading] = useState<string | null>(null);

  const handleUpgrade = async (planType: 'starter' | 'pro') => {
    try {
      setLoading(planType);
      console.log('🚀 Iniciando proceso de upgrade/cambio a:', planType);
      
      const result = await createPreference(planType);
      console.log('📋 Resultado de createPreference:', result);
      
      if (result.success && result.checkoutUrl) {
        console.log('🔄 Redirigiendo a checkout:', result.checkoutUrl);
        window.location.href = result.checkoutUrl;
      } else {
        console.log('✅ Cambio de plan directo exitoso');
        alert('✅ Plan cambiado exitosamente!');
        window.location.reload();
      }
    } catch (error) {
      console.error('❌ Error en handleUpgrade:', error);
      alert('Error al procesar el pago. Inténtalo de nuevo.');
    } finally {
      setLoading(null);
    }
  };

  const handleDowngrade = async () => {
    try {
      setLoading('free');
      console.log('📉 Iniciando downgrade a FREE');
      
      if (confirm('¿Estás seguro de que quieres degradar a plan FREE? Perderás acceso a las funciones premium.')) {
        const result = await downgradeToPlan('free');
        
        if (result.success) {
          alert('Plan degradado exitosamente a FREE');
          // Los datos se refrescan automáticamente en el hook
        } else {
          alert(`Error al degradar el plan: ${result.error}`);
        }
      }
    } catch (error) {
      console.error('❌ Error en handleDowngrade:', error);
      alert('Error al degradar el plan. Inténtalo de nuevo.');
    } finally {
      setLoading(null);
    }
  };

  const currentPlan = usage?.plan?.type || 'free';
  const currentPlanPrice = plans.find(p => p.type === currentPlan)?.price || 0;

  const renderActionButton = (plan: any) => {
    const isCurrentPlan = currentPlan === plan.type;
    const isLoading = loading === plan.type;

    if (plan.type === 'free') {
      if (isCurrentPlan) {
        return (
          <button 
            className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-semibold cursor-not-allowed" 
            disabled
          >
            Plan Actual
          </button>
        );
      } else {
        // Usuario con plan premium quiere degradar a FREE
        return (
          <button
            onClick={handleDowngrade}
            disabled={loading !== null}
            className="w-full py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Procesando...' : 'Degradar a FREE'}
          </button>
        );
      }
    } else {
      // Planes de pago (starter, pro)
      if (isCurrentPlan) {
        return (
          <button 
            className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-semibold cursor-not-allowed" 
            disabled
          >
            Plan Actual
          </button>
        );
      } else {
        const isUpgrade = plan.price > currentPlanPrice;
        const isDowngrade = plan.price < currentPlanPrice;
        
        let buttonText = 'Cambiar Plan';
        if (isUpgrade) buttonText = 'Actualizar Plan';
        if (isDowngrade) buttonText = 'Cambiar Plan';
        
        return (
          <button
            onClick={() => handleUpgrade(plan.type as 'starter' | 'pro')}
            disabled={loading !== null}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Procesando...' : buttonText}
          </button>
        );
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Planes y Precios</h1>
        <p className="text-xl text-muted-foreground">
          Elige el plan que mejor se adapte a tus necesidades
        </p>
        {usage?.plan && (
          <p className="text-sm text-muted-foreground mt-2">
            Plan actual: <span className="font-semibold">{usage.plan.name}</span>
          </p>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.type}
            className={`relative transition-all hover:shadow-lg ${
              currentPlan === plan.type
                ? 'border-2 border-success shadow-lg'
                : plan.popular 
                ? 'border-2 border-primary shadow-lg' 
                : 'border border-border'
            }`}
          >
            {plan.popular && currentPlan !== plan.type && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm">
                  Más Popular
                </Badge>
              </div>
            )}

            {currentPlan === plan.type && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-success text-success-foreground px-4 py-1 text-sm">
                  Plan Actual
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
              {renderActionButton(plan)}
            </CardContent>
          </Card>
        ))}
        
      </div>
        
      {/* Current Usage Info */}
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