import React, { FunctionComponent } from "react"

import { STATUS_LEVELS_MSG } from "../Views/Metrics"
import './Card.scss'


export type Footer = {
  status: string,
  property: string,
}

type CardProps = {
  title: string,
  size: string | Array<string>,
  icon?: boolean,
  footer?: Footer
}

export const SIZE_SMALL = 'small';
export const SIZE_BIG = 'big';
export const SIZE_LONG = 'long';

export const Card: FunctionComponent<CardProps> = ({ title, size, icon, footer , children }) => {
  return (
    <div className={"card " + (Array.isArray(size) ? size.join(" ") : size)}>
      <div className={"contents"}>
        <div className="card__header row">
          <div className="card__header__text">
            {title}
          </div>
          {icon && (
            <div className='card__header__icon' />
          )}
        </div>

        <div className="card__body">
          {children}
        </div>
      </div>

      {footer && (
        <div className={"card__footer " + footer.status}>
          <span>{footer.property}: </span>
          <span>{STATUS_LEVELS_MSG[footer.status]}</span>
        </div>
      )}
    </div>
  )
}
