'use client';

import { useState } from 'react';
import { Plus, RefreshCw, AlertCircle, CheckCircle, Clock, Trash2, BarChart3, Pause, Play } from 'lucide-react';
import { useChecks } from '@/hooks/useChecks';
import Link from 'next/link';

const regionNames: Record<string, string> = {
  'us-east': '🇺🇸 New York',
  'sa-east': '🇧🇷 São Paulo', 
  'eu-central': '🇩🇪 Frankfurt'
};

const intervalLabels: Record<string, string> = {
  '1min': '1 minuto',
  '5min': '5 minutos',
  '15min': '15 minutos',
  '30min': '30 minutos',
  '1h': '1 hora',
  '1d': '1 día'
};

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

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'up': 
        return 'text-green-600 bg-green-100';
      case 'down': 
        return 'text-red-600 bg-red-100';
      default: 
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'up': 
        return <CheckCircle className="w-4 h-4" />;
      case 'down': 
        return <AlertCircle className="w-4 h-4" />;
      default: 
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatTimeSince = (date?: string) => {
    if (!date) return 'Never';
    const dateObj = new Date(date);
    const seconds = Math.floor((Date.now() - dateObj.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const activeChecks = checks.filter(c => c.status === 'active');
  const pausedChecks = checks.filter(c => c.status === 'paused');
  const upChecks = checks.filter(c => c.lastStatus === 'up').length;
  const downChecks = checks.filter(c => c.lastStatus === 'down').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Cargando checks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AnkaPulse</h1>
              <p className="text-sm text-gray-600">Monitoring Dashboard</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                title="Refrescar"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <Link
                href="/checks/new"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">New Check</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Status Overview Card */}
        {checks.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Status</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{upChecks}</div>
                <div className="text-sm text-gray-600 mt-1">✅ Healthy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{activeChecks.length}</div>
                <div className="text-sm text-gray-600 mt-1">📊 Active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{downChecks}</div>
                <div className="text-sm text-gray-600 mt-1">🔴 Down</div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Section - Only show if there are down checks */}
        {downChecks > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              Active Alerts
            </h2>
            <div className="space-y-3">
              {checks.filter(c => c.lastStatus === 'down').map(check => (
                <div key={check.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
                          🔴 DOWN
                        </span>
                        <span className="font-semibold text-gray-900">
                          {check.name || check.url}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{check.url}</p>
                      <p className="text-xs text-gray-500">
                        Last checked: {formatTimeSince(check.lastCheckAt)}
                      </p>
                      {check.failureCount > 0 && (
                        <p className="text-xs text-red-600 mt-1">
                          ⚠️ {check.failureCount} consecutive failures
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Checks List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">All Checks</h2>
          
          {checks.length === 0 ? (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No checks yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first check to start monitoring your APIs
              </p>
              <Link
                href="/checks/new"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Create First Check</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {checks.map((check) => (
                <div
                  key={check.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                >
                  {/* Check Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {check.name || 'Unnamed Check'}
                        </h3>
                        {check.lastStatus && (
                          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(check.lastStatus)}`}>
                            {getStatusIcon(check.lastStatus)}
                            <span>{check.lastStatus?.toUpperCase()}</span>
                          </span>
                        )}
                        {check.status === 'paused' && (
                          <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                            <Pause className="w-3 h-3" />
                            <span>PAUSED</span>
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 break-all">{check.url}</p>
                    </div>
                    <button
                      onClick={() => setDeleteConfirm(check.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition ml-2"
                      title="Delete check"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Check Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Interval</p>
                      <p className="font-medium text-gray-900">
                        {intervalLabels[check.interval]}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Timeout</p>
                      <p className="font-medium text-gray-900">{check.timeout}s</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Expected Status</p>
                      <p className="font-medium text-gray-900">{check.expectedStatusCode}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Last Check</p>
                      <p className="font-medium text-gray-900">
                        {formatTimeSince(check.lastCheckAt)}
                      </p>
                    </div>
                  </div>

                  {/* Regions */}
                  {check.regions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">Monitoring Regions:</p>
                      <div className="flex flex-wrap gap-2">
                        {check.regions.map((region) => (
                          <span
                            key={region}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700"
                          >
                            {regionNames[region] || region}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Failure Count Warning */}
                  {check.failureCount > 0 && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                      ⚠️ {check.failureCount} consecutive failure{check.failureCount > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Delete Check?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this check? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}