// src/app/dashboard/layout.tsx
"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { useLocalStorage } from "usehooks-ts";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom_ui/dashboard/sidebar";
import Navbar from "@/components/custom_ui/dashboard/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";

// import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// import "../globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full text-foreground">
              <Navbar />
              <div>{children}</div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
