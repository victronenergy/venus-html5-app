import React, { Component } from "react"

import GeneratorValues from "./GeneratorValues"
import HeaderView from "../HeaderView/HeaderView"
import HidingContainer from "../HidingContainer"
import { ListView } from "../ListView"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import MetricValues from "../MetricValues"

import { FISCHER_PANDA_GENSET_PRODUCT_ID } from "../../utils/constants"

import "./Generator.scss"

const getTopics = portalId => {
  return {
    productId: `N/${portalId}/system/0/Ac/Genset/ProductId`,
    phases: `N/${portalId}/system/0/Ac/Genset/NumberOfPhases`,
    statusCode: `N/${portalId}/genset/0/StatusCode`
  }
}

const getGeneratorTitle = productId => {
  switch (productId) {
    case FISCHER_PANDA_GENSET_PRODUCT_ID:
      return "Fischer Panda Generator"
    default:
      return "Generator"
  }
}

const getGeneratorIcon = productId => {
  switch (productId) {
    case FISCHER_PANDA_GENSET_PRODUCT_ID:
      return require("../../../images/icons/fp_generator.svg")
    default:
      return require("../../../images/icons/generator.svg")
  }
}

const getSourceSubtitle = (productId, phases, statusCode) => {
  switch (productId) {
    case FISCHER_PANDA_GENSET_PRODUCT_ID:
      return getGensetState(statusCode)
    default:
      return phases > 1 ? "3 phases" : null
  }
}

function getGensetState(statusCode) {
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

const getHasValues = productId => {
  switch (productId) {
    case FISCHER_PANDA_GENSET_PRODUCT_ID:
      return true
    default:
      return false
  }
}

const Generator = ({ portalId, productId, phases, statusCode }) => {
  const icon = getGeneratorIcon(productId)
  const title = getGeneratorTitle(productId)
  const subTitle = getSourceSubtitle(productId, phases, statusCode)
  const hasValues = getHasValues(productId)
  return (
    <div className="metric metric__generator">
      {phases > 1 ? (
        <ListView icon={icon} title={title} subTitle={subTitle} child>
          {hasValues && <GeneratorValues portalId={portalId} threePhase={true} />}
        </ListView>
      ) : (
        <HeaderView icon={icon} title={title} subTitle={subTitle} child>
          {hasValues && (
            <MetricValues>
              <GeneratorValues portalId={portalId} />
            </MetricValues>
          )}
          )
        </HeaderView>
      )}
    </div>
  )
}

class GeneratorWithData extends Component {
  render() {
    const { portalId, metricsRef } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics =>
          topics.productId && (
            <HidingContainer metricsRef={metricsRef} key={topics.productId}>
              <Generator portalId={portalId} {...topics} />
            </HidingContainer>
          )
        }
      </MqttSubscriptions>
    )
  }
}

export default GeneratorWithData
