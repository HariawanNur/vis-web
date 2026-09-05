import type { AdminPlatformRole } from "@/lib/admin-api"

const PLATFORM_ROLE_ALLOWED_PATHS: Record<AdminPlatformRole, string[]> = {
  PLATFORM_SUPER_ADMIN: [
    "/admin",
    "/admin/tenants",
    "/admin/memberships",
    "/admin/subscription",
    "/admin/billing",
    "/admin/feature-flags",
    "/admin/quota",
    "/admin/audit-platform",
    "/admin/system-health",
    "/admin/platform-users",
    "/admin/platform-roles",
    "/admin/global-integrations",
    "/admin/system-settings",
    "/admin/job-scheduler",
    "/admin/backup-restore",
  ],
  PLATFORM_OPERATIONS_ADMIN: [
    "/admin",
    "/admin/tenants",
    "/admin/memberships",
    "/admin/subscription",
    "/admin/billing",
    "/admin/feature-flags",
    "/admin/quota",
    "/admin/audit-platform",
    "/admin/system-health",
  ],
  TENANT_ADMIN_OPERATOR: [
    "/admin",
    "/admin/tenants",
  ],
  BILLING_ADMIN: [
    "/admin",
    "/admin/subscription",
    "/admin/billing",
  ],
  PRODUCT_FEATURE_ADMIN: [
    "/admin",
    "/admin/feature-flags",
    "/admin/quota",
  ],
  SUPPORT_ADMIN: [
    "/admin",
    "/admin/tenants",
    "/admin/audit-platform",
    "/admin/system-health",
  ],
  SECURITY_AUDIT_ADMIN: [
    "/admin",
    "/admin/platform-users",
    "/admin/platform-roles",
    "/admin/audit-platform",
  ],
  SYSTEM_DEVOPS_ADMIN: [
    "/admin",
    "/admin/system-health",
    "/admin/job-scheduler",
    "/admin/backup-restore",
    "/admin/global-integrations",
    "/admin/system-settings",
  ],
  PLATFORM_AUDITOR: [
    "/admin",
    "/admin/audit-platform",
  ],
}

const normalizePath = (pathname: string) => {
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/$/, "")
  return clean || "/admin"
}

export const getVisiblePlatformPaths = (role?: string | null) => {
  if (!role || !(role in PLATFORM_ROLE_ALLOWED_PATHS)) {
    return []
  }

  return PLATFORM_ROLE_ALLOWED_PATHS[role as AdminPlatformRole]
}

export const isAllowedPlatformPath = (role: string | undefined | null, pathname: string) => {
  const allowedPaths = getVisiblePlatformPaths(role)
  if (!allowedPaths.length) {
    return false
  }

  const currentPath = normalizePath(pathname)
  return allowedPaths.some((allowedPath) => {
    if (allowedPath === "/admin") {
      return currentPath === "/admin"
    }

    return currentPath === allowedPath || currentPath.startsWith(`${allowedPath}/`)
  })
}

export const getFirstAllowedPlatformPath = (role?: string | null) => {
  return getVisiblePlatformPaths(role)[0] ?? "/admin"
}
