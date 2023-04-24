import React from "react"
import { AcLoadsState } from "@elninotech/mfd-modules"
import ACIcon from "../../../images/icons/ac.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"

const EnergyAC = ({ mode = "compact", acLoads, compactBoxSize }: Props) => {
  const { current, power, phases, voltage } = acLoads

  const totalPower = power.reduce((total, power) => (power ? total + power : total))

  if (mode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={ACIcon}
        title={translate("boxes.acLoads")}
        value={(phases ?? 1) === 1 ? current[0] : totalPower}
        unit={(phases ?? 1) === 1 ? "A" : "W"}
        decimalPlaces={(phases ?? 1) === 1 ? 1 : 0}
        boxSize={compactBoxSize}
      />
    )
  }

  const phasesOverview = []
  for (let phase = 0; phase < phases; phase++) {
    phasesOverview.push([
      { value: voltage[phase], unit: "V", decimalPlaces: 0 },
      { value: current[phase], unit: "A" },
      { value: power[phase], unit: "W", decimalPlaces: 0 },
    ])
  }

  return (
    <ValueBox
      title={translate("boxes.acLoads")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<ACIcon className={"w-6"} />}
      value={(phases ?? 1) === 1 ? current[0] : totalPower}
      unit={(phases ?? 1) === 1 ? "A" : "W"}
      bottomValues={phasesOverview}
      decimalPlaces={(phases ?? 1) === 1 ? 1 : 0}
    />
  )
}

interface Props {
  acLoads: AcLoadsState
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default EnergyAC
