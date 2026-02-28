import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apollo.0g.ai"),
  title: "0G Apollo Program - AI Accelerator",
  description: "10-week accelerator from Stanford-backed Blockchain Builders and 0G protocol for Web3 founders building the future of AI infrastructure",
  keywords: ["0G", "blockchain", "accelerator", "Web3", "AI", "startup", "Stanford", "Stanford blockchain", "Stanford accelerator"],
  openGraph: {
    title: "0G Apollo Program - AI Accelerator",
    description: "10-week accelerator from Stanford-backed Blockchain Builders and 0G protocol for Web3 founders building the future of AI infrastructure",
    url: "https://apollo.0g.ai",
    siteName: "0G Apollo Program",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "0G Apollo Program - AI Accelerator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "0G Apollo Program - AI Accelerator",
    description: "10-week accelerator from Stanford-backed Blockchain Builders and 0G protocol for Web3 founders building the future of AI infrastructure",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://apollo.0g.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "0G Apollo Program",
                  url: "https://apollo.0g.ai",
                  logo: "https://apollo.0g.ai/apollo.png",
                  description: "AI & Web3 Accelerator by Blockchain Builders and 0G Labs",
                },
                {
                  "@type": "Event",
                  name: "0G Apollo Program - AI Accelerator",
                  startDate: "2025-04-12",
                  endDate: "2025-06-27",
                  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
                  description: "10-week accelerator from Stanford-backed Blockchain Builders and 0G protocol for Web3 founders building the future of AI infrastructure",
                  organizer: {
                    "@type": "Organization",
                    name: "Blockchain Builders & 0G Labs",
                  },
                  location: {
                    "@type": "Place",
                    name: "Stanford University",
                    address: "Stanford, CA",
                  },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
