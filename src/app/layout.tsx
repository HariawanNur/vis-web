import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { Providers } from "./providers"
import { StyleRegistry } from "./style-registry"

const inter = Inter({ subsets: ["latin"] })
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vistara Teknologi Indonesia",
    template: "%s | Vistara Teknologi Indonesia",
  },
  description: "Enterprise design system dan platform digital Vistara untuk corporate, dashboard, SaaS, IoT, dan aplikasi klien.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Vistara Teknologi Indonesia",
    title: "Vistara Teknologi Indonesia",
    description: "Enterprise design system dan platform digital Vistara.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vistara Teknologi Indonesia",
    description: "Enterprise design system dan platform digital Vistara.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <StyleRegistry>
          <Providers>{children}</Providers>
        </StyleRegistry>
      </body>
    </html>
  )
}
