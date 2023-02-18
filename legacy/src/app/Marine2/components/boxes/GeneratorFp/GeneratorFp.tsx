import { useGeneratorFp, useGensetValues } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import GeneratorIcon from "../../../images/icons/generator.svg"
import { GENSET_STATE } from "../../../utils/constants"
import { translate } from "react-i18nify"
import { formatPower } from "../../../utils/format"
import DeviceCompact from "../DeviceCompact"

const GeneratorFp = ({ mode = "compact" }: Props) => {
  const gensetStateFormatter = (value: number) => {
    if (value === GENSET_STATE.STANDBY) {
      return translate("common.standby")
    } else if (GENSET_STATE.STARTING.includes(value)) {
      return translate("common.standby")
    } else if (value === GENSET_STATE.RUNNING) {
      return translate("common.running")
    } else if (value === GENSET_STATE.STOPPING) {
      return translate("common.stopping")
    } else if (value === GENSET_STATE.ERROR) {
      return translate("common.error")
    } else {
      return translate("common.notAvailable")
    }
  }

  const { productId, productName, phases, statusCode, gensetAutoStart, autoStart, updateAutoMode, updateManualMode } =
    useGeneratorFp()
  const { voltage, current, power, frequency, coolant, winding, exhaust } = useGensetValues()
  // When a topic is invalid, it returns undefined -> no value means topic is not supported
  const title = productName || "Genset"
  const subTitle = (!!statusCode || statusCode === 0) && gensetStateFormatter(Number(statusCode))
  const isAutoStartDisabled = gensetAutoStart === 0
  const powerSum = power.reduce((sum: number, b) => {
    return b ? sum + b : sum
  }, 0)
  const powerFormatted = formatPower(powerSum)
  const unit = powerSum > 1000 ? "kW" : "W"
  if (!phases) {
    return <></>
  }

  if (mode === "compact") {
    return (
      <DeviceCompact
        icon={
          <GeneratorIcon
            /* todo: fix types for svg */
            /* @ts-ignore */
            className={"w-7"}
          ></GeneratorIcon>
        }
        title={title}
        subTitle={subTitle}
        value={powerFormatted}
        unit={unit}
      />
    )
  }

  return <div className={"flex flex-row items-center justify-between w-full"}></div>
}

interface Props {
  mode?: "compact" | "full"
}

export default observer(GeneratorFp)
