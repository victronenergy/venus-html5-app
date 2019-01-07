import React from "react"

import { ListRow } from "../ListView/ListView"
import NumericValue from "../NumericValue"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"

const getTopics = (portalId, vebusInstanceId) => {
  return {
    current: [
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/I`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/I`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/I`
    ],
    voltage: [
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/V`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/V`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/V`
    ],
    power: [
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L1/P`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L2/P`,
      `N/${portalId}/vebus/${vebusInstanceId}/Ac/ActiveIn/L3/P`
    ]
  }
}

export const ActiveInTotalValues = props => {
  const { voltage, current, power, threePhase } = props

  return threePhase ? (
    voltage.map((v, i) => (
      <ListRow>
        <span className="text text--smaller">Phase {i + 1}</span>
        <NumericValue value={v.value} unit="V" />
        <NumericValue value={current[i].value} unit="A" precision={1} />
        <NumericValue value={power[i].value} unit={"W"} />
      </ListRow>
    ))
  ) : (
    <>
      <NumericValue value={voltage[0].value} unit={"V"} />
      <NumericValue value={current[0].value} unit="A" precision={1} />
      <NumericValue value={power[0].value} unit="W" />
    </>
  )
}

export default props => {
  const { portalId, vebusInstanceId } = props
  if (!vebusInstanceId) {
    return null
  } else {
    return (
      <MqttSubscriptions topics={getTopics(portalId, vebusInstanceId)}>
        {topics => {
          return <ActiveInTotalValues {...topics} threePhase={props.threePhase} />
        }}
      </MqttSubscriptions>
    )
  }
}
