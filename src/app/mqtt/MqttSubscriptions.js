import React, { Component } from "react"
import { MqttClientContext } from "../contexts"
import { flatten } from "../utils/util"
import Logger from "../utils/logger"

class MqttSubscriptions extends Component {
  componentDidMount() {
    flatten(Object.values(this.props.topics)).forEach(this.props.subscribe)
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.topics) !== JSON.stringify(this.props.topics)) {
      Logger.log("New topics", prevProps.topics, this.props.topics)
      if (prevProps.topics !== null) {
        flatten(Object.values(prevProps.topics)).forEach(this.props.unsubscribe)
      }

      flatten(Object.values(this.props.topics)).forEach(this.props.subscribe)
    }
  }

  render() {
    return <>{this.props.children(this.props.messages)}</>
  }
}

const MqttSubscriptionsWrapped = props => (
  <MqttClientContext.Consumer>
    {({ subscribe, unsubscribe, getMessagesByTopics }) => {
      const filteredMessages = getMessagesByTopics(props.topics)
      return (
        <MqttSubscriptions {...props} subscribe={subscribe} unsubscribe={unsubscribe} messages={filteredMessages} />
      )
    }}
  </MqttClientContext.Consumer>
)

export default MqttSubscriptionsWrapped;
