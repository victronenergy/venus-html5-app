import { useEffect, useRef } from "react"
import { useComponentSize } from "../../../utils/hooks"
import { observer } from "mobx-react"
import classnames from "classnames"

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
    <div
      ref={parentRef}
      className={classnames("", {
        "w-full": orientation === "horizontal",
        "h-full": orientation === "vertical",
      })}
    >
      <div
        className={classnames("", {
          "w-full min-w-fit": orientation === "horizontal",
          "h-full min-h-fit": orientation === "vertical",
        })}
        ref={containerRef}
      >
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
