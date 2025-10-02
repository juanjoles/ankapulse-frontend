export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute top-4 left-4">
        <h1 className="text-2xl font-bold text-blue-600">AnkaPulse</h1>
      </div>
      {children}
    </div>
  );
}