import React, { useEffect, useState } from "react"
import classNames from "classnames"
import ArrowRightIcon from "../../../images/icons/arrow-right.svg"
import InfoIcon from "../../../images/icons/info.svg"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"
import Paginator from "../Paginator"
import useSize from "@react-hook/size"
import FadedText from "../FadedText"
import classnames from "classnames"
import { Modal } from "../Modal"

const Box = ({
  children,
  icon,
  title,
  className,
  linkedView,
  getBoxSizeCallback,
  withPagination = false,
  setRef,
  infoText,
  paginationOrientation = "horizontal",
}: BoxProps) => {
  const appViewsStore = useAppViewsStore()
  const handleClick = () => {
    if (linkedView) {
      appViewsStore.setView(linkedView)
    }
  }
  const [infoOpen, setInfoOpen] = useState(false)
  const openInfo = () => {
    setInfoOpen(true)
  }
  const closeInfo = () => {
    setInfoOpen(false)
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
            "w-full shrink-1 flex items-center justify-start text-victron-gray-300 dark:text-victron-gray-dark cursor-pointer min-w-0 outline-none"
          }
          onClick={handleClick}
        >
          {icon && <span className={"mr-1"}>{icon}</span>}
          <FadedText text={title} className={"text-base"} />
        </div>
        {linkedView && (
          <div className="-mr-3 p-[12px] cursor-pointer" onClick={handleClick}>
            <ArrowRightIcon
              /* todo: fix types for svg */
              /* @ts-ignore */
              className={"w-[24px] text-victron-blue dark:text-victron-blue-dark cursor-pointer outline-none"}
              alt={"Expand"}
            />
          </div>
        )}
        {!linkedView && !!infoText && (
          <div className="-mr-3 p-3" onClick={openInfo}>
            <InfoIcon
              /* todo: fix types for svg */
              /* @ts-ignore */
              className={"w-7 text-victron-blue dark:text-victron-blue-dark cursor-pointer outline-none"}
              alt={"Info"}
            />
          </div>
        )}
      </div>
      <div ref={setRef} className={"w-full min-h-0 h-full"}>
        {withPagination && (
          <Paginator orientation={paginationOrientation} selectorLocation={"bottom-full"}>
            {children}
          </Paginator>
        )}
        {!withPagination && children}
      </div>
      {!linkedView && !!infoText && (
        <Modal.Frame
          open={infoOpen}
          onClose={closeInfo}
          className={classnames(" border-victron-darkGray-200 border rounded-md w-[30rem]")}
        >
          <Modal.Body>
            <div className="flex flex-col">
              <div className="dark:text-white text-base">
                <InfoIcon
                  /* todo: fix types for svg */
                  /* @ts-ignore */
                  className={
                    "ml-auto mr-auto mt-7 mb-7 w-10 text-victron-blue dark:text-victron-blue-dark cursor-pointer outline-none"
                  }
                  alt={"Info"}
                />
                <div className={"text-center mb-2 text-xl"}>{infoText.title}</div>
                <div className={"text-center text-sm pr-2 pl-2 mb-20"}>{infoText.body}</div>
                <div className={classnames("-ml-4 h-0 mt-3 border-b border-victron-darkGray-200 w-[30rem]")} />
                <button onClick={closeInfo} className={"w-full -mb-2 h-11 mt-2"}>
                  Ok
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal.Frame>
      )}
    </div>
  )
}

export interface BoxProps {
  children: JSX.Element[] | JSX.Element | string
  icon?: JSX.Element
  infoText?: { title: string; body: string }
  title: string
  linkedView?: AppViews
  className?: string
  headerActions?: JSX.Element
  withPagination?: boolean
  paginationOrientation?: "horizontal" | "vertical"
  getBoxSizeCallback?: (size: { width: number; height: number }) => void
  setRef?: React.RefObject<HTMLDivElement>
}

export default Box
