import { observer } from "mobx-react-lite"
import { useTemperature } from "@victronenergy/mfd-modules"
import ValueOverview from "../../ui/ValueOverview"
import ThermometerIcon from "../../../images/icons/thermometer.svg"
import ValueBox from "../../ui/ValueBox"
import { translate } from "react-i18nify"
import { useContext, useEffect, useCallback } from "react"
import { VisibleComponentsContext } from "./EnvironmentOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"

interface Props {
  dataId: number
  componentMode?: ComponentMode
  boxSize: { width: number; height: number }
}

const TemperatureData = ({ dataId, componentMode, boxSize }: Props) => {
  const { temperature, customName } = useTemperature(dataId)
  const { passVisibility } = useContext(VisibleComponentsContext)

  const handlePassVisibility = useCallback(
    (id: number, isVisible: boolean) => {
      passVisibility(id, isVisible)
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
        /* @ts-ignore */
        Icon={ThermometerIcon}
        title={customName || translate("boxes.temperature")}
        value={temperature}
        boxSize={boxSize}
        unit={"°C"}
        valueType={"environment"}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.temperature") + " " + customName}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<ThermometerIcon className="w-5" />}
      value={temperature}
      bottomValues={[]}
      unit="°C"
    />
  )
}

export default observer(TemperatureData)
