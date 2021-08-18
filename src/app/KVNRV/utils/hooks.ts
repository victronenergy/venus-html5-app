import { useTheme } from "@elninotech/mfd-modules"
import { useEffect, useState } from "react"

const initColors = {
  colorGray: "#000",
  colorRed: "#000",
  colorOrange: "#000",
  colorGreen: "#000",
  textColor: "#000",
  colorTransparent: "#000",
}

export const useContainerColors = () => {
  const [colors, setColors] = useState(initColors)
  const { darkMode } = useTheme()

  useEffect(() => {
    const selected = document.querySelector("#root > .container")
    if (selected) {
      const container = getComputedStyle(selected as Element)

      const colorGray = container.getPropertyValue("--color-lightgray")
      const colorRed = container.getPropertyValue("--color-red")
      const colorOrange = container.getPropertyValue("--color-orange")
      const colorGreen = container.getPropertyValue("--color-green")
      const textColor = container.getPropertyValue("--text-color-main")
      setColors({ colorGray, colorRed, colorOrange, colorGreen, textColor, colorTransparent: "rgba(0,0,0,0)" })
    } else {
      setColors(initColors)
    }
  }, [darkMode])

  return colors
}
