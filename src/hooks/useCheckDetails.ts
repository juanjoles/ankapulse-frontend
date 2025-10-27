'use client';

import { useState, useEffect, useCallback } from 'react';
import { checksApi, getErrorMessage } from '@/lib/api';
import type { Check, CheckMetrics, CheckResult } from '@/types';

export const useCheckDetails = (checkId: string) => {
  const [check, setCheck] = useState<Check | null>(null);
  const [metrics, setMetrics] = useState<CheckMetrics | null>(null);
  const [results, setResults] = useState<CheckResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✨ Función para obtener detalles del check y sus resultados
  const fetchCheckDetails = useCallback(async () => {
    if (!checkId) return;

    try {
      console.log('🔍 Fetching check details for:', checkId);
      
      // 1. Obtener datos básicos del check usando /checks/:id
      const checkResponse = await checksApi.getById(checkId);
      console.log('📊 Check data received:', checkResponse.data);

      const checkData = checkResponse.data.data || checkResponse.data;
      setCheck(checkData);

      // 2. Obtener resultados del check usando /checks/:id/results
      try {
        const resultsResponse = await checksApi.getResults(checkId);
        console.log('📊 Results data received:', resultsResponse.data);
        
        const resultsData = resultsResponse.data;
        
        // Extraer métricas y resultados
        setMetrics(resultsData.metrics || {
          totalChecks: 0,
          successfulChecks: 0,
          failedChecks: 0,
          uptimePercentage: '0%',
          averageLatency: 0,
        });
        
        setResults(resultsData.results || []);
        
      } catch (resultsError) {
        console.warn('⚠️ Error fetching results, using defaults:', resultsError);
        // Si no se pueden obtener resultados, usar valores por defecto
        setMetrics({
          totalChecks: 0,
          successfulChecks: 0,
          failedChecks: 0,
          uptimePercentage: 0,
          averageLatency: 0,
        });
        setResults([]);
      }

      setError(null);
    } catch (err: any) {
      console.error('❌ Error fetching check details:', err);
      setError(getErrorMessage(err));
    }
  }, [checkId]);

  // ✨ Función refetch expuesta
  const refetch = useCallback(async () => {
    setLoading(true);
    await fetchCheckDetails();
    setLoading(false);
  }, [fetchCheckDetails]);

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await fetchCheckDetails();
      setLoading(false);
    };

    loadInitialData();
  }, [fetchCheckDetails]);

  return {
    check,
    metrics,
    results,
    loading,
    error,
    refetch, // ✨ Exponemos refetch para auto-refresh
  };
};