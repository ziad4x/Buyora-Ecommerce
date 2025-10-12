import type { Metadata } from "next";
import "./../globals.css";
import { Providers } from "../themeProvider";
import Navbar from "@/components/navbar";
import Footer from "@/pages/home/footer";


export const metadata: Metadata = {
  title: "Buyora - E-commerce",
  description: "An e-commerce website built with Next.js and Tailwind CSS",
  icons: {
    icon: "/assets/icons/online-shop.ico",
    apple: "/assets/icons/online-shop.ico",
  },
};

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <head>
        {/* <link rel="icon" href="assets/icons/online-shop.png" />
        <link rel="apple-touch-icon" href="assets/icons/online-shop.png" /> */}
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden">
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
