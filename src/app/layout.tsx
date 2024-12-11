import type { Metadata } from 'next'
import './globals.css'
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});


export const metadata: Metadata = {
  title: 'Trissea - Tricycle Booking App',
  description: 'Book tricycles easily and safely with Trissea in Tuguegarao City. The most convenient way to travel around your local community.',
}

export default function RootLayout({
  children,
  
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}
