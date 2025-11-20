'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LocaleLink as Link } from '@/components/locale-link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation'; // ← AGREGAR

export default function LoginForm() {
  const t = useTranslations('auth.loginEmail');
  const router = useRouter(); // ← AGREGAR
  const params = useParams(); // ← AGREGAR
  const locale = params.locale as string; // ← AGREGAR
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginSchema = z.object({
    email: z.string().email(t('errors.invalidEmail')),
    password: z.string().min(6, t('errors.passwordTooShort')),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    
    console.log('🔐 Enviando login con email:', data.email);

    try {
      const result = await login(data);
      console.log('📋 Resultado del login:', result);

      if (result.success) {
        console.log('✅ Login exitoso - redirigiendo con locale');
        // ✅ CAMBIO: Redirigir manualmente con locale
        router.push(`/${locale}/dashboard`);
      } else {
        console.log('❌ Error en login:', result.error);
        setError(result.error || t('errors.loginFailed'));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('❌ Error inesperado:', error);
      setError(t('errors.unexpected'));
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {t('title')}
          </CardTitle>
          <p className="text-center text-muted-foreground">
            {t('description')}
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
              <Label htmlFor="email">{t('emailLabel')}</Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('passwordLabel')}</Label>
              <Input
                {...register('password')}
                id="password"
                type="password"
                placeholder={t('passwordPlaceholder')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-destructive text-sm">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('submitting')}
                </>
              ) : (
                t('submitButton')
              )}
            </Button>
          </form>

          <div className="text-center space-y-4 mt-6">
            <Button
              asChild
              variant="ghost"
              className="w-full"
            >
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backButton')}
              </Link>
            </Button>

            <p className="text-muted-foreground text-sm">
              {t('noAccount')}{' '}
              <Link href="/register/email" className="text-primary hover:underline">
                {t('registerLink')}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}