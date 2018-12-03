import React from "react"
import MqttTopicWildcard from "../MqttTopicWildcard"

export default props => (
  <MqttTopicWildcard wildcard={`N/+/system/0/Serial`}>
    {messages => {
      if (Object.entries(messages).length === 0) {
        return <div>Loading...</div>
      }

      // Only one path will match this wildcard, so just take the value from the first one
      const firstMessage = Object.entries(messages)[0]
      let portalId = firstMessage[1] ? firstMessage[1].value : null
      return <>{props.children(portalId)}</>
    }}
  </MqttTopicWildcard>
)
