'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Globe,
  TrendingUp
} from 'lucide-react';
import { Check } from '@/types';

interface CheckCardProps {
  check: Check;
}

export default function CheckCard({ check }: CheckCardProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'up':
        return <CheckCircle className="h-4 w-4" />;
      case 'down':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <Link href={`/checks/${check.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">{check.name || 'Check sin nombre'}</CardTitle>
          <Badge variant={check.lastStatus === 'up' ? 'default' : 'destructive'}>
            <span className={getStatusColor(check.lastStatus)}>
              {getStatusIcon(check.lastStatus)}
            </span>
            <span className="ml-1">
              {check.lastStatus === 'up' ? 'Online' : 'Offline'}
            </span>
          </Badge>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">{check.url}</CardDescription>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {check.interval}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Globe className="h-3 w-3 mr-1" />
              {check.regions.length} región{check.regions.length !== 1 ? 'es' : ''}
            </div>
            <div className="flex items-center text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1" />
              HTTP {check.expectedStatusCode}
            </div>
          </div>
          
          {check.lastCheckAt && (
            <p className="text-xs text-muted-foreground mt-2">
              Último check: {new Date(check.lastCheckAt).toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}