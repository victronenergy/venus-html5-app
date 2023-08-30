import React from "react"
import AlternatorIcon from "../../../images/icons/alternator.svg"
import { useAlternator } from "@victronenergy/mfd-modules"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"

const EnergyAlternator = ({ mode = "compact", alternator, showInstance, compactBoxSize }: Props) => {
  const { current, voltage } = useAlternator(alternator)
  const instance = showInstance ? ` [${alternator}]` : ""
  const power = current * voltage

  if (mode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={AlternatorIcon}
        title={translate("boxes.alternator")}
        value={current}
        unit={"A"}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.alternator") + instance}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<AlternatorIcon className={"w-[18px] sm-s:w-[24px] sm-m:w-[32px]"} />}
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
