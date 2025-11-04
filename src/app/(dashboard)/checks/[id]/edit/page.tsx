'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { checksApi } from '@/lib/api';
import { usePlan } from '@/hooks/usePlan'; 

interface EditCheckPageProps {
  params: { id: string };
}

export default function EditCheckPage({ params }: EditCheckPageProps) {
  const router = useRouter();
  const { id } = params;
  const { usage, isIntervalAllowed } = usePlan(); // ← USAR el hook usePlan
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [check, setCheck] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    interval: '30min',
    timeout: 30,
    expectedStatusCode: 200,
  });

  // Cargar datos del check
  useEffect(() => {
    const loadCheck = async () => {
      try {
        const response = await checksApi.getById(id);
        const checkData = response.data;
        
        setCheck(checkData);
        setFormData({
          name: checkData.name || '',
          url: checkData.url || '',
          interval: checkData.interval || '30min',
          timeout: checkData.timeout || 30,
          expectedStatusCode: checkData.expectedStatusCode || 200,
        });
      } catch (error) {
        console.error('Error loading check:', error);
        setError('Error cargando el check');
      } finally {
        setLoading(false);
      }
    };

    loadCheck();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await checksApi.update(id, formData);
      router.push(`/checks/${id}`);
    } catch (error: any) {
      console.error('Error updating check:', error);
      setError(error.response?.data?.message || 'Error actualizando el check');
    } finally {
      setSaving(false);
    }
  };

  const intervals = [
    { value: '1min', label: '1 minuto', minPlan: 'pro', minutes: 1 },
    { value: '5min', label: '5 minutos', minPlan: 'starter', minutes: 5 },
    { value: '15min', label: '15 minutos', minPlan: 'starter', minutes: 15 },
    { value: '30min', label: '30 minutos', minPlan: 'free', minutes: 30 },
    { value: '1h', label: '1 hora', minPlan: 'free', minutes: 60 },
  ];

  // ✅ AGREGAR esta función para obtener minutos del intervalo
  const getIntervalMinutes = (interval: string): number => {
    const map: Record<string, number> = {
      '1min': 1,
      '5min': 5,
      '15min': 15,
      '30min': 30,
      '1h': 60,
      '1d': 1440,
    };
    return map[interval] || 60;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-muted-foreground">Cargando check...</p>
        </div>
      </div>
    );
  }

  if (!check) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Check no encontrado</p>
          <Link href="/dashboard" className="text-primary hover:underline mt-2 inline-block">
            Volver al dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <Link
              href={`/checks/${id}`}
              className="p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">Editar Check</h1>
              <p className="text-sm text-muted-foreground">{check.url}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nombre del Check
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Mi API"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              URL *
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://api.example.com/health"
              required
            />
          </div>

          {/* Intervalo */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Intervalo de Monitoreo
            </label>
            <select
              value={formData.interval}
              onChange={(e) => setFormData({ ...formData, interval: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {intervals.map((int) => {
                // ✅ USAR isIntervalAllowed del hook usePlan
                const allowed = isIntervalAllowed(int.minutes);
                return (
                  <option key={int.value} value={int.value} disabled={!allowed}>
                    {int.label} {!allowed && `(Requiere plan ${int.minPlan})`}
                  </option>
                );
              })}
            </select>
            {/* ✅ MOSTRAR información del plan actual usando el hook usePlan */}
            <p className="text-sm text-muted-foreground mt-1">
              Tu plan {usage?.plan?.name || 'Free'} permite intervalos de {usage?.usage?.minInterval?.formatted || '30 minutos'} o más
            </p>
          </div>

          {/* Timeout */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Timeout (segundos)
            </label>
            <input
              type="number"
              value={formData.timeout}
              onChange={(e) => setFormData({ ...formData, timeout: parseInt(e.target.value) })}
              min="5"
              max="60"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Status Code Esperado */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status Code Esperado
            </label>
            <input
              type="number"
              value={formData.expectedStatusCode}
              onChange={(e) => setFormData({ ...formData, expectedStatusCode: parseInt(e.target.value) })}
              min="100"
              max="599"
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>
            
            <Link
              href={`/checks/${id}`}
              className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}