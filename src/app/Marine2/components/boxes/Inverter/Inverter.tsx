import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import { InverterInstanceId, useAppStore, useInverter } from "@victronenergy/mfd-modules"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import GeneratorIcon from "../../../images/icons/generator.svg"
import { INVERTER_MODE } from "../../../utils/constants"
import classNames from "classnames"
import ValueBar from "../../ui/ValueBar"
import Button from "../../ui/Button"
import DeviceSettingModal from "../../ui/DeviceSettingModal/DeviceSettingModal"
import RadioButton from "../../ui/RadioButton"
import Box from "../../ui/Box"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import ValueOverview from "../../ui/ValueOverview"
import { formatModeFor } from "../../../utils/formatters/devices/inverter/format-mode-for"
import { translatedStateFor } from "../../../utils/helpers/devices/translated-state-for"
import { titleFor } from "../../../utils/helpers/devices/title-for"

interface Props {
  instanceId: InverterInstanceId
  isVebusInverter: boolean
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const Inverter = ({ instanceId, isVebusInverter, componentMode = "compact", compactBoxSize }: Props) => {
  const { locked } = useAppStore() // lock from theme settings

  const source = isVebusInverter ? "vebus" : "inverter"
  const { state, mode, voltage, current, power, productName, customName, updateMode } = useInverter(instanceId, source)

  // Vebus inverters use mode 3 instead of 2 for ON.
  const onMode = isVebusInverter ? INVERTER_MODE.VEBUS_ON : INVERTER_MODE.ON

  const title = titleFor(customName, productName)
  const subTitle = translatedStateFor(state)
  const inverterMode = formatModeFor(mode)

  const currentValue = !!current || current === 0 ? current : undefined

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
            <ValueBar
              values={[
                { value: voltage, unit: "V", hideDecimal: true },
                { value: current, unit: "A" },
                { value: power, unit: "W" },
              ]}
            />
          </div>
          <Button
            disabled={locked}
            className="w-full mt-3"
            size="md"
            onClick={() => setIsModeModalOpen(!isModeModalOpen)}
          >
            {inverterMode}
          </Button>
        </div>
        {/* TODO Refactor to seperate modal file. */}
        <DeviceSettingModal
          title={title}
          subtitle={translate("common.mode")}
          open={isModeModalOpen}
          onClose={closeModeModal}
          onSet={submitMode}
        >
          {/* TODO Refactor to list item component, too much duplicate code. */}
          <div className="divide-y divide-victron-darkGray-200 text-base">
            <label
              className="w-full flex justify-between items-center pb-4"
              onClick={() => setModeForSubmission(onMode)}
            >
              <span>{translate("common.on")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(onMode)}
                selected={modeForSubmission === onMode}
                responsive={false}
              />
            </label>
            <label
              className="w-full flex justify-between items-center py-4 last:pb-0"
              onClick={() => setModeForSubmission(INVERTER_MODE.OFF)}
            >
              <span>{translate("common.off")}</span>
              <RadioButton
                onChange={() => setModeForSubmission(INVERTER_MODE.OFF)}
                selected={modeForSubmission === INVERTER_MODE.OFF}
                responsive={false}
              />
            </label>
            {!isVebusInverter && (
              <label
                className="w-full flex justify-between items-center pt-4"
                onClick={() => setModeForSubmission(INVERTER_MODE.ECO)}
              >
                <span>{translate("common.eco")}</span>
                <RadioButton
                  onChange={() => setModeForSubmission(INVERTER_MODE.ECO)}
                  selected={modeForSubmission === INVERTER_MODE.ECO}
                  responsive={false}
                />
              </label>
            )}
          </div>
        </DeviceSettingModal>
      </div>
    </Box>
  )
}

export default observer(Inverter)
