import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getPublishedPortfolioContent } from "@/lib/portfolio/content";
import {
  SITE_URL,
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
} from "@/lib/seo";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { identity } = await getPublishedPortfolioContent();
  const title = `${identity.name} — ${identity.role}`;
  return {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s - ${identity.name}`,
  },
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  applicationName: identity.name,
  authors: [{ name: identity.name, url: SITE_URL }],
  creator: identity.name,
  publisher: identity.name,
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: identity.name,
    title,
    description: SEO_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SEO_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  };
}

export const viewport: Viewport = {
  themeColor: "#060a16",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { identity } = await getPublishedPortfolioContent();
  const person = { "@context": "https://schema.org", "@type": "Person", name: identity.name, url: SITE_URL, jobTitle: identity.role, email: `mailto:${identity.email}`, description: identity.summary, address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" }, sameAs: Object.values(identity.links) };
  const website = { "@context": "https://schema.org", "@type": "WebSite", name: `${identity.name} — ${identity.role}`, url: SITE_URL, author: { "@type": "Person", name: identity.name } };
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full">
        {/* structured data - Person + WebSite for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
        />
        {children}
      </body>
    </html>
  );
}
