import React, { Component } from "react"
import classNames from "classnames"
import "./SelectorButton.scss"
import { LockContext } from "../../../contexts"

// Keep as class component to allow refs
class SelectorButton extends Component {
  static defaultProps = {
    alwaysUnlocked: false,
  }

  render() {
    const { disabled, active, narrow, large, onClick, className, children, alwaysUnlocked } = this.props
    return (
      <LockContext.Consumer>
        {(context) => (
          <div
            // Buttons are shown as 'disabled' and do not 'onClick' if screenLocked
            // ... except if they are alwaysUnlocked (pagination buttons)
            // ... alwaysUnlocked buttons can still be disabled (e.g. 'previous page'-button on page 1)
            onClick={() => (!context.screenLocked || alwaysUnlocked) && !disabled && onClick()}
            className={classNames(
              "selector-button",
              large ? "text--very-large" : "text--smaller",
              {
                "selector-button--active": active,
                "selector-button--narrow": narrow,
                "selector-button--disabled": disabled || (context.screenLocked && !alwaysUnlocked),
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
