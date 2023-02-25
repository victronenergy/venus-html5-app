import { useInputLimit, useInputLimitSelector, useInverterCharger, useShorePowerInput } from "@elninotech/mfd-modules"
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

const InverterCharger = ({ componentMode = "compact" }: Props) => {
  const InputLimitValue = ({ inputId }: InputProps) => {
    const { currentLimit } = useInputLimit(inputId)
    return <>{!!currentLimit ? Number(currentLimit) : 0}</>
  }

  const InputLimitSelector = ({ inputId }: InputProps) => {
    const USAmperage = [10, 15, 20, 30, 50, 100]
    const EUAmperage = [6, 10, 13, 16, 25, 32, 63]

    /**
     * - Mask the Product id with `0xFF00`
     * - If the result is `0x1900` or `0x2600` it is an EU model (230VAC)
     * - If the result is `0x2000` or `0x2700` it is an US model (120VAC)
     */

    const getSuggestedAmperageValuesList = (productId: number) => {
      const result = productId & 0xff00
      if (result === 0x1900 || result === 0x2600) {
        return EUAmperage
      } else if (result === 0x2000 || result === 0x2700) {
        return USAmperage
      } else {
        console.log(`Could not determine amperage US/EU for product id ${productId}`)
        return USAmperage
      }
    }

    const { currentLimitIsAdjustable } = useInputLimit(inputId)
    const { currentLimit, currentLimitMax, productId, updateLimit } = useInputLimitSelector(inputId)
    const amperageList = getSuggestedAmperageValuesList(productId).filter((value) => {
      return value <= (currentLimitMax ?? 100)
    })

    const [limitForSubmission, setLimitForSubmission] = useState(Number(currentLimit))

    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false)

    useEffect(() => {
      setLimitForSubmission(Number(currentLimit))
    }, [currentLimit])

    const closeLimitModal = () => {
      setIsLimitModalOpen(false)
      setModeForSubmission(Number(currentLimit))
    }

    const submitLimit = () => {
      updateLimit(limitForSubmission)
      closeLimitModal()
    }

    if (!currentLimitIsAdjustable) return null
    return (
      <>
        <Button className="w-full mr-4" size="md" onClick={() => setIsLimitModalOpen(!isModeModalOpen)}>
          {!!currentLimit ? Number(currentLimit) : 0}
        </Button>
        <DeviceSettingModal open={isLimitModalOpen} onClose={closeLimitModal} onSet={submitLimit} width={"lg"}>
          <label className="flex w-full justify-center text-xl mb-3">{translate("devices.Input current limit")}</label>
          <div className="flex flex-row justify-center mt-10">
            <button className="w-36 h-20 bg-victron-blue/70 border-0 rounded-md text-3xl mr-14">-</button>
            <div
              className={classnames("w-32 flex flex-row pr-2 items-center", {
                "text-8xl": isFullHeight,
                "text-4xl md:text-6xl lg:text-6xl": !isFullHeight,
              })}
            >
              <div>{limitForSubmission ?? 0}</div>
              <div className={"text-victron-gray/70 pl-1"}>A</div>
            </div>
            <button className="w-36 h-20 bg-victron-blue/70 border-0 rounded-md text-3xl ml-14">+</button>
          </div>
          <div className="flex w-full justify-center mt-10 mb-12">
            <div className="w-[33rem] h-12 bg-victron-blue/30 border-2 border-victron-blue rounded-md flex flex-row justify-between">
              {amperageList.map((value) => (
                <button
                  style={{ width: `${33 / amperageList.length}rem` }}
                  className={classnames("h-12 flex justify-center items-center -mt-0.5", {
                    " text-2xl": amperageList.length === 8,
                    " text-3xl": amperageList.length === 7,
                    " bg-victron-blue rounded-md": value === limitForSubmission,
                  })}
                  onClick={() => {
                    setLimitForSubmission(value)
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </DeviceSettingModal>
      </>
    )
  }

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
              "text-8xl": isFullHeight,
              "text-4xl md:text-6xl lg:text-6xl": !isFullHeight,
            })}
          >
            <div>{!!inputId ? <InputLimitValue inputId={inputId} /> : 0}</div>
            <div className={"text-victron-gray/70 pl-1"}>A</div>
          </div>
          <div
            className={classnames("text-victron-gray/70", {
              "text-4xl": isFullHeight,
              "text-2xl md:text-3xl lg:text-3xl": !isFullHeight,
            })}
          >
            {subTitle}
          </div>
        </div>
        <div className={"flex flex-row"}>
          {!!inputId && <InputLimitSelector inputId={inputId} />}
          <DeviceSettingModal open={isModeModalOpen} onClose={closeModeModal} onSet={submitMode}>
            <label className="flex w-full justify-center text-xl mb-3">{translate("common.mode")}</label>
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
          <Button className="w-full" size="md" onClick={() => setIsModeModalOpen(!isModeModalOpen)}>
            {inverterChargerModeFormatter(parseInt(mode))}
          </Button>
          <DeviceSettingModal open={false} onClose={closeModeModal} onSet={submitMode}>
            <label className="flex w-full justify-center text-xl mb-3">{translate("common.mode")}</label>
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

interface InputProps {
  inputId: number
}

export default observer(InverterCharger)
