import type { Metadata } from "next";
import { JetBrains_Mono, Sora } from "next/font/google";
import { GeistPixelSquare } from "geist/font/pixel";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/next';


const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Aafi Malek | AI & ML Engineer | Full Stack Developer",
    template: "%s | Aafi Malek",
  },
  description:
    "Aafi Malek is an AI/ML engineer building agents, retrieval systems, speech applications and open-source software.",
  keywords: [
    "Aafi Malek",
    "Aafikhan Malek",
    "Aafi khan Malek",
    "AI Engineer",
    "ML Engineer",
    "Machine Learning",
    "Full Stack Developer",
    "Portfolio",
    "Jamnagar",
    "Ahmedabad",
    "Gujarat",
    "India",
    "LDCE",
    "L.D. College Of Engineering",
    "Web Developer",
    "Python",
    "React",
    "Next.js",
    "Deep Learning",
    "Data Science",
  ],
  authors: [{ name: "Aafi Malek", url: "https://aafi.vercel.app" }],
  creator: "Aafi Malek",
  publisher: "Aafi Malek",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aafi.vercel.app",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL("https://aafi.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aafi.vercel.app/",
    siteName: "Aafi Malek Portfolio",
    title: "Aafi Malek | AI & ML Engineer | Full Stack Developer",
    description:
      "AI/ML engineer building agents, retrieval systems, speech applications and open-source software.",
    images: [
      {
        url: "/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Aafi Malek, AI & ML Engineer, above a painted Japanese lake landscape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aafi Malek | AI & ML Engineer | Full Stack Developer",
    description:
      "AI/ML engineer building agents, retrieval systems, speech applications and open-source software.",
    images: ["/og-banner.jpg"],
    creator: "@aafimalek2032",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${jetbrainsMono.variable} ${GeistPixelSquare.variable} font-sans antialiased`}
      >
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}[data-mark]::before,[data-mark]::after{clip-path:none!important;--sweep:400deg!important}[data-mark="highlight"]{color:#2a1a02;-webkit-text-fill-color:#2a1a02}`}</style>
        </noscript>
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
