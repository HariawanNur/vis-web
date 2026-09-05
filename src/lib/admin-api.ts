import { getApiUrl } from "@/lib/runtime-env"
import type { PlatformRoleCode } from "@/lib/rbac/platform-role-schema"
import type { TenantRoleCode, TenantRoleKind } from "@/lib/rbac/tenant-role-schema"

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "invited" | "suspended"
  lastActive: string
}

export interface AdminRole {
  id: string
  name: string
  code: string
  users: number
  description: string
  permissions: string[]
}

export interface AdminDashboardMetric {
  key: string
  title: string
  value: string
  delta: string
  icon: string
  tint: string
}

export interface AdminDashboardActivity {
  text: string
  time: string
  icon: string
  color: string
  bg: string
}

export interface AdminDashboardTenant {
  name: string
  domain: string
  package: string
  status: string
  statusType: "ok" | "warn"
  user: number
  project: number
  joined: string
}

export interface AdminDashboardInvoice {
  invoice: string
  tenant: string
  amount: string
  status: string
  due: string
  pill: "ok" | "warn" | "bad"
}

export interface AdminDashboardData {
  kpis: AdminDashboardMetric[]
  growthData: Array<{ month: string; mrr: number; tenant: number; user: number }>
  packageBreakdown: Array<{ name: string; value: number; percent: number; color: string }>
  activities: AdminDashboardActivity[]
  tenants: AdminDashboardTenant[]
  statuses: Array<{ label: string; value: string; status: string }>
  usageItems: Array<{ label: string; value: number; detail: string; color: string }>
  revenue: {
    value: string
    delta: string
    sparklinePoints: number[]
  }
  topTenants: Array<{ rank: number; name: string; amount: string }>
  alerts: Array<{ icon: string; text: string; tone: string }>
  invoices: AdminDashboardInvoice[]
}

export type AdminTenantPackage = "Enterprise" | "Professional" | "Basic" | "Free"
export type AdminTenantStatus = "active" | "trial" | "suspended"
export type AdminLegalStatus = "verified" | "pending" | "rejected" | "incomplete"

export interface AdminLegalDocument {
  key: string
  name: string
  size: string
  uploadedAt: string
}

export interface AdminTenant {
  id: string
  name: string
  domain: string
  package: AdminTenantPackage
  status: AdminTenantStatus
  users: number
  projects: number
  mrr: string
  joined: string
  npwp: string
  nib: string
  legalStatus: AdminLegalStatus
  legalDocuments: AdminLegalDocument[]
  rejectReason?: string
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
    throw new Error(payload?.message || "Gagal memuat data")
  }
  return payload.data
}

export const fetchAdminUsers = async (): Promise<AdminUser[]> => {
  const response = await fetch(`${getApiUrl()}/admin/users`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminUser[]>(response)
}

export const fetchAdminRoles = async (): Promise<AdminRole[]> => {
  const response = await fetch(`${getApiUrl()}/admin/roles`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminRole[]>(response)
}

export const fetchAdminDashboard = async (): Promise<AdminDashboardData> => {
  const response = await fetch(`${getApiUrl()}/admin/dashboard`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminDashboardData>(response)
}

export const fetchAdminTenants = async (): Promise<AdminTenant[]> => {
  const response = await fetch(`${getApiUrl()}/admin/tenants`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminTenant[]>(response)
}

export interface AdminTenantProvisioningResult {
  plan: AdminTenantPackage
  modules: string[]
  roles: Array<{ code: string; label: string; defaultScope: string; kind: "DEFAULT_ROLE"; isSystemManaged: true }>
  users: Array<{ name: string; email: string; role: string; scope: string }>
}

export const fetchAdminTenantProvisioning = async (id: string): Promise<AdminTenantProvisioningResult> => {
  const response = await fetch(`${getApiUrl()}/admin/tenants/${id}/provisioning`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminTenantProvisioningResult>(response)
}

export interface AdminTenantPayload {
  name: string
  domain: string
  package: AdminTenantPackage
  status: AdminTenantStatus
  npwp: string
  nib: string
}

export const createAdminTenant = async (payload: AdminTenantPayload): Promise<AdminTenant> => {
  const response = await fetch(`${getApiUrl()}/admin/tenants`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminTenant>(response)
}

export const updateAdminTenant = async (id: string, payload: AdminTenantPayload): Promise<AdminTenant> => {
  const response = await fetch(`${getApiUrl()}/admin/tenants/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminTenant>(response)
}

export const deleteAdminTenant = async (id: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}/admin/tenants/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  if (!response.ok) throw new Error("Gagal menghapus tenant")
}

export const updateAdminTenantStatus = async (id: string, status: AdminTenantStatus): Promise<AdminTenant> => {
  const response = await fetch(`${getApiUrl()}/admin/tenants/${id}/status`, {
    method: "PATCH",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
  return parseResponse<AdminTenant>(response)
}

export interface TenantVerificationResult {
  tenant: AdminTenant
  subscription: AdminSubscription | null
  invoice: AdminInvoice | null
  provisioning?: {
    plan: AdminTenantPackage
    modules: string[]
    roles: Array<{ code: string; label: string; defaultScope: string; kind: "DEFAULT_ROLE"; isSystemManaged: true }>
    users: Array<{ name: string; email: string; role: string; scope: string }>
  }
}

export const verifyAdminTenant = async (id: string): Promise<TenantVerificationResult> => {
  const response = await fetch(`${getApiUrl()}/admin/tenants/${id}/verify`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
  })
  return parseResponse<TenantVerificationResult>(response)
}

export type AdminPlanCode = string
export type AdminSubscriptionStatus = "active" | "trial" | "suspended"

export type PlanModule =
  | "rab"
  | "finance"
  | "analytics"
  | "approval"
  | "api"
  | "audit_log"
  | "sso"

export type SupportTier = "basic" | "priority" | "dedicated"

export interface PlanEntitlements {
  projects: number
  users: number
  storageGb: number
  modules: PlanModule[]
  support: SupportTier
}

export type PlanCostKey =
  | "sharedInfra"
  | "compute"
  | "database"
  | "storage"
  | "bandwidth"
  | "backup"
  | "notification"
  | "monitoring"
  | "support"

export interface PlanCostModel {
  sharedInfra: number
  compute: number
  database: number
  storage: number
  bandwidth: number
  backup: number
  notification: number
  monitoring: number
  support: number
  paymentFeeRate: number
  targetMargin: number
}

export type AddonKey = "storage" | "users" | "projects" | "api"

export interface PlanAddon {
  key: AddonKey
  unit: string
  cogs: number
  targetMargin: number
  price: number
}

export interface AdminPlan {
  id: string
  code: AdminPlanCode
  name: string
  price: string
  period: string
  subscribers: number
  description: string
  highlighted?: boolean
  entitlements: PlanEntitlements
  costModel: PlanCostModel
  addons: PlanAddon[]
}

export interface AdminSubscription {
  id: string
  tenant: string
  domain: string
  plan: AdminPlanCode
  status: AdminSubscriptionStatus
  amount: string
  renewal: string
}

export interface AdminSubscriptionData {
  plans: AdminPlan[]
  subscriptions: AdminSubscription[]
}

export const fetchAdminSubscription = async (): Promise<AdminSubscriptionData> => {
  const response = await fetch(`${getApiUrl()}/admin/subscription`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminSubscriptionData>(response)
}

export type AdminPlanPayload = Omit<AdminPlan, "id" | "subscribers">

export const createAdminPlan = async (payload: AdminPlanPayload): Promise<AdminPlan> => {
  const response = await fetch(`${getApiUrl()}/admin/plans`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminPlan>(response)
}

export const updateAdminPlan = async (id: string, payload: AdminPlanPayload): Promise<AdminPlan> => {
  const response = await fetch(`${getApiUrl()}/admin/plans/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminPlan>(response)
}

export const deleteAdminPlan = async (id: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}/admin/plans/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  if (!response.ok) throw new Error("Gagal menghapus paket")
}

export const updateAdminSubscriptionStatus = async (
  id: string,
  status: AdminSubscriptionStatus,
): Promise<AdminSubscription> => {
  const response = await fetch(`${getApiUrl()}/admin/subscriptions/${id}/status`, {
    method: "PATCH",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
  return parseResponse<AdminSubscription>(response)
}

export const deleteAdminSubscription = async (id: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}/admin/subscriptions/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  if (!response.ok) throw new Error("Gagal menghapus langganan")
}

export interface EnterpriseCalcRequest {
  basePrice: number
  modules: string[]
  commercialAdjustment: number
  estimatedCogs: number
}

export interface EnterpriseCalcResponse {
  contractPrice: number
  grossProfit: number
  grossMargin: number
  band: "healthy" | "review" | "low" | "risk"
}

export const calculateEnterprise = async (
  payload: EnterpriseCalcRequest,
): Promise<EnterpriseCalcResponse> => {
  const response = await fetch(`${getApiUrl()}/admin/enterprise/calculate`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<EnterpriseCalcResponse>(response)
}

export type AdminInvoiceStatus = "paid" | "pending" | "overdue"

export interface AdminInvoice {
  id: string
  invoice: string
  tenant: string
  domain: string
  plan: AdminPlanCode
  amount: string
  status: AdminInvoiceStatus
  issued: string
  due: string
  remindedAt?: string
}

export const fetchAdminInvoices = async (): Promise<AdminInvoice[]> => {
  const response = await fetch(`${getApiUrl()}/admin/billing`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminInvoice[]>(response)
}

export const sendInvoiceReminder = async (id: string): Promise<AdminInvoice> => {
  const response = await fetch(`${getApiUrl()}/admin/invoices/${id}/remind`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
  })
  return parseResponse<AdminInvoice>(response)
}

export type AdminFeatureScope = "global" | "beta" | "tenant"

export interface AdminFeatureFlag {
  id: string
  name: string
  key: string
  description: string
  category: string
  scope: AdminFeatureScope
  enabled: boolean
  lastUpdated: string
}

export const fetchAdminFeatureFlags = async (): Promise<AdminFeatureFlag[]> => {
  const response = await fetch(`${getApiUrl()}/admin/feature-flags`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminFeatureFlag[]>(response)
}

export type AdminFeatureFlagPayload = Omit<AdminFeatureFlag, "id" | "lastUpdated">

export const createAdminFeatureFlag = async (
  payload: AdminFeatureFlagPayload,
): Promise<AdminFeatureFlag> => {
  const response = await fetch(`${getApiUrl()}/admin/feature-flags`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminFeatureFlag>(response)
}

export const updateAdminFeatureFlag = async (
  id: string,
  payload: AdminFeatureFlagPayload,
): Promise<AdminFeatureFlag> => {
  const response = await fetch(`${getApiUrl()}/admin/feature-flags/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminFeatureFlag>(response)
}

export const deleteAdminFeatureFlag = async (id: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}/admin/feature-flags/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  if (!response.ok) throw new Error("Gagal menghapus feature flag")
}

export const updateAdminFeatureFlagStatus = async (
  id: string,
  enabled: boolean,
): Promise<AdminFeatureFlag> => {
  const response = await fetch(`${getApiUrl()}/admin/feature-flags/${id}/status`, {
    method: "PATCH",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ enabled }),
  })
  return parseResponse<AdminFeatureFlag>(response)
}

export interface AdminUsageResource {
  label: string
  used: string
  limit: string
  percent: number
  color: string
}

export type AdminQuotaStatus = "healthy" | "warning" | "critical"

export interface AdminQuotaTenant {
  id: string
  tenant: string
  domain: string
  plan: AdminPlanCode
  storageUsed: string
  storageLimit: string
  storagePercent: number
  bandwidth: string
  bandwidthLimit: string
  apiRequests: string
  apiLimit: string
  status: AdminQuotaStatus
}

export interface AdminUsageData {
  resources: AdminUsageResource[]
  tenants: AdminQuotaTenant[]
}

export const fetchAdminUsageQuota = async (): Promise<AdminUsageData> => {
  const response = await fetch(`${getApiUrl()}/admin/quota`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminUsageData>(response)
}

export type AdminAuditCategory = "login" | "tenant" | "user" | "billing" | "settings"
export type AdminAuditStatus = "success" | "failed"

export interface AdminAuditLog {
  id: string
  actor: string
  role: string
  action: string
  detail: string
  category: AdminAuditCategory
  ip: string
  timestamp: string
  status: AdminAuditStatus
}

export const fetchAdminAuditLogs = async (): Promise<AdminAuditLog[]> => {
  const response = await fetch(`${getApiUrl()}/admin/audit-platform`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminAuditLog[]>(response)
}

export const recordAdminAuditLog = async (
  sessionToken: string,
  payload: Omit<AdminAuditLog, "id" | "timestamp">,
): Promise<AdminAuditLog> => {
  const response = await fetch(`${getApiUrl()}/admin/audit-platform`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(sessionToken),
    },
    body: JSON.stringify(payload),
  })

  return parseResponse<AdminAuditLog>(response)
}

export type AdminServiceStatus = "operational" | "degraded" | "down"

export interface AdminService {
  id: string
  name: string
  icon: string
  status: AdminServiceStatus
  uptime: string
  latency: string
  lastChecked: string
}

export const fetchAdminSystemHealth = async (): Promise<AdminService[]> => {
  const response = await fetch(`${getApiUrl()}/admin/system-health`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminService[]>(response)
}

export type AdminPlatformRole = PlatformRoleCode

export type AdminPlatformUserStatus = "active" | "invited" | "suspended"

export interface AdminListQueryParams {
  page?: number
  pageSize?: number
  query?: string
  role?: string
  status?: string
  kind?: string
  scope?: string
}

export interface AdminPaginatedList<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface AdminPlatformUser {
  id: string
  name: string
  email: string
  role: AdminPlatformRole
  status: AdminPlatformUserStatus
  lastActive: string
}

export async function fetchAdminPlatformUsers(): Promise<AdminPlatformUser[]>
export async function fetchAdminPlatformUsers(
  params: AdminListQueryParams,
): Promise<AdminPaginatedList<AdminPlatformUser>>
export async function fetchAdminPlatformUsers(
  params?: AdminListQueryParams,
): Promise<AdminPlatformUser[] | AdminPaginatedList<AdminPlatformUser>> {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set("page", String(params.page))
  if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize))
  if (params?.query) searchParams.set("query", params.query)
  if (params?.role) searchParams.set("role", params.role)
  if (params?.status) searchParams.set("status", params.status)
  if (params?.kind) searchParams.set("kind", params.kind)
  if (params?.scope) searchParams.set("scope", params.scope)

  const response = await fetch(`${getApiUrl()}/admin/platform-users${searchParams.size ? `?${searchParams.toString()}` : ""}`, {
    headers: authHeaders(),
  })
  return params ? parseResponse<AdminPaginatedList<AdminPlatformUser>>(response) : parseResponse<AdminPlatformUser[]>(response)
}

export type AdminPlatformUserPayload = Omit<AdminPlatformUser, "id" | "lastActive">

export const createAdminPlatformUser = async (
  payload: AdminPlatformUserPayload,
): Promise<AdminPlatformUser> => {
  const response = await fetch(`${getApiUrl()}/admin/platform-users`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminPlatformUser>(response)
}

export const updateAdminPlatformUser = async (
  id: string,
  payload: AdminPlatformUserPayload,
): Promise<AdminPlatformUser> => {
  const response = await fetch(`${getApiUrl()}/admin/platform-users/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminPlatformUser>(response)
}

export const deleteAdminPlatformUser = async (id: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}/admin/platform-users/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  if (!response.ok) throw new Error("Gagal menghapus pengguna")
}

export const updateAdminPlatformUserStatus = async (
  id: string,
  status: AdminPlatformUserStatus,
): Promise<AdminPlatformUser> => {
  const response = await fetch(`${getApiUrl()}/admin/platform-users/${id}/status`, {
    method: "PATCH",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
  return parseResponse<AdminPlatformUser>(response)
}

export interface AdminPlatformRoleItem {
  id: string
  code: AdminPlatformRole
  users: number
  description: string
  permissions: string[]
}

export const fetchAdminPlatformRoles = async (): Promise<AdminPlatformRoleItem[]> => {
  const response = await fetch(`${getApiUrl()}/admin/platform-roles`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminPlatformRoleItem[]>(response)
}

export type AdminPlatformRolePayload = Omit<AdminPlatformRoleItem, "id" | "users">

export const createAdminPlatformRole = async (
  payload: AdminPlatformRolePayload,
): Promise<AdminPlatformRoleItem> => {
  const response = await fetch(`${getApiUrl()}/admin/platform-roles`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminPlatformRoleItem>(response)
}

export const updateAdminPlatformRole = async (
  id: string,
  payload: AdminPlatformRolePayload,
): Promise<AdminPlatformRoleItem> => {
  const response = await fetch(`${getApiUrl()}/admin/platform-roles/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminPlatformRoleItem>(response)
}

export const deleteAdminPlatformRole = async (id: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}/admin/platform-roles/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  if (!response.ok) throw new Error("Gagal menghapus role")
}

export type AdminTenantRoleKind = TenantRoleKind

export interface AdminTenantRoleItem {
  id: string
  code: TenantRoleCode | string
  label: string
  description: string
  defaultScope: string
  permissions: string[]
  kind: AdminTenantRoleKind
  sourceRoleCode?: TenantRoleCode
  isSystemManaged: boolean
  assignedUsers: number
}

export const fetchAdminTenantRoles = async (): Promise<AdminTenantRoleItem[]> => {
  const response = await fetch(`${getApiUrl()}/admin/tenant-roles`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminTenantRoleItem[]>(response)
}

export type AdminTenantRolePayload = Omit<AdminTenantRoleItem, "id" | "kind" | "sourceRoleCode" | "isSystemManaged" | "assignedUsers">

export const createAdminTenantRole = async (
  payload: AdminTenantRolePayload & { baseRoleCode: TenantRoleCode },
): Promise<AdminTenantRoleItem> => {
  const response = await fetch(`${getApiUrl()}/admin/tenant-roles`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminTenantRoleItem>(response)
}

export interface AdminTenantMembershipItem {
  id: string
  name: string
  tenant: string
  role: string
  kind: AdminTenantRoleKind
  scope: string
}

export type AdminTenantMembershipPayload = Omit<AdminTenantMembershipItem, "id"> 

export async function fetchAdminTenantMemberships(): Promise<AdminTenantMembershipItem[]>
export async function fetchAdminTenantMemberships(
  params: AdminListQueryParams,
): Promise<AdminPaginatedList<AdminTenantMembershipItem>>
export async function fetchAdminTenantMemberships(
  params?: AdminListQueryParams,
): Promise<AdminTenantMembershipItem[] | AdminPaginatedList<AdminTenantMembershipItem>> {
  const searchParams = new URLSearchParams()
  if (params?.page) searchParams.set("page", String(params.page))
  if (params?.pageSize) searchParams.set("pageSize", String(params.pageSize))
  if (params?.query) searchParams.set("query", params.query)
  if (params?.role) searchParams.set("role", params.role)
  if (params?.status) searchParams.set("status", params.status)
  if (params?.kind) searchParams.set("kind", params.kind)
  if (params?.scope) searchParams.set("scope", params.scope)

  const response = await fetch(`${getApiUrl()}/admin/tenant-memberships${searchParams.size ? `?${searchParams.toString()}` : ""}`, {
    headers: authHeaders(),
  })
  return params ? parseResponse<AdminPaginatedList<AdminTenantMembershipItem>>(response) : parseResponse<AdminTenantMembershipItem[]>(response)
}

export const createAdminTenantMembership = async (
  payload: AdminTenantMembershipPayload,
): Promise<AdminTenantMembershipItem> => {
  const response = await fetch(`${getApiUrl()}/admin/tenant-memberships`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminTenantMembershipItem>(response)
}

export const updateAdminTenantMembership = async (
  id: string,
  payload: AdminTenantMembershipPayload,
): Promise<AdminTenantMembershipItem> => {
  const response = await fetch(`${getApiUrl()}/admin/tenant-memberships/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminTenantMembershipItem>(response)
}

export const deleteAdminTenantMembership = async (id: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}/admin/tenant-memberships/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  if (!response.ok) throw new Error("Gagal menghapus membership")
}

export type AdminIntegrationCategory =
  | "communication"
  | "payment"
  | "storage"
  | "identity"
  | "analytics"
  | "api"

export type AdminIntegrationStatus = "connected" | "disconnected"

export interface AdminIntegration {
  id: string
  name: string
  icon: string
  description: string
  category: AdminIntegrationCategory
  status: AdminIntegrationStatus
  lastSync: string
}

export const fetchAdminIntegrations = async (): Promise<AdminIntegration[]> => {
  const response = await fetch(`${getApiUrl()}/admin/global-integrations`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminIntegration[]>(response)
}

export type AdminIntegrationPayload = Omit<AdminIntegration, "id" | "status" | "lastSync">

export const createAdminIntegration = async (
  payload: AdminIntegrationPayload,
): Promise<AdminIntegration> => {
  const response = await fetch(`${getApiUrl()}/admin/global-integrations`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminIntegration>(response)
}

export const updateAdminIntegration = async (
  id: string,
  payload: AdminIntegrationPayload,
): Promise<AdminIntegration> => {
  const response = await fetch(`${getApiUrl()}/admin/global-integrations/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminIntegration>(response)
}

export const updateAdminIntegrationStatus = async (
  id: string,
  status: AdminIntegrationStatus,
): Promise<AdminIntegration> => {
  const response = await fetch(`${getApiUrl()}/admin/global-integrations/${id}/status`, {
    method: "PATCH",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  })
  return parseResponse<AdminIntegration>(response)
}

export type AdminJobStatus = "success" | "running" | "failed" | "scheduled"

export interface AdminSchedulerJob {
  id: string
  name: string
  icon: string
  schedule: string
  lastRun: string
  nextRun: string
  duration: string
  status: AdminJobStatus
}

export const fetchAdminSchedulerJobs = async (): Promise<AdminSchedulerJob[]> => {
  const response = await fetch(`${getApiUrl()}/admin/job-scheduler`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminSchedulerJob[]>(response)
}

export type AdminSchedulerJobPayload = Omit<
  AdminSchedulerJob,
  "id" | "lastRun" | "nextRun" | "duration" | "status"
>

export const createAdminSchedulerJob = async (
  payload: AdminSchedulerJobPayload,
): Promise<AdminSchedulerJob> => {
  const response = await fetch(`${getApiUrl()}/admin/job-scheduler`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminSchedulerJob>(response)
}

export const updateAdminSchedulerJob = async (
  id: string,
  payload: AdminSchedulerJobPayload,
): Promise<AdminSchedulerJob> => {
  const response = await fetch(`${getApiUrl()}/admin/job-scheduler/${id}`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminSchedulerJob>(response)
}

export const deleteAdminSchedulerJob = async (id: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}/admin/job-scheduler/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  if (!response.ok) throw new Error("Gagal menghapus job")
}

export const runAdminSchedulerJob = async (id: string): Promise<AdminSchedulerJob> => {
  const response = await fetch(`${getApiUrl()}/admin/job-scheduler/${id}/run`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
  })
  return parseResponse<AdminSchedulerJob>(response)
}

export type AdminBackupType = "automatic" | "manual"
export type AdminBackupStatus = "completed" | "inProgress"

export interface AdminBackupRecord {
  id: string
  name: string
  created: string
  size: string
  type: AdminBackupType
  status: AdminBackupStatus
}

export const fetchAdminBackups = async (): Promise<AdminBackupRecord[]> => {
  const response = await fetch(`${getApiUrl()}/admin/backup-restore`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminBackupRecord[]>(response)
}

export const createAdminBackup = async (): Promise<AdminBackupRecord> => {
  const response = await fetch(`${getApiUrl()}/admin/backup-restore`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
  })
  return parseResponse<AdminBackupRecord>(response)
}

export const restoreAdminBackup = async (id: string): Promise<AdminBackupRecord> => {
  const response = await fetch(`${getApiUrl()}/admin/backup-restore/${id}/restore`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
  })
  return parseResponse<AdminBackupRecord>(response)
}

export interface AdminSystemSettings {
  platformName: string
  defaultLanguage: string
  timezone: string
  dateFormat: string
  supportEmail: string
  sessionTimeout: string
  minPasswordLength: string
  mfa: boolean
  sso: boolean
  loginAttempts: string
  smtpHost: string
  smtpPort: string
  senderEmail: string
  newTenantNotif: boolean
  weeklySummary: boolean
  maintenanceAlert: boolean
  webhookUrl: string
  apiRateLimit: string
  dataRetention: string
  auditLog: boolean
}

export const fetchAdminSystemSettings = async (): Promise<AdminSystemSettings> => {
  const response = await fetch(`${getApiUrl()}/admin/system-settings`, {
    headers: authHeaders(),
  })
  return parseResponse<AdminSystemSettings>(response)
}

export const updateAdminSystemSettings = async (
  payload: AdminSystemSettings,
): Promise<AdminSystemSettings> => {
  const response = await fetch(`${getApiUrl()}/admin/system-settings`, {
    method: "PUT",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<AdminSystemSettings>(response)
}
