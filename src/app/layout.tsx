import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CHIHIRO | AI Visual Artist",
  description: "Portfolio showing digital craftsmanship, AI experiments, and visual storytelling.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.png", sizes: "any", type: "image/png" },
    ],
    apple: "/favicon.png",
  },
  openGraph: {
    title: "CHIHIRO | AI Visual Artist",
    description: "Portfolio showing digital craftsmanship, AI experiments, and visual storytelling.",
    url: "https://www.chihiro.design",
    siteName: "CHIHIRO | AI Visual Artist",
    type: "website",
    images: [
      {
        url: "https://www.chihiro.design/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "CHIHIRO | AI Visual Artist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CHIHIRO | AI Visual Artist",
    description: "Portfolio showing digital craftsmanship, AI experiments, and visual storytelling.",
    images: ["https://www.chihiro.design/ogp.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} bg-[#0a0a0a] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
