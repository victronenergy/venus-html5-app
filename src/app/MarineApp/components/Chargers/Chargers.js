import React from "react"

import Charger from "./Charger"
import MqttTopicWildcard from "../../../mqtt/MqttTopicWildcard"

const Chargers = ({ portalId, ...rest }) => (
  <MqttTopicWildcard wildcard="N/+/charger/+/DeviceInstance">
    {messages => {
      const chargerIds = Object.values(messages)
      return chargerIds.map(id => <Charger key={id} portalId={portalId} deviceInstanceId={id} {...rest} />)
    }}
  </MqttTopicWildcard>
)

export default Chargers
