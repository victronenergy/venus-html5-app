import { observer } from 'mobx-react-lite'
import { useBattery } from '@elninotech/mfd-modules'
import { Battery as BatteryType } from '@elninotech/mfd-modules'
import Box from '~/components/ui/Box'
import { BATTERY } from '~/utils/constants'
import { BoxProps } from '~/types/boxes'
import Grid from '~/components/ui/Grid'
import BatterySummary from '~/components/boxes/BatteriesOverview/BatterySummary'
import Battery from '~/components/boxes/Battery/Battery'
import { RouterPath } from '~/types/routes'
import { useRouter } from 'next/router'
import AuxiliaryBatteries from '~/components/boxes/AuxiliaryBatteries'
import { useTranslation } from 'next-i18next'

const BatteriesOverview = ({ mode = 'compact' }: BoxProps) => {
  const { batteries } = useBattery()
  const router = useRouter()
  const { t } = useTranslation()

  if (!batteries) {
    return <Box title={t('boxes.batteries')}>none</Box>
  }

  // Separate 'auxiliary batteries', the ones do not give us a state of charge.
  const auxiliaryBatteries = sortBatteries(batteries.filter(b => !b.state && b.state !== 0))
  const regularBatteries = sortBatteries(batteries.filter(b => b.state || b.state === 0))

  if (mode === 'compact') {
    return (
      <Box
        title={t('boxes.batteries')}
        onExpandClick={() => router.push(`${RouterPath.BOX}/BatteriesOverview`)}
      >
        <>{ regularBatteries.map(b => <BatterySummary key={b.id} battery={b} />) }</>
      </Box>
    )
  }

  return (
    <Grid flow={'col'}>
      { getGridElements(regularBatteries, auxiliaryBatteries) }
    </Grid>
  )
}

/*
 Sort batteries by state (charging > discharging > idle) and within that by id.
 */
const sortBatteries = function (batteries: BatteryType[]) {
  return batteries.slice().sort((a, b) => {

    if ((a.state === BATTERY.CHARGING && b.state !== BATTERY.CHARGING) ||
      (a.state === BATTERY.DISCHARGING && b.state === BATTERY.IDLE)) return -1

    if ((a.state !== BATTERY.CHARGING && b.state === BATTERY.CHARGING) ||
      (a.state === BATTERY.IDLE && b.state === BATTERY.DISCHARGING)) return 1

    return +a.id - +b.id
  })
}

const getGridElements = function (batteries: BatteryType[], auxiliaryBatteries: BatteryType[]) {
  const elements = batteries.map(b => <Battery key={b.id} battery={b} />)
  if (auxiliaryBatteries.length) {
    elements.push(<AuxiliaryBatteries key={'auxiliary'} batteries={auxiliaryBatteries}/>)
  }
  return elements
}

export default observer(BatteriesOverview)