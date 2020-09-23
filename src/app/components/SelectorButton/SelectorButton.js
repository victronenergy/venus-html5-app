import React, { Component } from "react"
import classNames from "classnames"
import { LockContext } from "../../contexts"

// Keep as class component to allow refs
class SelectorButton extends Component {
  render() {
    const { disabled, active, narrow, large, onClick, className, children } = this.props
    return (
      <LockContext.Consumer>
        {context => (
          <div
            onClick={() => !disabled && onClick()}
            className={classNames(
              "selector-button",
              large ? "text--very-large" : "text--smaller",
              {
                "selector-button--active": active,
                "selector-button--narrow": narrow,
                "selector-button--disabled": disabled || context.screenLocked
              },
              className || ""
            )}
          >
            {children}
          </div>
        )}
      </LockContext.Consumer>
    )
  }
}

export default SelectorButton
