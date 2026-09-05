import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"

import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Peta Situs",
  description: "Peta situs lengkap PT. Vistara Teknologi Indonesia untuk memudahkan navigasi seluruh halaman.",
  alternates: { canonical: "/peta-situs" },
}

export default Page
