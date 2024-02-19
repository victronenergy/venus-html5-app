import { observer } from "mobx-react-lite"
import { useHumidity } from "@victronenergy/mfd-modules"
import ValueOverview from "../../ui/ValueOverview"
import HumidityIcon from "../../../images/icons/humidity.svg"
import ValueBox from "../../ui/ValueBox"
import { translate } from "react-i18nify"
import { useContext, useEffect, useCallback } from "react"
import { VisibleComponentsContext } from "./EnvironmentOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { AdditionalInformation } from "../GeneratorFp/AdditionalInformation/AdditionalInformation"
import { ISize } from "@m2Types/generic/size"

interface Props {
  dataId: number
  componentMode?: ComponentMode
  boxSize: ISize
}

const HumidityData = ({ dataId, componentMode, boxSize }: Props) => {
  const { humidity, customName } = useHumidity(dataId)
  const { passVisibility } = useContext(VisibleComponentsContext)

  const handlePassVisibility = useCallback(
    (id: number, isVisible: boolean) => {
      passVisibility(id, "humidity", isVisible)
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
      title={`${translate("boxes.humidity")} ${customName}`}
      icon={<HumidityIcon className="w-5" />}
      value={humidity}
      bottomValues={[]}
      unit="%"
    >
      {humidity > 80 && <AdditionalInformation values={[{ label: translate("common.high") }]} />}
    </ValueBox>
  )
}

export default observer(HumidityData)
