import React from "react"
import { useActiveInValues, useActiveSource } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import ShorePowerIcon from "../../../images/icons/shore-power.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"

const EnergyShore = ({ mode = "compact", inputId, compactBoxSize }: Props) => {
  const { current, power, voltage } = useActiveInValues()
  const { activeInput, phases } = useActiveSource()
  const unplugged = activeInput + 1 !== inputId // Active in = 0 -> AC1 is active
  const totalPower = power.reduce((total, power) => (power ? total + power : total))

  const phasesOverview = []
  for (let phase = 0; phase < phases; phase++) {
    phasesOverview.push([
      { value: !unplugged ? voltage[phase] : undefined, unit: "V", decimalPlaces: 0 },
      { value: !unplugged ? current[phase] : undefined, unit: "A" },
      { value: !unplugged ? power[phase] : undefined, unit: "W", decimalPlaces: 0 },
    ])
  }

  if (mode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={ShorePowerIcon}
        title={translate("boxes.shorePower")}
        subtitle={unplugged ? translate("common.unplugged") : undefined}
        value={(phases ?? 1) === 1 ? current[0] : totalPower}
        unit={(phases ?? 1) === 1 ? "A" : "W"}
        decimalPlaces={(phases ?? 1) === 1 ? 1 : 0}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.shorePower")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<ShorePowerIcon className={"w-6"} />}
      value={!unplugged ? ((phases ?? 1) === 1 ? current[0] : totalPower) : undefined}
      unit={(phases ?? 1) === 1 ? "A" : "W"}
      bottomValues={phasesOverview}
      decimalPlaces={(phases ?? 1) === 1 ? 1 : 0}
    >
      <div>{unplugged && translate("common.unplugged")}</div>
    </ValueBox>
  )
}

interface Props {
  inputId: number
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default observer(EnergyShore)
