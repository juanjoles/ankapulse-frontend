import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">AnkaPulse</div>
          <div className="space-x-4">
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Iniciar Sesión
            </Link>
            <Link 
              href="/register" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Crear Cuenta
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Monitoreo de APIs
            <span className="block text-blue-600">Simple y Accesible</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Mantén tus sitios y APIs online. Alertas instantáneas, setup en 2 minutos, 
            paga con MercadoPago. Hecho para Latinoamérica.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Empezar Gratis
            </Link>
            <Link 
              href="/pricing" 
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition"
            >
              Ver Planes
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Setup en 2 minutos</h3>
              <p className="text-gray-600">
                Sin complicaciones. Agrega tu URL y listo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">💳</div>
              <h3 className="text-xl font-semibold mb-2">Paga con MercadoPago</h3>
              <p className="text-gray-600">
                En pesos, sin complicaciones de tarjetas internacionales.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Mobile-First</h3>
              <p className="text-gray-600">
                Diseñado para que chequees tus APIs desde el celular.
              </p>
            </div>
          </div>

          {/* Pricing Preview */}
          <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8">Planes Simples y Transparentes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="text-3xl font-bold mb-4">$0<span className="text-lg text-gray-600">/mes</span></div>
                <ul className="space-y-2 text-left text-gray-600">
                  <li>✓ 10 checks</li>
                  <li>✓ 1 hora intervalo</li>
                  <li>✓ Alertas por email</li>
                </ul>
              </div>

              <div className="border-2 border-blue-600 rounded-xl p-6 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                  Popular
                </div>
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <div className="text-3xl font-bold mb-4">$5<span className="text-lg text-gray-600">/mes</span></div>
                <ul className="space-y-2 text-left text-gray-600">
                  <li>✓ 20 checks</li>
                  <li>✓ 5 minutos intervalo</li>
                  <li>✓ Alertas por email</li>
                  <li>✓ 30 días retención</li>
                </ul>
              </div>

              <div className="border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <div className="text-3xl font-bold mb-4">$15<span className="text-lg text-gray-600">/mes</span></div>
                <ul className="space-y-2 text-left text-gray-600">
                  <li>✓ 50 checks</li>
                  <li>✓ 1 minuto intervalo</li>
                  <li>✓ Slack/Discord</li>
                  <li>✓ 90 días retención</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t">
        <div className="text-center text-gray-600">
          <p>&copy; 2025 AnkaPulse. Hecho con ❤️ para Latinoamérica.</p>
        </div>
      </footer>
    </div>
  );
}