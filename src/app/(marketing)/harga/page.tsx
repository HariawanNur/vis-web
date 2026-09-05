import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"

import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.pricing,
  alternates: { canonical: "/harga" },
}

export default Page
