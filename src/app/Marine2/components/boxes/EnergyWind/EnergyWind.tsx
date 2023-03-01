import React from "react"
import WindIcon from "../../../images/icons/wind.svg"
import { useWindGenerator } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"

const EnergyWind = ({ mode = "compact", windGenerator, showInstance }: Props) => {
  const { current, voltage } = useWindGenerator(windGenerator)
  const instance = showInstance ? ` [${windGenerator}]` : ""
  const power = current * voltage

  if (mode === "compact") {
    return (
      <p>
        {translate("boxes.windGenerator")}
        {instance}: {current || current === 0 ? Math.round(current) : "--"}A
      </p>
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
