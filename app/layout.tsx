import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Riyan Maknojia",
  description: "CS Student | Full-Stack Developer | ML Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased bg-[#C97B6E] h-screen overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
