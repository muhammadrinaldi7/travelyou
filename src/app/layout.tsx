import type { Metadata } from "next";
import "./globals.css";
import { Pacifico, Lexend_Deca, Lato } from "next/font/google";
import LayoutProvider from "@/components/layout/LayoutProvider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "react-hot-toast";

const monserrat = Pacifico({
  variable: "--font-monserrat",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const Lexend = Lexend_Deca({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const SansNarow = Lato({
  variable: "--font-sans-narow",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TravelYouuu",
  description: "Your Adventure, Your Way with TravelYouuu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`font-desc ${monserrat.variable} ${SansNarow.variable} ${Lexend.variable} antialiased`}
      >
        <LayoutProvider>
          <Header />
          <Toaster position="top-right" />
          <div className="container mx-auto">{children}</div>
          <Footer />
        </LayoutProvider>
      </body>
    </html>
  );
}
