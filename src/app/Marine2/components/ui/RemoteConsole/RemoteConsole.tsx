import { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import classnames from "classnames"
import { translate, Translate } from "react-i18nify"
import useSize from "@react-hook/size"

const RemoteConsole = ({ host, width, height }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeWidth, iframeHeight] = useSize(iframeRef)

  const [iframeLoaded, setIframeLoaded] = useState(false)
  const loading = !iframeLoaded
  const protocol = (typeof window !== "undefined" && window.location.protocol) || "http:"
  const url = protocol + "//" + host

  useEffect(() => {
    iframeRef.current?.focus()
  }, [iframeLoaded])

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
