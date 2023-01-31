import ProgressCircle from '~/components/ui/ProgressCircle'
import { batteryStateNameFormatter, dcVoltageFormatter, timeAsStringFormatter } from '~/utils/formatters'
import { BATTERY } from '~/utils/constants'
import { useTranslation } from 'next-i18next'
import { Battery } from '@elninotech/mfd-modules'
import classNames from 'classnames'

const BatterySummary = ({ battery, size = 'large', className }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={classNames('flex flex-col justify-center items-center px-2', className)}>
      <ProgressCircle percentage={battery.soc ?? null} size={size}>
        { (size === 'large' || (!battery.soc && battery.soc !== 0)) &&
          (battery.voltage || battery.voltage === 0) ?
          <div className={classNames(
            'text-victron-gray dark:text-victron-gray-dark',
            size === 'large' ? 'text-3xl' : 'text-xl'
          )}>
            { dcVoltageFormatter(battery.voltage) }
            <span className={'text-victron-gray-4 dark:text-victron-gray-4-dark'}>V</span>
          </div> : <></>
        }
      </ProgressCircle>
      <span className={'text-xl mt-3.5 truncate w-full text-center'}>
        { battery.name }
      </span>
      {
        <span className={classNames('text-victron-gray dark:text-victron-gray-dark', {
          'text-lg': size === 'large',
          'text-md': size === 'small'
        })}>
          { battery.state === BATTERY.DISCHARGING && battery.timetogo ?
            (
              timeAsStringFormatter(t, battery.timetogo)
            ) :
            batteryStateNameFormatter(t, battery.state, battery.soc ?? null)
          }
        </span>
      }
    </div>
  )
}

interface Props {
  battery: Battery
  size: 'small' | 'large'
  className?: string
}

export default BatterySummary