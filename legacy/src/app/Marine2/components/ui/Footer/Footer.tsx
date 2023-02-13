import React from "react"
import LogoIcon from "../../../images/logo.svg"
import Settings from "../Settings"

const Footer = () => {
  return (
    <div className="flex w-full flex-row justify-between pt-6 pb-4">
      <div>
        {/* todo: fix types for svg */}
        {/* @ts-ignore */}
        <LogoIcon className={"w-32 text-black dark:text-white"} alt={"Victron Energy"} />
      </div>
      <Settings />
    </div>
  )
}

export default Footer
