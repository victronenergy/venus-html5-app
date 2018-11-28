import { h, Component } from "preact"
import { getMessageValue, parseTopic } from "../../service/util"

class MqttListOfTopics extends Component {
  state = {
    values: {},
    initialized: false,
    subscribed: false,
    error: null
  }

  constructor(props) {
    super(props)
    const initialValues = {}
    props.topicList.forEach(topic => {
      const topicParts = parseTopic(topic)
      initialValues[topic] = { ...topicParts, value: null }
    })
    this.setState({
      values: initialValues
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.initialized && this.context.client) {
      this.subscribeToListOfTopics(this.props.topicList)
      this.listenFoIncomingMessages()
      this.setState({ initialized: true })
      return
    }

    if (JSON.stringify(prevProps.topicList) !== JSON.stringify(this.props.topicList)) {
      console.log("New wildcard", prevProps, this.props)
      if (prevProps.wildcard !== null) {
        // TODO Unsubscribe from previous
      }

      this.subscribeToListOfTopics(this.props.topicList)
    }
  }

  subscribeToListOfTopics(listOfTopics) {
    this.context.client.subscribe(listOfTopics, (err, topicsSubscribed) => {
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
  }

  listenFoIncomingMessages() {
    this.context.client.on("message", (topic, message) => {
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

  render(props, state) {
    // In Preact, `children` is always an array, so get first element
    return <>{props.children[0](state.values)}</>
  }
}

export default MqttListOfTopics
