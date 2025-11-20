'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useChecks } from '@/hooks/useChecks';
import { usePlan } from '@/hooks/usePlan';
import { LocaleLink as Link } from '@/components/locale-link';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface UpgradeInfo {
  success: boolean;
  error?: string;
  code?: string;
  requiredPlan?: string;
  currentLimit?: number;
  suggestedPlan?: string;
}

export default function NewCheckPage() {
  const t = useTranslations('checksNew');
  const router = useRouter();
  const params = useParams(); 
  const locale = params.locale as string; 
  const { createCheck } = useChecks();
  const { usage, isIntervalAllowed, loading } = usePlan();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeInfo, setUpgradeInfo] = useState<UpgradeInfo | null>(null);

   console.log('🔍 DEBUG usePlan:', {
    loading,
    usage,
    hasUsage: !!usage,
    minIntervalMinutes: usage?.usage?.minInterval?.minutes,
    canUse1min: isIntervalAllowed(1),
    canUse5min: isIntervalAllowed(5),
    canUse30min: isIntervalAllowed(30),
  });
  
  useEffect(() => {
    console.log('🔍 DEBUG - Usage data:', {
      plan: usage?.plan,
      minInterval: usage?.usage?.minInterval,
      canUse1min: isIntervalAllowed(1),
      canUse5min: isIntervalAllowed(5),
      canUse15min: isIntervalAllowed(15),
      canUse30min: isIntervalAllowed(30),
    });
  }, [usage, isIntervalAllowed]);
  // Schema con traducciones dinámicas
  const checkSchema = z.object({
    url: z.string().url(t('form.url.required')),
    name: z.string().min(2, t('form.name.minLength')).optional().or(z.literal('')),
    interval: z.string(),
    timeout: z.number().min(5).max(60).optional(),
    expectedStatusCode: z.number().min(100).max(599).optional(),
  });

  type CheckFormData = z.infer<typeof checkSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CheckFormData>({
    resolver: zodResolver(checkSchema),
    defaultValues: {
      interval: '30min',
      timeout: 30,
      expectedStatusCode: 200,
    },
  });

  const onSubmit = async (data: CheckFormData) => {
    setIsLoading(true);
    setError(null);

    const result = await createCheck({
      url: data.url,
      name: data.name || undefined,
      interval: data.interval,
      timeout: data.timeout,
      expectedStatusCode: data.expectedStatusCode,
      regions: ['us-east'],
    });

    if (result.success) {
      router.push(`/${locale}/dashboard`);
    } else {
      if (result.code === 'CHECKS_LIMIT_REACHED' || result.code === 'INTERVAL_NOT_ALLOWED') {
        setUpgradeInfo(result);
        setShowUpgradeModal(true);
      } else {
        setError(result.error || t('form.error'));
      }
    }

    setIsLoading(false);
  };

  const intervals = [
    { value: '1min', label: t('form.interval.options.1min'), minPlan: 'starter' },
    { value: '5min', label: t('form.interval.options.5min'), minPlan: 'starter' },
    { value: '15min', label: t('form.interval.options.15min'), minPlan: 'starter' },
    { value: '30min', label: t('form.interval.options.30min'), minPlan: 'free' },
    { value: '1h', label: t('form.interval.options.1h'), minPlan: 'free' },
    { value: '1d', label: t('form.interval.options.1d'), minPlan: 'free' },
  ];

  const getIntervalMinutes = (interval: string): number => {
    const map: Record<string, number> = {
      '1min': 1,
      '5min': 5,
      '15min': 15,
      '30min': 30,
      '1h': 60,
      '1d': 1440,
    };
    return map[interval] || 60;
  };

  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let value = e.target.value.trim();
    
    if (value && !value.match(/^https?:\/\//)) {
      setValue('url', `https://${value}`);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{t('backToDashboard')}</span>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('subtitle')}
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-card-foreground mb-2">
                {t('form.url.label')} *
              </label>
              <input
                {...register('url')}
                type="url"
                id="url"
                onBlur={handleUrlBlur}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder={t('form.url.placeholder')}
              />
              {errors.url && (
                <p className="text-destructive text-sm mt-1">{errors.url.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                {t('form.name.label')}
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder={t('form.name.placeholder')}
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="interval" className="block text-sm font-medium text-card-foreground mb-2">
                {t('form.interval.label')} *
              </label>
              <select
                {...register('interval')}
                id="interval"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                {intervals.map((int) => {
                  const minutes = getIntervalMinutes(int.value);
                  const allowed = isIntervalAllowed(minutes);
                  return (
                    <option key={int.value} value={int.value} disabled={!allowed}>
                      {int.label} {!allowed && `(${t('form.interval.requiresPlan', { plan: int.minPlan })})`}
                    </option>
                  );
                })}
              </select>
              <p className="text-sm text-muted-foreground mt-1">
                {t('form.interval.currentPlanAllows', {
                  planName: usage?.plan?.name || 'Free',
                  minInterval: usage?.usage?.minInterval?.formatted || '30 minutos'
                })}
              </p>
            </div>

            <div>
              <label htmlFor="timeout" className="block text-sm font-medium text-card-foreground mb-2">
                {t('form.timeout.label')}
              </label>
              <input
                {...register('timeout', { valueAsNumber: true })}
                type="number"
                id="timeout"
                min="5"
                max="60"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="expectedStatusCode" className="block text-sm font-medium text-card-foreground mb-2">
                {t('form.expectedStatusCode.label')}
              </label>
              <input
                {...register('expectedStatusCode', { valueAsNumber: true })}
                type="number"
                id="expectedStatusCode"
                min="100"
                max="599"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? t('form.submitting') : t('form.submit')}
              </button>
              <Link
                href="/dashboard"
                className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg hover:bg-secondary/80 transition-colors text-center"
              >
                {t('form.cancel')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 mb-4">
                <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    {t('upgradeModal.title')}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {upgradeInfo?.error}
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Link
                  href="/pricing"
                  className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors text-center"
                >
                  {t('upgradeModal.viewPlans')}
                </Link>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  {t('upgradeModal.close')}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}