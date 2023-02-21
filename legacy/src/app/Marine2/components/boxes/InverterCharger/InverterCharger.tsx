import {
  InverterInstanceId,
  useInputLimit,
  useInverter,
  useInverterCharger,
  useShorePowerInput,
} from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import { translate } from "react-i18nify"
import { SYSTEM_MODE } from "../../../utils/constants"
import { formatStateForTranslation } from "../../../utils/format"
import DeviceCompact from "../DeviceCompact"

const InverterChargerDefinedInput = ({ componentMode = "compact", inputId, title, subTitle }: InverterChargerProps) => {
  const { currentLimit, currentLimitIsAdjustable } = useInputLimit(inputId)

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
        title={title}
        subTitle={subTitle}
        value={!!currentLimit ? Number(currentLimit) : 0}
        unit={"A"}
      />
    )
  }
  return <></>
}

const InverterCharger = ({ componentMode = "compact" }: Props) => {
  const inverterChargerModeFormatter = (value: number) => {
    switch (value) {
      case SYSTEM_MODE.CHARGER_ONLY:
        return translate("common.chargerOnly")
      case SYSTEM_MODE.INVERTER_ONLY:
        return translate("common.on")
      default:
        return ""
    }
  }

  const { inputId } = useShorePowerInput()

  const { state, mode, customName, productName, modeIsAdjustable, updateMode } = useInverterCharger()
  const adjustable = modeIsAdjustable === 1

  const productNameShort = productName && productName.split(" ")[0]

  const inverterChargerState =
    !!state || parseInt(state) === 0 ? translate(formatStateForTranslation(Number(state))) : ""
  const subTitle = (!adjustable ? inverterChargerModeFormatter(parseInt(mode)) + " - " : "") + inverterChargerState

  if (!!inputId) {
    return (
      <InverterChargerDefinedInput
        componentMode={componentMode}
        inputId={inputId}
        title={customName || productNameShort}
        subTitle={subTitle}
      />
    )
  }

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
        title={customName || productNameShort}
        subTitle={subTitle}
        value={0}
        unit={"A"}
      />
    )
  }

  return <div className={"flex flex-row items-center justify-between w-full"}></div>
}

interface Props {
  componentMode?: "compact" | "full"
}

interface InverterChargerProps {
  inputId: number
  componentMode?: "compact" | "full"
  title: string
  subTitle: string | false
}

export default observer(InverterCharger)
