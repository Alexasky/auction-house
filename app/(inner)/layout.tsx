import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "../globals.css";
import { Header } from '@/components/header'
import { AuctionProvider } from '@/context/auctionContext';

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
})

export const metadata: Metadata = {
  title: "Auction House - Premier Art & Collectibles",
  description:
    "Discover exceptional items from premier auction houses. Browse, search, and bid on fine art, antiques, and collectibles.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable} antialiased`}>
      <body className="font-sans">
        <div className="min-h-screen bg-background">
          <Header isInner={true}/>
          <AuctionProvider>
            {children}
          </AuctionProvider>
        </div>
      </body>
    </html>
  )
}