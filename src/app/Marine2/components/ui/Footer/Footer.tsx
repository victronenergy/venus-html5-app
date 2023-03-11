import React from "react"
import Settings from "../Settings"
import VersionInfo from "../VersionInfo"
import PageSelector, { PageSelectorProps } from "../PageSelector"

const Footer = ({ pageSelectorProps }: Props) => {
  return (
    <div className="flex w-full h-16 items-center justify-between pt-2 pb-3">
      <VersionInfo />
      {!!pageSelectorProps && !!pageSelectorProps.maxPages && pageSelectorProps.maxPages > 1 && (
        <PageSelector {...pageSelectorProps} selectorLocation="bottom-right" />
      )}
      <Settings />
    </div>
  )
}

interface Props {
  pageSelectorProps?: PageSelectorProps
}

export default Footer
