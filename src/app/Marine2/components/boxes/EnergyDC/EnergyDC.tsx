import { DcLoadsState } from "@elninotech/mfd-modules"
import DCIcon from "../../../images/icons/dc.svg"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"

const EnergyDC = ({ mode = "compact", dcLoads, compactBoxSize }: Props) => {
  const { power, voltage, current } = dcLoads

  if (isNaN(power) || isNaN(voltage)) {
    return <></>
  }

  if (mode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={DCIcon}
        title={translate("boxes.dcLoads")}
        value={current}
        unit={"A"}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.dcLoads")}
      /* todo: fix types for svg */
      /* @ts-ignore */
      Icon={DCIcon}
      value={current}
      unit={"A"}
      bottomValues={[[{ value: power, unit: "W" }]]}
    />
  )
}

interface Props {
  dcLoads: DcLoadsState
  mode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default EnergyDC
