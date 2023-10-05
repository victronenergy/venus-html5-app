import { useEffect, useRef } from "react"
import { observer } from "mobx-react"
import classnames from "classnames"
import useSize from "@react-hook/size"
import { ScreenOrientation } from "@m2Types/generic/screen-orientation"

interface Props {
  children: JSX.Element[] | JSX.Element | string
  onSizeChange: () => void
  orientation: ScreenOrientation
}

const ScrollSizeObserver = ({ children, onSizeChange, orientation }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const [scrollWidth, scrollHeight] = useSize(containerRef)
  const [componentWidth, componentHeight] = useSize(parentRef)
  useEffect(() => {
    if (
      (orientation === "vertical" && scrollHeight > componentHeight) ||
      (orientation === "horizontal" && scrollWidth > componentWidth)
    ) {
      onSizeChange()
    }
  }, [componentHeight, componentWidth, onSizeChange, orientation, scrollHeight, scrollWidth])

  return (
    <div ref={parentRef} className="w-full h-full">
      <div
        className={classnames("", {
          "h-full min-w-fit": orientation === "horizontal",
          "w-full min-h-fit": orientation === "vertical",
        })}
        ref={containerRef}
      >
        {children}
      </div>
    </div>
  )
}

export default observer(ScrollSizeObserver)
