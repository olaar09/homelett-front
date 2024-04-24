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
  assets: [
    "css/style-3L7QEW2Y.css",
    "/css/app-IQIUDFNW.css",
    "/css/fonts-YCCUU2CX.css",
    "/css/cooltipz.min-7ME7X4VP.css",
  ],
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ApplyGenius" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <title>ApplyGenius - AI Copilot for job search</title>
        <meta name="robots" content="index,follow" />
        <meta
          name="description"
          content="Automatically apply to 50+ jobs daily from all over the world, with your CV modified to each job requirement"
        />
        <meta
          property="og:title"
          content="ApplyGenius - AI Copilot for job search"
        />
        <meta
          property="og:description"
          content="Automatically apply to 50+ jobs daily from all over the world, with your CV modified to each job requirement"
        />
        <meta property="og:url" content="https://ApplyGenius.ai/partners" />
        <meta property="og:image" content="/images/dashboard-mockup.png" />
        <meta
          property="og:image:alt"
          content="ApplyGenius - Your AI Agent for Job Search"
        />
        <meta property="og:site_name" content="ApplyGenius" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          rel="stylesheet"
          href="https://fonts.bunny.net/css?family=inter:100,200,300,400,500,600,700,800,900"
        />
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
