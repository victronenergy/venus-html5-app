import { RefObject, useEffect, useState } from "react"

const useSize = (target: RefObject<HTMLElement | null>): [number, number] => {
  const [size, setSize] = useState<[number, number]>(() => {
    const el = target.current
    return el ? [el.offsetWidth, el.offsetHeight] : [0, 0]
  })

  useEffect(() => {
    const el = target.current
    if (!el) return

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
