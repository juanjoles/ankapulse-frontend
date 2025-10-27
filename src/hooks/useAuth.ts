'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getUser, isAuthenticated, isTokenExpired, logout as authLogout, setToken, setUser } from '@/lib/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface User {
  id: string;
  nombre: string;
  email: string;
  isActive?: boolean;
  emailVerified?: boolean;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
  data?: any;
}

export function useAuth() {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      console.log('🔍 Verificando autenticación...');
      
      const token = getToken();
      const userData = getUser();
      
      // Optimización: Si no hay token, salir rápido
      if (!token) {
        console.log('❌ No hay token, usuario no autenticado');
        setAuthenticated(false);
        setUserState(null);
        setIsLoading(false);
        return;
      }

      console.log('📝 Token encontrado, verificando validez...');

      if (!isTokenExpired(token)) {
        console.log('✅ Token válido');
        setAuthenticated(true);
        
        if (userData) {
          console.log('👤 Usuario encontrado en localStorage');
          setUserState(userData);
        } else {
          console.log('👤 Decodificando usuario desde token...');
          const decoded = decodeToken(token);
          if (decoded) {
            const userFromToken = {
              id: decoded.userId || decoded.id,
              nombre: decoded.nombre || decoded.name || '',
              email: decoded.email || '',
              isActive: decoded.isActive || true,
              emailVerified: decoded.emailVerified || false
            };
            setUserState(userFromToken);
            setUser(userFromToken);
          }
        }
        console.log('✅ Usuario autenticado correctamente');
      } else {
        console.log('🕒 Token expirado, limpiando...');
        authLogout();
        setAuthenticated(false);
        setUserState(null);
      }
      
      // Acelerar la carga inicial
      setIsLoading(false);
    };

    // Ejecutar inmediatamente sin delay
    checkAuth();

    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decodificando token:', error);
      return null;
    }
  };

  const login = async (data: LoginData): Promise<AuthResult> => {
    try {
      console.log('🔐 useAuth: Función login llamada con:', data.email);
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      const isSuccess = response.ok && (result.status === 'success' || result.success === true);
      
      if (isSuccess) {
        console.log('✅ useAuth: Login exitoso detectado');
        
        // Guardar token y usuario inmediatamente
        if (result.data?.token) {
          setToken(result.data.token);
        }
        if (result.data?.user) {
          setUser(result.data.user);
          setUserState(result.data.user);
        }
        
        // Actualizar estado inmediatamente para evitar recargas
        setAuthenticated(true);
        setIsLoading(false);
        
        console.log('🚀 useAuth: Redirigiendo inmediatamente...');
        
        // Redirección más directa
        router.replace('/dashboard');
        
        return { success: true, data: result.data };
      } else {
        console.log('❌ useAuth: Login falló');
        return { success: false, error: result.message || 'Error al iniciar sesión' };
      }
    } catch (error) {
      console.error('❌ useAuth: Excepción en login:', error);
      return { success: false, error: 'Error de conexión. Intenta de nuevo.' };
    }
  };

  const register = async (data: RegisterData): Promise<AuthResult> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const isSuccess = response.ok && (result.status === 'success' || result.success === true);

      if (isSuccess) {
        if (result.data?.token) {
          setToken(result.data.token);
        }
        if (result.data?.user) {
          setUser(result.data.user);
          setUserState(result.data.user);
        }
        
        setAuthenticated(true);
        setIsLoading(false);
        router.replace('/dashboard');
        
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.message || 'Error al registrarse' };
      }
    } catch (error) {
      console.error('❌ useAuth: Excepción en register:', error);
      return { success: false, error: 'Error de conexión. Intenta de nuevo.' };
    }
  };

  const logout = () => {
    console.log('🚪 useAuth: Ejecutando logout');
    authLogout();
    setAuthenticated(false);
    setUserState(null);
    setIsLoading(false);
    router.push('/login');
  };

  return {
    user,
    isLoading,
    isAuthenticated: authenticated,
    login,
    register,
    logout
  };
}