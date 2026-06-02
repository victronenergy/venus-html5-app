import React from "react"
import MainLayout from "../ui/MainLayout"
import DiagnosticsTable from "../ui/DiagnosticsTable"
import { MqttStore, useMqtt } from "@victronenergy/mfd-modules"
import { translate } from "react-i18nify"
import { observer } from "mobx-react"
import { useWindowSize } from "../../utils/hooks/use-window-size"
import Paginator from "../ui/Paginator"
import { useBrowserFeatures, WebGLDiagnostics } from "../../utils/hooks/use-browser-features"

const DiagnosticsView = () => {
  const mqtt = useMqtt()
  const windowSize = useWindowSize()
  const browserFeatures = useBrowserFeatures()

  const connectionDiagnostics = (
    <DiagnosticsTable
      title={translate("diagnostics.connection.connection")}
      diagnostics={getConnectionDiagnostics(mqtt)}
    />
  )

  const deviceDiagnostics = (
    <DiagnosticsTable
      title={translate("diagnostics.device.device")}
      diagnostics={getDeviceDiagnostics(windowSize, browserFeatures)}
    />
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

const getColorSchemePreferences = () => {
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
  const prefersLightMode = window.matchMedia("(prefers-color-scheme: light)").matches
  const prefersHighContrast = window.matchMedia("(prefers-contrast: high)").matches
  const prefersLowContrast = window.matchMedia("(prefers-contrast: low)").matches

  const preferences = [
    prefersDarkMode ? translate("diagnostics.device.prefersDarkMode") : undefined,
    prefersLightMode ? translate("diagnostics.device.prefersLightMode") : undefined,
    prefersHighContrast ? translate("diagnostics.device.prefersHighContrast") : undefined,
    prefersLowContrast ? translate("diagnostics.device.prefersLowContrast") : undefined,
  ]
    .filter((str) => str !== undefined)
    .join(", ")

  return preferences || translate("diagnostics.device.unspecified")
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

function formatWebGLDiagnostics(webgl: WebGLDiagnostics | null): string {
  if (!webgl || !webgl.contextType) return translate("diagnostics.device.webglNotSupported")

  const parts: string[] = [webgl.contextType]

  if (webgl.renderer) parts.push(webgl.renderer)
  if (webgl.maxTextureSize) parts.push(`tex=${webgl.maxTextureSize}`)
  if (webgl.maxRenderbufferSize) parts.push(`rb=${webgl.maxRenderbufferSize}`)
  if (webgl.maxVertexAttribs) parts.push(`attribs=${webgl.maxVertexAttribs}`)
  if (webgl.maxVaryingVectors) parts.push(`varyings=${webgl.maxVaryingVectors}`)
  if (webgl.maxTextureImageUnits) parts.push(`texUnits=${webgl.maxTextureImageUnits}`)
  parts.push(`${webgl.supportedExtensions.length} extensions`)

  if (webgl.missingQtExtensions.length > 0) {
    parts.push(`${translate("diagnostics.device.missing")} ${webgl.missingQtExtensions.join(", ")}`)
  }

  return parts.join(", ")
}

const getDeviceDiagnostics = (
  windowSize: { width?: number; height?: number },
  browserFeatures: {
    isGuiV2Supported: boolean
    missingFeatures: string[]
    webglDiagnostics: WebGLDiagnostics | null
  },
) => {
  return [
    {
      property: translate("diagnostics.device.userAgent"),
      value: window.navigator.userAgent,
    },
    {
      property: translate("diagnostics.device.viewportWidth"),
      value: (windowSize.width ?? window.innerWidth) + `px (${window.screen.width}px)`,
    },
    {
      property: translate("diagnostics.device.viewportHeight"),
      value: (windowSize.height ?? window.innerHeight) + `px (${window.screen.height}px)`,
    },
    {
      property: translate("diagnostics.device.devicePixelRatio"),
      value: (window.devicePixelRatio ?? 1) + "px/pt",
    },
    {
      property: translate("diagnostics.device.colorScheme"),
      value: getColorSchemePreferences(),
    },
    {
      property: translate("diagnostics.device.isGuiV2Supported"),
      value: `${browserFeatures.isGuiV2Supported ? translate("common.yes") : translate("common.no")}${browserFeatures.isGuiV2Supported === false ? ", " + translate("diagnostics.device.missing") + " " + browserFeatures.missingFeatures.join(", ") : ""}`,
    },
    {
      property: translate("diagnostics.device.webgl"),
      value: formatWebGLDiagnostics(browserFeatures.webglDiagnostics),
    },
  ]
}

export default observer(DiagnosticsView)
