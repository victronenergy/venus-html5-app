import React from 'react'
import { observer } from 'mobx-react-lite'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { STATUS, useMqtt } from '@elninotech/mfd-modules'

const RemoteConsole = () => {
  const router = useRouter()
  const mqtt = useMqtt()

  const loading = mqtt.status === STATUS.CONNECTING
  const error = mqtt.error && [STATUS.OFFLINE, STATUS.DISCONNECTED]
    .some(v => v === mqtt.status)

  let url = 'http://' + (router.query['host'] ||
    (typeof window !== 'undefined' && window.location.hostname) ||
    'localhost')

  return (
    <>
      { mqtt.status === STATUS.CONNECTED &&
        <iframe
          className={classnames('flex-grow remote-console', {'hidden': loading || error})}
          src={url}
        />
      }

      { loading && !error ? (
        <div className={'text-center p-4'}>Loading...</div>
      ) : error ? (
        <div className={'hidden text-center p-4 remote-console-warning'}>Unable to connect to the GX device</div>
      ) : null }

      { loading && !error ?
        <div className={'hidden text-center p-4 remote-console-warning'}>Open in a larger screen to view remote console</div>
        : null }
    </>
  )
}

export default observer(RemoteConsole)
