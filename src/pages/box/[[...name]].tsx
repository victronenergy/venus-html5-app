import { ComponentType, useLayoutEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { NextPageWithLayout } from '@pages/_app'
import CommonPageLayout from '@components/layout/CommonPageLayout'
import { BoxProps } from '@type/boxes'
import { useStore } from '~/stores'

const BoxPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { navigationStore } = useStore()

  const name = router.query?.name?.[0]

  useLayoutEffect(() => {
    if (name) {
      // TODO: add translations
      navigationStore.setTitle(name)
    }
  }, [name])

  if (!name) {
    return null
  }

  const BoxItem: ComponentType<BoxProps> = dynamic(() => import(`@components/boxes/${name}`), {
    ssr: false,
  })

  return (
    <div className={'p-4 h-full'}>
      <BoxItem mode={'full'} />
    </div>
  )
}

BoxPage.getLayout = (page: JSX.Element) => {
  return <CommonPageLayout>{page}</CommonPageLayout>
}

export default observer(BoxPage)
