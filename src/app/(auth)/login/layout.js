const APP_URL = "https://app.mschitcircle.com";

export const metadata = {
  title: "Login",
  description:
    "Sign in to your  MS ChitCircle account to manage your  network, schemes etc., from anywhere.",
  alternates: {
    canonical: `${APP_URL}/login`
  },
  openGraph: {
    title: "Login – MS ChitCircle",
    description:
      "Sign in to your MS ChitCircle account to manage your chit network, schemes etc.",
    url: `${APP_URL}/login`,
    images: [
      {
        url: "/logo/SM-logo-h.png",
        width: 1200,
        height: 630,
        alt: "MS ChitCircle – Chit Fund Management Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Login – MS ChitCircle",
    description:
      "Sign in to your MS ChitCircle account to manage your chit network, schemes etc.",
    images: ["/logo/SM-logo-h.png"]
  }
};

export default function LoginLayout({ children }) {
  return children;
}
