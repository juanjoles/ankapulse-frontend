'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useChecks } from '@/hooks/useChecks';
import { usePlan } from '@/hooks/usePlan';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const checkSchema = z.object({
  url: z.string().url('URL inválida'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional().or(z.literal('')),
  interval: z.string(),
  timeout: z.number().min(5).max(60).optional(),
  expectedStatusCode: z.number().min(100).max(599).optional(),
});

type CheckFormData = z.infer<typeof checkSchema>;

interface UpgradeInfo {
  success: boolean;
  error?: string;
  code?: string;
  requiredPlan?: string;
  currentLimit?: number;
  suggestedPlan?: string;
}

export default function NewCheckPage() {
  const router = useRouter();
  const { createCheck } = useChecks();
  const { usage, isIntervalAllowed } = usePlan();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeInfo, setUpgradeInfo] = useState<UpgradeInfo | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckFormData>({
    resolver: zodResolver(checkSchema),
    defaultValues: {
      interval: '30min',
      timeout: 30,
      expectedStatusCode: 200,
    },
  });

  const onSubmit = async (data: CheckFormData) => {
    setIsLoading(true);
    setError(null);

    const result = await createCheck({
      url: data.url,
      name: data.name || undefined,
      interval: data.interval,
      timeout: data.timeout,
      expectedStatusCode: data.expectedStatusCode,
      regions: ['us-east'],
    });

    if (result.success) {
      router.push('/dashboard');
    } else {
      // Si el error es por límite de plan, mostrar modal de upgrade
      if (result.code === 'CHECKS_LIMIT_REACHED' || result.code === 'INTERVAL_NOT_ALLOWED') {
        setUpgradeInfo(result);
        setShowUpgradeModal(true);
      } else {
        setError(result.error || 'Error al crear check');
      }
    }

    setIsLoading(false);
  };

  const intervals = [
    { value: '1min', label: '1 minuto', minPlan: 'pro' },
    { value: '5min', label: '5 minutos', minPlan: 'starter' },
    { value: '15min', label: '15 minutos', minPlan: 'starter' },
    { value: '30min', label: '30 minutos', minPlan: 'free' },
    { value: '1h', label: '1 hora', minPlan: 'free' },
    { value: '1d', label: '1 día', minPlan: 'free' },
  ];

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

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver al Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Crear Nuevo Check</h1>
        <p className="text-muted-foreground mt-1">
          Configura un nuevo check para monitorear tu API o sitio web
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-card-foreground mb-2">
                URL *
              </label>
              <input
                {...register('url')}
                type="url"
                id="url"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="https://api.example.com/health"
              />
              {errors.url && (
                <p className="text-destructive text-sm mt-1">{errors.url.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                Nombre (opcional)
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="Mi API de Producción"
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="interval" className="block text-sm font-medium text-card-foreground mb-2">
                Intervalo de Monitoreo *
              </label>
              <select
                {...register('interval')}
                id="interval"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                {intervals.map((int) => {
                  const minutes = getIntervalMinutes(int.value);
                  const allowed = isIntervalAllowed(minutes);
                  return (
                    <option key={int.value} value={int.value} disabled={!allowed}>
                      {int.label} {!allowed && `(Requiere plan ${int.minPlan})`}
                    </option>
                  );
                })}
              </select>
              <p className="text-sm text-muted-foreground mt-1">
                Tu plan {usage?.plan?.name || 'Free'} permite intervalos de {usage?.usage?.minInterval?.formatted || '30 minutos'} o más
              </p>
            </div>

            <div>
              <label htmlFor="timeout" className="block text-sm font-medium text-card-foreground mb-2">
                Timeout (segundos)
              </label>
              <input
                {...register('timeout', { valueAsNumber: true })}
                type="number"
                id="timeout"
                min="5"
                max="60"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="expectedStatusCode" className="block text-sm font-medium text-card-foreground mb-2">
                Status Code Esperado
              </label>
              <input
                {...register('expectedStatusCode', { valueAsNumber: true })}
                type="number"
                id="expectedStatusCode"
                min="100"
                max="599"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Creando...' : 'Crear Check'}
              </button>
              <Link
                href="/dashboard"
                className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg hover:bg-secondary/80 transition-colors text-center"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    Límite de Plan Alcanzado
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {upgradeInfo?.error}
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/pricing"
                  className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-center"
                >
                  Ver Planes
                </Link>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}