import { getParameterByName } from "./util"

const log = (...msgs) => {
  if (!getParameterByName("nolog")) console.log(...msgs)
}
const warn = (...msgs) => {
  if (!getParameterByName("nolog")) console.warn(...msgs)
}
const error = (...msgs) => {
  if (!getParameterByName("nolog")) console.error(...msgs)
}

export default { log, warn, error }
