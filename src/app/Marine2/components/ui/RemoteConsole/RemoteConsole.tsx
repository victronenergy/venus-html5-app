import React from "react"
import { observer } from "mobx-react-lite"
import classnames from "classnames"
import { STATUS, useMqtt } from "@elninotech/mfd-modules"
import { translate, Translate } from "react-i18nify"

const RemoteConsole = ({ host }: Props) => {
  const mqtt = useMqtt()

  const loading = mqtt.status === STATUS.CONNECTING
  const error = mqtt.error && [STATUS.OFFLINE, STATUS.DISCONNECTED].some((v) => v === mqtt.status)

  const protocol = (typeof window !== "undefined" && window.location.protocol) || "http:"
  const url = protocol + "//" + host

  return (
    <>
      {mqtt.status === STATUS.CONNECTED && (
        <iframe
          className={classnames("max-w-screen-md flex-grow h-96 py-3.5 block hide-remote-console:hidden", {
            hidden: loading || error,
          })}
          src={url}
          title={translate("pages.remoteConsole")}
        />
      )}

      {loading && !error && (
        <div className={"text-center text-base p-4 block hide-remote-console:hidden"}>
          <Translate value={"common.loading"} />…
        </div>
      )}
      {error && (
        <div className={"text-center text-base p-4 block hide-remote-console:hidden"}>
          <Translate value={"error.remoteConsole.connectionFailed"} />
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
}

export default observer(RemoteConsole)
