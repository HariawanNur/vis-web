import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { marketingMetadata } from "@/i18n"

export const metadata: Metadata = {
  ...marketingMetadata.home,
  alternates: { canonical: "/" },
}

export default function Page() {
  redirect("/beranda")
}
