import { DcLoadsState } from "@victronenergy/mfd-modules"
import DCIcon from "../../../images/icons/dc.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"

const EnergyDC = ({ componentMode = "compact", dcLoads, compactBoxSize }: Props) => {
  const { power, voltage, current } = dcLoads

  if (isNaN(power) || isNaN(voltage)) {
    return <></>
  }

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
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
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<DCIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />}
      value={current}
      unit="A"
      bottomValues={[[{ value: power, unit: "W", hideDecimal: true }]]}
    />
  )
}

interface Props {
  dcLoads: DcLoadsState
  componentMode?: ComponentMode
  compactBoxSize?: { width: number; height: number }
}

export default EnergyDC
