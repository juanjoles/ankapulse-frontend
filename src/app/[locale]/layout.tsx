import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: "AnkaPulse - Monitoreo de APIs Simple y Accesible",
  description: "Mantén tus servicios funcionando con AnkaPulse. Monitoreo en tiempo real, alertas instantáneas y reportes detallados.",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        {/* <Toaster position="top-right" /> */}
      </ThemeProvider>
      <Analytics />
    </NextIntlClientProvider>
  );
}