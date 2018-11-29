import React, { Component } from "react"
import MqttListOfTopics from "../MqttListOfTopics"
import { AC_SOURCE_TYPE } from "../../../service/topics"

class GetShorePowerInputNumber extends Component {
  render() {
    const { portalId } = this.props
    return (
      <MqttListOfTopics
        topicList={[
          `N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`,
          `N/${portalId}/settings/0/Settings/SystemSetup/AcInput2`
        ]}
      >
        {setupTopics => {
          const acInput0 = setupTopics[`N/${portalId}/settings/0/Settings/SystemSetup/AcInput1`].value
          const acInput1 = setupTopics[`N/${portalId}/settings/0/Settings/SystemSetup/AcInput2`].value

          let shorePowerInput = null
          if (acInput0 === AC_SOURCE_TYPE.SHORE || acInput0 === AC_SOURCE_TYPE.GRID) {
            shorePowerInput = 1
          } else if (acInput1 === AC_SOURCE_TYPE.SHORE || acInput1 === AC_SOURCE_TYPE.GRID) {
            shorePowerInput = 2
          }
          return this.props.children(shorePowerInput)
        }}
      </MqttListOfTopics>
    )
  }
}

export default GetShorePowerInputNumber
