import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_TC } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ParallaxBlobs from "./components/ParallaxBlobs";
import VisitorNameProvider from "./components/VisitorNameProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifTC = Noto_Serif_TC({
  variable: "--font-serif-tc",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

export const metadata: Metadata = {
  title: "芒果莊園 | 台灣芒果專門店",
  description:
    "台南玉井、屏東枋山產地直送。愛文、金煌、玉文、凱特⋯五大人氣芒果品種，當季鮮採，甜到心底。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifTC.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden bg-canvas text-ink">
        {/* Grain texture overlay */}
        <div className="grain" aria-hidden />
        {/* Two restrained accent fields that drift at different speeds as you scroll */}
        <ParallaxBlobs />

        <VisitorNameProvider>
          <Header />
          {children}
          <Footer />
        </VisitorNameProvider>
      </body>
    </html>
  );
}
