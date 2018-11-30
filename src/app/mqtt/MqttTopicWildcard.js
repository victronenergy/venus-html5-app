import React, { Component } from "react"
import { MqttClientContext } from "../index.js"

class MqttTopicWildcard extends Component {
  state = {
    values: {},
    initialized: false,
    subscribed: false,
    error: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.initialized && this.props.client) {
      this.subscribeToTopic(this.props.wildcard)
      this.setState({ initialized: true })
      return
    }

    if (prevProps.wildcard !== this.props.wildcard) {
      console.log("New wildcard", prevProps, this.props)
      if (prevProps.wildcard !== null) {
        this.unsubscribeFromWildcard(this.props.wildcard)
      }

      this.subscribeToTopic(this.props.wildcard)
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromWildcard(this.props.wildcard)
  }

  unsubscribeFromWildcard(wildcard) {
    this.props.client.unsubscribe(wildcard)
  }

  subscribeToTopic(wildcard) {
    this.props.client.subscribe(wildcard, (err, [{ topic, qos }]) => {
      if (err) {
        console.error(`<MqttTopicWildcard/>`, err)
        this.setState({ error: err })
        return
      }
      console.log(`<MqttTopicWildcard /> Subscribed to ${topic} with QoS ${qos}`)
      this.setState({
        subscribed: true,
        values: { ...this.state.values, [topic]: null }
      })
    })

    // Then send read request, to make sure we get data immediately
    console.log(`<MqttTopicList /> Publish read request to ${wildcard.replace("N/", "R/")}`)
    this.props.client.publish(wildcard.replace("N/", "R/"))
  }

  render() {
    return <>{this.props.children(this.props.messages)}</>
  }
}

export default props => (
  <MqttClientContext.Consumer>
    {({ client, getMessagesByWildcard }) => {
      const filteredMessages = getMessagesByWildcard(props.wildcard)
      return <MqttTopicWildcard {...props} client={client} messages={filteredMessages} />
    }}
  </MqttClientContext.Consumer>
)
