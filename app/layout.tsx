import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
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
      <body className={`${bricolage.variable} antialiased`}>
        <Navbar />
        {children}
        </body>
    </html>
  );
}
