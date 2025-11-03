
export interface User {
  id: string;
  email: string;
  nombre: string;
  avatar?: string;
  provider?: string;
  createdAt: string;
  isActive: boolean;
  emailVerified: boolean;
}

export interface AuthResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    user: User;
    token: string;
  };
}

export interface Profile {
  id: string;
  userId: string;
  planType: 'free' | 'starter' | 'pro';
  maxChecks: number;
  minIntervalMinutes: number;
  dataRetentionDays: number;
  alertCooldownMin: number;
  currentChecks: number;
  planStartedAt?: string;
  planExpiresAt?: string;
}

export interface Check {
  id: string;
  userId: string;
  url: string;
  name?: string;
  interval: '1min' | '5min' | '15min' | '30min' | '1h' | '1d';
  regions: string[];
  timeout: number;
  expectedStatusCode: number;
  status: 'active' | 'paused';
  lastCheckAt?: string;
  lastStatus?: 'up' | 'down';
  failureCount: number;
  uptimePercentage?: number;
  averageLatency?: number;
  totalChecks?: number;
  successfulChecks?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CheckResult {
  id: string;
  checkId: string;
  region: string;
  statusCode: number;
  latencyMs: number;
  success: boolean;
  errorMessage?: string;
  timestamp: string;
}

export interface CheckMetrics {
  totalChecks: number;
  successfulChecks: number;
  failedChecks: number;
  uptimePercentage: number;
  averageLatency: number;
}

export interface CheckResultsResponse {
  status: 'success' | 'error';
  data: {
    check: Check;
    metrics: CheckMetrics;
    results: CheckResult[];
  };
}

export interface PlanUsage {
  plan: {
    type: string;
    name: string;
    price: number;
  };
  usage: {
    checks: {
      current: number;
      limit: number;
      percentage: number;
    };
    dataRetention: {
      days: number;
    };
    minInterval: {
      minutes: number;
      formatted: string;
    };
  };
  expiration: {
    expiresAt?: string;
    isExpired: boolean;
  };
}

export interface Subscription {
  id: string;
  userId: string;
  planType: 'starter' | 'pro';
  status: 'active' | 'cancelled' | 'expired';
  amount: number;
  currency: string;
  startDate: string;
  nextBillingDate?: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  planType: string;
  description: string;
  paidAt?: string;
  createdAt: string;
}

export interface ApiError {
  status: 'error';
  message: string;
  code?: string;
  data?: any;
  details?: string;
}

export interface CreateCheckInput {
  url: string;
  name?: string;
  interval: string;
  timeout?: number;
  expectedStatusCode?: number;
  regions?: string[];
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  nombre: string;
  password: string;
}