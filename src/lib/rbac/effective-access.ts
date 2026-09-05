import type { PlatformRoleCode } from "@/lib/rbac/platform-role-schema"
import type { TenantPermissionCode, TenantRoleCode } from "@/lib/rbac/tenant-role-schema"

export type AccessEffect = "DENY" | "ALLOW" | "INHERITED" | "NOT_AVAILABLE"
export type AccessDecisionRank = 0 | 1 | 2 | 3

export type ResourceScope =
  | "ORGANIZATION"
  | "BRANCH"
  | "UNIT"
  | "PROJECT"
  | "ASSIGNED_PROJECT"
  | "TEAM"
  | "OWN"
  | "NONE"

export interface AccessResourceRef {
  tenantId: string
  branchId?: string
  unitId?: string
  projectId?: string
  teamId?: string
  ownerUserId?: string
}

export interface AccessScopePolicy extends AccessResourceRef {
  scope: ResourceScope
}

export interface SubscriptionEntitlement {
  features: string[]
}

export interface AccessRule {
  effect: Exclude<AccessEffect, "NOT_AVAILABLE">
  permission: string
  scope: ResourceScope
  tenantId?: string
  branchId?: string
  unitId?: string
  projectId?: string
  teamId?: string
  ownerUserId?: string
}

export interface AccessPolicy {
  effect: AccessEffect
  permission?: string
  scope?: ResourceScope
  requiresMfa?: boolean
  requiresBreakGlass?: boolean
  tenantId?: string
  branchId?: string
  unitId?: string
  projectId?: string
  teamId?: string
}

export interface PlatformMembership {
  id: string
  userId: string
  tenantId?: never
  roleCode: PlatformRoleCode
  permissions: string[]
  scope: "ORGANIZATION"
  grantedAt: string
  revokedAt?: string | null
}

export interface TenantMembership {
  id: string
  userId: string
  tenantId: string
  roleCode: TenantRoleCode
  scope: ResourceScope
  branchId?: string
  unitId?: string
  projectId?: string
  assignedProjectIds?: string[]
  teamId?: string
  ownerUserId?: string
  grantedAt: string
  revokedAt?: string | null
}

export interface EffectiveAccessInput {
  permission: string
  resource: AccessScopePolicy
  entitlements?: SubscriptionEntitlement | null
  platformMembership?: PlatformMembership | null
  tenantMemberships?: TenantMembership[]
  rules?: AccessRule[]
  policies?: AccessPolicy[]
  mfaVerified?: boolean
  breakGlassActive?: boolean
}

export interface EffectiveAccessResult {
  effect: AccessEffect
  rank: AccessDecisionRank
  reason: string
  source?: "entitlement" | "platform" | "tenant" | "policy"
  membershipId?: string
  roleCode?: string
  permission: string
  scope: ResourceScope
}

const scopeRank: Record<ResourceScope, AccessDecisionRank> = {
  ORGANIZATION: 3,
  BRANCH: 3,
  UNIT: 2,
  PROJECT: 1,
  ASSIGNED_PROJECT: 1,
  TEAM: 1,
  OWN: 0,
  NONE: 0,
}

interface NormalizedRule {
  effect: Exclude<AccessEffect, "NOT_AVAILABLE">
  permission: string
  scope: ResourceScope
  tenantId?: string
  branchId?: string
  unitId?: string
  projectId?: string
  teamId?: string
  ownerUserId?: string
  membershipId?: string
  roleCode?: PlatformRoleCode | TenantRoleCode
  source?: "platform" | "tenant" | "policy"
}

const matchesPattern = (pattern: string, value: string) => {
  if (["*", value].includes(pattern)) return true
  if (pattern.endsWith(".*")) {
    return value === pattern.slice(0, -2) || value.startsWith(pattern.slice(0, -1))
  }
  return false
}

const isFeatureEnabled = (entitlements: SubscriptionEntitlement | null | undefined, permission: string) => {
  if (!entitlements) return true
  return entitlements.features.some((feature) => matchesPattern(feature, permission))
}

const sameHierarchy = (membership: AccessResourceRef, resource: AccessResourceRef) => {
  if (membership.tenantId !== resource.tenantId) return false
  if (membership.branchId && membership.branchId !== resource.branchId) return false
  if (membership.unitId && membership.unitId !== resource.unitId) return false
  if (membership.projectId && membership.projectId !== resource.projectId) return false
  if (membership.teamId && membership.teamId !== resource.teamId) return false
  if (membership.ownerUserId && membership.ownerUserId !== resource.ownerUserId) return false
  return true
}

const resolveRelation = (membership: AccessScopePolicy, resource: AccessScopePolicy) => {
  if (!sameHierarchy(membership, resource)) {
    return "none" as const
  }

  if (membership.scope === resource.scope) {
    if (membership.scope === "ASSIGNED_PROJECT" && membership.projectId && resource.projectId && membership.projectId !== resource.projectId) {
      return "none" as const
    }

    return "exact" as const
  }

  const membershipRank = scopeRank[membership.scope]
  const resourceRank = scopeRank[resource.scope]

  if (membershipRank > resourceRank) {
    return "inherited" as const
  }

  return "none" as const
}

const normalizeRule = (rule: AccessRule | AccessPolicy | PlatformMembership | TenantMembership): NormalizedRule => {
  if ("roleCode" in rule) {
    return {
      effect: "ALLOW" as const,
      permission: "*",
      scope: rule.scope,
      tenantId: "tenantId" in rule ? rule.tenantId : undefined,
      branchId: "branchId" in rule ? rule.branchId : undefined,
      unitId: "unitId" in rule ? rule.unitId : undefined,
      projectId: "projectId" in rule ? rule.projectId : undefined,
      teamId: "teamId" in rule ? rule.teamId : undefined,
      ownerUserId: "ownerUserId" in rule ? rule.ownerUserId : undefined,
      membershipId: rule.id,
      roleCode: rule.roleCode,
    }
  }

  return {
    effect: rule.effect as Exclude<AccessEffect, "NOT_AVAILABLE">,
    permission: rule.permission ?? "*",
    scope: rule.scope ?? "NONE",
    tenantId: rule.tenantId,
    branchId: rule.branchId,
    unitId: rule.unitId,
    projectId: rule.projectId,
    teamId: rule.teamId,
    ownerUserId: undefined,
    membershipId: undefined,
    roleCode: undefined,
  }
}

const ruleMatches = (
  rule: NormalizedRule,
  permission: string,
  resource: AccessScopePolicy,
) => {
  if (!matchesPattern(rule.permission, permission)) return false
  if (rule.scope !== "NONE") {
    const relation = resolveRelation({ ...resource, scope: rule.scope }, resource)
    if (relation === "none") return false
  }

  return sameHierarchy(
    {
      tenantId: rule.tenantId ?? resource.tenantId,
      branchId: rule.branchId,
      unitId: rule.unitId,
      projectId: rule.projectId,
      teamId: rule.teamId,
      ownerUserId: rule.ownerUserId,
    },
    resource,
  )
}

const buildResult = (
  effect: AccessEffect,
  permission: string,
  resource: AccessScopePolicy,
  reason: string,
  source?: "entitlement" | "platform" | "tenant" | "policy",
  membershipId?: string,
  roleCode?: string,
): EffectiveAccessResult => ({
  effect,
  rank: effect === "DENY" ? 3 : effect === "ALLOW" ? 2 : effect === "INHERITED" ? 1 : 0,
  reason,
  source,
  membershipId,
  roleCode,
  permission,
  scope: resource.scope,
})

export const createPlatformMembership = (payload: Omit<PlatformMembership, "scope">): PlatformMembership => ({
  ...payload,
  scope: "ORGANIZATION",
})

export const createTenantMembership = (payload: Omit<TenantMembership, "grantedAt"> & { grantedAt?: string }): TenantMembership => ({
  grantedAt: payload.grantedAt ?? new Date().toISOString(),
  ...payload,
})

export const createBranchMembership = (payload: Omit<TenantMembership, "scope" | "grantedAt"> & { grantedAt?: string }): TenantMembership => ({
  ...createTenantMembership({ ...payload, scope: "BRANCH" }),
  scope: "BRANCH",
})

export const createUnitMembership = (payload: Omit<TenantMembership, "scope" | "grantedAt"> & { grantedAt?: string }): TenantMembership => ({
  ...createTenantMembership({ ...payload, scope: "UNIT" }),
  scope: "UNIT",
})

export const createProjectMembership = (payload: Omit<TenantMembership, "scope" | "grantedAt"> & { grantedAt?: string }): TenantMembership => ({
  ...createTenantMembership({ ...payload, scope: "PROJECT" }),
  scope: "PROJECT",
})

export const evaluateEffectiveAccess = (
  input: EffectiveAccessInput,
): EffectiveAccessResult => {
  if (!isFeatureEnabled(input.entitlements, input.permission)) {
    return buildResult("NOT_AVAILABLE", input.permission, input.resource, "Feature not included in subscription.", "entitlement")
  }

  const policyRules = input.policies ?? []
  for (const policy of policyRules) {
    const normalized = normalizeRule(policy)
    if (normalized.effect === "DENY" && (!normalized.permission || matchesPattern(normalized.permission, input.permission))) {
      if (!policy.requiresMfa || input.mfaVerified) {
        if (!policy.requiresBreakGlass || input.breakGlassActive) {
          if (ruleMatches(normalized, input.permission, input.resource)) {
            return buildResult("DENY", input.permission, input.resource, "Blocked by policy.", "policy")
          }
        }
      }
    }
  }

  const allRules: NormalizedRule[] = []

  if (input.platformMembership) {
    for (const permission of input.platformMembership.permissions) {
      allRules.push({
        ...normalizeRule({
          id: input.platformMembership.id,
          userId: input.platformMembership.userId,
          roleCode: input.platformMembership.roleCode,
          permissions: [permission],
          scope: input.platformMembership.scope,
          grantedAt: input.platformMembership.grantedAt,
          revokedAt: input.platformMembership.revokedAt,
        }),
        permission,
        source: "platform",
        membershipId: input.platformMembership.id,
      })
    }
  }

  for (const membership of input.tenantMemberships ?? []) {
    allRules.push({ ...normalizeRule(membership), source: "tenant", membershipId: membership.id })
  }

  for (const rule of input.rules ?? []) {
    allRules.push({ ...normalizeRule(rule), source: "policy" })
  }

  const matchingRules = allRules.filter((rule) => ruleMatches(rule, input.permission, input.resource))

  const denyRule = matchingRules.find((rule) => rule.effect === "DENY")
  if (denyRule) {
    return buildResult(
      "DENY",
      input.permission,
      input.resource,
      "Explicit deny overrides all other grants.",
      denyRule.source,
      denyRule.membershipId,
      denyRule.roleCode,
    )
  }

  const exactAllow = matchingRules.find((rule) => rule.effect === "ALLOW" && resolveRelation({ ...input.resource, scope: rule.scope }, input.resource) === "exact")
  if (exactAllow) {
    return buildResult(
      "ALLOW",
      input.permission,
      input.resource,
      "Allowed by direct membership.",
      exactAllow.source,
      exactAllow.membershipId,
      exactAllow.roleCode,
    )
  }

  const inheritedAllow = matchingRules.find((rule) => rule.effect === "ALLOW" && resolveRelation({ ...input.resource, scope: rule.scope }, input.resource) === "inherited")
  if (inheritedAllow) {
    return buildResult(
      "INHERITED",
      input.permission,
      input.resource,
      "Allowed by inherited parent scope.",
      inheritedAllow.source,
      inheritedAllow.membershipId,
      inheritedAllow.roleCode,
    )
  }

  return buildResult("NOT_AVAILABLE", input.permission, input.resource, "No matching membership or policy grant.")
}

export const createScopePolicy = (
  scope: ResourceScope,
  resource: AccessResourceRef,
): AccessScopePolicy => ({
  ...resource,
  scope,
})

export const scopePolicyMatchesResource = (
  policy: AccessScopePolicy,
  resource: AccessResourceRef,
) => {
  return sameHierarchy(policy, resource)
}

export const permissionMatches = matchesPattern

export const permissionToDecision = (permission: TenantPermissionCode | string) => permission
