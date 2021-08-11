import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from "react"

type notifyParams = {
  widgetName: string
  visible: boolean
}

type MetricsContextValue = {
  elementsVisible?: boolean
  notifyVisibility?: (arg: notifyParams) => void
}

export const MetricsContext = createContext<MetricsContextValue>({})

export const MetricsProvider: FC = ({ children }) => {
  const [visibleElements, setVisibleElements] = useState<Array<string>>([])

  const notifyVisibility = useCallback((element: notifyParams) => {
    if (element.visible) {
      setVisibleElements((prevArr) => {
        if (prevArr.includes(element.widgetName)) {
          return prevArr
        }
        return [...prevArr, element.widgetName]
      })
    } else {
      setVisibleElements((prevArr) => prevArr.filter((item) => item !== element.widgetName))
    }
  }, [])

  const value = useMemo(
    () => ({
      elementsVisible: !!visibleElements.length,
      notifyVisibility,
    }),
    [visibleElements, notifyVisibility]
  )

  return <MetricsContext.Provider value={value}>{children}</MetricsContext.Provider>
}

export const useVisibilityNotifier = ({ widgetName, visible }: notifyParams) => {
  const { notifyVisibility } = useContext(MetricsContext)

  useEffect(() => {
    notifyVisibility && notifyVisibility({ widgetName, visible })
  }, [visible, notifyVisibility, widgetName])
}
