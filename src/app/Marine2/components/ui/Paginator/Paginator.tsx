import React, { useRef, useEffect, useState, useCallback } from "react"
import classnames from "classnames"
import PageSelector, { PageSelectorProps, SelectorLocation } from "../PageSelector"
import { observer } from "mobx-react"
import SizeChangeObserver from "../Observers/SizeChangeObserver"
import ScrollSizeObserver from "../Observers/ScrollSizeObserver"
import { useComponentSize } from "../../../utils/hooks"

const Paginator = ({
  children,
  orientation = "horizontal",
  selectorLocation = "bottom-full",
  pageNumber,
  pageSelectorPropsSetter,
}: Props) => {
  const childrenArray = Array.isArray(children) ? children : [children]
  const [childrenSizeArray, setChildrenSizeArray] = useState<Array<number>>([])

  const childrenRef = useRef<Array<HTMLDivElement>>([])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const componentSize = useComponentSize(wrapperRef)
  type PageElement = {
    childIndex: number
    scrollTo?: number
  }
  const [pages, setPages] = useState<Array<Array<PageElement>>>([])
  const [currentPage, setCurrentPage] = useState(0)

  const reset = () => {
    setPages([])
  }

  const splitIntoPages = useCallback(
    (sizeArray: number[]) => {
      // if wrapperRef isn't set yet
      if (wrapperRef.current === null) {
        return
      }

      const selectorIsHorizontal = selectorLocation.startsWith("bottom") || selectorLocation.startsWith("top")
      const selectorIsTakingUpSpace =
        !pageSelectorPropsSetter &&
        ((orientation === "horizontal" && !selectorIsHorizontal) ||
          (orientation === "vertical" && selectorIsHorizontal))
      // Calculating parent size (selector might be taking part of the size if it is of the opposite orientation, we
      // should then subtract its size (3.5rem = 56px)
      const parentSize =
        (orientation === "horizontal" ? wrapperRef.current.offsetWidth : wrapperRef.current.offsetHeight) -
        (selectorIsTakingUpSpace ? 56 : 0)

      // if content isn't scrollable return
      if (sizeArray.reduce((sizeSum, size) => sizeSum + size, 0) <= parentSize) {
        if (pages.length > 1) setPages([])
        return
      }

      const newPagesArray: Array<Array<PageElement>> = []
      let currentPageSize: number = 0
      let currentPageElements: Array<PageElement> = []

      childrenRef.current.forEach((ref, childIndex) => {
        const refSize = !!pageNumber ? parentSize * pageNumber : sizeArray[childIndex]

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
    },
    [currentPage, orientation, pageNumber, pageSelectorPropsSetter, pages.length, selectorLocation]
  )

  const paginate = useCallback(() => {
    const newChildrenSizeArray: number[] = []

    childrenRef.current.forEach((ref) => {
      const refSize = orientation === "horizontal" ? ref.scrollWidth : ref.scrollHeight
      newChildrenSizeArray.push(refSize)
    })
    setChildrenSizeArray(newChildrenSizeArray)

    splitIntoPages(newChildrenSizeArray)
  }, [orientation, splitIntoPages])

  useEffect(() => {
    if (!!pageNumber && pages.length !== pageNumber) paginate()
  }, [pageNumber, pages.length, paginate])

  useEffect(() => {
    if (!!pageNumber && !!pageRef.current) {
      pageRef.current.scrollTo({
        left: orientation === "horizontal" ? currentPage * pageRef.current.offsetWidth : 0,
        top: orientation === "vertical" ? currentPage * pageRef.current.offsetHeight : 0,
        behavior: "smooth",
      })
    }
  }, [componentSize, currentPage, orientation, pageNumber])

  useEffect(() => {
    if (
      !pageNumber &&
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
  }, [pages, currentPage, orientation, pageNumber])

  useEffect(() => {
    if (pageSelectorPropsSetter) {
      pageSelectorPropsSetter({
        onClickLeft: () => setCurrentPage(currentPage - 1),
        onClickRight: () => setCurrentPage(currentPage + 1),
        currentPage: currentPage,
        maxPages: pages.length,
      })
    }
  }, [currentPage, pageSelectorPropsSetter, pages.length])

  return (
    <div
      ref={wrapperRef}
      className={classnames("w-full h-full", {
        "flex justify-between": pages.length > 1 && !pageSelectorPropsSetter && selectorLocation.startsWith("right"),
        "flex flex-col justify-between":
          pages.length > 1 && !pageSelectorPropsSetter && selectorLocation.startsWith("bottom"),
        "flex flex-row-reverse justify-between":
          pages.length > 1 && !pageSelectorPropsSetter && selectorLocation.startsWith("left"),
        "flex flex-col-reverse justify-between":
          pages.length > 1 && !pageSelectorPropsSetter && selectorLocation.startsWith("top"),
      })}
    >
      {!pageNumber && (pages.length === 0 || pages.length === 1) && (
        <ScrollSizeObserver orientation={orientation} onSizeChange={paginate}>
          {childrenArray.map((child, i) => (
            <div
              className={classnames("", {
                "h-full min-w-fit": orientation === "horizontal",
                "w-full min-h-fit": orientation === "vertical",
              })}
              key={i}
              ref={(el) => {
                if (el !== null) childrenRef.current[i] = el as HTMLDivElement
              }}
            >
              {child}
            </div>
          ))}
        </ScrollSizeObserver>
      )}
      {!pageNumber && pages && pages.length > 1 && (
        <div
          ref={pageRef}
          className={classnames("overflow-hidden flex", {
            "flex-col": orientation === "vertical",
            "w-full h-full": !!pageSelectorPropsSetter,
            "h-[calc(100%-3.5rem)] w-full":
              !pageSelectorPropsSetter && (selectorLocation.startsWith("bottom") || selectorLocation.startsWith("top")),
            "w-[calc(100%-3.5rem)] h-full":
              !pageSelectorPropsSetter && (selectorLocation.startsWith("right") || selectorLocation.startsWith("left")),
          })}
        >
          <SizeChangeObserver
            orientation={orientation}
            onSizeChange={() => {
              splitIntoPages(childrenSizeArray)
            }}
            className={"w-full h-full"}
          >
            <SizeChangeObserver
              orientation={orientation}
              onSizeChange={reset}
              className={classnames("w-full h-full", {
                "min-h-fit": orientation === "vertical",
                "min-w-fit": orientation === "horizontal",
              })}
            >
              {childrenArray.slice(
                pages[currentPage][0].childIndex,
                pages[currentPage][pages[currentPage].length - 1].childIndex + 1
              )}
            </SizeChangeObserver>
          </SizeChangeObserver>
        </div>
      )}
      {!!pageNumber && (pages.length === 0 || pages.length === 1) && (
        <div className="w-full h-full min-h-0 min-w-0">
          {childrenArray.map((child, i) => (
            <div
              className="w-full h-full"
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
      {!!pageNumber && pages && pages.length > 1 && (
        <div
          ref={pageRef}
          className={classnames("overflow-hidden flex", {
            "flex-col": orientation === "vertical",
            "w-full h-full": !!pageSelectorPropsSetter,
            "h-[calc(100%-3.5rem)] w-full":
              !pageSelectorPropsSetter && (selectorLocation.startsWith("bottom") || selectorLocation.startsWith("top")),
            "w-[calc(100%-3.5rem)] h-full":
              !pageSelectorPropsSetter && (selectorLocation.startsWith("right") || selectorLocation.startsWith("left")),
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
      {pages.length > 1 && !pageSelectorPropsSetter && (
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
  children: JSX.Element[] | JSX.Element | string
  orientation?: "vertical" | "horizontal"
  pageNumber?: number
  selectorLocation?: SelectorLocation
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

export default observer(Paginator)
