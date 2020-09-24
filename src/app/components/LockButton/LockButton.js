import React, { Component, useContext } from "react"
import classNames from "classnames"
import { LockContext } from "../../contexts"
import { VIEWS } from "../../utils/constants"
import "./LockButton.scss"

class LockButtonHeader extends Component {
  render() {
    const { currentView, header } = this.props
    return <LockButton currentView={currentView} header={header} />
  }
}

// Renders on mobile/vertical views
class LockButtonFooter extends Component {
  render() {
    const { currentView, header } = this.props
    return <LockButton currentView={currentView} header={header} />
  }
}

class LockButton extends Component {
  render() {
    const { currentView, header } = this.props
    return (
      <>
        {currentView === VIEWS.METRICS && (
          <LockContext.Consumer>
            {context => (
              <div
                className={classNames("text--smaller", header ? "lock-button" : "lock-button-footer")}
                onClick={context.toggleLocked}
              >
                {context.screenLocked ? (
                  <>
                    <span>
                      <img src={require("../../../images/icons/VRM_MFD_Lock.svg")} className="lock-icon" />
                    </span>
                    &nbsp; Unlock to make changes
                  </>
                ) : (
                  <>
                    <span>
                      <img src={require("../../../images/icons/VRM_MFD_Unlock.svg")} className="lock-icon" />
                    </span>
                    &nbsp; Lock to prevent changes
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

export default LockButtonHeader

export { LockButtonHeader, LockButtonFooter, LockButton }
