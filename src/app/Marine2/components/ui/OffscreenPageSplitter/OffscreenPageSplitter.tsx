import React, { useRef, useEffect, useCallback } from "react"
import { SelectorLocation } from "../PageSelector"
import { observer } from "mobx-react"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"

/// Render children offscreen and split them into pages based on availableSpace
/// Invoke onPagesCalculated callback when split is complete
/// TODO: Take into account position and size of paging navigation
const OffscreenPageSplitter = ({ children, orientation = "vertical", availableSpace, onPagesCalculated }: Props) => {
  const measureRef = useRef<HTMLDivElement>(null)
  const childRefs = useRef<(HTMLDivElement | null)[]>([])

  const measureChildren = useCallback(() => {
    const childSizes = childRefs.current.map((ref) => {
      if (ref) {
        const rect = ref.getBoundingClientRect()
        return orientation === "vertical" ? rect.height : rect.width
      }
      return 0
    })

    // console.log(`DEBUG: OffscreenPageSplitter childSizes: ${JSON.stringify(childSizes)}`)

    // Only proceed if we have valid measurements
    const hasValidMeasurements = childSizes.some((size) => size > 0)
    if (!hasValidMeasurements) {
      // Schedule measurement for next frame when DOM is ready
      requestAnimationFrame(measureChildren)
      return
    }

    // Calculate pages based on sizes
    const pages = []
    let currentPage: number[] = []
    let currentSize = 0

    // First pass: determine whether we need pagination
    let needsPagination = false
    let tempSize = 0
    for (const size of childSizes) {
      if (tempSize + size > availableSpace && tempSize > 0) {
        needsPagination = true
        break
      }
      tempSize += size
    }

    // TODO: remove hardcoded 56 for PageSelector
    const effectiveSpace = needsPagination ? availableSpace - 56 : availableSpace

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

    const pageCount = Math.max(1, pages.length)

    if (onPagesCalculated) {
      onPagesCalculated(pageCount, pages, orientation)
    }
  }, [availableSpace, onPagesCalculated, orientation])

  useEffect(() => {
    if (children && children.length > 0 && availableSpace > 0) {
      measureChildren()
    }
  }, [children, availableSpace, orientation, measureChildren])

  if (!children || children.length === 0) {
    return null
  }

  return (
    <div
      ref={measureRef}
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
  )
}

interface Props {
  children: JSX.Element[]
  orientation?: ScreenOrientation
  availableSpace: number
  pageNumber?: number
  selectorLocation?: SelectorLocation
  onPagesCalculated: (pageCount: number, pages: number[][], orientation: ScreenOrientation) => void
}

export default observer(OffscreenPageSplitter)
