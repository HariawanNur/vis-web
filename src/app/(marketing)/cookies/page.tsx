import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"
import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Kebijakan Cookies",
  description:
    "Kebijakan penggunaan cookies dan teknologi serupa pada situs web PT. Vistara Teknologi Indonesia.",
  alternates: { canonical: "/cookies" },
}

export default Page
