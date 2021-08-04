import React from "react"
import classNames from "classnames"
import { VIEWS } from "../../../utils/constants"

import UnlockIcon from "../../../../images/icons/unlock.svg"
import LockIcon from "../../../../images/icons/lock.svg"

import "./LockButton.scss"
import { Translate } from "react-i18nify"
import { useApp } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"

type LockButtonProps = {
  currentView: string
  header: boolean
  showLockButton?: boolean
}

export const LockButton = observer(({ currentView, header, showLockButton = true }: LockButtonProps) => {
  const appStore = useApp()

  return (
    <>
      {currentView === VIEWS.METRICS && showLockButton && (
        <div
          className={classNames("text--smaller", header ? "lock-button" : "lock-button-footer")}
          onClick={appStore.toggleLocked}
        >
          {appStore?.locked ? (
            <>
              <span>
                <img src={LockIcon} className="lock-icon" alt={"Lock icon"} />
              </span>
              <span className="lock-text">
                <Translate value="locker.unlockMessage" />
              </span>
            </>
          ) : (
            <>
              <span>
                <img src={UnlockIcon} className="lock-icon" alt={"Unlock icon"} />
              </span>
              <span className="lock-text">
                <Translate value="locker.lockMessage" />
              </span>
            </>
          )}
        </div>
      )}
    </>
  )
})
