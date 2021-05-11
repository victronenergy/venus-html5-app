import React from "react"

export const MqttClientContext = React.createContext(null)

export const LockContext = React.createContext({
  screenLocked: localStorage.getItem("screenLocked") === "true",
  toggleLocked: () => {},
})
