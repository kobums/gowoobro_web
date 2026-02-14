import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as a modern default font
import "./globals.css";
import EmotionRegistry from "./registry";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gowoobro Portfolio",
  description: "Welcome to my world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
