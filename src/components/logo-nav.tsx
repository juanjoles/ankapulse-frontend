"use client"

import { Activity } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export function LogoNav() {
  return (
    <nav className="flex justify-between items-center">
      {/* Logo clickeable que redirige a la landing */}
      <Link 
        href="/" 
        className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer group"
      >
        <Activity className="w-8 h-8 text-primary group-hover:scale-105 transition-transform" />
        <span className="text-2xl font-bold text-foreground">
          AnkaPulse
        </span>
      </Link>

      {/* Solo el toggle de tema */}
      <ThemeToggle />
    </nav>
  );
}