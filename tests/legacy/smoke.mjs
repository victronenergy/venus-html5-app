// Loads the built app in a (possibly very old) Chromium over the DevTools protocol and fails on any
// uncaught exception, console error or when the app does not reach the ready state in time.
// Only Page/Runtime domains are used, which exist since Chrome 49. Needs Node >= 22 (global WebSocket).
//
//   CDP_URL=http://localhost:9222 APP_URL=http://localhost:8000/ TIMEOUT=60 node tests/legacy/smoke.mjs
import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const CDP_URL = process.env.CDP_URL || "http://localhost:9222"
const APP_URL = process.env.APP_URL || "http://localhost:8000/?host=localhost&port=9001&path=%02%03"
const TIMEOUT = Number(process.env.TIMEOUT || 60) * 1000
const NAME = process.env.NAME || CDP_URL
const PROBE = readFileSync(fileURLToPath(new URL("./probe.js", import.meta.url)), "utf8")

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const waitFor = async (fn, timeout, interval = 1000) => {
  const end = Date.now() + timeout
  for (;;) {
    const result = await fn()
    if (result) return result
    if (Date.now() > end) return undefined
    await sleep(interval)
  }
}

const getTarget = async () => {
  try {
    // chrome 49 still accepts GET for /json/new, newer versions require PUT
    for (const method of ["PUT", "GET"]) {
      const res = await fetch(`${CDP_URL}/json/new?about:blank`, { method })
      if (res.ok) return await res.json()
    }
    const res = await fetch(`${CDP_URL}/json/list`)
    const targets = await res.json()
    return targets.find((t) => t.type === "page")
  } catch {
    // browser not up yet, retried by waitFor
    return undefined
  }
}

const main = async () => {
  const target = await waitFor(getTarget, 60000, 2000)
  if (!target) throw new Error(`no devtools target at ${CDP_URL}`)
  const browser = await fetch(`${CDP_URL}/json/version`).then((r) => r.json())
  console.log(`[${NAME}] ${browser.Browser} ${browser["User-Agent"]}`)

  // old Chrome reports the websocket url with its internal listening address, use the one we reached it through
  const wsUrl = new URL(target.webSocketDebuggerUrl)
  wsUrl.host = new URL(CDP_URL).host
  const ws = new WebSocket(wsUrl)
  await new Promise((resolve, reject) => {
    ws.onopen = resolve
    ws.onerror = reject
  })

  let id = 0
  const pending = new Map()
  const problems = []
  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data)
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg)
      pending.delete(msg.id)
      return
    }
    if (msg.method === "Runtime.exceptionThrown") {
      const d = msg.params.exceptionDetails
      problems.push(`uncaught: ${d.exception?.description || d.text} at ${d.url}:${d.lineNumber}`)
    }
    if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
      problems.push(`console.error: ${msg.params.args.map((a) => a.value ?? a.description).join(" ")}`)
    }
    // devtools protocol 1.1 (Chrome 49) reports uncaught errors through the Console domain only
    if (msg.method === "Console.messageAdded" && msg.params.message.level === "error") {
      const m = msg.params.message
      problems.push(`console: ${m.text} at ${m.url}:${m.line}`)
    }
  }
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      pending.set(++id, resolve)
      ws.send(JSON.stringify({ id, method, params }))
    })

  await send("Runtime.enable")
  await send("Page.enable")
  await send("Console.enable")
  await send("Page.navigate", { url: APP_URL })

  const probe = async () => {
    const { result, error } = await send("Runtime.evaluate", { expression: PROBE, returnByValue: true })
    if (error || result?.exceptionDetails) return undefined
    return JSON.parse(result.result.value)
  }

  const ready = await waitFor(async () => {
    const state = await probe()
    return state && (state.ready || state.errors.length) ? state : undefined
  }, TIMEOUT)
  const state = ready || (await probe())
  ws.close()

  console.log(`[${NAME}] state: ${JSON.stringify(state)}`)
  if (problems.length) console.log(`[${NAME}] problems:\n  ${problems.join("\n  ")}`)
  const failed = !state || !state.ready || state.errors.length > 0 || problems.length > 0
  console.log(`[${NAME}] ${failed ? "FAILED" : "OK"}`)
  process.exit(failed ? 1 : 0)
}

main().catch((e) => {
  console.error(`[${NAME}] ${e.stack || e}`)
  process.exit(1)
})
