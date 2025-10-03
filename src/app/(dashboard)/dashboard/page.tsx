// src/app/(dashboard)/dashboard/page.tsx
'use client';

import { useChecks } from '@/hooks/useChecks';
import { usePlan } from '@/hooks/usePlan';
import Link from 'next/link';
import { Activity, TrendingUp, Clock, Plus, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { checks } = useChecks();
  const { usage } = usePlan();

  const activeChecks = checks.filter((c) => c.status === 'active').length;
  const checksUp = checks.filter((c) => c.lastStatus === 'up').length;
  const checksDown = checks.filter((c) => c.lastStatus === 'down').length;
  const avgUptime = checks.length > 0 
    ? ((checksUp / checks.length) * 100).toFixed(1) 
    : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Vista general de tu monitoreo</p>
      </div>

      {/* Plan Info - Solo si es relevante */}
      {usage && usage.plan.type === 'free' && (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Plan Free</h3>
              <p className="text-blue-100 text-sm mt-1">
                {usage.usage.checks.current} de {usage.usage.checks.limit} checks usados
              </p>
            </div>
            <Link
              href="/pricing"
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Upgrade
            </Link>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Checks</p>
            <Activity className="text-blue-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-900">{checks.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Uptime Promedio</p>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-green-600">{avgUptime}%</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Online</p>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{checksUp}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Con Problemas</p>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{checksDown}</p>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Acciones Rápidas</h2>
          <div className="space-y-3">
            <Link
              href="/checks/new"
              className="flex items-center justify-between p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
            >
              <div className="flex items-center space-x-3">
                <Plus className="text-gray-400 group-hover:text-blue-600" size={24} />
                <div>
                  <p className="font-medium text-gray-900">Nuevo Check</p>
                  <p className="text-sm text-gray-600">Monitorea una nueva URL</p>
                </div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-blue-600" size={20} />
            </Link>

            <Link
              href="/checks"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition group"
            >
              <div className="flex items-center space-x-3">
                <Activity className="text-gray-400 group-hover:text-blue-600" size={24} />
                <div>
                  <p className="font-medium text-gray-900">Ver Todos los Checks</p>
                  <p className="text-sm text-gray-600">Gestiona tu monitoreo</p>
                </div>
              </div>
              <ArrowRight className="text-gray-400 group-hover:text-blue-600" size={20} />
            </Link>
          </div>
        </div>

        {/* Recent Problems */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Problemas Recientes</h2>
          {checksDown > 0 ? (
            <div className="space-y-3">
              {checks
                .filter((c) => c.lastStatus === 'down')
                .slice(0, 3)
                .map((check) => (
                  <Link
                    key={check.id}
                    href={`/checks/${check.id}`}
                    className="block p-3 border border-red-200 rounded-lg bg-red-50 hover:bg-red-100 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{check.name || check.url}</p>
                        <p className="text-sm text-gray-600 mt-1">{check.url}</p>
                        {check.failureCount > 0 && (
                          <p className="text-xs text-red-600 mt-1">
                            {check.failureCount} fallas consecutivas
                          </p>
                        )}
                      </div>
                      <span className="text-red-600 text-sm font-medium">DOWN</span>
                    </div>
                  </Link>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Activity className="text-green-600" size={24} />
              </div>
              <p className="text-gray-600">¡Todo funcionando bien! 🎉</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA si no tiene checks */}
      {checks.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Clock className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Comienza a Monitorear
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Crea tu primer check para empezar a monitorear tus APIs y recibir alertas
          </p>
          <Link
            href="/checks/new"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            <span>Crear Primer Check</span>
          </Link>
        </div>
      )}
    </div>
  );
}