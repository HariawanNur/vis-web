import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"

import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Panduan Pengguna",
  description: "Panduan langkah demi langkah untuk memulai dan mengoptimalkan penggunaan platform Vistara Teknologi Indonesia.",
  alternates: { canonical: "/panduan" },
}

export default Page
