import React from "react"

import GensetValues from "./GensetValues"
import HeaderView from "../HeaderView/HeaderView"
import ColumnContainer from "../ColumnContainer"
import { ListView } from "../ListView"
import MetricValues from "../MetricValues"
import SelectorButton from "../SelectorButton"

import {
  FISCHER_PANDA_GENSET_PRODUCT_ID,
  FISCHER_PANDA_GENSET_AUTOSTART,
  GENERATOR_START_STOP,
} from "../../../utils/constants"

import "./Generator.scss"

import FpGeneratorIcon from "../../images/icons/fp_generator.svg"
import GeneratorIcon from "../../images/icons/generator.svg"
import { useGeneratorFp } from "../../../modules/Generators/GeneratorFp.provider"

const getIcon = (productId: number) => {
  switch (productId) {
    case FISCHER_PANDA_GENSET_PRODUCT_ID:
      return FpGeneratorIcon
    default:
      return GeneratorIcon
  }
}

function getGensetState(statusCode: number) {
  switch (statusCode) {
    case 0:
      return "Standby"
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      return "Starting"
    case 8:
      return "Running"
    case 9:
      return "Stopping"
    case 10:
      return "Error"
    default:
      return "Not available"
  }
}

const GeneratorFp = () => {
  const {
    productId,
    productName,
    phases,
    statusCode,
    gensetAutoStart,
    autoStart,
    updateAutoMode,
    updateManualMode,
  } = useGeneratorFp()

  const icon = getIcon(productId)
  const title = productName || "Genset"
  const subTitle = getGensetState(statusCode)
  const isAutoStartDisabled = gensetAutoStart === FISCHER_PANDA_GENSET_AUTOSTART.DISABLED

  return (
    <ColumnContainer key="generator-fp">
      <div className="metric generator">
        {phases > 1 ? (
          <ListView icon={icon} title={title} subTitle={subTitle} child={true}>
            <GensetValues phases={phases} />
          </ListView>
        ) : (
          <HeaderView icon={icon} title={title} subTitle={subTitle} child>
            <MetricValues>
              <GensetValues phases={phases} />
            </MetricValues>
          </HeaderView>
        )}
        <div className="generator__mode-selector">
          <SelectorButton
            disabled={isAutoStartDisabled}
            active={statusCode === 8 && !autoStart}
            onClick={() => {
              updateManualMode(GENERATOR_START_STOP.AUTO_OFF)
              updateAutoMode(GENERATOR_START_STOP.START)
            }}
          >
            On
          </SelectorButton>
          <SelectorButton
            active={statusCode < 8 && !autoStart}
            onClick={() => {
              updateManualMode(GENERATOR_START_STOP.AUTO_OFF)
              updateAutoMode(GENERATOR_START_STOP.STOP)
            }}
          >
            Off
          </SelectorButton>
          <SelectorButton active={autoStart} onClick={() => updateManualMode(GENERATOR_START_STOP.AUTO_ON)}>
            Auto start/stop
          </SelectorButton>
        </div>
        {isAutoStartDisabled && (
          <div className="generator__autostart-msg text--smaller text--opaque">
            The Fisher Panda AutoStart functionality is currently disabled, enable it on the genset panel in order to
            control the genset from this panel.
          </div>
        )}
      </div>
    </ColumnContainer>
  )
}

export default GeneratorFp
