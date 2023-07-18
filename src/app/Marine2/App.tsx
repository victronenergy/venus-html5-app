import { useAppStore, useMqtt, useTheme, useVebus, useVrmStore } from "@elninotech/mfd-modules"
import { observer } from "mobx-react"
import React, { useEffect } from "react"
import { withErrorBoundary } from "react-error-boundary"
import { getLocale, setLocale } from "react-i18nify"
import { useVisibleWidgetsStore } from "./modules"
import { Marine2 } from "./Marine2"
import Connecting from "./components/ui/Connecting"
import { appErrorBoundaryProps } from "./components/ui/Error/appErrorBoundary"
import "./css/global.css"

export type AppProps = {
  host: string
  port: number
}

const App = (props: AppProps) => {
  const vrmStore = useVrmStore()
  const appStore = useAppStore()
  const mqtt = useMqtt()
  const locale = getLocale()
  const visibleWidgetsStore = useVisibleWidgetsStore()
  const { themeStore } = useTheme()

  useVebus()

  useEffect(() => {
    // if (!appStore.remote) {
    //   mqtt.boot(props.host, props.port)
    // } else if (
    //   appStore.remote &&
    //   vrmStore?.username &&
    //   vrmStore?.token &&
    //   vrmStore?.webhost &&
    //   vrmStore?.portalId &&
    //   vrmStore?.siteId
    // ) {
    mqtt.boot(
      "webmqtt13.victronenergy.com",
      null,
      true,
      "info@elnino.tech",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ3M2RiZTFjMmQyZTY4NmViNzExZmY4MTQ0ZGYyNTM0In0.eyJ1aWQiOiIxMzI5ODUiLCJ0b2tlbl90eXBlIjoicmVtZW1iZXJfbWUiLCJpc3MiOiJ2cm1hcGkudmljdHJvbmVuZXJneS5jb20iLCJhdWQiOiJodHRwczovL3ZybWFwaS52aWN0cm9uZW5lcmd5LmNvbS8iLCJpYXQiOjE2ODkyNDM1MTksImV4cCI6MTcwNDc5NTUxOSwianRpIjoiNDczZGJlMWMyZDJlNjg2ZWI3MTFmZjgxNDRkZjI1MzQifQ.sCVSyfV0Rzhi8Vcuu_xj_mHYp9FNZ9xnoGINqxXgFjS9O4vMgftwropnzdHc20pKQqSKeMeaY3gvPfnEiWdv50Y22pq56OEW2UNigvyb9tSqr6dC_Y_2tltUdtaXeVaaRux_TIA-AwezZG2_kEChLYEz1cGQcbLjDDS3kvRKWeKdW3IwYfz983FujCVIURR1t3CjpPD4tInPn6wa2zR8E5SK61NasR-V8C3xIjFXiRkvJLL_1szmvYXbt5Hfm2-ZlRhfTHrX_99Vnhz4w71FokdvaRLERMn3sBoIxhJJ9L8UWi-eFqvMgsZUhvn94oUldQZGaDrUoLGMi74ns5ko2A",
      "985dad817608",
      "live"
    )
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.host,
    props.port,
    appStore.remote,
    vrmStore.username,
    vrmStore.token,
    vrmStore.webhost,
    vrmStore.portalId,
    vrmStore.siteId,
    locale,
  ])

  useEffect(() => {
    if (appStore.language) {
      setLocale(appStore.language)
    }
  }, [appStore.language])

  useEffect(() => {
    visibleWidgetsStore.clearVisibleElements()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  useEffect(() => {
    if (themeStore.darkMode) {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark")
    }
  }, [themeStore.darkMode])

  return (
    <React.Suspense fallback={<Connecting />}>
      <Marine2 {...props} />
    </React.Suspense>
  )
}

export default withErrorBoundary(observer(App), appErrorBoundaryProps)
