import { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import classnames from "classnames"
import { translate, Translate } from "react-i18nify"
import useSize from "@react-hook/size"
import { useApp } from "@victronenergy/mfd-modules"
import { QRCode } from "react-qrcode-logo"

const RemoteConsole = ({ host, width, height }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeWidth, iframeHeight] = useSize(iframeRef)

  const [iframeLoaded, setIframeLoaded] = useState(false)
  const loading = !iframeLoaded
  const protocol = (typeof window !== "undefined" && window.location.protocol) || "http:"
  const url = protocol + "//" + host
  const app = useApp()

  useEffect(() => {
    iframeRef.current?.focus()
  }, [iframeLoaded])

  console.log(`Venus Running GUI version: ${app.guiVersion}`)

  const consoleUrl = `${window.location.protocol}://venus.local/`

  if (app.guiVersion !== 1) {
    return (
      <div className="flex flex-col items-center w-2/3 md:w-1/3 space-y-4">
        <QRCode value={consoleUrl} />
        <label className="text-xs text-victron-gray-400 sm-l:text-sm dark:text-victron-gray-500">{consoleUrl}</label>
        <label className="text-xs text-victron-gray-400 sm-l:text-sm dark:text-victron-gray-500 text-center">
          <Translate value={"error.remoteConsole.qrCodeMessage"} />
        </label>
      </div>
    )
  }

  return (
    <>
      {
        <iframe
          ref={iframeRef}
          className={classnames("max-w-screen-md flex-grow h-96 py-3.5 block hide-remote-console:hidden", {
            hidden: loading,
            "scale-110": iframeWidth * 1.1 < width && iframeHeight * 1.1 < height,
            "scale-125": iframeWidth * 1.25 < width && iframeHeight * 1.25 < height,
            "scale-150": iframeWidth * 1.5 < width && iframeHeight * 1.5 < height,
          })}
          src={url}
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
