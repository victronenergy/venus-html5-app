import { observer } from 'mobx-react-lite'
import { useBattery } from '@elninotech/mfd-modules'
import { Battery as BatteryType } from '@elninotech/mfd-modules'
import Box from '~/components/ui/Box'
import { BATTERY } from '~/utils/constants'
import { BoxProps } from '~/types/boxes'
import Grid from '~/components/ui/Grid'
import Battery from '~/components/boxes/Battery/Battery'
import { RouterPath } from '~/types/routes'
import { useTranslation } from 'next-i18next'
import BatteriesIcon from '~/public/icons/batteries.svg'
import BatterySummary from '~/components/ui/BatterySummary'

const BatteriesOverview = ({ mode = 'compact' }: BoxProps) => {
  const { batteries } = useBattery()
  const { t } = useTranslation()

  const sortedBatteries = sortBatteries(batteries ?? [])
  const overviewBatteries = getOverviewBatteries(sortedBatteries, 2)

  if (mode === 'compact') {
    return (
      <Box
        icon={<BatteriesIcon className={'w-6 text-victron-gray dark:text-victron-gray-dark'} />}
        title={t('boxes.batteries')}
        onExpandHref={`${RouterPath.BOX}/BatteriesOverview`}
      >
        <div className={'flex justify-center items-center h-full -mx-4'}>
          { overviewBatteries.map(
            b => <BatterySummary
              key={b.id}
              battery={b}
              className={overviewBatteries.length > 1 ? 'w-6/12' : ''} />
          ) }
        </div>
      </Box>
    )
  }

  return (
    <Grid flow={'col'}>
      { sortedBatteries.map(b => <Battery key={b.id} battery={b} />) }
    </Grid>
  )
}

/*
 Sort batteries by state (charging > discharging > idle) and within that by id.
 */
const sortBatteries = function (batteries: BatteryType[]) {
  return batteries.slice().sort((a, b) => {

    if ((a.state === BATTERY.CHARGING && b.state !== BATTERY.CHARGING) ||
      (a.state === BATTERY.DISCHARGING && b.state === BATTERY.IDLE) ||
      ((a.state || a.state === 0) && (!b.state && b.state !== 0))) return -1

    if ((a.state !== BATTERY.CHARGING && b.state === BATTERY.CHARGING) ||
      (a.state === BATTERY.IDLE && b.state === BATTERY.DISCHARGING) ||
      ((!a.state && a.state !== 0) && (b.state || b.state === 0))) return 1

    return +a.id - +b.id
  })
}


/*
  We show only batteries with state data on the overview, but if we don't
  have any we will show any batteries.
 */
const getOverviewBatteries = function (batteries: BatteryType[], max: number) {
  const withStateCount = batteries.filter(b => b.state || b.state === 0).length
  if (withStateCount === 0) {
    return batteries.slice(0, max)
  }
  return batteries.slice(0, Math.min(withStateCount, max))
}

export default observer(BatteriesOverview)