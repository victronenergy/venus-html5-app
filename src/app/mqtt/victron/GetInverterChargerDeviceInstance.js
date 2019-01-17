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
      const topics = deviceInstances.reduce((acc, id) => {
        acc[id] = `N/${portalId}/vebus/${id}/Ac/NumberOfAcInputs`
        return acc
      }, {})

      return (
        <MqttSubscriptions topics={topics}>
          {topics => {
            const vebusDevices = Object.entries(topics).filter(item => {
              // Take only "Multi" devices -> must have more than one AcInput
              return item[1] !== 0
            })
            // You can only have one "Multi" device in a system, so just take the first one
            let vebusInstanceId = vebusDevices[0] ? parseInt(vebusDevices[0][0]) : null
            return children(vebusInstanceId)
          }}
        </MqttSubscriptions>
      )
    }}
  </MqttTopicWildcard>
)
