import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import {Toaster} from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AMG Kindergarten",
  description: "Trường Mầm Non Anh Mỹ - Nơi Khởi Đầu Tương Lai",
};

export default function RootLayout({
  children,
  params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
  return (
      <html lang={locale}>
      <body>
      <Providers>
          <Toaster position="top-right" richColors />
          {children}
      </Providers>
      </body>
      </html>
  );
}
