import React, { Component } from "react"

const isElementWithinContainer = (el, container) => {
  if (!el || !container) return true
  const elRight = el.getBoundingClientRect().right
  const containerRight = container.getBoundingClientRect().right
  return elRight <= containerRight
}

export default class HidingElement extends Component {
  ref = React.createRef()

  render() {
    const visibility = isElementWithinContainer(this.ref.current, this.props.metricsRef.current) ? "visible" : "hidden"
    return (
      <div style={{ visibility }} className="hiding-container" ref={this.ref}>
        {this.props.children}
      </div>
    )
  }
}
