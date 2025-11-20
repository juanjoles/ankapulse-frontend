'use client';

import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { LocaleLink as Link } from '@/components/locale-link';
import { useTranslations } from 'next-intl';

export default function DocsIndexPage() {
  const t = useTranslations('docs');
  
  // Metadata de los artículos disponibles
  const articles = [
    {
      title: t('articles.downtimeHistory.title'),
      description: t('articles.downtimeHistory.description'),
      href: '/docs/downtime-history',
      category: t('articles.downtimeHistory.category'),
      readTime: '8',
      icon: '💸',
    },
    {
      title: t('articles.whyMonitoring.title'),
      description: t('articles.whyMonitoring.description'),
      href: '/docs/why-monitoring-matters',
      category: t('articles.whyMonitoring.category'),
      readTime: '8',
      icon: '📊',
    },
    {
      title: t('articles.about.title'),
      description: t('articles.about.description'),
      href: '/docs/about',
      category: t('articles.about.category'),
      readTime: '5',
      icon: '🦅',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t('subtitle')}
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
                    {article.readTime} {t('readTime')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {article.description}
                </p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  {t('readArticle')}
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
          {t('comingSoon.title')}
        </h3>
        <p className="text-muted-foreground">
          {t('comingSoon.description')}
        </p>
      </div>
    </div>
  );
}