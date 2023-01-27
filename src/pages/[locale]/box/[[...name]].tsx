import { ComponentType, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react-lite'
import { NextPageWithLayout } from '~/pages/_app'
import CommonPageLayout from '~/components/layout/CommonPageLayout'
import { BoxProps } from '~/types/boxes'
import { useStore } from '~/stores'
import { useTranslation } from 'next-i18next'
import { makeStaticProps, getStaticPaths as makeStaticPaths } from '~/utils/getStatic'
import * as fs from 'fs'
import { BOX_DIRECTORY } from '~/utils/constants'

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

  const BoxItem: ComponentType<BoxProps> = dynamic(() => import(BOX_DIRECTORY + name), {
    ssr: false,
  })

  return (
    <div className={'p-4 h-full min-h-0'}>
      <BoxItem mode={'full'} />
    </div>
  )
}

const getStaticProps = makeStaticProps()
const getStaticPaths = () => {
  const obj = makeStaticPaths()
  const boxes = fs.readdirSync(BOX_DIRECTORY)
  const paths: { params: { [k: string]: any } }[] = []
  obj.paths.forEach((path) => {
    paths.push(
      ...boxes.map((box) => ({
        params: {
          name: [box],
          ...path.params,
        },
      }))
    )
  })
  obj.paths = paths
  return obj
}
export { getStaticPaths, getStaticProps }

BoxPage.getLayout = (page: JSX.Element) => {
  return <CommonPageLayout>{page}</CommonPageLayout>
}

export default observer(BoxPage)
