import React, { Component } from "react"

const isElementInViewport = el => {
  if (!el) return true
  const rect = el.getBoundingClientRect()
  return rect.right <= window.innerWidth
}

export default class HidingElement extends Component {
  ref = React.createRef()

  render() {
    const visibility = isElementInViewport(this.ref.current) ? "visible" : "hidden"
    return (
      <div style={{ visibility }} className="hiding-container" ref={this.ref}>
        {this.props.children}
      </div>
    )
  }
}
