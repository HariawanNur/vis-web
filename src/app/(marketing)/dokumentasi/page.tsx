import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"

import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Dokumentasi",
  description: "Dokumentasi lengkap API, integrasi, dan panduan teknis untuk produk dan layanan PT. Vistara Teknologi Indonesia.",
  alternates: { canonical: "/dokumentasi" },
}

export default Page
