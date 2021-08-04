import "../css/index.scss"
import React, { useEffect } from "react"
import Loading from "./MarineApp/components/Loading"
import { useAppStore, useMqtt, useVebus, useVrmStore } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"

const KVNRV = React.lazy(() => import("./KVNRV"))
const MarineApp = React.lazy(() => import("./MarineApp"))

export type AppProps = {
  host: string
  port: number
}

const App = observer((props: AppProps) => {
  const whitelabel = process.env.REACT_APP_WHITELABEL
  const vrmStore = useVrmStore()
  const appStore = useAppStore()
  const mqtt = useMqtt()
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
  }, [props.host, props.port, appStore.remote, vrmStore])

  if (whitelabel === "KVNRV") {
    return (
      <React.Suspense fallback={<Loading />}>
        <KVNRV {...props} />
      </React.Suspense>
    )
  } else {
    return (
      <React.Suspense fallback={<Loading />}>
        <MarineApp {...props} />
      </React.Suspense>
    )
  }
})

export default App
