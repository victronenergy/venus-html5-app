import { RefObject, useEffect, useState } from "react"
import useSize from "@react-hook/size"

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{ width?: number; height?: number }>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    let isMounted = true

    function handleResize() {
      if (!isMounted) {
        return
      }

      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      isMounted = false
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowSize
}

export const useComponentSize = (ref: RefObject<HTMLElement>) => {
  const [width, height] = useSize(ref)

  return { width, height }
}
