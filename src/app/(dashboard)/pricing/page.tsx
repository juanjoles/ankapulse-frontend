// src/app/(dashboard)/pricing/page.tsx
'use client';

import { Check, X } from 'lucide-react';
import { usePlan } from '@/hooks/usePlan';
import { useState } from 'react';

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

  const currentPlan = usage?.plan.type || 'free';

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Planes y Precios</h1>
        <p className="text-xl text-gray-600">
          Elige el plan que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.type}
            className={`bg-white rounded-xl shadow-lg p-8 relative ${
              plan.popular ? 'border-2 border-blue-500' : 'border border-gray-200'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                Más Popular
              </span>
            )}

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-4xl font-bold mb-2">
                ${plan.price}
                <span className="text-lg font-normal text-gray-600">/mes</span>
              </div>
              {currentPlan === plan.type && (
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Plan Actual
                </span>
              )}
            </div>

            <div className="space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
              {plan.limitations.map((limitation, idx) => (
                <div key={idx} className="flex items-start opacity-60">
                  <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-500">{limitation}</span>
                </div>
              ))}
            </div>

            {plan.type === 'free' ? (
              currentPlan === 'free' ? (
                <button className="w-full py-3 bg-gray-100 text-gray-600 rounded-lg font-semibold" disabled>
                  Plan Actual
                </button>
              ) : (
                <button className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold" disabled>
                  No disponible
                </button>
              )
            ) : (
              <button
                onClick={() => handleUpgrade(plan.type as 'starter' | 'pro')}
                disabled={currentPlan === plan.type || loading !== null}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  currentPlan === plan.type
                    ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {loading === plan.type
                  ? 'Procesando...'
                  : currentPlan === plan.type
                  ? 'Plan Actual'
                  : 'Actualizar Plan'}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-gray-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-4">¿Necesitas más?</h3>
        <p className="text-gray-600 mb-6">
          Contactanos para planes enterprise personalizados con límites custom,
          SLA garantizado y soporte dedicado.
        </p>
        
          {/* href="mailto:enterprise@hawkpulse.com"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Contactar Ventas
        </a> */}
      </div>
    </div>
  );
}