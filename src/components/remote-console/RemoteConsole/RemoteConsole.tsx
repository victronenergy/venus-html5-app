import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import RemoteConsoleInstructions from '~/components/remote-console/RemoteConsoleInstructions'

const RemoteConsole = () => {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <iframe
        onLoad={() => setLoaded(true)}
        className={classnames('flex-grow remote-console', {'hidden': !loaded || error})}
        src={'http://' + router.query['host'] || window.location.hostname || 'localhost'}
      />

      { !loaded && !error ? (
        <div className={'text-center p-4'}>Loading...</div>
      ) : error ? (
        <RemoteConsoleInstructions />
      ) : null }

      { loaded && !error ?
        <div className={'hidden text-center p-4 remote-console-warning'}>Open in a larger screen to view remote console</div>
        : null }
    </>
  )
}

export default observer(RemoteConsole)
