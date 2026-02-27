import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";
import { AsideNavbar } from "@/components";

const roboto = Roboto();

export const metadata: Metadata = {
  title: "Mockado",
  description: "It's a mock server for your frontend development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.className} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
