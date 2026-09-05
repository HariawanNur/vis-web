export type UserScope = "platform" | "organization"

export interface MockUser {
  id: string
  name: string
  email: string
  role: string
  scope: UserScope
  password: string
  mfaEnabled?: boolean
  mfaMethod?: "totp" | "email"
  backupCodes?: string[]
  mfaSecret?: string
}

export interface MockSessionUser {
  id: string
  name: string
  email: string
  role: string
  scope: UserScope
}

export interface MockSession {
  user: MockSessionUser
  sessionToken: string
  expiresIn: number
  expiresInSession: number
  accessToken: string
  refreshToken: string
  tokenType: "Bearer"
}

export const mockUsers: MockUser[] = [
  {
    id: "usr_platform_admin_01",
    name: "Super Admin",
    email: "admin@ovaryacorp.com",
    role: "PLATFORM_SUPER_ADMIN",
    scope: "platform",
    password: "admin123",
    mfaEnabled: true,
    mfaMethod: "email",
    backupCodes: ["BKUP-ADM-1357"],
  },
  {
    id: "usr_owner_01",
    name: "Maya Salma",
    email: "owner@ovaryasalon.local",
    role: "OWNER",
    scope: "organization",
    password: "owner123",
    mfaEnabled: true,
    mfaMethod: "totp",
    backupCodes: ["BKUP-OWN-2468"],
  },
  {
    id: "usr_manager_01",
    name: "Rina Putri",
    email: "manager@ovaryasalon.local",
    role: "MANAGER",
    scope: "organization",
    password: "manager123",
  },
  {
    id: "usr_cashier_01",
    name: "Dewi Lestari",
    email: "cashier@ovaryasalon.local",
    role: "CASHIER",
    scope: "organization",
    password: "cashier123",
  },
  {
    id: "usr_stylist_01",
    name: "Alya Saputra",
    email: "stylist@ovaryasalon.local",
    role: "STYLIST",
    scope: "organization",
    password: "stylist123",
  },
]

const sessions = new Map<string, MockSession>()
const pendingMfaChallenges = new Map<
  string,
  {
    userId: string
    oauth?: {
      clientId?: string
      redirectUri?: string
      scope?: string
      state?: string
      codeChallenge?: string
      codeChallengeMethod?: "plain" | "S256"
    }
    method: "totp" | "email"
    backupCodes: string[]
  }
>()
const pendingMfaSetups = new Map<
  string,
  {
    userId: string
    secret: string
    backupCodes: string[]
    issuer: string
    accountName: string
    createdAt: number
  }
>()

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"

const base32Encode = (buffer: Uint8Array) => {
  let bits = 0
  let value = 0
  let output = ""

  for (const byte of buffer) {
    value = (value << 8) | byte
    bits += 8
    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31]
  }

  return output
}

const toSessionUser = (user: MockUser): MockSessionUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  scope: user.scope,
})

export const findUserByCredentials = (email: string, password: string): MockUser | undefined =>
  mockUsers.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
  )

export const createSession = (user: MockUser): MockSession => {
  const sessionToken = `mock_${user.id}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
  const session: MockSession = {
    sessionToken,
    expiresIn: 15 * 60 * 1000,
    user: toSessionUser(user),
    accessToken: sessionToken,
    refreshToken: `refresh_${sessionToken}`,
    tokenType: "Bearer",
    expiresInSession: 15 * 60 * 1000,
  }
  sessions.set(sessionToken, session)
  return session
}

export const createMfaChallenge = (
  user: MockUser,
  oauth?: {
    clientId?: string
    redirectUri?: string
    scope?: string
    state?: string
    codeChallenge?: string
    codeChallengeMethod?: "plain" | "S256"
  },
) => {
  const challengeToken = `mfa_${user.id}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
  const method = user.mfaMethod ?? "totp"

  pendingMfaChallenges.set(challengeToken, {
    userId: user.id,
    oauth,
    method,
    backupCodes: user.backupCodes ?? [],
  })

  return {
    challengeToken,
    methods: [method],
    maskedDestination:
      method === "email"
        ? user.email.replace(/^(.{2}).+(@.+)$/, "$1***$2")
        : "Aplikasi autentikator",
    resendAfterSeconds: 30,
  }
}

export const consumeMfaChallenge = (challengeToken: string) => {
  const challenge = pendingMfaChallenges.get(challengeToken)
  if (!challenge) return undefined

  pendingMfaChallenges.delete(challengeToken)
  const user = mockUsers.find((entry) => entry.id === challenge.userId)

  if (!user) return undefined

  return { user, challenge }
}

export const peekMfaChallenge = (challengeToken: string) => pendingMfaChallenges.get(challengeToken)

export const createMfaSetup = (user: MockUser) => {
  const setupToken = `setup_${user.id}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
  const random = new Uint8Array(20)

  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(random)
  } else {
    for (let index = 0; index < random.length; index += 1) {
      random[index] = Math.floor(Math.random() * 256)
    }
  }

  const secret = base32Encode(random)
  const backupCodes = [`BKUP-${user.id.slice(-4).toUpperCase()}-2468`, `BKUP-${user.id.slice(-4).toUpperCase()}-1357`]

  pendingMfaSetups.set(setupToken, {
    userId: user.id,
    secret,
    backupCodes,
    issuer: "OVARYA",
    accountName: user.email,
    createdAt: Date.now(),
  })

  return {
    setupToken,
    secret,
    issuer: "OVARYA",
    accountName: user.email,
    otpauthUri: `otpauth://totp/OVARYA:${encodeURIComponent(user.email)}?secret=${secret}&issuer=OVARYA&algorithm=SHA1&digits=6&period=30`,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(`otpauth://totp/OVARYA:${encodeURIComponent(user.email)}?secret=${secret}&issuer=OVARYA&algorithm=SHA1&digits=6&period=30`)}`,
    backupCodes,
    expiresInSeconds: 600,
  }
}

export const peekMfaSetup = (setupToken: string) => pendingMfaSetups.get(setupToken)

export const consumeMfaSetup = (setupToken: string) => {
  const setup = pendingMfaSetups.get(setupToken)
  if (!setup) return undefined
  pendingMfaSetups.delete(setupToken)
  return setup
}

export const updateMockUserMfa = (
  userId: string,
  patch: Partial<Pick<MockUser, "mfaEnabled" | "backupCodes" | "mfaSecret">>,
) => {
  const user = mockUsers.find((entry) => entry.id === userId)
  if (!user) return undefined
  Object.assign(user, patch)
  return user
}

export const consumeMockBackupCode = (userId: string, code: string) => {
  const user = mockUsers.find((entry) => entry.id === userId)
  if (!user) return undefined
  user.backupCodes = (user.backupCodes ?? []).filter((item) => item !== code)
  return user.backupCodes
}

export const findUserByToken = (sessionToken: string): MockSession | undefined => {
  const existing = sessions.get(sessionToken)
  if (existing) return existing

  const match = sessionToken.match(/^mock_(.+?)_\d+_[a-z0-9]+$/i)
  const userId = match?.[1]
  if (!userId) return undefined

  const user = mockUsers.find((entry) => entry.id === userId)
  if (!user) return undefined

  const session: MockSession = {
    sessionToken,
    accessToken: sessionToken,
    expiresIn: 15 * 60 * 1000,
    expiresInSession: 15 * 60 * 1000,
    refreshToken: `refresh_${sessionToken}`,
    tokenType: "Bearer",
    user: toSessionUser(user),
  }

  sessions.set(sessionToken, session)
  return session
}

export const revokeSession = (sessionToken: string) => {
  sessions.delete(sessionToken)
}

export const updateSessionUser = (sessionToken: string, patch: Partial<MockSessionUser>) => {
  const session = findUserByToken(sessionToken)
  if (!session) return undefined
  session.user = { ...session.user, ...patch }
  return session.user
}
