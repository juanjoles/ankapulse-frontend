'use client';

import { useState } from 'react';
import { LocaleLink as Link } from '@/components/locale-link';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Eye, EyeOff, Loader2, ArrowLeft, AlertCircle } from 'lucide-react';
import { LogoNav } from '@/components/logo-nav';
import { toast } from 'react-hot-toast';
import { authApi, getErrorMessage } from '@/lib/api';
import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function RegisterEmailPage() {
  const t = useTranslations('auth.registerEmail');
  const router = useRouter();
  const params = useParams(); 
  const locale = params.locale as string; 
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = t('errors.nameTooShort');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('errors.nameTooShort');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = t('errors.invalidEmail');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('errors.invalidEmail');
    }

    if (!formData.password) {
      newErrors.password = t('errors.passwordTooShort');
    } else if (formData.password.length < 8) {
      newErrors.password = t('errors.passwordTooShort');
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t('errors.passwordMismatch');
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('errors.passwordMismatch');
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors(prev => ({ ...prev, general: '' }));

    try {
      console.log('🔄 Registrando usuario con API configurada...');
      
      const response = await authApi.register({
        email: formData.email.toLowerCase().trim(),
        nombre: formData.name.trim(),
        password: formData.password
      });

      console.log('✅ Registro exitoso:', response.data);
      
      // ✅ CAMBIO: Mostrar pantalla de éxito
      setSuccess(true);
      toast.success(t('success.title'));
      
      // ⏱️ CAMBIO: Redirigir después de 3 segundos
      setTimeout(() => {
        router.push(`/${locale}/login`);
      }, 3000);
      
    } catch (error: any) {
      console.error('❌ Error en registro:', error);
      
      const errorMessage = getErrorMessage(error);
      
      if (error.response?.status === 400) {
        if (errorMessage.toLowerCase().includes('email')) {
          setErrors(prev => ({ ...prev, email: errorMessage }));
        } else {
          setErrors(prev => ({ ...prev, general: errorMessage }));
        }
      } else if (error.response?.status === 409) {
        setErrors(prev => ({ ...prev, email: t('errors.registerFailed') }));
      } else if (error.response?.status === 500) {
        setErrors(prev => ({ ...prev, general: t('errors.unexpected') }));
      } else {
        setErrors(prev => ({ ...prev, general: errorMessage }));
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  // ✨ PANTALLA DE ÉXITO - AGREGADO
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 transition-colors flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {t('success.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('success.description')}
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mt-6">
                <Loader2 className="animate-spin h-4 w-4" />
                <span>{t('success.redirecting')}</span>
              </div>
              
              <Button 
                onClick={() => router.push(`/${locale}/login`)}
                className="w-full mt-4"
              >
                {t('success.goNow')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 transition-colors">
      <header className="container mx-auto px-4 py-6">
        <LogoNav />
      </header>

      <div className="flex items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/register" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>{t('haveAccount')}</span>
                </Link>
              </Button>
            </div>
            <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
            <CardDescription>
              {t('description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errors.general && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('nameLabel')}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-destructive' : ''}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('emailLabel')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t('passwordLabel')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('passwordPlaceholder')}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('confirmPasswordLabel')}</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t('confirmPasswordPlaceholder')}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('submitting')}
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    {t('submitButton')}
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              {t('haveAccount')}{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                {t('loginLink')}
              </Link>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              Al crear tu cuenta, aceptas nuestros{' '}
              <Link href="/terms" className="hover:underline">
                Términos de Servicio
              </Link>{' '}
              y{' '}
              <Link href="/privacy" className="hover:underline">
                Política de Privacidad
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}