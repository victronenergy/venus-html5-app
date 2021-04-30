import React, { Component } from "react"
import classNames from "classnames"
import "./SelectorButton.scss"

// Keep as class component to allow refs
class SelectorButton extends Component {
  render() {
    const { disabled, active, narrow, large, onClick, className, children } = this.props
    return (
      <div
        onClick={() => !disabled && onClick()}
        className={classNames(
          "selector-button",
          large ? "text--very-large" : "text--smaller",
          {
            "selector-button--active": active,
            "selector-button--narrow": narrow,
            "selector-button--disabled": disabled,
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
