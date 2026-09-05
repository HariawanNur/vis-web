import { getApiUrl } from "@/lib/runtime-env"

export interface OrganizationBillingData {
  name: string
  plan: string
  status: string
  validUntil: string
  usersUsed: number
  usersLimit: number
  storageUsed: string
  storageLimit: string
  apiUsed: string
  apiLimit: string
  billingHistory: Array<{ key: string; invoice: string; date: string; amount: string; status: string }>
}

const authHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") return {}
  const raw = window.localStorage.getItem("build_erp_session")
  if (!raw) return {}
  try {
    const session = JSON.parse(raw) as { sessionToken: string }
    return { Authorization: `Bearer ${session.sessionToken}` }
  } catch {
    return {}
  }
}

export const fetchOrganizationBilling = async (): Promise<OrganizationBillingData> => {
  const response = await fetch(`${getApiUrl()}/organization/billing`, {
    headers: authHeaders(),
  })
  const payload = (await response.json().catch(() => null)) as { success?: boolean; data?: OrganizationBillingData; message?: string } | null
  if (!response.ok || !payload?.success || !payload.data) {
    throw new Error(payload?.message || "Gagal memuat data billing")
  }
  return payload.data
}
