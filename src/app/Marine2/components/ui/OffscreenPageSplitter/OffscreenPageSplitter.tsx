import React, { useRef, useCallback, useLayoutEffect } from "react"
import PageSelector, { SelectorLocation } from "../PageSelector"
import { observer } from "mobx-react"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"

/// Every Page contains several children referenced by their index in original un-paged array
export type Children<T extends React.JSX.Element = React.JSX.Element> = T[]
export type Page<T extends React.JSX.Element = React.JSX.Element> = {
  indexes: number[]
  children: Children<T>
}
/// Result if list of Pages
export type Pages<T extends React.JSX.Element = React.JSX.Element> = Page<T>[]

/// Render children offscreen and split them into pages based on availableSpace
/// Invoke onPagesCalculated callback when split is complete
const OffscreenPageSplitter = <T extends React.JSX.Element = React.JSX.Element>({
  children,
  orientation = "vertical",
  availableSpace,
  selectorLocation = "bottom-center",
  isSelectorAlwaysDisplayed = false,
  identifier,
  onPagesCalculated,
}: Props<T>) => {
  const measureChildrenRef = useRef<HTMLDivElement>(null)
  const measurePageSelectorRef = useRef<HTMLDivElement>(null)
  const childRefs = useRef<(HTMLDivElement | null)[]>([])

  // DEBUG: the following code dumps into console why this component re-rendered
  // const prevProps = useRef({ children, orientation, availableSpace, onPagesCalculated })
  // useEffect(() => {
  //   const changed = {
  //     children: prevProps.current.children !== children,
  //     orientation: prevProps.current.orientation !== orientation,
  //     availableSpace: prevProps.current.availableSpace !== availableSpace,
  //     onPagesCalculated: prevProps.current.onPagesCalculated !== onPagesCalculated,
  //   }

  //   console.log("OffscreenPageSplitter useEffect triggered. Changes:", changed)

  //   if (changed.children) {
  //     console.log("Children changed from:", prevProps.current.children, "to:", children)
  //   }

  //   prevProps.current = { children, orientation, availableSpace, onPagesCalculated }
  // })

  const measureChildren = useCallback(() => {
    const childSizes = childRefs.current.map((ref) => {
      if (ref) {
        const rect = ref.getBoundingClientRect()
        return orientation === "vertical" ? rect.height : rect.width
      }
      return 0
    })

    // Only proceed if we have valid measurements
    const hasValidMeasurements = childSizes.some((size) => size > 0)
    if (!hasValidMeasurements) {
      // Schedule measurement for next frame when DOM is ready
      requestAnimationFrame(measureChildren)
      return
    }

    // Measure page selector
    let pageSelectorSize = 0
    if (measurePageSelectorRef.current) {
      const rect = measurePageSelectorRef.current.getBoundingClientRect()
      if (
        orientation === "vertical" &&
        (selectorLocation?.startsWith("top") || selectorLocation?.startsWith("bottom"))
      ) {
        pageSelectorSize = rect.height
      }
      if (
        orientation === "horizontal" &&
        (selectorLocation?.startsWith("left") || selectorLocation?.startsWith("right"))
      ) {
        pageSelectorSize = rect.width
      }
      pageSelectorSize *= 1.5 // padding above pageSelector
    }

    // Calculate pages based on sizes
    const pages = []
    let currentPage: number[] = []
    let currentSize = 0

    // First pass: determine whether we need pagination
    const layoutSpace = isSelectorAlwaysDisplayed ? availableSpace - pageSelectorSize : availableSpace
    const needsPagination = childSizes.reduce((sum, size) => sum + size, 0) > layoutSpace

    // Subtract pageSelectorSize if it affects display
    const effectiveSpace = needsPagination ? availableSpace - pageSelectorSize : availableSpace

    // Second pass: split into pages
    childSizes.forEach((size, index) => {
      if (currentSize + size > effectiveSpace && currentPage.length > 0) {
        // Start new page
        pages.push([...currentPage])
        currentPage = [index]
        currentSize = size
      } else {
        currentPage.push(index)
        currentSize += size
      }
    })

    // Add the last page if it has content
    if (currentPage.length > 0) {
      pages.push(currentPage)
    }

    const result = pages.map((indexes) => {
      return { indexes: indexes, children: indexes.map((i) => children[i]) }
    })

    if (onPagesCalculated) {
      onPagesCalculated(identifier, result, orientation, pageSelectorSize)
    }
  }, [
    availableSpace,
    children,
    identifier,
    isSelectorAlwaysDisplayed,
    onPagesCalculated,
    orientation,
    selectorLocation,
  ])

  useLayoutEffect(() => {
    if (children && children.length > 0 && availableSpace > 0) {
      measureChildren()
    }
  }, [children, availableSpace, orientation, measureChildren])

  if (!children || children.length === 0) {
    return null
  }

  return (
    <>
      <div
        ref={measureChildrenRef}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: orientation === "vertical" ? "column" : "row",
            flexWrap: "nowrap",
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div key={`measure-${index}`} ref={(el) => (childRefs.current[index] = el)}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div
        ref={measurePageSelectorRef}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        <PageSelector maxPages={1} selectorLocation={selectorLocation} />
      </div>
    </>
  )
}

interface Props<T extends React.JSX.Element = React.JSX.Element> {
  children: T[]
  orientation?: ScreenOrientation
  availableSpace: number
  selectorLocation?: SelectorLocation
  isSelectorAlwaysDisplayed?: boolean
  identifier: any
  onPagesCalculated: (identifier: any, pages: Pages<T>, orientation: ScreenOrientation, selectorSize: number) => void
}

export default observer(OffscreenPageSplitter)
