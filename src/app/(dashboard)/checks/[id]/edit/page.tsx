'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { checksApi } from '@/lib/api';

interface EditCheckPageProps {
  params: { id: string };
}

export default function EditCheckPage({ params }: EditCheckPageProps) {
  const router = useRouter();
  const { id } = params;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [check, setCheck] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    interval: 5,
    timeout: 30,
    expectedStatusCode: 200,
    method: 'GET',
    regions: ['us-east-1'],
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
          interval: checkData.interval || 5,
          timeout: checkData.timeout || 30,
          expectedStatusCode: checkData.expectedStatusCode || 200,
          method: checkData.method || 'GET',
          regions: checkData.regions || ['us-east-1'],
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
          <Link href="/checks" className="text-primary hover:underline mt-2 inline-block">
            Volver a checks
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
              Intervalo (minutos)
            </label>
            <select
              value={formData.interval}
              onChange={(e) => setFormData({ ...formData, interval: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value={1}>1 minuto</option>
              <option value={5}>5 minutos</option>
              <option value={10}>10 minutos</option>
              <option value={15}>15 minutos</option>
              <option value={30}>30 minutos</option>
            </select>
          </div>

          {/* Método HTTP */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Método HTTP
            </label>
            <select
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="HEAD">HEAD</option>
            </select>
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