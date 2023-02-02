import ProgressCircle from '~/components/ui/ProgressCircle'
import { batteryStateNameFormatter, dcVoltageFormatter, timeAsStringFormatter } from '~/utils/formatters'
import { BATTERY } from '~/utils/constants'
import { useTranslation } from 'next-i18next'
import { Battery } from '@elninotech/mfd-modules'
import classNames from 'classnames'

const BatterySummary = ({ battery, className }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={classNames('flex flex-col justify-center items-center px-4', className)}>
      <ProgressCircle percentage={battery.soc ?? null}>
        { (battery.voltage || battery.voltage === 0) ?
          <div className={'text-victron-gray dark:text-victron-gray-dark text-xl md:text-2xl lg:text-3xl hidden md:block'}>
            { dcVoltageFormatter(battery.voltage) }
            <span className={'text-victron-gray-4 dark:text-victron-gray-4-dark'}>V</span>
          </div> : <></>
        }
      </ProgressCircle>
      <span className={'mt-3.5 truncate w-full text-center text-xl lg:text-4xl'}>
        { battery.name }
      </span>
      {
        <span className={'text-victron-gray dark:text-victron-gray-dark md:text-lg lg:text-xl'}>
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
  className?: string
}

export default BatterySummary