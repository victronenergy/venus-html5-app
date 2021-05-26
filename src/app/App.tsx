import "../css/index.scss"
import React, { useEffect } from "react"
import Loading from "./MarineApp/components/Loading"
import { MqttService, mqttStore, vrmQuery } from "./modules"
import { useObservableState } from "observable-hooks"

const KVNRV = React.lazy(() => import("./KVNRV"))
const MarineApp = React.lazy(() => import("./MarineApp"))

export type AppProps = {
  host: string
  port: number
}

const App = (props: AppProps) => {
  const whitelabel = "KVNRV"
  const vrmState = useObservableState(vrmQuery.all$)

  useEffect(() => {
    const mqttService = new MqttService(mqttStore)

    if (!vrmState?.userId || !vrmState?.token) {
      mqttService.boot(props.host, props.port)
    }

    vrmQuery.all$.subscribe((vrm) => {
      if (vrm.username && vrm.token && vrm.webhost && vrm.portalId) {
        mqttService.boot(vrm.webhost, null, vrm.username, vrm.token, vrm.portalId, "live")
      }
    })
  }, [props.host, props.port, vrmState?.userId, vrmState?.token])

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
}

export default App
