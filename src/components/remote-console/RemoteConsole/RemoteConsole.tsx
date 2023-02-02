import React from 'react'
import { observer } from 'mobx-react-lite'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import { STATUS, useMqtt } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'

const RemoteConsole = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const mqtt = useMqtt()

  const loading = mqtt.status === STATUS.CONNECTING
  const error = mqtt.error && [STATUS.OFFLINE, STATUS.DISCONNECTED]
    .some(v => v === mqtt.status)

  const protocol = (typeof window !== 'undefined' && window.location.protocol) || 'http:'
  const hostname = router.query['host'] || (typeof window !== 'undefined' && window.location.hostname) || 'localhost'
  const url = protocol + '//' + hostname

  return (
    <>
      { mqtt.status === STATUS.CONNECTED &&
        <iframe
          className={classnames('flex-grow max-w-screen-md h-[354px] block hide-remote-console:hidden', {'hidden': loading || error})}
          src={url}
        />
      }

      { loading && !error &&
        <div className={'text-center p-4 block hide-remote-console:hidden'}>{t('common.loading')}…</div>
      }
      { error &&
        <div className={'text-center p-4 block hide-remote-console:hidden'}>
          {t('error.remoteConsole.connectionFailed')}
        </div>
      }

      <div className={'text-center p-4 hidden hide-remote-console:block'}>
        {t('error.remoteConsole.screenTooSmall')}
      </div>
    </>
  )
}

export default observer(RemoteConsole)
