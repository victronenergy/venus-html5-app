import React from "react"

import { ListRow } from "../ListView"
import NumericValue from "../../../components/NumericValue"
import MqttSubscriptions from "../../../mqtt/MqttSubscriptions"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    current: [
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/I`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/I`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/I`,
    ],
    voltage: [
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/V`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/V`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/V`,
    ],
    power: [
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/P`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/P`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/P`,
    ],
  }
}

export const ActiveInTotalValues = ({ voltage, current, power, phases }) => {
  return phases > 1 ? (
    voltage.slice(0, phases).map((v, i) => (
      <ListRow key={i}>
        <span className="value value__phase">L {i + 1}</span>
        <NumericValue value={v} unit="V" />
        <NumericValue value={current[i]} unit="A" precision={1} />
        <NumericValue value={power[i]} unit={"W"} />
      </ListRow>
    ))
  ) : (
    <>
      <NumericValue value={voltage[0]} unit={"V"} />
      <NumericValue value={current[0]} unit="A" precision={1} />
      <NumericValue value={power[0]} unit="W" />
    </>
  )
}

const ActiveInValues = ({ portalId, inverterChargerDeviceId, phases }) => {
  if (!inverterChargerDeviceId) {
    return null
  } else {
    return (
      <MqttSubscriptions topics={getTopics(portalId, inverterChargerDeviceId)}>
        {topics => {
          return <ActiveInTotalValues {...topics} phases={phases} />
        }}
      </MqttSubscriptions>
    )
  }
}

export default ActiveInValues
