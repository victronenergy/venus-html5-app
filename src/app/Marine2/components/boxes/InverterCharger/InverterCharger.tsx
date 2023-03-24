import { useInverterCharger, useShorePowerInput } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import { translate } from "react-i18nify"
import { SYSTEM_MODE } from "../../../utils/constants"
import { formatStateForTranslation } from "../../../utils/format"
import DeviceCompact from "../DeviceCompact"
import { useEffect, useState } from "react"
import Button from "../../ui/Button"
import RadioButton from "../../ui/RadioButton"
import DeviceSettingModal from "../../ui/DeviceSettingModal"
import InputLimitValue from "../../ui/InputLimitValue"
import InputLimitSelector from "../../ui/InputLimitSelector"
import ValueBox from "../../ui/ValueBox"

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

  const { inputId } = useShorePowerInput()

  const { state, mode, customName, productName, modeIsAdjustable, updateMode } = useInverterCharger()
  const adjustable = modeIsAdjustable === 1

  const productNameShort = productName && productName.split(" ")[0]

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
      buttons.push(<InputLimitSelector inputId={inputId} />)
    }
    if (adjustable) {
      buttons.push(
        <Button className="w-full" size="md" onClick={() => setIsModeModalOpen(!isModeModalOpen)}>
          {inverterChargerModeFormatter(parseInt(mode))}
        </Button>
      )
    }
    return buttons
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
    <ValueBox
      title={productName}
      icon={
        <InverterChargerIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className={"w-7"}
        ></InverterChargerIcon>
      }
      value={subTitle}
      buttons={getButtons()}
      bottomValues={[]}
    >
      {(adjustable && (
        <DeviceSettingModal open={isModeModalOpen} onClose={closeModeModal} onSet={submitMode} width={"lg"}>
          <label className="flex justify-center text-lg mb-3">{translate("common.mode")}</label>
          <div className={" m-auto w-[20rem] md:w-[30rem] lg:w-[30rem] flex flex-col items-center"}>
            <label
              className="w-full flex justify-between items-center pt-4 pb-4 border-b border-victron-darkGray-2"
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
              className="w-full flex justify-between items-center pt-4 pb-4 border-b border-victron-darkGray-2"
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
              className="w-full flex justify-between items-center pt-4 pb-4 border-b border-victron-darkGray-2"
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
              className="w-full flex justify-between items-center pt-4 pb-4 border-b border-victron-darkGray-2"
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
}

export default observer(InverterCharger)
