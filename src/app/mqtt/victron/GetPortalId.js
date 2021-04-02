import React from "react"
import MqttTopicWildcard from "../MqttTopicWildcard"
import Logger from "../../utils/logger"

const GetPortalId = ({ children }) => (
  <MqttTopicWildcard wildcard={`N/+/system/0/Serial`}>
    {messages => {
      if (Object.entries(messages).length === 0) {
        Logger.log("Waiting for portal id ...")
        return children(null)
      } else {
        // Only one path will match this wildcard, so just take the value from the first one
        const firstMessage = Object.entries(messages)[0]
        let portalId = firstMessage[1] ? firstMessage[1] : null
        return children(portalId)
      }
    }}
  </MqttTopicWildcard>
)

export default GetPortalId;
