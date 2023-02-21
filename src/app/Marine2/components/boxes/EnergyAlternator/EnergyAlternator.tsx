import React from "react"
import Box from "../../../components/ui/Box"
import AlternatorIcon from "../../../images/icons/alternator.svg"
import { useAlternator } from "@elninotech/mfd-modules"
import { translate } from "react-i18nify"

const EnergyAlternator = ({ mode = "compact", alternator, showInstance }: Props) => {
  const { current, voltage } = useAlternator(alternator)
  const instance = showInstance ? ` [${alternator}]` : ""
  const power = current * voltage

  if (mode === "compact") {
    return (
      <p>
        {translate("boxes.alternator")}
        {instance}: {current || current === 0 ? Math.round(current) : "--"}A
      </p>
    )
  }

  return (
    <Box
      title={translate("boxes.alternator") + instance}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<AlternatorIcon className={"w-6 text-black dark:text-white"} />}
    >
      <>
        <p>{Math.round(current)}A</p>
        <p>{Math.round(power)}W</p>
      </>
    </Box>
  )
}

interface Props {
  alternator: number
  showInstance: boolean
  mode?: "compact" | "full"
}

export default EnergyAlternator
