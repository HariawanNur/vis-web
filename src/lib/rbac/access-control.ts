import { getFirstAllowedPlatformPath, isAllowedPlatformPath } from "@/lib/rbac/platform-access"
import { hasAccessToRoute } from "@/lib/rbac/tenant-access"
import { PLATFORM_ROLE_CODES } from "@/lib/rbac/platform-role-schema"

export type WorkspaceScope = "platform" | "organization"

export const PLATFORM_WORKSPACE_ROLES = [
  ...PLATFORM_ROLE_CODES,
] as const

export const isPlatformWorkspaceRole = (role?: string | null) => {
  return Boolean(role) && PLATFORM_WORKSPACE_ROLES.includes(role as (typeof PLATFORM_WORKSPACE_ROLES)[number])
}

export const isOrganizationWorkspaceRole = (role?: string | null) => {
  return Boolean(role) && !isPlatformWorkspaceRole(role)
}

export const getWorkspaceHomePath = (user?: { scope?: WorkspaceScope | null; role?: string | null } | null) => {
  if (user?.scope === "platform") {
    return getFirstAllowedPlatformPath(user.role)
  }

  return "/dashboard"
}

export const canAccessWorkspacePath = (
  scope: WorkspaceScope | undefined | null,
  role: string | undefined | null,
  pathname: string,
) => {
  if (scope === "platform") {
    return isPlatformWorkspaceRole(role) && isAllowedPlatformPath(role, pathname)
  }

  if (scope === "organization") {
    return isOrganizationWorkspaceRole(role) && hasAccessToRoute(role ?? "", pathname)
  }

  return false
}
