'use client';

import { useState, useEffect } from 'react';
import { checksApi, getErrorMessage } from '@/lib/api';
import type { Check, CreateCheckInput } from '@/types';

export const useChecks = () => {
  const [checks, setChecks] = useState<Check[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch checks
  const fetchChecks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await checksApi.list();
      
      // ✅ El backend devuelve directamente el array de checks
      // response.data ES el array
      const checksData = Array.isArray(response.data) 
        ? response.data 
        : response.data.data?.checks || response.data.checks || [];
      
      setChecks(checksData);
    } catch (err) {
      console.error('❌ Error fetchChecks:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Cargar checks al montar
  useEffect(() => {
    fetchChecks();
  }, []);

  // Crear check
  const createCheck = async (data: CreateCheckInput) => {
    try {
      setError(null);
      const response = await checksApi.create(data);
      
      // ✅ El backend devuelve el check con wrapper success/data
      const newCheck = response.data.data?.check || response.data.check || response.data;
      
      setChecks((prev) => [newCheck, ...prev]);
      return { success: true, check: newCheck };
    } catch (err: any) {
      console.error('❌ Error createCheck:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
        code: err.response?.data?.code,
        data: err.response?.data?.data,
      };
    }
  };

  // Eliminar check
  const deleteCheck = async (id: string) => {
    try {
      setError(null);
      await checksApi.delete(id);
      setChecks((prev) => prev.filter((check) => check.id !== id));
      return { success: true };
    } catch (err) {
      console.error('❌ Error deleteCheck:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Actualizar check
  const updateCheck = async (id: string, data: Partial<CreateCheckInput>) => {
    try {
      setError(null);
      const response = await checksApi.update(id, data);
      
      // ✅ Manejo flexible de respuesta
      const updatedCheck = response.data.data?.check || response.data.check || response.data;
      
      setChecks((prev) =>
        prev.map((check) => (check.id === id ? updatedCheck : check))
      );
      return { success: true, check: updatedCheck };
    } catch (err: any) {
      console.error('❌ Error updateCheck:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
        code: err.response?.data?.code,
        data: err.response?.data?.data,
      };
    }
  };

  return {
    checks,
    loading,
    error,
    fetchChecks,
    createCheck,
    deleteCheck,
    updateCheck,
  };
};