import { getApiUrl } from "@/lib/runtime-env"

export interface ProjectListItem {
  id: string
  code: string
  name: string
  location: string
  progress: number
  status: "on_track" | "attention" | "delayed"
  targetDate: string
  daysLeft: string
  budget: string
  imageUri: string
}

export interface DashboardMetric {
  key: string
  icon: string
  value: number
}

export interface DashboardActivity {
  key: string
  icon: string
  title: string
  description: string
  status: string
  statusTone: "red" | "green" | "yellow"
  action: string
  actionType: "primary" | "default"
}

export interface AttentionItem {
  key: string
  name: string
  deviation: string
  deviationTone: "red" | "yellow"
  actual: number
  target: number
}

export interface DocumentItem {
  key: string
  name: string
  project: string
  type: string
  size: string
}

export interface Weather {
  temp: string
  condition: string
  humidity: string
  windSpeed: string
  windDirection: string
  location: string
}

export interface DashboardSummary {
  metrics: DashboardMetric[]
  activities: DashboardActivity[]
  attentionItems: AttentionItem[]
  overallProgress: {
    done: number
    running: number
    notStarted: number
    doneDelta: string
    runningDelta: string
    notStartedDelta: string
    trend: string
    period: string
  }
  weather: Weather
  documents: DocumentItem[]
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

export const fetchDashboardSummary = async (options?: { signal?: AbortSignal }): Promise<DashboardSummary> => {
  const response = await fetch(`${getApiUrl()}/dashboard/summary`, {
    headers: authHeaders(),
    signal: options?.signal,
  })
  return parseResponse<DashboardSummary>(response)
}

export const fetchProjects = async (options?: { signal?: AbortSignal }): Promise<ProjectListItem[]> => {
  const response = await fetch(`${getApiUrl()}/projects`, {
    headers: authHeaders(),
    signal: options?.signal,
  })
  return parseResponse<ProjectListItem[]>(response)
}
