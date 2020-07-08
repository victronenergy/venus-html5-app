import React, { Component } from "react"
import MqttSubscriptions from "../../mqtt/MqttSubscriptions"
import SelectorButton from "../SelectorButton"
import { VIEWS } from "../../utils/constants"

import "./Header.scss"

const Header = props => {
  const { showRemoteConsoleSetting, currentView, handleRemoteConsoleButtonClicked, setPage, currentPage, pages } = props
  return (
    <header>
      <img src={require("../../../images/icons/logo.png")} className="logo" />
      {pages > 1 && <Paginator setPage={setPage} currentPage={currentPage} pages={pages} />}
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

const Paginator = ({ setPage, currentPage, pages }) => {
  return (
    <div className="header__paginator">
      <SelectorButton disabled={currentPage < 1} onClick={() => setPage(currentPage - 1)}>
        <img src={require("../../../images/icons/L.svg")} className="header__paginator-button" />
      </SelectorButton>
      <span className="header__paginator-page">
        {[...Array(pages).keys()].map(page => (
          <svg height="50" width="20">
            <circle cx="10" cy="25" r="5" fill={page === currentPage ? "#30afff" : "#aaa"} />
          </svg>
        ))}
      </span>

      <SelectorButton disabled={currentPage + 1 >= pages} onClick={() => setPage(currentPage + 1)}>
        <img src={require("../../../images/icons/R.svg")} className="header__paginator-button" />
      </SelectorButton>
    </div>
  )
}

class HeaderWithData extends Component {
  render() {
    const { portalId, currentView, handleRemoteConsoleButtonClicked, setPage, currentPage, pages } = this.props
    return (
      <MqttSubscriptions topics={{ showRemoteConsoleSetting: `N/${portalId}/settings/0/Settings/System/VncLocal` }}>
        {topics => {
          return (
            <Header
              showRemoteConsoleSetting={!!topics.showRemoteConsoleSetting}
              handleRemoteConsoleButtonClicked={handleRemoteConsoleButtonClicked}
              currentView={currentView}
              setPage={setPage}
              currentPage={currentPage}
              pages={pages}
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
