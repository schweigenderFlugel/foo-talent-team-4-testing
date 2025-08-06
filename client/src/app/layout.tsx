import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/layouts/header";
import { Footer } from "@/layouts/footer";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TestingApp | Gestión de Insumos",
    template: "%s | TestingApp",
  },
  description:
    "TestingApp es una plataforma para la gestión de insumos donde los administradores pueden crear, visualizar, editar y eliminar feedstocks fácilmente desde un dashboard.",
  keywords: [
    "TestingApp",
    "Gestión de Insumos",
    "Feedstock",
    "Dashboard de Admin",
    "App de administración",
    "CRUD de productos",
    "Next.js",
    "Zustand",
    "ShadCN",
  ],
  applicationName: "TestingApp",
  authors: [{ name: "Franco Maidana" }, { name: "Matias Diaconchuk" }],
  generator: "Next.js 15",
  metadataBase: new URL("https://ft-equipo04-testing-app.vercel.app"),
  openGraph: {
    title: "TestingApp | Gestión de Insumos",
    description:
      "Administra fácilmente tus insumos desde un panel centralizado. Crea, edita, elimina y visualiza productos desde el dashboard.",
    url: "https://ft-equipo04-testing-app.vercel.app",
    siteName: "TestingApp",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dashboard de TestingApp con tabla de insumos",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TestingApp | Gestión de Insumos",
    description:
      "Plataforma para administrar insumos de forma simple y eficiente.",
    images: ["/og-image.png"],
  },
  category: "Aplicación web",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-512x512.png",
  }
}

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 min-h-screen`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Suspense>
              {children}
            </Suspense>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
