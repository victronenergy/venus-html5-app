import { InverterInstanceId, useInverter } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import { translate } from "react-i18nify"
import { INVERTER_MODE } from "../../../utils/constants"
import { formatStateForTranslation } from "../../../utils/format"
import DeviceCompact from "../DeviceCompact"

const Inverter = ({ instanceId, isVebusInverter, componentMode = "compact" }: Props) => {
  const source = isVebusInverter ? "vebus" : "inverter"
  let { state, mode, voltage, current, power, customName, productName, nAcInputs, updateMode } = useInverter(
    instanceId,
    source
  )

  // if nAcInputs === 0 it means it's an inverter, if not it's an inverter/charger => skip
  const show = !isVebusInverter || nAcInputs === 0
  // Vebus inverters use mode 3 instead of 2 for ON.
  const onMode = isVebusInverter ? INVERTER_MODE.VEBUS_ON : INVERTER_MODE.ON

  const productNameShort = productName && productName.split(" ")[0]
  const currentValue = (!!current || current === 0) && current.toFixed(1.0)
  const inverterState = (!!state || state === 0) && translate(formatStateForTranslation(Number(state)))

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
        subTitle={inverterState}
        value={currentValue}
        unit={"A"}
      />
    )
  }

  return <div className={"flex flex-row items-center justify-between w-full"}></div>
}

interface Props {
  instanceId: InverterInstanceId
  isVebusInverter: boolean
  componentMode?: "compact" | "full"
}

export default observer(Inverter)
