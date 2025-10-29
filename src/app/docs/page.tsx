import { Heart, Code, DollarSign, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Sobre AnkaPulse
        </h1>
        <p className="text-xl text-muted-foreground">
          Monitoreo de servicios hecho por developers de LATAM, para developers de LATAM
        </p>
      </div>

      {/* Hero Story */}
      <div className="bg-card border rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center gap-3">
          <Heart className="w-6 h-6 text-primary" />
          ¿Por qué nació AnkaPulse?
        </h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Como developers en Argentina, sabemos lo que es estar desarrollando un proyecto personal, 
            un MVP para una startup, o trabajando como freelancer y necesitar herramientas de monitoreo 
            profesionales.
          </p>
          <p>
            El problema es simple: <strong className="text-foreground">las plataformas existentes están 
            pensadas para empresas con presupuestos de miles de dólares al mes</strong>. Sus dashboards 
            están llenos de features que nunca usarás, sus precios son prohibitivos para el mercado 
            latinoamericano, y muchas veces ni siquiera tienen soporte en español.
          </p>
          <p>
            Nosotros creamos AnkaPulse porque <strong className="text-foreground">creemos que 
            todo developer merece tener herramientas profesionales sin quebrar su presupuesto</strong>.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6">
          <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Precios Justos</h3>
          <p className="text-muted-foreground">
            Desde $5 USD al mes. No mil features que no necesitas, 
            solo lo esencial que realmente usarás.
          </p>
        </div>
        
        <div className="text-center p-6">
          <Code className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Hecho por Developers</h3>
          <p className="text-muted-foreground">
            Sabemos qué necesitas porque nosotros también desarrollamos. 
            Sin complejidad innecesaria.
          </p>
        </div>
        
        <div className="text-center p-6">
          <Users className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Para LATAM</h3>
          <p className="text-muted-foreground">
            Precios accesibles, soporte en español, 
            y entendemos tus necesidades.
          </p>
        </div>
      </div>

      {/* Who is it for */}
      <div className="bg-accent/30 border rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          ¿Para quién es AnkaPulse?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-foreground mb-2">🚀 Startups y Emprendedores</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Estás validando tu MVP, cada dólar cuenta, pero necesitas saber 
              si tu aplicación está funcionando.
            </p>
            
            <h3 className="font-semibold text-foreground mb-2">💻 Developers Freelancers</h3>
            <p className="text-muted-foreground text-sm">
              Desarrollas para múltiples clientes y necesitas monitorear 
              sus servicios sin complicarte la vida.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">🏢 Equipos Pequeños</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Son 2-10 personas, no necesitan dashboards corporativos, 
              solo saber que todo funciona bien.
            </p>
            
            <h3 className="font-semibold text-foreground mb-2">📱 Proyectos Personales</h3>
            <p className="text-muted-foreground text-sm">
              Tu side project está creciendo y necesitas profesionalizarlo 
              sin gastar una fortuna.
            </p>
          </div>
        </div>
      </div>

      {/* Simple Promise */}
      <div className="text-center bg-primary/5 border border-primary/20 rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Nuestra Promesa
        </h2>
        <p className="text-lg text-muted-foreground mb-4">
          <strong className="text-foreground">Monitoreo profesional, sin complejidad, a precio justo.</strong>
        </p>
        <p className="text-muted-foreground">
          No te vamos a bombardear con features que no necesitas. 
          Te vamos a dar exactamente lo que precisas para dormir tranquilo 
          sabiendo que tus servicios están funcionando.
        </p>
      </div>

      {/* Contact */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          ¿Preguntas? ¿Sugerencias?
        </h3>
        <p className="text-muted-foreground mb-4">
          Somos un equipo pequeño y nos encanta escuchar a nuestra comunidad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:hola@ankapulse.app"
            className="text-primary hover:underline"
          >
            📧 soporte@ankapulse.app
          </a>
          <span className="text-muted-foreground hidden sm:block">•</span>
          <a 
            href="https://twitter.com/ankapulse"
            className="text-primary hover:underline"
          >
            🐦 @ankapulse
          </a>
        </div>
      </div>
    </div>
  );
}