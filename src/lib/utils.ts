import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// TODO: Add utility functions
export const formatDate = (date: Date | string): string => {
  // TODO: Implement date formatting with date-fns
  return new Date(date).toLocaleDateString()
}

export const formatUptime = (uptime: number): string => {
  return `${(uptime * 100).toFixed(2)}%`
}

export const formatLatency = (latency: number): string => {
  return `${latency}ms`
}

export const getStatusColor = (status: 'up' | 'down' | 'unknown'): string => {
  switch (status) {
    case 'up':
      return 'text-green-600'
    case 'down':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}