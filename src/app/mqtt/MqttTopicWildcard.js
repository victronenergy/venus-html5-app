import React, { Component } from "react"
import { MqttClientContext } from "../contexts"
import Logger from "../utils/logger"

class MqttTopicWildcard extends Component {
  componentDidMount() {
    this.props.subscribe(this.props.wildcard)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.wildcard !== this.props.wildcard) {
      Logger.log("New wildcard", prevProps, this.props)
      if (prevProps.wildcard !== null) {
        this.props.unsubscribe(this.props.wildcard)
      }

      this.props.subscribe(this.props.wildcard)
    }
  }

  render() {
    return <>{this.props.children(this.props.messages)}</>
  }
}

const MqttTopicWildcardWrapped = props => (
  <MqttClientContext.Consumer>
    {({ subscribe, unsubscribe, getMessagesByWildcard }) => {
      const filteredMessages = getMessagesByWildcard(props.wildcard)
      return (
        <MqttTopicWildcard {...props} subscribe={subscribe} unsubscribe={unsubscribe} messages={filteredMessages} />
      )
    }}
  </MqttClientContext.Consumer>
)

export default MqttTopicWildcardWrapped;
