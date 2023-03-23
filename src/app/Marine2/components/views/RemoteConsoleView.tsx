import React, { useRef } from "react"
import MainLayout from "../ui/MainLayout"
import RemoteConsole from "../ui/RemoteConsole"
import useSize from "@react-hook/size"

const RemoteConsoleView = ({ host }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [width, height] = useSize(wrapperRef)

  return (
    <MainLayout>
      <div className={"flex items-center justify-center w-full h-full"} ref={wrapperRef}>
        <RemoteConsole host={host} width={width} height={height} />
      </div>
    </MainLayout>
  )
}

interface Props {
  host: string
}

export default RemoteConsoleView
