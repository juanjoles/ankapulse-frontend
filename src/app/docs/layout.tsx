import { NavbarClient } from '@/components/navbar-client';

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