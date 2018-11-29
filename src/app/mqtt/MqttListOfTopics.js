import React, { Component } from "react"
import { getMessageValue, parseTopic } from "../../service/util"
import { MqttClientContext } from "../index.js"

class MqttListOfTopics extends Component {
  constructor(props) {
    super(props)
    const initialValues = {}
    props.topicList.forEach(topic => {
      const topicParts = parseTopic(topic)
      initialValues[topic] = { ...topicParts, value: null }
    })
    this.state = {
      values: initialValues,
      initialized: false,
      subscribed: false,
      error: null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.initialized && this.props.client) {
      this.subscribeToListOfTopics(this.props.topicList)
      this.listenFoIncomingMessages()
      this.setState({ initialized: true })
      return
    }

    if (JSON.stringify(prevProps.topicList) !== JSON.stringify(this.props.topicList)) {
      console.log("New topicList", prevProps, this.props)
      if (prevProps.topicList !== null) {
        this.unsubscribeFromListOfTopics(prevProps.topicList)
      }

      this.subscribeToListOfTopics(this.props.topicList)
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromListOfTopics(this.props.topicList)
  }

  unsubscribeFromListOfTopics(listOfTopics) {
    console.log("<MqttListOfTopics> Unsubscribing from ", listOfTopics)
    this.props.client.unsubscribe(listOfTopics)
  }

  subscribeToListOfTopics(listOfTopics) {
    this.props.client.subscribe(listOfTopics, (err, topicsSubscribed) => {
      if (err) {
        console.error(`<MqttListOfTopics/>`, err)
        this.setState({ error: err })
        return
      }

      topicsSubscribed.forEach(({ topic, qos }) => {
        console.log(`<MqttListOfTopics /> Subscribed to ${topic} with QoS ${qos}`)
      })
      this.setState({
        subscribed: true
      })
    })

    // Then send read request, to make sure we get data immediately
    listOfTopics.forEach(topic => {
      console.log(`<MqttListOfTopics /> Publish read request to ${topic.replace("N/", "R/")}`)
      this.props.client.publish(topic.replace("N/", "R/"))
    })
  }

  listenFoIncomingMessages() {
    this.props.client.on("message", (topic, message) => {
      // If the subscribe failed, do nothing
      if (this.error) {
        return
      }

      // Only listen to messages for the the topics we subscribed to in this component
      // Callback from subscribing takes a long time to come back, so just check based on props
      if (!this.props.topicList.includes(topic)) {
        return
      }

      const value = getMessageValue(message)
      console.log(`<MqttListOfTopics /> Received ${topic} >> ${value}`)
      const topicParts = parseTopic(topic)
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
    return <>{this.props.children(this.state.values)}</>
  }
}

export default props => (
  <MqttClientContext.Consumer>
    {client => {
      return <MqttListOfTopics {...props} client={client} />
    }}
  </MqttClientContext.Consumer>
)
