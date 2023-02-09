import React from "react"
import LogoIcon from "../../../images/logo.svg"

const Footer = () => {
  return (
    <div className="flex w-full flex-row justify-between p-4">
      <div>
        <img src={LogoIcon} className={"w-32 text-black dark:text-white"} alt={"Victron"} />
      </div>
      {/* TODO: add popup modal menu */}
      <div>Menu</div>
    </div>
  )
}

export default Footer
