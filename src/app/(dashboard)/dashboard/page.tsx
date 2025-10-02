'use client';

import { useChecks } from '@/hooks/useChecks';
import { usePlan } from '@/hooks/usePlan';
import Link from 'next/link';
import { Activity, CheckCircle, AlertCircle, Plus } from 'lucide-react';

export default function DashboardPage() {
  const { checks, loading: checksLoading } = useChecks();
  const { usage, loading: planLoading } = usePlan();

  const loading = checksLoading || planLoading;

  // Calcular estadísticas
  const activeChecks = checks.filter((c) => c.status === 'active').length;
  const checksUp = checks.filter((c) => c.lastStatus === 'up').length;
  const checksDown = checks.filter((c) => c.lastStatus === 'down').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Bienvenido a tu panel de monitoreo
        </p>
      </div>

      {/* Plan Badge */}
      {usage && (
        <div className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">
                Plan {usage.plan.name}
              </h3>
              <p className="text-blue-100 text-sm">
                {usage.usage.checks.current} de {usage.usage.checks.limit} checks usados
              </p>
            </div>
            {usage.plan.type === 'free' && (
              <Link
                href="/pricing"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Upgrade
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Checks Activos</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {activeChecks}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Activity className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Funcionando</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {checksUp}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Con Problemas</p>
              <p className="text-3xl font-bold text-red-600 mt-1">
                {checksDown}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertCircle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Checks List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Tus Checks
          </h2>
          <Link
            href="/checks/new"
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            <span>Nuevo Check</span>
          </Link>
        </div>

        <div className="p-6">
          {checks.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No tienes checks todavía
              </h3>
              <p className="text-gray-600 mb-6">
                Crea tu primer check para empezar a monitorear tus APIs
              </p>
              <Link
                href="/checks/new"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={20} />
                <span>Crear Primer Check</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {checks.map((check) => (
                <Link
                  key={check.id}
                  href={`/checks/${check.id}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          check.lastStatus === 'up'
                            ? 'bg-green-500'
                            : check.lastStatus === 'down'
                            ? 'bg-red-500'
                            : 'bg-gray-400'
                        }`}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {check.name || check.url}
                        </h3>
                        <p className="text-sm text-gray-600">{check.url}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">
                        Intervalo: {check.interval}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}