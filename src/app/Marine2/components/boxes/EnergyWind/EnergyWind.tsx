import { ReactComponent as WindIcon } from "../../../images/icons/wind.svg"
import { useAppStore, useWindGenerator } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { ISize } from "@m2Types/generic/size"
import { valueFor } from "app/Marine2/utils/formatters/phase/phase-value-for"
import { unitFor } from "app/Marine2/utils/formatters/phase/phase-unit-for"

interface Props {
  windGenerator: number
  showInstance: boolean
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const EnergyWind = ({ componentMode = "compact", windGenerator, showInstance, compactBoxSize }: Props) => {
  const { electricalPowerIndicator } = useAppStore()
  const { current, voltage } = useWindGenerator(windGenerator)

  const power = current * voltage
  const instance = showInstance ? ` [${windGenerator}]` : ""

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        Icon={WindIcon}
        title={translate("boxes.windGenerator")}
        value={valueFor(current, power, electricalPowerIndicator)}
        unit={unitFor(electricalPowerIndicator)}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.windGenerator") + instance}
      icon={<WindIcon className={responsiveBoxIcon} />}
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

export default observer(EnergyWind)
