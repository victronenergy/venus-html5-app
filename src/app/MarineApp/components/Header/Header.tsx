import React, { Fragment, useRef } from "react"

import { useHeader } from "@victronenergy/mfd-modules"

import SelectorButton from "../SelectorButton"
import { VIEWS } from "../../../utils/constants"
import { LockButton } from "../LockButton"

import "./Header.scss"

import Logo from "../../images/icons/logo.png"
import LIcon from "../../images/icons/L.svg"
import RIcon from "../../images/icons/R.svg"
import { Translate } from "react-i18nify"
import { observer } from "mobx-react"
import { ModalVersionInfo } from "../ModalVersionInfo"

type HeaderProps = {
  currentView: string
  handleRemoteConsoleButtonClicked: Function
  setPage?: Function
  currentPage?: number
  pages?: number
  showRemoteConsoleSetting?: boolean
  showLockButton?: boolean
}

export const Header = (props: HeaderProps) => {
  const {
    showRemoteConsoleSetting,
    currentView,
    handleRemoteConsoleButtonClicked,
    showLockButton,
    setPage,
    currentPage,
    pages,
  } = props
  const modalVersionInfoRef = useRef<any>()

  return (
    <Fragment>
      <header>
        <img onClick={() => modalVersionInfoRef.current.open()} src={Logo} className="logo" alt={"Logo"} />
        {currentView === VIEWS.METRICS && pages && pages > 1 && (
          <Paginator setPage={setPage!} currentPage={currentPage!} pages={pages} />
        )}

        <div className="header-button-container">
          <LockButton currentView={currentView} header={true} showLockButton={showLockButton} />

          {showRemoteConsoleSetting && (
            <button className="remote-console-button" onClick={() => handleRemoteConsoleButtonClicked()}>
              {currentView !== VIEWS.REMOTE_CONSOLE ? (
                <Translate value="header.remoteConsole" />
              ) : (
                <Translate value="header.close" />
              )}
            </button>
          )}
        </div>
      </header>
      <ModalVersionInfo ref={modalVersionInfoRef} />
    </Fragment>
  )
}

type PaginatorProps = {
  setPage: Function
  currentPage: number
  pages: number
}

const Paginator = ({ setPage, currentPage, pages }: PaginatorProps) => {
  return (
    <div className="header__paginator">
      <SelectorButton alwaysUnlocked={true} disabled={currentPage < 1} onClick={() => setPage(currentPage - 1)}>
        <img src={LIcon} className="header__paginator-button" alt={"Header Paginator Button"} />
      </SelectorButton>
      <span className="header__paginator-page">
        {pages &&
          Array.from(Array(pages).keys()).map((page) => (
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

const HeaderWithData = observer(
  ({ currentView, handleRemoteConsoleButtonClicked, setPage, currentPage, pages }: HeaderProps) => {
    const { showRemoteConsoleSetting } = useHeader()

    return (
      <Header
        showRemoteConsoleSetting={showRemoteConsoleSetting}
        handleRemoteConsoleButtonClicked={handleRemoteConsoleButtonClicked}
        currentView={currentView}
        setPage={setPage}
        currentPage={currentPage}
        pages={pages}
      />
    )
  }
)

const HeaderWithoutMQTTData = ({ currentView, handleRemoteConsoleButtonClicked }: HeaderProps) => {
  return (
    <Header
      showRemoteConsoleSetting={true}
      handleRemoteConsoleButtonClicked={handleRemoteConsoleButtonClicked}
      currentView={currentView}
      showLockButton={false}
    />
  )
}

export default HeaderWithData

export { HeaderWithData, HeaderWithoutMQTTData }
