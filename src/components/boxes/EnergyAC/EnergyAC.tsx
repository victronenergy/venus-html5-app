import React from 'react'
import Box from '~/components/ui/Box'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import { AcLoadsState } from '@elninotech/mfd-modules'
import { useTranslation } from 'next-i18next'

const EnergyAC = ({ mode = 'compact', acLoads }: Props) => {
  const { current, power, phases, voltage } = acLoads
  const totalPower = power.reduce(
    (total, power) => power ? total + power : total
  )
  const { t } = useTranslation()

  if (mode === 'compact') {
    return <p>{t('boxes.acLoads') + ': '}
      {(phases ?? 1) === 1 ?
        (current[0] ?? '--') + 'A' :
        (totalPower ?? '--') + 'W'
      }
    </p>
  }

  return <Box title={t('boxes.acLoads')} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
    <>
      <p>{current.slice(0, phases ?? 1).map(c => c ? c + 'A ' : '--A ')}</p>
      <p>{power.slice(0, phases ?? 1).map(p => p ? p + 'W ' : '--W ')}</p>
      <p>{voltage.slice(0, phases ?? 1).map(v => v ? v + 'V ' : '--V ')}</p>
    </>
  </Box>
}

interface Props extends BoxProps {
  acLoads: AcLoadsState
}

export default EnergyAC
