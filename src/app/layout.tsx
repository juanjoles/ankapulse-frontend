import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "AnkaPulse - Monitoreo de APIs Simple y Accesible",
  description: "Mantén tus servicios funcionando con AnkaPulse. Monitoreo en tiempo real, alertas instantáneas y reportes detallados.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          {/* <Toaster position="top-right" /> */}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}