import "../css/index.scss"
import React, { useEffect } from "react"
import Loading from "./MarineApp/components/Loading"
import { MqttService, mqttStore, vrmQuery } from "./modules"

const KVNRV = React.lazy(() => import("./KVNRV"))
const MarineApp = React.lazy(() => import("./MarineApp"))

export type AppProps = {
  host: string
  port: number
}

const App = (props: AppProps) => {
  const whitelabel = "KVNRV"

  useEffect(() => {
    const mqttService = new MqttService(mqttStore)

    vrmQuery.all$.subscribe((vrm) => {
      if (!vrm.userId || !vrm.token) {
        mqttService.boot(props.host, props.port)
      }

      mqttService.boot(props.host, 443, vrm.username, vrm.token, vrm.webhost, vrm.portalId, "live")
    })
  }, [props.host, props.port])

  if (whitelabel === "KVNRV") {
    return (
      <React.Suspense fallback={<Loading />}>
        <KVNRV />
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
