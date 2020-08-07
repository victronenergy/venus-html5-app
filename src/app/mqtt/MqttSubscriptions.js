import React, { Component } from "react"
import { MqttClientContext } from "../contexts"
import { flatten } from "../utils/util"
import Logger from "../utils/logger"

class MqttSubscriptions extends Component {
  componentDidMount() {
    flatten(Object.values(this.props.topics)).forEach(this.props.subscribe)
  }

  componentDidUpdate(prevProps) {
    const oldTopics = flatten(Object.values(prevProps.topics))
    const newTopics = flatten(Object.values(this.props.topics))

    if (JSON.stringify(oldTopics) !== JSON.stringify(newTopics)) {
      Logger.log("Topics changed", oldTopics, newTopics)
      oldTopics.filter(t => !newTopics.includes(t)).forEach(this.props.unsubscribe)
      newTopics.filter(t => !oldTopics.includes(t)).forEach(this.props.subscribe)
    }
  }

  render() {
    return <>{this.props.children(this.props.messages)}</>
  }
}

export default props => (
  <MqttClientContext.Consumer>
    {({ subscribe, unsubscribe, getMessagesByTopics }) => {
      const filteredMessages = getMessagesByTopics(props.topics)
      return (
        <MqttSubscriptions {...props} subscribe={subscribe} unsubscribe={unsubscribe} messages={filteredMessages} />
      )
    }}
  </MqttClientContext.Consumer>
)
