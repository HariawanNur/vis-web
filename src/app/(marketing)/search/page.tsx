import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"

import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Pencarian",
  description: "Temukan halaman, layanan, dan informasi yang Anda butuhkan di website PT. Vistara Teknologi Indonesia.",
  alternates: { canonical: "/search" },
}

export default Page
