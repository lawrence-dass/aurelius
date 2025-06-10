import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurelius",
  description: "Real-time Stoic guidance at your fingertips. Get personalized wisdom from ancient philosophy for modern challenges, 24/7. Practice daily reflections, navigate difficult situations, and build resilience with on-demand mentorship rooted in Stoic principles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${crimson.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
