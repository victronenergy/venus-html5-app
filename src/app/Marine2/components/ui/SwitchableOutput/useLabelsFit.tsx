import React, { RefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import useSize from "app/Marine2/utils/hooks/use-size"

export const segmentButtonClassName = "flex-1 truncate px-1"

/**
 * Decides whether a row of equal segments can show the given labels: every label must fit its
 * segment, otherwise none of them is used (callers fall back to numbers or another control).
 *
 * An invisible copy of the segment row carrying the labels (`measureRow`, to be rendered inside
 * the `relative` container the segments live in) is measured whenever the container width, the
 * labels or the loaded fonts change.
 */
const useLabelsFit = (
  containerRef: RefObject<HTMLElement | null>,
  labels: (string | undefined)[],
): { fits: boolean; measureRow: React.JSX.Element | null } => {
  const measureRef = useRef<HTMLDivElement>(null)
  const [containerWidth] = useSize(containerRef)
  const [fits, setFits] = useState(true)
  const labelsKey = JSON.stringify(labels)
  const hasLabels = labels.some((label) => label !== undefined && label !== "")

  // Re-measure once web fonts have loaded: a cold start measures with the fallback font metrics
  const [fontsReady, setFontsReady] = useState(false)
  useEffect(() => {
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) setFontsReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useLayoutEffect(() => {
    const el = measureRef.current
    if (!el) return
    const overflows = Array.from(el.children).some((child) => child.scrollWidth > child.clientWidth)
    setFits(!overflows)
  }, [containerWidth, labelsKey, fontsReady])

  const measureRow = hasLabels ? (
    <div ref={measureRef} className="absolute inset-0 flex invisible pointer-events-none" aria-hidden="true">
      {labels.map((label, index) => (
        <span key={index} className={segmentButtonClassName} data-testid="segments-measure">
          {label ?? `${index + 1}`}
        </span>
      ))}
    </div>
  ) : null

  return { fits, measureRow }
}

export default useLabelsFit
