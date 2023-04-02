import { observer } from "mobx-react-lite"
import { useTemperature } from "@elninotech/mfd-modules"
import { useEffect } from "react"
import ValueOverview from "../../ui/ValueOverview"
import ThermometerIcon from "../../../images/icons/thermometer.svg"
import ValueBox from "../../ui/ValueBox"
import { translate } from "react-i18nify"


interface Props {
  dataId: number
  mode?: "compact" | "full"
  boxSize: { width: number; height: number }
}

const TemperatureData = ({ dataId, mode, boxSize }: Props) => {
  const { temperature, customName } = useTemperature(dataId)

  if (temperature === undefined || customName === undefined) {
    return null
  }

  if (mode === "compact") {
    return (
      <ValueOverview
        /* @ts-ignore */
        Icon={ThermometerIcon}
        title={customName}
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
      icon={<ThermometerIcon className={"w-5"} />}
      value={temperature}
      bottomValues={[]}
      unit={"°C"}
    />
  )
}

export default observer(TemperatureData)
