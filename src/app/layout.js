import { poppins } from "@/app/ui/fonts";
import ClientProvider from "@/components/Auth/ClientProvider";
import { themes } from "@/constants/Themes";
import StyledComponentsRegistry from "@/contexts/StyledComponentsRegistry";
import "./globals.css";

const APP_URL = "https://app.mschitcircle.com";

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1
};

export const metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "MS ChitCircle",
    template: "%s | MS ChitCircle"
  },
  description:
    "Manage your digital signage network from one powerful dashboard. Control devices, playlists, schedules, media, and content across your entire display fleet.",
  keywords: [
    "chit fund management",
    "chit circle management",
    "member management",
    "scheme management",
    "MS ChitCircle"
  ],
  authors: [{ name: "MS ChitCircle", url: APP_URL }],
  creator: "MS ChitCircle",
  publisher: "MS ChitCircle",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true }
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: "MS ChitCircle",
    title: "MS ChitCircle",
    description:
      "Manage your chit fund network, schemes, and member operations from one powerful dashboard.",
    images: [
      {
        url: "/logo/SM-logo-h.png",
        width: 1200,
        height: 630,
        alt: "MS ChitCircle"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "MS ChitCircle",
    description:
      "Manage your chit fund network, schemes, and member operations from one powerful dashboard.",
    images: ["/logo/SM-logo-h.png"]
  }
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MS ChitCircle",
  url: APP_URL,
  logo: `${APP_URL}/logo/SM-logo-h.png`,
  sameAs: []
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MS ChitCircle",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "A cloud-based chit fund management platform for managing schemes, members, and collections.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  author: {
    "@type": "Organization",
    name: "MS ChitCircle",
    url: APP_URL
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppJsonLd)
          }}
        />
      </head>
      <body
        className={`${poppins.className}`}
        style={{
          padding: "0",
          margin: "0",
          backgroundColor: themes.backgroundColor
        }}
        suppressHydrationWarning={true}
      >
        <StyledComponentsRegistry>
          <ClientProvider>{children}</ClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
