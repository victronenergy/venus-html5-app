import React from "react"

import GeneratorFp from "./GeneratorFp"
import GeneratorRelay from "./GeneratorRelay"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import { RELAY_FUNCTION } from "../../utils/constants"

const getTopics = portalId => {
  return {
    gensetCode: `N/${portalId}/genset/0/StatusCode`,
    relayFunction: `N/${portalId}/settings/0/Settings/Relay/Function`
  }
}

const Generators = ({ portalId, metricsRef }) => (
  <MqttSubscriptions topics={getTopics(portalId)}>
    {topics => (
      <>
        {topics.gensetCode !== undefined && (
          <GeneratorFp portalId={portalId} metricsRef={metricsRef} startStopTopic={`W/${portalId}/genset/0/Start`} />
        )}
        {topics.relayFunction === RELAY_FUNCTION.GENERATOR_START_STOP && (
          <GeneratorRelay portalId={portalId} metricsRef={metricsRef} startStopTopic={`W/...`} />
        )}
      </>
    )}
  </MqttSubscriptions>
)

export default Generators
