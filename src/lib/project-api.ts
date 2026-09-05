import { getApiUrl } from "@/lib/runtime-env"
import type { CategoryType } from "@/components/MapLocation"

export interface ProjectSummary {
  id: string
  name: string
  location: string
  status: string
  statusColor: "green" | "orange" | "red"
  startDate: string
  targetDate: string
  progress: number
  rabTotal: string
  budgetTotal: string
  realizationTotal: string
  commitmentTotal: string
  remainingTotal: string
}

export interface RABItem {
  key: string
  code: string
  name: string
  volume: string
  unit: string
  price: string
  rab: string
  budget: string
  realization: string
  commitment: string
  remaining: string
  progress: number
  isCategory?: boolean
  isTotal?: boolean
}

export interface TrendPoint {
  month: string
  Anggaran: number
  Realisasi: number
}

export type ProjectStatus = "on_track" | "attention" | "delayed"

export interface ProjectListItem {
  id: string
  code: string
  name: string
  location: string
  progress: number
  status: ProjectStatus
  targetDate: string
  daysLeft: string
  budget: string
  imageUri: string
  period?: string
  statusDesc?: string
  managerName?: string
  managerRole?: string
}

export interface ProjectLocationDistributionItem {
  id: string
  title: string
  description?: string
  category: CategoryType
  longitude: number
  latitude: number
  count: number
}

export interface ProjectMapLocationItem {
  id: string
  title: string
  description: string
  info?: string
  category: CategoryType
  longitude: number
  latitude: number
  status: "on_track" | "attention" | "delayed" | "completed" | "inactive"
  statusLabel: string
  progress: number
  targetDate: string
  managerName: string
  imageUri: string
  markerColor?: string
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

export const fetchProject = async (projectId: string): Promise<ProjectSummary> => {
  const response = await fetch(`${getApiUrl()}/projects/${projectId}`, {
    headers: authHeaders(),
  })
  return parseResponse<ProjectSummary>(response)
}

export const fetchRABItems = async (projectId: string): Promise<RABItem[]> => {
  const response = await fetch(`${getApiUrl()}/projects/${projectId}/rab`, {
    headers: authHeaders(),
  })
  return parseResponse<RABItem[]>(response)
}

export const fetchTrendData = async (projectId: string): Promise<TrendPoint[]> => {
  const response = await fetch(`${getApiUrl()}/projects/${projectId}/trend`, {
    headers: authHeaders(),
  })
  return parseResponse<TrendPoint[]>(response)
}

export const fetchProjects = async (): Promise<ProjectListItem[]> => {
  const response = await fetch(`${getApiUrl()}/projects`, {
    headers: authHeaders(),
  })
  return parseResponse<ProjectListItem[]>(response)
}

export const fetchProjectLocationDistribution = async (): Promise<ProjectLocationDistributionItem[]> => {
  const response = await fetch(`${getApiUrl()}/projects/location-distribution`, {
    headers: authHeaders(),
  })
  return parseResponse<ProjectLocationDistributionItem[]>(response)
}

export const fetchProjectMapLocations = async (): Promise<ProjectMapLocationItem[]> => {
  const response = await fetch(`${getApiUrl()}/projects/map-locations`, {
    headers: authHeaders(),
  })
  return parseResponse<ProjectMapLocationItem[]>(response)
}

export const deleteProject = async (projectId: string): Promise<void> => {
  const response = await fetch(`${getApiUrl()}/projects/${projectId}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  if (!response.ok) {
    throw new Error("Gagal menghapus proyek")
  }
}
