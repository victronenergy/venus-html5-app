import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import BackIcon from "../../../images/icons/back.svg"

const Header = ({ title }: Props) => {
  const [isShowBack, setShowBack] = useState(false)

  const handleBackClick = () => {
    window.history.back()
  }

  useEffect(() => {
    setShowBack(!/\/app\/?$/i.test(window.location.href))
  }, [])

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
