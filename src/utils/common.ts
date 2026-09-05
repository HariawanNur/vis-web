export const fetchWithTimeout = async (input: RequestInfo | URL, init: RequestInit = {}, timeoutMs = 3000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    })
  } catch (error) {
    if (controller.signal.aborted) {
      throw new Error("Request timeout")
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}
