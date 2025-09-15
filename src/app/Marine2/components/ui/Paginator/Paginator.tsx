import React, { useRef, useState, useCallback, useMemo, useLayoutEffect } from "react"
import classnames from "classnames"
import { PageSelectorProps, SelectorLocation } from "../PageSelector"
import { observer } from "mobx-react"
import PageFlipper from "../PageFlipper"
import useSize from "@react-hook/size"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"
import OffscreenPageSplitter, { Children, Pages } from "../OffscreenPageSplitter"

/// Split `children` laid out in given `orientation` into pages and allow flipping through them
/// using `PageSelector` positioned in `selectorLocation`
const Paginator = <T extends JSX.Element>({
  children,
  orientation = "horizontal",
  selectorLocation = "bottom-full",
  pageNumber, // TODO: this should the initial page to display?
  pageSelectorPropsSetter,
}: Props<T>) => {
  const childrenArray = useMemo(() => {
    return Array.isArray(children) ? children : [children]
  }, [children])

  // Layout children horizontally or vertically with min-[wh]-fit to measure thir size
  // to compute pages
  const childrenToMeasure = useMemo(() => {
    const x = Array.isArray(children) ? children : [children]
    return x.map((child, i) => (
      <div
        className={classnames("", {
          "h-full min-w-fit": orientation === "horizontal",
          "w-full min-h-fit": orientation === "vertical",
        })}
        key={i}
      >
        {child}
      </div>
    )) as Children<T>
  }, [children, orientation])

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width, height] = useSize(wrapperRef)
  const [availableSpace, setAvailableSpace] = useState(0)

  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const [pagesElement, setPagesElement] = useState<JSX.Element>()

  const setStartingPage = useCallback(
    (startingPage: number) => {
      if (!!currentPage && startingPage !== pageCount && currentPage >= startingPage) {
        setCurrentPage(startingPage - 1)
      }
    },
    [currentPage, pageCount]
  )

  // const splitIntoPages = useCallback(
  //   (sizeArray: number[]) => {
  //     console.log(`DEBUG: Paginator: splitIntoPages: sizeArray: ${JSON.stringify(sizeArray)}`)
  //     // if wrapperRef isn't set yet
  //     if (wrapperRef.current === null) {
  //       return
  //     }

  //     const selectorIsHorizontal = selectorLocation.startsWith("bottom") || selectorLocation.startsWith("top")
  //     const selectorIsTakingUpSpace =
  //       !pageSelectorPropsSetter &&
  //       ((orientation === "horizontal" && !selectorIsHorizontal) ||
  //         (orientation === "vertical" && selectorIsHorizontal))
  //     // Calculating parent size (selector might be taking part of the size if it is of the opposite orientation, we
  //     // should then subtract its size (3.5rem = 56px)
  //     const parentSize =
  //       (orientation === "horizontal" ? wrapperRef.current.offsetWidth : wrapperRef.current.offsetHeight) -
  //       (selectorIsTakingUpSpace ? 56 : 0)
  //       // TODO: this is wrong the number 56 represents how much space the page flipper needs
  //       // TODO: if we set it to zero, page flipper is laid above the text and layout becomes unstable
  //       // TODO: if we set it to large value, screen flickers and then layout converges
  //       // TODO: we should wrap all children in a div with overflow-hidden that is as small as area above the page flipper
  //       // TODO: and clear the overflow-hidden from the wrapper div when there is no paging,
  //       // and set it to overflow-hidden when there is paging

  //     console.log(`DEBUG: Paginator: splitIntoPages: offset: ${wrapperRef.current.offsetWidth} x ${wrapperRef.current.offsetHeight}`)
  //     console.log(`DEBUG: Paginator: splitIntoPages: parentSize: ${parentSize}`)

  //     if (sizeArray.reduce((sizeSum, size) => sizeSum + size, 0) <= parentSize) {
  //       console.log(`DEBUG: Paginator: splitIntoPages: setCurrentPage(0)`)
  //       setCurrentPage(0)
  //       return
  //     }

  //     const newPagesArray: number[][] = []
  //     let currentPageSize: number = 0
  //     let currentPageElements: number[] = []

  //     childrenRef.current.forEach((ref, childIndex) => {
  //       const refSize = pageNumber ? parentSize * pageNumber : sizeArray[childIndex]

  //       // if the current page would overflow after adding this element, push it to the array and start a new page
  //       if (currentPageSize + refSize > parentSize && currentPageElements.length > 0) {
  //         newPagesArray.push(currentPageElements)
  //         currentPageSize = 0
  //         currentPageElements = []
  //       }

  //       // if there is one dom element that is too long and would be scrollable, split it into separate pages
  //       if (currentPageSize === 0 && refSize > parentSize) {
  //         if (orientation === "horizontal") {
  //           // split into pages and save where to scroll on changing page
  //           let i = 0
  //           while (i * parentSize < refSize) {
  //             newPagesArray.push([childIndex])
  //             i++
  //           }
  //         } else {
  //           currentPageElements.push(childIndex)
  //           currentPageSize += refSize
  //         }
  //       } else if (currentPageSize + refSize <= parentSize) {
  //         // if even after adding this element the page is not overflowing, add it to current page
  //         currentPageElements.push(childIndex)
  //         currentPageSize += refSize
  //       }
  //     })
  //     // push leftover elements to last page if needed
  //     if (currentPageElements.length > 0) {
  //       newPagesArray.push(currentPageElements)
  //     }

  //     console.log(`DEBUG: Paginator: splitIntoPages: newPagesArray: ${JSON.stringify(newPagesArray)}`)

  //     if (orientation === "vertical") {
  //       const pagesEl = (
  //         <div
  //           style={{
  //             width: `${newPagesArray.length}00%`,
  //           }}
  //           className="h-full flex"
  //         >
  //           {newPagesArray.map((pageChildren, i) => (
  //             <SizeChangeObserver
  //               orientation="vertical"
  //               className="h-fit min-h-full"
  //               style={{
  //                 width: `calc(100% / ${newPagesArray.length})`,
  //               }}
  //               key={`pageEl${i}`}
  //               onSizeChange={() => {
  //                 setPagesElement(undefined)
  //               }}
  //             >
  //               {pageChildren.map((elIndex) => childrenArray[elIndex])}
  //             </SizeChangeObserver>
  //           ))}
  //         </div>
  //       )
  //       setPagesElement(pagesEl)
  //     } else {
  //       const pagesEl = (
  //         <SizeChangeObserver
  //           orientation="horizontal"
  //           className="h-full w-fit w-min-full"
  //           onSizeChange={() => setPagesElement(undefined)}
  //         >
  //           {childrenArray}
  //         </SizeChangeObserver>
  //       )

  //       setPagesElement(pagesEl)
  //     }
  //     setStartingPage(newPagesArray.length)
  //     setPageNum(newPagesArray.length)
  //   },
  //   [childrenArray, orientation, pageNumber, pageSelectorPropsSetter, selectorLocation, setStartingPage]
  // )

  // const paginate = useCallback(() => {
  //   console.log(`DEBUG: Paginator: paginate`)
  //   const newChildrenSizeArray: number[] = []

  //   childrenRef.current.forEach((ref) => {
  //     const refWithoutWrapper = ref.firstElementChild
  //     const marginSize = refWithoutWrapper
  //       ? orientation === "horizontal"
  //         ? parseInt(window.getComputedStyle(refWithoutWrapper).marginLeft) +
  //           parseInt(window.getComputedStyle(refWithoutWrapper).marginRight)
  //         : parseInt(window.getComputedStyle(refWithoutWrapper).marginTop) +
  //           parseInt(window.getComputedStyle(refWithoutWrapper).marginBottom)
  //       : 0
  //     const refSize = (orientation === "horizontal" ? ref.scrollWidth : ref.scrollHeight) + marginSize

  //     newChildrenSizeArray.push(refSize)
  //   })

  //   splitIntoPages(newChildrenSizeArray)
  // }, [orientation, splitIntoPages])

  const onPagesCalculated = useCallback(
    (identifier: any, pages: Pages<T>, orientation: ScreenOrientation, selectorSize: number) => {
      if (orientation === "vertical") {
        const pagesEl = (
          <div
            style={{
              width: `${pages.length}00%`,
            }}
            className="h-full flex"
          >
            {pages.map((page, i) => (
              <div
                className="h-fit min-h-full"
                style={{
                  width: `calc(100% / ${pages.length})`,
                }}
                key={`pageEl${i}`}
              >
                {page.children}
              </div>
            ))}
          </div>
        )
        setPagesElement(pagesEl)
      } else {
        const pagesEl = <div className="h-full w-fit w-min-full">{childrenArray}</div>
        setPagesElement(pagesEl)
      }
      setStartingPage(pages.length)
      setPageCount(pages.length)
    },
    [childrenArray, setStartingPage]
  )

  useLayoutEffect(() => {
    if (orientation === "horizontal") {
      setPagesElement(undefined)
      setAvailableSpace(width)
    }
  }, [width, orientation])

  useLayoutEffect(() => {
    if (orientation === "vertical") {
      setPagesElement(undefined)
      setAvailableSpace(height)
    }
  }, [height, orientation])

  return (
    <>
      <div>
        <OffscreenPageSplitter
          children={childrenToMeasure}
          orientation={orientation}
          availableSpace={availableSpace}
          selectorLocation={selectorLocation}
          identifier={undefined}
          onPagesCalculated={onPagesCalculated}
        />
      </div>
      <div ref={wrapperRef} className="w-full h-full">
        {!!pagesElement && pageCount && (
          <PageFlipper
            pages={pageCount}
            currentPageSetter={setCurrentPage}
            startingPage={currentPage}
            selectorLocation={selectorLocation}
          >
            {pagesElement}
          </PageFlipper>
        )}
      </div>
    </>
  )
}

interface Props<T extends JSX.Element = JSX.Element> {
  children: Children<T> | T | string
  orientation?: ScreenOrientation
  pageNumber?: number
  selectorLocation?: SelectorLocation
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
}

export default observer(Paginator)
