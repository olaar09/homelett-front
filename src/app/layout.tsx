import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeLett | Contract Signing",
  description: "Digital contract signing platform for rental agreements and notices",
  applicationName: "HomeLett",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "HomeLett Contract Signing",
    description: "Digital contract signing platform for rental agreements and notices",
    siteName: "HomeLett",
  },
  twitter: {
    creator: "HomeLett INC",
    description: "Digital contract signing platform for rental agreements and notices",
    title: "HomeLett Contract Signing",
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
