import Image from "next/image";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-min-screen">{children}</body>
    </html>
  );
}
