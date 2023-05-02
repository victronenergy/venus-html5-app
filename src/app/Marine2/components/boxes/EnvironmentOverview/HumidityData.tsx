import { observer } from "mobx-react-lite"
import { useHumidity } from "@elninotech/mfd-modules"
import ValueOverview from "../../ui/ValueOverview"
import HumidityIcon from "../../../images/icons/humidity.svg"
import ValueBox from "../../ui/ValueBox"
import { translate } from "react-i18nify"
import { useContext, useEffect } from "react"
import { VisibleComponentsContext } from "./EnvironmentOverview"

interface Props {
  dataId: number
  mode?: "compact" | "full"
  boxSize: { width: number; height: number }
}

const HumidityData = ({ dataId, mode, boxSize }: Props) => {
  const { humidity, customName } = useHumidity(dataId)
  const { passVisibility } = useContext(VisibleComponentsContext)

  useEffect(() => {
    if (humidity !== undefined && customName !== undefined) {
      passVisibility(dataId, true)
    } else {
      passVisibility(dataId, false)
    }
  }, [humidity, customName, dataId, passVisibility])

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
      <div className="text-base">{humidity! > 80 ? translate("common.high") : ""}</div>
      <div className="text-base">{humidity! > 80 ? translate("common.high") : ""}</div>
    </ValueBox>
  )
}

export default observer(HumidityData)
