import React from "react"

import { useGeneratorFp } from "@victronenergy/mfd-modules"

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
import { Translate, translate } from "react-i18nify"
import { observer } from "mobx-react"
import { useVisibilityNotifier } from "app/MarineApp/modules"
import { WIDGET_TYPES } from "app/MarineApp/utils/constants"

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
      return "standby"
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      return "starting"
    case 8:
      return "running"
    case 9:
      return "stopping"
    case 10:
      return "error"
    default:
      return "notAvailable"
  }
}

const GeneratorFp = observer(() => {
  const { productId, productName, phases, statusCode, gensetAutoStart, autoStart, updateAutoMode, updateManualMode } =
    useGeneratorFp()

  const icon = getIcon(productId)
  const title = productName || "Genset"
  const subTitle = getGensetState(statusCode)
  const translatedSubTitle = translate(`common.${subTitle}`)
  const isAutoStartDisabled = gensetAutoStart === FISCHER_PANDA_GENSET_AUTOSTART.DISABLED

  useVisibilityNotifier({ widgetName: WIDGET_TYPES.GENERATOR_FP, visible: !!phases })

  if (phases) {
    return (
      <ColumnContainer key="generator-fp">
        <div className="metric generator">
          {phases > 1 ? (
            <ListView icon={icon} title={title} subTitle={translatedSubTitle} child={true}>
              <GensetValues phases={phases} />
            </ListView>
          ) : (
            <HeaderView icon={icon} title={title} subTitle={translatedSubTitle} child>
              <MetricValues>
                <GensetValues phases={phases} />
              </MetricValues>
            </HeaderView>
          )}
          <div className="generator__mode-selector">
            <SelectorButton
              disabled={isAutoStartDisabled}
              active={statusCode >= 1 && statusCode <= 8 && !autoStart}
              onClick={() => {
                updateAutoMode(GENERATOR_START_STOP.AUTO_OFF)
                updateManualMode(GENERATOR_START_STOP.START)
              }}
            >
              <Translate value="common.on" />
            </SelectorButton>
            <SelectorButton
              active={(statusCode < 1 || statusCode > 8) && !autoStart}
              onClick={() => {
                updateAutoMode(GENERATOR_START_STOP.AUTO_OFF)
                updateManualMode(GENERATOR_START_STOP.STOP)
              }}
            >
              <Translate value="common.off" />
            </SelectorButton>
            <SelectorButton active={autoStart === 1} onClick={() => updateAutoMode(GENERATOR_START_STOP.AUTO_ON)}>
              <Translate value="common.autoStartStop" />
            </SelectorButton>
          </div>
          {isAutoStartDisabled && (
            <div className="generator__autostart-msg text--smaller text--opaque">
              <Translate value="generator.fisherPandaAutoStartMessage" />
            </div>
          )}
        </div>
      </ColumnContainer>
    )
  } else {
    return null
  }
})

export default GeneratorFp
