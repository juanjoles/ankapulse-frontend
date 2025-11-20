// src/lib/api.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getToken, clearToken } from './auth';
import type { ApiError } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Crear instancia de axios
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para agregar token a todas las requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Token expirado o inválido
    if (error.response?.status === 401) {
      clearToken();
      
      // Redirigir a login si no estamos ya ahí
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    // Limite de plan alcanzado
    if (error.response?.status === 403) {
      const errorData = error.response.data;
      
      if (errorData.code === 'CHECKS_LIMIT_REACHED' || errorData.code === 'INTERVAL_NOT_ALLOWED') {
        // El componente manejará este error y mostrará modal de upgrade
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Helper para extraer mensaje de error
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    return axiosError.response?.data?.message || axiosError.message || 'Error desconocido';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'Error desconocido';
};

// API endpoints tipados

// Auth
export const authApi = {
  login: (data: { email: string; password: string }) => 
    api.post('/auth/login', data),
  
  register: (data: { email: string; nombre: string; password: string }) => 
    api.post('/auth/register', data),
};

// User
export const userApi = {
  getProfile: () => 
    api.get('/users/profile'),
  
  updateProfile: (data: { nombre?: string; avatar?: string; email?: string }) => 
    api.patch('/users/profile', data),

  getAlertSettings: () => 
    api.get('/alerts/settings'),
  
  updateAlertSettings: (data: { 
    emailAlertsEnabled: boolean; 
    telegramAlertsEnabled: boolean; 
    telegramChatId: string 
  }) => 
    api.put('/alerts/settings', data),
};

// Checks
export const checksApi = {
  list: () => 
    api.get('/checks'),
  
  getById: (id: string) => 
    api.get(`/checks/${id}`),
  
  getResults: (id: string, params?: { limit?: number; region?: string }) => 
    api.get(`/checks/${id}/results`, { params }),
  
  create: (data: any) => 
    api.post('/checks', data),
  
  update: (id: string, data: any) => 
    api.put(`/checks/${id}`, data),
  
  delete: (id: string) => 
    api.delete(`/checks/${id}`),
};

// Status Pages
export const statusPageApi = {
  // Privadas (requieren auth)
  getConfig: () => 
    api.get('/status-page/config'),
  
  createOrUpdate: (data: {
    slug: string;
    enabled: boolean;
    title?: string;
    description?: string;
    monitorIds: string[];
  }) => 
    api.post('/status-page/config', data),
  
  disable: () => 
    api.delete('/status-page/config'),
  
  checkSlugAvailability: (slug: string) => 
    api.get(`/status-page/check-slug/${slug}`),
  
  // Pública (sin auth - no usa instancia api para evitar interceptor)
  getPublic: (slug: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    return axios.get(`${API_URL}/status-page/${slug}`);
  },
};

// Subscriptions
export const subscriptionsApi = {
  getCurrent: () => api.get('/subscriptions/current'),
  createPreference: (data: { planType: 'starter' | 'pro' }) => 
    api.post('/subscriptions/create-preference', data),
  changePlan: (data: { planType: 'starter' | 'pro' }) => 
    api.post('/subscriptions/change-plan', data),
  downgrade: (data: { planType: 'free' }) => 
    api.post('/subscriptions/downgrade', data),
  cancel: () => api.post('/subscriptions/cancel'),
  getPayments: () => api.get('/subscriptions/payments'),

  createLemonCheckout: (data: { planType: 'starter' | 'pro' }) => 
    api.post('/subscriptions/lemon/create-checkout', data),

  changeLemonPlan: (data: { planType: 'starter' | 'pro' }) => 
    api.post('/subscriptions/lemon/change-plan', data),
  
  // TESTING - Quitar en producción
  upgradeTest: (data: { planType: 'starter' | 'pro' }) => 
    api.post('/subscriptions/upgrade-test', data),
};


export default api;