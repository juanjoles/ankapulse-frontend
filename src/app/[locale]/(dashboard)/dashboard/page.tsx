'use client';

import { useChecks } from '@/hooks/useChecks';
import { usePlan } from '@/hooks/usePlan';
import { LocaleLink as Link } from '@/components/locale-link';
import { Activity, TrendingUp, Clock, Plus, ArrowRight, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl'; // ← AGREGAR

export default function DashboardPage() {
  const t = useTranslations('dashboard'); // ← AGREGAR
  const { checks } = useChecks();
  const { usage } = usePlan();

  const activeChecks = checks.filter((c) => c.status === 'active').length;
  const checksUp = checks.filter((c) => c.lastStatus === 'up').length;
  const checksDown = checks.filter((c) => c.lastStatus === 'down').length;
  const avgUptime = checks.length > 0 
    ? ((checksUp / checks.length) * 100).toFixed(2) 
    : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('title')}</h1>
        <p className="text-muted-foreground mt-1">{t('subtitle')}</p>
      </div>

      {/* Plan Info */}
      {usage && usage.plan.type === 'free' && (
        <Card className="bg-gradient-to-r from-primary to-primary/80 border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-primary-foreground">
                  {t('planFree.title')}
                </h3>
                <p className="text-primary-foreground/80 text-sm mt-1">
                  {usage.usage.checks.current} {t('planFree.usage')} {usage.usage.checks.limit} {t('planFree.checksUsed')}
                </p>
              </div>
              <Link
                href="/pricing"
                className="bg-background text-primary px-6 py-2 rounded-lg font-semibold hover:bg-accent transition-colors"
              >
                {t('planFree.upgrade')}
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{t('stats.totalChecks')}</p>
              <Activity className="text-primary" size={20} />
            </div>
            <p className="text-3xl font-bold text-card-foreground">{checks.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{t('stats.avgUptime')}</p>
              <TrendingUp className="text-success" size={20} />
            </div>
            <p className="text-3xl font-bold text-success">{avgUptime}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{t('stats.online')}</p>
              <div className="w-3 h-3 rounded-full bg-success"></div>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{checksUp}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{t('stats.withProblems')}</p>
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
            </div>
            <p className="text-3xl font-bold text-card-foreground">{checksDown}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-card-foreground">
              {t('quickActions.title')}
            </h2>
            <div className="space-y-3">
              <Link
                href="/checks/new"
                className="flex items-center justify-between p-4 border-2 border-dashed border-border rounded-lg hover:border-primary hover:bg-accent transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Plus className="text-muted-foreground group-hover:text-primary" size={24} />
                  <div>
                    <p className="font-medium text-card-foreground">
                      {t('quickActions.newCheck.title')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('quickActions.newCheck.description')}
                    </p>
                  </div>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-primary" size={20} />
              </Link>

              <Link
                href="/status-page"
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary hover:bg-accent transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Globe className="text-muted-foreground group-hover:text-primary" size={24} />
                  <div>
                    <p className="font-medium text-card-foreground">
                      {t('quickActions.statusPage.title')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('quickActions.statusPage.description')}
                    </p>
                  </div>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-primary" size={20} />
              </Link>

              <Link
                href="/checks"
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary hover:bg-accent transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <Activity className="text-muted-foreground group-hover:text-primary" size={24} />
                  <div>
                    <p className="font-medium text-card-foreground">
                      {t('quickActions.viewAll.title')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t('quickActions.viewAll.description')}
                    </p>
                  </div>
                </div>
                <ArrowRight className="text-muted-foreground group-hover:text-primary" size={20} />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Problems */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-card-foreground">
              {t('recentProblems.title')}
            </h2>
            {checksDown > 0 ? (
              <div className="space-y-3">
                {checks
                  .filter((c) => c.lastStatus === 'down')
                  .slice(0, 3)
                  .map((check) => (
                    <Link
                      key={check.id}
                      href={`/checks/${check.id}`}
                      className="block p-3 border border-destructive rounded-lg bg-destructive/10 hover:bg-destructive/20 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-card-foreground">
                            {check.name || check.url}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">{check.url}</p>
                          {check.failureCount > 0 && (
                            <p className="text-xs text-destructive mt-1">
                              {check.failureCount} {t('recentProblems.consecutiveFailures')}
                            </p>
                          )}
                        </div>
                        <span className="text-destructive text-sm font-medium">
                          {t('recentProblems.down')}
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="text-success" size={24} />
                </div>
                <p className="text-muted-foreground">{t('recentProblems.allGood')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* CTA si no tiene checks */}
      {checks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Clock className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-xl font-semibold text-card-foreground mb-2">
              {t('emptyState.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              {t('emptyState.description')}
            </p>
            <Link
              href="/checks/new"
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus size={20} />
              <span>{t('emptyState.button')}</span>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}