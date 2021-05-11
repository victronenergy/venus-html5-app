import React from "react"

import { ListRow } from "../ListView"
import NumericValue from "../../../components/NumericValue"
import MqttSubscriptions from "../../../mqtt/MqttSubscriptions"

const getTopics = (portalId) => {
  return {
    voltage: [
      `N/${portalId}/genset/0/Ac/L1/Voltage`,
      `N/${portalId}/genset/0/Ac/L2/Voltage`,
      `N/${portalId}/genset/0/Ac/L3/Voltage`,
    ],
    current: [
      `N/${portalId}/genset/0/Ac/L1/Current`,
      `N/${portalId}/genset/0/Ac/L2/Current`,
      `N/${portalId}/genset/0/Ac/L3/Current`,
    ],
    power: [
      `N/${portalId}/genset/0/Ac/L1/Power`,
      `N/${portalId}/genset/0/Ac/L2/Power`,
      `N/${portalId}/genset/0/Ac/L3/Power`,
    ],
    frequency: [
      `N/${portalId}/genset/0/Ac/L1/Frequency`,
      `N/${portalId}/genset/0/Ac/L2/Frequency`,
      `N/${portalId}/genset/0/Ac/L3/Frequency`,
    ],
    coolant: `N/${portalId}/genset/0/Engine/CoolantTemperature`,
    winding: `N/${portalId}/genset/0/Engine/WindingTemperature`,
    exhaust: `N/${portalId}/genset/0/Engine/ExaustTemperature`,
  }
}

export const ActiveInTotalValues = ({ voltage, current, power, frequency, coolant, winding, exhaust, phases }) => {
  const temperatures = (
    <ListRow key="temperatures">
      <span className="value value__temperature">Coolant</span>
      <NumericValue value={coolant} unit="°C" />
      <span className="value value__temperature">Winding</span>
      <NumericValue value={winding} unit="°C" />
      <span className="value value__temperature">Exhaust</span>
      <NumericValue value={exhaust} unit="°C" />
    </ListRow>
  )
  return phases > 1 ? (
    voltage
      .slice(0, phases)
      .map((v, i) => (
        <ListRow key={i}>
          <span className="value value__phase">L {i + 1}</span>
          <NumericValue value={v} unit="V" />
          <NumericValue value={current[i]} unit="A" precision={1} />
          <NumericValue value={power[i]} unit="W" />
          <NumericValue value={frequency[i]} unit="Hz" />
        </ListRow>
      ))
      .concat(temperatures)
  ) : (
    <>
      <NumericValue value={voltage[0]} unit={"V"} />
      <NumericValue value={current[0]} unit="A" precision={1} />
      <NumericValue value={power[0]} unit="W" />
      <NumericValue value={frequency[0]} unit="Hz" />
      <div className="metric__values__temperatures">{temperatures}</div>
    </>
  )
}

const GensetValues = ({ portalId, phases }) => {
  return (
    <MqttSubscriptions topics={getTopics(portalId)}>
      {(topics) => {
        return <ActiveInTotalValues {...topics} phases={phases} />
      }}
    </MqttSubscriptions>
  )
}

export default GensetValues
