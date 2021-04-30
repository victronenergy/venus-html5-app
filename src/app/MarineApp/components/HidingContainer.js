import React, { Component } from "react"

export default class HidingElement extends Component {
  ref = React.createRef()

  render() {
    return (
      <div className="hiding-container" ref={this.ref}>
        {this.props.children}
      </div>
    )
  }
}
