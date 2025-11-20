'use client';

import { Check, X, CreditCard, Globe } from 'lucide-react'; // ← AGREGAR iconos
import { useTranslations } from 'next-intl';
import { usePlan } from '@/hooks/usePlan';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { subscriptionsApi } from '@/lib/api';

export default function PricingPage() {
  const t = useTranslations('pricingDashboard');
  const tPlans = useTranslations('plans');
  const { usage, createPreference, downgradeToPlan } = usePlan();
  const [loading, setLoading] = useState<string | null>(null);

  // Definir los planes usando las traducciones
  const plans = [
    {
      type: 'free',
      name: tPlans('free.name'),
      price: 0,
      features: [
        tPlans('free.features.checks'),
        tPlans('free.features.interval'),
        tPlans('free.features.emailAlerts'),
        tPlans('free.features.statusPage'),
        tPlans('free.features.retention'),
        tPlans('free.features.region')
      ],
      limitations: [
        tPlans('free.limitations.noSlack'),
        tPlans('free.limitations.noApi'),
        tPlans('free.limitations.noAdvanced')
      ]
    },
    {
      type: 'starter',
      name: tPlans('starter.name'),
      price: 5,
      popular: true,
      features: [
        tPlans('starter.features.checks'),
        tPlans('starter.features.interval'),
        tPlans('starter.features.emailAlerts'),
        tPlans('starter.features.telegramAlerts'),
        tPlans('starter.features.statusPage'),
        tPlans('starter.features.retention'),
        tPlans('starter.features.regions'),
        tPlans('starter.features.api')
      ],
      limitations: [
        tPlans('starter.limitations.noWebhooks'),
        tPlans('starter.limitations.noSla')
      ]
    },
    {
      type: 'pro',
      name: tPlans('pro.name'),
      price: 15,
      features: [
        tPlans('pro.features.checks'),
        tPlans('pro.features.interval'),
        tPlans('pro.features.allAlerts'),
        tPlans('pro.features.retention'),
        tPlans('pro.features.statusPage'),
        tPlans('pro.features.api'),
        tPlans('pro.features.webhooks'),
        tPlans('pro.features.sla'),
        tPlans('pro.features.support')
      ],
      limitations: []
    }
  ];

  // ✅ NUEVA FUNCIÓN: Upgrade con MercadoPago
  const handleUpgradeMercadoPago = async (planType: 'starter' | 'pro') => {
    try {
      setLoading(`mp-${planType}`);
      console.log('🇦🇷 Iniciando checkout con MercadoPago:', planType);
      
      const result = await createPreference(planType);
      console.log('📋 Resultado:', result);
      
      if (result.success && result.checkoutUrl) {
        console.log('🔄 Redirigiendo a MercadoPago:', result.checkoutUrl);
        window.location.href = result.checkoutUrl;
      } else {
        console.log('✅ Cambio directo exitoso');
        alert(t('success.planChanged'));
        window.location.reload();
      }
    } catch (error) {
      console.error('❌ Error en MercadoPago:', error);
      alert(t('errors.payment'));
    } finally {
      setLoading(null);
    }
  };

  // ✅ NUEVA FUNCIÓN: Upgrade con Lemon Squeezy
const handleUpgradeLemonSqueezy = async (planType: 'starter' | 'pro') => {
  try {
    const currentPlan = usage?.plan?.type || 'free';
    const currentPlanPrice = plans.find(p => p.type === currentPlan)?.price || 0;
    const targetPlanPrice = plans.find(p => p.type === planType)?.price || 0;
    
    const isDowngrade = targetPlanPrice < currentPlanPrice;
    
    // Si es downgrade (PRO → STARTER), usar cambio directo
    if (isDowngrade && planType === 'starter') {
      return handleDowngradeLemonSqueezy(planType);
    }
    
    // Si es upgrade o primer pago, crear checkout normal
    setLoading(`ls-${planType}`);
    console.log('💳 Iniciando checkout con Lemon Squeezy:', planType);
    
    const response = await subscriptionsApi.createLemonCheckout({ planType });
    const result = response.data;
    
    console.log('📋 Resultado:', result);
    
    if (result.status === 'success' && result.data?.checkoutUrl) {
      console.log('🔄 Redirigiendo a Lemon Squeezy:', result.data.checkoutUrl);
      window.location.href = result.data.checkoutUrl;
    } else {
      alert(t('errors.payment'));
    }
  } catch (error) {
    console.error('❌ Error en Lemon Squeezy:', error);
    alert(t('errors.payment'));
  } finally {
    setLoading(null);
  }
};

const handleDowngradeLemonSqueezy = async (planType: 'starter') => {
  try {
    // ✅ Confirmación antes de hacer el downgrade
    const confirmed = confirm(t('confirmations.downgradeLemonStarter'));
    
    if (!confirmed) {
      return; // Usuario canceló
    }
    
    setLoading(`ls-${planType}`);
    console.log('📉 Downgrade directo con Lemon Squeezy:', planType);
    
    const response = await subscriptionsApi.changeLemonPlan({ planType });
    const result = response.data;
    
    console.log('📋 Resultado:', result);
    
    if (result.status === 'success') {
      alert(t('success.planChanged')); // ✅ Usar traducción
      window.location.reload();
    } else {
      alert(t('errors.payment')); // ✅ Usar traducción
    }
  } catch (error) {
    console.error('❌ Error en downgrade Lemon Squeezy:', error);
    alert(t('errors.payment')); // ✅ Usar traducción
  } finally {
    setLoading(null);
  }
};

  const handleDowngrade = async () => {
    try {
      setLoading('free');
      console.log('📉 Iniciando downgrade a FREE');
      
      if (confirm(t('confirmDowngrade'))) {
        const result = await downgradeToPlan('free');
        
        if (result.success) {
          alert(t('success.downgraded'));
          window.location.reload();
        } else {
          alert(`${t('errors.downgrade')} ${result.error}`);
        }
      }
    } catch (error) {
      console.error('❌ Error en handleDowngrade:', error);
      alert(t('errors.payment'));
    } finally {
      setLoading(null);
    }
  };

  const currentPlan = usage?.plan?.type || 'free';
  const currentPlanPrice = plans.find(p => p.type === currentPlan)?.price || 0;

  // ✅ ACTUALIZAR: Renderizar botones de pago
  const renderActionButton = (plan: any) => {
    const isCurrentPlan = currentPlan === plan.type;
    const isLoadingMP = loading === `mp-${plan.type}`;
    const isLoadingLS = loading === `ls-${plan.type}`;
    const isLoadingAny = loading !== null;

    if (plan.type === 'free') {
      if (isCurrentPlan) {
        return (
          <button 
            className="w-full py-3 bg-muted text-muted-foreground rounded-lg font-semibold cursor-not-allowed" 
            disabled
          >
            {t('actions.currentPlan')}
          </button>
        );
      } else {
        return (
          <button
            onClick={handleDowngrade}
            disabled={isLoadingAny}
            className="w-full py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-50"
          >
            {loading === 'free' ? t('actions.processing') : t('actions.downgrade')}
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
            {t('actions.currentPlan')}
          </button>
        );
      } else {
        // ✅ DOS BOTONES: MercadoPago y Lemon Squeezy
        return (
          <div className="space-y-3">
            {/* MercadoPago - LATAM
            <button
              onClick={() => handleUpgradeMercadoPago(plan.type as 'starter' | 'pro')}
              disabled={isLoadingAny}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {isLoadingMP ? t('actions.processing') : t('actions.mercadoPagoLatam')}
            </button> */}

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  {t('actions.orPayWith')}
                </span>
              </div>
            </div>

            {/* Lemon Squeezy - International */}
            <button
              onClick={() => handleUpgradeLemonSqueezy(plan.type as 'starter' | 'pro')}
              disabled={isLoadingAny}
              className="w-full py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              {isLoadingLS ? t('actions.processing') : t('actions.creditCardInternational')}
            </button>
            {/* MercadoPago - LATAM */}
            <button
              onClick={() => handleUpgradeMercadoPago(plan.type as 'starter' | 'pro')}
              disabled={isLoadingAny}
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {isLoadingMP ? t('actions.processing') : t('actions.mercadoPagoLatam')}
            </button>
          </div>
        );
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-foreground">{t('title')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('subtitle')}
        </p>
        {usage?.plan && (
          <p className="text-sm text-muted-foreground mt-2">
            {t('currentPlan')} <span className="font-semibold">{usage.plan.name}</span>
          </p>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.type}
            className={`relative transition-all hover:shadow-lg h-full ${
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
                  {tPlans('popular')}
                </Badge>
              </div>
            )}

            {currentPlan === plan.type && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-success text-success-foreground px-4 py-1 text-sm">
                  {t('actions.currentPlan')}
                </Badge>
              </div>
            )}

            <CardContent className="p-8 flex flex-col h-full"> {/* ← AGREGAR flex flex-col h-full */}
              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-card-foreground">{plan.name}</h3>
                <div className="text-4xl font-bold mb-2 text-card-foreground">
                  ${plan.price}
                  <span className="text-lg font-normal text-muted-foreground">{tPlans('perMonth')}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8 flex-grow"> {/* ← AGREGAR flex-grow */}
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

              {/* Action Button - siempre al fondo */}
              <div className="mt-auto"> {/* ← AGREGAR mt-auto */}
                {renderActionButton(plan)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
        
      {/* Current Usage Info */}
      {usage && usage.usage && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-card-foreground">{t('usage.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-accent rounded-lg">
                <p className="text-2xl font-bold text-accent-foreground">
                  {usage.usage.checks?.current || 0}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('usage.of')} {usage.usage.checks?.limit || 0} {t('usage.checks')}
                </p>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <p className="text-2xl font-bold text-accent-foreground">
                  {usage.plan?.name || 'Free'}
                </p>
                <p className="text-sm text-muted-foreground">{t('usage.currentPlan')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}