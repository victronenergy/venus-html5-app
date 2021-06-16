import "../css/index.scss"
import React, { useEffect } from "react"
import Loading from "./MarineApp/components/Loading"
import { appQuery, MqttService, mqttStore, vrmQuery } from "@elninotech/mfd-modules"
import { useObservableState } from "observable-hooks"

const KVNRV = React.lazy(() => import("./KVNRV"))
const MarineApp = React.lazy(() => import("./MarineApp"))

export type AppProps = {
  host: string
  port: number
}

const App = (props: AppProps) => {
  const whitelabel = process.env.REACT_APP_WHITELABEL
  const vrmState = useObservableState(vrmQuery.all$)
  const remote = useObservableState(appQuery.remote$)

  useEffect(() => {
    const mqttService = new MqttService(mqttStore)

    if (remote === false) {
      mqttService.boot(props.host, props.port)
    } else if (
      remote &&
      vrmState?.username &&
      vrmState?.token &&
      vrmState?.webhost &&
      vrmState?.portalId &&
      vrmState?.siteId
    ) {
      mqttService.boot(vrmState.webhost, null, true, vrmState.username, vrmState.token, vrmState.portalId, "live")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.host, props.port, remote, vrmState])

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
