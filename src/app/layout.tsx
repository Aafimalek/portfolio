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
  title: "Aafi Malek Portfolio",
  description: "Portfolio of Aafi Malek",
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://www.aafimalek.live"),
  openGraph: {
    type: "website",
    url: "https://www.aafimalek.live/",
    title: "Aafi Malek Portfolio",
    description: "Portfolio of Aafi Malek",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aafi Malek Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aafi Malek Portfolio",
    description: "Portfolio of Aafi Malek",
    images: ["/og-image.png"],
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
