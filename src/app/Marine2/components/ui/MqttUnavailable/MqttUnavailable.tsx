import React, { useEffect, useRef, useState } from "react"
import { translate } from "react-i18nify"
import Button from "../Button"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"
import { useMqtt } from "@victronenergy/mfd-modules"
import Connecting from "../Connecting"
import { observer } from "mobx-react"
import RemoteConsoleView from "./../../views/RemoteConsoleView"

const MqttUnavailable = ({ host }: Props) => {
  const appViewsStore = useAppViewsStore()
  const mqtt = useMqtt()
  const { isConnected, error } = mqtt

  const [isConnecting, setIsConnecting] = useState(true)

  const openRemoteConsole = () => {
    appViewsStore.setView(AppViews.REMOTE_CONSOLE)
  }

  const restart = () => {
    window.location.reload()
  }

  useEffect(() => {
    if (!error) {
      setIsConnecting(false)
      appViewsStore.setView(AppViews.ROOT)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isConnected])

  // const connectTimeout = useRef()
  let connectTimeout: React.MutableRefObject<NodeJS.Timeout | null> = useRef(null)
  useEffect(() => {
    connectTimeout.current = setTimeout(() => {
      clearTimeout((connectTimeout.current as NodeJS.Timeout) || undefined)
      setIsConnecting(false)
    }, 6 * 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearTimeout((connectTimeout.current as NodeJS.Timeout) || undefined)
  }, [])

  if (isConnecting) {
    return <Connecting />
  }

  if (appViewsStore.currentView === AppViews.REMOTE_CONSOLE) {
    return <RemoteConsoleView host={host} />
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-surface-primary border-4 border-content-victronBlue rounded-md text-sm text-content-primary">
      <div className="block max-w-xl p-4">
        <div className="flex flex-row">
          <Button onClick={openRemoteConsole} className="w-full mb-4 mr-2" size="md">
            {translate("header.remoteConsole")}
          </Button>
          <Button onClick={restart} className="w-full mb-4 ml-2" size="md">
            {translate("error.marine.restartApp")}
          </Button>
        </div>
        <div>
          <div className={"text-md mb-4"}>{translate("error.wsMqttUnavailable1")}</div>
          <div className={"mt-2"}>{translate("error.wsMqttUnavailable2")}</div>
        </div>
      </div>
    </div>
  )
}

interface Props {
  host: string
}

export default observer(MqttUnavailable)
