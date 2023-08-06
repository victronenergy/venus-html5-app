import React from "react"
import { observer } from "mobx-react"

const Header = ({ title }: Props) => {
  return (
    <div className={"flex flex-row justify-between w-full items-center pb-1"}>
      <div className={"grow text-center text-sm md-m:text-base xl-m:text-md"}>{title}</div>
    </div>
  )
}

interface Props {
  title?: string
}

export default observer(Header)
