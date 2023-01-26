import { observer } from 'mobx-react-lite'
import { NextPageWithLayout } from '~/pages/_app'
import CommonPageLayout from '~/components/layout/CommonPageLayout'
import Grid from '~/components/ui/Grid'
import EnergyOverview from '~/components/boxes/EnergyOverview'
import { useEffect } from 'react'
import { useStore } from '~/stores'
import { useTranslation } from 'next-i18next'
import TanksOverview from '~/components/boxes/TanksOverview'
import BatteriesOverview from '~/components/boxes/BatteriesOverview'
import DevicesOverview from '~/components/boxes/DevicesOverview'
import { getStaticPaths, makeStaticProps } from '~/util/getStatic'

const Home: NextPageWithLayout = ({}) => {
  const { navigationStore } = useStore()
  const { t } = useTranslation()

  // TODO: replace this code with real data depending on the system type
  const getBoxes = (type: 'simple' | 'absolute') => {
    switch (type) {
      case 'simple':
        return [<EnergyOverview />, <BatteriesOverview />, <TanksOverview />]
      case 'absolute':
        return [<EnergyOverview />, <BatteriesOverview />, <DevicesOverview />, <TanksOverview />]
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
        {getBoxes('simple').map((box, key) => box)}
      </Grid>
    </div>
  )
}

const getStaticProps = makeStaticProps()
export { getStaticPaths, getStaticProps }

Home.getLayout = (page: JSX.Element) => {
  return <CommonPageLayout>{page}</CommonPageLayout>
}

export default observer(Home)
