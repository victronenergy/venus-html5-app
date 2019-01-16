import React, { Component } from "react"
import { VIEWS } from "../utils/constants"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"

const Header = props => {
  const { isConnected, showRemoteConsoleSetting, currentView, handleRemoteConsoleButtonClicked } = props
  return (
    <header>
      <img src={require("../../images/icons/logo.png")} className="logo" />
      <div className="connection">
        <img src={require("../../images/icons/connected.svg")} className="connection__icon" />
        <p className="text text--small">{isConnected ? "Connected" : "Disconnected"}</p>
        {showRemoteConsoleSetting && (
          <button
            className="remote-console-button text text--small"
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

// TODO Add topic for SystemSetup and then change value passed to header
// showRemoteConsoleSetting={topics.showRemoteConsoleSetting}
class HeaderWithData extends Component {
  render() {
    const { portalId, isConnected, currentView, handleRemoteConsoleButtonClicked } = this.props
    return (
      <MqttSubscriptions
        topics={{ showRemoteConsoleSetting: `N/${portalId}/settings/0/Settings/SystemSetup/<placeholder>` }}
      >
        {topics => {
          return (
            <Header
              showRemoteConsoleSetting={true}
              isConnected={isConnected}
              handleRemoteConsoleButtonClicked={handleRemoteConsoleButtonClicked}
              currentView={currentView}
            />
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default HeaderWithData
