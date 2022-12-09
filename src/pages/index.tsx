import { observer } from 'mobx-react-lite'
import { NextPageWithLayout } from '@pages/_app'
import CommonPageLayout from '@components/layout/CommonPageLayout'
import Grid from '@components/ui/Grid'
import EnergyOverview from '@components/boxes/EnergyOverview'
import { useEffect } from 'react'
import { useStore } from '~/stores'
import EnergyAC from '@components/boxes/EnergyAC'
import EnergyShore from '@components/boxes/EnergyShore'
import EnergySolar from '@components/boxes/EnergySolar'

const Home: NextPageWithLayout = () => {
  const { navigationStore } = useStore()

  useEffect(() => {
    // TODO: add translations
    navigationStore.setTitle('System Overview')
  }, [])

  return (
    <div className={'p-4 h-full'}>
      <Grid className={'gap-2'}>
        <EnergyOverview />
        <EnergyAC mode={'full'} />
        <EnergyShore />
        <EnergySolar mode={'full'} />
      </Grid>
    </div>
  )
}

Home.getLayout = (page: JSX.Element) => {
  return <CommonPageLayout>{page}</CommonPageLayout>
}

export default observer(Home)
