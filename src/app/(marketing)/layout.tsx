import type { Metadata } from "next"
import type { ReactNode } from "react"
import { marketingMetadata } from "@/i18n"

import { MarketingShell } from "./_components/marketing-shell"
import { Footer, Header } from "./_components/site"

export const metadata: Metadata = {
  ...marketingMetadata.home,
}

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <MarketingShell>
      <Header />
      {children}
      <Footer />
    </MarketingShell>
  )
}
