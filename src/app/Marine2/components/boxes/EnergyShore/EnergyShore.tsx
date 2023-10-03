import React from "react"
import { useActiveInValues, useActiveSource } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react-lite"
import ShorePowerIcon from "../../../images/icons/shore-power.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { phaseUnitFor } from "../../../utils/formatters/phase/phase-unit-for"
import { phaseValueFor } from "../../../utils/formatters/phase/phase-value-for"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { usePhasesData } from "../../../utils/hooks/use-phases-data"
import { ISize } from "@m2Types/generic/size"

const EnergyShore = ({ componentMode = "compact", inputId, compactBoxSize }: Props) => {
  const { current, power, voltage } = useActiveInValues()
  const { activeInput, phases } = useActiveSource()
  const unplugged = activeInput + 1 !== inputId // Active in = 0 -> AC1 is active
  const phasesData = usePhasesData(phases, voltage, current, power, unplugged)
  const status = unplugged ? "unplugged" : "active"

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={ShorePowerIcon}
        title={translate("boxes.shorePower")}
        subtitle={unplugged ? translate("common.unplugged") : undefined}
        value={phaseValueFor(phases, current, power)}
        unit={phaseUnitFor(phases)}
        boxSize={compactBoxSize}
        status={status}
      />
    )
  }

  return (
    <ValueBox
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<ShorePowerIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />}
      title={translate("boxes.shorePower")}
      value={phaseValueFor(phases, current, power)}
      unit={phaseUnitFor(phases)}
      bottomValues={phasesData}
      status={status}
    />
  )
}

interface Props {
  inputId: number
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

export default observer(EnergyShore)
