// components/ui/alert.tsx
import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg border border-orange-200 bg-orange-50 p-4 ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<AlertProps> = ({ children, className = '' }) => {
  return (
    <div className={`text-sm text-orange-800 ${className}`}>
      {children}
    </div>
  );
};