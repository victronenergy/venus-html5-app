import React, { Component, useContext } from "react"
import { InlineIcon } from "@iconify/react"
import lockIcon from "@iconify/icons-simple-line-icons/lock"
import lockOpen from "@iconify/icons-simple-line-icons/lock-open"
import { LockContext } from "../../contexts"
import "./LockButton.scss"

class LockButton extends Component {
  render() {
    return (
      <LockContext.Consumer>
        {context => (
          <button className="lock-button" onClick={context.toggleLocked}>
            {context.screenLocked ? (
              <span>
                <InlineIcon icon={lockIcon} /> &nbsp; Unlock to make changes
              </span>
            ) : (
              <span>
                <InlineIcon icon={lockOpen} /> &nbsp; Lock to prevent changes
              </span>
            )}
          </button>
        )}
      </LockContext.Consumer>
    )
  }
}

class LockButtonFooter extends Component {
  render() {
    return (
      <LockContext.Consumer>
        {context => (
          <div className="lock-button-footer" onClick={context.toggleLocked}>
            {context.screenLocked ? (
              <div>
                <InlineIcon icon={lockIcon} /> &nbsp; Unlock to make changes
              </div>
            ) : (
              <div>
                <InlineIcon icon={lockOpen} /> &nbsp; Lock to prevent changes
              </div>
            )}
          </div>
        )}
      </LockContext.Consumer>
    )
  }
}

export default LockButton

export { LockButton, LockButtonFooter }
