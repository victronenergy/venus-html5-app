import React, { Component } from "react"
import classNames from "classnames"
import { LockContext } from "../../../contexts"
import { VIEWS } from "../../../utils/constants"

import UnlockIcon from "../../../../images/icons/unlock.svg"
import LockIcon from "../../../../images/icons/lock.svg"

import "./LockButton.scss"

export class LockButtonHeader extends Component {
  render() {
    const { currentView, header, showLockButton } = this.props
    return <LockButton currentView={currentView} header={header} showLockButton={showLockButton} />
  }
}

// Renders on mobile/vertical views
export class LockButtonFooter extends Component {
  render() {
    const { currentView, header } = this.props
    return <LockButton currentView={currentView} header={header} />
  }
}

export class LockButton extends Component {
  static defaultProps = {
    showLockButton: true,
  }
  render() {
    const { currentView, header, showLockButton } = this.props
    return (
      <>
        {currentView === VIEWS.METRICS && showLockButton && (
          <LockContext.Consumer>
            {(context) => (
              <div
                className={classNames("text--smaller", header ? "lock-button" : "lock-button-footer")}
                onClick={context.toggleLocked}
              >
                {context.screenLocked ? (
                  <>
                    <span>
                      <img src={LockIcon} className="lock-icon" alt={"Lock icon"} />
                    </span>
                    <span className="lock-text">Unlock to make changes</span>
                  </>
                ) : (
                  <>
                    <span>
                      <img src={UnlockIcon} className="lock-icon" alt={"Unlock icon"} />
                    </span>
                    <span className="lock-text">Lock to prevent changes</span>
                  </>
                )}
              </div>
            )}
          </LockContext.Consumer>
        )}
      </>
    )
  }
}
