import { useEffect, useRef } from "react"
import { useComponentSize } from "../../../utils/hooks"
import { observer } from "mobx-react"

const ScrollSizeObserver = ({ children, onSizeChange, orientation }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const scrollSize = useComponentSize(containerRef)
  const componentSize = useComponentSize(parentRef)
  useEffect(() => {
    if (
      (orientation === "vertical" && scrollSize.height > componentSize.height) ||
      (orientation === "horizontal" && scrollSize.width > componentSize.width)
    ) {
      onSizeChange()
    }
  }, [onSizeChange, componentSize, orientation, scrollSize])

  return (
    <div ref={parentRef} className="w-full h-full">
      <div className="w-full min-w-fit h-full min-h-fit" ref={containerRef}>
        {children}
      </div>
    </div>
  )
}

interface Props {
  children: JSX.Element[] | JSX.Element | string
  onSizeChange: () => void
  orientation: "vertical" | "horizontal"
}

export default observer(ScrollSizeObserver)
