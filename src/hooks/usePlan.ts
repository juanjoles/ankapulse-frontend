'use client';

import { useState, useEffect } from 'react';
import { subscriptionsApi, getErrorMessage } from '@/lib/api';
import type { Profile, PlanUsage, Subscription, Payment } from '@/types';

export const usePlan = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [usage, setUsage] = useState<PlanUsage | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch plan actual
  const fetchPlan = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await subscriptionsApi.getCurrent();
      const data = response.data.data;
      
      setProfile(data.profile);
      setUsage(data.usage);
      setSubscription(data.subscription);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  // Crear preferencia de pago (ORIGINAL - mantener compatibilidad)
  const createPreference = async (planType: 'starter' | 'pro') => {
    try {
      setError(null);
      console.log('🚀 Creando preferencia para plan:', planType);
      
      const currentPlan = usage?.plan?.type || 'free';
      
      // Si no es un upgrade desde FREE, usar changePlan
      if (currentPlan !== 'free') {
        console.log('🔄 No es upgrade desde FREE, usando changePlan');
        return await changePlan(planType);
      }
      
      const response = await subscriptionsApi.createPreference({ planType });
      console.log('📋 Respuesta de createPreference:', response.data);
      
      const responseData = response.data.data || response.data;
      const checkoutUrl = responseData.checkoutUrl || responseData.init_point || responseData.checkout_url;
      
      console.log('🔍 URL de checkout encontrada:', checkoutUrl);
      
      if (checkoutUrl) {
        return { 
          success: true, 
          checkoutUrl,
          data: responseData 
        };
      } else {
        console.error('❌ No se encontró URL de checkout en la respuesta');
        throw new Error('No se recibió URL de checkout del servidor');
      }
      
    } catch (err) {
      console.error('❌ Error en createPreference:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Cambiar plan (upgrade, downgrade o lateral)
  const changePlan = async (planType: 'free' | 'starter' | 'pro') => {
    try {
      setError(null);
      console.log('🔄 Cambiando a plan:', planType);
      
      const currentPlan = usage?.plan?.type || 'free';
      console.log('📋 Plan actual:', currentPlan, '→ Plan objetivo:', planType);
      
      // Si es cambio a FREE, usar downgrade
      if (planType === 'free') {
        const response = await subscriptionsApi.downgrade({ planType });
        console.log('✅ Downgrade a FREE exitoso:', response.data);
        await fetchPlan();
        return { success: true };
      }
      
      // Para planes de pago, usar changePlan
      const response = await subscriptionsApi.changePlan({ planType });
      console.log('📋 Respuesta de changePlan:', response.data);
      
      const responseData = response.data.data || response.data;
      const checkoutUrl = responseData.checkoutUrl || responseData.init_point || responseData.checkout_url;
      
      console.log('🔍 URL de checkout encontrada:', checkoutUrl);
      
      if (checkoutUrl) {
        return { 
          success: true, 
          checkoutUrl,
          data: responseData 
        };
      } else {
        // Si no hay checkout URL, significa que el cambio fue directo
        console.log('✅ Cambio de plan directo sin pago');
        await fetchPlan();
        return { success: true };
      }
      
    } catch (err) {
      console.error('❌ Error en changePlan:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Downgrade a plan free (MANTENER para compatibilidad)
  const downgradeToPlan = async (planType: 'free') => {
    return await changePlan(planType);
  };

  // Cancelar suscripción
  const cancelSubscription = async () => {
    try {
      setError(null);
      await subscriptionsApi.cancel();
      await fetchPlan();
      return { success: true };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Obtener historial de pagos
  const getPayments = async (): Promise<Payment[]> => {
    try {
      const response = await subscriptionsApi.getPayments();
      return response.data.data.payments || [];
    } catch (err) {
      console.error('Error fetching payments:', err);
      return [];
    }
  };

  // Verificar si puede crear más checks
  const canCreateCheck = (): boolean => {
    if (!usage) return false;
    return usage.usage.checks.current < usage.usage.checks.limit;
  };

  // Verificar si un intervalo es permitido
  const isIntervalAllowed = (intervalMinutes: number): boolean => {
    if (!usage) return false;
    return intervalMinutes >= usage.usage.minInterval.minutes;
  };

  // Para testing - upgrade directo sin pago
  const upgradeTest = async (planType: 'starter' | 'pro') => {
    try {
      setError(null);
      console.log('🧪 TESTING: Upgrade directo a:', planType);
      
      const response = await subscriptionsApi.upgradeTest({ planType });
      console.log('✅ Upgrade de testing exitoso:', response.data);
      
      await fetchPlan(); // Refrescar datos
      return { success: true };
    } catch (err) {
      console.error('❌ Error en upgrade de testing:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  return {
    profile,
    usage,
    subscription,
    loading,
    error,
    fetchPlan,
    createPreference,     // MANTENER para compatibilidad
    changePlan,           // NUEVO
    downgradeToPlan,      // MANTENER para compatibilidad
    cancelSubscription,
    getPayments,
    canCreateCheck,
    isIntervalAllowed,
    upgradeTest,          // Para testing
  };
};