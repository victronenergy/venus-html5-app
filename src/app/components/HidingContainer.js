import React, { Component } from "react"

const isElementWithinWindow = el => {
  if (!el) return true
  const elLeft = el.getBoundingClientRect().left
  const elRight = el.getBoundingClientRect().right
  return elLeft >= 0 && elRight <= window.innerWidth
}

export default class HidingElement extends Component {
  ref = React.createRef()

  render() {
    const visibility = isElementWithinWindow(this.ref.current) ? "visible" : "hidden"
    return (
      <div style={{ visibility }} className="hiding-container" ref={this.ref}>
        {this.props.children}
      </div>
    )
  }
}
