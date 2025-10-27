import Link from 'next/link';
import { Activity, CheckCircle, Globe, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 transition-colors">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AnkaPulse</h1>
          </div>
          <div className="space-x-4">
            <Link 
              href="/login" 
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link 
              href="/register" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Comenzar Gratis
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Monitoreo de <span className="text-primary">APIs</span> Simple y Accesible
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mantén tus servicios funcionando con AnkaPulse. Monitoreo en tiempo real, 
            alertas instantáneas y reportes detallados. Todo en español.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Comenzar Gratis
            </Link>
            <Link 
              href="/plans" 
              className="border border-border text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent transition-colors"
            >
              Ver Precios
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Monitoreo Confiable</h3>
            <p className="text-muted-foreground">
              Verificaciones cada minuto desde múltiples ubicaciones
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Global</h3>
            <p className="text-muted-foreground">
              Monitoreo desde Estados Unidos, Europa y América Latina
            </p>
          </div>
          
          <div className="text-center p-6 bg-card rounded-lg border border-border">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">Analytics</h3>
            <p className="text-muted-foreground">
              Reportes detallados y métricas de rendimiento
            </p>
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