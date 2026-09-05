import type { AdminTenantPackage } from "@/lib/admin-api"
import { PLAN_MODULE_CATALOG, type TenantModuleCode } from "@/lib/rbac/tenant-module-catalog"
import { TENANT_ROLE_SCHEMA, type TenantRoleCode } from "@/lib/rbac/tenant-role-schema"

export interface TenantProvisioningRoleSeed {
  code: TenantRoleCode
  label: string
  defaultScope: string
  kind: "DEFAULT_ROLE"
  isSystemManaged: true
}

export interface TenantProvisioningUserSeed {
  name: string
  email: string
  role: TenantRoleCode
  scope: string
}

export interface TenantProvisioningResult {
  plan: AdminTenantPackage
  modules: TenantModuleCode[]
  roles: TenantProvisioningRoleSeed[]
  users: TenantProvisioningUserSeed[]
}

const baseRoleSeeds: TenantRoleCode[] = ["TENANT_OWNER", "PROJECT_MANAGER", "VIEWER"]

const moduleRoleSeedMap: Partial<Record<TenantModuleCode, TenantRoleCode[]>> = {
  rab: ["QS_ESTIMATOR"],
  finance: ["FINANCE_MANAGER", "FINANCE_STAFF"],
  analytics: ["PROJECT_DIRECTOR"],
  approval: ["SUPERVISOR", "DOCUMENT_CONTROLLER"],
  api: ["TENANT_ADMINISTRATOR"],
  audit_log: ["TENANT_ADMINISTRATOR"],
  sso: ["TENANT_ADMINISTRATOR"],
}

const moduleDefaultUsers: Partial<Record<TenantModuleCode, TenantProvisioningUserSeed[]>> = {
  finance: [
    { name: "Finance Manager", email: "finance@tenant.local", role: "FINANCE_MANAGER", scope: "ORGANIZATION" },
    { name: "Finance Staff", email: "accounts@tenant.local", role: "FINANCE_STAFF", scope: "ORGANIZATION" },
  ],
  rab: [{ name: "QS Estimator", email: "qs@tenant.local", role: "QS_ESTIMATOR", scope: "ORGANIZATION" }],
  analytics: [{ name: "Project Director", email: "director@tenant.local", role: "PROJECT_DIRECTOR", scope: "ORGANIZATION" }],
  approval: [
    { name: "Supervisor", email: "supervisor@tenant.local", role: "SUPERVISOR", scope: "ASSIGNED_PROJECT" },
    { name: "Document Controller", email: "doccontrol@tenant.local", role: "DOCUMENT_CONTROLLER", scope: "PROJECT" },
  ],
}

const planModuleMap: Record<AdminTenantPackage, TenantModuleCode[]> = {
  Free: ["dashboard-project"],
  Basic: ["dashboard-project", "rab"],
  Professional: ["dashboard-project", "rab", "finance", "analytics", "approval"],
  Enterprise: ["dashboard-project", "rab", "finance", "analytics", "approval", "api", "audit-log", "system-settings", "sso", "invoice-management"],
}

const uniqueRoleCodes = (roles: TenantRoleCode[]) => Array.from(new Set(roles))

export const getPlanModules = (plan: AdminTenantPackage): TenantModuleCode[] => {
  return planModuleMap[plan] ?? []
}

export const buildTenantProvisioning = (
  tenantName: string,
  domain: string,
  plan: AdminTenantPackage,
): TenantProvisioningResult => {
  const modules = getPlanModules(plan)
  const roleCodes = uniqueRoleCodes([
    ...baseRoleSeeds,
    ...modules.flatMap((module) => moduleRoleSeedMap[module] ?? []),
  ])

  const roles = roleCodes.map((code) => ({
    code,
    label: TENANT_ROLE_SCHEMA[code].label,
    defaultScope: TENANT_ROLE_SCHEMA[code].defaultScope,
    kind: "DEFAULT_ROLE" as const,
    isSystemManaged: true as const,
  }))

  const users: TenantProvisioningUserSeed[] = [
    { name: `Owner`, email: `owner@${domain}`, role: "TENANT_OWNER", scope: "ORGANIZATION" },
    { name: `Admin`, email: `admin@${domain}`, role: "PROJECT_MANAGER", scope: "PROJECT" },
    { name: `Viewer`, email: `viewer@${domain}`, role: "VIEWER", scope: "OWN" },
    ...modules.flatMap((module) => moduleDefaultUsers[module] ?? []),
  ]

  return { plan, modules, roles, users: Array.from(new Map(users.map((user) => [user.email, user])).values()) }
}

export const listProvisionableModules = () => PLAN_MODULE_CATALOG.map((item) => item.code)
