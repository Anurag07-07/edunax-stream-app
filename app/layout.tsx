import "../styles/globals.css"
import { type Metadata } from "next";
import { dark } from "@clerk/themes";
import {
  ClerkProvider,
} from "@clerk/nextjs";


import { Toaster } from 'sonner'
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme.provider";

// Load fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Page metadata
export const metadata: Metadata = {
  title: "Edunax — Live Learning for Students",
  description:
    "The student-first live streaming platform. Teach DSA, Web Dev, MBBS, CA and more. Overcome hesitation, improve communication, and grow your skills by teaching live.",
  keywords: ["education", "live learning", "student streaming", "teach online", "DSA", "MBBS", "CA", "web development", "edunax"],
  openGraph: {
    title: "Edunax — Teach What You Know. Learn What You Don't.",
    description: "Live learning platform for Indian students. Stream, teach, and grow.",
    type: "website",
  },
};

// Root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark],
      }}
    >
      {/* suppressHydrationWarning required by next-themes */}
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${outfit.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="gamehub-theme"
          >
            <Toaster
              theme="system"
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "var(--popover)",
                  color: "var(--popover-foreground)",
                  border: "1px solid var(--border)",
                },
              }}
            />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
