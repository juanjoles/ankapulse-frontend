'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCheckDetails } from '@/hooks/useCheckDetails';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Globe, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import { LocaleLink as Link } from '@/components/locale-link';
import { UptimeChart } from '@/components/charts/UptimeChart';
import { LatencyChart } from '@/components/charts/LatencyChart';

export default function CheckDetailPage() {
  const t = useTranslations('checkDetail');
  const params = useParams();
  const checkId = typeof params?.id === 'string' ? params.id : '';
  const locale = params.locale as string;
  
  const { check, metrics, results, loading, error, refetch } = useCheckDetails(checkId);
  
  // ✨ Auto-refresh invisible cada 60 segundos
  useEffect(() => {
    if (!checkId) return;

    console.log('🔄 Configurando auto-refresh invisible para check:', checkId);

    const interval = setInterval(async () => {
      console.log('⏰ Auto-refresh ejecutándose silenciosamente...');
      
      try {
        await refetch();
        console.log('✅ Datos actualizados automáticamente');
      } catch (error) {
        console.error('❌ Error en auto-refresh:', error);
      }
    }, 60000); // 60 segundos

    return () => {
      console.log('🛑 Limpiando auto-refresh interval');
      clearInterval(interval);
    };
  }, [checkId, refetch]);

  const getUptimePercentage = () => {
    if (metrics?.uptimePercentage !== undefined) {
      const value = Number(metrics.uptimePercentage);
      if (!isNaN(value) && value >= 0) {
        return value.toFixed(2);
      }
    }
    
    const total = getTotalChecks();
    const successful = getSuccessfulChecks();
    
    if (total === 0) return '0.0';
    
    const percentage = (successful / total) * 100;
    return percentage.toFixed(2);
  };

  const getAverageLatency = () => {
    if (metrics?.averageLatency) {
      const value = Number(metrics.averageLatency);
      if (!isNaN(value) && value > 0) {
        return Math.round(value);
      }
    }
    
    if (!results || results.length === 0) return 0;
    
    const validResults = results.filter(r => r.latencyMs && r.latencyMs > 0);
    if (validResults.length === 0) return 0;
    
    const totalLatency = validResults.reduce((sum, result) => sum + (result.latencyMs || 0), 0);
    const average = totalLatency / validResults.length;
    
    return Math.round(average);
  };

  const getLatestLatency = () => {
    if (!results || results.length === 0) return 0;
    
    const sortedResults = [...results].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    const latestResult = sortedResults[0];
    return latestResult?.latencyMs ? Math.round(latestResult.latencyMs) : 0;
  };

  const getSuccessfulChecks = () => {
    if (!metrics?.successfulChecks) {
      if (!results) return 0;
      return results.filter(r => r.success).length;
    }
    const value = Number(metrics.successfulChecks);
    return isNaN(value) ? 0 : value;
  };

  const getTotalChecks = () => {
    if (!metrics?.totalChecks) {
      return results?.length || 0;
    }
    const value = Number(metrics.totalChecks);
    return isNaN(value) ? 0 : value;
  };

  const getFailedChecks = () => {
    if (!metrics?.failedChecks) {
      if (!results) return 0;
      return results.filter(r => !r.success).length;
    }
    const value = Number(metrics.failedChecks);
    return isNaN(value) ? 0 : value;
  };

  const getUptimeForDisplay = () => {
    if (metrics?.uptimePercentage) {
      const stringValue = String(metrics.uptimePercentage);
      const numericValue = parseFloat(stringValue.replace('%', ''));
      
      if (!isNaN(numericValue)) {
        return numericValue.toFixed(2);
      }
    }
    
    const total = getTotalChecks();
    const successful = getSuccessfulChecks();
    
    if (total === 0) return '0.00';
    
    const percentage = (successful / total) * 100;
    return percentage.toFixed(2);
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-muted rounded animate-pulse"></div>
          <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-32 bg-muted rounded animate-pulse"></div>
          ))}
        </div>
        <div className="h-96 bg-muted rounded animate-pulse"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-foreground">{t('errors.loadingError')}</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Link 
            href="/checks"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {t('backToList')}
          </Link>
        </div>
      </div>
    );
  }

  // Not found state
  if (!check) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-foreground">{t('errors.notFound')}</h3>
          <p className="text-muted-foreground mb-4">{t('errors.notFoundDesc')}</p>
          <Link 
            href="/checks"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {t('backToList')}
          </Link>
        </div>
      </div>
    );
  }

  const statusIcon = check.lastStatus === 'up' ? (
    <CheckCircle className="h-3 w-3 mr-1" />
  ) : (
    <XCircle className="h-3 w-3 mr-1" />
  );

  const statusText = check.lastStatus === 'up' ? t('status.online') : t('status.offline');

  return (
    <div className="space-y-6">
      {/* Header simplificado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link 
            href="/checks" 
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('backToList')}
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{check.name || t('noName')}</h1>
            <p className="text-muted-foreground">{check.url}</p>
          </div>
          <Badge variant={check.lastStatus === 'up' ? 'default' : 'destructive'}>
            {statusIcon}
            {statusText}
          </Badge>
        </div>

        {/* Solo botón de editar */}
        <div className="flex items-center space-x-2">
          <Link 
            href={`/checks/${checkId}/edit`}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {t('editCheck')}
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('stats.uptime')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{getUptimePercentage()}%</div>
            <p className="text-xs text-muted-foreground">
              {t('stats.successful', { total: getTotalChecks() }).replace('{total}', getSuccessfulChecks().toString())}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('stats.avgLatency')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{getAverageLatency()}ms</div>
            <p className="text-xs text-muted-foreground">
              {t('stats.latest', { latency: getLatestLatency() })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('stats.totalChecks')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{getTotalChecks()}</div>
            <p className="text-xs text-muted-foreground">
              {t('stats.failed', { count: getFailedChecks() })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('stats.regions')}</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{check.regions?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {check.regions?.join(', ') || t('stats.notDefined')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
          <TabsTrigger value="performance">{t('tabs.performance')}</TabsTrigger>
          <TabsTrigger value="incidents">{t('tabs.incidents')}</TabsTrigger>
          <TabsTrigger value="settings">{t('tabs.settings')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('overview.uptimeChart')}</CardTitle>
              </CardHeader>
              <CardContent>
                <UptimeChart data={results || []} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('overview.latencyChart')}</CardTitle>
              </CardHeader>
              <CardContent>
                <LatencyChart data={results || []} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('overview.recentResults')}</CardTitle>
              <CardDescription>{t('overview.recentResultsDesc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results && results.length > 0 ? (
                  results
                    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                    .slice(0, 10)
                    .map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        {result.success ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-card-foreground">
                            {result.success ? t('status.online') : t('status.offline')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(result.timestamp).toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-card-foreground">{result.latencyMs || 0}ms</p>
                        <p className="text-xs text-muted-foreground">{result.region}</p>
                        <p className="text-xs text-muted-foreground">HTTP {result.statusCode}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">{t('overview.noResults')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>{t('performance.title')}</CardTitle>
              <CardDescription>{t('performance.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border border-border rounded-lg bg-card">
                  <h4 className="font-medium text-sm text-card-foreground">{t('performance.successfulChecks')}</h4>
                  <p className="text-2xl font-bold text-card-foreground">{getSuccessfulChecks()}</p>
                  <p className="text-xs text-muted-foreground">
                    {getTotalChecks() > 0 ? ((getSuccessfulChecks() / getTotalChecks()) * 100).toFixed(2) : '0'}% {t('performance.ofTotal')}
                  </p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg bg-card">
                  <h4 className="font-medium text-sm text-card-foreground">{t('performance.failedChecks')}</h4>
                  <p className="text-2xl font-bold text-card-foreground">{getFailedChecks()}</p>
                  <p className="text-xs text-muted-foreground">
                    {getTotalChecks() > 0 ? ((getFailedChecks() / getTotalChecks()) * 100).toFixed(2) : '0'}% {t('performance.ofTotal')}
                  </p>
                </div>
                <div className="text-center p-4 border border-border rounded-lg bg-card">
                  <h4 className="font-medium text-sm text-card-foreground">{t('performance.availability')}</h4>
                  <p className="text-2xl font-bold text-card-foreground">{getUptimeForDisplay()}%</p>
                  <p className="text-xs text-muted-foreground">{t('performance.historicalAvg')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle>{t('incidents.title')}</CardTitle>
              <CardDescription>{t('incidents.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results && results.filter(r => !r.success).slice(0, 5).map((incident) => (
                  <div key={incident.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg bg-card">
                    <XCircle className="h-4 w-4 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-card-foreground">{t('incidents.serviceUnavailable')}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(incident.timestamp).toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')} - {incident.region}
                      </p>
                      {incident.errorMessage && (
                        <p className="text-xs text-destructive mt-1">{incident.errorMessage}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{t('incidents.code', { code: incident.statusCode })}</p>
                      <p className="text-xs text-muted-foreground">{incident.latencyMs}ms</p>
                    </div>
                  </div>
                ))}
                {(!results || results.filter(r => !r.success).length === 0) && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                    <p className="text-muted-foreground">{t('incidents.noIncidents')}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>        

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.title')}</CardTitle>
              <CardDescription>{t('settings.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground">{t('settings.targetUrl')}</label>
                    <p className="text-sm text-card-foreground mt-1 p-2 bg-accent rounded border border-border">
                      {check.url}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">{t('settings.interval')}</label>
                    <p className="text-sm text-card-foreground mt-1 p-2 bg-accent rounded border border-border">
                      {check.interval}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">{t('settings.timeout')}</label>
                    <p className="text-sm text-card-foreground mt-1 p-2 bg-accent rounded border border-border">
                      {t('settings.timeoutSeconds', { seconds: check.timeout })}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground">{t('settings.expectedStatus')}</label>
                    <p className="text-sm text-card-foreground mt-1 p-2 bg-accent rounded border border-border">
                      HTTP {check.expectedStatusCode}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">{t('settings.status')}</label>
                    <p className="text-sm text-card-foreground mt-1 p-2 bg-accent rounded border border-border">
                      {check.status === 'active' ? t('status.active') : t('status.paused')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-card-foreground">{t('settings.monitoringRegions')}</label>
                    <p className="text-sm text-card-foreground mt-1 p-2 bg-accent rounded border border-border">
                      {check.regions?.join(', ') || t('stats.notDefined')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">{t('settings.created')}</span> {new Date(check.createdAt).toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')}
                  </div>
                  <div>
                    <span className="font-medium">{t('settings.updated')}</span> {new Date(check.updatedAt).toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')}
                  </div>
                  {check.lastCheckAt && (
                    <div>
                      <span className="font-medium">{t('settings.lastCheck')}</span> {new Date(check.lastCheckAt).toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}