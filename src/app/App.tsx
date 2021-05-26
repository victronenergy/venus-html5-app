import "../css/index.scss"
import React, { useEffect } from "react"
import Loading from "./MarineApp/components/Loading"
import { appQuery, MqttService, mqttStore, vrmQuery } from "./modules"
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
  const remote = useObservableState(appQuery.remote$)

  useEffect(() => {
    const mqttService = new MqttService(mqttStore)

    if (!remote || !vrmState?.userId || !vrmState?.token) {
      mqttService.boot(props.host, props.port)
    }

    if (remote && vrmState?.username && vrmState?.token && vrmState?.webhost && vrmState?.portalId) {
      mqttService.boot(vrmState.webhost, null, vrmState.username, vrmState.token, vrmState.portalId, "live")
    }
  }, [props.host, props.port, vrmState?.userId, vrmState?.token, remote])

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
