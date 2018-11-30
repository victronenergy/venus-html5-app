import React, { Component } from "react"
import { MqttClientContext } from "../index.js"

class MqttTopicList extends Component {
  state = {
    initialized: false
  }
  componentDidUpdate(prevProps) {
    if (!this.state.initialized && this.props.subscribe) {
      this.props.topicList.forEach(topic => this.props.subscribe(topic))
    }

    if (JSON.stringify(prevProps.topicList) !== JSON.stringify(this.props.topicList)) {
      console.log("New topicList", prevProps, this.props)
      if (prevProps.topicList !== null) {
        prevProps.topicList.forEach(topic => this.props.unsubscribe(topic))
      }

      this.props.topicList.forEach(topic => this.props.subscribe(topic))
    }
  }

  componentWillUnmount() {
    this.props.topicList.forEach(topic => this.props.unsubscribe(topic))
  }

  render() {
    return <>{this.props.children(this.props.messages)}</>
  }
}

export default props => (
  <MqttClientContext.Consumer>
    {({ subscribe, unsubscribe, getMessagesByTopics }) => {
      const filteredMessages = getMessagesByTopics(props.topicList)
      return <MqttTopicList {...props} subscribe={subscribe} unsubscribe={unsubscribe} messages={filteredMessages} />
    }}
  </MqttClientContext.Consumer>
)
