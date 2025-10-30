'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LogOut, LayoutDashboard, Activity, DollarSign, Settings, Menu, X, Loader2 } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, logout, user } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('❌ No autenticado, redirigiendo a login...');
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Mostrar loader mientras se verifica autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (se está redirigiendo)
  if (!isAuthenticated) {
    return null;
  }

  // Función para obtener el nombre de usuario a mostrar
  const getUserDisplayName = () => {
    if (!user) return 'Usuario';
    return user.nombre || user.email || 'Usuario';
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Navbar */}
      <nav className="bg-card border-b border-border fixed w-full z-10 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link href="/dashboard" className="text-xl font-bold text-primary ml-2 md:ml-0">
                AnkaPulse
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {getUserDisplayName()}
              </span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-muted-foreground hover:text-destructive transition-colors p-2 rounded-md hover:bg-accent"
                title="Cerrar sesión"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <nav className="p-4 space-y-2">
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
              >
                <LayoutDashboard size={20} />
                <span>Panel Principal</span>
              </Link>
              
              <Link
                href="/checks"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
              >
                <Activity size={20} />
                <span>Monitoreo</span>
              </Link>
              
              <Link
                href="/pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
              >
                <DollarSign size={20} />
                <span>Planes</span>
              </Link>
              
              <Link
                href="/settings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
              >
                <Settings size={20} />
                <span>Configuración</span>
              </Link>
            </nav>
          </div>
        )}
      </nav>

      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-card border-r border-border fixed h-full overflow-y-auto hidden md:block">
          <nav className="p-4 space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
            >
              <LayoutDashboard size={20} />
              <span>Panel Principal</span>
            </Link>
            
            <Link
              href="/checks"
              className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
            >
              <Activity size={20} />
              <span>Monitoreo</span>
            </Link>
            
            <Link
              href="/pricing"
              className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
            >
              <DollarSign size={20} />
              <span>Planes</span>
            </Link>
            
            {/* <Link
              href="/settings"
              className="flex items-center space-x-3 px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
            >
              <Settings size={20} />
              <span>Configuración</span>
            </Link> */}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:ml-64 p-6 bg-background min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}