import { NextPageWithLayout } from '~/pages/_app'
import CommonPageLayout from '~/components/layout/CommonPageLayout/CommonPageLayout'
import React from 'react'
import { useStore } from '~/stores'
import { observer } from 'mobx-react-lite'
import RemoteConsole from '~/components/remote-console/RemoteConsole'
import { useTranslation } from 'next-i18next'
import { makeStaticProps,getStaticPaths } from '~/utils/getStatic'

const RemoteConsolePage: NextPageWithLayout = () => {
  const { t } = useTranslation()
  const { navigationStore } = useStore()

  navigationStore.setTitle(t('header.remoteConsole'))

  return (
    <div className={'flex items-center justify-center w-full h-full'}>
      <RemoteConsole />
    </div>
  )
}

const getStaticProps = makeStaticProps()
export { getStaticPaths, getStaticProps }

RemoteConsolePage.getLayout = (page: JSX.Element) => {
  return <CommonPageLayout>{page}</CommonPageLayout>
}

export default observer(RemoteConsolePage)