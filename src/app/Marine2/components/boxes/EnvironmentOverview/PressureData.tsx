import { observer } from "mobx-react-lite"
import { usePressure } from "@victronenergy/mfd-modules"
import ValueOverview from "../../ui/ValueOverview"
import PressureIcon from "../../../images/icons/pressure.svg"
import ValueBox from "../../ui/ValueBox"
import { translate } from "react-i18nify"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"

interface Props {
  dataId: number
  componentMode?: ComponentMode
  boxSize: ISize
}

const PressureData = ({ dataId, componentMode, boxSize }: Props) => {
  const { pressure, customName } = usePressure(dataId)

  if (pressure === undefined) {
    return null
  }

  if (componentMode === "compact") {
    return (
      <ValueOverview
        Icon={PressureIcon}
        title={customName || translate("boxes.pressure")}
        value={pressure}
        boxSize={boxSize}
        unit={"hPa"}
        valueType={"environment"}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.pressure") + " " + customName}
      icon={<PressureIcon className="w-6" />}
      value={pressure}
      bottomValues={[]}
      unit="hPa"
    />
  )
}

export default observer(PressureData)
