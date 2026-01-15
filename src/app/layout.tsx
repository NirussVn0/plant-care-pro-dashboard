import type { Metadata } from "next";
// import localFont from "next/font/local"; // Removing local font in favor of Google Fonts in globals.css or here
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlantCarePro",
  description: "Advanced Plant Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        {children}
      </body>
    </html>
  );
}
