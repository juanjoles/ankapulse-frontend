'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEmailAuth } from '@/hooks/useEmailAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';

const registerSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const { register: registerUser } = useEmailAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    
    console.log('📝 Enviando registro con email:', data.email);

    try {
      const { confirmPassword, ...registerData } = data;
      const result = await registerUser(registerData);
      console.log('📋 Resultado del registro:', result);

      if (result.success) {
        console.log('✅ Registro exitoso - mostrando pantalla de éxito');
        setSuccess(true);
        
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          console.log('🔄 Redirigiendo al login...');
          router.push('/login');
        }, 2000);
        
      } else {
        console.log('❌ Error en registro:', result.error);
        setError(result.error || 'Error al registrarse');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('❌ Error inesperado:', error);
      setError('Error inesperado. Inténtalo de nuevo.');
      setIsLoading(false);
    }
  };

  // ✨ PANTALLA DE ÉXITO
  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            <h2 className="text-2xl font-bold mb-2">¡Registro Exitoso!</h2>
            <p className="text-muted-foreground mb-6">
              Tu cuenta ha sido creada correctamente.
            </p>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-4">
              <Loader2 className="animate-spin" size={16} />
              <span>Redirigiendo al login...</span>
            </div>
            
            <Button 
              onClick={() => router.push('/login')}
              className="w-full"
            >
              Ir al Login Ahora
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Crear Cuenta</CardTitle>
          <p className="text-center text-muted-foreground">
            Completa los datos para registrarte
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-destructive/15 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                {...register('nombre')}
                id="nombre"
                type="text"
                placeholder="Tu nombre completo"
                disabled={isLoading}
              />
              {errors.nombre && (
                <p className="text-destructive text-sm">{errors.nombre.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="tu@email.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                {...register('password')}
                id="password"
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-destructive text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-destructive text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                'Crear Cuenta'
              )}
            </Button>
          </form>

          <div className="text-center space-y-4 mt-6">
            <p className="text-muted-foreground text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}