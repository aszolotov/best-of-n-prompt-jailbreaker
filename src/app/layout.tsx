import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BestOfN Prompt Jailbreaker",
  description: "Simple app that generates jailbreaker prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  );
}
