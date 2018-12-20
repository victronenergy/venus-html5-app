import React from "react"
import MqttTopicWildcard from "../MqttTopicWildcard"
import Logger from "../../utils/logger"

export default props => (
  <MqttTopicWildcard wildcard={`N/+/vebus/+/DeviceInstance`}>
    {messages => {
      if (Object.entries(messages).length === 0) {
        Logger.log("Waiting for VE.Bus device instance...")
        return <>{props.children(null)}</>
      }

      const firstMessage = Object.entries(messages)[0]
      // You can only have one VE.Bus device in a system, so just take the first one
      let vebusInstanceId = firstMessage[1] ? firstMessage[1].value : null
      return <>{props.children(vebusInstanceId)}</>
    }}
  </MqttTopicWildcard>
)
