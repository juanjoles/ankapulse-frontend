import { AlertTriangle, Clock, DollarSign, TrendingUp, Shield, Zap, Target, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function WhyMonitoringMattersPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Por qué es fundamental monitorear tus APIs
        </h1>
        <p className="text-xl text-muted-foreground">
          En el mundo del desarrollo moderno, las APIs son el corazón de prácticamente toda aplicación
        </p>
      </div>

      {/* Intro */}
      <div className="bg-card border rounded-lg p-8 mb-12">
        <p className="text-muted-foreground mb-4">
          Desde una simple app de clima hasta un e-commerce complejo, todos dependemos de servicios externos 
          y propios que deben estar disponibles 24/7. Sin embargo, muchos desarrolladores solo se enteran 
          de que algo falló cuando los usuarios ya están quejándose.
        </p>
      </div>

      {/* El costo del downtime */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-destructive" />
          El verdadero costo del downtime
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-destructive" />
              Impacto económico inmediato
            </h3>
            <p className="text-muted-foreground mb-4">
              Cuando tu API está caída, no solo pierdes funcionalidad - pierdes dinero. Un e-commerce 
              que procesa $10,000 USD por día pierde aproximadamente $7 por minuto de downtime.
            </p>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h4 className="font-semibold text-card-foreground mb-2">Ejemplos reales:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>API de pagos caída:</strong> Ventas perdidas directamente</li>
                <li>• <strong>Sistema de autenticación down:</strong> Usuarios no pueden acceder</li>
                <li>• <strong>API de terceros:</strong> Funcionalidad crítica deshabilitada</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-xl font-semibold text-card-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Daño a la reputación
            </h3>
            <p className="text-muted-foreground">
              En LATAM, donde la competencia digital está creciendo exponencialmente, la confiabilidad 
              es un diferenciador clave. Un usuario que no puede completar una acción importante 
              probablemente no regrese. La reputación que tardaste meses en construir puede perderse en minutos.
            </p>
          </div>
        </div>
      </div>

      {/* Detección temprana */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
          La detección temprana marca la diferencia
        </h2>

        <div className="bg-accent/30 border rounded-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Enterarte antes que tus usuarios
          </h3>
          <p className="text-muted-foreground mb-6">
            El monitoreo proactivo te permite ser el primero en saber cuando algo anda mal. 
            En lugar de despertar con 20 mensajes furiosos en WhatsApp, recibes una alerta 
            inmediata que te da tiempo para actuar.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h4 className="font-semibold text-destructive mb-2">❌ Sin monitoreo:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>9:00 AM - API se cae</li>
                <li>9:30 AM - Primeros usuarios reportan</li>
                <li>10:00 AM - Te enteras del problema</li>
                <li>10:30 AM - Identificas la causa</li>
                <li>11:00 AM - Problema resuelto</li>
              </ul>
              <p className="font-semibold text-destructive mt-2">Downtime total: 2 horas</p>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <h4 className="font-semibold text-success mb-2">✅ Con monitoreo:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>9:00 AM - API se cae</li>
                <li>9:01 AM - Alerta automática</li>
                <li>9:10 AM - Problema identificado</li>
                <li>9:20 AM - Problema resuelto</li>
              </ul>
              <p className="font-semibold text-success mt-2">Downtime total: 20 minutos</p>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Más allá del "está arriba" o "está abajo"
          </h3>
          <p className="text-muted-foreground mb-4">
            El monitoreo moderno no solo verifica si tu API responde, sino <strong>cómo</strong> responde:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-card-foreground mb-1">Tiempo de respuesta</h4>
              <p className="text-sm text-muted-foreground">Una API que tarda 5s puede ser "funcional" pero inutilizable</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-card-foreground mb-1">Códigos de estado</h4>
              <p className="text-sm text-muted-foreground">500 internal error es diferente a 503 service unavailable</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-card-foreground mb-1">Contenido válido</h4>
              <p className="text-sm text-muted-foreground">Verificar que devuelva datos válidos, no solo que responda</p>
            </div>
          </div>
        </div>
      </div>

      {/* Para LATAM */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Target className="w-6 h-6 text-primary" />
          Desafíos específicos en LATAM
        </h2>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">El contexto regional importa</h3>
          <p className="text-muted-foreground mb-4">En América Latina enfrentamos desafíos únicos:</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-semibold text-card-foreground mb-2">🌐 Infraestructura variable</h4>
              <p className="text-sm text-muted-foreground">Internet y hosting pueden ser menos estables</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-semibold text-card-foreground mb-2">🔗 Servicios terceros</h4>
              <p className="text-sm text-muted-foreground">APIs internacionales con latencia alta</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <h4 className="font-semibold text-card-foreground mb-2">💰 Recursos limitados</h4>
              <p className="text-sm text-muted-foreground">No siempre podemos permitirnos equipos DevOps</p>
            </div>
          </div>
        </div>

        <div className="bg-accent/30 border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">Credibilidad profesional</h3>
          <p className="text-muted-foreground">
            Cuando pitcheas tu startup a inversores o clientes enterprise, mostrar métricas de uptime 
            reales es un diferenciador importante. <strong className="text-foreground">"Tenemos 99.9% de uptime 
            en los últimos 6 meses"</strong> suena mucho mejor que <em>"creemos que funciona bien"</em>.
          </p>
        </div>
      </div>

      {/* ROI del monitoreo */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-success" />
          ROI del monitoreo
        </h2>

        <div className="bg-success/10 border border-success/20 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">Cálculo simple</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground mb-4">Si tu aplicación genera $1000 USD/día:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong className="text-foreground">Costo de monitoreo:</strong> $30/mes</li>
                <li><strong className="text-foreground">Downtime evitado:</strong> 2 horas/mes</li>
                <li><strong className="text-foreground">Pérdida evitada:</strong> $83/mes</li>
                <li><strong className="text-success text-lg">ROI: 177%</strong></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Beneficios intangibles:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>✅ Mejor sueño (sin emergencias nocturnas)</li>
                <li>✅ Equipo más productivo (menos firefighting)</li>
                <li>✅ Mayor confianza del cliente</li>
                <li>✅ Datos para optimización de performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-primary/5 border border-primary/20 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          El mejor momento para implementar monitoreo es ayer
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          <strong className="text-foreground">El segundo mejor momento es ahora.</strong>
        </p>
        <p className="text-muted-foreground mb-6">
          La pregunta no es si tu API va a fallar alguna vez, sino cuándo va a pasar 
          y qué tan rápido vas a enterarte.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Crear cuenta gratuita
        </Link>
        <p className="text-sm text-muted-foreground mt-4">
          Configura tu primer check en menos de 2 minutos
        </p>
      </div>
    </div>
  );
}