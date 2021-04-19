import React, {Component} from 'react'
import {MqttClientContext} from '../contexts'

// TODO: Remove once all usages are refactored
class MqttClientProvider extends Component {
  render() {
    return (
      <MqttClientContext.Provider
        value={{
          isConnected: null,
          subscribe: null,
          unsubscribe: null,
          publish: null,
          messages: null,
          getMessagesByTopics: null,
          getMessagesByWildcard: null
        }}
      >
        {this.props.children(null, false, null)}
      </MqttClientContext.Provider>
    )
  }
}

export default MqttClientProvider
