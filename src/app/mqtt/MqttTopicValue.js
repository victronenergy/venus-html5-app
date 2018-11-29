import React, { Component } from "react"
import { getMessageValue, parseTopic } from "../../service/util"
import { MqttClientContext } from "../index.js"

class MqttTopicValue extends Component {
  state = {
    value: null,
    topic: null,
    subscribed: false,
    initialized: false,
    error: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.initialized && this.props.client) {
      this.subscribeToTopic(this.props.topic)
      this.listenFoIncomingMessages()
      this.setState({ initialized: true })
      return
    }

    if (prevProps.topic !== this.props.topic) {
      console.log("New wildcard", prevProps, this.props)
      if (prevProps.topic !== null) {
        // TODO Unsubscribe from previous
      }

      this.subscribeToTopic(this.props.topic)
    }
  }

  subscribeToTopic(topicName) {
    this.props.client.subscribe(topicName, (err, [{ topic, qos }]) => {
      if (err) {
        console.error(`<MqttTopicValue/>`, err)
        this.setState({ error: err })
        return
      }
      console.log(`<MqttTopicValue /> Subscribed to ${topic} with QoS ${qos}`)
      this.setState({ subscribed: true, topic })
    })
  }

  listenFoIncomingMessages() {
    this.props.client.on("message", (topic, message) => {
      // console.log(topic, message.toString())
      // If the subscribe failed, do nothing
      if (this.error) {
        return
      }

      // Only listen to messages for the given topic
      if (!(this.props.topic === topic)) {
        return
      }

      const value = getMessageValue(message)
      console.log(`<MqttTopicValue/> Received ${this.state.topic} >> ${value}`)
      this.setState({ value })
    })
  }

  render() {
    return <>{this.props.children(this.state.value)}</>
  }
}

export default props => (
  <MqttClientContext.Consumer>
    {client => {
      return <MqttTopicValue {...props} client={client} />
    }}
  </MqttClientContext.Consumer>
)
