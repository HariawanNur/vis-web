import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"

import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Kebijakan Privasi",
  description:
    "Kebijakan privasi PT. Vistara Teknologi Indonesia tentang pengumpulan, penggunaan, dan perlindungan data pribadi Anda.",
  alternates: { canonical: "/kebijakan-privasi" },
}

export default Page
