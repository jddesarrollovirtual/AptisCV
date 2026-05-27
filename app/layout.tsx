import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HydrationFix } from "@/components/ui/hydration-fix";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AptisCV | Optimizador de currículums con IA",
  description: "Mejora tu puntuación ATS al instante con VeloCV. Obtén análisis personalizados, detección de habilidades y búsqueda de empleo para conseguir el trabajo de tus sueños.",
  keywords: ["analizador de currículums", "puntuación ATS", "asesoramiento profesional", "creador de currículums con IA", "búsqueda de empleos"],
  openGraph: {
    title: "AptisCV - Optimizador de currículums con IA",
    description: "Obtén un análisis ATS profesional en minutos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <HydrationFix />
        {children}
      </body>
    </html>
  );
}
