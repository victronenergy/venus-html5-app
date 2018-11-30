import React, { Component } from "react"
import MqttTopicList from "../MqttTopicList"
import { AC_SOURCE_TYPE } from "../../../service/topics"

class GetShorePowerInputNumber extends Component {
  render() {
    const { portalId } = this.props
    return (
      <MqttTopicList
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
      </MqttTopicList>
    )
  }
}

export default GetShorePowerInputNumber
