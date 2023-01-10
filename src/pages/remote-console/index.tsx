import { NextPageWithLayout } from '~/pages/_app'
import CommonPageLayout from '~/components/layout/CommonPageLayout/CommonPageLayout'
import React from 'react'
import { useStore } from '~/stores'
import { observer } from 'mobx-react-lite'
import RemoteConsole from '~/components/remote-console/RemoteConsole'

const RemoteConsolePage: NextPageWithLayout = () => {
  const { navigationStore } = useStore()

  navigationStore.setTitle('Remote Console')

  return (
    <div className={'flex items-center justify-center w-full h-full'}>
      <RemoteConsole />
    </div>
  )
}

RemoteConsolePage.getLayout = (page: JSX.Element) => {
  return <CommonPageLayout>{page}</CommonPageLayout>
}

export default observer(RemoteConsolePage)