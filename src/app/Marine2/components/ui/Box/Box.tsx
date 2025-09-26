import React, { ReactNode, RefObject, useEffect, useRef, useState } from "react"
import classNames from "classnames"
import ArrowRightIcon from "../../../images/icons/arrow-right.svg"
import InfoIcon from "../../../images/icons/info.svg"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"
import Paginator from "../Paginator"
import useSize from "@react-hook/size"
import FadedText from "../FadedText"
import { Modal } from "../Modal"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"
import { applyStyles, defaultBoxStyles } from "../../../utils/media"
import { ISize } from "@m2Types/generic/size"

export interface BoxProps {
  children: React.JSX.Element[] | React.JSX.Element | string
  icon?: ReactNode
  infoText?: { title: string; body: string }
  title: string
  linkedView?: AppViews
  className?: string
  headerActions?: React.JSX.Element
  withPagination?: boolean
  paginationOrientation?: ScreenOrientation
  getBoxSizeCallback?: (size: ISize) => void
  setRef?: RefObject<HTMLDivElement>
  roundLeftCorners?: boolean
  roundRightCorners?: boolean
}

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
  roundLeftCorners = true,
  roundRightCorners = true,
}: BoxProps) => {
  const appViewsStore = useAppViewsStore()
  const boxRef = useRef<HTMLDivElement>(null)

  const [infoOpen, setInfoOpen] = useState(false)
  const [width, height] = useSize(boxRef)
  const activeStyles = applyStyles({ width, height }, defaultBoxStyles)

  useEffect(() => {
    if (getBoxSizeCallback) {
      getBoxSizeCallback({ width, height })
    }
  }, [getBoxSizeCallback, height, width])

  const clickHandler = () => {
    if (linkedView) {
      appViewsStore.setView(linkedView)
    }
  }

  return (
    <div
      ref={boxRef}
      className={classNames(
        className,
        "w-full h-full min-h-0 px-4 pt-1 pb-2 sm-m:pt-2 sm-m:pb-3 flex flex-col bg-surface-secondary border-outline-secondary border-px-1 rounded-md",
        {
          "rounded-l-none": roundLeftCorners === false,
          "rounded-r-none": roundRightCorners === false,
        },
      )}
    >
      <div className="w-full min-w-0 min-h-px-44 flex justify-between items-center">
        <div
          className="w-full shrink-1 flex items-center justify-start text-content-victronGray cursor-pointer min-w-0 outline-none"
          onClick={clickHandler}
        >
          {icon && <span className="mr-1 md:mr-2">{icon}</span>}
          <FadedText text={title} className={activeStyles?.valueSubtitle} />
        </div>
        {linkedView && (
          <div className="-mr-3 w-px-44 h-px-44 p-2 cursor-pointer" onClick={clickHandler}>
            <ArrowRightIcon className="text-content-victronBlue cursor-pointer outline-none" alt="Expand" />
          </div>
        )}
        {!linkedView && !!infoText && (
          <div className="-mr-3 p-3" onClick={() => setInfoOpen(true)}>
            <InfoIcon className="w-7 text-content-victronBlue cursor-pointer outline-none" alt="Info" />
          </div>
        )}
      </div>
      <div ref={setRef} className="w-full min-h-0 h-full">
        {withPagination && (
          <Paginator orientation={paginationOrientation} selectorLocation="bottom-full">
            {children}
          </Paginator>
        )}
        {!withPagination && children}
      </div>
      {!linkedView && !!infoText && (
        <Modal.Frame className="max-w-[50%] w-full" open={infoOpen} onClose={() => setInfoOpen(false)}>
          <Modal.Body>
            <InfoIcon
              className="ml-auto mr-auto mt-7 mb-7 w-10 text-content-victronBlue cursor-pointer outline-none"
              alt="Info"
            />
            <div className="text-center mb-2 text-xl">{infoText.title}</div>
            <div className="text-center text-sm px-2 pb-14">{infoText.body}</div>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setInfoOpen(false)} className="w-full h-[60px]">
              Ok
            </button>
          </Modal.Footer>
        </Modal.Frame>
      )}
    </div>
  )
}

export default Box
