import { InverterInstanceId, useAppStore, useInverter } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react-lite"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import { translate } from "react-i18nify"
import { INVERTER_MODE } from "../../../utils/constants"
import { formatStateForTranslation } from "../../../utils/format"
import GeneratorIcon from "../../../images/icons/generator.svg"
import classNames from "classnames"
import classnames from "classnames"
import ValueBar from "../../ui/ValueBar"
import Button from "../../ui/Button"
import DeviceSettingModal from "../../ui/DeviceSettingModal/DeviceSettingModal"
import RadioButton from "../../ui/RadioButton"
import Box from "../../ui/Box"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import { useEffect, useState } from "react"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"

const Inverter = ({ instanceId, isVebusInverter, componentMode = "compact", compactBoxSize }: Props) => {
  const { locked } = useAppStore() // lock from theme settings
  const inverterModeFormatter = (value: number) => {
    switch (value) {
      case INVERTER_MODE.OFF:
        return translate("common.off")
      case INVERTER_MODE.VEBUS_ON:
      case INVERTER_MODE.ON:
        return translate("common.on")
      case INVERTER_MODE.ECO:
        return translate("common.eco")
      default:
        return translate("common.emptyBar")
    }
  }

  const source = isVebusInverter ? "vebus" : "inverter"
  let { state, mode, voltage, current, power, productName, customName, updateMode } = useInverter(instanceId, source)

  // Vebus inverters use mode 3 instead of 2 for ON.
  const onMode = isVebusInverter ? INVERTER_MODE.VEBUS_ON : INVERTER_MODE.ON

  const productNameShort = customName || (productName && productName.split(" ")[0])
  const currentValue = !!current || current === 0 ? current : undefined
  const inverterState = !!state || state === 0 ? translate(formatStateForTranslation(Number(state))) : undefined
  const inverterMode = inverterModeFormatter(Number(mode))

  const [boxSize, setBoxSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
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
        title={productNameShort}
        subtitle={inverterState}
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
        <div className={classNames("text-victron-darkGray dark:text-white", activeStyles?.mainValue)}>
          {inverterState}
        </div>
        <div className="w-full h-full min-h-0 shrink flex flex-col justify-end mt-2">
          <div className={classnames("", activeStyles?.secondaryValue)}>
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
        <DeviceSettingModal
          title={productNameShort}
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

interface Props {
  instanceId: InverterInstanceId
  isVebusInverter: boolean
  componentMode?: ComponentMode
  compactBoxSize?: { width: number; height: number }
}

export default observer(Inverter)
