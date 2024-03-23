import Head from "next/head";
import Image from "next/image";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        {/* Other meta tags for PWA */}
      </Head>
      <body className="h-min-screen">{children}</body>
    </html>
  );
}
