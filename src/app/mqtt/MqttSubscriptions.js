import React, { Component } from "react"
import { MqttClientContext } from "../index.js"

class MqttSubscriptions extends Component {
  componentDidMount() {
    const topics = Object.values(this.props.topics).flat()
    topics.forEach(topic => this.props.subscribe(topic))
  }

  componentDidUpdate(prevProps) {
    const topics = Object.values(this.props.topics).flat()

    if (JSON.stringify(prevProps.topics) !== JSON.stringify(this.props.topics)) {
      console.log("New topics", prevProps.topics, this.props.topicsq)
      if (prevProps.topics !== null) {
        const prevTopics = Object.values(this.prevProps.topics).flat()
        prevTopics.forEach(topic => this.props.unsubscribe(topic))
      }

      topics.forEach(topic => this.props.subscribe(topic))
    }
  }

  componentWillUnmount() {
    const topics = Object.values(this.props.topics).flat()
    topics.forEach(topic => this.props.unsubscribe(topic))
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
