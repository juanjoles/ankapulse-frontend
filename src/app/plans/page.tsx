'use client';

import { Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { NavbarClient } from '@/components/navbar-client';

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
      '3 regiones - Próximamente',
      'API básica - Próximamente'
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
      'Status Page',
      '90 días retención',
      'Todas las regiones',
      'API completa - Próximamente',
      'Webhooks - Próximamente',
      'SLA reports - Próximamente',
      'Soporte prioritario'
    ],
    limitations: []
  }
];

export default function PublicPlansPage() {
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
              Planes y Precios
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comienza gratis y escala según tus necesidades. 
              Sin sorpresas, sin tarifas ocultas.
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
                      Más Popular
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
                      <span className="text-lg font-normal text-muted-foreground">/mes</span>
                    </div>
                    {plan.price === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Perfecto para empezar
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
                    {plan.price === 0 ? 'Comenzar Gratis' : 'Elegir Plan'}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Options - NUEVA SECCIÓN */}
          <div className="mt-20 max-w-4xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Métodos de Pago
              </h2>
              <p className="text-muted-foreground">
                Elegí el método de pago que mejor te funcione
              </p>
            </div>

            {/* Payment Methods Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Credit Card */}
              <div className="p-6 bg-card rounded-lg border border-border text-center">
                <div className="text-4xl mb-3">💳</div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Tarjeta de Crédito
                </h3>
                <p className="text-sm text-muted-foreground">
                  Próximamente
                </p>
              </div>
              
              {/* MercadoPago */}
              <div className="p-6 bg-card rounded-lg border border-border text-center">
                <div className="text-4xl mb-3">💰</div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  MercadoPago
                </h3>
                <p className="text-sm text-muted-foreground">
                  Para LATAM • Sin impuestos internacionales
                </p>
              </div>
              
              {/* Binance Pay */}
              <div className="p-6 bg-card rounded-lg border border-border text-center">
                <div className="text-4xl mb-3">₿</div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  Pagos crypto
                </h3>
                <p className="text-sm text-muted-foreground">
                  Próximamente  
                </p>
              </div>

            </div>

            {/* Footer text */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Plan gratuito sin tarjeta de crédito • Upgrade cuando quieras • Cancelá sin preguntas
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Preguntas Frecuentes
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-card-foreground">
                    ¿Puedo cambiar de plan en cualquier momento?
                  </h3>
                  <p className="text-muted-foreground">
                    Sí, puedes actualizar o degradar tu plan cuando quieras. 
                    Los cambios se aplican inmediatamente.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-card-foreground">
                    ¿Qué incluye el plan gratuito?
                  </h3>
                  <p className="text-muted-foreground">
                    El plan gratuito incluye 10 checks con monitoreo cada 30 minutos, 
                    perfecto para proyectos pequeños.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-card-foreground">
                    ¿Hay descuentos por pago anual?
                  </h3>
                  <p className="text-muted-foreground">
                    Próximamente ofreceremos descuentos por suscripciones anuales. 
                    Mantente atento a nuestras actualizaciones.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-card-foreground">
                    ¿Ofrecen soporte técnico?
                  </h3>
                  <p className="text-muted-foreground">
                    Todos los planes incluyen soporte por email. 
                    Los planes Pro incluyen soporte prioritario.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 py-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              ¿Listo para empezar?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Configura tu primer monitor en menos de 2 minutos
            </p>
            <Link
              href="/register"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
            >
              Comenzar Gratis Ahora
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-border">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2025 AnkaPulse. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}