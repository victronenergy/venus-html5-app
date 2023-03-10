import React, { useRef, useEffect, useState, useCallback, useMemo } from "react"
import classnames from "classnames"
import { PageSelectorProps, SelectorLocation } from "../PageSelector"
import { observer } from "mobx-react"
import ScrollSizeObserver from "../Observers/ScrollSizeObserver"
import PageFlipper from "../PageFlipper"
import { useComponentSize } from "../../../utils/hooks"

const Paginator = ({
  children,
  orientation = "horizontal",
  selectorLocation = "bottom-full",
  pageNumber,
  pageSelectorPropsSetter,
}: Props) => {
  const childrenArray = useMemo(() => {
    return Array.isArray(children) ? children : [children]
  }, [children])

  const childrenRef = useRef<Array<HTMLDivElement>>([])
  const wrapperRef = useRef<HTMLDivElement>(null)
  const componentSize = useComponentSize(wrapperRef)
  const [pageNum, setPageNum] = useState(0)

  const [pagesElement, setPagesElement] = useState<JSX.Element>()
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

      if (sizeArray.reduce((sizeSum, size) => sizeSum + size, 0) <= parentSize) {
        return
      }

      const newPagesArray: number[][] = []
      let currentPageSize: number = 0
      let currentPageElements: number[] = []

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
          if (orientation === "horizontal") {
            // split into pages and save where to scroll on changing page
            let i = 0
            while (i * parentSize < refSize) {
              newPagesArray.push([childIndex])
              i++
            }
          } else {
            currentPageElements.push(childIndex)
            currentPageSize += refSize
          }
        } else if (currentPageSize + refSize <= parentSize) {
          // if even after adding this element the page is not overflowing, add it to current page
          currentPageElements.push(childIndex)
          currentPageSize += refSize
        }
      })
      // push leftover elements to last page if needed
      if (currentPageElements.length > 0) {
        newPagesArray.push(currentPageElements)
      }
      if (orientation === "vertical") {
        const pagesEl = (
          <div
            style={{
              width: `${newPagesArray.length}00%`,
            }}
            className={"h-full flex"}
          >
            {newPagesArray.map((pageChildren, i) => (
              <div
                className={"h-full"}
                style={{
                  width: `calc(100% / ${newPagesArray.length})`,
                }}
                key={`pageEl${i}`}
              >
                {pageChildren.map((elIndex) => childrenArray[elIndex])}
              </div>
            ))}
          </div>
        )
        setPagesElement(pagesEl)
      } else {
        const pagesEl = <div className={"h-full w-fit w-min-full"}>{childrenArray}</div>
        setPagesElement(pagesEl)
      }
      setPageNum(newPagesArray.length)
    },
    [childrenArray, orientation, pageNumber, pageSelectorPropsSetter, selectorLocation]
  )

  const paginate = useCallback(() => {
    const newChildrenSizeArray: number[] = []

    childrenRef.current.forEach((ref) => {
      const refSize = orientation === "horizontal" ? ref.scrollWidth : ref.scrollHeight
      newChildrenSizeArray.push(refSize)
    })

    splitIntoPages(newChildrenSizeArray)
  }, [orientation, splitIntoPages])
  useEffect(() => {
    if (orientation === "horizontal") setPagesElement(undefined)
  }, [componentSize.width, orientation])
  useEffect(() => {
    if (orientation === "vertical") setPagesElement(undefined)
  }, [componentSize.height, orientation])

  return (
    <div ref={wrapperRef} className="w-full h-full">
      {!pagesElement && (
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
      {!!pagesElement && pageNum && <PageFlipper pages={pageNum}>{pagesElement}</PageFlipper>}
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
