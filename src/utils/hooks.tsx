import { RefObject, useCallback, useLayoutEffect, useState } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{ width?: number; height?: number }>({
    width: undefined,
    height: undefined,
  })

  useLayoutEffect(() => {
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

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      isMounted = false
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export const useComponentSize = (ref: RefObject<HTMLElement>) => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  const handleResize = useCallback(() => {
    if (!ref.current) {
      return
    }

    setSize({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    })
  }, [ref])

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
