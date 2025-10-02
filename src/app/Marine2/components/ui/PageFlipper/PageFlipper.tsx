import PageSelector, { PageSelectorProps, SelectorLocation } from "../PageSelector"
import classnames from "classnames"
import React, { useState, useRef, useLayoutEffect } from "react"
import useSize from "@react-hook/size"

/// Takes the horizontal space occupied by `children` and divides it by number of `pages`
/// and clips to display only one page at a time, starting at `startingPage`.
/// Uses either built in `PageSelector` to navigate between pages and pass the result back via `currentPageSetter`,
/// or you can pass in your own page selector component via `pageSelectorPropsSetter`.
const PageFlipper = ({
  children,
  pageSelectorPropsSetter,
  pages,
  currentPageSetter,
  startingPage,
  selectorLocation = "bottom-full",
}: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const [width, height] = useSize(wrapperRef)
  const [currentPage, setCurrentPage] = useState(startingPage ?? 0)
  const [cachedCurrentPage] = useState(startingPage ?? 0)

  useLayoutEffect(() => {
    if (pageSelectorPropsSetter) {
      pageSelectorPropsSetter({
        onClickLeft: () => setCurrentPage(currentPage - 1),
        onClickRight: () => setCurrentPage(currentPage + 1),
        currentPage: currentPage,
        maxPages: pages,
      })
    }
  }, [currentPage, pageSelectorPropsSetter, pages])

  // Restore scroll position to cachedCurrentPage when viewport changes
  useLayoutEffect(() => {
    if (!pageRef.current) {
      return
    }
    const offset = cachedCurrentPage * pageRef.current.offsetWidth
    pageRef.current.scrollLeft = offset
  }, [width, height, cachedCurrentPage])

  // Smooth scroll to new position when currentPage changes
  useLayoutEffect(() => {
    if (!pageRef.current) {
      return
    }
    const offset = currentPage * pageRef.current.offsetWidth

    if (typeof pageRef.current.scrollTo !== "function") {
      pageRef.current.scrollLeft = offset
      return
    }

    pageRef.current.scrollTo({
      left: offset,
      behavior: "smooth",
    })
  }, [currentPage])

  useLayoutEffect(() => {
    if (!currentPageSetter) return
    currentPageSetter(currentPage)
  }, [currentPage, currentPageSetter])

  useLayoutEffect(() => {
    if (pages && currentPage && currentPage > pages - 1) setCurrentPage(pages - 1)
  }, [currentPage, pages])

  return (
    <div
      ref={wrapperRef}
      className={classnames("w-full h-full", {
        "flex flex-col justify-between": !pageSelectorPropsSetter,
      })}
    >
      <div ref={pageRef} className={classnames("overflow-hidden w-full h-full", {})}>
        {children}
      </div>
      {!pageSelectorPropsSetter && pages > 1 && (
        <PageSelector
          selectorLocation={selectorLocation}
          onClickLeft={() => {
            setCurrentPage(currentPage - 1)
          }}
          onClickRight={() => {
            setCurrentPage(currentPage + 1)
          }}
          currentPage={currentPage}
          maxPages={pages}
        ></PageSelector>
      )}
    </div>
  )
}

interface Props {
  children: React.JSX.Element
  pages: number
  pageSelectorPropsSetter?: (arg0: PageSelectorProps) => void
  currentPageSetter?: (arg0: number) => void
  startingPage?: number
  selectorLocation?: SelectorLocation
}

export default PageFlipper
