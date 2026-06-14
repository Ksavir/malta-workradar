import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorkRadar Malta",
  description:
    "Read anonymous workplace reviews, compare employers, and share your experience safely in Malta."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en">
      <body>{children}</body>
    </html>
  );
}
