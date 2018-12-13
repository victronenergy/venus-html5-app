import React, { Component } from "react"

const isElementInViewport = el => {
  if (!el) return true
  const rect = el.getBoundingClientRect()
  // return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth
  return rect.bottom <= window.innerHeight
}

export default class HidingElement extends Component {
  ref = React.createRef()

  render() {
    const opacity = isElementInViewport(this.ref.current) ? 1 : 0
    return (
      <div style={{ opacity: opacity }} className="hiding-container" ref={this.ref}>
        {this.props.children}
      </div>
    )
  }
}
