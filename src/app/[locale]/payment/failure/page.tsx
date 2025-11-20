'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft, CreditCard, MessageCircle, RefreshCw } from 'lucide-react';
import { Suspense } from 'react';

function PaymentFailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Posibles parámetros que MP puede enviar
  const collection_status = searchParams.get('collection_status');
  const payment_status = searchParams.get('payment_status');
  const external_reference = searchParams.get('external_reference');

  const getErrorMessage = () => {
    if (collection_status === 'failure' || payment_status === 'failure') {
      return "El pago fue rechazado por tu banco o tarjeta.";
    }
    if (collection_status === 'pending' || payment_status === 'pending') {
      return "Tu pago está siendo procesado. Te notificaremos cuando se complete.";
    }
    return "Hubo un problema procesando tu pago.";
  };

  const getRecommendation = () => {
    if (collection_status === 'failure' || payment_status === 'failure') {
      return "Verifica que los datos de tu tarjeta sean correctos y que tengas fondos suficientes.";
    }
    if (collection_status === 'pending' || payment_status === 'pending') {
      return "No necesitas hacer nada más. El proceso puede tomar unos minutos.";
    }
    return "Puedes intentar nuevamente o contactar a nuestro soporte.";
  };

  const isPending = collection_status === 'pending' || payment_status === 'pending';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {isPending ? (
          <RefreshCw className="w-16 h-16 text-yellow-500 mx-auto mb-6 animate-spin" />
        ) : (
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
        )}
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {isPending ? 'Pago Pendiente' : 'Pago Fallido'}
        </h1>
        
        <p className="text-gray-600 mb-4">
          {getErrorMessage()}
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Recomendación:</span> {getRecommendation()}
          </p>
        </div>

        {external_reference && (
          <div className="mb-6">
            <p className="text-xs text-gray-500">
              Referencia: {external_reference.split('-')[0].slice(0, 8)}...
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          {!isPending && (
            <button
              onClick={() => router.push('/dashboard/billing')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <CreditCard className="w-4 h-4" />
              Intentar Nuevamente
            </button>
          )}
          
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Dashboard
          </button>
          
          <button
            onClick={() => window.open('mailto:support@ankapulse.app', '_blank')}
            className="w-full bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            Contactar Soporte
          </button>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {isPending 
              ? "Recibirás una notificación cuando el pago se procese"
              : "No se realizó ningún cargo a tu tarjeta"
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <PaymentFailureContent />
    </Suspense>
  );
}