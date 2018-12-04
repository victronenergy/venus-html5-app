import React, { Component } from "react"
import { MqttClientContext } from "../index.js"
import { flatten } from "../utils/util"

class MqttSubscriptions extends Component {
  componentDidMount() {
    flatten(Object.values(this.props.topics)).forEach(this.props.subscribe)
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.topics) !== JSON.stringify(this.props.topics)) {
      console.log("New topics", prevProps.topics, this.props.topicsq)
      if (prevProps.topics !== null) {
        flatten(Object.values(this.prevProps.topics)).forEach(this.props.unsubscribe)
      }

      flatten(Object.values(this.props.topics)).forEach(this.props.subscribe)
    }
  }

  componentWillUnmount() {
    flatten(Object.values(this.props.topics)).forEach(this.props.unsubscribe)
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
