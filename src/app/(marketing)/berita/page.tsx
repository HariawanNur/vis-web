import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"

import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Berita & Pengumuman",
  description: "Ikuti berita terkini, pengumuman resmi, dan pencapaian terbaru dari Vistara dalam dunia teknologi digital.",
  alternates: { canonical: "/berita" },
}

export default Page
