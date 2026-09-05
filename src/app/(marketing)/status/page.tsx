import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"
import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Status Layanan",
  description: "Pantau status operasional seluruh layanan Vistara secara real-time. Website, API, Dashboard, dan layanan lainnya.",
  alternates: { canonical: "/status" },
}

export default Page
