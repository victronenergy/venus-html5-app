import { CSSProperties, useEffect, useRef, useState } from "react"
import { useComponentSize } from "../../../utils/hooks"
import { observer } from "mobx-react"

const SizeChangeObserver = ({ children, onSizeChange, orientation, className = "", style }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const componentSize = useComponentSize(containerRef)
  const [initialSize, setInitialSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  useEffect(() => {
    if (initialSize.width === 0 && initialSize.height === 0) {
      setInitialSize(componentSize)
    } else if (
      (orientation === "vertical" && componentSize.height !== initialSize.height) ||
      (orientation === "horizontal" && componentSize.width !== initialSize.width)
    ) {
      console.log(orientation)
      setInitialSize(componentSize)
      onSizeChange()
    }
  }, [onSizeChange, initialSize, orientation, componentSize, className])

  return (
    <div className={className} ref={containerRef} style={style}>
      {children}
    </div>
  )
}

interface Props {
  children: (string | JSX.Element)[] | JSX.Element | string
  onSizeChange: () => void
  orientation: "vertical" | "horizontal"
  className?: string
  style?: CSSProperties
}

export default observer(SizeChangeObserver)
