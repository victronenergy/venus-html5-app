import React, { Component } from "react"
import classNames from "classnames"

// Keep as class component to allow refs
class SelectorButton extends Component {
  render() {
    const { disabled, active, onClick } = this.props
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={classNames(
          "selector-button",
          "text",
          { "selector-button--active": active },
          this.props.className || ""
        )}
      >
        <span>{this.props.children}</span>
      </button>
    )
  }
}

export default SelectorButton
