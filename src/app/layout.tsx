import type { Metadata } from "next";
import "./globals.css";

import { Roboto } from "next/font/google";
import { AsideNavbar } from "@/components";

const geist = Roboto();

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
    <html lang="en" className={`${geist.className} antialiased`}>
      <body className="flex h-screen w-screen">
        <AsideNavbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
