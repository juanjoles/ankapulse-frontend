'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckMetrics } from '@/types';
import { Activity, TrendingUp, TrendingDown, Clock } from 'lucide-react';

interface CheckMetricsCardProps {
  metrics: CheckMetrics;
}

export default function CheckMetricsCard({ metrics }: CheckMetricsCardProps) {
  const uptimeColor = metrics.uptimePercentage >= 99
    ? 'text-green-600'
    : metrics.uptimePercentage >= 95
    ? 'text-yellow-600'
    : 'text-red-600';

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Uptime</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${uptimeColor}`}>
            {metrics.uptimePercentage.toFixed(2)}%
          </div>
          <p className="text-xs text-muted-foreground">
            {metrics.successfulChecks} de {metrics.totalChecks} exitosos
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latencia Promedio</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.averageLatency.toFixed(0)} ms
          </div>
          <p className="text-xs text-muted-foreground">
            Tiempo de respuesta
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Checks Exitosos</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {metrics.successfulChecks}
          </div>
          <p className="text-xs text-muted-foreground">
            Verificaciones OK
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Checks Fallidos</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {metrics.failedChecks}
          </div>
          <p className="text-xs text-muted-foreground">
            Verificaciones fallidas
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
