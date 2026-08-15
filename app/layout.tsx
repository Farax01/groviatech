import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://groviatech.vercel.app"),
  title: {
    default: "GroviaTech Solutions | Tech Solutions Agency",
    template: "%s | GroviaTech Solutions",
  },
  description: "GroviaTech Solutions builds secure software and defends businesses against cyber threats. Software development and cybersecurity for SMEs globally.",
  keywords: ["GroviaTech","GroviaTech Solutions","tech solutions agency","web development agency Lagos","cybersecurity Nigeria","software development agency","penetration testing Nigeria","web development agency United States","web development agency UAE","web development agency UK"],
  authors: [{ name: "GroviaTech Solutions" }],
  openGraph: {
    type: "website",
    siteName: "GroviaTech Solutions",
    title: "GroviaTech Solutions | Grow via Technical Solutions",
    description: "Software development and cybersecurity for SMEs globally.",
  },
  twitter: { card: "summary_large_image", site: "@groviatech", creator: "@groviatech" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main style={{ paddingTop: 72 }}>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
