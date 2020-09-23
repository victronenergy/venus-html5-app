import React from "react"

export const MqttClientContext = React.createContext(null)

export const LockContext = React.createContext({
  showLockButton: true,
  screenLocked: false,
  toggleLocked: () => {}
})
