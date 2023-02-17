import { useAppStore, useMqtt, useVebus, useVrmStore } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"
import React, { useEffect } from "react"
import "../../css/index.scss"
import { getLocale } from "react-i18nify"
// TODO: copy this lib under KVNRV folder
import { useVisibleWidgetsStore } from "../MarineApp/modules"

import { KVNRV } from "./KVNRV"

export type AppProps = {
  host: string
  port: number
}

const App = observer((props: AppProps) => {
  const vrmStore = useVrmStore()
  const appStore = useAppStore()
  const mqtt = useMqtt()
  const locale = getLocale()
  const visibleWidgetsStore = useVisibleWidgetsStore()
  useVebus()

  useEffect(() => {
    if (!appStore.remote) {
      mqtt.boot(props.host, props.port)
    } else if (
      appStore.remote &&
      vrmStore?.username &&
      vrmStore?.token &&
      vrmStore?.webhost &&
      vrmStore?.portalId &&
      vrmStore?.siteId
    ) {
      mqtt.boot(vrmStore.webhost, null, true, vrmStore.username, vrmStore.token, vrmStore.portalId, "live")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.host,
    props.port,
    appStore.remote,
    appStore.language,
    vrmStore.username,
    vrmStore.token,
    vrmStore.webhost,
    vrmStore.portalId,
    vrmStore.siteId,
    locale,
  ])

  useEffect(() => {
    visibleWidgetsStore.clearVisibleElements()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return <KVNRV {...props} />
})

export default App
