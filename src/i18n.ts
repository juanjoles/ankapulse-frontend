import { getRequestConfig } from 'next-intl/server';

export const locales = ['es', 'en'] as const;
export const defaultLocale = 'es' as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

   
  // ✅ CARGA MANUAL PARA TEST
  let messages;
  if (locale === 'en') {
    messages = await import('./messages/en.json');
  } else {
    messages = await import('./messages/es.json');
  }
  

  return {
    locale,
    messages: messages.default
  };
});