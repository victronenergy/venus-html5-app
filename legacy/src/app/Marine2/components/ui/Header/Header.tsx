import React, { useEffect, useState } from "react"
import { observer } from "mobx-react"
import BackIcon from "../../../images/icons/back.svg"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"

const Header = ({ title }: Props) => {
  const appViewsStore = useAppViewsStore()
  const [isShowBack, setShowBack] = useState(appViewsStore.currentView !== AppViews.ROOT)

  const handleBackClick = () => {
    appViewsStore.setView(AppViews.ROOT)
  }

  useEffect(() => {
    setShowBack(appViewsStore.currentView !== AppViews.ROOT)
  }, [appViewsStore.currentView])

  return (
    <div className={"flex flex-row justify-between w-full items-center pb-4"}>
      <div className={"grow text-center text-xl"}>{title}</div>
      {isShowBack && (
        <div onClick={handleBackClick} className={"grow-0 cursor-pointer"}>
          {/* todo: fix types for svg */}
          {/* @ts-ignore */}
          <BackIcon className={"w-6 text-blue-600 dark:text-blue-400"} alt={"Back"} />
        </div>
      )}
    </div>
  )
}

interface Props {
  title?: string
}

export default observer(Header)
