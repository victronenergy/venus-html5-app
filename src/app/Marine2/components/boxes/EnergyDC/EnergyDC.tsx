import { translate } from "react-i18nify"
import { DcLoadsState, useAppStore } from "@victronenergy/mfd-modules"
import DCIcon from "../../../images/icons/dc.svg"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { ISize } from "@m2Types/generic/size"
import { dcValueFor } from "app/Marine2/utils/formatters/phase/phase-value-for"
import { dcUnitFor } from "app/Marine2/utils/formatters/phase/phase-unit-for"
import { observer } from "mobx-react-lite"

interface Props {
  dcLoads: DcLoadsState
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const EnergyDC = ({ componentMode = "compact", dcLoads, compactBoxSize }: Props) => {
  const { electricalPowerIndicator } = useAppStore()
  const { power, voltage, current } = dcLoads

  if (isNaN(power) || isNaN(voltage)) {
    return <></>
  }

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        Icon={DCIcon}
        title={translate("boxes.dcLoads")}
        value={dcValueFor(current, power, electricalPowerIndicator)}
        unit={dcUnitFor(electricalPowerIndicator)}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.dcLoads")}
      icon={<DCIcon className={responsiveBoxIcon} />}
      value={dcValueFor(current, power, electricalPowerIndicator)}
      unit={dcUnitFor(electricalPowerIndicator)}
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

export default observer(EnergyDC)
