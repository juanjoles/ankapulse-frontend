'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { LocaleLink as Link } from '@/components/locale-link';
import { useTranslations } from 'next-intl';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
      await axios.post(`${API_URL}/password/request-reset`, { email });
      setSuccess(true);
    } catch (err: any) {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="text-success" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                {t('success.title')}
              </h2>
              <p className="text-muted-foreground">
                {t('success.description')}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('success.checkSpam')}
              </p>
              <Link href="/login">
                <Button variant="outline" className="mt-4">
                  <ArrowLeft className="mr-2" size={16} />
                  {t('success.backButton')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {t('title')}
          </CardTitle>
          <p className="text-muted-foreground text-center">
            {t('description')}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert className="border-destructive bg-destructive/10">
                <AlertDescription className="text-destructive">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t('emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                t('sending')
              ) : (
                <>
                  <Mail className="mr-2" size={16} />
                  {t('sendButton')}
                </>
              )}
            </Button>

            <div className="text-center">
              <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="inline mr-1" size={14} />
                {t('backToLogin')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}