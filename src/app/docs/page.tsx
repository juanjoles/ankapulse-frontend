import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Metadata de los artículos disponibles
const articles = [
  {
    title: 'Por qué es fundamental monitorear tus APIs',
    description: 'Descubre el impacto real del downtime y cómo el monitoreo proactivo puede salvar tu negocio y tu reputación.',
    href: '/docs/why-monitoring-matters',
    category: 'Fundamentos',
    readTime: '8 min',
    icon: '📊',
  },
  {
    title: 'Sobre AnkaPulse',
    description: 'Conoce la historia detrás de AnkaPulse y por qué creamos una herramienta de monitoreo pensada para developers de LATAM.',
    href: '/docs/about',
    category: 'Acerca de',
    readTime: '5 min',
    icon: '🦅',
  },
  // Aquí puedes agregar más artículos en el futuro
];

export default function DocsIndexPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Documentación y Recursos
        </h1>
        <p className="text-xl text-muted-foreground">
          Aprende todo sobre monitoreo de servicios y cómo sacarle el máximo provecho a AnkaPulse
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group bg-card border rounded-lg p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{article.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {article.description}
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  Leer artículo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Coming Soon Section */}
      <div className="bg-accent/30 border border-dashed rounded-lg p-8 text-center">
        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Más contenido en camino
        </h3>
        <p className="text-muted-foreground">
          Estamos trabajando en más guías y artículos sobre monitoreo, mejores prácticas,
          y casos de uso.
        </p>
      </div>
    </div>
  );
}
