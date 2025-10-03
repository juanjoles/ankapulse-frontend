export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 transition-colors">
      <div className="absolute top-4 left-4">
        <h1 className="text-2xl font-bold text-primary">AnkaPulse</h1>
      </div>
      {children}
    </div>
  );
}