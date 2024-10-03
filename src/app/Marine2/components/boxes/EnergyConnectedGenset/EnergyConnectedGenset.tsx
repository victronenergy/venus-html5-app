import GeneratorIcon from "../../../images/icons/generator.svg"
import { ConnectedGensetType, useAppStore, useConnectedGenset } from "@victronenergy/mfd-modules"
import { translate } from "react-i18nify"
import ValueBox from "../../ui/ValueBox"
import ValueOverview from "../../ui/ValueOverview"
import { ComponentMode } from "@m2Types/generic/component-mode"
import { responsiveBoxIcon } from "../../../utils/helpers/classes/responsive-box-icon"
import { ISize } from "@m2Types/generic/size"
import { valueFor } from "app/Marine2/utils/formatters/phase/phase-value-for"
import { unitFor } from "app/Marine2/utils/formatters/phase/phase-unit-for"
import { observer } from "mobx-react"

interface Props {
  gensetType: ConnectedGensetType
  gensetInstance: number
  showInstance: boolean
  componentMode?: ComponentMode
  compactBoxSize?: ISize
}

const EnergyConnectedGenset = ({
  componentMode = "compact",
  gensetType,
  gensetInstance,
  showInstance,
  compactBoxSize,
}: Props) => {
  const { electricalPowerIndicator } = useAppStore()
  const gensetValues = useConnectedGenset(gensetType, gensetInstance)
  const instance = showInstance ? ` [${gensetInstance}]` : ""

  if (gensetValues.gensetType === ConnectedGensetType.ACGENSET) {
    // TODO: We do not support displaying connected AC Genset
    // TODO: on the EnergyOverview page
    return null
  }

  if (gensetValues.gensetType === ConnectedGensetType.DCGENSET) {
    const { customName, productName, current, voltage } = gensetValues
    const power = voltage * current

    if (componentMode === "compact" && compactBoxSize) {
      return (
        <ValueOverview
          Icon={GeneratorIcon}
          title={customName || productName || translate("boxes.generator")}
          value={valueFor(current, power, electricalPowerIndicator)}
          unit={unitFor(electricalPowerIndicator)}
          boxSize={compactBoxSize}
        />
      )
    }

    return (
      <ValueBox
        title={customName || productName || translate("boxes.generator") + instance}
        icon={<GeneratorIcon className={responsiveBoxIcon} />}
        value={valueFor(current, power, electricalPowerIndicator)}
        unit={unitFor(electricalPowerIndicator)}
        bottomValues={[
          [
            { value: voltage, unit: "V", hideDecimal: true },
            { value: current, unit: "A", hideDecimal: true },
            { value: power, unit: "W", hideDecimal: true },
          ],
        ]}
      />
    )
  }
}

export default observer(EnergyConnectedGenset)
