import { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { NextPageWithLayout } from '@pages/_app'
import CommonPageLayout from '@components/layout/CommonPageLayout'
import { BoxProps } from '@type/boxes'

const BoxPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { name } = router.query

  if (!name) {
    return null
  }

  const BoxItem: ComponentType<BoxProps> = dynamic(() => import(`@components/boxes/${name}`), {
    ssr: false,
  })

  return BoxItem ? (
    <div className={'p-4 h-full'}>
      <BoxItem mode={'full'} />
    </div>
  ) : null
}

BoxPage.getLayout = (page: JSX.Element) => {
  // TODO: add translations
  return <CommonPageLayout title={'Title'}>{page}</CommonPageLayout>
}

export default observer(BoxPage)
