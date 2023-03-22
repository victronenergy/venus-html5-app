import { useEffect, useState } from "react"

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
