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
  title: "Edunax GameHub — Stream, Watch & Connect",
  description:
    "The ultimate game streaming platform. Watch live streams, chat in real‑time, and connect with your favourite creators.",
  keywords: ["gaming", "streaming", "live stream", "esports", "gamehub"],
  openGraph: {
    title: "Edunax GameHub",
    description: "Stream. Watch. Connect.",
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
