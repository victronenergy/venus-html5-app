import { observer } from "mobx-react-lite"
import { usePressure } from "@victronenergy/mfd-modules"
import ValueOverview from "../../ui/ValueOverview"
import PressureIcon from "../../../images/icons/pressure.svg"
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

const PressureData = ({ dataId, componentMode, boxSize }: Props) => {
  const { pressure, customName } = usePressure(dataId)

  const { passVisibility } = useContext(VisibleComponentsContext)

  const handlePassVisibility = useCallback(
    (id: number, isVisible: boolean) => {
      passVisibility(id, isVisible)
    },
    [passVisibility]
  )

  useEffect(() => {
    if (pressure !== undefined) {
      handlePassVisibility(dataId, true)
    } else {
      handlePassVisibility(dataId, false)
    }
  }, [pressure, customName, dataId, handlePassVisibility])

  if (pressure === undefined) {
    return null
  }

  if (componentMode === "compact") {
    return (
      <ValueOverview
        /* @ts-ignore */
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
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<PressureIcon className="w-6" />}
      value={pressure}
      bottomValues={[]}
      unit="hPa"
    />
  )
}

export default observer(PressureData)
