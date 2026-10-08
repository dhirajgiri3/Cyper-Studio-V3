import localFont from "next/font/local";
import { siteConfig } from "../../content/site";
import { meta } from "../../content/home";
import "./home.css";

// Self-hosted subset fonts from the design system. Only Geist (used by the hero) is preloaded.
const geist = localFont({
  src: "../../design-system/fonts/Geist-Variable.subset.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

const geistMono = localFont({
  src: "../../design-system/fonts/GeistMono-Variable.subset.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "HELIX by Cyper Studio",
    title: meta.title,
    description: meta.description,
    locale: siteConfig.locale,
  },
  twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F4EE",
  colorScheme: "light",
};

export default function HelixRootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint so enhancements never blank content without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="hx-page">{children}</body>
    </html>
  );
}
