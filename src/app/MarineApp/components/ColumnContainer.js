import React, { Component } from "react"

export default class ColumnElement extends Component {
  render() {
    return <div className="column-container">{this.props.children}</div>
  }
}
