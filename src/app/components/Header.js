import React, { Component } from "react"
import { VIEWS } from "../utils/constants"
import MqttSubscriptions from "../mqtt/MqttSubscriptions"

const Header = props => {
  const { isConnected, showRemoteConsoleSetting, currentView } = props
  return (
    <header>
      <img src={require("../../images/icons/logo.png")} className="logo" />
      <div className="connection">
        <img src={require("../../images/icons/connected.svg")} className="connection__icon" />
        <p className="text text--very-small">{isConnected ? "Connected" : "Disconnected"}</p>
        {showRemoteConsoleSetting && (
          <button
            className="remote-console-button text text--very-small"
            onClick={props.handleRemoteConsoleButtonClicked}
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
// showRemoteConsoleSetting={topics.showRemoteConsoleSetting.value}
class HeaderWithData extends Component {
  render() {
    const { portalId, isConnected, currentView } = this.props
    return (
      <MqttSubscriptions
        topics={{ showRemoteConsoleSetting: `N/${portalId}/settings/0/Settings/SystemSetup/<placeholder>` }}
      >
        {topics => {
          return (
            <Header
              showRemoteConsoleSetting={true}
              isConnected={isConnected}
              handleRemoteConsoleButtonClicked={this.props.handleRemoteConsoleButtonClicked}
              currentView={currentView}
            />
          )
        }}
      </MqttSubscriptions>
    )
  }
}

export default HeaderWithData
