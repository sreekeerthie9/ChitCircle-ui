export const metadata = {
  title: {
    default: "Login - MS ChitCircle",
    template: "%s - MS ChitCircle"
  },
  description:
    "Log in to your MS ChitCircle account to manage your chit network, schemes etc.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: true, follow: true }
  }
};

export default function AuthLayout({ children }) {
  return children;
}
