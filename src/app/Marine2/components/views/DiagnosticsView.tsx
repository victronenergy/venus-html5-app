import React from "react"
import MainLayout from "../ui/MainLayout"
import DiagnosticsTable from "../ui/DiagnosticsTable"
import { MqttStore, useMqtt } from "@elninotech/mfd-modules"
import { translate } from "react-i18nify"
import { observer } from "mobx-react"
import { useWindowSize } from "../../utils/hooks"
import Paginator from "../ui/Paginator"

const DiagnosticsView = () => {
  const mqtt = useMqtt()
  const windowSize = useWindowSize()
  const connectionDiagnostics = getConnectionDiagnostics(mqtt)
  const deviceDiagnostics = getDeviceDiagnostics(windowSize)

  return (
    <MainLayout title={translate("diagnostics.diagnostics")}>
      {/* TODO: pagination */}
      <div className={"w-full h-full overflow-hidden"}>
        <Paginator orientation={"vertical"}>
          <div className={"container mx-auto max-w-screen-md"}>
            <DiagnosticsTable
              title={translate("diagnostics.connection.connection")}
              diagnostics={connectionDiagnostics}
            />
          </div>
          <div className={"container mx-auto max-w-screen-md"}>
            <DiagnosticsTable title={translate("diagnostics.device.device")} diagnostics={deviceDiagnostics} />
          </div>
        </Paginator>
      </div>
    </MainLayout>
  )
}

const getConnectionDiagnostics = (mqtt: MqttStore) => {
  return [
    {
      property: translate("diagnostics.connection.portalId"),
      value: mqtt.portalId ?? "none",
    },
    {
      property: translate("diagnostics.connection.status"),
      value: mqtt.status,
    },
    {
      property: translate("diagnostics.connection.error"),
      value: mqtt.error ? "true" : "false",
    },
    {
      property: translate("diagnostics.connection.host"),
      value: mqtt.client?.options?.host ?? "not available",
    },
  ]
}

const getDeviceDiagnostics = (windowSize: { width?: number; height?: number }) => {
  return [
    {
      property: translate("diagnostics.device.userAgent"),
      value: window.navigator.userAgent,
    },
    {
      property: translate("diagnostics.device.viewportWidth"),
      value: (windowSize.width ?? window.innerWidth) + "px",
    },
    {
      property: translate("diagnostics.device.viewportHeight"),
      value: (windowSize.height ?? window.innerHeight) + "px",
    },
  ]
}

export default observer(DiagnosticsView)
