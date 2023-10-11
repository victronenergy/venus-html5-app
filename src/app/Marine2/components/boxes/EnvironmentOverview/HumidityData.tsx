import { observer } from "mobx-react-lite"
import { useHumidity } from "@victronenergy/mfd-modules"
import ValueOverview from "../../ui/ValueOverview"
import HumidityIcon from "../../../images/icons/humidity.svg"
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

const HumidityData = ({ dataId, componentMode, boxSize }: Props) => {
  const { humidity, customName } = useHumidity(dataId)
  const { passVisibility } = useContext(VisibleComponentsContext)

  const handlePassVisibility = useCallback(
    (id: number, isVisible: boolean) => {
      passVisibility(id, isVisible)
    },
    [passVisibility]
  )

  useEffect(() => {
    if (humidity !== undefined) {
      handlePassVisibility(dataId, true)
    } else {
      handlePassVisibility(dataId, false)
    }
  }, [humidity, customName, dataId, handlePassVisibility])

  if (humidity === undefined) {
    return null
  }

  if (componentMode === "compact") {
    return (
      <ValueOverview
        /* @ts-ignore */
        Icon={HumidityIcon}
        title={customName || translate("boxes.humidity")}
        value={humidity}
        boxSize={boxSize}
        unit="%"
        valueType="environment"
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.humidity") + " " + customName}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<HumidityIcon className="w-5" />}
      value={humidity}
      bottomValues={[]}
      unit="%"
    >
      <div className="text-base">{humidity! > 80 ? translate("common.high") : ""}</div>
      <div className="text-base">{humidity! > 80 ? translate("common.high") : ""}</div>
    </ValueBox>
  )
}

export default observer(HumidityData)
