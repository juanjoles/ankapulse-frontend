"use client"

import Link from 'next/link';
import { Activity } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function NavbarClient() {
  return (
    <nav className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Activity className="w-8 h-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">AnkaPulse</h1>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
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
  );
}