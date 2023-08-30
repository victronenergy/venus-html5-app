import { InverterState, useInverter, InverterInstanceId } from "@victronenergy/mfd-modules"

import { INVERTER_MODE } from "../../../utils/constants"

import HeaderView from "../HeaderView"
import ColumnContainer from "../ColumnContainer"
import MetricValues from "../MetricValues"
import NumericValue from "../../../components/NumericValue"
import SelectorButton from "../SelectorButton"

import "./Inverter.scss"

import MultiplusIcon from "../../images/icons/multiplus.svg"
import { translate, Translate } from "react-i18nify"
import { observer } from "mobx-react"

const stateFormatter = (state: number) => {
  switch (state) {
    case 0:
      return "off"
    case 1:
      return "lowPower"
    case 2:
      return "fault"
    case 9:
      return "inverting"
    default:
      return null
  }
}

const InverterSubtitle = (voltage: number, current: number, power: number, state: number) => (
  <MetricValues inflate>
    <div className="metrics__left">
      <NumericValue value={voltage} unit="V" />
      <NumericValue value={current} unit="A" precision={1} />
      <NumericValue value={power || voltage * current} unit="W" />
    </div>
    <div className="metrics__right">
      <span>
        <Translate value={`common.${stateFormatter(state)}`} />
      </span>
    </div>
  </MetricValues>
)

type InverterProps = {
  instanceId: InverterInstanceId
  isVebusInverter: boolean
}

export const Inverter = observer(
  ({ instanceId, isVebusInverter, ...props }: InverterProps & Partial<InverterState>) => {
    const source = isVebusInverter ? "vebus" : "inverter"
    let { state, mode, voltage, current, power, customName, productName, nAcInputs, updateMode } = useInverter(
      instanceId,
      source
    )
    nAcInputs = props.nAcInputs ?? nAcInputs

    // if nAcInputs === 0 it means it's an inverter, if not it's an inverter/charger => skip
    const show = !isVebusInverter || nAcInputs === 0
    // Vebus inverters use mode 3 in stead of 2 for ON.
    const onMode = isVebusInverter ? INVERTER_MODE.VEBUS_ON : INVERTER_MODE.ON

    const productNameShort = productName && productName.split(" ")[0]

    return (
      <>
        {show && (
          <ColumnContainer>
            <div className="metric inverter">
              <HeaderView
                icon={MultiplusIcon}
                title={customName || translate("widgets.inverterWithName", { productNameShort })}
                child
              >
                {InverterSubtitle(voltage, current, power, state)}
              </HeaderView>
              <div className="inverter__mode-selector">
                <SelectorButton active={mode === onMode} onClick={() => updateMode(onMode)}>
                  <Translate value="common.on" />
                </SelectorButton>
                <SelectorButton active={mode === INVERTER_MODE.OFF} onClick={() => updateMode(INVERTER_MODE.OFF)}>
                  <Translate value="common.off" />
                </SelectorButton>
                {!isVebusInverter && (
                  <SelectorButton active={mode === INVERTER_MODE.ECO} onClick={() => updateMode(INVERTER_MODE.ECO)}>
                    <Translate value="common.eco" />
                  </SelectorButton>
                )}
              </div>
            </div>
          </ColumnContainer>
        )}
      </>
    )
  }
)

export default Inverter
