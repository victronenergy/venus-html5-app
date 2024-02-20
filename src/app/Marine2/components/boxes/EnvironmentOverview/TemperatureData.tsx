import { observer } from "mobx-react-lite"
import { useTemperature } from "@victronenergy/mfd-modules"
import ValueOverview from "../../ui/ValueOverview"
import ThermometerIcon from "../../../images/icons/thermometer.svg"
import ValueBox from "../../ui/ValueBox"
import { translate } from "react-i18nify"
import { useCallback, useContext, useEffect } from "react"
import { VisibleComponentsContext } from "./EnvironmentOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"

interface Props {
  dataId: number
  componentMode?: ComponentMode
  boxSize: ISize
}

const TemperatureData = ({ dataId, componentMode, boxSize }: Props) => {
  const { temperature, customName } = useTemperature(dataId)
  const { passVisibility } = useContext(VisibleComponentsContext)

  const handlePassVisibility = useCallback(
    (id: number, isVisible: boolean) => {
      passVisibility(id, "temperature", isVisible)
    },
    [passVisibility]
  )

  useEffect(() => {
    if (temperature !== undefined) {
      handlePassVisibility(dataId, true)
    } else {
      handlePassVisibility(dataId, false)
    }
  }, [temperature, customName, dataId, handlePassVisibility])

  if (temperature === undefined) {
    return null
  }

  if (componentMode === "compact") {
    return (
      <ValueOverview
        Icon={ThermometerIcon}
        title={customName || translate("boxes.temperature")}
        value={temperature}
        boxSize={boxSize}
        unit="°C"
        valueType="environment"
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.temperature") + " " + customName}
      icon={<ThermometerIcon className="w-5" />}
      value={temperature}
      bottomValues={[]}
      unit="°C"
    />
  )
}

export default observer(TemperatureData)
