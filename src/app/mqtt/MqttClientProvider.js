import React, { Component } from "react"
import { MqttClientContext } from "../index.js"

import * as mqtt from "mqtt"
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
    hasFailedToConnect: false
  }

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
    })
  }

  render() {
    return (
      <MqttClientContext.Provider value={this.state.client}>
        {this.props.children(this.state.status, this.state.error)}
      </MqttClientContext.Provider>
    )
  }
}

export default MqttClientProvider
