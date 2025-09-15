import React, { BaseSyntheticEvent, useCallback, useEffect, useMemo, useRef } from "react"
import classnames from "classnames"
import { SelectorButton } from "./SelectorButton"
import { DotIcon } from "./DotIcon"

// TODO: remake this to use store states instead of props down the tree
export interface PageSelectorProps {
  currentPage?: number
  maxPages?: number
  onClickLeft?: () => void
  onClickRight?: () => void
  selectorLocation?: SelectorLocation
}

export type SelectorLocation =
  | "bottom-full"
  | "top-full"
  | "right-full"
  | "left-full"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "top-right"
  | "top-left"
  | "top-center"
  | "right-top"
  | "right-bottom"
  | "right-center"
  | "left-top"
  | "left-bottom"
  | "left-center"

const PageSelector = ({
  currentPage = 0,
  maxPages = 1,
  onClickLeft = () => {},
  onClickRight = () => {},
  selectorLocation = "bottom-full",
}: PageSelectorProps) => {
  const dotsVertRef = useRef<HTMLDivElement>(null)
  const dotsHorRef = useRef<HTMLDivElement>(null)

  const isHorizontal = useMemo(
    () => selectorLocation.startsWith("bottom") || selectorLocation.startsWith("top"),
    [selectorLocation]
  )

  useEffect(() => {
    // If the dots don't all fit and overflow, make sure the selected page dot is visible
    const scrollRef = isHorizontal ? dotsHorRef.current : dotsVertRef.current
    if (scrollRef === null || typeof scrollRef.scroll !== "function") return
    scrollRef.scroll({
      behavior: "smooth",
      top: isHorizontal ? 0 : currentPage * (scrollRef.scrollHeight / maxPages) - scrollRef.offsetHeight / 2 + 10,
      left: isHorizontal ? currentPage * (scrollRef.scrollWidth / maxPages) - scrollRef.offsetWidth / 2 + 10 : 0,
    })
  }, [currentPage, maxPages, isHorizontal])

  const leftClickHandler = useCallback(
    (e: BaseSyntheticEvent) => {
      e.preventDefault()
      if (currentPage > 0) onClickLeft()
    },
    [currentPage, onClickLeft]
  )

  const rightClickHandler = useCallback(
    (e: BaseSyntheticEvent) => {
      e.preventDefault()
      if (currentPage < maxPages - 1) onClickRight()
    },
    [currentPage, maxPages, onClickRight]
  )

  return (
    <div
      className={classnames("flex items-center select-none", {
        "h-px-44 min-w-[140px]": isHorizontal,
        "w-full": isHorizontal && selectorLocation.endsWith("full"),
        "w-11 min-h-[140px] flex-col": !isHorizontal,
        "h-full": !isHorizontal && selectorLocation.endsWith("full"),
        "justify-center": selectorLocation.endsWith("center"),
        "justify-between": selectorLocation.endsWith("full"),
        "justify-end": selectorLocation.endsWith("right") || selectorLocation.endsWith("bottom"),
        "justify-start": selectorLocation.endsWith("left") || selectorLocation.endsWith("top"),
        "space-x-4 ": !selectorLocation.endsWith("full") && isHorizontal,
        "space-y-4 ": !selectorLocation.endsWith("full") && !isHorizontal,
      })}
    >
      <SelectorButton
        onClick={leftClickHandler}
        direction="previous"
        disabled={currentPage === 0}
        isHorizontal={isHorizontal}
      />
      <div
        ref={dotsVertRef}
        className={classnames("flex justify-center overflow-hidden", {
          "w-[calc(100%-116px)]": isHorizontal && selectorLocation.endsWith("full"),
          "h-[calc(100%-116px)] items-center": !isHorizontal && selectorLocation.endsWith("full"),
          "h-fit max-h-[calc(100%-116px)] min-h-0 items-center": !isHorizontal && !selectorLocation.endsWith("full"),
          "w-fit max-w-[calc(100%-116px)] min-w-0 items-center": isHorizontal && !selectorLocation.endsWith("full"),
        })}
      >
        {(isHorizontal && (
          <div ref={dotsHorRef} className={"flex overflow-hidden w-max justify-left space-x-2"}>
            {[...Array(maxPages)].map((e, i) => (
              <DotIcon key={i} isCurrentPage={i === currentPage} isHorizontal={isHorizontal} />
            ))}
          </div>
        )) || (
          <div className={"m-auto"}>
            <div className={"flex overflow-hidden h-max flex-col items-start space-y-2"}>
              {[...Array(maxPages)].map((e, i) => (
                <DotIcon key={i} isCurrentPage={i === currentPage} isHorizontal={isHorizontal} />
              ))}
            </div>
          </div>
        )}
      </div>
      <SelectorButton
        onClick={rightClickHandler}
        direction="next"
        disabled={currentPage === maxPages - 1}
        isHorizontal={isHorizontal}
      />
    </div>
  )
}

export default PageSelector
