'use client';

import { useChecks } from '@/hooks/useChecks';
import { Activity, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function StatsCards() {
  const { checks, loading } = useChecks();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-8 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const activeChecks = checks.filter((c) => c.status === 'active').length;
  const checksUp = checks.filter((c) => c.lastStatus === 'up').length;
  const checksDown = checks.filter((c) => c.lastStatus === 'down').length;
  const avgUptime = checks.length > 0 
    ? ((checksUp / checks.length) * 100).toFixed(1) 
    : '0';

  // Calcular latencia promedio (mock data - reemplazar con datos reales)
  const avgLatency = checks.length > 0 ? '245' : '0';

  const stats = [
    {
      title: 'Total Checks',
      value: checks.length.toString(),
      icon: Activity,
      color: 'text-primary',
      description: 'Checks activos'
    },
    {
      title: 'Uptime Promedio',
      value: `${avgUptime}%`,
      icon: TrendingUp,
      color: 'text-success',
      description: 'Últimos 30 días'
    },
    {
      title: 'Online',
      value: checksUp.toString(),
      icon: Clock,
      color: 'text-success',
      description: 'Funcionando bien'
    },
    {
      title: 'Con Problemas',
      value: checksDown.toString(),
      icon: AlertTriangle,
      color: checksDown > 0 ? 'text-destructive' : 'text-muted-foreground',
      description: checksDown > 0 ? 'Requieren atención' : 'Todo bien'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <IconComponent className={`${stat.color}`} size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-card-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}