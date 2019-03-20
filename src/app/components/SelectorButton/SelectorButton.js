import React, { Component } from "react"
import classNames from "classnames"

// Keep as class component to allow refs
class SelectorButton extends Component {
  render() {
    const { disabled, active, narrow, onClick, className, children } = this.props
    return (
      <div
        onClick={() => !disabled && onClick()}
        className={classNames(
          "selector-button",
          "text",
          {
            "selector-button--active": active,
            "selector-button--narrow": narrow,
            "selector-button--disabled": disabled
          },
          className || ""
        )}
      >
        {children}
      </div>
    )
  }
}

export default SelectorButton
