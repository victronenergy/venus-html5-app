import React, { Component } from "react"
import { MqttClientContext } from "../index.js"

import * as mqtt from "mqtt"
import { getMessageJson } from "../utils/util"
export const STATUS = {
  CONNECTING: "connecting",
  CONNECTED: "connected",
  DISCONNECTED: "disconnected",
  RECONNECTING: "reconnecting"
}

class MqttClientProvider extends Component {
  state = {
    client: null,
    error: null,
    status: STATUS.CONNECTING,
    hasFailedToConnect: false,
    messages: {}
  }
  topicsSubscribed = new Set()
  keepaliveHAndlerRef
  portalId = null

  componentDidMount() {
    const client = mqtt.connect(`mqtt://${this.props.host}:${this.props.port}`)
    this.setState({ client })

    client.stream.on("error", error => {
      this.setState({ error })
    })

    client.on("error", error => {
      this.setState({ error })
    })

    client.on("connect", () => {
      this.setState({ status: STATUS.CONNECTED })
    })

    client.on("disconnect", () => {
      this.setState({ status: STATUS.DISCONNECTED })
    })

    client.on("reconnect", () => {
      const previousStatus = this.state.status
      this.setState({ status: STATUS.RECONNECTING })

      if (previousStatus === STATUS.CONNECTING && this.state.error) {
        client.end()
        this.setState({ hasFailedToConnect: true })
      }
    })

    client.on("message", (topic, message) => {
      console.log(`Message received: ${topic} - ${message.toString()}`)
      if (topic.endsWith("/system/0/Serial") && !this.portalId) {
        this.portalId = getMessageJson(message).value
        this.sendKeepalive() // Send keepalive to trigger messages to return immediately
        this.setupKeepalive()
      }

      this.setState({
        messages: {
          ...this.state.messages,
          [topic]: getMessageJson(message)
        }
      })
    })
  }

  sendKeepalive = () => {
    this.publish(`R/${this.portalId}/system/0/Serial`, "")
  }

  setupKeepalive = () => {
    clearInterval(this.keepaliveHAndlerRef)
    this.keepaliveHAndlerRef = setInterval(this.sendKeepalive, 50000)
  }

  subscribe = topic => {
    if (!this.topicsSubscribed.has(topic)) {
      console.log(`Subscribing to ${topic}`)
      this.state.client.subscribe(topic, (err, granted) => {
        if (err) {
          console.error(err)
          return
        }
        console.log(
          `Subscribed to ${granted[0] ? granted[0].topic : topic} with QoS ${granted[0] ? granted[0].qos : "unknown"}`
        )
        this.topicsSubscribed.add(topic)
      })
    }
  }

  unsubscribe = topic => {
    if (this.topicsSubscribed.has(topic)) {
      this.state.client.unsubscribe(topic, err => {
        if (err) {
          console.error(err)
          return
        }
        console.log(`Unsubscribed from ${topic}`)
        this.topicsSubscribed.delete(topic)
      })
    }
  }

  getMessagesByTopics = topics => {
    return Object.entries(topics).reduce((res, [key, topics]) => {
      const value = Array.isArray(topics)
        ? topics.map(t => this.state.messages[t] || { value: null })
        : this.state.messages[topics] || { value: null }
      res[key] = value
      return res
    }, {})
  }

  getMessagesByWildcard = wildcard => {
    const re = new RegExp(wildcard.replace(/\+/g, ".*")) // + in mqtt is anything -> .*
    return Object.keys(this.state.messages)
      .filter(t => t.match(re))
      .reduce((obj, key) => {
        obj[key] = this.state.messages[key]
        return obj
      }, {})
  }

  publish = (topic, data) => {
    if (!this.isConnected()) {
      console.error("Could not publish value")
    }

    console.log(`Publishing to ${topic}: ${data}`)
    this.state.client.publish(topic, data)
  }

  isConnected = () => {
    return this.state.status === STATUS.CONNECTED
  }

  render() {
    return (
      <MqttClientContext.Provider
        value={{
          isConnected: this.isConnected(),
          subscribe: this.state.client ? this.subscribe : null,
          unsubscribe: this.state.client ? this.unsubscribe : null,
          publish: this.state.client ? this.publish : null,
          messages: this.state.messages,
          getMessagesByTopics: this.getMessagesByTopics,
          getMessagesByWildcard: this.getMessagesByWildcard
        }}
      >
        {this.props.children(this.state.status, this.isConnected(), this.state.error)}
      </MqttClientContext.Provider>
    )
  }
}

export default MqttClientProvider
