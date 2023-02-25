import React from "react"
import classNames from "classnames"
import ArrowRightIcon from "../../../images/icons/arrow-right.svg"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"

const Box = ({ children, icon, title, className, linkedView }: BoxProps) => {
  const appViewsStore = useAppViewsStore()
  const handleClick = () => {
    if (linkedView) {
      appViewsStore.setView(linkedView)
    }
  }

  return (
    <div
      className={classNames(
        "w-full h-full min-h-0 p-4 flex flex-col bg-victron-lightGray dark:bg-victron-darkGray rounded-md",
        className
      )}
    >
      <div className={"flex flex-row justify-between w-full"}>
        <div
          className={
            "flex flex-row items-center justify-start text-victron-gray dark:text-victron-gray-dark cursor-pointer w-full min-w-0"
          }
          onClick={handleClick}
        >
          {icon && <span className={"mr-1 shrink-0"}>{icon}</span>}
          <span className={"shrink min-w-0 text-base truncate"}>{title}</span>
        </div>
        {linkedView && (
          <div onClick={handleClick}>
            <ArrowRightIcon
              /* todo: fix types for svg */
              /* @ts-ignore */
              className={"w-6 text-victron-blue dark:text-victron-blue-dark cursor-pointer"}
              alt={"Expand"}
            />
          </div>
        )}
      </div>
      <div className={"w-full min-h-0 h-full pt-2"}>{children}</div>
    </div>
  )
}

export interface BoxProps {
  children: JSX.Element | string
  icon?: JSX.Element
  title: string
  linkedView?: AppViews
  className?: string
  headerActions?: JSX.Element
}

export default Box
