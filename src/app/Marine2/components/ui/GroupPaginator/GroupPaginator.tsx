import React, { useRef, useState, useCallback, useMemo, useEffect } from "react"
import classnames from "classnames"
import { SelectorLocation } from "../PageSelector"
import { observer } from "mobx-react-lite"
import PageFlipper from "../PageFlipper"
import useSize from "app/Marine2/utils/hooks/use-size"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"
import OffscreenPageSplitter, { Children, Pages } from "../OffscreenPageSplitter"
import { boxBreakpoints } from "../../../utils/media"

/// Split `children` contained in `childrenGroups` laid out in given `orientation` into pages
/// and allow flipping through them using `PageSelector` positioned in `selectorLocation`.
/// Pages always contain only `children` from one group, and new page is open for children
/// from next group. Notify parent about scrolling via `currentPageSetter`.
const GroupPaginator = <T extends React.JSX.Element>({
  children,
  childrenGroups,
  orientation = "horizontal",
  selectorLocation = "bottom-center",
  currentPageSetter = (_currentPage, _pageCount) => {},
}: Props<T>) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width, height] = useSize(wrapperRef)

  const [pagingResults, setPagingResults] = useState<Pages<T>[]>([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)

  const groupsOfChildrenToMeasure = useMemo(() => {
    return childrenGroups.map((group) => {
      return group.map((child, i) => (
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
    })
  }, [childrenGroups, orientation])

  const setStartingPage = useCallback(
    (startingPage: number) => {
      if (!!currentPage && startingPage !== pageCount && currentPage >= startingPage) {
        setCurrentPage(startingPage - 1)
      }
    },
    [currentPage, pageCount],
  )

  // Compare two pages referening to their children by their index
  const arePagesEqual = useCallback((a: Pages<T>, b: Pages<T>) => {
    if (a === b) return true
    if (a.length !== b.length) return false
    return a.every((pageA, i) => {
      const pageB = b[i]
      if (!pageB || pageA.indexes.length !== pageB.indexes.length) return false
      return pageA.indexes.every((item, j) => item === pageB.indexes[j])
    })
  }, [])

  // Collect paging results for all groups. Each group is referenced by index
  // representing its position within sorted list of groups.
  const onPagesForGroupCalculated = useCallback(
    (index: number, pages: Pages<T>, _orientation: ScreenOrientation, _selectorSize: number) => {
      setPagingResults((prev) => {
        const base = prev.length > childrenGroups.length ? [] : prev
        if (base.length > index) {
          if (arePagesEqual(base[index], pages)) {
            return base
          }
        }
        return [...base.slice(0, index), pages, ...base.slice(index + 1)]
      })
    },
    [arePagesEqual, childrenGroups.length],
  )

  const columnsPerPage = useMemo(() => {
    if (width / 3 >= boxBreakpoints["lg-s"].width) return 3
    if (width / 2 >= boxBreakpoints["lg-s"].width) return 2
    return 1
  }, [width])

  const availableSpace = orientation === "horizontal" ? width : height

  const { pagesElement, computedPageCount } = useMemo(() => {
    const columnCount = pagingResults.reduce((total, group) => {
      return total + group.length
    }, 0)

    const effectiveColumnsPerPage = columnCount >= columnsPerPage ? columnsPerPage : columnCount > 0 ? columnCount : 1

    const computedPageCount = Math.ceil(columnCount / effectiveColumnsPerPage)
    const fullWidthPct = (100.0 / effectiveColumnsPerPage) * columnCount

    if (columnCount === 0) {
      return { pagesElement: undefined, computedPageCount: 0 }
    }

    let pagesElement: React.JSX.Element | undefined
    if (orientation === "vertical") {
      const groupOffsets = pagingResults.reduce<number[]>(
        (acc, group) => [...acc, (acc[acc.length - 1] ?? 0) + group.length],
        [],
      )
      pagesElement = (
        <div
          style={{
            width: `${fullWidthPct}%`,
          }}
          className="h-full flex"
        >
          {pagingResults.flatMap((group, groupIndex) => {
            const groupColumnCount = group.length
            const groupOffset = groupIndex > 0 ? groupOffsets[groupIndex - 1] : 0
            return group.map((column, groupColumnIndex) => {
              const colIdx = groupOffset + groupColumnIndex
              return (
                <div
                  key={`columnEl${groupIndex}${groupColumnIndex}`}
                  style={{
                    width: `calc(100% / ${effectiveColumnsPerPage})`,
                  }}
                >
                  {children({
                    columnIndex: colIdx,
                    columnCount: columnCount,
                    columnsPerPage: effectiveColumnsPerPage,
                    columnChildren: column.children,
                    groupIndex: groupIndex,
                    groupColumnIndex: groupColumnIndex,
                    groupColumnCount: groupColumnCount,
                    isFirstColumnOnPage: isFirstColumnOnPage(colIdx, columnCount, effectiveColumnsPerPage),
                    isFirstColumnOnLastPage: isFirstColumnOnLastPage(colIdx, columnCount, effectiveColumnsPerPage),
                  })}
                </div>
              )
            })
          })}
        </div>
      )
    }

    return { pagesElement, computedPageCount }
  }, [children, columnsPerPage, orientation, pagingResults])

  if (computedPageCount !== pageCount) {
    setPageCount(computedPageCount)
    setStartingPage(computedPageCount)
  }

  useEffect(() => {
    currentPageSetter(currentPage, pageCount)
  }, [currentPage, currentPageSetter, pageCount])

  return (
    <>
      <div>
        {groupsOfChildrenToMeasure.map((group, index) => (
          <div key={`splitter_${index}`}>
            <OffscreenPageSplitter
              orientation={orientation}
              availableSpace={availableSpace - 40} // TODO: subtract Box title height properly
              selectorLocation={selectorLocation}
              isSelectorAlwaysDisplayed={groupsOfChildrenToMeasure.length > 1}
              identifier={index}
              onPagesCalculated={onPagesForGroupCalculated}
            >
              {groupsOfChildrenToMeasure[index]}
            </OffscreenPageSplitter>
          </div>
        ))}
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

function isFirstColumnOnPage(columnIndex: number, totalColumns: number, columnsPerPage: number) {
  if (totalColumns <= columnsPerPage) {
    return columnIndex === 0
  }

  if (columnIndex % columnsPerPage === 0 && columnIndex < totalColumns - columnsPerPage) {
    return true
  }

  return false
}

function isFirstColumnOnLastPage(columnIndex: number, totalColumns: number, columnsPerPage: number) {
  const lastPageStart = totalColumns - columnsPerPage
  return columnIndex === lastPageStart
}

interface PaginationState<T extends React.JSX.Element = React.JSX.Element> {
  columnIndex: number
  columnCount: number
  columnsPerPage: number
  columnChildren: Children<T>
  groupIndex: number
  groupColumnIndex: number
  groupColumnCount: number
  isFirstColumnOnPage: boolean
  isFirstColumnOnLastPage: boolean
}

type PaginationRenderer<T extends React.JSX.Element = React.JSX.Element> = (
  state: PaginationState<T>,
) => React.JSX.Element

interface Props<T extends React.JSX.Element = React.JSX.Element> {
  children: PaginationRenderer<T>
  childrenGroups: Children<T>[]
  orientation?: ScreenOrientation
  pageNumber?: number
  selectorLocation?: SelectorLocation
  currentPageSetter?: (currentPage: number, pageCount: number) => void
}

export default observer(GroupPaginator)
