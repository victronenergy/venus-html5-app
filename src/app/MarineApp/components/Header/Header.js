import React, { Component, Fragment } from "react"
import SelectorButton from "../SelectorButton"
import { LockButtonHeader } from "../../components/LockButton/LockButton"
import { VIEWS } from "../../../utils/constants"

import "./Header.scss"

import Logo from "../../images/icons/logo.png"
import LIcon from "../../images/icons/L.svg"
import RIcon from "../../images/icons/R.svg"

export const Header = (props) => {
  const {
    showRemoteConsoleSetting,
    currentView,
    handleRemoteConsoleButtonClicked,
    handleLockScreenButtonClicked,
    showLockButton,
    setPage,
    currentPage,
    pages,
  } = props
  return (
    <Fragment>
      <header>
        <img src={Logo} className="logo" alt={"Logo"} />
        {currentView === VIEWS.METRICS && pages > 1 && (
          <Paginator setPage={setPage} currentPage={currentPage} pages={pages} />
        )}

        <div className="header-button-container">
          <LockButtonHeader
            onClick={handleLockScreenButtonClicked}
            currentView={currentView}
            header={true}
            showLockButton={showLockButton}
          />

          {showRemoteConsoleSetting && (
            <button className="remote-console-button" onClick={handleRemoteConsoleButtonClicked}>
              {currentView !== VIEWS.REMOTE_CONSOLE ? "Remote Console" : "Close"}
            </button>
          )}
        </div>
      </header>
    </Fragment>
  )
}

const Paginator = ({ setPage, currentPage, pages }) => {
  return (
    <div className="header__paginator">
      <SelectorButton alwaysUnlocked={true} disabled={currentPage < 1} onClick={() => setPage(currentPage - 1)}>
        <img src={LIcon} className="header__paginator-button" alt={"Header Paginator Button"} />
      </SelectorButton>
      <span className="header__paginator-page">
        {[...Array(pages).keys()].map((page) => (
          <svg height="50" width="20" key={page}>
            <circle cx="10" cy="25" r="5" fill={page === currentPage ? "#30afff" : "#aaa"} />
          </svg>
        ))}
      </span>

      <SelectorButton
        alwaysUnlocked={true}
        disabled={currentPage + 1 >= pages}
        onClick={() => setPage(currentPage + 1)}
      >
        <img src={RIcon} className="header__paginator-button" alt={"Header Paginator Button"} />
      </SelectorButton>
    </div>
  )
}

class HeaderWithData extends Component {
  render() {
    const { currentView, handleRemoteConsoleButtonClicked, setPage, currentPage, pages } = this.props
    return (
      // <MqttSubscriptions topics={{ showRemoteConsoleSetting: `N/${portalId}/settings/0/Settings/System/VncLocal` }}>
      //   {topics => {
      //     return (
      <Header
        showRemoteConsoleSetting={true} // TODO: !!topics.showRemoteConsoleSetting
        handleRemoteConsoleButtonClicked={handleRemoteConsoleButtonClicked}
        handleLockScreenButtonClicked={handleLockScreenButtonClicked}
        currentView={currentView}
        setPage={setPage}
        currentPage={currentPage}
        pages={pages}
      />
      //     )
      //   }}
      // </MqttSubscriptions>
    )
  }
}

class HeaderWithoutMQTTData extends Component {
  render() {
    const { currentView, handleRemoteConsoleButtonClicked, handleLockScreenButtonClicked } = this.props
    return (
      <Header
        showRemoteConsoleSetting={true}
        handleRemoteConsoleButtonClicked={handleRemoteConsoleButtonClicked}
        handleLockScreenButtonClicked={handleLockScreenButtonClicked}
        currentView={currentView}
        showLockButton={false}
      />
    )
  }
}

export default HeaderWithData

export { HeaderWithData, HeaderWithoutMQTTData }
