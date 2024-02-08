import AlternatorIcon from "../../../images/icons/alternator.svg"
import { useAlternator } from "@victronenergy/mfd-modules"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { ISize } from "@m2Types/generic/size"

interface Props {
  alternator: number
  showInstance: boolean
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const EnergyAlternator = ({ componentMode = "compact", alternator, showInstance, compactBoxSize }: Props) => {
  const { current, voltage } = useAlternator(alternator)
  const instance = showInstance ? ` [${alternator}]` : ""
  const power = current * voltage

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        Icon={AlternatorIcon}
        title={translate("boxes.alternator")}
        value={current}
        unit="A"
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.alternator") + instance}
      icon={<AlternatorIcon className={responsiveBoxIcon} />}
      value={current}
      unit="A"
      bottomValues={[[{ value: power, unit: "W" }]]}
    />
  )
}

export default EnergyAlternator
