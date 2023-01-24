import { ComponentType, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { NextPageWithLayout } from '~/pages/_app'
import CommonPageLayout from '~/components/layout/CommonPageLayout'
import { BoxProps } from '~/types/boxes'
import { useStore } from '~/stores'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

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

BoxPage.getLayout = (page: JSX.Element) => {
  return <CommonPageLayout>{page}</CommonPageLayout>
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
})

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export default observer(BoxPage)
