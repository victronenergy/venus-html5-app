import React from "react"
import classNames from "classnames"
import ArrowRightIcon from "../../../images/icons/arrow-right.svg"
import { translate } from "react-i18nify"

const Box = ({ children, icon, title, className, onExpandHref }: Props) => {
  return (
    <div
      className={classNames(
        "w-full h-full min-h-0 p-4 flex flex-col bg-victron-lightGray dark:bg-victron-darkGray rounded-md",
        className
      )}
    >
      <div className={"flex flex-row justify-between"}>
        <div className={"flex flex-row items-center justify-start text-victron-gray dark:text-victron-gray-dark"}>
          {icon && <span className={"mr-1"}>{icon}</span>}
          <span className={"text-2xl"}>
            {translate("header.versionInfo")} {title}
          </span>
        </div>
        {onExpandHref && (
          <a href={onExpandHref}>
            <img
              src={ArrowRightIcon}
              className={"w-6 text-victron-blue dark:text-victron-blue-dark cursor-pointer"}
              alt={"Expand"}
            />
          </a>
        )}
      </div>
      <div className={"w-full min-h-0 h-full pt-2"}>{children}</div>
    </div>
  )
}

interface Props {
  children: JSX.Element | string
  icon?: JSX.Element
  title: string
  onExpandHref?: string
  className?: string
  headerActions?: JSX.Element
}

export default Box
