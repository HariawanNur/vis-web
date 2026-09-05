export type TenantRoleCode =
  | "TENANT_OWNER"
  | "TENANT_ADMINISTRATOR"
  | "PROJECT_DIRECTOR"
  | "PROJECT_MANAGER"
  | "SITE_MANAGER"
  | "SITE_ENGINEER"
  | "SUPERVISOR"
  | "QUALITY_CONTROL"
  | "HSE_OFFICER"
  | "QS_ESTIMATOR"
  | "FINANCE_MANAGER"
  | "FINANCE_STAFF"
  | "INVENTORY_OFFICER"
  | "DOCUMENT_CONTROLLER"
  | "MANDOR"
  | "VIEWER"

export type TenantRoleKind = "DEFAULT_ROLE" | "CUSTOM_ROLE"

export type TenantPermissionCode =
  | "tenant.setting.view"
  | "tenant.setting.manage"
  | "user.view"
  | "user.manage"
  | "role.view"
  | "role.manage"
  | "workflow.view"
  | "workflow.manage"
  | "project.view"
  | "project.create"
  | "project.update"
  | "project.archive"
  | "task.view"
  | "task.create"
  | "task.assign"
  | "task.update"
  | "progress.view"
  | "progress.create"
  | "progress.submit"
  | "progress.verify"
  | "progress.approve"
  | "rab.view"
  | "rab.create"
  | "rab.update"
  | "rab.approve"
  | "material.view"
  | "material.request"
  | "material.receive"
  | "material.issue"
  | "material.approve"
  | "document.view"
  | "document.upload"
  | "document.revise"
  | "document.review"
  | "document.approve"
  | "approval.view"
  | "approval.action"
  | "attendance.view"
  | "attendance.create"
  | "attendance.manage"
  | "finance.view"
  | "finance.invoice.create"
  | "finance.payment.create"
  | "finance.payment.approve"
  | "supervision.view"
  | "supervision.create"
  | "supervision.resolve"
  | "inventory.view"
  | "inventory.manage"
  | "audit.view"
  | "analytics.view"
  | "report.view"

export interface TenantRoleSchema {
  code: TenantRoleCode
  label: string
  description: string
  defaultScope: "ORGANIZATION" | "BRANCH" | "UNIT" | "PROJECT" | "ASSIGNED_PROJECT" | "TEAM" | "OWN"
  permissions: TenantPermissionCode[]
}

export interface TenantRoleInstance extends Omit<TenantRoleSchema, "code"> {
  code: string
  kind: TenantRoleKind
  sourceRoleCode?: TenantRoleCode
  isSystemManaged: boolean
}

export const TENANT_ROLE_SCHEMA: Record<TenantRoleCode, TenantRoleSchema> = {
  TENANT_OWNER: {
    code: "TENANT_OWNER",
    label: "Tenant Owner",
    description: "Pemilik administratif tenant dengan kontrol penuh pada organisasi.",
    defaultScope: "ORGANIZATION",
    permissions: [
      "tenant.setting.view",
      "tenant.setting.manage",
      "user.view",
      "user.manage",
      "role.view",
      "role.manage",
      "workflow.view",
      "workflow.manage",
      "project.view",
      "project.create",
      "project.update",
      "project.archive",
      "task.view",
      "task.create",
      "task.assign",
      "task.update",
      "progress.view",
      "progress.create",
      "progress.submit",
      "progress.verify",
      "progress.approve",
      "rab.view",
      "rab.create",
      "rab.update",
      "rab.approve",
      "material.view",
      "material.request",
      "material.receive",
      "material.issue",
      "material.approve",
      "document.view",
      "document.upload",
      "document.revise",
      "document.review",
      "document.approve",
      "approval.view",
      "approval.action",
      "attendance.view",
      "attendance.create",
      "attendance.manage",
      "finance.view",
      "finance.invoice.create",
      "finance.payment.create",
      "finance.payment.approve",
      "supervision.view",
      "supervision.create",
      "supervision.resolve",
      "inventory.view",
      "inventory.manage",
      "audit.view",
      "analytics.view",
      "report.view",
    ],
  },
  TENANT_ADMINISTRATOR: {
    code: "TENANT_ADMINISTRATOR",
    label: "Tenant Administrator",
    description: "Mengelola pengguna, role, workflow, dan pengaturan tenant.",
    defaultScope: "ORGANIZATION",
    permissions: ["tenant.setting.view", "tenant.setting.manage", "user.view", "user.manage", "role.view", "role.manage", "workflow.view", "workflow.manage", "audit.view"],
  },
  PROJECT_DIRECTOR: {
    code: "PROJECT_DIRECTOR",
    label: "Project Director",
    description: "Kontrol portofolio dan ringkasan seluruh proyek assigned.",
    defaultScope: "ORGANIZATION",
    permissions: ["project.view", "progress.view", "rab.view", "finance.view", "approval.view", "approval.action", "analytics.view", "report.view"],
  },
  PROJECT_MANAGER: {
    code: "PROJECT_MANAGER",
    label: "Project Manager",
    description: "Mengelola proyek, task, progress, RAB, dokumen, dan tim.",
    defaultScope: "PROJECT",
    permissions: ["project.view", "project.update", "task.view", "task.create", "task.assign", "task.update", "progress.view", "progress.create", "progress.submit", "rab.view", "rab.create", "rab.update", "document.view", "document.upload", "document.review", "approval.view", "approval.action", "supervision.view", "report.view"],
  },
  SITE_MANAGER: {
    code: "SITE_MANAGER",
    label: "Site Manager",
    description: "Kontrol operasional lapangan pada proyek dan unit kerja.",
    defaultScope: "PROJECT",
    permissions: ["project.view", "task.view", "task.update", "progress.view", "progress.create", "progress.submit", "material.view", "material.request", "document.view", "document.upload", "supervision.view", "report.view"],
  },
  SITE_ENGINEER: {
    code: "SITE_ENGINEER",
    label: "Site Engineer",
    description: "Pencatatan progres dan dokumentasi teknis lapangan.",
    defaultScope: "ASSIGNED_PROJECT",
    permissions: ["project.view", "task.view", "task.update", "progress.view", "progress.create", "progress.submit", "document.view", "document.upload", "material.view", "material.request"],
  },
  SUPERVISOR: {
    code: "SUPERVISOR",
    label: "Supervisor",
    description: "Verifikasi progres, dokumentasi, dan inspeksi lapangan.",
    defaultScope: "ASSIGNED_PROJECT",
    permissions: ["project.view", "task.view", "progress.view", "progress.verify", "document.view", "document.review", "supervision.view", "supervision.create", "supervision.resolve", "attendance.view"],
  },
  QUALITY_CONTROL: {
    code: "QUALITY_CONTROL",
    label: "Quality Control",
    description: "Inspeksi mutu, NCR, acceptance material, dan review dokumen.",
    defaultScope: "ASSIGNED_PROJECT",
    permissions: ["project.view", "progress.view", "document.view", "document.review", "material.view", "material.receive", "supervision.view", "supervision.resolve", "report.view"],
  },
  HSE_OFFICER: {
    code: "HSE_OFFICER",
    label: "HSE Officer",
    description: "Keselamatan kerja, inspeksi HSE, dan checklist lapangan.",
    defaultScope: "ASSIGNED_PROJECT",
    permissions: ["project.view", "document.view", "document.upload", "supervision.view", "supervision.create", "supervision.resolve", "attendance.view", "report.view"],
  },
  QS_ESTIMATOR: {
    code: "QS_ESTIMATOR",
    label: "QS / Estimator",
    description: "RAB, BOQ, budget, dan monitoring quantity.",
    defaultScope: "ORGANIZATION",
    permissions: ["project.view", "rab.view", "rab.create", "rab.update", "progress.view", "finance.view", "report.view", "analytics.view"],
  },
  FINANCE_MANAGER: {
    code: "FINANCE_MANAGER",
    label: "Finance Manager",
    description: "Otorisasi dan kontrol keuangan tenant atau proyek.",
    defaultScope: "ORGANIZATION",
    permissions: ["finance.view", "finance.invoice.create", "finance.payment.create", "finance.payment.approve", "rab.view", "report.view", "analytics.view"],
  },
  FINANCE_STAFF: {
    code: "FINANCE_STAFF",
    label: "Finance Staff",
    description: "Operasional invoice, payment request, dan actual cost.",
    defaultScope: "ORGANIZATION",
    permissions: ["finance.view", "finance.invoice.create", "finance.payment.create", "report.view"],
  },
  INVENTORY_OFFICER: {
    code: "INVENTORY_OFFICER",
    label: "Inventory Officer",
    description: "Stok, warehouse, issue, dan receipt material.",
    defaultScope: "PROJECT",
    permissions: ["inventory.view", "inventory.manage", "material.view", "material.receive", "material.issue", "material.request", "project.view"],
  },
  DOCUMENT_CONTROLLER: {
    code: "DOCUMENT_CONTROLLER",
    label: "Document Controller",
    description: "Kontrol revisi, distribusi, dan approval dokumen.",
    defaultScope: "PROJECT",
    permissions: ["document.view", "document.upload", "document.revise", "document.review", "document.approve", "approval.view", "approval.action"],
  },
  MANDOR: {
    code: "MANDOR",
    label: "Mandor",
    description: "Pengisian progres harian dan pemantauan kerja lapangan.",
    defaultScope: "ASSIGNED_PROJECT",
    permissions: ["project.view", "task.view", "task.update", "progress.view", "progress.create", "attendance.view", "document.upload"],
  },
  VIEWER: {
    code: "VIEWER",
    label: "Viewer",
    description: "Akses baca pada proyek yang ditugaskan.",
    defaultScope: "ASSIGNED_PROJECT",
    permissions: ["project.view", "progress.view", "document.view", "report.view"],
  },
}

export const TENANT_DEFAULT_ROLE_CODES = Object.keys(TENANT_ROLE_SCHEMA) as TenantRoleCode[]

export const isDefaultTenantRoleCode = (code: string): code is TenantRoleCode => {
  return code in TENANT_ROLE_SCHEMA
}

export const duplicateTenantRole = (
  baseCode: TenantRoleCode,
  overrides?: Partial<Pick<TenantRoleInstance, "code" | "label" | "description" | "defaultScope" | "permissions">>,
): TenantRoleInstance => {
  const base = TENANT_ROLE_SCHEMA[baseCode]

  return {
    ...base,
    code: overrides?.code ?? `${base.code}_CUSTOM`,
    label: overrides?.label ?? `${base.label} Custom`,
    description: overrides?.description ?? `Salinan khusus dari ${base.label}.`,
    defaultScope: overrides?.defaultScope ?? base.defaultScope,
    permissions: overrides?.permissions ?? [...base.permissions],
    kind: "CUSTOM_ROLE",
    sourceRoleCode: baseCode,
    isSystemManaged: false,
  }
}

export type OrganizationRoleCode =
  | "OWNER"
  | "SITE_MANAGER"
  | "PROJECT_MANAGER"
  | "SITE_ENGINEER"
  | "SUPERVISOR"
  | "MANDOR"

export interface OrganizationRoleSchema {
  code: OrganizationRoleCode
  label: string
  visibleMenus: string[]
  tone: import("@/lib/operations-api").SettingsAccessTone
}

export interface AccessModuleSchema {
  key: string
  title: string
  groupKey: "core" | "finance" | "governance"
  roleCodes: OrganizationRoleCode[]
}

export const ORGANIZATION_ROLE_SCHEMA: Record<OrganizationRoleCode, OrganizationRoleSchema> = {
  OWNER: {
    code: "OWNER",
    label: "Tenant Owner",
    visibleMenus: ["Dashboard Proyek", "Pengelolaan Invoice", "Pengaturan Sistem", "Audit & Log"],
    tone: "primary",
  },
  SITE_MANAGER: {
    code: "SITE_MANAGER",
    label: "Tenant Administrator",
    visibleMenus: ["Dashboard Proyek", "Progress", "Tim", "Dokumen"],
    tone: "success",
  },
  PROJECT_MANAGER: {
    code: "PROJECT_MANAGER",
    label: "Project Manager",
    visibleMenus: ["Dashboard Proyek", "RAB & Anggaran", "Laporan", "Dokumen"],
    tone: "primary",
  },
  SITE_ENGINEER: {
    code: "SITE_ENGINEER",
    label: "Site Engineer",
    visibleMenus: ["Progress", "Material", "Bukti Foto"],
    tone: "warning",
  },
  SUPERVISOR: {
    code: "SUPERVISOR",
    label: "Supervisor",
    visibleMenus: ["Pengawasan", "Absensi", "Bukti Foto"],
    tone: "muted",
  },
  MANDOR: {
    code: "MANDOR",
    label: "Mandor",
    visibleMenus: ["Absensi", "Progress", "Bukti Foto"],
    tone: "muted",
  },
}

export const ACCESS_MODULE_SCHEMA: AccessModuleSchema[] = [
  {
    key: "dashboard-project",
    title: "Dashboard Proyek",
    groupKey: "core",
    roleCodes: ["OWNER", "SITE_MANAGER", "PROJECT_MANAGER", "SITE_ENGINEER", "SUPERVISOR", "MANDOR"],
  },
  {
    key: "invoice-management",
    title: "Pengelolaan Invoice",
    groupKey: "finance",
    roleCodes: ["OWNER", "PROJECT_MANAGER"],
  },
  {
    key: "system-settings",
    title: "Pengaturan Sistem",
    groupKey: "governance",
    roleCodes: ["OWNER", "SITE_MANAGER"],
  },
  {
    key: "audit-log",
    title: "Audit & Log",
    groupKey: "governance",
    roleCodes: ["OWNER", "SITE_ENGINEER", "SUPERVISOR"],
  },
]

export const getAccessModule = (key: string) =>
  ACCESS_MODULE_SCHEMA.find((module) => module.key === key) ?? null

export const getOrganizationRoleSchema = (code: string) =>
  ORGANIZATION_ROLE_SCHEMA[code as OrganizationRoleCode] ?? null

export const getTenantRoleSchema = (code: string) =>
  TENANT_ROLE_SCHEMA[code as TenantRoleCode] ?? null
