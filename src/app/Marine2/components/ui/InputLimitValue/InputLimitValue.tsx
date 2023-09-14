import { useInputLimit } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react"
import { formatValue } from "../../../utils/formatters"

const InputLimitValue = ({ inputId }: Props) => {
  const { currentLimit } = useInputLimit(inputId)
  return <>{!!currentLimit ? formatValue(Number(currentLimit)) : 0.0}</>
}

interface Props {
  inputId: number
}

export default observer(InputLimitValue)
