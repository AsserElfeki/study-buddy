import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@src/components/Providers";
import Navbar from "@src/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Study In Poland - Portal",
  description:
    "Easily find and apply for study programmes in Poland from all around the world",
};

/**
 * Renders the root layout component.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @return {React.ReactElement} The rendered root layout component.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
