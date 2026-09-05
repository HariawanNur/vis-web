import { PLAN_MODULES } from "@/lib/entitlements"

export type TenantModuleCode =
  | "dashboard-project"
  | "invoice-management"
  | "system-settings"
  | "audit-log"
  | (typeof PLAN_MODULES)[number]

export interface TenantModuleCatalogItem {
  code: TenantModuleCode
  label: string
  description: string
  category: "core" | "finance" | "governance" | "platform"
  assignableToPlan: boolean
  assignableToTenant: boolean
}

export const TENANT_MODULE_CATALOG: TenantModuleCatalogItem[] = [
  {
    code: "dashboard-project",
    label: "Dashboard Proyek",
    description: "Ringkasan proyek, tugas, progres, dan aktivitas lapangan.",
    category: "core",
    assignableToPlan: false,
    assignableToTenant: true,
  },
  {
    code: "invoice-management",
    label: "Pengelolaan Invoice",
    description: "Kelola invoice, billing, dan approval pembayaran.",
    category: "finance",
    assignableToPlan: false,
    assignableToTenant: true,
  },
  {
    code: "system-settings",
    label: "Pengaturan Sistem",
    description: "Konfigurasi tenant, pengguna, workflow, dan akses.",
    category: "governance",
    assignableToPlan: false,
    assignableToTenant: true,
  },
  {
    code: "audit-log",
    label: "Audit & Log",
    description: "Riwayat aktivitas, keamanan, dan kepatuhan.",
    category: "governance",
    assignableToPlan: false,
    assignableToTenant: true,
  },
  {
    code: "rab",
    label: "RAB",
    description: "Estimasi biaya, anggaran, dan monitoring RAB.",
    category: "finance",
    assignableToPlan: true,
    assignableToTenant: true,
  },
  {
    code: "finance",
    label: "Finance",
    description: "Arus kas, invoice, pembayaran, dan laporan keuangan.",
    category: "finance",
    assignableToPlan: true,
    assignableToTenant: true,
  },
  {
    code: "analytics",
    label: "Analytics",
    description: "Dashboard metrik, tren, dan laporan analitik.",
    category: "core",
    assignableToPlan: true,
    assignableToTenant: true,
  },
  {
    code: "approval",
    label: "Approval",
    description: "Alur persetujuan dokumen dan proses bisnis.",
    category: "governance",
    assignableToPlan: true,
    assignableToTenant: true,
  },
  {
    code: "api",
    label: "API",
    description: "Akses integrasi dan endpoint untuk aplikasi eksternal.",
    category: "platform",
    assignableToPlan: true,
    assignableToTenant: true,
  },
  {
    code: "sso",
    label: "SSO",
    description: "Single sign-on dan provisioning identitas.",
    category: "platform",
    assignableToPlan: true,
    assignableToTenant: true,
  },
]

export const PLAN_MODULE_CATALOG = TENANT_MODULE_CATALOG.filter((item) => item.assignableToPlan)

export const TENANT_ASSIGNABLE_MODULES = TENANT_MODULE_CATALOG.filter((item) => item.assignableToTenant)

export const getTenantModuleCatalogItem = (code: string) =>
  TENANT_MODULE_CATALOG.find((item) => item.code === code) ?? null
