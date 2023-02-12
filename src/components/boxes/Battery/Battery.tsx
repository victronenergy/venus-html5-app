import Box from '~/components/ui/Box'
import { Battery as BatteryType } from '@elninotech/mfd-modules'
import { batteryStateNameFormatter } from '~/utils/formatters'
import { useTranslation } from 'next-i18next'
import { BATTERY } from '~/utils/constants'
import BatteryChargingIcon from '~/public/icons/battery-charging.svg'
import BatteryIcon from '~/public/icons/battery.svg'
import BatteryDischargingIcon from '~/public/icons/battery-discharging.svg'
import { colorForPercentageFormatter } from '~/utils/formatters'
import classNames from 'classnames'

const Battery = ({ battery, mode = 'compact' }: Props) => {
  const { t } = useTranslation()
  const hasPercentage = battery.soc !== undefined && battery.soc !== null
  const color = hasPercentage ? colorForPercentageFormatter(Math.round(battery.soc)) : 'victron-gray-4'

  if (mode === 'compact') {
    return (
      <Box icon={batteryStateIconFormatter(battery.state)} title={battery.name}>
        <></>
      </Box>
    )
  }

  return (
    <Box icon={batteryStateIconFormatter(battery.state)} title={battery.name} className='truncate'>
      <div className='w-full h-full flex flex-col'>
        <div className={`text-${color} text-5xl md-m:text-6xl`}>
          {battery.soc ?? '--'}
          <span>%</span>
        </div>
        <p className='text-base md:text-lg lg:text-xl xl:text-2xl text-victron-gray dark:text-victron-gray-dark'>
          {batteryStateNameFormatter(t, battery.state)}
        </p>
        <p className='text-base md:text-lg lg:text-xl xl:text-2xl text-victron-gray dark:text-victron-gray-dark'>
          {battery.temperature ?? '--'}
          <span className='text-victron-gray-400'>°C</span>
        </p>

        <div className='w-full h-full flex content-end flex-wrap'>
          <div className='w-full'>
            <div className='my-1 border-[1px] border-victron-gray-200' />
            <div key={battery.name} className='grid grid-cols-9 whitespace-nowrap'>
              <p className='text-victron-gray dark:text-white truncate text-left text-base sm:text-lg md:text-xl lg:text-2xl col-span-3'>
                {battery.name}
              </p>
              <p className='text-victron-gray text-left text-base sm:text-lg md:text-xl lg:text-2xl  col-span-2'>
                {battery.voltage.toFixed(1)} <span className='text-victron-gray-400'>V</span>
              </p>
              <p className='text-victron-gray text-center text-base sm:text-lg md:text-xl lg:text-2xl  col-span-2'>
                {battery.current.toFixed(1)} <span className='text-victron-gray-400'>A</span>
              </p>
              <p className='text-victron-gray text-right text-base sm:text-lg md:text-xl lg:text-2xl  col-span-2'>
                {battery.power.toFixed(1)} <span className='text-victron-gray-400'>W</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

const batteryStateIconFormatter = function (state: number): JSX.Element {
  const className = 'w-6 text-victron-gray dark:text-victron-gray-dark'
  switch (state) {
    case BATTERY.CHARGING:
      return <BatteryChargingIcon className={className} />
    case BATTERY.DISCHARGING:
      return <BatteryDischargingIcon className={className} />
  }
  return <BatteryIcon className={className} />
}

interface Props {
  battery: BatteryType
  mode?: 'compact' | 'full'
}

export default Battery
