"use client"

import { Activity } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSelector } from '@/components/language-selector';
import { LocaleLink as Link } from '@/components/locale-link';
import { useTranslations } from 'next-intl';

export function NavbarClient() {
  const t = useTranslations('nav');
  
  return (
    <nav className="flex justify-between items-center">
      {/* Logo clickeable que redirige a la landing */}
      <Link 
        href="/" 
        className="flex items-center space-x-1 sm:space-x-2 hover:opacity-80 transition-opacity cursor-pointer group"
      >
        <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:scale-105 transition-transform" />
        <span className="text-xl sm:text-2xl font-bold text-foreground">
          AnkaPulse
        </span>
      </Link>

      {/* Botones de acción */}
      <div className="flex items-center space-x-2">
        <LanguageSelector />
        <ThemeToggle />
        
        {/* Botones responsivos */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Link
            href="/login"
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-accent transition-colors text-center"
          >
            {t('login')}
          </Link>
          <Link
            href="/register"
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-center"
          >
            {t('register')}
          </Link>
        </div>
      </div>
    </nav>
  );
}