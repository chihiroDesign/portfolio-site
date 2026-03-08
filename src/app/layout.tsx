import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CHIHIRO | AI Visual Artist",
  description: "Portfolio showing digital craftsmanship, AI experiments, and visual storytelling.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.png", sizes: "any", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "CHIHIRO | AI Visual Artist",
    description: "Portfolio showing digital craftsmanship, AI experiments, and visual storytelling.",
    url: "https://www.chihiro.design",
    siteName: "CHIHIRO | AI Visual Artist",
    type: "website",
    images: [
      {
        url: "https://www.chihiro.design/ogp.png",
        width: 1456,
        height: 816,
        alt: "CHIHIRO | AI Visual Artist Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CHIHIRO | AI Visual Artist",
    description: "Portfolio showing digital craftsmanship, AI experiments, and visual storytelling.",
    images: ["https://www.chihiro.design/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
