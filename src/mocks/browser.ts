import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

export const worker = setupWorker(...handlers)

let startPromise: Promise<ServiceWorkerRegistration | undefined> | undefined

export function startMockWorker() {
  startPromise ??= worker.start({ onUnhandledRequest: "bypass" })
  return startPromise
}
