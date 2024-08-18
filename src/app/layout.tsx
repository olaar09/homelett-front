import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";
import { AppConfigProvider } from "@/contexts/AppConfigContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Korn | Convert your money easily to USD",
  description: "Convert your money easily to USD",
  applicationName: "Korn Money",
  referrer: "no-referrer",
  appleWebApp: true,
  formatDetection: { telephone: false },
  icons: {
    icon: "/logo.jpg", // /public path
  },
  // icons: ["/vercel.svg", "/vercel.svg", "/vercel.svg"],
  openGraph: {
    type: "website",
    title: "Korn Money",
    description: "",
    siteName: "",
    url: "",
    images: "",
  },
  twitter: {
    site: "",
    siteId: "", // make unique
    creator: "Korn INC",
    description: "",
    title: "Korn Money",
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
        <meta name="referrer" content="no-referrer" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KornMoney" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <title>Korn - Convert Naira easily yo USD</title>
        <meta name="robots" content="index,follow" />
        <meta
          name="description"
          content=""
        />
        <meta
          property="og:title"
          content="Korn - Convert Naira easily to USD"
        />
        <meta
          property="og:description"
          content=""
        />
        <meta property="og:url" content="https://Bubble.net/partners" />
        <meta property="og:image" content="/images/dashboard-mockup.png" />
        <meta
          property="og:image:alt"
          content="Korn - Convert your money easily to USD"
        />
        <meta property="og:site_name" content="Korn Money" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          rel="stylesheet"
          href="https://fonts.bunny.net/css?family=inter:100,200,300,400,500,600,700,800,900"
        />
      </Head>
      <body className={inter.className}>
        <GoogleOAuthProvider clientId="655083840359-3mq2i1jhtj7ehodfadm4b232pnetm1ka.apps.googleusercontent.com">
          <Suspense fallback={<span></span>}>
            <AppConfigProvider>
              <AuthProvider>{children} </AuthProvider>{" "}
            </AppConfigProvider>
          </Suspense>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
