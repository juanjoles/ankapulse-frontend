'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { statusPageApi } from '@/lib/api';
import { PublicStatusPage } from '@/types/index';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Activity,
  AlertCircle,
  Loader2 
} from 'lucide-react';

export default function PublicStatusPageView() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [statusPage, setStatusPage] = useState<PublicStatusPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatusPage = async () => {
      try {
        setLoading(true);
        const response = await statusPageApi.getPublic(slug);
        setStatusPage(response.data.data);
        setError(null);
      } catch (err: any) {
        if (err.response?.status === 404) {
          setError('Status page no encontrado');
        } else {
          setError('Error al cargar status page');
        }
        console.error('Error fetching public status page:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchStatusPage();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-primary mx-auto mb-4" size={48} />
          <p className="text-muted-foreground">Cargando status page...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !statusPage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <XCircle className="text-destructive mx-auto mb-4" size={48} />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Status Page No Encontrado
            </h1>
            <p className="text-muted-foreground">
              {error || 'Este status page no existe o ha sido deshabilitado.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get overall status badge
  const getOverallStatusBadge = () => {
    switch (statusPage.overallStatus) {
      case 'operational':
        return (
          <Badge className="bg-success/10 text-success border-success/20 hover:bg-success/20">
            <CheckCircle2 className="mr-1 h-4 w-4" />
            All Systems Operational
          </Badge>
        );
      case 'partial_outage':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20">
            <AlertCircle className="mr-1 h-4 w-4" />
            Partial Outage
          </Badge>
        );
      case 'major_outage':
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">
            <XCircle className="mr-1 h-4 w-4" />
            Major Outage
          </Badge>
        );
    }
  };

  // Get monitor status icon
  const getStatusIcon = (status: 'operational' | 'down') => {
    if (status === 'operational') {
      return <CheckCircle2 className="text-success" size={20} />;
    }
    return <XCircle className="text-destructive" size={20} />;
  };

  // Format uptime percentage
  const formatUptime = (percentage: number) => {
    return `${percentage.toFixed(2)}%`;
  };

  // Format latency
  const formatLatency = (ms: number) => {
    return `${ms}ms`;
  };

  // Format last checked
  const formatLastChecked = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Container */}
      <div className="max-w-5xl mx-auto p-6 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold text-foreground">
            {statusPage.title}
          </h1>
          {statusPage.description && (
            <p className="text-muted-foreground text-lg">
              {statusPage.description}
            </p>
          )}
          <div className="flex justify-center">
            {getOverallStatusBadge()}
          </div>
          <p className="text-sm text-muted-foreground">
            Last updated: {formatLastChecked(statusPage.updatedAt)}
          </p>
        </div>

        {/* Services/Monitors */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Services</h2>
          
          {statusPage.monitors.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Activity className="mx-auto text-muted-foreground mb-3" size={32} />
                <p className="text-muted-foreground">
                  No services configured yet
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {statusPage.monitors.map((monitor) => (
                <Card key={monitor.id} className="transition-all hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      
                      {/* Left: Icon + Name */}
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="mt-1 flex-shrink-0">
                          {getStatusIcon(monitor.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-card-foreground text-lg">
                            {monitor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {monitor.url}
                          </p>
                        </div>
                      </div>

                      {/* Right: Metrics */}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-right flex-shrink-0">
                        {/* Uptime */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Uptime (7d)</p>
                          <p className={`text-lg font-bold ${
                            monitor.uptimePercentage >= 99.9 
                              ? 'text-success' 
                              : monitor.uptimePercentage >= 99 
                              ? 'text-yellow-600 dark:text-yellow-500' 
                              : 'text-destructive'
                          }`}>
                            {formatUptime(monitor.uptimePercentage)}
                          </p>
                        </div>

                        {/* Latency */}
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Avg Response</p>
                          <p className="text-lg font-bold text-card-foreground flex items-center gap-1">
                            <Clock size={16} className="text-muted-foreground" />
                            {formatLatency(monitor.averageLatency)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Last Checked */}
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Last checked: {formatLastChecked(monitor.lastChecked)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Powered by{' '}
            <a 
              href="https://ankapulse.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              AnkaPulse
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}