import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
  
 const { pathname } = request.nextUrl;
  
  // Si es una ruta de status page, no aplicar i18n
  if (pathname.startsWith('/status')) {
    return; // Dejar pasar sin modificar
  }
  
  const response = intlMiddleware(request);
  
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};