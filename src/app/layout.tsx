import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChainGuard AI – Real-Time Supply Chain Risk Intelligence",
  description:
    "ChainGuard AI delivers real-time predictive analytics for supply chain disruptions, enabling mid-sized manufacturers to proactively mitigate risks and maintain operational continuity.",
  keywords: [
    "supply chain risk",
    "predictive analytics",
    "manufacturing",
    "disruption intelligence",
    "supplier monitoring",
    "AI risk platform",
  ],
  openGraph: {
    title: "ChainGuard AI – Supply Chain Risk Intelligence",
    description:
      "Real-time AI predictions to shield your supply chain from disruptions — built for manufacturers facing global volatility.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
