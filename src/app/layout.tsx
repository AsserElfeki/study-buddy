import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Study In Poland - Portal",
  description:
    "Easily find and apply for study programmes in Poland from all around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app"><NextAuthProvider> {children} </NextAuthProvider></main>
      </body>
    </html>
  );
}
