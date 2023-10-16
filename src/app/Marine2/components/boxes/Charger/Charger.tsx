import { useEffect, useState } from "react"
import { observer } from "mobx-react"
import classNames from "classnames"
import { translate } from "react-i18nify"
import { ChargerInstanceId, useCharger } from "@victronenergy/mfd-modules"
import { CHARGER_MODE } from "../../../utils/constants"
import { CURRENT_LIMIT_STEP } from "../../../utils/constants/generic"
import Button from "../../ui/Button"
import GeneratorIcon from "../../../images/icons/generator.svg"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import ValueBar from "../../ui/ValueBar"
import Box from "../../ui/Box"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import RadioButton from "../../ui/RadioButton"
import DeviceSettingModal from "../../ui/DeviceSettingModal/DeviceSettingModal"
import ValueOverview from "../../ui/ValueOverview"
import { formatValue } from "../../../utils/formatters"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { LimitAdjuster } from "../../ui/LimitAdjuster/LimitAdjuster"
import {
  currentStepDecrementFor,
  currentStepIncrementFor,
  isCurrentStepDividable,
} from "../../../utils/helpers/current-limit-adjuster"
import { ISize } from "@m2Types/generic/size"
import { titleFor } from "../../../utils/helpers/devices/title-for"
import { translatedStateFor } from "../../../utils/helpers/devices/translated-state-for"
import { formatModeFor } from "../../../utils/formatters/devices/charger/format-mode-for"

interface Props {
  instanceId: ChargerInstanceId
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const Charger = ({ instanceId, componentMode = "compact", compactBoxSize }: Props) => {
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
  const chargerMode = formatModeFor(mode)
  const currentValue = !!current && (!!current[0] || current[0] === 0) ? current[0] : undefined

  const title = titleFor(customName, productName)
  const subTitle = translatedStateFor(state)

  const [boxSize, setBoxSize] = useState<ISize>({ width: 0, height: 0 })
  const activeStyles = applyStyles(boxSize, defaultBoxStyles)

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
    if (limitForSubmission < 100) {
      isCurrentStepDividable(limitForSubmission)
        ? setLimitForSubmission(limitForSubmission + CURRENT_LIMIT_STEP)
        : setLimitForSubmission(currentStepIncrementFor(limitForSubmission))
    }
  }

  const decreaseLimit = () => {
    if (limitForSubmission > 0) {
      isCurrentStepDividable(limitForSubmission)
        ? setLimitForSubmission(limitForSubmission - CURRENT_LIMIT_STEP)
        : setLimitForSubmission(currentStepDecrementFor(limitForSubmission))
    }
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
        title={title}
        subtitle={subTitle}
        value={currentValue}
        unit="A"
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <Box
      icon={
        /* todo: fix types for svg */
        /* @ts-ignore */
        <GeneratorIcon className="w-7" />
      }
      title={title}
      getBoxSizeCallback={setBoxSize}
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div className={classNames("text-victron-darkGray dark:text-white", activeStyles?.mainValue)}>{subTitle}</div>
        <div className="w-full h-full min-h-0 shrink flex flex-col justify-end mt-2">
          <div className={classNames("", activeStyles?.secondaryValue)}>
            <div className={classNames("", activeStyles?.secondaryValue)}>
              <ValueBar values={current.slice(0, nrOfOutputs).map((v) => ({ value: v, unit: "A" }))} />
            </div>
            <div className="flex mt-3">
              {chargerSupportsInputLimit && (
                <Button className="w-full mr-4" size="md" onClick={() => setIsLimitModalOpen(!isLimitModalOpen)}>
                  {!!currentLimit ? formatValue(Number(currentLimit)) + "A" : 0 + "A"}
                </Button>
              )}
              {chargerSupportsMode && (
                <Button className="w-full" size="md" onClick={() => setIsModeModalOpen(!isModeModalOpen)}>
                  {chargerMode}
                </Button>
              )}
            </div>
          </div>
          {/* TODO refactor modal to seperate file like inverter/charger. */}
          {chargerSupportsMode && (
            <DeviceSettingModal
              title={title}
              subtitle={translate("common.mode")}
              open={isModeModalOpen}
              onClose={closeModeModal}
              onSet={submitMode}
            >
              {/* TODO Refactor to list-item or label component, too much duplicate code. */}
              <div className="divide-y divide-victron-darkGray-200 text-base">
                <label
                  className="w-full flex justify-between items-center pb-4"
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
                  className="w-full flex justify-between items-center pt-4"
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
            <DeviceSettingModal
              title={title}
              subtitle={translate("common.inputCurrentLimit")}
              open={isLimitModalOpen}
              onClose={closeLimitModal}
              onSet={submitLimit}
            >
              <LimitAdjuster decreaseLimit={decreaseLimit} increaseLimit={increaseLimit} value={limitForSubmission} />
            </DeviceSettingModal>
          )}
        </div>
      </div>
    </Box>
  )
}

export default observer(Charger)
