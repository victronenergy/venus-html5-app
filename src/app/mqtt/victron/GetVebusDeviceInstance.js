import React from "react"
import MqttTopicWildcard from "../MqttTopicWildcard"

export default props => (
  <MqttTopicWildcard wildcard={`N/+/vebus/+/DeviceInstance`}>
    {messages => {
      if (Object.entries(messages).length === 0) {
        return <div>Loading...</div>
      }

      const firstMessage = Object.entries(messages)[0]
      // You can only have one VE.Bus device in a system, so just take the first one
      let vebusInstanceId = firstMessage[1] ? firstMessage[1].value : null
      return <>{props.children(vebusInstanceId)}</>
    }}
  </MqttTopicWildcard>
)
