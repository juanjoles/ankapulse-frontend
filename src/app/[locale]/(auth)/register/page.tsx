'use client';

import { useState } from 'react';
import { LocaleLink as Link } from '@/components/locale-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Mail, Loader2 } from 'lucide-react';
import { LogoNav } from '@/components/logo-nav';
import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

const API_BASE_URL_AUTH0 = process.env.NEXT_PUBLIC_API_URL_AUTH || 'http://localhost:3000/auth';

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleGoogleSignup = () => {
    setIsLoading('google');
    window.location.href = `${API_BASE_URL_AUTH0}/login/google`;
  };

  const handleGithubSignup = () => {
    setIsLoading('github');
    window.location.href = `${API_BASE_URL_AUTH0}/login/github`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 transition-colors">
      {/* Header con logo simple */}
      <header className="container mx-auto px-4 py-6">
        <LogoNav />
      </header>

      {/* Main content - centrado verticalmente */}
      <div className="flex items-center justify-center px-4" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
            <CardDescription>
              {t('description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleGoogleSignup}
              disabled={isLoading !== null}
              className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-border"
              variant="outline"
            >
              {isLoading === 'google' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('connecting')}
                </>
              ) : (
                <>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  {t('google')}
                </>
              )}
            </Button>

            <Button
              onClick={handleGithubSignup}
              disabled={isLoading !== null}
              className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white"
            >
              {isLoading === 'github' ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('connecting')}
                </>
              ) : (
                <>
                  <Github className="mr-2 h-4 w-4" />
                  {t('github')}
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  {t('orRegister')}
                </span>
              </div>
            </div>

            <Button
              asChild
              variant="outline"
              className="w-full h-12"
            >
              <Link href="/register/email">
                <Mail className="mr-2 h-4 w-4" />
                {t('email')}
              </Link>
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              {t('haveAccount')}{' '}
              <Link 
                href="/login" 
                className="text-primary hover:underline font-medium"
              >
                {t('login')}
              </Link>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              {t('terms')}{' '}
              <Link href="/terms" className="hover:underline">
                {t('termsLink')}
              </Link>{' '}
              {t('and')}{' '}
              <Link href="/privacy" className="hover:underline">
                {t('privacyLink')}
              </Link>
            </div>

            <div className="bg-accent/50 rounded-lg p-4 mt-6">
              <h3 className="font-semibold text-sm text-card-foreground mb-2">
                {t('freePlan.title')}
              </h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• {t('freePlan.checks')}</li>
                <li>• {t('freePlan.interval')}</li>
                <li>• {t('freePlan.alerts')}</li>
                <li>• {t('freePlan.retention')}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}