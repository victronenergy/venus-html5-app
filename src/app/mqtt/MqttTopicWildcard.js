import { h, Component } from "preact"
import { getMessageValue, parseTopic } from "../../service/util"

class MqttTopicWildcard extends Component {
  state = {
    values: {},
    initialized: false,
    subscribed: false,
    error: null
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.initialized && this.context.client) {
      this.listenFoIncomingMessages()
      this.subscribeToTopic(this.props.wildcard)
      this.setState({ initialized: true })
      return
    }

    if (prevProps.wildcard !== this.props.wildcard) {
      console.log("New wildcard", prevProps, this.props)
      if (prevProps.wildcard !== null) {
        // TODO Unsubscribe from previous
      }

      this.subscribeToTopic(this.props.wildcard)
    }
  }

  subscribeToTopic(wildcard) {
    this.context.client.subscribe(wildcard, (err, [{ topic, qos }]) => {
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
  }

  listenFoIncomingMessages() {
    this.context.client.on("message", (topic, message) => {
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

  render(props, state) {
    // In Preact, `children` is always an array, so get first element
    return <>{props.children[0](state.values)}</>
  }
}

export default MqttTopicWildcard
