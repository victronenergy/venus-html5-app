import React, { useEffect, useState } from "react"
import SettingsMenu from "../SettingsMenu"
import VersionInfo from "../VersionInfo"
import PageSelector, { PageSelectorProps } from "../PageSelector"
import BackIcon from "../../../images/icons/back.svg"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"

const Footer = ({ pageSelectorProps }: Props) => {
  const appViewsStore = useAppViewsStore()
  const [isShowBack, setShowBack] = useState(appViewsStore.currentView !== AppViews.ROOT)

  const handleBackClick = () => {
    appViewsStore.setView(AppViews.ROOT)
  }

  useEffect(() => {
    setShowBack(appViewsStore.currentView !== AppViews.ROOT)
  }, [appViewsStore.currentView])

  return (
    <div className="flex flex-row w-full h-16 items-center justify-between pt-2 pb-3">
      <div className="flex flex-1 flex-row items-center justify-between">
        <VersionInfo />
        {!!pageSelectorProps && !!pageSelectorProps.maxPages && pageSelectorProps.maxPages > 1 && (
          <div className={"fixed left-1/2 translate-x-[-50%] min-w-[140px]"}>
            <PageSelector {...pageSelectorProps} selectorLocation="bottom-center" />
          </div>
        )}
        {isShowBack && (
          <div onClick={handleBackClick} className={"w-fit h-fit cursor-pointer"}>
            {/* todo: fix types for svg */}
            {/* @ts-ignore */}
            <BackIcon onClick={handleBackClick} className={"text-blue-600 dark:text-blue-400"} alt={"Back"} />
          </div>
        )}
      </div>
      <SettingsMenu />
    </div>
  )
}

interface Props {
  pageSelectorProps?: PageSelectorProps
}

export default Footer
