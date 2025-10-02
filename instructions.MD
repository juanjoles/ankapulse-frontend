Crea la estructura completa de carpetas y archivos para un proyecto Next.js 14 llamado AnkaPulse. El proyecto ya tiene instalado:
- Next.js 14 con App Router
- TypeScript
- Tailwind CSS
- shadcn/ui (carpeta components/ui ya existe)
- Dependencias: axios, recharts, react-hook-form, zod, lucide-react, date-fns

ESTRUCTURA DE CARPETAS A CREAR:

src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── checks/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   └── settings/
│   │       └── page.tsx
│   ├── payment/
│   │   ├── success/
│   │   │   └── page.tsx
│   │   └── failure/
│   │       └── page.tsx
│   └── page.tsx (landing page)
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── dashboard/
│   │   ├── DashboardHeader.tsx
│   │   ├── StatsCards.tsx
│   │   └── Sidebar.tsx
│   ├── checks/
│   │   ├── CheckCard.tsx
│   │   ├── CheckForm.tsx
│   │   └── ChecksList.tsx
│   ├── charts/
│   │   ├── UptimeChart.tsx
│   │   ├── LatencyChart.tsx
│   │   └── RegionalChart.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── utils.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useChecks.ts
│   └── usePlan.ts
└── types/
    └── index.ts

REQUISITOS:

1. Todos los archivos .tsx deben tener un export default con un componente básico placeholder
2. Los layouts deben tener la estructura mínima de Next.js 14
3. Cada page.tsx debe tener metadata export
4. NO generes contenido completo, solo la estructura con comentarios "// TODO: Implement"
5. Los archivos de lib/ deben tener interfaces/types básicos exportados
6. Usa "use client" donde sea necesario (forms, hooks, interactive components)

Genera SOLO la estructura de archivos con exports mínimos para que compile sin errores.