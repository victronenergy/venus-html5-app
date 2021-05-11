import "../css/index.scss"
import React, { useEffect } from "react"
import Loading from "./MarineApp/components/Loading"
import { MqttService, mqttStore } from "./modules/Mqtt"

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
    mqttService.boot(props.host, props.port)
  }, [props.host, props.port])

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
