import AlternatorIcon from "../../../images/icons/alternator.svg"
import { useAlternator, useAppStore } from "@victronenergy/mfd-modules"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { ISize } from "@m2Types/generic/size"
import { valueFor } from "app/Marine2/utils/formatters/phase/phase-value-for"
import { unitFor } from "app/Marine2/utils/formatters/phase/phase-unit-for"
import { observer } from "mobx-react"

interface Props {
  alternator: number
  showInstance: boolean
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const EnergyAlternator = ({ componentMode = "compact", alternator, showInstance, compactBoxSize }: Props) => {
  const { electricalPowerIndicator } = useAppStore()
  const { current, voltage, customName } = useAlternator(alternator)
  const instance = showInstance ? ` [${alternator}]` : ""
  const power = current * voltage

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        Icon={AlternatorIcon}
        title={customName || translate("boxes.alternator")}
        value={valueFor(current, power, electricalPowerIndicator)}
        unit={unitFor(electricalPowerIndicator)}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={customName || translate("boxes.alternator") + instance}
      icon={<AlternatorIcon className={responsiveBoxIcon} />}
      value={valueFor(current, power, electricalPowerIndicator)}
      unit={unitFor(electricalPowerIndicator)}
      bottomValues={[
        [
          { value: voltage, unit: "V", hideDecimal: true },
          { value: current, unit: "A", hideDecimal: true },
          { value: power, unit: "W", hideDecimal: true },
        ],
      ]}
    />
  )
}

export default observer(EnergyAlternator)
