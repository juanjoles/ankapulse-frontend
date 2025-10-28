"use client"

import Link from 'next/link';
import { Activity } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function NavbarClient() {
  return (
    <nav className="flex justify-between items-center">
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        <h1 className="text-lg sm:text-2xl font-bold text-foreground">AnkaPulse</h1>
      </div>
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Link 
          href="/login" 
          className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
        >
          Iniciar Sesión
        </Link>
        <Link 
          href="/register" 
          className="text-sm bg-primary text-primary-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span className="sm:hidden">Comenzar</span>
          <span className="hidden sm:inline">Comenzar Gratis</span>
        </Link>
      </div>
    </nav>
  );
}