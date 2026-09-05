export type PlatformRoleCode =
  | "PLATFORM_SUPER_ADMIN"
  | "PLATFORM_OPERATIONS_ADMIN"
  | "TENANT_ADMIN_OPERATOR"
  | "BILLING_ADMIN"
  | "PRODUCT_FEATURE_ADMIN"
  | "SUPPORT_ADMIN"
  | "SECURITY_AUDIT_ADMIN"
  | "SYSTEM_DEVOPS_ADMIN"
  | "PLATFORM_AUDITOR"

export type PlatformPermissionDomain =
  | "platform.dashboard.*"
  | "tenant.*"
  | "tenant.create"
  | "tenant.view"
  | "tenant.update"
  | "tenant.activate"
  | "tenant.suspend"
  | "tenant.delete"
  | "tenant.provision"
  | "subscription.*"
  | "subscription.view"
  | "plan.*"
  | "billing.*"
  | "billing.view"
  | "invoice.*"
  | "invoice.view"
  | "feature_flag.*"
  | "entitlement.*"
  | "usage.*"
  | "usage.view"
  | "quota.*"
  | "quota.view"
  | "platform_user.*"
  | "platform_role.*"
  | "audit_platform.*"
  | "system_health.*"
  | "job_scheduler.*"
  | "backup_restore.*"
  | "global_integration.*"
  | "system_setting.*"

export interface PlatformRoleSchema {
  code: PlatformRoleCode
  label: string
  description: string
  permissions: PlatformPermissionDomain[]
  visibleMenus: string[]
}

export const PLATFORM_PERMISSION_DOMAINS: PlatformPermissionDomain[] = [
  "platform.dashboard.*",
  "tenant.*",
  "tenant.create",
  "tenant.view",
  "tenant.update",
  "tenant.activate",
  "tenant.suspend",
  "tenant.delete",
  "tenant.provision",
  "subscription.*",
  "subscription.view",
  "plan.*",
  "billing.*",
  "billing.view",
  "invoice.*",
  "invoice.view",
  "feature_flag.*",
  "entitlement.*",
  "usage.*",
  "usage.view",
  "quota.*",
  "quota.view",
  "platform_user.*",
  "platform_role.*",
  "audit_platform.*",
  "system_health.*",
  "job_scheduler.*",
  "backup_restore.*",
  "global_integration.*",
  "system_setting.*",
]

export const PLATFORM_ROLE_CODES: PlatformRoleCode[] = [
  "PLATFORM_SUPER_ADMIN",
  "PLATFORM_OPERATIONS_ADMIN",
  "TENANT_ADMIN_OPERATOR",
  "BILLING_ADMIN",
  "PRODUCT_FEATURE_ADMIN",
  "SUPPORT_ADMIN",
  "SECURITY_AUDIT_ADMIN",
  "SYSTEM_DEVOPS_ADMIN",
  "PLATFORM_AUDITOR",
]

export const PLATFORM_ROLE_SCHEMA: Record<PlatformRoleCode, PlatformRoleSchema> = {
  PLATFORM_SUPER_ADMIN: {
    code: "PLATFORM_SUPER_ADMIN",
    label: "Platform Super Admin",
    description: "Full control over the SiDiKsi SaaS platform.",
    permissions: [
      "platform.dashboard.*",
      "tenant.*",
      "subscription.*",
      "plan.*",
      "billing.*",
      "invoice.*",
      "feature_flag.*",
      "entitlement.*",
      "usage.*",
      "quota.*",
      "platform_user.*",
      "platform_role.*",
      "audit_platform.*",
      "system_health.*",
      "job_scheduler.*",
      "backup_restore.*",
      "global_integration.*",
      "system_setting.*",
    ],
    visibleMenus: ["Dashboard Platform", "Tenant / Perusahaan", "Paket & Subscription", "Billing & Invoice", "Feature Flags", "Usage & Quota", "Audit Platform", "System Health", "Scheduler", "Backup & Restore", "Platform User", "Platform Role", "Integrations", "Settings"],
  },
  PLATFORM_OPERATIONS_ADMIN: {
    code: "PLATFORM_OPERATIONS_ADMIN",
    label: "Platform Operations Admin",
    description: "Operates tenant lifecycle and platform health.",
    permissions: ["platform.dashboard.*", "tenant.*", "usage.*", "quota.*", "subscription.*", "system_health.*", "audit_platform.*"],
    visibleMenus: ["Dashboard Platform", "Tenant / Perusahaan", "Paket & Subscription", "Usage & Quota", "Audit Platform", "System Health"],
  },
  TENANT_ADMIN_OPERATOR: {
    code: "TENANT_ADMIN_OPERATOR",
    label: "Tenant Admin Operator",
    description: "Manages tenant onboarding and lifecycle tasks.",
    permissions: ["platform.dashboard.*", "tenant.create", "tenant.view", "tenant.update", "tenant.activate", "tenant.suspend", "usage.*", "quota.*"],
    visibleMenus: ["Dashboard Platform", "Tenant / Perusahaan", "Usage & Quota"],
  },
  BILLING_ADMIN: {
    code: "BILLING_ADMIN",
    label: "Billing Admin",
    description: "Owns subscriptions, billing, invoice, and payment operations.",
    permissions: ["platform.dashboard.*", "subscription.*", "plan.*", "billing.*", "invoice.*"],
    visibleMenus: ["Dashboard Platform", "Paket & Subscription", "Billing & Invoice"],
  },
  PRODUCT_FEATURE_ADMIN: {
    code: "PRODUCT_FEATURE_ADMIN",
    label: "Product / Feature Admin",
    description: "Owns feature flags and entitlement management.",
    permissions: ["platform.dashboard.*", "feature_flag.*", "entitlement.*", "usage.*", "quota.*"],
    visibleMenus: ["Dashboard Platform", "Feature Flags", "Usage & Quota"],
  },
  SUPPORT_ADMIN: {
    code: "SUPPORT_ADMIN",
    label: "Support Admin",
    description: "Limited tenant support with audit-safe access.",
    permissions: ["platform.dashboard.*", "tenant.view", "usage.*", "quota.*", "system_health.*", "audit_platform.*"],
    visibleMenus: ["Dashboard Platform", "Tenant / Perusahaan", "Usage & Quota", "Audit Platform", "System Health"],
  },
  SECURITY_AUDIT_ADMIN: {
    code: "SECURITY_AUDIT_ADMIN",
    label: "Security & Audit Admin",
    description: "Handles platform security, review, and audit access.",
    permissions: ["platform.dashboard.*", "platform_user.*", "platform_role.*", "audit_platform.*"],
    visibleMenus: ["Dashboard Platform", "Platform User", "Platform Role", "Audit Platform"],
  },
  SYSTEM_DEVOPS_ADMIN: {
    code: "SYSTEM_DEVOPS_ADMIN",
    label: "System / DevOps Admin",
    description: "Maintains platform infrastructure and automation.",
    permissions: ["platform.dashboard.*", "system_health.*", "job_scheduler.*", "backup_restore.*", "global_integration.*", "system_setting.*"],
    visibleMenus: ["Dashboard Platform", "System Health", "Scheduler", "Backup & Restore", "Integrations", "Settings"],
  },
  PLATFORM_AUDITOR: {
    code: "PLATFORM_AUDITOR",
    label: "Platform Auditor",
    description: "Read-only oversight across administrative data.",
    permissions: ["platform.dashboard.*", "tenant.view", "subscription.view", "billing.view", "usage.view", "quota.view", "audit_platform.*"],
    visibleMenus: ["Dashboard Platform", "Tenant / Perusahaan", "Paket & Subscription", "Billing & Invoice", "Usage & Quota", "Audit Platform"],
  },
}

export const getPlatformRoleSchema = (code: string) =>
  PLATFORM_ROLE_SCHEMA[code as PlatformRoleCode] ?? null
