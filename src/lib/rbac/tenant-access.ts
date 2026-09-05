import {
  ACCESS_MODULE_SCHEMA,
  ORGANIZATION_ROLE_SCHEMA,
  type OrganizationRoleCode,
} from "./tenant-role-schema"
import {
  evaluateEffectiveAccess,
  type AccessScopePolicy,
  type PlatformMembership,
  type SubscriptionEntitlement,
  type TenantMembership,
} from "./effective-access"

const ROUTE_MODULE_MAP: Record<string, string> = {
  "/dashboard": "dashboard-project",
  "/projects": "dashboard-project",
  "/projects/map": "dashboard-project",
  "/projects/calendar": "dashboard-project",
  "/tasks": "dashboard-project",
  "/progress-report": "dashboard-project",
  "/documents": "dashboard-project",
  "/materials": "dashboard-project",
  "/attendance": "dashboard-project",
  "/approvals": "dashboard-project",
  "/photos": "dashboard-project",
  "/supervision": "dashboard-project",
  "/notifications": "dashboard-project",
  "/referensi": "dashboard-project",
  "/help": "dashboard-project",
  "/finance": "invoice-management",
  "/finance/summary": "invoice-management",
  "/finance/project-budget": "invoice-management",
  "/finance/actual-costs": "invoice-management",
  "/finance/cash-flow": "invoice-management",
  "/finance/payments": "invoice-management",
  "/finance/reports": "invoice-management",
  "/analytics/dashboard": "dashboard-project",
  "/analytics/reports": "dashboard-project",
  "/users": "system-settings",
  "/organization/unit": "system-settings",
  "/organization/billing": "system-settings",
  "/organization/legal": "system-settings",
  "/setting": "system-settings",
  "/setting/profile": "system-settings",
  "/setting/general": "system-settings",
  "/setting/notification": "system-settings",
  "/setting/security": "system-settings",
  "/setting/access": "system-settings",
  "/setting/integration": "system-settings",
  "/setting/storage": "system-settings",
  "/setting/numbering": "system-settings",
  "/setting/email": "system-settings",
  "/setting/audit": "audit-log",
  "/setting/system": "system-settings",
  "/audit-log": "audit-log",
}

const normalizeOrganizationRoleCode = (role: string) => {
  if (role === "OWNER") {
    return "TENANT_OWNER" as OrganizationRoleCode
  }

  return role as OrganizationRoleCode
}

const ROUTE_PERMISSION_MAP: Record<string, { permission: string; scope: AccessScopePolicy["scope"] }> = {
  "/dashboard": { permission: "project.view", scope: "ORGANIZATION" },
  "/projects": { permission: "project.view", scope: "ORGANIZATION" },
  "/projects/map": { permission: "project.view", scope: "ORGANIZATION" },
  "/projects/calendar": { permission: "project.view", scope: "ORGANIZATION" },
  "/tasks": { permission: "task.view", scope: "ORGANIZATION" },
  "/progress-report": { permission: "progress.view", scope: "PROJECT" },
  "/documents": { permission: "document.view", scope: "PROJECT" },
  "/materials": { permission: "material.view", scope: "PROJECT" },
  "/attendance": { permission: "attendance.view", scope: "PROJECT" },
  "/approvals": { permission: "approval.view", scope: "ORGANIZATION" },
  "/photos": { permission: "document.view", scope: "PROJECT" },
  "/supervision": { permission: "supervision.view", scope: "PROJECT" },
  "/notifications": { permission: "project.view", scope: "ORGANIZATION" },
  "/referensi": { permission: "tenant.setting.view", scope: "ORGANIZATION" },
  "/help": { permission: "tenant.setting.view", scope: "ORGANIZATION" },
  "/finance": { permission: "finance.view", scope: "ORGANIZATION" },
  "/finance/summary": { permission: "finance.view", scope: "ORGANIZATION" },
  "/finance/project-budget": { permission: "rab.view", scope: "PROJECT" },
  "/finance/actual-costs": { permission: "finance.view", scope: "PROJECT" },
  "/finance/cash-flow": { permission: "finance.view", scope: "ORGANIZATION" },
  "/finance/payments": { permission: "finance.payment.create", scope: "ORGANIZATION" },
  "/finance/reports": { permission: "report.view", scope: "ORGANIZATION" },
  "/analytics/dashboard": { permission: "analytics.view", scope: "ORGANIZATION" },
  "/analytics/reports": { permission: "report.view", scope: "ORGANIZATION" },
  "/users": { permission: "user.view", scope: "ORGANIZATION" },
  "/organization/unit": { permission: "tenant.setting.view", scope: "ORGANIZATION" },
  "/organization/billing": { permission: "finance.view", scope: "ORGANIZATION" },
  "/organization/legal": { permission: "tenant.setting.view", scope: "ORGANIZATION" },
  "/setting": { permission: "tenant.setting.view", scope: "ORGANIZATION" },
  "/setting/profile": { permission: "tenant.setting.view", scope: "ORGANIZATION" },
  "/setting/general": { permission: "tenant.setting.view", scope: "ORGANIZATION" },
  "/setting/notification": { permission: "tenant.setting.view", scope: "ORGANIZATION" },
  "/setting/security": { permission: "tenant.setting.view", scope: "ORGANIZATION" },
  "/setting/access": { permission: "role.view", scope: "ORGANIZATION" },
  "/setting/integration": { permission: "tenant.setting.manage", scope: "ORGANIZATION" },
  "/setting/storage": { permission: "tenant.setting.view", scope: "ORGANIZATION" },
  "/setting/numbering": { permission: "tenant.setting.manage", scope: "ORGANIZATION" },
  "/setting/email": { permission: "tenant.setting.manage", scope: "ORGANIZATION" },
  "/setting/audit": { permission: "audit.view", scope: "ORGANIZATION" },
  "/setting/system": { permission: "tenant.setting.manage", scope: "ORGANIZATION" },
  "/audit-log": { permission: "audit.view", scope: "ORGANIZATION" },
}

export function getModuleKeyForRoute(pathname: string): string | null {
  const clean = pathname.replace(/\/$/, "") || "/dashboard"
  return ROUTE_MODULE_MAP[clean] ?? null
}

export function hasAccessToRoute(role: string, pathname: string): boolean {
  const normalizedRole = normalizeOrganizationRoleCode(role)
  const moduleKey = getModuleKeyForRoute(pathname)
  if (!moduleKey) return true

  const mod = ACCESS_MODULE_SCHEMA.find((m) => m.key === moduleKey)
  if (!mod) return true

  return mod.roleCodes.includes(normalizedRole)
}

export function getVisibleMenuKeys(role: string): string[] {
  const schema = ORGANIZATION_ROLE_SCHEMA[normalizeOrganizationRoleCode(role)]
  return schema?.visibleMenus ?? []
}

export function canAccessModule(role: string, moduleKey: string): boolean {
  const normalizedRole = normalizeOrganizationRoleCode(role)
  const mod = ACCESS_MODULE_SCHEMA.find((m) => m.key === moduleKey)
  if (!mod) return true
  return mod.roleCodes.includes(normalizedRole)
}

export function getRouteAccessPolicy(pathname: string) {
  const clean = pathname.replace(/\/$/, "") || "/dashboard"
  return ROUTE_PERMISSION_MAP[clean] ?? null
}

export function evaluateRouteAccess(input: {
  pathname: string
  tenantId: string
  projectId?: string
  branchId?: string
  unitId?: string
  permissions?: SubscriptionEntitlement | null
  platformMembership?: PlatformMembership | null
  tenantMemberships?: TenantMembership[]
}) {
  const policy = getRouteAccessPolicy(input.pathname)
  if (!policy) {
    return { allowed: true, reason: "No route policy configured." }
  }

  const resource: AccessScopePolicy = {
    tenantId: input.tenantId,
    branchId: input.branchId,
    unitId: input.unitId,
    projectId: input.projectId,
    scope: policy.scope,
  }

  const result = evaluateEffectiveAccess({
    permission: policy.permission,
    resource,
    entitlements: input.permissions,
    platformMembership: input.platformMembership,
    tenantMemberships: input.tenantMemberships,
  })

  return {
    allowed: result.effect === "ALLOW" || result.effect === "INHERITED",
    result,
  }
}
