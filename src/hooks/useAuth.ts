// src/hooks/useAuth.ts
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import { getToken, setToken, getUser, setUser, clearToken, isAuthenticated } from '@/lib/auth';
import type { User, LoginInput, RegisterInput } from '@/types';

export const useAuth = () => {
  const router = useRouter();
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuario del localStorage al montar
  useEffect(() => {
    const token = getToken();
    const savedUser = getUser();
    
    if (token && savedUser) {
      setUserState(savedUser);
    }
    
    setLoading(false);
  }, []);

  // Login
  const login = async (data: LoginInput) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authApi.login(data);
      const { user, token } = response.data.data;

      // Guardar en localStorage
      setToken(token);
      setUser(user);
      setUserState(user);

      // Redirigir al dashboard
      router.push('/dashboard');

      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (data: RegisterInput) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authApi.register(data);
      const { user, token } = response.data.data;

      // Guardar en localStorage
      setToken(token);
      setUser(user);
      setUserState(user);

      // Redirigir al dashboard
      router.push('/dashboard');

      return { success: true };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al registrarse';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    clearToken();
    setUserState(null);
    router.push('/login');
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: isAuthenticated(),
    login,
    register,
    logout,
  };
};