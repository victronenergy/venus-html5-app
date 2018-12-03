import React, { Component } from "react"
import { MqttClientContext } from "../index"

class MqttWriteValue extends Component {
  publish = value => {
    let data = JSON.stringify({ value: value })
    this.props.publish(this.props.topic, data)
  }
  render() {
    return <>{this.props.children(this.props.isConnected, this.publish)}</>
  }
}

export default props => (
  <MqttClientContext.Consumer>
    {({ publish, isConnected }) => {
      return <MqttWriteValue {...props} publish={publish} isConnected={isConnected} />
    }}
  </MqttClientContext.Consumer>
)
