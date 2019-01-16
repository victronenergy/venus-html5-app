import React from "react"

import MqttTopicWildcard from "../../mqtt/MqttTopicWildcard"
import Charger from "./Charger"

const Chargers = ({ portalId }) => (
  <MqttTopicWildcard wildcard="N/+/charger/+/DeviceInstance">
    {messages => {
      const chargerIds = Object.values(messages)
      return chargerIds.map(id => <Charger key={id} portalId={portalId} deviceInstanceId={id} />)
    }}
  </MqttTopicWildcard>
)

export default Chargers
