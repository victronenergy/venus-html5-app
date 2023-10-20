import { useState } from "react"
import { observer } from "mobx-react-lite"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { ISize } from "@m2Types/generic/size"
import { InverterInstanceId, useAppStore, useInverter } from "@victronenergy/mfd-modules"
import InverterChargerIcon from "../../../images/icons/inverter-charger.svg"
import GeneratorIcon from "../../../images/icons/generator.svg"
import classNames from "classnames"
import ValueBar from "../../ui/ValueBar"
import Button from "../../ui/Button"
import Box from "../../ui/Box"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import ValueOverview from "../../ui/ValueOverview"
import { formatModeFor } from "../../../utils/formatters/devices/inverter/format-mode-for"
import { translatedStateFor } from "../../../utils/helpers/devices/translated-state-for"
import { titleFor } from "../../../utils/helpers/devices/title-for"
import { Modal } from "./Modal/Modal"

interface Props {
  instanceId: InverterInstanceId
  isVebusInverter: boolean
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const Inverter = ({ instanceId, isVebusInverter, componentMode = "compact", compactBoxSize }: Props) => {
  const { locked } = useAppStore() // lock from theme settings
  const source = isVebusInverter ? "vebus" : "inverter"

  const { state, mode, voltage, current, power, customName, productName } = useInverter(instanceId, source)

  const title = titleFor(customName, productName)
  const subTitle = translatedStateFor(state)
  const inverterMode = formatModeFor(mode)

  const currentValue = !!current || current === 0 ? current : undefined

  const [boxSize, setBoxSize] = useState<ISize>({ width: 0, height: 0 })
  const activeStyles = applyStyles(boxSize, defaultBoxStyles)

  const [openModal, setOpenModal] = useState(false)

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
          <Button disabled={locked} className="w-full mt-3" size="md" onClick={() => setOpenModal(!openModal)}>
            {inverterMode}
          </Button>
        </div>
        <Modal
          instanceId={instanceId}
          isVebusInverter={isVebusInverter}
          title={title}
          open={openModal}
          onClose={setOpenModal}
        />
      </div>
    </Box>
  )
}

export default observer(Inverter)
