import { getApiUrl } from "@/lib/runtime-env"

export type AuditLogCategory = "login" | "tenant" | "user" | "billing" | "settings"
export type AuditLogStatus = "success" | "failed"

export interface AuditLogItem {
  id: string
  actor: string
  role: string
  action: string
  detail: string
  category: AuditLogCategory
  ip: string
  timestamp: string
  status: AuditLogStatus
}

export interface AuditLogFilters {
  tenantId?: string
  service?: string
  traceId?: string
  spanId?: string
  level?: "debug" | "info" | "warn" | "error"
  category?: AuditLogCategory
  actorId?: string
  action?: string
  query?: string
  status?: AuditLogStatus
  policyId?: string
  correlationId?: string
  from?: string
  to?: string
  page?: number
  pageSize?: number
}

const authHeaders = (sessionToken?: string | null): Record<string, string> => {
  if (typeof window === "undefined") return {}
  if (sessionToken) {
    return { Authorization: `Bearer ${sessionToken}` }
  }

  const raw = window.localStorage.getItem("build_erp_session")
  if (!raw) return {}

  try {
    const session = JSON.parse(raw) as { sessionToken: string }
    return { Authorization: `Bearer ${session.sessionToken}` }
  } catch {
    return {}
  }
}

const parseResponse = async <T>(response: Response): Promise<T> => {
  const payload = (await response.json().catch(() => null)) as { success?: boolean; data?: T; message?: string } | null
  if (!response.ok || !payload?.success || !payload.data) {
    throw new Error(payload?.message || "Gagal memuat data audit")
  }
  return payload.data
}

export const fetchAuditLogs = async (filters?: AuditLogFilters, sessionToken?: string | null): Promise<AuditLogItem[]> => {
  const searchParams = new URLSearchParams()

  if (filters?.tenantId) searchParams.set("tenantId", filters.tenantId)
  if (filters?.service) searchParams.set("service", filters.service)
  if (filters?.traceId) searchParams.set("traceId", filters.traceId)
  if (filters?.spanId) searchParams.set("spanId", filters.spanId)
  if (filters?.level) searchParams.set("level", filters.level)
  if (filters?.category) searchParams.set("category", filters.category)
  if (filters?.actorId) searchParams.set("actorId", filters.actorId)
  if (filters?.action) searchParams.set("action", filters.action)
  if (filters?.query) searchParams.set("query", filters.query)
  if (filters?.status) searchParams.set("status", filters.status)
  if (filters?.policyId) searchParams.set("policyId", filters.policyId)
  if (filters?.correlationId) searchParams.set("correlationId", filters.correlationId)
  if (filters?.from) searchParams.set("from", filters.from)
  if (filters?.to) searchParams.set("to", filters.to)
  if (typeof filters?.page === "number") searchParams.set("page", String(filters.page))
  if (typeof filters?.pageSize === "number") searchParams.set("pageSize", String(filters.pageSize))

  const response = await fetch(`${getApiUrl()}/admin/audit-platform${searchParams.size ? `?${searchParams.toString()}` : ""}`, {
    headers: authHeaders(sessionToken),
  })

  return parseResponse<AuditLogItem[]>(response)
}
