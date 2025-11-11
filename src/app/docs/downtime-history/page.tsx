import { AlertTriangle, Clock, DollarSign, TrendingUp, Zap, Building, Plane, Facebook, ShoppingCart, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function DowntimeHistoryPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Los 5 Casos de Downtime Más Caros de la Historia
        </h1>
        <p className="text-xl text-muted-foreground mb-4">
          Cuando el downtime no cuesta miles, sino millones de dólares
        </p>
      </div>

      {/* Intro */}
      <div className="bg-card border rounded-lg p-8 mb-12">
        <p className="text-muted-foreground mb-4">
          Cuando pensamos en downtime, generalmente pensamos en minutos perdidos, algunos usuarios frustrados, 
          tal vez un par de ventas que no se cerraron. Molesto, sí. Costoso, también. Pero raramente pensamos 
          en el verdadero costo del downtime a escala.
        </p>
        <p className="text-muted-foreground mb-4">
          Hoy te cuento 5 casos reales donde el downtime no costó cientos o miles de dólares. Costó millones. 
          En algunos casos, cientos de millones. Y en el caso más extremo, casi destruyó una empresa completa 
          en menos de una hora.
        </p>
        <p className="text-muted-foreground">
          Estas historias no son solo para aprender de los errores de los demás. Son recordatorios de que 
          en el mundo digital, <strong className="text-foreground">cada minuto cuenta</strong>. Y que el costo 
          de no estar preparado puede ser devastador.
        </p>
      </div>

      {/* Case 1: Amazon */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-orange-500" />
          Amazon Prime Day 2018: $100 Millones en 63 Minutos
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">La Historia</h3>
          <p className="text-muted-foreground mb-4">
            Era julio de 2018. Amazon había promocionado su Prime Day durante semanas. Millones de usuarios 
            listos para comprar. Descuentos masivos. El evento de ventas más grande del año.
          </p>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
            <ul className="text-sm space-y-1">
              <li><strong>11:00 AM PT:</strong> Prime Day comienza oficialmente</li>
              <li><strong>11:01 AM PT:</strong> El sitio colapsa</li>
            </ul>
          </div>
          <p className="text-muted-foreground">
            Durante 63 minutos, los usuarios de todo el mundo vieron lo mismo: una imagen de un perro con 
            el mensaje "Uh oh! Something went wrong on our end."
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">El problema:</strong> Los servidores de Amazon no pudieron 
            manejar el tráfico masivo que ellos mismos habían generado con su marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-destructive" />
              Los Números
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Pérdida estimada:</strong> $72-100 millones</li>
              <li><strong className="text-foreground">Duración:</strong> 63 minutos</li>
              <li><strong className="text-foreground">Usuarios afectados:</strong> Millones globalmente</li>
              <li><strong className="text-foreground">Impacto en acciones:</strong> Caída temporal</li>
            </ul>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mt-4">
              <p className="text-sm font-semibold text-destructive">
                Amazon perdió aproximadamente $1.6 millones por minuto
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">La Lección</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Amazon es literalmente una de las empresas más avanzadas tecnológicamente del mundo. 
              Tienen AWS. Tienen los mejores ingenieros. Tienen recursos prácticamente ilimitados.
            </p>
            <p className="text-muted-foreground text-sm">
              Y aun así, subestimaron su propio tráfico. La lección: 
              <strong className="text-foreground"> load testing es crítico</strong>, especialmente 
              antes de eventos importantes.
            </p>
          </div>
        </div>

        <div className="bg-accent/30 border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-3">Qué Podés Aplicar Hoy</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Hacé load testing de tus endpoints críticos</li>
              <li>• Tené un plan de escalabilidad</li>
              <li>• Configurá monitoring agresivo</li>
            </ul>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Tené un rollback plan</li>
              <li>• Comunicá proactivamente si hay problemas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Case 2: Facebook */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Facebook className="w-6 h-6 text-blue-500" />
          Facebook, Instagram y WhatsApp (2021): 6 Horas que Costaron $60 Millones
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">La Historia</h3>
          <p className="text-muted-foreground mb-4">
            4 de octubre de 2021. 11:40 AM ET. De repente, Facebook desaparece de internet. 
            <strong className="text-foreground"> Literalmente.</strong>
          </p>
          <p className="text-muted-foreground mb-4">
            No solo el sitio web. No solo la app. La empresa completa. Facebook, Instagram, 
            WhatsApp, Oculus. Todo offline. Durante 6 horas.
          </p>
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">El problema:</strong> Un error en la configuración BGP 
              (Border Gateway Protocol) hizo que los servidores de Facebook fueran "eliminados" de internet. 
              Para el internet global, Facebook dejó de existir.
            </p>
          </div>
          <p className="text-muted-foreground">
            <strong className="text-destructive">Lo peor:</strong> Los ingenieros no podían acceder a los 
            edificios porque las tarjetas de acceso también estaban conectadas a los sistemas internos. 
            Tuvieron que cortar físicamente candados para entrar a los data centers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">Los Números</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Pérdida directa:</strong> $60 millones</li>
              <li><strong className="text-foreground">Duración:</strong> 6 horas</li>
              <li><strong className="text-foreground">Usuarios afectados:</strong> 3.5 mil millones</li>
              <li><strong className="text-foreground">Caída en acciones:</strong> -4.9%</li>
              <li><strong className="text-foreground">Valor perdido:</strong> $7 mil millones</li>
            </ul>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mt-4">
              <p className="text-sm font-semibold text-destructive">
                Zuckerberg perdió $6 mil millones en acciones ese día
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">La Lección</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              El error no fue en el código. No fue un bug. No fue un ataque. Fue un error en 
              configuración de infraestructura durante una actualización de rutina.
            </p>
            <p className="text-muted-foreground text-sm">
              <strong className="text-foreground">La lección:</strong> Los errores más peligrosos 
              no son los obvios. Son los que pasan en sistemas críticos durante "mantenimiento de rutina".
            </p>
          </div>
        </div>
      </div>

      {/* Case 3: British Airways */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Plane className="w-6 h-6 text-blue-600" />
          British Airways (2017): $100 Millones por un Problema de Electricidad
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">La Historia</h3>
          <p className="text-muted-foreground mb-4">
            27 de mayo de 2017. Feriado largo en UK. Miles de familias listas para viajar.
          </p>
          <p className="text-muted-foreground mb-4">
            Un contratista en el data center de British Airways desconecta accidentalmente la 
            alimentación eléctrica. Cuando la reconecta, el surge de energía daña sistemas críticos.
          </p>
          <p className="text-muted-foreground">
            <strong className="text-destructive">Resultado:</strong> Caos absoluto. British Airways 
            tuvo que cancelar 726 vuelos en 3 días. 75,000 pasajeros varados en aeropuertos de todo el mundo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">Los Números</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Costo directo:</strong> $100+ millones</li>
              <li><strong className="text-foreground">Vuelos cancelados:</strong> 726</li>
              <li><strong className="text-foreground">Pasajeros afectados:</strong> 75,000</li>
              <li><strong className="text-foreground">Duración del impacto:</strong> 3 días</li>
              <li><strong className="text-foreground">Multa GDPR:</strong> £183 millones adicionales</li>
            </ul>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">La Lección</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              British Airways había externalizado su TI para "reducir costos". En el proceso, 
              eliminaron redundancias críticas.
            </p>
            <p className="text-muted-foreground text-sm">
              Ahorraron millones en TI. Les costó cientos de millones cuando falló.
              <strong className="text-foreground"> El disaster recovery no es un gasto, es un seguro.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Case 4: Delta Airlines */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Plane className="w-6 h-6 text-red-500" />
          Delta Airlines (2016): 5 Horas de Caos por un Switchover Fallido
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">La Historia</h3>
          <p className="text-muted-foreground mb-4">
            8 de agosto de 2016, 2:30 AM. Un problema eléctrico en el data center principal de Delta en Atlanta.
          </p>
          <p className="text-muted-foreground mb-4">
            El switchover automático al sistema de backup... <strong className="text-destructive">falla</strong>. 
            Los sistemas críticos se apagan. Check-in, boarding, crew scheduling, todo offline.
          </p>
          <p className="text-muted-foreground">
            Delta tuvo que cancelar 2,300 vuelos en 3 días. El CEO tuvo que pedir disculpas públicamente.
          </p>
        </div>

        <div className="bg-warning/10 border border-warning/20 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-foreground mb-3">La Lección Clave</h4>
          <p className="text-muted-foreground text-sm mb-3">
            Delta TENÍA sistemas de backup. Delta TENÍA redundancia. Delta HABÍA invertido en disaster recovery.
          </p>
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Pero nunca testearon adecuadamente el switchover.</strong> 
            Cuando lo necesitaron de verdad, no funcionó. Un disaster recovery plan que no se testea 
            es un disaster recovery plan que no existe.
          </p>
        </div>
      </div>

      {/* Case 5: Knight Capital */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-green-500" />
          Knight Capital (2012): $440 Millones Perdidos en 45 Minutos
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">
            La Historia Más Salvaje de Todas
          </h3>
          <p className="text-muted-foreground mb-4">
            1 de agosto de 2012, 9:30 AM. Knight Capital, una firma de trading, despliega nuevo software a producción.
          </p>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-destructive">Hay un problema:</strong> El código nuevo reactiva accidentalmente 
              una función vieja que había sido deprecada 8 años antes. Esta función empieza a ejecutar trades 
              automáticamente. Miles. Millones.
            </p>
          </div>
          <p className="text-muted-foreground mb-4">
            En 45 minutos, el software ejecuta órdenes de compra y venta por $7 mil millones. 
            <strong className="text-foreground"> SIETE MIL MILLONES.</strong> Sin supervisión humana.
          </p>
          <p className="text-muted-foreground">
            Para cuando se dan cuenta y apagan los sistemas, Knight Capital había acumulado $440 millones en pérdidas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">Los Números Devastadores</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Pérdida:</strong> $440 millones</li>
              <li><strong className="text-foreground">Duración:</strong> 45 minutos</li>
              <li><strong className="text-foreground">Volumen de trades:</strong> $7 mil millones</li>
              <li><strong className="text-foreground">Consecuencia:</strong> La empresa casi quiebra</li>
            </ul>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mt-4">
              <p className="text-sm font-semibold text-destructive">
                Knight Capital perdió $9.7 millones por minuto
              </p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <h4 className="font-semibold text-foreground mb-4">La Lección Única</h4>
            <p className="text-muted-foreground mb-4 text-sm">
              Este caso es único porque no fue downtime tradicional. El sistema funcionaba "perfectamente". 
              El problema fue que funcionaba haciendo exactamente lo que NO debía hacer.
            </p>
            <p className="text-muted-foreground text-sm">
              <strong className="text-foreground">La lección:</strong> Los errores en deployment pueden 
              ser catastróficos. El código que desplegas puede destruir tu empresa en minutos.
            </p>
          </div>
        </div>
      </div>

      {/* Pattern */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-warning" />
          El Patrón Común en Todos Estos Casos
        </h2>
        
        <div className="bg-card border rounded-lg p-8 mb-6">
          <p className="text-muted-foreground mb-4">Mirando estos 5 casos, hay un patrón que se repite:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2 text-muted-foreground">
              <li>• Todos tenían sistemas complejos</li>
              <li>• Todos confiaban en que "funcionaría"</li>
              <li>• Todos tenían ingenieros talentosos</li>
            </ul>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Ninguno pensó que les pasaría a ellos</li>
              <li>• El problema no fue falta de recursos</li>
              <li>• <strong className="text-foreground">Fue falta de preparación</strong></li>
            </ul>
          </div>
        </div>

        <div className="bg-success/10 border border-success/20 rounded-lg p-6">
          <p className="font-semibold text-success text-center">
            La buena noticia: Ninguno de estos problemas era inevitable.
          </p>
        </div>
      </div>

      {/* Applied Lessons */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <Zap className="w-6 h-6 text-primary" />
          Qué Podemos Aprender (Aplicado a Proyectos Reales)
        </h2>
        
        <div className="bg-accent/30 border rounded-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">"Pero yo no soy Amazon ni Facebook"</h3>
          <p className="text-muted-foreground mb-4">
            Es verdad. No tenés su escala. Pero tenés los mismos riesgos, proporcionalmente.
          </p>
          <p className="text-muted-foreground">
            Si tu SaaS factura $5,000/mes y está down 6 horas, no perdés $60 millones. Pero podés perder 
            usuarios, reputación y revenue que te costó meses construir.
          </p>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-6">Lecciones Universales</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Monitoring no es opcional
            </h4>
            <p className="text-muted-foreground text-sm">
              No necesitás gastar miles. Pero necesitás SABER cuando algo falla. 
              Antes de que tus usuarios te avisen.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3">Backups sin testing no son backups</h4>
            <p className="text-muted-foreground text-sm">
              Tener un backup que nunca probaste es lo mismo que no tener backup.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3">Los cambios de infraestructura son peligrosos</h4>
            <p className="text-muted-foreground text-sm">
              Tratá cada cambio de infra como si pudiera romper todo. Porque puede.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3">Documentá tus procedimientos</h4>
            <p className="text-muted-foreground text-sm">
              Cuando todo está prendido fuego, no querés estar googleando "cómo hacer rollback".
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3">Automatizá con cuidado</h4>
            <p className="text-muted-foreground text-sm">
              La automatización es increíble. Hasta que hace algo que no debería, a escala.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-6">
            <h4 className="font-semibold text-card-foreground mb-3">NUNCA deploys directos a producción</h4>
            <p className="text-muted-foreground text-sm">
              Staging, testing, feature flags. El deployment es donde más cosas pueden salir mal.
            </p>
          </div>
        </div>
      </div>

      {/* Real Cost */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-destructive" />
          El Costo Real del Downtime
        </h2>
        
        <div className="bg-card border rounded-lg p-8">
          <p className="text-muted-foreground mb-4">
            Estos casos extremos nos muestran algo importante: el costo del downtime no es solo 
            el revenue perdido durante esos minutos u horas.
          </p>
          <h3 className="font-semibold text-foreground mb-4">Es:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-muted-foreground">
              <li>• Usuarios que se van y no vuelven</li>
              <li>• Reputación dañada</li>
              <li>• Confianza perdida</li>
              <li>• Oportunidades que no se repiten</li>
            </ul>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Estrés del equipo</li>
              <li>• Tiempo gastado en crisis management</li>
              <li>• Pérdida de momentum</li>
              <li>• Impacto en el crecimiento futuro</li>
            </ul>
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mt-6">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Para Amazon, $100 millones es un mal día.</strong><br />
              <strong className="text-destructive">Para tu startup, 6 horas de downtime pueden ser el fin.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Conclusión</h2>
        
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
          <p className="text-muted-foreground mb-4">
            No te cuento estas historias para asustarte. Te las cuento para que entiendas que:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ul className="space-y-2 text-muted-foreground">
              <li>✅ El downtime le pasa a todos (incluso a los gigantes)</li>
              <li>✅ La preparación importa más que la perfección</li>
            </ul>
            <ul className="space-y-2 text-muted-foreground">
              <li>✅ El monitoring y backups no son gastos, son seguros</li>
              <li>✅ Aprender de otros es más barato que cometer tus errores</li>
            </ul>
          </div>
          <p className="text-muted-foreground mb-4">
            No necesitás la infraestructura de Amazon para aplicar estas lecciones. Necesitás:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Monitoring básico</li>
              <li>• Backups que funcionan</li>
            </ul>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Un plan para cuando las cosas fallen</li>
              <li>• La humildad de saber que TUS sistemas también pueden fallar</li>
            </ul>
          </div>
          <div className="text-center bg-card border rounded-lg p-4">
            <p className="font-semibold text-foreground">
              No es cuestión de SI va a pasar. Es cuestión de CUÁNDO.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Y qué tan preparado estés cuando pase.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-primary/5 border border-primary/20 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          ¿Querés asegurarte de detectar problemas antes de que cuesten caro?
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Empezá con monitoring básico hoy.
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