import { PLATFORM_ROLE_SCHEMA, type PlatformRoleCode } from "@/lib/rbac/platform-role-schema"
import { createProjectMembership, createTenantMembership, type PlatformMembership, type SubscriptionEntitlement, type TenantMembership } from "@/lib/rbac/effective-access"

export const DEMO_TENANT_ID = "tenant_konstruksi_nusantara"
export const DEMO_BRANCH_ID = "branch_jakarta"
export const DEMO_UNIT_ID = "unit_operasional"
export const DEMO_PROJECT_GEDUNG_A = "prj_001"
export const DEMO_PROJECT_JEMBATAN_B = "prj_002"

export interface DemoAccessContext {
  entitlements: SubscriptionEntitlement
  platformMembership: PlatformMembership | null
  tenantMemberships: TenantMembership[]
}

export const DEMO_TENANT_STRUCTURE = {
  tenantId: DEMO_TENANT_ID,
  tenantName: "PT Konstruksi Nusantara",
  branches: [
    {
      id: DEMO_BRANCH_ID,
      name: "Branch Jakarta",
      units: [
        {
          id: DEMO_UNIT_ID,
          name: "Unit Operasional",
          projects: [
            { id: DEMO_PROJECT_GEDUNG_A, name: "Gedung A", role: "PROJECT_MANAGER" },
            { id: DEMO_PROJECT_JEMBATAN_B, name: "Jembatan B", role: "VIEWER" },
          ],
        },
      ],
    },
  ],
}

const buildPlatformMembership = (userId: string, roleCode: PlatformRoleCode): PlatformMembership => ({
  id: `platform_${userId}`,
  userId,
  roleCode,
  permissions: PLATFORM_ROLE_SCHEMA[roleCode].permissions,
  scope: "ORGANIZATION",
  grantedAt: "2026-08-24T00:00:00.000Z",
  revokedAt: null,
})

export const getDemoAccessContext = (user?: { id: string; email: string; role: string; scope?: "platform" | "organization" } | null): DemoAccessContext => {
  if (!user) {
    return {
      entitlements: { features: [] },
      platformMembership: null,
      tenantMemberships: [],
    }
  }

  if (user.scope === "platform") {
    const role = user.role as PlatformRoleCode
    return {
      entitlements: { features: PLATFORM_ROLE_SCHEMA[role]?.permissions ?? [] },
      platformMembership: buildPlatformMembership(user.id, role),
      tenantMemberships: [],
    }
  }

  const email = user.email.toLowerCase()
  const roleCode = user.role.toUpperCase().trim()
  const isOwner = ["superadmin@construction.local", "owner@construction.local"].includes(email) || roleCode === "OWNER"
  const isBudi = ["demo@construction.local", "sitemanager@construction.local", "superadmin@construction.local"].includes(email) || roleCode === "SITE_MANAGER"

  const tenantMemberships: TenantMembership[] = isOwner
    ? [
        createTenantMembership({
          id: `tenant_owner_${user.id}`,
          userId: user.id,
          tenantId: DEMO_TENANT_ID,
          roleCode: "TENANT_OWNER",
          scope: "ORGANIZATION",
          grantedAt: "2026-08-24T00:00:00.000Z",
        }),
      ]
    : isBudi
      ? [
          createTenantMembership({
            id: `tenant_site_manager_${user.id}`,
            userId: user.id,
            tenantId: DEMO_TENANT_ID,
            roleCode: "SITE_MANAGER",
            scope: "ORGANIZATION",
            grantedAt: "2026-08-24T00:00:00.000Z",
          }),
          createTenantMembership({
            id: `branch_site_manager_${user.id}`,
            userId: user.id,
            tenantId: DEMO_TENANT_ID,
            roleCode: "SITE_MANAGER",
            scope: "BRANCH",
            branchId: DEMO_BRANCH_ID,
            grantedAt: "2026-08-24T00:00:00.000Z",
          }),
          createTenantMembership({
            id: `unit_project_manager_${user.id}`,
            userId: user.id,
            tenantId: DEMO_TENANT_ID,
            roleCode: "PROJECT_MANAGER",
            scope: "UNIT",
            branchId: DEMO_BRANCH_ID,
            unitId: DEMO_UNIT_ID,
            grantedAt: "2026-08-24T00:00:00.000Z",
          }),
          createProjectMembership({
            id: `project_gedung_a_${user.id}`,
            userId: user.id,
            tenantId: DEMO_TENANT_ID,
            roleCode: "PROJECT_MANAGER",
            branchId: DEMO_BRANCH_ID,
            unitId: DEMO_UNIT_ID,
            projectId: DEMO_PROJECT_GEDUNG_A,
            grantedAt: "2026-08-24T00:00:00.000Z",
          }),
          createProjectMembership({
            id: `project_jembatan_b_${user.id}`,
            userId: user.id,
            tenantId: DEMO_TENANT_ID,
            roleCode: "VIEWER",
            branchId: DEMO_BRANCH_ID,
            unitId: DEMO_UNIT_ID,
            projectId: DEMO_PROJECT_JEMBATAN_B,
            grantedAt: "2026-08-24T00:00:00.000Z",
          }),
        ]
      : []

  return {
    entitlements: {
      features: [
        "project.view",
        "task.view",
        "task.create",
        "task.assign",
        "task.update",
        "progress.view",
        "progress.create",
        "progress.submit",
        "rab.view",
        "document.view",
        "document.upload",
        "material.view",
        "material.request",
        "supervision.view",
        "report.view",
        "finance.view",
        "analytics.view",
        "tenant.setting.view",
        "tenant.setting.manage",
        "audit.view",
      ],
    },
    platformMembership: null,
    tenantMemberships,
  }
}
