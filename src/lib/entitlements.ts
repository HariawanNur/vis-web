import type {
  AdminPlan,
  PlanEntitlements,
  PlanModule,
  SupportTier,
} from "./admin-api"

export const PLAN_MODULES: PlanModule[] = [
  "rab",
  "finance",
  "analytics",
  "approval",
  "api",
  "audit_log",
  "sso",
]

export const SUPPORT_TIERS: SupportTier[] = ["basic", "priority", "dedicated"]

export const UNLIMITED = -1

export const isUnlimited = (value: number) => value === UNLIMITED

export const hasModule = (
  entitlements: PlanEntitlements | undefined,
  module: PlanModule,
) => !!entitlements?.modules.includes(module)

export const isModuleEnabled = (plan: AdminPlan | undefined, module: PlanModule) =>
  !!plan && hasModule(plan.entitlements, module)

export const getLimit = (
  entitlements: PlanEntitlements | undefined,
  key: "projects" | "users" | "storageGb",
) => entitlements?.[key] ?? 0

export const isLimitReached = (
  entitlements: PlanEntitlements | undefined,
  key: "projects" | "users" | "storageGb",
  used: number,
) => {
  if (!entitlements) return false
  const limit = entitlements[key]
  return !isUnlimited(limit) && used >= limit
}

export const remaining = (
  entitlements: PlanEntitlements | undefined,
  key: "projects" | "users" | "storageGb",
  used: number,
) => {
  if (!entitlements) return 0
  const limit = entitlements[key]
  if (isUnlimited(limit)) return Number.POSITIVE_INFINITY
  return Math.max(0, limit - used)
}
