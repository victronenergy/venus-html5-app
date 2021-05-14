import React from "react"
import Header from "./components/Header"
import { Metrics } from "./components/Views"
import { useTheme } from "../modules"

export const KVNRV = () => {
  const { darkMode } = useTheme()

  return (
    <div className={"container " + (darkMode ? "dark" : "light")}>
      <Header />
      <Metrics />
    </div>
  )
}
