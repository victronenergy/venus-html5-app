import React, { Component } from "react"
import MqttSubscriptions from "../MqttSubscriptions"
import { AC_SOURCE_TYPE } from "../../utils/constants"

const getTopics = portalId => {
  return {
    acInput1: `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`,
    acInput2: `N/${portalId}/settings/0/Settings/SystemSetup/AcInput2`
  }
}

class GetShorePowerInputNumber extends Component {
  render() {
    const { portalId, children } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => {
          const acInput1 = topics.acInput1
          const acInput2 = topics.acInput2

          if (acInput1 === null || acInput2 === null) {
            return children()
          }

          let shorePowerInput = null
          if (acInput1 === AC_SOURCE_TYPE.SHORE || acInput1 === AC_SOURCE_TYPE.GRID) {
            shorePowerInput = 1
          } else if (acInput2 === AC_SOURCE_TYPE.SHORE || acInput2 === AC_SOURCE_TYPE.GRID) {
            shorePowerInput = 2
          }
          return children(shorePowerInput)
        }}
      </MqttSubscriptions>
    )
  }
}

export default GetShorePowerInputNumber
