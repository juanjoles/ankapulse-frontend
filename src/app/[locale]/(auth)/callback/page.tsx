'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { setToken, setUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Componente interno que usa useSearchParams
function CallbackContent() {
  const t = useTranslations('authCallback');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState(t('loading.processing'));

  // Función para decodificar el token JWT y obtener los datos del usuario
  const decodeTokenAndGetUser = async (token: string) => {
    try {
      // Decodificar el token JWT
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decoded = JSON.parse(jsonPayload);
      console.log('👤 Token decodificado:', decoded);

      // Si el token tiene la información completa, usarla directamente
      return {
        id: decoded.userId,
        nombre: decoded.nombre || decoded.name || decoded.email?.split('@')[0] || 'Usuario',
        email: decoded.email,
        provider: decoded.provider || 'oauth',
        isActive: true,
        emailVerified: true
      };

    } catch (error) {
      console.error('❌ Error al procesar token:', error);
      return null;
    }
  };

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Obtener parámetros de la URL que vienen del backend
        const success = searchParams.get('success');
        const error = searchParams.get('error');
        const token = searchParams.get('token');
        const isNewUser = searchParams.get('isNewUser') === 'true';
        const provider = searchParams.get('provider');
        const userId = searchParams.get('userId');
        const errorMessage = searchParams.get('message');

        console.log('📋 Parámetros del callback:', {
          success,
          error,
          hasToken: !!token,
          isNewUser,
          provider,
          userId
        });

        if (error) {
          throw new Error(errorMessage || 'Error de autenticación');
        }

        if (success === 'true' && token) {
          setMessage(t('success.settingUp'));
          
          // Guardar el token
          setToken(token);
          console.log('✅ Token guardado correctamente');

          // Obtener datos completos del usuario
          setMessage(t('success.gettingUser'));
          const userData = await decodeTokenAndGetUser(token);
          
          if (userData) {
            console.log('💾 Guardando usuario completo:', userData);
            setUser(userData);
          } else {
            // Fallback: crear objeto básico con los datos disponibles
            const fallbackUser = {
              id: userId || 'unknown',
              nombre: searchParams.get('userName') || 'Usuario',
              email: searchParams.get('userEmail') || '',
              provider: provider || 'oauth',
              isActive: true,
              emailVerified: true
            };
            console.log('📋 Usando datos fallback:', fallbackUser);
            setUser(fallbackUser);
          }

          setStatus('success');
          
          if (isNewUser) {
            setMessage(t('success.welcomeNew', { provider: provider || 'OAuth' }));
          } else {
            setMessage(t('success.welcomeBack', { provider: provider || 'OAuth' }));
          }

          // Redirigir al dashboard después de un breve delay
          setTimeout(() => {
            console.log('🔄 Redirigiendo a dashboard...');
            router.replace('/dashboard');
          }, 2500);
        } else {
          throw new Error('Parámetros de autenticación inválidos');
        }

      } catch (error) {
        console.error('❌ Error en callback:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Error desconocido');
        
        // Redirigir al login después de un error
        setTimeout(() => {
          router.replace('/login?error=auth_failed');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router, t]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          {status === 'loading' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <h2 className="text-xl font-semibold">{t('loading.title')}</h2>
              <p className="text-center text-muted-foreground">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="h-12 w-12 text-success" />
              <h2 className="text-xl font-semibold text-success">{t('success.title')}</h2>
              <p className="text-center text-muted-foreground">{message}</p>
              <div className="w-full bg-accent rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-2 rounded-full animate-pulse w-full"></div>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="h-12 w-12 text-destructive" />
              <h2 className="text-xl font-semibold text-destructive">{t('error.title')}</h2>
              <p className="text-center text-muted-foreground">{message}</p>
              <p className="text-xs text-muted-foreground">
                {t('error.redirecting')}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Componente principal con Suspense boundary
export default function CallbackPage() {
  const t = useTranslations('authCallback');
  
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h2 className="text-xl font-semibold">{t('loading.title')}</h2>
          </CardContent>
        </Card>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}