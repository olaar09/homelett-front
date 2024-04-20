import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "ApplyGeni.us | AI Co-Pilot for job search",
  description: "AI Co-Pilot for your job search",
  applicationName: "ApplyGeni.us",
  appleWebApp: true,
  formatDetection: { telephone: false },
  // icons: ["/vercel.svg", "/vercel.svg", "/vercel.svg"],
  openGraph: {
    type: "website",
    title: "ApplyGeni.us",
    description: "",
    siteName: "",
    url: "",
    images: "",
  },
  twitter: {
    site: "",
    siteId: "", // make unique
    creator: "ApplyGeni.us INC",
    description:
      "AI Co-Pilot for engineering and business teams to get things done faster!",
    title: "ApplyGeni.us",
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
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js" />
      </Head>
      <body className={inter.className}>
        <GoogleOAuthProvider clientId="655083840359-3mq2i1jhtj7ehodfadm4b232pnetm1ka.apps.googleusercontent.com">
          <Suspense fallback={<span></span>}>
            <AuthProvider>{children} </AuthProvider>{" "}
          </Suspense>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
