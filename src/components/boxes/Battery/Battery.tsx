import Box from '~/components/ui/Box'
import { Battery as BatteryType } from '@elninotech/mfd-modules'
import { batteryStateNameFormatter } from '~/utils/formatters'
import { useTranslation } from 'next-i18next'
import { BATTERY } from '~/utils/constants'
import BatteryChargingIcon from '~/public/icons/battery-charging.svg'
import BatteryIcon from '~/public/icons/battery.svg'
import BatteryDischargingIcon from '~/public/icons/battery-discharging.svg'

const Battery = ({ battery, mode = 'compact' }: Props) => {
  const { t } = useTranslation()

  if (mode === 'compact') {
    return (
      <Box icon={batteryStateIconFormatter(battery.state)} title={battery.name}>
        <>
          <p>SOC: { battery.soc ?? '--' }%</p>
          <p>State: { batteryStateNameFormatter(t, battery.state) }</p>
          <p>Temperature: { battery.temperature ?? '--' }C</p>
          <p>Time to go: { battery.timetogo ?? '--' }s</p>
          <p>{battery.voltage}V {battery.current}A {battery.power}W</p>
        </>
      </Box>
    )
  }

  return (
    <>
    <Box icon={batteryStateIconFormatter(battery.state)} title={battery.name}>
      <>
        <p>SOC: { battery.soc ?? '--' }%</p>
        <p>State: { batteryStateNameFormatter(t, battery.state) }</p>
        <p>Temperature: { battery.temperature ?? '--' }C</p>
        <p>Time to go: { battery.timetogo ?? '--' }s</p>
        <p>{battery.voltage}V {battery.current}A {battery.power}W</p>
      </>
    </Box>
    </>
  )
}

const batteryStateIconFormatter = function (state: number): JSX.Element {
  const className = 'w-6 text-victron-gray dark:text-victron-gray-dark'
  switch (state) {
    case BATTERY.CHARGING: return <BatteryChargingIcon className={className} />
    case BATTERY.DISCHARGING: return <BatteryDischargingIcon className={className} />
  }
  return <BatteryIcon className={className} />
}

interface Props {
  battery: BatteryType,
  mode?: 'compact' | 'full'
}

export default Battery