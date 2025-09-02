import React, { useEffect, useState } from "react"
import SettingsMenu from "../SettingsMenu"
import VersionInfo from "../VersionInfo"
import PageSelector, { PageSelectorProps } from "../PageSelector"
import BackIcon from "../../../images/icons/back.svg"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"
import SwitchingPane from "../../views/SwitchingPane"

const Footer = ({ pageSelectorProps }: Props) => {
  const appViewsStore = useAppViewsStore()
  const [isShowingBackButton, setIsShowingBackButton] = useState(appViewsStore.currentView !== AppViews.ROOT)

  const handleBackClick = () => {
    appViewsStore.setView(AppViews.ROOT)
  }

  useEffect(() => {
    setIsShowingBackButton(appViewsStore.currentView !== AppViews.ROOT)
  }, [appViewsStore.currentView])

  return (
    <div className="flex flex-row w-full h-px-44 m-1 items-center justify-between pt-2 pb-3">
      <div className="flex flex-1 flex-row items-center justify-between">
        <VersionInfo />
        {!!pageSelectorProps && !!pageSelectorProps.maxPages && pageSelectorProps.maxPages > 1 && (
          <div className={"fixed left-1/2 translate-x-[-50%] min-w-[140px]"}>
            <PageSelector {...pageSelectorProps} selectorLocation="bottom-center" />
          </div>
        )}
        {isShowingBackButton && (
          <>
            <div onClick={handleBackClick} className={"w-px-44 h-px-44 justify-center p-1 cursor-pointer"}>
              <BackIcon onClick={handleBackClick} className={"text-content-victronBlue"} alt={"Back"} />
            </div>
          </>
        )}
      </div>
      <SwitchingPane />
      <SettingsMenu />
    </div>
  )
}

interface Props {
  pageSelectorProps?: PageSelectorProps
}

export default Footer
