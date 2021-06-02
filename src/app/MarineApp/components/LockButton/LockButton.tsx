import React from "react"
import classNames from "classnames"
import { VIEWS } from "../../../utils/constants"

import UnlockIcon from "../../../../images/icons/unlock.svg"
import LockIcon from "../../../../images/icons/lock.svg"

import "./LockButton.scss"
import { useApp, useAppService } from "../../../modules"

type LockButtonProps = {
  currentView: string
  header: boolean
  showLockButton?: boolean
}

export const LockButton = ({ currentView, header, showLockButton = true }: LockButtonProps) => {
  const state = useApp()
  const appService = useAppService()

  return (
    <>
      {currentView === VIEWS.METRICS && showLockButton && (
        <div
          className={classNames("text--smaller", header ? "lock-button" : "lock-button-footer")}
          onClick={appService.toggleLocked}
        >
          {state?.locked ? (
            <>
              <span>
                <img src={LockIcon} className="lock-icon" alt={"Lock icon"} />
              </span>
              <span className="lock-text">Unlock to make changes</span>
            </>
          ) : (
            <>
              <span>
                <img src={UnlockIcon} className="lock-icon" alt={"Unlock icon"} />
              </span>
              <span className="lock-text">Lock to prevent changes</span>
            </>
          )}
        </div>
      )}
    </>
  )
}
