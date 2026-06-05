const isLoggingDisabled = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("nolog")

const log = (...msgs: unknown[]) => {
  if (!isLoggingDisabled) console.log(...msgs)
}
const warn = (...msgs: unknown[]) => {
  if (!isLoggingDisabled) console.warn(...msgs)
}
const error = (...msgs: unknown[]) => {
  if (!isLoggingDisabled) console.error(...msgs)
}

export default { log, warn, error }
