import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"

import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.benefits,
  alternates: { canonical: "/manfaat" },
}

export default Page
