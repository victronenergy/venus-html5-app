import { Component } from "react"
import React from "react"

export const viewChangeDelay = 500
const viewChangeTransitionDuration = viewChangeDelay - 100

class Fade extends Component {
  fadeTransition = `opacity ${viewChangeTransitionDuration}ms ease`
  state = {
    style: {
      opacity: 0,
      transition: this.fadeTransition
    }
  }
  timeoutRef

  fadeIn = () => {
    this.setState({ style: { opacity: 1, transition: this.fadeTransition } })
  }

  fadeOut = () => {
    this.setState({ style: { opacity: 0, transition: this.fadeTransition } })
  }

  componentDidMount() {
    this.timeoutRef = setTimeout(this.fadeIn, 10)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.unmount && this.props.unmount) {
      this.timeoutRef = setTimeout(this.fadeOut, 10)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutRef)
  }

  render() {
    return <div style={this.state.style}>{this.props.children}</div>
  }
}

export default Fade
