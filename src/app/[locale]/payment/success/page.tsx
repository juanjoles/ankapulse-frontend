'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

interface PlanInfo {
  planType: string;
  maxChecks: number;
  minIntervalMinutes: number;
  planExpiresAt?: string;
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null);

  useEffect(() => {
    // Verificar el estado del plan del usuario
    const checkPlanStatus = async () => {
      try {
        const response = await fetch('/api/subscriptions/current');
        const data = await response.json();
        setPlanInfo(data);
      } catch (error) {
        console.error('Error verificando plan:', error);
      } finally {
        setLoading(false);
      }
    };

    checkPlanStatus();
  }, []);

  const formatExpirationDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          ¡Pago Exitoso!
        </h1>
        
        {loading ? (
          <div className="flex justify-center mb-6">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Activando tu plan...</span>
          </div>
        ) : planInfo ? (
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Tu plan <span className="font-semibold text-blue-600">{planInfo.planType.toUpperCase()}</span> ha sido activado exitosamente.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Características de tu plan:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• <span className="font-medium">{planInfo.maxChecks}</span> checks máximo</p>
                <p>• Intervalos desde <span className="font-medium">{planInfo.minIntervalMinutes} minutos</span></p>
                {planInfo.planExpiresAt && (
                  <p>• Válido hasta: <span className="font-medium">{formatExpirationDate(planInfo.planExpiresAt)}</span></p>
                )}
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              Ya puedes crear y configurar tus checks de monitoreo
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              Tu pago ha sido procesado exitosamente. Tu plan será activado en breve.
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            Ir al Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => router.push('/dashboard/billing')}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            Ver detalles de facturación
          </button>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Si tienes alguna pregunta, contacta nuestro soporte
          </p>
        </div>
      </div>
    </div>
  );
}