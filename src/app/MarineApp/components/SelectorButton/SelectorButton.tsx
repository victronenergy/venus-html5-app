import React from "react"
import classNames from "classnames"
import "./SelectorButton.scss"
import { useApp } from "@victronenergy/mfd-modules"
import { observer } from "mobx-react"

type SelectorButtonProps = {
  disabled?: boolean
  active?: boolean
  narrow?: boolean
  large?: boolean
  onClick: Function
  className?: string
  alwaysUnlocked?: boolean
}

// Keep as class component to allow refs
const SelectorButton: React.FunctionComponent<SelectorButtonProps> = observer(
  ({ disabled, active, narrow, large, onClick, className, alwaysUnlocked, children }) => {
    const state = useApp()

    return (
      <div
        // Buttons are shown as 'disabled' and do not 'onClick' if screenLocked
        // ... except if they are alwaysUnlocked (pagination buttons)
        // ... alwaysUnlocked buttons can still be disabled (e.g. 'previous page'-button on page 1)
        onClick={() => (!state?.locked || alwaysUnlocked) && !disabled && onClick()}
        className={classNames(
          "selector-button",
          large ? "text--very-large" : "text--smaller",
          {
            "selector-button--active": active,
            "selector-button--narrow": narrow,
            "selector-button--disabled": disabled || (state?.locked && !alwaysUnlocked),
          },
          className || ""
        )}
      >
        {children}
      </div>
    )
  }
)

export default SelectorButton
