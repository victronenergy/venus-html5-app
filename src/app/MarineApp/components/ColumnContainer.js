import React, { Component } from "react"

export default class ColumnContainer extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    return <div className="column-container">{this.props.children}</div>
  }
}
