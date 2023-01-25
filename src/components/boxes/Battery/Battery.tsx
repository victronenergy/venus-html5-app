import Box from '~/components/ui/Box'
import { Battery as BatteryType } from '@elninotech/mfd-modules'
import { batteryStateFormatter } from '~/utils/formatters'
import { useTranslation } from 'next-i18next'

const Battery = ({ battery }: Props) => {
  const { t } = useTranslation()

  return (
    <Box title={battery.name}>
      <>
        <p>SOC: { battery.soc ?? '--' }%</p>
        <p>State: { batteryStateFormatter(t, battery.state) }</p>
        <p>Temperature: { battery.temperature ?? '--' }C</p>
        <p>Time to go: { battery.timetogo ?? '--' }s</p>
        <p>{battery.voltage}V {battery.current}A {battery.power}W</p>
      </>
    </Box>
  )
}

interface Props {
  battery: BatteryType
}

export default Battery