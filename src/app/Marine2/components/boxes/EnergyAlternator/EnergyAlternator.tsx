import React from "react"
import AlternatorIcon from "../../../images/icons/alternator.svg"
import { useAlternator } from "@elninotech/mfd-modules"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"

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
    <ValueBox
      title={translate("boxes.alternator") + instance}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<AlternatorIcon className={"w-5"} />}
      value={current}
      unit={"A"}
      bottomValues={[[{ value: power, unit: "W" }]]}
    />
  )
}

interface Props {
  alternator: number
  showInstance: boolean
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default EnergyAlternator
