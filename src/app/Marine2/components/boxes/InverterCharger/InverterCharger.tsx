import { useState } from "react"
import { observer } from "mobx-react-lite"
import { translate } from "react-i18nify"
import { useAppStore, useInverterCharger, useShorePowerInput } from "@victronenergy/mfd-modules"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import { formatStateForTranslation } from "../../../utils/format"
import Button from "../../ui/Button"
import InputLimitSelector from "../../ui/InputLimitSelector"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import { Modal } from "./Modal/Modal"
import { formatModeFor } from "../../../utils/helpers/inverter-charger/format-mode-for"

interface Props {
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const InverterCharger = ({ componentMode = "compact", compactBoxSize }: Props) => {
  const { locked } = useAppStore() // lock from theme settings
  const { inputId } = useShorePowerInput()

  const { state, mode, customName, productName, modeIsAdjustable } = useInverterCharger()
  const [openModal, setOpenModal] = useState(false)

  const productNameShort = customName || (productName && productName.split(" ")[0])
  const subTitle = !!state || parseInt(state) === 0 ? translate(formatStateForTranslation(Number(state))) : ""

    const title = shortTitleFor(customName, productName, "Charger Fallback Name")
  const translatedState = translatedStateFor(state)


  const getButtons = () => {
    const buttons = []

    if (!!inputId) {
      buttons.push(<InputLimitSelector inputId={inputId} title={productNameShort} />)
    }

    if (modeIsAdjustable === 1) {
      buttons.push(
        <Button disabled={locked} className="w-full" size="md" onClick={() => setOpenModal(!openModal)}>
          {formatModeFor(parseInt(mode))}
        </Button>
      )
    }
    return buttons
  }

  console.log(state, mode)

  if (componentMode === "compact" && compactBoxSize) {
    return (
      <ValueOverview
        /* todo: fix types for svg */
        /* @ts-ignore */
        Icon={InverterChargerIcon}
        title={productNameShort}
        subtitle={subTitle}
        boxSize={compactBoxSize}
      />
    )
  }

  return (
    <ValueBox
      title={productNameShort}
      subtitle={subTitle}
      icon={
        /* todo: fix types for svg */
        /* @ts-ignore */
        <InverterChargerIcon className="w-[18px] sm-s:w-[24px] sm-m:w-[32px]" />
      }
      buttons={getButtons()}
      bottomValues={[]}
    >
      <Modal title={productNameShort} open={openModal} onClose={setOpenModal} />
    </ValueBox>
  )
}

export default observer(InverterCharger)
