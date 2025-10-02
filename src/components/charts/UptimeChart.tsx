'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckResult } from '@/types';

interface UptimeChartProps {
  data: CheckResult[];
}

export function UptimeChart({ data }: UptimeChartProps) {
  // Procesar datos para el gráfico
  const chartData = data
    .slice(-24) // Últimas 24 horas
    .map((result, index) => ({
      time: new Date(result.timestamp).getHours() + ':00',
      status: result.statusCode === 200 ? 100 : 0,
      latency: result.latencyMs
    }));

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        <p>No hay datos disponibles para mostrar</p>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            fontSize={12}
          />
          <YAxis 
            domain={[0, 100]}
            fontSize={12}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Uptime']}
            labelFormatter={(label) => `Hora: ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="status" 
            stroke="#22c55e" 
            strokeWidth={2}
            dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}