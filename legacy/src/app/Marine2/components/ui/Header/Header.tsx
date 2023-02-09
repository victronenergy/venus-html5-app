import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import BackIcon from "../../../images/icons/back.svg"
import { useLocation } from "react-router-dom"

const Header = ({ title }: Props) => {
  const [isShowBack, setShowBack] = useState(false)
  const location = useLocation()
  const { pathname } = location || {}

  const handleBackClick = () => {
    window.history.back()
  }

  useEffect(() => {
    setShowBack(Boolean(pathname) && pathname !== "/")
  }, [pathname])

  return (
    <div className={"flex flex-row justify-between w-full items-center pb-4"}>
      <div className={"grow text-center text-xl"}>{title}</div>
      {isShowBack && (
        <div onClick={handleBackClick} className={"grow-0 cursor-pointer"}>
          <img src={BackIcon} className={"w-6 text-blue-600 dark:text-blue-400"} alt={"Back"} />
        </div>
      )}
    </div>
  )
}

interface Props {
  title?: string
}

export default observer(Header)
