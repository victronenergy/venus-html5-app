import { observer } from "mobx-react"
import DeviceSettingModal from "../DeviceSettingModal/DeviceSettingModal"
import { translate } from "react-i18nify"
import RadioButton from "../RadioButton"
import Button from "../../_elements/Button"
import { useCallback, useEffect, useState } from "react"
import { useAppStore } from "@victronenergy/mfd-modules"
import { GENERATOR_START_STOP } from "../../../utils/constants/devices/generators"
import { formatStartStopFor, StartStopValue } from "../../../utils/formatters/general/start-stop/format-start-stop-for"
import { isGeneratorRunningFor } from "../../../utils/helpers/devices/generators/is-running-for"
import { useStartStopMode } from "../../../utils/hooks/use-start-stop-mode"

interface Props {
  statusCode?: number
  manualStart?: number
  title: string
  autoStart: number
  updateManualMode: Function
  updateAutoMode: Function
  isAutoStartDisabled: boolean
}

const AutoStartStopSetter = ({
  statusCode,
  manualStart,
  title,
  autoStart,
  updateManualMode,
  updateAutoMode,
  isAutoStartDisabled,
}: Props) => {
  const { locked } = useAppStore()

  const running = isGeneratorRunningFor(statusCode, manualStart)
  const startStopMode = useStartStopMode(running, autoStart)

  const [isModeModalOpen, setIsModeModalOpen] = useState(false)
  const [modeForSubmission, setModeForSubmission] = useState(startStopMode)



  useEffect(() => {
    setModeForSubmission(startStopMode)
  }, [startStopMode])

  const closeModeModal = () => {
    setIsModeModalOpen(false)
    setModeForSubmission(startStopMode)
  }

  const submitMode = () => {
    switch (modeForSubmission) {
      case 0:
        updateAutoMode(GENERATOR_START_STOP.AUTO_OFF)
        updateManualMode(GENERATOR_START_STOP.START)
        break
      case 1:
        updateAutoMode(GENERATOR_START_STOP.AUTO_OFF)
        updateManualMode(GENERATOR_START_STOP.STOP)
        break
      case 2:
        updateAutoMode(GENERATOR_START_STOP.AUTO_ON)
    }
    closeModeModal()
  }

  useEffect(() => {
    if (isAutoStartDisabled) setIsModeModalOpen(false)
  }, [isAutoStartDisabled])

  return (
    <>
      <Button
        size="md"
        className="flex-none mt-3 w-full"
        disabled={isAutoStartDisabled || locked}
        onClick={() => setIsModeModalOpen(true)}
      >
        {formatStartStopFor(startStopMode)}
      </Button>

      {!isAutoStartDisabled && (
        <DeviceSettingModal
          title={title}
          subtitle={translate("common.mode")}
          open={isModeModalOpen}
          onClose={closeModeModal}
          onSet={submitMode}
        >
          <div className="divide-y divide-victron-darkGray-200 text-base">
            <label className="w-full flex justify-between items-center pb-4" onClick={() => setModeForSubmission(0)}>
              <span>{translate("common.on")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(0)}
                selected={modeForSubmission === 0}
                responsive={false}
              />
            </label>
            <label className="w-full flex justify-between items-center py-4" onClick={() => setModeForSubmission(1)}>
              <span>{translate("common.off")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(1)}
                selected={modeForSubmission === 1}
                responsive={false}
              />
            </label>
            <label className="w-full flex justify-between items-center pt-4" onClick={() => setModeForSubmission(2)}>
              <span>{translate("common.autoStartStop")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(2)}
                selected={modeForSubmission === 2}
                responsive={false}
              />
            </label>
          </div>
        </DeviceSettingModal>
      )}
    </>
  )
}

export default observer(AutoStartStopSetter)
