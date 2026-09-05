import type { PlanAddon, PlanCostKey, PlanCostModel } from "./admin-api"

export const COST_LINES: Array<{ key: PlanCostKey; labelKey: string }> = [
  { key: "sharedInfra", labelKey: "ue.sharedInfra" },
  { key: "compute", labelKey: "ue.compute" },
  { key: "database", labelKey: "ue.database" },
  { key: "storage", labelKey: "ue.storage" },
  { key: "bandwidth", labelKey: "ue.bandwidth" },
  { key: "backup", labelKey: "ue.backup" },
  { key: "notification", labelKey: "ue.notification" },
  { key: "monitoring", labelKey: "ue.monitoring" },
  { key: "support", labelKey: "ue.support" },
]

export const infraCogs = (model: PlanCostModel): number =>
  COST_LINES.reduce((sum, line) => sum + (model[line.key] ?? 0), 0)

export const recommendedPrice = (model: PlanCostModel): number => {
  const margin = model.targetMargin
  if (margin <= 0 || margin >= 1) return 0
  return Math.round(infraCogs(model) / (1 - margin))
}

export const grossMarginMonthly = (price: number, model: PlanCostModel): number => {
  if (!price) return 0
  const total = infraCogs(model) + price * model.paymentFeeRate
  return (price - total) / price
}

export const grossMarginAnnual = (annualPrice: number, model: PlanCostModel): number => {
  if (!annualPrice) return 0
  const total = infraCogs(model) * 12 + annualPrice * model.paymentFeeRate
  return (annualPrice - total) / annualPrice
}

export const addonRecommendedPrice = (addon: PlanAddon): number => {
  if (addon.targetMargin <= 0 || addon.targetMargin >= 1) return 0
  return Math.round(addon.cogs / (1 - addon.targetMargin))
}

export const addonGrossMargin = (addon: PlanAddon): number => {
  if (!addon.price) return 0
  return (addon.price - addon.cogs) / addon.price
}

export const ENTERPRISE_MODULES: Array<{ key: string; price: number }> = [
  { key: "sso", price: 500000 },
  { key: "audit", price: 300000 },
  { key: "workflow", price: 500000 },
  { key: "premiumSupport", price: 750000 },
  { key: "sla", price: 500000 },
]

export interface EnterpriseContractInput {
  basePrice: number
  modules: string[]
  commercialAdjustment: number
  estimatedCogs: number
}

export const calculateEnterpriseContract = (payload: EnterpriseContractInput) => {
  const modulesTotal = ENTERPRISE_MODULES.reduce(
    (sum, mod) => sum + (payload.modules.includes(mod.key) ? mod.price : 0),
    0,
  )
  const contractPrice = payload.basePrice + modulesTotal + payload.commercialAdjustment
  const grossProfit = contractPrice - payload.estimatedCogs
  const grossMargin = contractPrice ? grossProfit / contractPrice : 0
  return {
    contractPrice,
    grossProfit,
    grossMargin,
    band: gmBand(grossMargin),
  }
}

export type GmBand = "healthy" | "review" | "low" | "risk"

export const gmBand = (margin: number): GmBand =>
  margin >= 0.7
    ? "healthy"
    : margin >= 0.6
      ? "review"
      : margin >= 0.5
        ? "low"
        : "risk"

export const gmBandTone: Record<GmBand, "ok" | "warn" | "bad"> = {
  healthy: "ok",
  review: "warn",
  low: "warn",
  risk: "bad",
}

export const formatRupiah = (value: number): string =>
  `Rp ${Math.round(value).toLocaleString("id-ID")}`

export const formatPercent = (value: number): string =>
  `${(value * 100).toFixed(1)}%`
