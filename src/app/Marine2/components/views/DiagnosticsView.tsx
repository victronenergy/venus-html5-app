import React from "react"
import MainLayout from "../ui/MainLayout"
import DiagnosticsTable from "../ui/DiagnosticsTable"
import { MqttStore, useMqtt } from "@victronenergy/mfd-modules"
import { translate } from "react-i18nify"
import { observer } from "mobx-react"
import { useWindowSize } from "../../utils/hooks/use-window-size"
import Paginator from "../ui/Paginator"

const DiagnosticsView = () => {
  const mqtt = useMqtt()
  const windowSize = useWindowSize()

  const connectionDiagnostics = (
    <DiagnosticsTable
      title={translate("diagnostics.connection.connection")}
      diagnostics={getConnectionDiagnostics(mqtt)}
    />
  )

  const deviceDiagnostics = (
    <DiagnosticsTable title={translate("diagnostics.device.device")} diagnostics={getDeviceDiagnostics(windowSize)} />
  )

  return (
    <MainLayout title={translate("diagnostics.diagnostics")}>
      <div className={"h-full w-full overflow-hidden"}>
        <Paginator orientation={"vertical"}>
          <div className={"container mx-auto max-w-screen-md mb-4"}>{connectionDiagnostics}</div>
          <div className={"container mx-auto max-w-screen-md"}>{deviceDiagnostics}</div>
        </Paginator>
      </div>
    </MainLayout>
  )
}

const getConnectionDiagnostics = (mqtt: MqttStore) => {
  return [
    {
      property: translate("diagnostics.connection.portalId"),
      value: mqtt.portalId ?? "-",
    },
    {
      property: translate("diagnostics.connection.status"),
      value: mqtt.status,
    },
    {
      property: translate("diagnostics.connection.error"),
      value: mqtt.error ? `${mqtt.error}` : translate("diagnostics.connection.none"),
    },
    {
      property: translate("diagnostics.connection.host"),
      value: mqtt.client?.options?.host ?? "-",
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
