import { useInputLimit } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"

const InputLimitValue = ({ inputId }: Props) => {
  const { currentLimit } = useInputLimit(inputId)
  return <>{!!currentLimit ? Number(currentLimit) : 0}</>
}

interface Props {
  inputId: number
}

export default observer(InputLimitValue)
