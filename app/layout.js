import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import Footer from "./components/Common/Footer/Footer";
import HeaderSidebarWrapper from "./components/Header/HeaderSidebarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Cyper Studio - Your Digital Solutions Partner",
    template: "%s | Cyper Studio"
  },
  description: "Professional digital solutions tailored to your business needs. Experts in web development, design, and digital transformation.",
  keywords: ["digital solutions", "web development", "design", "professional services", "digital transformation"],
  authors: [{ name: "Cyper Studio" }],
  creator: "Cyper Studio",
  publisher: "Cyper Studio",
  metadataBase: new URL("https://cyperstudio.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Cyper Studio - Your Digital Solutions Partner",
    description: "Professional digital solutions tailored to your business needs",
    url: "https://cyperstudio.in",
    siteName: "Cyper Studio",
    images: [
      {
        url: "/Assets/Image/cyper-logo/cyper-dark-logo.png", // Fixed: Use public path
        width: 1200,
        height: 630,
        alt: "Cyper Studio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyper Studio - Your Digital Solutions Partner",
    description: "Professional digital solutions tailored to your business needs",
    images: ["/Assets/Image/cyper-logo/cyper-dark-logo.png"], // Fixed: Use consistent image path
    creator: "@cyperstudio", // Add your Twitter handle if available
  },
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
  verification: {
    // Add verification IDs when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <StyledComponentsRegistry>
      <html lang="en">
        <head>
          {/* Favicon and icons */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
          <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <HeaderSidebarWrapper />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </StyledComponentsRegistry>
  );
}