import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"

import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Event & Kegiatan",
  description: "Jadwal event, workshop, webinar, dan konferensi teknologi yang diselenggarakan oleh Vistara.",
  alternates: { canonical: "/event" },
}

export default Page
