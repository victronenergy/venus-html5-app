import { RefObject, useCallback, useEffect, useState } from "react"

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
  const [size, setSize] = useState({ width: 0, height: 0 })

  const handleResize = useCallback(() => {
    if (!ref?.current) {
      return
    }

    setSize({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    })
  }, [ref])

  useEffect(() => {
    if (!ref?.current) {
      return
    }

    handleResize()

    // check if resizeObserver is supported
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(ref.current)
      return () => {
        resizeObserver.disconnect()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [ref, handleResize])

  return size
}
