import { useAppStore, useInverterCharger, useShorePowerInput } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react-lite"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import { translate } from "react-i18nify"
import { SYSTEM_MODE } from "../../../utils/constants"
import { formatStateForTranslation } from "../../../utils/format"
import { useEffect, useState } from "react"
import Button from "../../ui/Button"
import RadioButton from "../../ui/RadioButton"
import DeviceSettingModal from "../../ui/DeviceSettingModal"
import InputLimitValue from "../../ui/InputLimitValue"
import InputLimitSelector from "../../ui/InputLimitSelector"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"

const InverterCharger = ({ componentMode = "compact", compactBoxSize }: Props) => {
  const { locked } = useAppStore() // lock from theme settings
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

  const { inputId } = useShorePowerInput()

  const { state, mode, customName, productName, modeIsAdjustable, updateMode } = useInverterCharger()
  const adjustable = modeIsAdjustable === 1

  const productNameShort = customName || (productName && productName.split(" ")[0])

  const subTitle = !!state || parseInt(state) === 0 ? translate(formatStateForTranslation(Number(state))) : ""

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

  const getButtons = () => {
    const buttons = []
    if (!!inputId) {
      buttons.push(<InputLimitSelector inputId={inputId} title={productNameShort} />)
    }
    if (adjustable) {
      buttons.push(
        <Button disabled={locked} className="w-full" size="md" onClick={() => setIsModeModalOpen(!isModeModalOpen)}>
          {inverterChargerModeFormatter(parseInt(mode))}
        </Button>
      )
    }
    return buttons
  }

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={InverterChargerIcon}
        title={productNameShort}
        subtitle={subTitle}
        inputLimitValue={!!inputId ? <InputLimitValue inputId={inputId} /> : undefined}
        value={!inputId ? 0 : undefined}
        unit={"A"}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={productNameShort}
      icon={
        <InverterChargerIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className={"w-[18px] sm-s:w-[24px] sm-m:w-[32px]"}
        ></InverterChargerIcon>
      }
      value={subTitle}
      buttons={getButtons()}
      bottomValues={[]}
    >
      {(adjustable && (
        <DeviceSettingModal open={isModeModalOpen} onClose={closeModeModal} onSet={submitMode} width={"lg"}>
          <label className="flex justify-center text-lg mb-3">
            {productNameShort + " " + translate("common.mode")}
          </label>
          <div className={" m-auto w-[20rem] md:w-[30rem] lg:w-[30rem] flex flex-col items-center"}>
            <label
              className="w-full flex justify-between items-center pt-4 pb-4 border-b border-victron-darkGray-200"
              onClick={() => setModeForSubmission(SYSTEM_MODE.ON)}
            >
              <span>{translate("common.on")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(SYSTEM_MODE.ON)}
                selected={modeForSubmission === SYSTEM_MODE.ON}
                responsive={false}
              />
            </label>
            <label
              className="w-full flex justify-between items-center pt-4 pb-4 border-b border-victron-darkGray-200"
              onClick={() => setModeForSubmission(SYSTEM_MODE.OFF)}
            >
              <span>{translate("common.off")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(SYSTEM_MODE.OFF)}
                selected={modeForSubmission === SYSTEM_MODE.OFF}
                responsive={false}
              />
            </label>
            <label
              className="w-full flex justify-between items-center pt-4 pb-4 border-b border-victron-darkGray-200"
              onClick={() => setModeForSubmission(SYSTEM_MODE.CHARGER_ONLY)}
            >
              <span>{translate("common.chargerOnly")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(SYSTEM_MODE.CHARGER_ONLY)}
                selected={modeForSubmission === SYSTEM_MODE.CHARGER_ONLY}
                responsive={false}
              />
            </label>
            <label
              className="w-full flex justify-between items-center pt-4 pb-4 border-b border-victron-darkGray-200"
              onClick={() => setModeForSubmission(SYSTEM_MODE.INVERTER_ONLY)}
            >
              <span>{translate("common.inverterOnly")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(SYSTEM_MODE.INVERTER_ONLY)}
                selected={modeForSubmission === SYSTEM_MODE.INVERTER_ONLY}
                responsive={false}
              />
            </label>
          </div>
        </DeviceSettingModal>
      )) ||
        undefined}
    </ValueBox>
  )
}

interface Props {
  componentMode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default observer(InverterCharger)
