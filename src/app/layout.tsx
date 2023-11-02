import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@src/components/providers";
import Navbar from "@src/components/navbar";
import CssBaseline from '@mui/material/CssBaseline';

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
          <CssBaseline />
            <Navbar />
          <div className='main-container '>
            <main className="app z-10 max-w-7xl flex justify-center items-center min-h-screen">
              {children}
            </main>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
