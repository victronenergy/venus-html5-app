import React from "react"
import Settings from "../Settings"
import VersionInfo from "../VersionInfo"

const Footer = () => {
  return (
    <div className="flex w-full flex-row justify-between pt-1 pb-3">
      <VersionInfo />
      <Settings />
    </div>
  )
}

export default Footer
