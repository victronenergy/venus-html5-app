import { observer } from "mobx-react-lite"
import { useHumidity } from "@elninotech/mfd-modules"
import { useEffect } from "react"
import ValueOverview from "../../ui/ValueOverview"
import HumidityIcon from "../../../images/icons/humidity.svg"
import ValueBox from "../../ui/ValueBox"
import { translate } from "react-i18nify"

interface Props {
  dataId: number
  mode?: "compact" | "full"
  boxSize: { width: number; height: number }
}

const HumidityData = ({ dataId, mode, boxSize }: Props) => {
  const { humidity, customName } = useHumidity(dataId)

  if (humidity === undefined || customName === undefined) {
    return null
  }

  if (mode === "compact") {
    return (
      <ValueOverview
        /* @ts-ignore */
        Icon={HumidityIcon}
        title={customName}
        value={humidity}
        boxSize={boxSize}
        unit={"%"}
        valueType={"environment"}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.humidity") + " " + customName}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<HumidityIcon className={"w-5"} />}
      value={humidity}
      bottomValues={[]}
      unit={"%"}
    >
      <div className="text-base">{humidity > 80 ? translate("common.high") : ""}</div>
    </ValueBox>
  )
}

export default observer(HumidityData)
