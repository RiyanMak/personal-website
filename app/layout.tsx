import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://riyanmaknojia.com"),
  title: "Riyan Maknojia — CS Student & Full-Stack Developer",
  description:
    "Riyan Maknojia is a CS student at UT Dallas focused on machine learning, full-stack development, and systems. Building things that work in production.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Riyan Maknojia — CS Student & Full-Stack Developer",
    description:
      "CS student at UT Dallas. Full-Stack Developer and ML Enthusiast.",
    url: "https://riyanmaknojia.com",
    siteName: "Riyan Maknojia",
    type: "website",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Riyan Maknojia",
  url: "https://riyanmaknojia.com",
  email: "riyanmak123@gmail.com",
  jobTitle: "CS Student · Full-Stack Developer · ML Enthusiast",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Texas at Dallas",
  },
  knowsAbout: [
    "Machine Learning",
    "Full-Stack Development",
    "Software Engineering",
    "Artificial Intelligence",
  ],
  sameAs: [
    "https://github.com/RiyanMak",
    "https://www.linkedin.com/in/riyan-maknojia/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${geistMono.variable} antialiased bg-[#C97B6E] h-screen overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
