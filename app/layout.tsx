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
  title: "VeloCV | AI-Powered Resume Optimizer for ATS Success",
  description: "Boost your ATS score instantly with VeloCV. Get personalized analysis, skill detection, and job matching to land your dream career.",
  keywords: ["resume analyzer", "ATS score", "career coaching", "AI resume builder", "job matching"],
  openGraph: {
    title: "VeloCV - Optimize Your Resume with AI",
    description: "Get a professional ATS analysis in minutes.",
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
