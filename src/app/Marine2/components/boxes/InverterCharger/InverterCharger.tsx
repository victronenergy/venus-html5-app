import { useState } from "react"
import { observer } from "mobx-react-lite"
import { useAppStore, useInverterCharger, useShorePowerInput } from "@victronenergy/mfd-modules"
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

interface Props {
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const InverterCharger = ({ componentMode = "compact", compactBoxSize }: Props) => {
  const { locked } = useAppStore() // lock from theme settings
  const { inputId } = useShorePowerInput()

  const { state, mode, customName, productName, modeIsAdjustable } = useInverterCharger()
  const [openModal, setOpenModal] = useState(false)

  const title = titleFor(customName, productName)
  const subTitle = translatedStateFor(state)
  const inverterChargerMode = formatModeFor(parseInt(mode))

  const getButtons = () => {
    const buttons = []

    if (inputId) {
      buttons.push(<InputLimitSelector key="limit" inputId={inputId} title={title} />)
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
      buttons={getButtons()}
      bottomValues={[]}
    >
      <Modal title={title} open={openModal} onClose={setOpenModal} />
    </ValueBox>
  )
}

export default observer(InverterCharger)
