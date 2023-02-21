import { ChargerInstanceId, useCharger } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import { translate } from "react-i18nify"
import { CHARGER_MODE } from "../../../utils/constants"
import { formatStateForTranslation } from "../../../utils/format"
import DeviceCompact from "../DeviceCompact"

const Charger = ({ instanceId, componentMode = "compact" }: Props) => {
  const chargerModeFormatter = (value: number) => {
    switch (value) {
      case CHARGER_MODE.OFF:
        return translate("common.off")
      case CHARGER_MODE.ON:
        return translate("common.on")
      default:
        return translate("common.emptyBar")
    }
  }

  let {
    customName,
    nrOfOutputs = 3,
    productName,
    current,
    state,
    mode,
    currentLimit,
    updateMode,
    updateCurrentLimit,
  } = useCharger(instanceId)
  // When a topic is invalid, it returns undefined -> no value means topic is not supported
  const chargerSupportsMode = mode !== undefined
  const chargerSupportsInputLimit = currentLimit !== undefined
  const chargerMode = chargerModeFormatter(Number(mode))
  const currentValue = !!current && (!!current[0] || current[0] === 0) && current[0].toFixed(1.0)
  const chargerState = (!!state || state === 0) && translate(formatStateForTranslation(Number(state)))

  const productNameShort = productName && productName.split(" ")[0]

  if (componentMode === "compact") {
    return (
      <DeviceCompact
        icon={
          <InverterChargerIcon
            /* todo: fix types for svg */
            /* @ts-ignore */
            className={"w-7"}
          ></InverterChargerIcon>
        }
        title={productNameShort}
        subTitle={chargerState}
        value={currentValue}
        unit={"A"}
      />
    )
  }

  return <div className={"flex flex-row items-center justify-between w-full"}></div>
}

interface Props {
  instanceId: ChargerInstanceId
  componentMode?: "compact" | "full"
}

export default observer(Charger)
