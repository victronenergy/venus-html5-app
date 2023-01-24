import { observer } from 'mobx-react-lite'
import { NextPageWithLayout } from '~/pages/_app'
import CommonPageLayout from '~/components/layout/CommonPageLayout'
import Grid from '~/components/ui/Grid'
import EnergyOverview from '~/components/boxes/EnergyOverview'
import { useEffect } from 'react'
import { useStore } from '~/stores'
import EnergyAC from '~/components/boxes/EnergyAC'
import EnergyShore from '~/components/boxes/EnergyShore'
import EnergySolar from '~/components/boxes/EnergySolar'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Home: NextPageWithLayout = () => {
  const { navigationStore } = useStore()
  const { t } = useTranslation()

  useEffect(() => {
    navigationStore.setTitle(t('pages.systemOverview'))
  }, [navigationStore, t])

  return (
    <div className={'p-4 h-full'}>
      <Grid className={'gap-2'} flow={'col'}>
        <EnergyOverview />
        <EnergyAC mode={'full'} />
        <EnergyShore />
        {/*<EnergySolar mode={'full'} />*/}
      </Grid>
    </div>
  )
}

Home.getLayout = (page: JSX.Element) => {
  return <CommonPageLayout>{page}</CommonPageLayout>
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
})

export default observer(Home)
