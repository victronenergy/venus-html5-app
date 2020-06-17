import React, { Component } from "react"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import { VIEWS } from "../../utils/constants"

import "./Header.scss"

const Header = props => {
  const { showRemoteConsoleSetting, currentView, handleRemoteConsoleButtonClicked } = props
  return (
    <header>
      <img src={require("../../../images/icons/logo.png")} className="logo" />
      <div className="connection">
        {showRemoteConsoleSetting && (
          <button className="remote-console-button text text--small" onClick={handleRemoteConsoleButtonClicked}>
            {currentView !== VIEWS.REMOTE_CONSOLE ? "Remote Console" : "Close"}
          </button>
        )}
      </div>
    </header>
  )
}

class HeaderWithData extends Component {
  render() {
    const { portalId, currentView, handleRemoteConsoleButtonClicked } = this.props
    return (
      <MqttSubscriptions topics={{ showRemoteConsoleSetting: `N/${portalId}/settings/0/Settings/System/VncLocal` }}>
        {topics => {
          return (
            <Header
              showRemoteConsoleSetting={!!topics.showRemoteConsoleSetting}
              handleRemoteConsoleButtonClicked={handleRemoteConsoleButtonClicked}
              currentView={currentView}
            />
          )
        }}
      </MqttSubscriptions>
    )
  }
}

class HeaderWithoutMQTTData extends Component {
  render() {
    const { currentView, handleRemoteConsoleButtonClicked } = this.props
    return (
      <Header
        showRemoteConsoleSetting={true}
        handleRemoteConsoleButtonClicked={handleRemoteConsoleButtonClicked}
        currentView={currentView}
      />
    )
  }
}

export default HeaderWithData

export { HeaderWithData, HeaderWithoutMQTTData }
