import { NavbarClient } from '@/components/navbar-client';
import Link from 'next/link';
import { FileText, Play, Bell, CreditCard, Book } from 'lucide-react';

const navigation = [
  { name: 'Introducción', href: '/docs', icon: Book },
  { name: 'Primeros Pasos', href: '/docs/getting-started', icon: Play },
  { name: 'Monitoreo de APIs', href: '/docs/api-monitoring', icon: FileText },
  { name: 'Alertas', href: '/docs/alerts', icon: Bell },
  { name: 'Facturación', href: '/docs/billing', icon: CreditCard },
];

// export default function DocsLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="container mx-auto px-4 py-6 border-b">
//         <NavbarClient />
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <aside className="lg:w-64 flex-shrink-0">
//             <nav className="space-y-2">
//               <div className="pb-4">
//                 <h2 className="text-lg font-semibold text-foreground mb-4">
//                   Documentación
//                 </h2>
//               </div>
//               {navigation.map((item) => {
//                 const Icon = item.icon;
//                 return (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="flex items-center gap-3 px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
//                   >
//                     <Icon className="w-4 h-4" />
//                     {item.name}
//                   </Link>
//                 );
//               })}
//             </nav>
//           </aside>

//           {/* Main Content */}
//           <main className="flex-1 max-w-4xl">
//             {children}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto px-4 py-6 border-b">
        <NavbarClient />
      </header>
      <div className="container mx-auto px-4 py-12">
        {children}
      </div>
    </div>
  );
}