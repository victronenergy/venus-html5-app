import React from "react"
import { translate } from "react-i18nify"
import Spinner from "../Spinner"

const Connecting = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-victron-darkGray border-4 border-victron-blue rounded-md">
      <div className="flex flex-col text-center">
        <div className="pl-4">
          <Spinner />
        </div>
        <div className="relative mt-28">
          <div className="text-md text-victron-blue">{translate("header.connecting")}...</div>
        </div>
      </div>
    </div>
  )
}

export default Connecting
