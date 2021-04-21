import React, { FunctionComponent } from "react"
import "./Card.scss"

type CardProps = {
  title: string,
  size: string,
  icon: string | undefined
}

export const SIZE_SMALL = 'small';
export const SIZE_BIG = 'big';

export const Card: FunctionComponent<CardProps> = ({ title, size, icon, children }) => {
  return (
    <div className={"card " + size}>
      <div className="header">
        <div className="header__text">
          {title}
        </div>
        {icon && (
          <div className='header__icon'>
            <i />
          </div>
        )}
      </div>

      <div className="body">
        {children}
      </div>
    </div>
  )
}
