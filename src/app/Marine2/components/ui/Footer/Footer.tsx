import React, {useEffect, useState} from "react"
import SettingsMenu from "../SettingsMenu"
import VersionInfo from "../VersionInfo"
import PageSelector, {PageSelectorProps} from "../PageSelector"
import BackIcon from "../../../images/icons/back.svg";
import {AppViews, useAppViewsStore} from "../../../modules/AppViews";

const Footer = ({pageSelectorProps}: Props) => {
    const appViewsStore = useAppViewsStore()
    const [isShowBack, setShowBack] = useState(appViewsStore.currentView !== AppViews.ROOT)

    const handleBackClick = () => {
        appViewsStore.setView(AppViews.ROOT)
    }

    useEffect(() => {
        setShowBack(appViewsStore.currentView !== AppViews.ROOT)
    }, [appViewsStore.currentView])

    return (
        <div className="flex w-[calc(100%-4rem)] h-16 items-center justify-between pt-2 pb-3">
            <VersionInfo/>
            {!!pageSelectorProps && !!pageSelectorProps.maxPages && pageSelectorProps.maxPages > 1 && (
                <div className={"fixed left-1/2 translate-x-[-50%] min-w-[8.75rem]"}>
                    <PageSelector {...pageSelectorProps} selectorLocation="bottom-center"/>
                </div>
            )}
            {isShowBack && (
                <div
                    onClick={handleBackClick}
                    className={"fixed right-14 bottom-3.5 cursor-pointer py-[12px] pl-[56px] w-24 min-w-[96px] z-1 outline-none"}
                >
                    {/* todo: fix types for svg */}
                    {/* @ts-ignore */}
                    <BackIcon className={"w-[24px] text-blue-600 dark:text-blue-400"} alt={"Back"}/>
                </div>
            )}
            <SettingsMenu/>
        </div>
    )
}

interface Props {
    pageSelectorProps?: PageSelectorProps
}

export default Footer
