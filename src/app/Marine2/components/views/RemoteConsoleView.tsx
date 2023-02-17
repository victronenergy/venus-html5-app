import React from "react"
import MainLayout from "../ui/MainLayout"
import RemoteConsole from "../ui/RemoteConsole"

const RemoteConsoleView = ({ host }: Props) => {
  return (
    <MainLayout>
      <div className={"flex items-center justify-center w-full h-full"}>
        <RemoteConsole host={host} />
      </div>
    </MainLayout>
  )
}

interface Props {
  host: string
}

export default RemoteConsoleView
