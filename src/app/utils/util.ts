export const getParameterByName = (name: string, url?: string): string | null => {
  if (!url) url = window.location.href
  name = name.replace(/[[\]]/g, "\\$&")
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export const byteSize = (str: string) => new Blob([str]).size

export const isError = (error: unknown) => {
  return !!(error && (error as Error).stack && (error as Error).message)
}
