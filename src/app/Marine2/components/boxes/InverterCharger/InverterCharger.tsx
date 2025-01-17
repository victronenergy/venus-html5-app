import { useState } from "react"
import { observer } from "mobx-react-lite"
import { useActiveSource, useAppStore, useInverterCharger, useSystemState } from "@victronenergy/mfd-modules"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import Button from "../../ui/Button"
import InputLimitSelector from "../../ui/InputLimitSelector"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import { Modal } from "./Modal/Modal"
import { formatModeFor } from "../../../utils/formatters/devices/inverter-charger/format-mode-for"
import { titleFor } from "../../../utils/helpers/devices/title-for"
import { translatedStateFor } from "../../../utils/helpers/devices/translated-state-for"
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { translate } from "react-i18nify"
import { formatInputTypeFor as formatACInputTypeFor } from "../../../utils/formatters/devices/inverter-charger/format-input-type-for"

interface Props {
  instanceId: number
  isMainVEBusDevice: boolean
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const translateInputDescription = (
  isMainVEBusDevice: boolean,
  numberOfAcInputs: number,
  inputId: number,
  settings: number[]
) => {
  if (isMainVEBusDevice) {
    const inputType = formatACInputTypeFor(settings[inputId - 1])
    return translate("common.inputCurrentLimitWithType", { inputType })
  } else if (numberOfAcInputs > 1) {
    return translate("common.inputCurrentLimitWithNumber", { inputId })
  }
  return translate("common.inputCurrentLimit")
}

const InverterCharger = ({ instanceId, isMainVEBusDevice, componentMode = "compact", compactBoxSize }: Props) => {
  const { locked } = useAppStore() // lock from theme settings

  const { settings } = useActiveSource()
  const { systemState } = useSystemState()
  const { state, mode, numberOfAcInputs, customName, productName, modeIsAdjustable } = useInverterCharger(instanceId)
  const [openModal, setOpenModal] = useState(false)

  const title = titleFor(customName, productName)
  const subTitle = translatedStateFor(isMainVEBusDevice ? systemState : state)
  const inverterChargerMode = formatModeFor(parseInt(mode))

  const getButtons = (numberOfAcInputs: number) => {
    const buttons = []

    for (let inputId = 1; inputId <= numberOfAcInputs; inputId++) {
      const inputDescription = translateInputDescription(isMainVEBusDevice, numberOfAcInputs, inputId, settings)
      buttons.push(
        <InputLimitSelector
          key={`limit${inputId}`}
          instanceId={instanceId}
          inputId={inputId}
          title={title}
          subtitle={inputDescription}
        />
      )
    }

    if (modeIsAdjustable === 1) {
      buttons.push(
        <Button key="mode" disabled={locked} className="w-full" size="md" onClick={() => setOpenModal(!openModal)}>
          {inverterChargerMode}
        </Button>
      )
    }
    return buttons
  }

  if (componentMode === "compact" && compactBoxSize) {
    return <ValueOverview Icon={InverterChargerIcon} title={title} subtitle={subTitle} boxSize={compactBoxSize} />
  }

  return (
    <ValueBox
      title={title}
      subtitle={subTitle}
      icon={<InverterChargerIcon className={responsiveBoxIcon} />}
      buttons={getButtons(numberOfAcInputs)}
      bottomValues={[]}
    >
      <Modal instanceId={instanceId} title={title} open={openModal} onClose={setOpenModal} />
    </ValueBox>
  )
}

export default observer(InverterCharger)
