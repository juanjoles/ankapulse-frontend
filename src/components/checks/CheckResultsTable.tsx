'use client';

import { CheckResult } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle2, XCircle } from 'lucide-react';

interface CheckResultsTableProps {
  results: CheckResult[];
}

export default function CheckResultsTable({ results }: CheckResultsTableProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No hay resultados disponibles aún
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr className="border-b">
              <th className="px-4 py-3 text-left text-sm font-medium">Estado</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Región</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Código</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Latencia</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Fecha/Hora</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Error</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3">
                  {result.success ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm">UP</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="h-4 w-4" />
                      <span className="text-sm">DOWN</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className="text-xs">
                    {result.region}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={result.statusCode === 200 ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {result.statusCode}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-mono">
                    {result.latencyMs} ms
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {format(new Date(result.timestamp), 'dd/MM/yyyy HH:mm:ss', { locale: es })}
                </td>
                <td className="px-4 py-3 text-sm text-red-600">
                  {result.errorMessage || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
