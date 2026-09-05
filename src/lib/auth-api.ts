import { getApiUrl } from "@/lib/runtime-env"
import { fetchWithTimeout } from "@/utils/common"

type ApiSuccessResponse<T> = {
  success: true
  data: T
}

type ApiErrorResponse = {
  success?: false
  message?: string
}

const parseSuccessResponse = async <T>(response: Response, fallback: string): Promise<T> => {
  const payload = (await response.json().catch(() => null)) as ApiSuccessResponse<T> | ApiErrorResponse | null

  if (!response.ok || !payload?.success || !("data" in payload) || payload.data == null) {
    throw new Error((payload as ApiErrorResponse | null)?.message || fallback)
  }

  return payload.data
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  scope?: "platform" | "organization"
  mfaEnabled?: boolean
}

export interface AuthSession {
  user: AuthUser
  expiresIn?: number
  expiresInSession?: number
  sessionToken: string
  accessToken?: string
  refreshToken?: string
  tokenType?: "Bearer"
  oauth?: LoginOAuthResult
}

export interface LoginOAuthHint {
  clientId: string
  redirectUri: string
  scope?: string
  state?: string
  codeChallenge?: string
  codeChallengeMethod?: "plain" | "S256"
}

export interface LoginOAuthResult {
  clientId: string
  authorizeUrl: string
}

export interface LoginMfaSetupResult {
  setupToken: string
  secret: string
  issuer: string
  accountName: string
  otpauthUri: string
  qrCodeUrl: string
  backupCodes: string[]
  expiresInSeconds: number
}

export interface LoginMfaEnableInput {
  setupToken: string
  code: string
}

export interface LoginMfaEnableResult {
  mfaEnabled: true
  user: AuthUser
  backupCodes: string[]
}

export type LoginMfaMethod = "totp" | "email" | "backup"

export interface LoginMfaChallenge {
  mfaRequired: true
  challengeToken: string
  methods: LoginMfaMethod[]
  maskedDestination?: string
  expiresInSeconds?: number
  resendAfterSeconds?: number
}

export interface LoginSessionResult {
  user: AuthUser
  sessionToken: string
  expiresIn?: number
  expiresInSession?: number
  accessToken: string
  refreshToken: string
  tokenType: "Bearer"
  oauth?: LoginOAuthResult
}

export interface LoginMfaVerifyInput {
  challengeToken: string
  code?: string
  backupCode?: string
}

export interface LoginMfaResendResult {
  mfaRequired: true
  challengeToken: string
  methods: LoginMfaMethod[]
  maskedDestination?: string
  expiresInSeconds?: number
  resendAfterSeconds?: number
}

export interface LoginSessionEnvelope {
  sessionToken: string
  user: AuthUser
  expiresIn?: number
  expiresInSession?: number
  accessToken?: string
  refreshToken?: string
  tokenType?: "Bearer"
  oauth?: LoginOAuthResult
}

export type LoginResult = LoginSessionResult | LoginMfaChallenge

type BackendSession = {
  session_token: string
  sessionToken?: string
  expiresIn?: number
  expiresInSession?: number
  user: AuthUser
  accessToken?: string
  refreshToken?: string
  tokenType?: "Bearer"
  oauth?: LoginOAuthResult
}

type BackendLoginResult = LoginMfaChallenge | BackendSession

const readMessage = async (response: Response, fallback: string) => {
  const payload = (await response.json().catch(() => null)) as ApiErrorResponse | null
  return payload?.message ?? fallback
}

const normalizeBackendSession = (result: BackendSession) => {
  const sessionToken = result.session_token ?? result.sessionToken

  if (!sessionToken) {
    throw new Error("Session tidak valid")
  }

  return {
    sessionToken,
    expiresIn: result.expiresIn,
    expiresInSession: result.expiresInSession,
    user: result.user,
    accessToken: result.accessToken ?? sessionToken,
    refreshToken: result.refreshToken ?? `refresh_${sessionToken}`,
    tokenType: result.tokenType ?? "Bearer",
    oauth: result.oauth,
  }
}

export const loginWithPassword = async (email: string, password: string, oauth?: LoginOAuthHint) => {
  const response = await fetchWithTimeout(`${getApiUrl()}/sid-ms-auth/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, oauth }),
  })

  const result = await parseSuccessResponse<BackendLoginResult>(response, "Login gagal")

  if ("mfaRequired" in result) {
    return result
  }

  return normalizeBackendSession(result)
}

export const verifyLoginMfa = async (input: LoginMfaVerifyInput) => {
  const response = await fetchWithTimeout(`${getApiUrl()}/sid-ms-auth/auth/mfa/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  const result = await parseSuccessResponse<BackendSession>(response, "Verifikasi 2FA gagal")
  return normalizeBackendSession(result)
}

export const resendLoginMfaChallenge = async (challengeToken: string) => {
  const response = await fetchWithTimeout(`${getApiUrl()}/sid-ms-auth/auth/mfa/resend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeToken }),
  })

  return parseSuccessResponse<LoginMfaResendResult>(response, "Kirim ulang kode gagal")
}

export const beginTwoFactorEnrollment = async (sessionToken: string) => {
  const response = await fetchWithTimeout(`${getApiUrl()}/sid-ms-auth/auth/mfa/setup`, {
    method: "GET",
    headers: { Authorization: `Bearer ${sessionToken}` },
  })

  return parseSuccessResponse<LoginMfaSetupResult>(response, "Gagal memulai setup 2FA")
}

export const enableTwoFactorEnrollment = async (sessionToken: string, input: LoginMfaEnableInput) => {
  const response = await fetchWithTimeout(`${getApiUrl()}/sid-ms-auth/auth/mfa/enable`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify(input),
  })

  return parseSuccessResponse<LoginMfaEnableResult>(response, "Gagal mengaktifkan 2FA")
}

export const fetchCurrentSession = async (sessionToken: string) => {
  const response = await fetchWithTimeout(`${getApiUrl()}/sid-ms-auth/auth/me`, {
    headers: { Authorization: `Bearer ${sessionToken}` },
  })

  const result = await parseSuccessResponse<BackendSession>(response, "Session invalid")
  return normalizeBackendSession(result)
}

export const logoutSession = async (sessionToken: string) => {
  const response = await fetchWithTimeout(`${getApiUrl()}/sid-ms-auth/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${sessionToken}` },
  })

  if (!response.ok) {
    throw new Error(await readMessage(response, "Logout gagal"))
  }
}

export const updateProfile = async (
  sessionToken: string,
  payload: { name: string; email: string },
): Promise<AuthUser> => {
  const response = await fetchWithTimeout(`${getApiUrl()}/sid-ms-auth/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
    body: JSON.stringify(payload),
  })

  return parseSuccessResponse<AuthUser>(response, "Gagal memperbarui profil")
}
