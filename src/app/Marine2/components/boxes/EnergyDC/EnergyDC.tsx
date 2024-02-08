import { translate } from "react-i18nify"import { translate } from "react-i18nify"
import { DcLoadsState } from "@victronenergy/mfd-modules"
import DCIcon from "../../../images/icons/dc.svg"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { ISize } from "@m2Types/generic/size"

interface Props {
  dcLoads: DcLoadsState
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const EnergyDC = ({ componentMode = "compact", dcLoads, compactBoxSize }: Props) => {
  const { power, voltage, current } = dcLoads

  if (isNaN(power) || isNaN(voltage)) {
    return <></>
  }

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        Icon={DCIcon}
        title={translate("boxes.dcLoads")}
        value={current}
        unit="A"
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.dcLoads")}
      icon={<DCIcon className={responsiveBoxIcon} />}
      value={current}
      unit="A"
      bottomValues={[[{ value: power, unit: "W", hideDecimal: true }]]}
    />
  )
}

export default EnergyDC
