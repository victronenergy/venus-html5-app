import React from "react"
import NumericValue from "../NumericValue"
import { phaseSum } from "../../utils/util"
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
  const [voltagePhase1] = props.voltage
  const current = phaseSum(props.current)
  const power = phaseSum(props.power)

  return (
    <>
      <NumericValue value={voltagePhase1.value} unit={"V"} />
      <NumericValue value={current} unit="A" precision={1} />
      <NumericValue value={power} unit="W" />
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
          return <ActiveInTotalValues current={topics.current} voltage={topics.voltage} power={topics.power} />
        }}
      </MqttSubscriptions>
    )
  }
}
