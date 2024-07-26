import type { Metadata } from "next";
import { Rubik } from 'next/font/google'
import "./globals.css";
import Navbar from "./_components/Navbar";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import FilterProvider from "@/providers/bookProvider";
import QueryProvider from "@/providers/queryProvider";
import BookProvider from "@/providers/bookProvider";

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
      <link rel="icon" href="/icon.svg" sizes="any" />
      <body>
        <QueryProvider>
          <main className={`${rubik.className} relative min-h-screen bg-[#F5F6F8] text-black`}>
            <Navbar />
            <BookProvider>
              {children}
            </BookProvider>
          </main>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>

      </body>
    </html>
  );
}

