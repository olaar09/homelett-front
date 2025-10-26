import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeLett | Propel your real estate business",
  description: "Propel your real estate business",
  applicationName: "HomeLett",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "HomeLett Propel your real estate business",
    description: "Propel your real estate business",
    siteName: "HomeLett",
  },
  twitter: {
    creator: "HomeLett Limited",
    description: "Propel your real estate business",
    title: "HomeLett Propel your real estate business",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
