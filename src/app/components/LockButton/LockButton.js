import React, { Component, useContext } from "react"
import { InlineIcon } from "@iconify/react"
import lockIcon from "@iconify/icons-simple-line-icons/lock"
import lockOpen from "@iconify/icons-simple-line-icons/lock-open"
import { LockContext } from "../../contexts"
import "./LockButton.scss"
import { VIEWS } from "../../utils/constants"

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
              <div className={header ? "lock-button" : "lock-button-footer"} onClick={context.toggleLocked}>
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
        )}
      </>
    )
  }
}

export default LockButtonHeader

export { LockButtonHeader, LockButtonFooter, LockButton }
