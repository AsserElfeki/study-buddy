import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "@src/components/providers";
import Navbar from "@src/components/navbar";
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

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
          <Container maxWidth={false} disableGutters={true}  className='bg-slate-100'>
          <Navbar />
            <Container maxWidth={'xl'} disableGutters={true} className='flex mx-auto justify-center min-h-[110vh]'>
            <main className="max-w-7xl flex flex-row justify-center w-screen  relative overflow-hidden items-start">
              {children}
            </main>
          </Container>  
          </Container>
        </NextAuthProvider>
      </body>
    </html>
  );
}
