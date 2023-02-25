import { useInverterCharger, useShorePowerInput } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import { translate } from "react-i18nify"
import { SYSTEM_MODE } from "../../../utils/constants"
import { formatStateForTranslation } from "../../../utils/format"
import DeviceCompact from "../DeviceCompact"
import Box from "../../ui/Box"
import classnames from "classnames"
import { useComponentSize, useWindowSize } from "../../../utils/hooks"
import { useEffect, useRef, useState } from "react"
import Button from "../../ui/Button"
import RadioButton from "../../ui/RadioButton"
import DeviceSettingModal from "../../ui/DeviceSettingModal"
import InputLimitValue from "../../ui/InputLimitValue"
import InputLimitSelector from "../../ui/InputLimitSelector"

const InverterCharger = ({ componentMode = "compact" }: Props) => {
  const inverterChargerModeFormatter = (value: number) => {
    switch (value) {
      case SYSTEM_MODE.CHARGER_ONLY:
        return translate("common.chargerOnly")
      case SYSTEM_MODE.INVERTER_ONLY:
        return translate("common.inverterOnly")
      case SYSTEM_MODE.ON:
        return translate("common.on")
      case SYSTEM_MODE.OFF:
        return translate("common.off")
      default:
        return ""
    }
  }

  const parentRef = useRef<HTMLDivElement>(null)
  const componentSize = useComponentSize(parentRef)
  const windowSize = useWindowSize()
  const [isFullHeight, setFullHeight] = useState<boolean>(false)

  useEffect(() => {
    if (!windowSize || !componentSize) return
    if (windowSize.height !== undefined && componentSize.height < windowSize.height / 2) {
      setFullHeight(false)
    } else {
      setFullHeight(true)
    }
  }, [windowSize, componentSize])

  const { inputId } = useShorePowerInput()

  const { state, mode, customName, productName, modeIsAdjustable, updateMode } = useInverterCharger()
  const adjustable = modeIsAdjustable === 1

  const productNameShort = productName && productName.split(" ")[0]

  const inverterChargerState =
    !!state || parseInt(state) === 0 ? translate(formatStateForTranslation(Number(state))) : ""
  const subTitle = (!adjustable ? inverterChargerModeFormatter(parseInt(mode)) + " - " : "") + inverterChargerState

  const [isModeModalOpen, setIsModeModalOpen] = useState(false)
  const [modeForSubmission, setModeForSubmission] = useState(Number(mode))

  useEffect(() => {
    setModeForSubmission(Number(mode))
  }, [mode])

  const closeModeModal = () => {
    setIsModeModalOpen(false)
    setModeForSubmission(Number(mode))
  }

  const submitMode = () => {
    updateMode(modeForSubmission)
    closeModeModal()
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
        value={!!inputId ? <InputLimitValue inputId={inputId} /> : 0}
        unit={"A"}
      />
    )
  }

  return (
    <Box
      title={productName}
      icon={
        <InverterChargerIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className={"w-7"}
        ></InverterChargerIcon>
      }
    >
      <div className={"w-full h-full flex flex-col justify-between"} ref={parentRef}>
        <div className={""}>
          <div
            className={classnames("flex flex-row pr-2", {
              "text-4xl": isFullHeight,
              "text-2xl md:text-3xl lg:text-3xl": !isFullHeight,
            })}
          >
            <div>{!!inputId ? <InputLimitValue inputId={inputId} /> : 0}</div>
            <div className={"text-victron-gray/70 pl-1"}>A</div>
          </div>
          <div
            className={classnames("text-victron-gray/70", {
              "text-2xl": isFullHeight,
              "text-lg md:text-xl lg:text-xl": !isFullHeight,
            })}
          >
            {subTitle}
          </div>
        </div>
        <div className={"flex flex-row"}>
          {!!inputId && <InputLimitSelector inputId={inputId} />}
          <Button className="w-full" size="md" onClick={() => setIsModeModalOpen(!isModeModalOpen)}>
            {inverterChargerModeFormatter(parseInt(mode))}
          </Button>
          <DeviceSettingModal open={isModeModalOpen} onClose={closeModeModal} onSet={submitMode}>
            <label className="flex w-full justify-center text-lg mb-3">{translate("common.mode")}</label>
            <label
              className="flex justify-between items-center pt-2 pb-4 sm-m:pb-6 sm-l:pb-8"
              onClick={() => setModeForSubmission(SYSTEM_MODE.ON)}
            >
              <span>{translate("common.on")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(SYSTEM_MODE.ON)}
                selected={modeForSubmission === SYSTEM_MODE.ON}
                size={"lg"}
              />
            </label>
            <label
              className="flex justify-between items-center pt-2 pb-4 sm-m:pb-6 sm-l:pb-8"
              onClick={() => setModeForSubmission(SYSTEM_MODE.OFF)}
            >
              <span>{translate("common.off")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(SYSTEM_MODE.OFF)}
                selected={modeForSubmission === SYSTEM_MODE.OFF}
                size={"lg"}
              />
            </label>
            <label
              className="flex justify-between items-center pt-2 pb-4 sm-m:pb-6 sm-l:pb-8"
              onClick={() => setModeForSubmission(SYSTEM_MODE.CHARGER_ONLY)}
            >
              <span>{translate("common.chargerOnly")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(SYSTEM_MODE.CHARGER_ONLY)}
                selected={modeForSubmission === SYSTEM_MODE.CHARGER_ONLY}
                size={"lg"}
              />
            </label>
            <label
              className="flex justify-between items-center pt-2 pb-4 sm-m:pb-6 sm-l:pb-8"
              onClick={() => setModeForSubmission(SYSTEM_MODE.INVERTER_ONLY)}
            >
              <span>{translate("common.inverterOnly")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(SYSTEM_MODE.INVERTER_ONLY)}
                selected={modeForSubmission === SYSTEM_MODE.INVERTER_ONLY}
                size={"lg"}
              />
            </label>
          </DeviceSettingModal>
        </div>
      </div>
    </Box>
  )
}

interface Props {
  componentMode?: "compact" | "full"
}

export default observer(InverterCharger)
