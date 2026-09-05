import { delay, http, HttpResponse } from "msw"
import { getApiUrl } from "@/lib/runtime-env"
import { marketingSiteData } from "@/lib/marketing-data"
import type { Locale } from "@/i18n"
import type { MarketingContactInput, MarketingNewsletterInput } from "@/lib/marketing-api"
import {
  consumeMockBackupCode,
  consumeMfaChallenge,
  consumeMfaSetup,
  createMfaChallenge,
  createMfaSetup,
  createSession,
  findUserByCredentials,
  findUserByToken,
  peekMfaChallenge,
  peekMfaSetup,
  revokeSession,
  updateMockUserMfa,
  updateSessionUser,
} from "./db"

const API_URL = getApiUrl()

const jsonError = (message: string, status = 400) =>
  HttpResponse.json({ success: false, message }, { status })

const authResponse = (data: unknown) => HttpResponse.json({ success: true, data })

const getRequestLocale = (request: Request): Locale => {
  const queryLocale = new URL(request.url).searchParams.get("locale")
  const headerLocale = request.headers.get("Accept-Language")?.split(",")[0]?.split("-")[0]
  const locale = queryLocale ?? headerLocale
  return locale === "en" || locale === "ms" ? locale : "id"
}

const encoder = new TextEncoder()

function createSSEStream() {
  return new ReadableStream({
    start(controller) {
      const send = () => {
        controller.enqueue(encoder.encode(":\n\n"))
      }
      send()
      setInterval(send, 15000)
    },
  })
}

export const handlers = [
  http.get(`${API_URL}/events`, () => {
    const stream = createSSEStream()
    return new HttpResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  }),

  http.get(`${API_URL}/marketing/site-data`, async ({ request }) => {
    getRequestLocale(request)
    await delay(150)
    return authResponse(marketingSiteData)
  }),

  http.post(`${API_URL}/marketing/contact`, async ({ request }) => {
    const locale = getRequestLocale(request)
    const body = (await request.json().catch(() => null)) as MarketingContactInput | null
    const name = body?.name?.trim()
    const email = body?.email?.trim()
    const message = body?.message?.trim()

    if (!name || !email || !message) {
      return jsonError(
        locale === "en"
          ? "Name, email, and message are required"
          : locale === "ms"
            ? "Nama, e-mel dan mesej diperlukan"
            : "Nama, email, dan pesan wajib diisi"
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonError(
        locale === "en"
          ? "Enter a valid email address"
          : locale === "ms"
            ? "Masukkan alamat e-mel yang sah"
            : "Masukkan alamat email yang valid"
      )
    }

    await delay(250)
    return authResponse({
      id: typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `contact-${Date.now()}`,
      submittedAt: new Date().toISOString(),
    })
  }),

  http.post(`${API_URL}/marketing/newsletter`, async ({ request }) => {
    const locale = getRequestLocale(request)
    const body = (await request.json().catch(() => null)) as MarketingNewsletterInput | null
    const email = body?.email?.trim()

    if (!email) {
      return jsonError(
        locale === "en"
          ? "Email is required"
          : locale === "ms"
            ? "E-mel diperlukan"
            : "Email wajib diisi"
      )
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonError(
        locale === "en"
          ? "Enter a valid email address"
          : locale === "ms"
            ? "Masukkan alamat e-mel yang sah"
            : "Masukkan alamat email yang valid"
      )
    }

    await delay(250)
    return authResponse({
      id: typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `newsletter-${Date.now()}`,
      sentAt: new Date().toISOString(),
    })
  }),

  http.post(`${API_URL}/sid-ms-auth/auth/login`, async ({ request }) => {
    const body = (await request.json().catch(() => null)) as {
      email?: string
      password?: string
      oauth?: {
        clientId?: string
        redirectUri?: string
        scope?: string
        state?: string
        codeChallenge?: string
        codeChallengeMethod?: "plain" | "S256"
      }
    } | null

    await delay(250)

    const user = findUserByCredentials(body?.email ?? "", body?.password ?? "")
    if (!user) {
      return jsonError("Email atau kata sandi salah", 401)
    }

    if (user.mfaEnabled) {
      const mfa = createMfaChallenge(user, body?.oauth)
      return authResponse({
        mfaRequired: true,
        challengeToken: mfa.challengeToken,
        methods: mfa.methods,
        maskedDestination: mfa.maskedDestination,
        expiresInSeconds: 300,
      })
    }

    const session = createSession(user)
    return authResponse({
      ...session,
      oauth: undefined,
    })
  }),

  http.post(`${API_URL}/sid-ms-auth/auth/mfa/verify`, async ({ request }) => {
    const body = (await request.json().catch(() => null)) as {
      challengeToken?: string
      code?: string
      backupCode?: string
    } | null

    await delay(150)

    if (!body?.challengeToken || (!body?.code && !body?.backupCode)) {
      return jsonError("Kode verifikasi tidak valid", 400)
    }

    const challengeInfo = peekMfaChallenge(body.challengeToken)
    if (!challengeInfo) {
      return jsonError("Challenge 2FA kedaluwarsa", 401)
    }

    if (body.backupCode) {
      if (!challengeInfo.backupCodes.includes(body.backupCode)) {
        return jsonError("Backup code salah", 401)
      }
      consumeMockBackupCode(challengeInfo.userId, body.backupCode)
    } else if (body.code !== "123456") {
      return jsonError("Kode verifikasi salah", 401)
    }

    const challenge = consumeMfaChallenge(body.challengeToken)
    if (!challenge) {
      return jsonError("Challenge 2FA kedaluwarsa", 401)
    }

    const session = createSession(challenge.user)
    return authResponse({
      ...session,
      oauth: undefined,
    })
  }),

  http.post(`${API_URL}/sid-ms-auth/auth/mfa/resend`, async ({ request }) => {
    const body = (await request.json().catch(() => null)) as { challengeToken?: string } | null

    await delay(120)

    if (!body?.challengeToken) {
      return jsonError("Challenge token tidak valid", 400)
    }

    const challengeInfo = peekMfaChallenge(body.challengeToken)
    if (!challengeInfo) {
      return jsonError("Challenge 2FA kedaluwarsa", 401)
    }

    return authResponse({
      mfaRequired: true,
      challengeToken: body.challengeToken,
      methods: [challengeInfo.method],
      maskedDestination:
        challengeInfo.method === "email" ? "sa***@ovaryasalon.local" : "Aplikasi autentikator",
      expiresInSeconds: 300,
      resendAfterSeconds: 30,
    })
  }),

  http.get(`${API_URL}/sid-ms-auth/auth/mfa/setup`, async ({ request }) => {
    await delay(120)
    const token = request.headers.get("Authorization")?.startsWith("Bearer ")
      ? request.headers.get("Authorization")?.slice(7)
      : null
    const session = token ? findUserByToken(token) : undefined
    if (!session) return jsonError("Session invalid", 401)

    const user = session.user
    const setup = createMfaSetup({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      scope: user.scope ?? "organization",
      password: "",
    })

    return authResponse(setup)
  }),

  http.post(`${API_URL}/sid-ms-auth/auth/mfa/enable`, async ({ request }) => {
    const body = (await request.json().catch(() => null)) as {
      setupToken?: string
      code?: string
    } | null

    await delay(120)

    if (!body?.setupToken || !body?.code) {
      return jsonError("Data setup 2FA tidak valid", 400)
    }

    const setup = peekMfaSetup(body.setupToken)
    if (!setup) {
      return jsonError("Setup 2FA kedaluwarsa", 401)
    }

    if (body.code !== "123456") {
      return jsonError("Kode verifikasi salah", 401)
    }

    const consumed = consumeMfaSetup(body.setupToken)
    if (!consumed) {
      return jsonError("Setup 2FA kedaluwarsa", 401)
    }

    const updated = updateMockUserMfa(consumed.userId, {
      mfaEnabled: true,
      mfaSecret: consumed.secret,
      backupCodes: consumed.backupCodes,
    })

    if (!updated) {
      return jsonError("User not found", 404)
    }

    return authResponse({
      mfaEnabled: true,
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        scope: updated.scope,
      },
      backupCodes: consumed.backupCodes,
    })
  }),

  http.get(`${API_URL}/sid-ms-auth/auth/me`, ({ request }) => {
    const token = request.headers.get("Authorization")?.startsWith("Bearer ")
      ? request.headers.get("Authorization")?.slice(7)
      : null
    const session = token ? findUserByToken(token) : undefined
    if (!session) return jsonError("Session invalid", 401)
    return authResponse(session)
  }),

  http.post(`${API_URL}/sid-ms-auth/auth/logout`, ({ request }) => {
    const token = request.headers.get("Authorization")?.startsWith("Bearer ")
      ? request.headers.get("Authorization")?.slice(7)
      : null
    if (token) revokeSession(token)
    return authResponse({ ok: true })
  }),

  http.put(`${API_URL}/sid-ms-auth/auth/profile`, async ({ request }) => {
    const body = (await request.json().catch(() => null)) as { name?: string; email?: string } | null
    const token = request.headers.get("Authorization")?.startsWith("Bearer ")
      ? request.headers.get("Authorization")?.slice(7)
      : null

    if (!token || !body?.name || !body?.email) {
      return jsonError("Data profil tidak valid", 400)
    }

    const updated = updateSessionUser(token, { name: body.name, email: body.email })
    if (!updated) {
      return jsonError("Session invalid", 401)
    }

    return authResponse(updated)
  }),

  http.post(`${API_URL}/sid-ms-auth/oauth/session`, ({ request }) => {
    const token = request.headers.get("Authorization")?.startsWith("Bearer ")
      ? request.headers.get("Authorization")?.slice(7)
      : null
    const session = token ? findUserByToken(token) : undefined
    if (!session) return jsonError("Session invalid", 401)
    return authResponse(session)
  }),
]
