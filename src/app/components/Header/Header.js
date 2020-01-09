import React, { Component } from "react"
import classnames from "classnames"

import MqttSubscriptions from "../../mqtt/MqttSubscriptions"

import { VIEWS } from "../../utils/constants"

import "./Header.scss"

const Header = props => {
  const { isConnected, showRemoteConsoleSetting, currentView, handleRemoteConsoleButtonClicked, isMobileDevice } = props
  return (
    <header>
      <img src={require("../../../images/icons/logo.png")} className="logo" />
      <div className="connection">
        {showRemoteConsoleSetting && (
          <button
            className={classnames("remote-console-button", "text", "text--small", { "mobile-view": isMobileDevice })}
            onClick={handleRemoteConsoleButtonClicked}
            disabled={!isConnected}
          >
            {currentView !== VIEWS.REMOTE_CONSOLE ? "Remote Console" : "Close"}
          </button>
        )}
      </div>
    </header>
  )
}

class HeaderWithData extends Component {
  render() {
    const { portalId, isConnected, currentView, handleRemoteConsoleButtonClicked, isMobileDevice } = this.props
    return (
      <MqttSubscriptions topics={{ showRemoteConsoleSetting: `N/${portalId}/settings/0/Settings/System/VncLocal` }}>
        {topics => {
          return (
            <Header
              showRemoteConsoleSetting={!!topics.showRemoteConsoleSetting}
              isConnected={isConnected}
              handleRemoteConsoleButtonClicked={handleRemoteConsoleButtonClicked}
              currentView={currentView}
              isMobileDevice={isMobileDevice}
            />
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default HeaderWithData
