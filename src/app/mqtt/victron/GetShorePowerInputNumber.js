import React, { Component } from "react"
import MqttSubscriptions from "../MqttSubscriptions"
import { AC_SOURCE_TYPE } from "../../../service/topics"

const getTopics = portalId => {
  return {
    acInput0: `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`,
    acInput1: `N/${portalId}/settings/0/Settings/SystemSetup/AcInput2`
  }
}

class GetShorePowerInputNumber extends Component {
  render() {
    const { portalId } = this.props
    return (
      <MqttSubscriptions topics={getTopics(portalId)}>
        {topics => {
          const acInput0 = topics.acInput0.value
          const acInput1 = topics.acInput1.value

          let shorePowerInput = null
          if (acInput0 === AC_SOURCE_TYPE.SHORE || acInput0 === AC_SOURCE_TYPE.GRID) {
            shorePowerInput = 1
          } else if (acInput1 === AC_SOURCE_TYPE.SHORE || acInput1 === AC_SOURCE_TYPE.GRID) {
            shorePowerInput = 2
          }
          return this.props.children(shorePowerInput)
        }}
      </MqttSubscriptions>
    )
  }
}

export default GetShorePowerInputNumber
