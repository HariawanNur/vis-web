import { getApiUrl } from "@/lib/runtime-env"

export interface TaskItem {
  id: string
  title: string
  project: string
  assignee: string
  dueDate: string
  priority: "high" | "medium" | "low"
  status: "todo" | "in_progress" | "done"
}

export interface AttendanceRecord {
  key: string
  name: string
  role: string
  checkIn: string
  checkOut: string
  status: "present" | "absent" | "leave"
}

export interface AttendanceData {
  date: string
  totalWorkers: number
  present: number
  absent: number
  onLeave: number
  records: AttendanceRecord[]
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  category: "approval" | "progress" | "system" | "finance"
  read: boolean
}

export type ReportType = "daily" | "weekly" | "monthly" | "custom"
export type ReportStatus = "approved" | "waiting" | "rejected"

export interface ProgressReportItem {
  id: string
  title: string
  project: string
  code: string
  location: string
  type: ReportType
  period: string
  progress: number
  status: ReportStatus
  createdBy: string
  createdRole: string
  createdDate: string
  createdTime: string
  approvedBy: string
  approvedDate: string
  approvedTime: string
  notes: string
  imageUri: string
  budget: number
  attachments: string[]
}

const authHeaders = (): Record<string, string> => {
  if (typeof window === "undefined") return {}
  const raw = window.localStorage.getItem("build_erp_session")
  if (!raw) return {}
  try {
    const session = JSON.parse(raw) as { sessionToken: string }
    return { Authorization: `Bearer ${session.sessionToken}` }
  } catch {
    return {}
  }
}

const parseResponse = async <T>(response: Response): Promise<T> => {
  const payload = (await response.json().catch(() => null)) as { success?: boolean; data?: T; message?: string } | null
  if (!response.ok || !payload?.success || !payload.data) {
    throw new Error(payload?.message || "Gagal memuat data")
  }
  return payload.data
}

export const fetchTasks = async (): Promise<TaskItem[]> => {
  const response = await fetch(`${getApiUrl()}/tasks`, {
    headers: authHeaders(),
  })
  return parseResponse<TaskItem[]>(response)
}

export const fetchAttendance = async (): Promise<AttendanceData> => {
  const response = await fetch(`${getApiUrl()}/attendance`, {
    headers: authHeaders(),
  })
  return parseResponse<AttendanceData>(response)
}

export const fetchNotifications = async (): Promise<NotificationItem[]> => {
  const response = await fetch(`${getApiUrl()}/notifications`, {
    headers: authHeaders(),
  })
  return parseResponse<NotificationItem[]>(response)
}

export const markNotificationRead = async (id: string): Promise<NotificationItem> => {
  const response = await fetch(`${getApiUrl()}/notifications/${id}/read`, {
    method: "PATCH",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
  })
  return parseResponse<NotificationItem>(response)
}

export const markAllNotificationsRead = async (): Promise<NotificationItem[]> => {
  const response = await fetch(`${getApiUrl()}/notifications/read-all`, {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
  })
  return parseResponse<NotificationItem[]>(response)
}

export const fetchProgressReports = async (): Promise<ProgressReportItem[]> => {
  const response = await fetch(`${getApiUrl()}/progress-reports`, {
    headers: authHeaders(),
  })
  return parseResponse<ProgressReportItem[]>(response)
}

// ---- Calendar Events ----

export type CalendarEventTone = "primary" | "success" | "warning" | "danger" | "muted"

export interface CalendarEvent {
  id: string
  title: string
  project: string
  time: string
  tone: CalendarEventTone
  day: number
}

export const fetchCalendarEvents = async (): Promise<CalendarEvent[]> => {
  const response = await fetch(`${getApiUrl()}/calendar-events`, {
    headers: authHeaders(),
  })
  return parseResponse<CalendarEvent[]>(response)
}

// ---- Materials ----

export type MaterialStatus = "safe" | "low" | "empty"

export interface MaterialItem {
  id: string
  name: string
  subtitle: string
  category: string
  code: string
  unit: string
  location: string
  stock: string
  unitPrice: string
  stockValue: string
  status: MaterialStatus
  thumbnail: string
}

export interface MaterialSummary {
  kpiSummary: {
    totalMaterial: number
    totalStock: number
    stockValue: string
    lowStock: number
    empty: number
  }
  stockBreakdown: Array<{ labelKey: string; value: string; color: string; count: number }>
  lowStockItems: Array<{ name: string; detail: string; status: string }>
  outStockItems: Array<{ name: string; detail: string; status: string }>
  storageLocations: Array<{ label: string; percent: number }>
}

export interface MaterialData {
  materials: MaterialItem[]
  summary: MaterialSummary
}

export const fetchMaterials = async (): Promise<MaterialData> => {
  const response = await fetch(`${getApiUrl()}/materials`, {
    headers: authHeaders(),
  })
  return parseResponse<MaterialData>(response)
}

// ---- Documents ----

export type DocumentStatus = "verified" | "pending" | "rejected"

export interface DocumentRow {
  key: string
  name: string
  code: string
  project: string
  category: string
  type: string
  size: string
  version: string
  status: DocumentStatus
  uploader: string
  role: string
  date: string
  time: string
}

export interface DocumentStat {
  key: string
  labelKey: string
  value: string
  subtitleKey: string
  icon: string
  tint: string
  iconColor: string
}

export interface DocumentData {
  documents: DocumentRow[]
  stats: DocumentStat[]
  recentActivity: Array<{ key: string; title: string; actionKey: string; actor: string; time: string; icon: string; tint: string; color: string }>
  categoryItems: Array<{ key: string; labelKey: string; count: number; icon: string; color: string }>
  storageLegend: Array<{ key: string; labelKey: string; value: string; color: string; percent: number }>
}

export const fetchDocuments = async (): Promise<DocumentData> => {
  const response = await fetch(`${getApiUrl()}/documents`, {
    headers: authHeaders(),
  })
  return parseResponse<DocumentData>(response)
}

// ---- Finance ----

export type FinanceStatus = "paid" | "pending" | "overdue"
export type FinanceType = "invoice" | "payment" | "expense" | "income"

export interface FinanceRow {
  key: string
  date: string
  invoice: string
  project: string
  type: FinanceType
  note: string
  debit: string
  credit: string
  status: FinanceStatus
}

export interface FinanceSummary {
  kpiItems: Array<{ key: string; value: string; icon: string; tint: string; color: string }>
  chartData: Array<{ month: string; anggaran: number; realisasi: number }>
  cashflowData: Array<{ month: string; masuk: number; keluar: number; saldo: number }>
  financeHealth: Array<{ name: string; status: "healthy" | "attention" | "critical" }>
  latestDocs: Array<{ name: string; project: string; date: string; type: string }>
}

export interface FinanceData {
  rows: FinanceRow[]
  summary: FinanceSummary
}

export const fetchFinance = async (): Promise<FinanceData> => {
  const response = await fetch(`${getApiUrl()}/finance`, {
    headers: authHeaders(),
  })
  return parseResponse<FinanceData>(response)
}

// ---- Users ----

export type UserListItemStatus = "active" | "invited" | "suspended"
export type UserListItemRole = "Admin" | "Manager" | "Engineer" | "Finance" | "Support"

export interface UserListItem {
  key: string
  name: string
  email: string
  role: UserListItemRole
  status: UserListItemStatus
  department: string
  lastActive: string
  avatarColor: string
  loginRate: number
}

export const fetchUsers = async (): Promise<UserListItem[]> => {
  const response = await fetch(`${getApiUrl()}/users`, {
    headers: authHeaders(),
  })
  return parseResponse<UserListItem[]>(response)
}

// ---- Settings ----

export type SettingsSection =
  | "profile"
  | "general"
  | "notification"
  | "security"
  | "access"
  | "integration"
  | "storage"
  | "numbering"
  | "email"
  | "audit"
  | "system"

export interface SettingsMenuItem {
  key: SettingsSection
  icon: string
}

export interface SettingsHistoryItem {
  key: string
  icon: string
  color: string
}

export type SettingsAccessTone = "primary" | "success" | "warning" | "error" | "muted"

export interface SettingsAccessSummaryItem {
  key: string
  label: string
  value: string
  note: string
  tone: SettingsAccessTone
}

export interface SettingsAccessRoleItem {
  key: string
  label: string
  users: string
  access: string
  tone: SettingsAccessTone
  visibleMenus: string[]
}

export interface SettingsAccessGroupItem {
  key: string
  label: string
}

export interface SettingsAccessMatrixRow {
  id: string
  feature: string
  groupKey: string
  actionLabel: string
  permissions: Record<string, boolean>
}

export interface SettingsRoleAccessData {
  summary: SettingsAccessSummaryItem[]
  roles: SettingsAccessRoleItem[]
  groups: SettingsAccessGroupItem[]
  matrix: SettingsAccessMatrixRow[]
  footerNote: string
}

export interface SettingsNotificationRow {
  key: string
  label: string
  hint: string
  inApp: boolean
  email: boolean
  sms: boolean
}

export interface SettingsGeneralConfig {
  language: string
  timezone: string
  dateFormat: string
  timeFormat: string
  currency: string
  decimalSeparator: string
  thousandSeparator: string
}

export interface SettingsProfileConfig {
  organizationName: string
  email: string
  phone: string
  website: string
  address: string
  logoUri: string
}

export interface SettingsSecurityConfig {
  subtitle: string
  passwordPolicy: string
  passwordHint: string
  sessionTimeout: string
  sessionHint: string
  twoFactorRequired: boolean
  twoFactorLabel: string
  activeSessions: string
  activeSessionsHint: string
  resetPasswordLabel: string
  activeSessionsLabel: string
  loginHistoryLabel: string
  activeSessionsCount: string
  loginHistoryCount: string
  loginHistory: Array<{ device: string; location: string; time: string }>
}

export interface SettingsIntegrationItem {
  name: string
  desc: string
  status: string
  endpoint: string
  sync: string
}

export interface SettingsStorageConfig {
  capacityLabel: string
  capacityValue: string
  capacityPercent: number
  retention: string
  backup: boolean
  archive: boolean
  quotaNotification: boolean
  backupSchedule: string
  warningThreshold: string
  distributions: Array<{ name: string; value: string }>
}

export interface SettingsNumberingConfig {
  projectPrefix: string
  documentPrefix: string
  yearlyFormat: string
  resetSequence: string
  preview: string
}

export interface SettingsEmailConfig {
  smtpHost: string
  smtpPort: string
  username: string
  password: string
  senderName: string
  senderEmail: string
}

export interface SettingsSystemInfoItem {
  label: string
  value: string
  progress?: number
}

export interface SettingsSystemConfig {
  subtitle: string
  overview: Array<{ label: string; value: string; note: string }>
  info: SettingsSystemInfoItem[]
}

export interface SettingsActivityItem {
  icon: string
  color: string
  title: string
  subtitle: string
  time: string
  category: string
}

export interface SettingsConfig {
  profile: SettingsProfileConfig
  general: SettingsGeneralConfig
  notification: SettingsNotificationRow[]
  security: SettingsSecurityConfig
  integration: {
    summary: Array<{ label: string; value: string }>
    items: SettingsIntegrationItem[]
  }
  storage: SettingsStorageConfig
  numbering: SettingsNumberingConfig
  email: SettingsEmailConfig
  system: SettingsSystemConfig
  activity: {
    subtitle: string
    filters: Array<{ key: string; label: string }>
    items: SettingsActivityItem[]
    footer: string
  }
}

export interface SettingsData {
  menuItems: SettingsMenuItem[]
  historyItems: SettingsHistoryItem[]
  roleAccess: SettingsRoleAccessData
  config: SettingsConfig
}

export const fetchSettings = async (): Promise<SettingsData> => {
  const response = await fetch(`${getApiUrl()}/settings`, {
    headers: authHeaders(),
  })
  return parseResponse<SettingsData>(response)
}

export const updateSettings = async (payload: SettingsConfig): Promise<SettingsConfig> => {
  const response = await fetch(`${getApiUrl()}/settings`, {
    method: "PATCH",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<SettingsConfig>(response)
}

export const updateSettingsRoleAccess = async (
  payload: SettingsRoleAccessData,
): Promise<SettingsRoleAccessData> => {
  const response = await fetch(`${getApiUrl()}/settings/role-access`, {
    method: "PATCH",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  return parseResponse<SettingsRoleAccessData>(response)
}

// ---- Analytics Dashboard ----

export interface AnalyticsDashboardData {
  metrics: Array<{ titleKey: string; value: number | string; subtitleKey: string; icon: string; tint: string; accent: string; linkKey: string }>
  statusLegend: Array<{ labelKey: string; value: string; color: string }>
  donutSegments: Array<{ value: number; color: string }>
  progressData: Array<{ week: string; progress: number; target: number }>
  contractData: Array<{ name: string; contract: number; realization: number }>
  projectRows: Array<{ key: string; name: string; code: string; manager: string; roleKey: string; progress: number; statusKey: string; statusTone: string; start: string; target: string }>
  locationPoints: Array<{ top: string; left: string; color: string; labelKey: string }>
  locationLegend: Array<{ labelKey: string; value: string; color: string }>
  activities: Array<{ icon: string; tint: string; title: string; description: string; time: string }>
  taskSummary: Array<{ titleKey: string; value: number; sub?: string; icon: string; tint: string }>
}

export const fetchAnalyticsDashboard = async (): Promise<AnalyticsDashboardData> => {
  const response = await fetch(`${getApiUrl()}/analytics/dashboard`, {
    headers: authHeaders(),
  })
  return parseResponse<AnalyticsDashboardData>(response)
}

// ---- Analytics Reports ----

export type AnalyticsReportStatus = "approved" | "waiting" | "rejected"
export type AnalyticsReportType = "progress" | "photo" | "attendance" | "document"

export interface AnalyticsReportRow {
  key: string
  date: string
  title: string
  project: string
  type: AnalyticsReportType
  createdBy: string
  createdRole: string
  status: AnalyticsReportStatus
  progress: number
  progressColor: string
}

export interface AnalyticsReportsData {
  reportRows: AnalyticsReportRow[]
  trendData: Array<{ day: string; laporan: number; disetujui: number }>
  topProjects: Array<{ name: string; value: number }>
  latestDocs: Array<{ name: string; project: string; date: string; type: string }>
}

export const fetchAnalyticsReports = async (): Promise<AnalyticsReportsData> => {
  const response = await fetch(`${getApiUrl()}/analytics/reports`, {
    headers: authHeaders(),
  })
  return parseResponse<AnalyticsReportsData>(response)
}

// ---- Organization Units ----

export type OrgUnitStatus = "active" | "inactive"

export interface OrgUnitNode {
  id: string
  name: string
  code?: string
  type: string
  count: number
  status: OrgUnitStatus
  level: number
  children?: OrgUnitNode[]
}

export interface OrgUnitData {
  orgTree: OrgUnitNode[]
  detailStats: Array<{ labelKey: string; value: string; subtitle?: string; subtitleKey?: string; color: string }>
  employees: Array<{ name: string; role: string; title: string; email: string; phone: string }>
  projects: Array<{ name: string; count: number; progress: number; tone: string }>
  docs: Array<{ name: string; type: string; date: string }>
  activities: Array<{ titleKey: string; descKey: string; time: string; color: string }>
}

export const fetchOrgUnits = async (): Promise<OrgUnitData> => {
  const response = await fetch(`${getApiUrl()}/org-units`, {
    headers: authHeaders(),
  })
  return parseResponse<OrgUnitData>(response)
}
