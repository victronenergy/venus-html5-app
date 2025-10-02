import { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import classnames from "classnames"
import { translate, Translate } from "react-i18nify"
import useSize from "@react-hook/size"
import { useAppStore, useTheme } from "@victronenergy/mfd-modules"
import { QRCode } from "react-qrcode-logo"
import { useBrowserFeatures } from "app/Marine2/utils/hooks/use-browser-features"

const RemoteConsole = ({ host, width, height }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeWidth, iframeHeight] = useSize(iframeRef)

  const [iframeLoaded, setIframeLoaded] = useState(false)
  const loading = !iframeLoaded
  const app = useAppStore()
  const browserFeatures = useBrowserFeatures()
  const { themeStore } = useTheme()

  useEffect(() => {
    iframeRef.current?.focus()
  }, [iframeLoaded])

  if (!browserFeatures.isInitialized) {
    return null
  }

  console.log(`Venus Running GUI version: ${app.guiVersion}`)
  console.log(
    `GUI v2 supported: ${browserFeatures.isGuiV2Supported}, missing: ${JSON.stringify(browserFeatures.missingFeatures)}`,
  )

  const protocol = (typeof window !== "undefined" && window.location.protocol) || "http:"
  const colorScheme = themeStore.autoMode ? "auto" : themeStore.darkMode ? "dark" : "light"
  const iframeUrl = `${protocol}//${host}/?fullscreen&colorScheme=${colorScheme}`
  const qrCodeUrl = `${window.location.protocol}//venus.local/`

  if (app.guiVersion !== 1 && browserFeatures.isGuiV2Supported === false) {
    return (
      <div className="flex flex-col items-center w-2/3 md:w-1/3 space-y-4">
        <QRCode value={qrCodeUrl} />
        <label className="text-xs text-content-secondary sm-l:text-sm">{qrCodeUrl}</label>
        <label className="text-xs text-content-secondary sm-l:text-sm text-center">
          <Translate value={"error.remoteConsole.qrCodeMessage"} />
        </label>
      </div>
    )
  }

  // Make the GUI v2 full screen with small pading on all sides
  var iframeClassNames = classnames("w-full h-full p-4 block hide-remote-console:hidden", {
    hidden: loading,
  })

  // Make the GUI v1 scaled to utilize as much space
  if (app.guiVersion === 1) {
    iframeClassNames = classnames("max-w-screen-md flex-grow h-96 py-3.5 block hide-remote-console:hidden", {
      // iframeClassNames = classnames("aspect-[750/350] max-w-[750] max-h-[350] p-4 flex-grow block hide-remote-console:hidden", {
      hidden: loading,
      "scale-110": iframeWidth * 1.1 < width && iframeHeight * 1.1 < height,
      "scale-125": iframeWidth * 1.25 < width && iframeHeight * 1.25 < height,
      "scale-150": iframeWidth * 1.5 < width && iframeHeight * 1.5 < height,
    })
  }

  return (
    <>
      {
        <iframe
          ref={iframeRef}
          className={iframeClassNames}
          src={iframeUrl}
          title={translate("pages.remoteConsole")}
          onLoad={() => setIframeLoaded(true)}
        />
      }

      {loading && (
        <div className={"text-center text-base p-4 block hide-remote-console:hidden"}>
          <Translate value={"common.loading"} />…
        </div>
      )}

      <div className={"text-center text-base p-4 hidden hide-remote-console:block"}>
        <Translate value={"error.remoteConsole.screenTooSmall"} />
      </div>
    </>
  )
}

interface Props {
  host: string
  width: number
  height: number
}

export default observer(RemoteConsole)
