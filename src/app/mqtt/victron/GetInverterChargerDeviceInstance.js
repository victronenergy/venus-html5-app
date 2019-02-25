import React from "react"
import MqttTopicWildcard from "../MqttTopicWildcard"
import Logger from "../../utils/logger"
import MqttSubscriptions from "../MqttSubscriptions"

export default ({ children, portalId }) => (
  <MqttTopicWildcard wildcard={`N/+/vebus/+/DeviceInstance`}>
    {messages => {
      if (Object.entries(messages).length === 0) {
        Logger.log("Waiting for VE.Bus device instance...")
        return children(null)
      }

      const deviceInstances = Object.values(messages)
      const subs = deviceInstances.reduce((acc, id) => {
        acc[id] = `N/${portalId}/vebus/${id}/Ac/NumberOfAcInputs`
        return acc
      }, {})

      return (
        <MqttSubscriptions topics={subs}>
          {topics => {
            // You can only have one "Multi" device in a system, so just take the first one
            const [multiInstance] = Object.entries(topics).filter(([_, nAcInputs]) => {
              // Take only "Multi" devices -> must have more than one AcInput
              return nAcInputs && nAcInputs !== 0
            })
            const vebusInstanceId = multiInstance ? parseInt(multiInstance[0]) : null
            return children(vebusInstanceId)
          }}
        </MqttSubscriptions>
      )
    }}
  </MqttTopicWildcard>
)
