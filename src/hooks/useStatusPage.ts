'use client';

import { useState, useEffect, useCallback } from 'react';
import { statusPageApi } from '@/lib/api';
import { StatusPageConfig } from '@/types/index';
import toast from 'react-hot-toast';

export function useStatusPage() {
  const [config, setConfig] = useState<StatusPageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const response = await statusPageApi.getConfig();
      setConfig(response.data.data);
      setError(null);
    } catch (err: any) {
      // 404 es normal si no tiene status page
      if (err.response?.status === 404) {
        setConfig(null);
        setError(null);
      } else {
        setError('Error al cargar configuración');
        console.error('Error fetching status page config:', err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const createOrUpdate = async (data: {
    slug: string;
    enabled: boolean;
    title?: string;
    description?: string;
    monitorIds: string[];
  }) => {
    try {
      const response = await statusPageApi.createOrUpdate(data);
      setConfig(response.data.data);
      toast.success(config ? 'Status page actualizado' : 'Status page creado');
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.error || 'Error al guardar';
      toast.error(message);
      throw err;
    }
  };

  const disable = async () => {
    try {
      await statusPageApi.disable();
      setConfig(null);
      toast.success('Status page deshabilitado');
    } catch (err: any) {
      const message = err.response?.data?.error || 'Error al deshabilitar';
      toast.error(message);
      throw err;
    }
  };

  const checkSlugAvailability = async (slug: string): Promise<boolean> => {
    try {
      const response = await statusPageApi.checkSlugAvailability(slug);
      return response.data.available;
    } catch (err) {
      console.error('Error checking slug:', err);
      return false;
    }
  };

  return {
    config,
    loading,
    error,
    createOrUpdate,
    disable,
    checkSlugAvailability,
    refetch: fetchConfig,
  };
}