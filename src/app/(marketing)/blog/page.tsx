import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"

import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Blog & Artikel",
  description: "Temukan artikel terbaru seputar teknologi, digital transformation, UI/UX, dan wawasan industri dari tim ahli Vistara.",
  alternates: { canonical: "/blog" },
}

export default Page
