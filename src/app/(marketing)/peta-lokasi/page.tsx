import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"
import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Peta Lokasi",
  description: "Temukan lokasi kantor Vistara Teknologi Indonesia. Kunjungi kami untuk diskusi langsung mengenai proyek Anda.",
  alternates: { canonical: "/peta-lokasi" },
}

export default Page
