import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "../globals.css";
import EmotionRegistry from "../registry";
import Providers from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gowoobro",
  description: "Welcome to my world",
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ko' }]
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  // Awaiting params in Next.js 15+/server components if needed, but here it's prop
  // In Next.js 15, params might be a Promise. Next.js 16.1.6 is used here. 
  // Let's assume params is standard.
  const { lang } = await params; 

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <EmotionRegistry>
          <Providers>
            {children}
          </Providers>
        </EmotionRegistry>
      </body>
    </html>
  );
}
