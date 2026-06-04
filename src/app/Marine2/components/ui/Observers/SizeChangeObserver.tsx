import React, { CSSProperties, useLayoutEffect, useRef } from "react"
import { observer } from "mobx-react"
import useSize from "app/Marine2/utils/hooks/use-size"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"

interface Props {
  children: (string | React.JSX.Element)[] | React.JSX.Element | string
  onSizeChange: () => void
  orientation: ScreenOrientation
  className?: string
  style?: CSSProperties
}

/// Invoke `onSizeChange` when `container` changes its size depending on `orientation`
/// NOTE: Deprecated because using this component causes UI flicker when cascading
/// re-render is invoked as part of size change
const SizeChangeObserver = ({ children, onSizeChange, orientation, className = "", style }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [width, height] = useSize(containerRef)
  const initialSizeRef = useRef({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const initialSize = initialSizeRef.current
    if (initialSize.width === 0 && initialSize.height === 0 && width !== 0 && height !== 0) {
      initialSizeRef.current = { width, height }
    } else if (
      (orientation === "vertical" && height !== initialSize.height) ||
      (orientation === "horizontal" && width !== initialSize.width)
    ) {
      initialSizeRef.current = { width, height }
      onSizeChange()
    }
  }, [onSizeChange, orientation, width, height, className])

  return (
    <div className={className} ref={containerRef} style={style}>
      {children}
    </div>
  )
}

export default observer(SizeChangeObserver)
