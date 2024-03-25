import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";
import FirebaseProvider from "@/contexts/FirebaseProvider";
import { FireBaseAuthProvider } from "@/contexts/FireBaseAuthContext";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "AfterClass",
  description: "Ask your lecture notes any question after class",
  applicationName: "AfterClass",
  appleWebApp: true,
  formatDetection: { telephone: false },
  icons: ["/vercel.svg", "/vercel.svg", "/vercel.svg"],
  openGraph: {
    type: "website",
    title: "AfterClass",
    description: "",
    siteName: "",
    url: "",
    images: "",
  },
  twitter: {
    site: "",
    siteId: "", // make unique
    creator: "AfterClass Africa",
    description: "Ask your lecture notes any question, after class",
    title: "AfterClass",
    images: "",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};
/* <!-- apple splash screen images -->
<!--
<link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' />
--> */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseProvider>
          <Suspense fallback={<span>....</span>}>
            <FireBaseAuthProvider>{children} </FireBaseAuthProvider>{" "}
          </Suspense>
        </FirebaseProvider>
      </body>
    </html>
  );
}
