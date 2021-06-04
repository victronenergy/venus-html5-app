import React, { FunctionComponent } from "react"

import "./Card.scss"
import CloseIcon from "../../images/IconClose.svg"
import CloseIconDark from "../../images/IconClose-Dark.svg"
import { useTheme } from "@victronenergy/mfd-modules"

export type Footer = {
  status: string
  property: string
  message: string
}

type CardProps = {
  title: string
  size: string | Array<string>
  icon?: string
  onIconClick?: Function
  footer?: Footer
  infoText?: string
}

export const SIZE_SHORT = "short"
export const SIZE_WIDE = "wide"
export const SIZE_NARROW = "narrow"
export const SIZE_LONG = "long"

export const ICON_SETTINGS = "settings"
export const ICON_CLOSE = "close"

export const Card: FunctionComponent<CardProps> = ({ title, size, icon, onIconClick, footer, infoText, children }) => {
  const { darkMode } = useTheme()
  return (
    <div className={"card " + (Array.isArray(size) ? size.join(" ") : size)}>
      <div className={"contents"}>
        <div className="card__header row">
          <div className="card__header__text">{title}</div>
          <div className={"row"}>
            <div className="card__header__info-text">{infoText}</div>
            {icon && (
              <button className={"card__header__icon " + icon} onClick={(e) => onIconClick && onIconClick(e)}>
                {icon === ICON_CLOSE && (
                  <img
                    src={darkMode ? CloseIconDark : CloseIcon}
                    alt={"Close Icon"}
                    className={"card__header__icon__img"}
                  />
                )}
                {icon === ICON_SETTINGS && "Settings"}
              </button>
            )}
          </div>
        </div>

        <div className="card__body">{children}</div>
      </div>

      {footer && (
        <div className={"card__footer " + footer.status}>
          <span>{footer.property}: </span>
          <span>{footer.message}</span>
        </div>
      )}
    </div>
  )
}
