'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useChecks } from '@/hooks/useChecks';
import { usePlan } from '@/hooks/usePlan';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const checkSchema = z.object({
  url: z.string().url('URL inválida'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional().or(z.literal('')),
  interval: z.string(),
  timeout: z.number().min(5).max(60).optional(),
  expectedStatusCode: z.number().min(100).max(599).optional(),
});

type CheckFormData = z.infer<typeof checkSchema>;

export default function NewCheckPage() {
  const router = useRouter();
  const { createCheck } = useChecks();
  const { usage, isIntervalAllowed } = usePlan();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeInfo, setUpgradeInfo] = useState<any>(null);

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
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-4"
        >
          <ArrowLeft size={20} />
          <span>Volver al Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Check</h1>
        <p className="text-gray-600 mt-1">
          Configura un nuevo check para monitorear tu API o sitio web
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              URL *
            </label>
            <input
              {...register('url')}
              type="url"
              id="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://api.example.com/health"
            />
            {errors.url && (
              <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre (opcional)
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Mi API de Producción"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="interval" className="block text-sm font-medium text-gray-700 mb-2">
              Intervalo de Monitoreo *
            </label>
            <select
              {...register('interval')}
              id="interval"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <p className="text-sm text-gray-600 mt-1">
              Tu plan {usage?.plan.name} permite intervalos de {usage?.usage.minInterval.formatted} o más
            </p>
          </div>

          <div>
            <label htmlFor="timeout" className="block text-sm font-medium text-gray-700 mb-2">
              Timeout (segundos)
            </label>
            <input
              {...register('timeout', { valueAsNumber: true })}
              type="number"
              id="timeout"
              min="5"
              max="60"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="expectedStatusCode" className="block text-sm font-medium text-gray-700 mb-2">
              Status Code Esperado
            </label>
            <input
              {...register('expectedStatusCode', { valueAsNumber: true })}
              type="number"
              id="expectedStatusCode"
              min="100"
              max="599"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? 'Creando...' : 'Crear Check'}
            </button>
            <Link
              href="/dashboard"
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition text-center"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Límite de Plan Alcanzado
            </h3>
            <p className="text-gray-600 mb-6">
              {upgradeInfo?.error}
            </p>
            <div className="flex space-x-4">
              <Link
                href="/pricing"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition text-center"
              >
                Ver Planes
              </Link>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}