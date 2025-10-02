'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckResult } from '@/types';

interface RegionalChartProps {
  data: CheckResult[];
}

export function RegionalChart({ data }: RegionalChartProps) {
  // Procesar datos por región
  const regionData = data.reduce((acc, result) => {
    const region = result.region;
    if (!acc[region]) {
      acc[region] = {
        region,
        avgLatency: 0,
        totalChecks: 0,
        upChecks: 0
      };
    }
    
    acc[region].totalChecks += 1;
    acc[region].avgLatency += result.latencyMs
    if (result.statusCode === 200) { // Assuming 200 means 'up'
      acc[region].upChecks += 1;
    }
    
    return acc;
  }, {} as Record<string, any>);

  const chartData = Object.values(regionData).map((region: any) => ({
    region: region.region,
    avgLatency: Math.round(region.avgLatency / region.totalChecks),
    uptime: Math.round((region.upChecks / region.totalChecks) * 100)
  }));

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        <p>No hay datos regionales disponibles</p>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="region" 
            fontSize={12}
          />
          <YAxis 
            fontSize={12}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              name === 'avgLatency' ? `${value}ms` : `${value}%`,
              name === 'avgLatency' ? 'Latencia Promedio' : 'Uptime'
            ]}
          />
          <Bar 
            dataKey="avgLatency" 
            fill="#8884d8" 
            name="Latencia Promedio"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}