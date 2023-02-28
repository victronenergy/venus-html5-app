import React, { useRef, useEffect, useState } from "react"
import classnames from "classnames"
import { useComponentSize } from "../../../utils/hooks"
import PageSelector, { SelectorLocation } from "../PageSelector"

const Paginator = ({ children, orientation = "horizontal", selectorLocation = "bottom-full", pageNumber }: Props) => {
  const childrenArray = Array.isArray(children) ? children : [children]
  const [childrenSizeArray, setChildrenSizeArray] = useState<Array<number>>([])

  const childrenRef = useRef<Array<HTMLDivElement>>([])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  type PageElement = {
    childIndex: number
    scrollTo?: number
  }
  const [pages, setPages] = useState<Array<Array<PageElement>>>([])
  const [currentPage, setCurrentPage] = useState(0)

  const componentSize = useComponentSize(wrapperRef)

  // On the first render, save the children sizes to an array for calculations after resizing
  useEffect(() => {
    const newChildrenSizeArray: number[] = []

    childrenRef.current.forEach((ref) => {
      const refSize = orientation === "horizontal" ? ref.scrollWidth : ref.scrollHeight
      newChildrenSizeArray.push(refSize)
    })

    setChildrenSizeArray(newChildrenSizeArray)
  }, [orientation])

  // on component resize, split the children elements into pages differently
  useEffect(() => {
    autoSplitIntoPages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentSize])

  const autoSplitIntoPages = () => {
    // if content is not scrollable return
    if (
      wrapperRef.current === null ||
      childrenSizeArray.reduce((sizeSum, size) => sizeSum + size, 0) <
        (orientation === "horizontal" ? wrapperRef.current.offsetWidth : wrapperRef.current.offsetHeight)
    ) {
      return
    }

    const selectorIsHorizontal = selectorLocation.startsWith("bottom") || selectorLocation.startsWith("top")
    const selectorIsTakingUpSpace =
      (orientation === "horizontal" && !selectorIsHorizontal) || (orientation === "vertical" && selectorIsHorizontal)
    // Calculating parent size (selector might be taking part of the size if it is of the opposite orientation, we
    // should then subtract its size (3.5rem = 56px)
    const parentSize =
      (orientation === "horizontal" ? wrapperRef.current.offsetWidth : wrapperRef.current.offsetHeight) -
      (selectorIsTakingUpSpace ? 56 : 0)

    const newPagesArray: Array<Array<PageElement>> = []
    let currentPageSize: number = 0
    let currentPageElements: Array<PageElement> = []

    childrenRef.current.forEach((ref, childIndex) => {
      const refSize = !!pageNumber ? parentSize * pageNumber : childrenSizeArray[childIndex]

      // if the current page would overflow after adding this element, push it to the array and start a new page
      if (currentPageSize + refSize > parentSize && currentPageElements.length > 0) {
        newPagesArray.push(currentPageElements)
        currentPageSize = 0
        currentPageElements = []
      }

      // if there is one dom element that is too long and would be scrollable, split it into separate pages
      if (currentPageSize === 0 && refSize > parentSize) {
        // split into pages and save where to scroll on changing page
        let i = 0
        while ((i + 1) * parentSize < refSize) {
          newPagesArray.push([{ childIndex: childIndex, scrollTo: i * parentSize }])
          i++
        }

        // avoid having the last part of the element be very small, instead, make it the size of parent element
        newPagesArray.push([{ childIndex: childIndex, scrollTo: refSize - parentSize }])
      } else if (currentPageSize + refSize <= parentSize) {
        // if even after adding this element the page is not overflowing, add it to current page
        currentPageElements.push({ childIndex: childIndex })
        currentPageSize += refSize
      }
    })
    // push leftover elements to last page if needed
    if (currentPageElements.length > 0) {
      newPagesArray.push(currentPageElements)
    }

    // If the screen was resized it might happen that there's now less pages when user was on the last page
    if (currentPage > newPagesArray.length - 1) setCurrentPage(newPagesArray.length - 1)

    setPages(newPagesArray)
  }

  useEffect(() => {
    if (
      pages.length > 0 &&
      pageRef.current !== null &&
      pages[currentPage].length === 1 &&
      pages[currentPage][0].scrollTo !== undefined
    ) {
      // if there is only one element, and it has a scrollTo attribute, add that element and scroll it
      const scrollTo = pages[currentPage][0].scrollTo
      pageRef.current.scrollTo({
        left: orientation === "horizontal" ? scrollTo : 0,
        top: orientation === "vertical" ? scrollTo : 0,
        behavior: "smooth",
      })
    }
  }, [pages, currentPage, orientation])

  return (
    <div
      ref={wrapperRef}
      className={classnames("w-full h-full flex justify-between", {
        "flex-row": selectorLocation.startsWith("right"),
        "flex-col": selectorLocation.startsWith("bottom"),
        "flex-row-reverse": selectorLocation.startsWith("left"),
        "flex-col-reverse": selectorLocation.startsWith("top"),
      })}
    >
      {(pages.length === 0 || pages.length === 1) && (
        <div
          className={classnames("flex h-full w-full", {
            "flex-row": orientation === "horizontal",
            "flex-col": orientation === "vertical",
          })}
        >
          {childrenArray.map((child, i) => (
            <div
              className={"w-full h-full min-h-0"}
              key={i}
              ref={(el) => {
                if (el !== null) childrenRef.current[i] = el as HTMLDivElement
              }}
            >
              {child}
            </div>
          ))}
        </div>
      )}
      {pages && pages.length > 1 && (
        <div
          ref={pageRef}
          className={classnames("overflow-hidden flex", {
            "flex-row": orientation === "horizontal",
            "flex-col": orientation === "vertical",
            "h-[calc(100%-3.5rem)] w-full": selectorLocation.startsWith("bottom") || selectorLocation.startsWith("top"),
            "w-[calc(100%-3.5rem)] h-full": selectorLocation.startsWith("right") || selectorLocation.startsWith("left"),
          })}
        >
          {childrenArray
            .slice(pages[currentPage][0].childIndex, pages[currentPage][pages[currentPage].length - 1].childIndex + 1)
            .map((child, i) => (
              <div className={"w-full h-full min-h-0"} key={i}>
                {child}
              </div>
            ))}
        </div>
      )}
      {pages.length > 1 && (
        <PageSelector
          onClickLeft={() => {
            setCurrentPage(currentPage - 1)
          }}
          onClickRight={() => {
            setCurrentPage(currentPage + 1)
          }}
          currentPage={currentPage}
          maxPages={pages.length}
          selectorLocation={selectorLocation}
        ></PageSelector>
      )}
    </div>
  )
}

interface Props {
  children: JSX.Element[] | JSX.Element
  orientation?: "vertical" | "horizontal"
  pageNumber?: number
  selectorLocation?: SelectorLocation
}

export default Paginator
