import { Battery } from '@elninotech/mfd-modules'
import { batteryStateNameFormatter } from '~/utils/formatters'
import { useTranslation } from 'next-i18next'

const BatterySummary = ({ battery }: Props) => {
  const { t } = useTranslation()

  return <div>
    <p>{battery.name} - {batteryStateNameFormatter(t, battery.state)}: {battery.soc}%</p>
  </div>
}

interface Props {
  battery: Battery
}

export default BatterySummary