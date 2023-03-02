import React, { useState } from "react"
import classNames from "classnames"
import ArrowRightIcon from "../../../images/icons/arrow-right.svg"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"
import PageSelector, { PageSelectorProps } from "../PageSelector"
import Paginator from "../Paginator"

const Box = ({ children, icon, title, className, linkedView, withPagination = false }: BoxProps) => {
  const appViewsStore = useAppViewsStore()
  const handleClick = () => {
    if (linkedView) {
      appViewsStore.setView(linkedView)
    }
  }

  const [pageSelectorProps, setPageSelectorProps] = useState<PageSelectorProps>()

  return (
    <div
      className={classNames(
        "w-full h-full min-h-0 p-4 flex flex-col bg-victron-lightGray dark:bg-victron-darkGray rounded-md",
        className
      )}
    >
      <div className={"w-full min-w-0 min-h-[2.75rem] flex flex-row justify-between"}>
        <div
          className={
            "flex flex-row items-center justify-start text-victron-gray dark:text-victron-gray-dark cursor-pointer"
          }
          onClick={handleClick}
        >
          {icon && <span className={"mr-1"}>{icon}</span>}
          <span className={"text-base"}>{title}</span>
        </div>
        {withPagination && !!pageSelectorProps?.maxPages && pageSelectorProps?.maxPages > 1 && (
          <PageSelector {...pageSelectorProps} selectorLocation="top-right" />
        )}
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
      <div className={"w-full min-h-0 h-full pt-2"}>
        <Paginator pageSelectorPropsSetter={setPageSelectorProps}>{children}</Paginator>
      </div>
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
  withPagination?: boolean
}

export default Box
