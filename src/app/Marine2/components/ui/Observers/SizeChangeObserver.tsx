import React, { CSSProperties, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react"
import useSize from "@react-hook/size"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"
import { ISize } from "@m2Types/generic/size"

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
  const [initialSize, setInitialSize] = useState<ISize>({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (initialSize.width === 0 && initialSize.height === 0 && width !== 0 && height !== 0) {
      setInitialSize({ width, height })
    } else if (
      (orientation === "vertical" && height !== initialSize.height) ||
      (orientation === "horizontal" && width !== initialSize.width)
    ) {
      setInitialSize({ width, height })
      onSizeChange()
    }
  }, [onSizeChange, initialSize, orientation, width, height, className])

  return (
    <div className={className} ref={containerRef} style={style}>
      {children}
    </div>
  )
}

export default observer(SizeChangeObserver)
