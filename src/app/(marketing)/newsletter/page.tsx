import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"
import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Newsletter",
  description: "Dapatkan insight teknologi, bisnis, dan desain terbaru langsung di inbox Anda. Berlangganan newsletter Vistara secara gratis.",
  alternates: { canonical: "/newsletter" },
}

export default Page
