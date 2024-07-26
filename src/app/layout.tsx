import type { Metadata } from "next";
import { Rubik } from 'next/font/google'
import "./globals.css";
import Navbar from "./_components/Navbar";
import QueryProvider from "./providers/queryProvider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const rubik = Rubik({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Bookish",
  description: "Find your favorite book and read it here for free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <main className={`${rubik.className} relative min-h-screen bg-[#F5F6F8] text-black`}>
            <Navbar />
            {children}
          </main>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>

      </body>
    </html>
  );
}

