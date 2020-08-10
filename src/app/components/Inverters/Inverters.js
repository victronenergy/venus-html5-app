import React from "react"

import InverterWithData from "./Inverter"
import MqttTopicWildcard from "../../mqtt/MqttTopicWildcard"

const Inverters = ({ portalId }) => (
  <MqttTopicWildcard wildcard={`N/${portalId}/inverter/+/DeviceInstance`}>
    {systemInverters => (
      <MqttTopicWildcard wildcard={`N/${portalId}/vebus/+/DeviceInstance`}>
        {vebusInverters => {
          const systemInverterIds = Object.values(systemInverters)
          const vebusInverterIds = Object.values(vebusInverters)
          return systemInverterIds
            .concat(vebusInverterIds)
            .map(id => (
              <InverterWithData
                key={id}
                portalId={portalId}
                deviceInstance={id}
                isVebusInverter={vebusInverterIds.includes(id)}
              />
            ))
        }}
      </MqttTopicWildcard>
    )}
  </MqttTopicWildcard>
)

export default Inverters
