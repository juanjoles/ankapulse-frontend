'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

interface SlugInputProps {
  value: string;
  onChange: (value: string) => void;
  checkAvailability: (slug: string) => Promise<boolean>;
  disabled?: boolean;
}

export function SlugInput({ value, onChange, checkAvailability, disabled }: SlugInputProps) {
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const checkSlug = async () => {
      // Validar formato
      const slugRegex = /^[a-z0-9-]+$/;
      
      if (!value) {
        setAvailable(null);
        setError('');
        return;
      }

      if (value.length < 3) {
        setAvailable(null);
        setError('Mínimo 3 caracteres');
        return;
      }

      if (value.length > 50) {
        setAvailable(null);
        setError('Máximo 50 caracteres');
        return;
      }

      if (!slugRegex.test(value)) {
        setAvailable(null);
        setError('Solo letras minúsculas, números y guiones');
        return;
      }

      // Check availability
      setChecking(true);
      setError('');
      
      try {
        const isAvailable = await checkAvailability(value);
        setAvailable(isAvailable);
      } catch (err) {
        setAvailable(null);
      } finally {
        setChecking(false);
      }
    };

    const timeoutId = setTimeout(checkSlug, 500);
    return () => clearTimeout(timeoutId);
  }, [value, checkAvailability]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="slug">Slug de URL</Label>
      <div className="relative">
        <Input
          id="slug"
          value={value}
          onChange={handleChange}
          placeholder="mi-empresa"
          disabled={disabled}
          className={error ? 'border-destructive' : ''}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {checking && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          {!checking && available === true && (
            <CheckCircle2 className="h-4 w-4 text-success" />
          )}
          {!checking && available === false && (
            <XCircle className="h-4 w-4 text-destructive" />
          )}
        </div>
      </div>
      
      {value && (
        <p className="text-sm text-muted-foreground">
          Tu página será: <span className="font-mono font-semibold">
            {process.env.NEXT_PUBLIC_APP_URL || 'https://ankapulse.app'}/status/{value || 'tu-slug'}
          </span>
        </p>
      )}
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      
      {!checking && available === false && !error && (
        <p className="text-sm text-destructive">Este slug no está disponible</p>
      )}
      
      {!checking && available === true && (
        <p className="text-sm text-success">¡Slug disponible!</p>
      )}
    </div>
  );
}