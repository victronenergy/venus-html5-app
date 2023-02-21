import React, { useRef, useEffect, useState } from "react"
import classnames from "classnames"
import { useComponentSize } from "../../../utils/hooks"
import PageSelector, { SelectorLocation } from "../PageSelector"
import Grid from "../Grid"

const GridPaginator = ({
  children,
  childrenPerPage,
  orientation = "horizontal",
  selectorLocation = "bottom-full",
}: Props) => {
  const childrenArray = Array.isArray(children) ? children : [children]

  const wrapperRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  type PageElement = {
    childIndex: number
    scrollTo?: number
  }
  const [pages, setPages] = useState<Array<Array<PageElement>>>([])
  const [currentPage, setCurrentPage] = useState(0)

  // On the first render, save the children sizes to an array for calculations after resizing
  useEffect(() => {
    splitChildren()
  }, [])

  const splitChildren = () => {
    if (!childrenPerPage) return

    const childrenPageArray: PageElement[] = childrenArray.map((_, i) => {
      return { childIndex: i }
    })
    const newPagesArray: Array<Array<PageElement>> = []

    for (let i = 0; i < childrenPageArray.length; i += childrenPerPage) {
      newPagesArray.push(childrenPageArray.slice(i, i + childrenPerPage))
    }
    setPages(newPagesArray)
  }

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
      {pages.length === 1 && (
        <Grid childClassName={"p-1"} flow={"col"}>
          {childrenArray.map((child, i) => (
            <>{child}</>
          ))}
        </Grid>
      )}
      {pages && pages.length > 1 && (
        <div
          ref={pageRef}
          className={classnames("overflow-hidden flex", {
            "h-[calc(100%-3.5rem)] w-full": selectorLocation.startsWith("bottom") || selectorLocation.startsWith("top"),
            "w-[calc(100%-3.5rem)] h-full": selectorLocation.startsWith("right") || selectorLocation.startsWith("left"),
          })}
        >
          <Grid childClassName={"p-1"} flow={"col"}>
            {childrenArray
              .slice(pages[currentPage][0].childIndex, pages[currentPage][pages[currentPage].length - 1].childIndex + 1)
              .map((child, i) => (
                <>{child}</>
              ))}
          </Grid>
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
  childrenPerPage: number
  orientation?: "vertical" | "horizontal"
  selectorLocation?: SelectorLocation
}

export default GridPaginator
