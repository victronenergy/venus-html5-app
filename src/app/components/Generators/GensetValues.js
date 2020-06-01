import React from "react"

import { ListRow } from "../ListView/ListView"
import NumericValue from "../NumericValue/index"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"

const getTopics = portalId => {
  return {
    voltage: [
      `N/${portalId}/genset/0/Ac/L1/Voltage`,
      `N/${portalId}/genset/0/Ac/L2/Voltage`,
      `N/${portalId}/genset/0/Ac/L3/Voltage`
    ],
    current: [
      `N/${portalId}/genset/0/Ac/L1/Current`,
      `N/${portalId}/genset/0/Ac/L2/Current`,
      `N/${portalId}/genset/0/Ac/L3/Current`
    ],
    power: [
      `N/${portalId}/genset/0/Ac/L1/Power`,
      `N/${portalId}/genset/0/Ac/L2/Power`,
      `N/${portalId}/genset/0/Ac/L3/Power`
    ],
    frequency: [
      `N/${portalId}/genset/0/Ac/L1/Frequency`,
      `N/${portalId}/genset/0/Ac/L2/Frequency`,
      `N/${portalId}/genset/0/Ac/L3/Frequency`
    ]
  }
}

export const ActiveInTotalValues = ({ voltage, current, power, frequency, threePhase }) => {
  return threePhase ? (
    voltage.map((v, i) => (
      <ListRow key={i}>
        <span className="value value__phase">L {i + 1}</span>
        <NumericValue value={v} unit="V" />
        <NumericValue value={current[i]} unit="A" precision={1} />
        <NumericValue value={power[i]} unit="W" />
        <NumericValue value={frequency[i]} unit="Hz" />
      </ListRow>
    ))
  ) : (
    <>
      <NumericValue value={voltage[0]} unit={"V"} />
      <NumericValue value={current[0]} unit="A" precision={1} />
      <NumericValue value={power[0]} unit="W" />
      <NumericValue value={frequency[0]} unit="Hz" />
    </>
  )
}

export default ({ portalId, threePhase }) => {
  return (
    <MqttSubscriptions topics={getTopics(portalId)}>
      {topics => {
        return <ActiveInTotalValues {...topics} threePhase={threePhase} />
      }}
    </MqttSubscriptions>
  )
}
