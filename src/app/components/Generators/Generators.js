import React from "react"

import GeneratorFp from "./GeneratorFp"
import GeneratorRelay from "./GeneratorRelay"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"

const getTopics = portalId => {
  return {
    gensetCode: `N/${portalId}/genset/0/StatusCode`,
    generatorState: `N/${portalId}/generator/0/Generator0/State`
  }
}

const Generators = ({ portalId, metricsRef }) => (
  <MqttSubscriptions topics={getTopics(portalId)}>
    {topics => (
      <>
        {topics.gensetCode !== undefined && (
          <GeneratorFp
            portalId={portalId}
            metricsRef={metricsRef}
            autoStartStopTopic={`W/${portalId}/settings/0/Settings/Services/FischerPandaAutoStartStop`}
            manualStartStopTopic={`W/${portalId}/genset/0/Start`}
          />
        )}
        {topics.generatorState !== undefined && (
          <GeneratorRelay
            portalId={portalId}
            metricsRef={metricsRef}
            autoStartStopTopic={`W/${portalId}/settings/0/Settings/Generator0/AutoStartEnabled`}
            manualStartStopTopic={`W/${portalId}/generator/0/Generator0/ManualStart`}
          />
        )}
      </>
    )}
  </MqttSubscriptions>
)

export default Generators
