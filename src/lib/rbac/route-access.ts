import { evaluateEffectiveAccess, type AccessScopePolicy } from "@/lib/rbac/effective-access"
import { DEMO_TENANT_ID, getDemoAccessContext } from "@/lib/rbac/demo-access"

export const ROUTE_ACCESS_POLICY: Record<string, { permission: string; scope: AccessScopePolicy["scope"] }> = {
  "/admin": { permission: "platform.dashboard.*", scope: "ORGANIZATION" },
  "/admin/tenants": { permission: "tenant.view", scope: "ORGANIZATION" },
  "/admin/memberships": { permission: "platform_user.*", scope: "ORGANIZATION" },
  "/admin/subscription": { permission: "subscription.view", scope: "ORGANIZATION" },
  "/admin/billing": { permission: "billing.view", scope: "ORGANIZATION" },
  "/admin/feature-flags": { permission: "feature_flag.*", scope: "ORGANIZATION" },
  "/admin/quota": { permission: "quota.view", scope: "ORGANIZATION" },
  "/admin/audit-platform": { permission: "audit_platform.*", scope: "ORGANIZATION" },
  "/admin/system-health": { permission: "system_health.*", scope: "ORGANIZATION" },
  "/admin/platform-users": { permission: "platform_user.*", scope: "ORGANIZATION" },
  "/admin/platform-roles": { permission: "platform_role.*", scope: "ORGANIZATION" },
  "/admin/global-integrations": { permission: "global_integration.*", scope: "ORGANIZATION" },
  "/admin/system-settings": { permission: "system_setting.*", scope: "ORGANIZATION" },
  "/admin/job-scheduler": { permission: "job_scheduler.*", scope: "ORGANIZATION" },
  "/admin/backup-restore": { permission: "backup_restore.*", scope: "ORGANIZATION" },
  "/dashboard": { permission: "project.view", scope: "ORGANIZATION" },
  "/projects": { permission: "project.view", scope: "ORGANIZATION" },
  "/projects/map": { permission: "project.view", scope: "ORGANIZATION" },
  "/projects/calendar": { permission: "project.view", scope: "ORGANIZATION" },
  "/tasks": { permission: "task.view", scope: "PROJECT" },
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

export const getRouteAccessPolicy = (pathname: string) => {
  const clean = pathname.replace(/\/$/, "") || "/dashboard"
  if (ROUTE_ACCESS_POLICY[clean]) {
    return ROUTE_ACCESS_POLICY[clean]
  }

  const matchKey = Object.keys(ROUTE_ACCESS_POLICY)
    .filter((key) => clean === key || clean.startsWith(`${key}/`))
    .sort((a, b) => b.length - a.length)[0]

  return matchKey ? ROUTE_ACCESS_POLICY[matchKey] : null
}

export const evaluateCurrentRouteAccess = (
  pathname: string,
  user?: { id: string; email: string; role: string; scope?: "platform" | "organization" } | null,
) => {
  const policy = getRouteAccessPolicy(pathname)
  if (!policy) {
    return { allowed: true, reason: "No policy configured." }
  }

  const clean = pathname.replace(/\/$/, "") || "/dashboard"
  const projectId = clean.startsWith("/projects/") ? clean.split("/")[2] : undefined

  const context = getDemoAccessContext(user)
  const result = evaluateEffectiveAccess({
    permission: policy.permission,
    resource: {
      tenantId: DEMO_TENANT_ID,
      projectId,
      scope: policy.scope,
    } as AccessScopePolicy,
    entitlements: context.entitlements,
    platformMembership: context.platformMembership,
    tenantMemberships: context.tenantMemberships,
  })

  return {
    allowed: result.effect === "ALLOW" || result.effect === "INHERITED",
    result,
  }
}
