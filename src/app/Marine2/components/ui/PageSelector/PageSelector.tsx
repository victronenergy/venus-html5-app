import React, { BaseSyntheticEvent, useCallback, useEffect, useMemo, useRef } from "react"
import classnames from "classnames"
import SelectorLeftIcon from "../../../images/icons/selectors/selector-left.svg"
import SelectorRightIcon from "../../../images/icons/selectors/selector-right.svg"
import SelectorDownIcon from "../../../images/icons/selectors/selector-down.svg"
import SelectorUpIcon from "../../../images/icons/selectors/selector-up.svg"
import DotIcon from "../../../images/icons/selectors/dot.svg"
import DotSelectedIcon from "../../../images/icons/selectors/dot-selected.svg"
import DotSelectedVerticalIcon from "../../../images/icons/selectors/dot-selected-vert.svg"

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

  const dot = (i: number) => {
    if (i === currentPage) {
      return isHorizontal ? (
        // todo: fix types for svg
        // @ts-ignore
        <DotSelectedIcon className={"text-victron-darkGray dark:text-white"} />
      ) : (
        // todo: fix types for svg
        // @ts-ignore
        <DotSelectedVerticalIcon className={"text-victron-darkGray dark:text-white"} />
      )
    } else {
      // todo: fix types for svg
      // @ts-ignore
      return <DotIcon className={"text-victron-gray dark:text-victron-gray-400"} />
    }
  }

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

  const onLeftSelectorClick = useCallback(
    (e: BaseSyntheticEvent) => {
      e.preventDefault()
      if (currentPage > 0) onClickLeft()
    },
    [currentPage, onClickLeft]
  )

  const onRightSelectorClick = useCallback(
    (e: BaseSyntheticEvent) => {
      e.preventDefault()
      if (currentPage < maxPages - 1) onClickRight()
    },
    [currentPage, maxPages, onClickRight]
  )

  return (
    <div
      className={classnames("flex items-center select-none", {
        "h-[44px] w-full min-w-[140px]": isHorizontal,
        "w-11 h-full min-h-[140px] flex-col": !isHorizontal,
        "justify-between": selectorLocation.endsWith("full"),
        "justify-end": selectorLocation.endsWith("right") || selectorLocation.endsWith("bottom"),
        "justify-start": selectorLocation.endsWith("left") || selectorLocation.endsWith("top"),
        "space-x-4 ": !selectorLocation.endsWith("full") && isHorizontal,
        "space-y-4 ": !selectorLocation.endsWith("full") && !isHorizontal,
      })}
    >
      <div onClick={onLeftSelectorClick} className={"w-11 h-[44px] shrink-0"}>
        {(isHorizontal &&
          ((currentPage > 0 && (
            // todo: fix types for svg
            // @ts-ignore
            <SelectorLeftIcon className={"text-victron-blue dark:text-victron-blue-dark"} />
          )) || (
            // todo: fix types for svg
            // @ts-ignore
            <SelectorLeftIcon className={"text-victron-gray dark:text-victron-gray-dark"} />
          ))) ||
          (currentPage > 0 && (
            // todo: fix types for svg
            // @ts-ignore
            <SelectorUpIcon className={"text-victron-blue dark:text-victron-blue-dark"} />
          )) || (
            // todo: fix types for svg
            // @ts-ignore
            <SelectorUpIcon className={"text-victron-gray dark:text-victron-gray-dark"} />
          )}
      </div>
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
              <span key={i}>{dot(i)}</span>
            ))}
          </div>
        )) || (
          <div className={"m-auto"}>
            <div className={"flex overflow-hidden h-max flex-col items-start space-y-2"}>
              {[...Array(maxPages)].map((e, i) => (
                <span key={i}>{dot(i)}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        onClick={onRightSelectorClick}
        className={"w-[44px] h-[44px] shrink-0 text-victron-gray dark:text-victron-gray-dark"}
      >
        {(isHorizontal &&
          ((currentPage < maxPages - 1 && (
            // todo: fix types for svg
            // @ts-ignore
            <SelectorRightIcon className={"text-victron-blue dark:text-victron-blue-dark"} />
          )) || (
            // todo: fix types for svg
            // @ts-ignore
            <SelectorRightIcon className={"text-victron-gray dark:text-victron-gray-dark"} />
          ))) ||
          (currentPage < maxPages - 1 && (
            // todo: fix types for svg
            // @ts-ignore
            <SelectorDownIcon className={"text-victron-blue dark:text-victron-blue-dark"} />
          )) || (
            // todo: fix types for svg
            // @ts-ignore
            <SelectorDownIcon className={"text-victron-gray dark:text-victron-gray-dark"} />
          )}
      </div>
    </div>
  )
}

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

export default PageSelector
