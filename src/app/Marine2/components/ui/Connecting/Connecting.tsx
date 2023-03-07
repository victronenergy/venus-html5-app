import React from "react"
import { translate } from "react-i18nify"
import Spinner from "../Spinner"

const Connecting = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-victron-lightGray dark:bg-victron-darkGray border-4 border-victron-blue rounded-md text-md text-black dark:text-victron-blue">
      <div className="block text-center">
        <div className="h-28 ml-[50%]">
          <Spinner />
        </div>
        <div>{translate("header.connecting")}...</div>
      </div>
    </div>
  )
}

export default Connecting
