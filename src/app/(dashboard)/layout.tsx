// src/app/dashboard/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import LayoutClient from "@/components/providers/layout-client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
