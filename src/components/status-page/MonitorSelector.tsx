'use client';

import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Check as CheckType } from '@/types';
import { Check, Globe } from 'lucide-react';

interface MonitorSelectorProps {
  checks: CheckType[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
}

export function MonitorSelector({ checks, selectedIds, onChange, disabled }: MonitorSelectorProps) {
  const toggleCheck = (checkId: string) => {
    if (selectedIds.includes(checkId)) {
      onChange(selectedIds.filter(id => id !== checkId));
    } else {
      onChange([...selectedIds, checkId]);
    }
  };

  if (checks.length === 0) {
    return (
      <div className="space-y-2">
        <Label>Monitores a Mostrar</Label>
        <Card className="p-8 text-center">
          <Globe className="mx-auto text-muted-foreground mb-3" size={32} />
          <p className="text-muted-foreground text-sm">
            No tienes checks creados. 
            <br />
            <a href="/checks/new" className="text-primary hover:underline">
              Crea tu primer check
            </a> para comenzar.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Monitores a Mostrar</Label>
      <p className="text-sm text-muted-foreground mb-3">
        Selecciona qué checks quieres mostrar públicamente ({selectedIds.length} seleccionados)
      </p>
      
      <div className="space-y-2">
        {checks.map((check) => {
          const isSelected = selectedIds.includes(check.id);
          
          return (
            <Card
              key={check.id}
              className={`p-4 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'hover:border-primary/50 hover:bg-accent'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !disabled && toggleCheck(check.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-card-foreground">
                      {check.name || check.url}
                    </p>
                    {check.status === 'active' ? (
                      <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded">
                        Activo
                      </span>
                    ) : (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                        Inactivo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{check.url}</p>
                </div>
                
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected 
                    ? 'bg-primary border-primary' 
                    : 'border-border'
                }`}>
                  {isSelected && <Check className="text-primary-foreground" size={14} />}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}