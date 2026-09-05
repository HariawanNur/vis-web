import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"
import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Pertanyaan Umum",
  description:
    "Jawaban atas pertanyaan umum mengenai layanan, harga, teknis, dan dukungan PT. Vistara Teknologi Indonesia.",
  alternates: { canonical: "/faq" },
}

export default Page
