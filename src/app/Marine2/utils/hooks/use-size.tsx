import { RefObject, useLayoutEffect, useState } from "react"

const useSize = (target: RefObject<HTMLElement | null>): [number, number] => {
  const [size, setSize] = useState<[number, number]>([0, 0])

  useLayoutEffect(() => {
    const el = target.current
    if (!el) return

    // eslint-disable-next-line react-hooks/set-state-in-effect -- measuring DOM requires setState in layout effect
    setSize([el.offsetWidth, el.offsetHeight])

    const observer = new ResizeObserver(([entry]) => {
      const t = entry.target as HTMLElement
      setSize([t.offsetWidth, t.offsetHeight])
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return size
}

export default useSize
