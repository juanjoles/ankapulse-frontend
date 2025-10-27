'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE_URL = 'http://localhost:3000/api';

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
  message?: string;
}

export function useEmailAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('🎯 Hook useEmailAuth inicializado');

  const register = async (userData: RegisterData): Promise<AuthResult> => {
    setLoading(true);
    setError(null);

    try {
      console.log('📤 Enviando datos de registro:', userData);

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: userData.nombre, // ✨ CAMBIAR: enviar 'nombre' en lugar de 'name'
          email: userData.email,
          password: userData.password,
        }),
      });

      console.log('📋 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Error del servidor:', errorData);
        return {
          success: false,
          error: errorData.message || 'Error al registrar usuario'
        };
      }

      const data = await response.json();
      console.log('✅ Registro exitoso:', data);

      return {
        success: true,
        data,
        message: data.message || 'Usuario registrado exitosamente'
      };

    } catch (err) {
      console.error('❌ Error de conexión:', err);
      return {
        success: false,
        error: 'Error de conexión. Verifica que el servidor esté funcionando.'
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginData): Promise<AuthResult> => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔐 Enviando login:', credentials.email);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Login exitoso:', data);
        
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
        
        return {
          success: true,
          data,
          message: data.message || 'Login exitoso'
        };
      } else {
        console.error('❌ Error en login:', data);
        return {
          success: false,
          error: data.message || 'Credenciales inválidas'
        };
      }
    } catch (err) {
      console.error('❌ Error de conexión en login:', err);
      return {
        success: false,
        error: 'Error de conexión. Intenta nuevamente.'
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    login,
    loading,
    error,
  };
}