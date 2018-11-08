import { getParameterByName } from "../service/util"

const log = (...msgs) => {
  if (!getParameterByName("nolog")) console.log.apply(console, msgs)
}
const warn = (...msgs) => {
  if (!getParameterByName("nolog")) console.warn.apply(console, msgs)
}
const error = (...msgs) => {
  if (!getParameterByName("nolog")) console.error.apply(console, msgs)
}

export default { log, warn, error }
