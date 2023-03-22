import React, { useEffect } from "react"
import classNames from "classnames"
import ArrowRightIcon from "../../../images/icons/arrow-right.svg"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"
import Paginator from "../Paginator"
import useSize from "@react-hook/size"
import FadedText from "../FadedText"

const Box = ({
  children,
  icon,
  title,
  className,
  linkedView,
  getBoxSizeCallback,
  withPagination = false,
  paginationOrientation = "horizontal",
}: BoxProps) => {
  const appViewsStore = useAppViewsStore()
  const handleClick = () => {
    if (linkedView) {
      appViewsStore.setView(linkedView)
    }
  }
  const boxRef = React.useRef<HTMLDivElement>(null)
  const [width, height] = useSize(boxRef)

  useEffect(() => {
    if (getBoxSizeCallback) {
      getBoxSizeCallback({ width, height })
    }
  }, [getBoxSizeCallback, height, width])

  return (
    <div
      ref={boxRef}
      className={classNames(
        "w-full h-full min-h-0 px-4 py-2.5 flex flex-col bg-victron-lightGray dark:bg-victron-darkGray rounded-md",
        className
      )}
    >
      <div className={"w-full min-w-0 min-h-[2.75rem] flex justify-between items-center"}>
        <div
          className={
            "w-full shrink-1 flex items-center justify-start text-victron-gray dark:text-victron-gray-dark cursor-pointer min-w-0 outline-none"
          }
          onClick={handleClick}
        >
          {icon && <span className={"mr-1"}>{icon}</span>}
          <FadedText text={title} className={"text-base"} />
        </div>
        {linkedView && (
          <div className="-mr-3 p-3" onClick={handleClick}>
            <ArrowRightIcon
              /* todo: fix types for svg */
              /* @ts-ignore */
              className={"w-6 text-victron-blue dark:text-victron-blue-dark cursor-pointer outline-none"}
              alt={"Expand"}
            />
          </div>
        )}
      </div>
      <div className={"w-full min-h-0 h-full pt-2"}>
        {withPagination && (
          <Paginator orientation={paginationOrientation} selectorLocation={"bottom-full"}>
            {children}
          </Paginator>
        )}
        {!withPagination && children}
      </div>
    </div>
  )
}

export interface BoxProps {
  children: JSX.Element[] | JSX.Element | string
  icon?: JSX.Element
  title: string
  linkedView?: AppViews
  className?: string
  headerActions?: JSX.Element
  withPagination?: boolean
  paginationOrientation?: "horizontal" | "vertical"
  getBoxSizeCallback?: (size: { width: number; height: number }) => void
}

export default Box
