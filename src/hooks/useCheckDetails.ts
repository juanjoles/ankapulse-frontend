'use client';

import { useState, useEffect } from 'react';
import { checksApi, getErrorMessage } from '@/lib/api';
import type { Check, CheckMetrics, CheckResult } from '@/types';

export const useCheckDetails = (checkId: string) => {
  const [check, setCheck] = useState<Check | null>(null);
  const [metrics, setMetrics] = useState<CheckMetrics | null>(null);
  const [results, setResults] = useState<CheckResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCheckDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch check info
      const checkResponse = await checksApi.getById(checkId);
      console.log('✅ Check response:', checkResponse.data);
      
      const checkData = checkResponse.data.data?.check || checkResponse.data.check || checkResponse.data;
      setCheck(checkData);

      // Fetch results and metrics
      const resultsResponse = await checksApi.getResults(checkId, { limit: 100 });
      console.log('✅ Results response:', resultsResponse.data);
      
      const responseData = resultsResponse.data.data || resultsResponse.data;

      setMetrics(responseData.metrics || null);
      setResults(responseData.results || []);
    } catch (err) {
      console.error('❌ Error fetchCheckDetails:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (checkId) {
      fetchCheckDetails();
    }
  }, [checkId]);

  return {
    check,
    metrics,
    results,
    loading,
    error,
    refetch: fetchCheckDetails,
  };
};