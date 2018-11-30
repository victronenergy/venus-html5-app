import React, { Component } from "react"
import { getMessageValue, parseTopic } from "../../service/util"
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
      this.listenFoIncomingMessages()
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

  listenFoIncomingMessages() {
    this.props.client.on("message", (topic, message) => {
      // console.log("<MqttTopicWildcard />  Message received: ", topic, message.toString())
      // If the subscribe failed, do nothing
      if (this.error) {
        return
      }

      // Only listen to messages for the given topic
      const topicParts = parseTopic(topic)
      const wildcardParts = parseTopic(this.props.wildcard)

      // TODO Fix check for dbuspath
      const matchesWildcard =
        (topicParts.dbusPath === wildcardParts.dbusPath || wildcardParts.dbusPath === "+") &&
        (topicParts.portalId === wildcardParts.portalId || wildcardParts.portalId === "+") &&
        (topicParts.serviceType === wildcardParts.serviceType || wildcardParts.serviceType === "+") &&
        (topicParts.deviceInstance === wildcardParts.deviceInstance || wildcardParts.deviceInstance === "+")

      if (!matchesWildcard) {
        return
      }

      const value = getMessageValue(message)
      console.log(`<MqttTopicWildcard /> Received ${topic} >> ${value}`)

      this.setState({
        values: {
          ...this.state.values,
          [topic]: {
            ...topicParts,
            value
          }
        }
      })
    })
  }

  render() {
    return <React.Fragment>{this.props.children(this.state.values)}</React.Fragment>
  }
}

export default props => (
  <MqttClientContext.Consumer>
    {client => {
      return <MqttTopicWildcard {...props} client={client} />
    }}
  </MqttClientContext.Consumer>
)
