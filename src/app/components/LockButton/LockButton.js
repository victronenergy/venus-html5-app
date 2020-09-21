import React, { Component } from "react"
import { InlineIcon } from "@iconify/react"
import lockIcon from "@iconify/icons-simple-line-icons/lock"
import lockOpen from "@iconify/icons-simple-line-icons/lock-open"
import "./LockButton.scss"

class LockButton extends Component {
  render() {
    const { onClick, screenLocked } = this.props
    return (
      <button className="lock-button" onClick={onClick}>
        {screenLocked ? (
          <span>
            <InlineIcon icon={lockIcon} /> &nbsp; Unlock to make changes
          </span>
        ) : (
          <span>
            <InlineIcon icon={lockOpen} /> &nbsp; Lock to prevent changes
          </span>
        )}
      </button>
    )
  }
}

class LockButtonFooter extends Component {
  render() {
    const { onClick, screenLocked } = this.props
    return (
      <div className="lock-button-footer" onClick={onClick}>
        {screenLocked ? (
          <div>
            <InlineIcon icon={lockIcon} /> &nbsp; Unlock to make changes
          </div>
        ) : (
          <div>
            <InlineIcon icon={lockOpen} /> &nbsp; Lock to prevent changes
          </div>
        )}
      </div>
    )
  }
}

export default LockButton

export { LockButton, LockButtonFooter }
