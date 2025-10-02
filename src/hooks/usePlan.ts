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

  // Crear preferencia de pago (upgrade)
  const createPreference = async (planType: 'starter' | 'pro') => {
    try {
      setError(null);
      const response = await subscriptionsApi.createPreference({ planType });
      const { checkoutUrl } = response.data.data;
      
      // Redirigir a Mercado Pago
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
      
      return { success: true };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Cancelar suscripción
  const cancelSubscription = async () => {
    try {
      setError(null);
      await subscriptionsApi.cancel();
      await fetchPlan(); // Refrescar datos
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

  return {
    profile,
    usage,
    subscription,
    loading,
    error,
    fetchPlan,
    createPreference,
    cancelSubscription,
    getPayments,
    canCreateCheck,
    isIntervalAllowed,
  };
};