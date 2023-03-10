import React from "react"
import Settings from "../Settings"
import VersionInfo from "../VersionInfo"
import PageSelector, { PageSelectorProps } from "../PageSelector"

const Footer = ({ pageSelectorProps }: Props) => {
  console.log(pageSelectorProps)
  return (
    <div className="flex w-full h-20 items-center justify-between pt-5 pb-4">
      <VersionInfo />
      {!!pageSelectorProps && <PageSelector {...pageSelectorProps} selectorLocation="bottom-right" />}
      <Settings />
    </div>
  )
}

interface Props {
  pageSelectorProps?: PageSelectorProps
}

export default Footer
