import type { Metadata } from "next"
import { marketingMetadata } from "@/i18n"
import Page from "./client"

export const metadata: Metadata = {
  ...marketingMetadata.about,
  title: "Vistara | Disclaimers",
  description:
    "Disclaimers dan penafian penggunaan informasi pada situs web PT. Vistara Teknologi Indonesia.",
  alternates: { canonical: "/disclaimer" },
}

export default Page
