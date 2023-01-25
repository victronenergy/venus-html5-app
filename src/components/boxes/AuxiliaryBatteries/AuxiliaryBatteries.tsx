import Box from "~/components/ui/Box"
import { Battery } from '@elninotech/mfd-modules'
import AuxiliaryBatteryRow from '~/components/boxes/AuxiliaryBatteries/AuxiliaryBatteryRow'
import { useTranslation } from 'next-i18next'

const AuxiliaryBatteries = ({ batteries }: Props) => {
  const { t } = useTranslation()

  return (
    <Box title={t('boxes.auxiliaryBatteries')}>
      <>{ batteries.map(b => <AuxiliaryBatteryRow key={b.id} battery={b} />) }</>
    </Box>
  )
}

interface Props {
  batteries: Battery[]
}

export default AuxiliaryBatteries