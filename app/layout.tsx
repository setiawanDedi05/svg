import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {Poppins} from 'next/font/google';

const poppins = Poppins({subsets: ['latin'], weight: "700"});

export const metadata: Metadata = {
  title: "SVG",
  description: "Sort Video Generator",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={poppins.className}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
