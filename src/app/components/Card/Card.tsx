import React, { FunctionComponent } from "react"

import "./Card.scss"

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
}

export const SIZE_SHORT = "short"
export const SIZE_WIDE = "wide"
export const SIZE_NARROW = "narrow"
export const SIZE_LONG = "long"

export const ICON_SETTINGS = "settings"
export const ICON_CLOSE = "close"

export const Card: FunctionComponent<CardProps> = ({ title, size, icon, onIconClick, footer, children }) => {
  return (
    <div className={"card " + (Array.isArray(size) ? size.join(" ") : size)}>
      <div className={"contents"}>
        <div className="card__header row">
          <div className="card__header__text">{title}</div>
          {icon && <button className={"card__header__icon " + icon} onClick={(e) => onIconClick && onIconClick(e)} />}
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
