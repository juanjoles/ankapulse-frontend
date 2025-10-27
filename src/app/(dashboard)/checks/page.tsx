'use client';

import { useState } from 'react';
import { Plus, RefreshCw, AlertCircle, CheckCircle, Clock, Trash2, BarChart3, Pause, Wifi, WifiOff } from 'lucide-react';
import { useChecks } from '@/hooks/useChecks';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ChecksPage() {
  const { checks, loading, error, fetchChecks, deleteCheck } = useChecks();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchChecks();
    setIsRefreshing(false);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteCheck(id);
    if (result.success) {
      setDeleteConfirm(null);
    }
  };

  const isOffline = error && (error.includes('Network Error') || error.includes('No se pudo conectar'));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-muted-foreground">Cargando checks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className="text-2xl font-bold text-card-foreground">AnkaPulse</h1>
                <p className="text-sm text-muted-foreground">Panel de Monitoreo</p>
              </div>
              {isOffline && (
                <div className="flex items-center space-x-1 text-destructive text-sm">
                  <WifiOff className="w-4 h-4" />
                  <span>Sin conexión</span>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                title="Actualizar"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <Link
                href="/checks/new"
                className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Nuevo Check</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {error && !isOffline && (
          <Card className="mb-4 border-destructive">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {isOffline && (
          <Card className="mb-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
            <CardContent className="pt-6">
              <div className="flex items-center text-yellow-700 dark:text-yellow-400">
                <WifiOff className="w-5 h-5 mr-2" />
                <div>
                  <p className="font-medium">Sin conexión al servidor</p>
                  <p className="text-sm">Verifica que el backend esté ejecutándose en http://localhost:3000</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Checks List */}
        <Card>
          <CardHeader>
            <CardTitle>Todos los Checks</CardTitle>
          </CardHeader>
          <CardContent>
            {checks.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">
                  {isOffline ? 'Sin conexión al servidor' : 'Aún no tienes checks'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {isOffline 
                    ? 'No se pueden cargar los checks. Verifica la conexión al backend.'
                    : 'Crea tu primer check para comenzar a monitorear tus APIs'
                  }
                </p>
                {!isOffline && (
                  <Link
                    href="/checks/new"
                    className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Crear Primer Check</span>
                  </Link>
                )}
                {isOffline && (
                  <button
                    onClick={handleRefresh}
                    className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Reintentar conexión</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {checks.map((check) => (
                  <Card key={check.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Badge variant={check.lastStatus === 'up' ? 'default' : 'destructive'}>
                            {check.lastStatus === 'up' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <AlertCircle className="w-3 h-3 mr-1" />
                            )}
                            {check.lastStatus === 'up' ? 'En línea' : 'Fuera de línea'}
                          </Badge>
                          <div>
                            <h3 className="font-medium text-card-foreground">{check.name || 'Sin nombre'}</h3>
                            <p className="text-sm text-muted-foreground">{check.url}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/checks/${check.id}`}
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            Ver detalles
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(check.id)}
                            className="text-destructive hover:text-destructive/80 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}