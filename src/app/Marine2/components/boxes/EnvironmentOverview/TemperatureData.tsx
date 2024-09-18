import { observer } from "mobx-react-lite"
import { useAppStore, useTemperature } from "@victronenergy/mfd-modules"
import ValueOverview from "../../ui/ValueOverview"
import ThermometerIcon from "../../../images/icons/thermometer.svg"
import ValueBox from "../../ui/ValueBox"
import { translate } from "react-i18nify"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import { temperatureValueFor } from "../../../utils/formatters/temperature/temperature-value-for"

interface Props {
  dataId: number
  componentMode?: ComponentMode
  boxSize: ISize
}

const TemperatureData = ({ dataId, componentMode, boxSize }: Props) => {
  const { temperature, customName } = useTemperature(dataId)
  const { temperatureUnitToHumanReadable, temperatureUnit } = useAppStore()

  if (temperature === undefined) {
    return null
  }

  if (componentMode === "compact") {
    return (
      <ValueOverview
        Icon={ThermometerIcon}
        title={customName || translate("boxes.temperature")}
        value={temperatureValueFor(temperature, temperatureUnit)}
        boxSize={boxSize}
        unit={temperatureUnitToHumanReadable}
        valueType="environment"
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.temperature") + " " + customName}
      icon={<ThermometerIcon className="w-5" />}
      value={temperatureValueFor(temperature, temperatureUnit)}
      bottomValues={[]}
      unit={temperatureUnitToHumanReadable}
    />
  )
}

export default observer(TemperatureData)
