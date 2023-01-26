import { ComponentType, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { NextPageWithLayout } from '~/pages/_app'
import CommonPageLayout from '~/components/layout/CommonPageLayout'
import { BoxProps } from '~/types/boxes'
import { useStore } from '~/stores'
import { useTranslation } from 'next-i18next'
import { makeStaticProps, getStaticPaths as makeStaticPaths } from '~/util/getStatic'

const BoxPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { navigationStore } = useStore()

  const name = router.query?.name?.[0]

  useEffect(() => {
    if (name) {
      navigationStore.setTitle(t(`boxes.${name}`))
    }
  }, [name, t, navigationStore])

  if (!name) {
    return null
  }

  const BoxItem: ComponentType<BoxProps> = dynamic(() => import(`~/components/boxes/${name}`), {
    ssr: false,
  })

  return (
    <div className={'p-4 h-full'}>
      <BoxItem mode={'full'} />
    </div>
  )
}

const getStaticProps = makeStaticProps()
const getStaticPaths = () => {
  const obj = makeStaticPaths()
  obj.paths = obj.paths.map(
    path => {
      path.params = { name: [], ...path.params }
      return path
    }
  )
  return obj
}
export { getStaticPaths, getStaticProps }

BoxPage.getLayout = (page: JSX.Element) => {
  return <CommonPageLayout>{page}</CommonPageLayout>
}

export default observer(BoxPage)
