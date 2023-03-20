import React from "react"
import SettingsMenu from "../SettingsMenu"
import VersionInfo from "../VersionInfo"
import PageSelector, { PageSelectorProps } from "../PageSelector"

const Footer = ({ pageSelectorProps }: Props) => {
  return (
    <div className="flex w-[calc(100%-4rem)] h-16 items-center justify-between pt-2 pb-3">
      <VersionInfo />
      {!!pageSelectorProps && !!pageSelectorProps.maxPages && pageSelectorProps.maxPages > 1 && (
        <div className={"w-[calc(100%-10rem)] min-w-[8.75rem]"}>
          <PageSelector {...pageSelectorProps} selectorLocation="bottom-right" />
        </div>
      )}
      <SettingsMenu />
    </div>
  )
}

interface Props {
  pageSelectorProps?: PageSelectorProps
}

export default Footer
