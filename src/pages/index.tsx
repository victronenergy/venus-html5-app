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

  // TODO: replace this code with real data depending on the system type
  const getBoxes = (type: 'simple' | 'absolute') => {
    switch (type) {
      case 'simple':
        return [<EnergyOverview />, <EnergyAC mode={'full'} />, <EnergyShore />]
      case 'absolute':
        return [<EnergyOverview />, <EnergyAC mode={'full'} />, <EnergyShore />, <EnergySolar mode={'full'} />]
    }

    return []
  }

  useEffect(() => {
    navigationStore.setTitle(t('pages.systemOverview'))
  }, [navigationStore, t])

  return (
    <div className={'p-4 h-full'}>
      <Grid className={'gap-2'} flow={'col'}>
        {/* you can use different mocks to view the components layouts */}
        {/* TODO: replace this code with real data depending on the system type */}
        {getBoxes('simple').map((box) => box)}
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
