import { Component } from "react"
import React from "react"

export const viewChangeDelay = 500
const viewChangeTransitionDuration = viewChangeDelay - 100
const baseStyle = {
  transition: `opacity ${viewChangeTransitionDuration}ms ease`,
  display: "flex",
}

class Fade extends Component {
  state = {
    style: {
      opacity: 0,
    },
  }
  timeoutRef

  fadeIn = () => {
    this.setState({ style: { opacity: 1 } })
  }

  fadeOut = () => {
    this.setState({ style: { opacity: 0 } })
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
    return (
      <div style={{ ...this.state.style, ...baseStyle, ...(this.props.fullWidth && { width: "100%" }) }}>
        {this.props.children}
      </div>
    )
  }
}

export default Fade
