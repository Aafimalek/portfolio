import type { Metadata } from "next";
import { Outfit, Doto, Nabla, VT323 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/next';


const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
});

const nabla = Nabla({
  subsets: ["latin"],
  variable: "--font-nabla",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "aafi malek portfolio",
  description: "Portfolio of an AI/ML Engineer",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${doto.variable} ${nabla.variable} ${vt323.variable} font-vt323 antialiased lowercase`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
