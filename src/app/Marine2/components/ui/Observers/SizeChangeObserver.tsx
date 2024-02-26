import { CSSProperties, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react"
import useSize from "@react-hook/size"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"
import { ISize } from "@m2Types/generic/size"

interface Props {
  children: (string | JSX.Element)[] | JSX.Element | string
  onSizeChange: () => void
  orientation: ScreenOrientation
  className?: string
  style?: CSSProperties
}

const SizeChangeObserver = ({ children, onSizeChange, orientation, className = "", style }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [width, height] = useSize(containerRef)
  const [initialSize, setInitialSize] = useState<ISize>({ width: 0, height: 0 })

  useEffect(() => {
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
