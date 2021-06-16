import React, { Component } from "react"

export default class ColumnContainer extends Component {
  render() {
    return <div className="column-container">{this.props.children}</div>
  }
}
