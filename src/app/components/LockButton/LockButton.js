import React, { Component } from "react"
import classNames from "classnames"
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

export default LockButton
