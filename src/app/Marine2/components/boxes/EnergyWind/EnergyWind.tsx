import React from "react"
import WindIcon from "../../../images/icons/wind.svg"
import { useWindGenerator } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"

const EnergyWind = ({ mode = "compact", windGenerator, showInstance, compactBoxSize }: Props) => {
  const { current, voltage } = useWindGenerator(windGenerator)
  const instance = showInstance ? ` [${windGenerator}]` : ""
  const power = current * voltage

  if (mode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={WindIcon}
        title={translate("boxes.windGenerator")}
        value={current}
        unit={"A"}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.windGenerator") + instance}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<WindIcon className={"w-5"} />}
      value={current}
      unit={"A"}
      bottomValues={[[{ value: power, unit: "W" }]]}
    />
  )
}

interface Props {
  windGenerator: number
  showInstance: boolean
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default observer(EnergyWind)
