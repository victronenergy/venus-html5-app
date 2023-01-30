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
import ProgressCircle from '~/components/ui/ProgressCircle'
import { batteryStateNameFormatter } from '~/utils/formatters'

const BatteriesOverview = ({ mode = 'compact' }: BoxProps) => {
  const { batteries } = useBattery()
  const { t } = useTranslation()

  if (!batteries) {
    return <Box title={t('boxes.batteries')}>none</Box>
  }

  const sortedBatteries = sortBatteries(batteries)

  if (mode === 'compact') {
    return (
      <Box
        icon={<BatteriesIcon className={'w-6 text-victron-gray dark:text-victron-gray-dark'} />}
        title={t('boxes.batteries')}
        onExpandHref={`${RouterPath.BOX}/BatteriesOverview`}
      >
        <div className={'w-full h-full flex flex-col justify-center items-center'}>
          <ProgressCircle percentage={sortedBatteries[0].soc}>
            <div className={'text-victron-gray dark:text-victron-gray-dark text-2xl'}>
              { (Math.round(sortedBatteries[0].voltage * 10) / 10).toString().padStart(4, '0') }
              <span className={'text-victron-gray-4 dark:text-victron-gray-4-dark'}>V</span>
            </div>
          </ProgressCircle>
          <span className={'text-xl mt-3.5'}>
            { sortedBatteries[0].name }
          </span>
          <span className={'text-victron-gray dark:text-victron-gray-dark text-lg'}>
            { batteryStateNameFormatter(t, sortedBatteries[0].state) }
          </span>
        </div>
      </Box>
    )
  }

  return (
    <Grid flow={'col'}>
      { batteries.map(b => <Battery key={b.id} battery={b} />) }
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

export default observer(BatteriesOverview)