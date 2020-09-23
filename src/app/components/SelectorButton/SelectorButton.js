import React, { Component } from "react"
import classNames from "classnames"
import { LockContext } from "../../contexts"

// Keep as class component to allow refs
class SelectorButton extends Component {
  static defaultProps = {
    alwaysUnlocked: false
  }

  render() {
    const { disabled, active, narrow, large, onClick, className, children, alwaysUnlocked } = this.props
    return (
      <LockContext.Consumer>
        {context => (
          <div
            onClick={() => (alwaysUnlocked || !(disabled || context.screenLocked)) && onClick()}
            className={classNames(
              "selector-button",
              large ? "text--very-large" : "text--smaller",
              {
                "selector-button--active": active,
                "selector-button--narrow": narrow,
                "selector-button--disabled": !alwaysUnlocked && (disabled || context.screenLocked)
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
