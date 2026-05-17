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
    "Aafi Malek (Aafikhan Malek) - AI/ML Engineering student at L.D. College Of Engineering, Ahmedabad. Full Stack Developer from Jamnagar, Gujarat. Building innovative machine learning solutions, web applications, and products. View projects, skills, and contact information.",
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
  authors: [{ name: "Aafi Malek", url: "https://www.aafimalek.live" }],
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
    canonical: "https://www.aafimalek.live",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL("https://www.aafimalek.live"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.aafimalek.live/",
    siteName: "Aafi Malek Portfolio",
    title: "Aafi Malek | AI & ML Engineer | Full Stack Developer",
    description:
      "Aafi Malek (Aafikhan Malek) - AI/ML Engineering student at L.D. College Of Engineering, Ahmedabad. Full Stack Developer from Jamnagar building innovative solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aafi Malek - AI/ML Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aafi Malek | AI & ML Engineer | Full Stack Developer",
    description:
      "AI/ML Engineering student at LDCE, Ahmedabad. Full Stack Developer from Jamnagar building innovative solutions.",
    images: ["/og-image.png"],
    creator: "@aafimalek",
  },
  verification: {
    google: "your-google-verification-code", // Replace with actual code from Google Search Console
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
