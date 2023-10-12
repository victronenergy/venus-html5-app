import { translate } from "react-i18nify"
import { formatStateFor } from "../../formatters/devices/format-state-for"

export const translatedStateFor = (state?: number | string) => {
  if (state === undefined) return undefined

  const formattedState = formatStateFor(Number(state))
  return translate(formattedState)
}
