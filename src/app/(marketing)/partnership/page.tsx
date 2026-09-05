import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"
import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Partnership",
  description: "Jalin kemitraan strategis dengan Vistara Teknologi Indonesia. Tersedia untuk kemitraan teknologi, bisnis, dan akademik.",
  alternates: { canonical: "/partnership" },
}

export default Page
