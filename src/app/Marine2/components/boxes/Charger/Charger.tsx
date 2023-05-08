import { ChargerInstanceId, useCharger } from "@elninotech/mfd-modules"
import { observer } from "mobx-react-lite"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import { translate } from "react-i18nify"
import { CHARGER_MODE } from "../../../utils/constants"
import { formatStateForTranslation } from "../../../utils/format"
import Button from "../../ui/Button"
import GeneratorIcon from "../../../images/icons/generator.svg"
import classnames from "classnames"
import ValueBar from "../../ui/ValueBar"
import Box from "../../ui/Box"
import { applyStyles, BreakpointStylesType } from "../../../utils/media"
import { useEffect, useState } from "react"
import classNames from "classnames"
import RadioButton from "../../ui/RadioButton"
import DeviceSettingModal from "../../ui/DeviceSettingModal/DeviceSettingModal"
import ValueOverview from "../../ui/ValueOverview"

const styles: BreakpointStylesType = {
  default: {
    value: "text-lg",
    valueBars: "text-base",
  },
  "sm-s": {
    value: "text-lg",
    valueBars: "text-base",
  },
  "md-s": {
    value: "text-xxl",
    valueBars: "text-xl",
  },
  "md-m": {
    value: "text-lg",
    valueBars: "text-base",
  },
  "lg-l": {
    value: "text-2xl",
    valueBars: "text-xxl",
  },
}
const Charger = ({ instanceId, componentMode = "compact", compactBoxSize }: Props) => {
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
    nrOfOutputs = 3,
    productName,
    customName,
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
  const currentValue = !!current && (!!current[0] || current[0] === 0) ? current[0] : undefined
  const chargerState = !!state || state === 0 ? translate(formatStateForTranslation(Number(state))) : undefined

  const productNameShort = customName || (productName && productName.split(" ")[0])

  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const activeStyles = applyStyles(boxSize, styles)

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
  const [limitForSubmission, setLimitForSubmission] = useState(Number(currentLimit))

  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false)

  useEffect(() => {
    setLimitForSubmission(Number(currentLimit))
  }, [currentLimit])

  const increaseLimit = () => {
    if (limitForSubmission < 100) setLimitForSubmission(limitForSubmission + 1)
  }

  const decreaseLimit = () => {
    if (limitForSubmission > 0) setLimitForSubmission(limitForSubmission - 1)
  }

  const closeLimitModal = () => {
    setIsLimitModalOpen(false)
    setLimitForSubmission(Number(currentLimit))
  }

  const submitLimit = () => {
    updateCurrentLimit(limitForSubmission)
    closeLimitModal()
  }

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={InverterChargerIcon}
        title={productNameShort}
        subtitle={chargerState ?? undefined}
        value={currentValue}
        unit={"A"}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <Box
      icon={
        <GeneratorIcon
          /* todo: fix types for svg */
          /* @ts-ignore */
          className={"w-7"}
        ></GeneratorIcon>
      }
      title={productNameShort}
      getBoxSizeCallback={setBoxSize}
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div className={classNames("text-victron-darkGray dark:text-white", activeStyles?.value)}>{chargerState}</div>
        <div className="w-full h-full min-h-0 shrink flex flex-col justify-end mt-2">
          <div className={classnames("", activeStyles?.valueBars)}>
            <ValueBar values={current.slice(0, nrOfOutputs).map((v) => ({ value: v, unit: "A" }))} />
          </div>
          <div className="flex mt-3">
            {chargerSupportsInputLimit && (
              <Button className="w-full mr-4" size="md" onClick={() => setIsLimitModalOpen(!isLimitModalOpen)}>
                {!!currentLimit ? Number(currentLimit) + "A" : 0 + "A"}
              </Button>
            )}
            {chargerSupportsMode && (
              <Button className="w-full" size="md" onClick={() => setIsModeModalOpen(!isModeModalOpen)}>
                {chargerMode}
              </Button>
            )}
          </div>
        </div>
        {chargerSupportsMode && (
          <DeviceSettingModal open={isModeModalOpen} onClose={closeModeModal} onSet={submitMode} width={"lg"}>
            <label className="flex justify-center text-lg mb-3">
              {productNameShort + " " + translate("common.mode")}
            </label>
            <div className={" m-auto w-[20rem] md:w-[30rem] lg:w-[30rem] flex flex-col items-center"}>
              <label
                className="w-full flex justify-between items-center pt-4 pb-4 border-b border-victron-darkGray-200"
                onClick={() => setModeForSubmission(CHARGER_MODE.ON)}
              >
                <span>{translate("common.on")}</span>
                <RadioButton
                  onChange={() => setModeForSubmission(CHARGER_MODE.ON)}
                  selected={modeForSubmission === CHARGER_MODE.ON}
                  responsive={false}
                />
              </label>
              <label
                className="w-full flex justify-between items-center pt-4 pb-4 border-b border-victron-darkGray-200"
                onClick={() => setModeForSubmission(CHARGER_MODE.OFF)}
              >
                <span>{translate("common.off")}</span>
                <RadioButton
                  onChange={() => setModeForSubmission(CHARGER_MODE.OFF)}
                  selected={modeForSubmission === CHARGER_MODE.OFF}
                  responsive={false}
                />
              </label>
            </div>
          </DeviceSettingModal>
        )}
        {chargerSupportsInputLimit && (
          <DeviceSettingModal open={isLimitModalOpen} onClose={closeLimitModal} onSet={submitLimit} width={"lg"}>
            <label className="flex w-full justify-center text-lg mb-3">
              {productNameShort + " " + translate("common.inputCurrentLimit")}
            </label>
            <div className="flex flex-row justify-center mt-10 mb-10">
              <button
                className="w-28 md:w-36 lg:w-36 h-20 bg-victron-blue/70 border-0 rounded-md text-xl mr-14"
                onClick={decreaseLimit}
              >
                -
              </button>
              <div className="w-24 md:w-32 lg:w-32 flex flex-row pr-2 items-center text-2xl md:text-3xl lg:text-3xl">
                <div>{limitForSubmission ?? 0}</div>
                <div className={"text-victron-gray/70 pl-1"}>A</div>
              </div>
              <button
                className="w-28 md:w-36 lg:w-36 h-20 bg-victron-blue/70 border-0 rounded-md text-xl ml-14"
                onClick={increaseLimit}
              >
                +
              </button>
            </div>
          </DeviceSettingModal>
        )}
      </div>
    </Box>
  )
}

interface Props {
  instanceId: ChargerInstanceId
  componentMode?: "compact" | "full"
  compactBoxSize?: { width: number; height: number }
}

export default observer(Charger)
