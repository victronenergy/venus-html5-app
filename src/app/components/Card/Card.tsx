import { FunctionComponent, ReactNode } from "react"
import IconWarning from "../../images/IconWarning.svg"

import "./Card.scss"
import CloseIcon from "../../images/IconClose.svg"
import CloseIconDark from "../../images/IconClose-Dark.svg"
import { useTheme } from "@victronenergy/mfd-modules"
import { Translate } from "react-i18nify"
import { STATUS_LEVELS } from "app/KVNRV/utils/constants"

export type Footer = {
  status: string
  property: string
  message: string
}

type CardProps = {
  title: string | ReactNode
  size: string | Array<string>
  icon?: string
  onIconClick?: Function
  footer?: Footer
  infoText?: string
  className?: string
}

export const SIZE_SHORT = "short"
export const SIZE_WIDE = "wide"
export const SIZE_EXTRA_WIDE = "extra-wide"

export const SIZE_NARROW = "narrow"
export const SIZE_LONG = "long"

export const ICON_CLOSE = "close"

export const Card: FunctionComponent<CardProps> = ({
  title,
  size,
  icon,
  onIconClick,
  footer,
  infoText,
  children,
  className = "",
}) => {
  const { darkMode } = useTheme()
  const { WARNING, ALARM } = STATUS_LEVELS
  const showAlarmIconInFooter = footer && [WARNING, ALARM].includes(footer.status)

  return (
    <div className={"card " + (Array.isArray(size) ? size.join(" ") : size) + " " + className}>
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
              </button>
            )}
          </div>
        </div>

        <div className="card__body">{children}</div>
      </div>

      {footer && (
        <div className={"card__footer items-center " + footer.status}>
          {showAlarmIconInFooter && (
            <div className={`row items-center card-status-update__icon card-status-update__icon-${footer.status}`}>
              <img src={IconWarning} alt={"Status update icon"} />
            </div>
          )}
          <span>
            <Translate value={"cardFooter." + footer.property} />: &nbsp;
          </span>
          <span>
            <Translate value={"cardFooter." + footer.message} />
          </span>
        </div>
      )}
    </div>
  )
}
