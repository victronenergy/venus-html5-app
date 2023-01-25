import React from 'react'
import { useActiveInValues, useActiveSource } from '@elninotech/mfd-modules'
import { observer } from 'mobx-react-lite'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import Box from '~/components/ui/Box'
import { useTranslation } from 'next-i18next'

const EnergyShore = ({ mode = 'compact', inputId }: Props) => {
  const { current, power, voltage } = useActiveInValues()
  const { activeInput, phases } = useActiveSource()
  const { t } = useTranslation()
  const unplugged = (activeInput + 1) !== inputId // Active in = 0 -> AC1 is active
  const totalPower = power.reduce(
    (total, power) => power ? total + power : total
  )

  if (mode === 'compact') {
    return <>
      <p>{t('boxes.shorePower') + ': '}
        { unplugged ? '--A' : (
          (phases ?? 1) === 1 ?
            (current[0] ?? '--') + 'A' :
            (totalPower ?? '--') + 'W'
        )}
      </p>
      { unplugged && <small>{t('common.unplugged')}</small> }
    </>
  }

  return <Box title={t('boxes.shorePower')} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
    <>
      { unplugged && <p>{t('common.unplugged')}</p> }
      { !unplugged && <>
          <p>{current.slice(0, phases ?? 1).map(c => c ? c + 'A ' : '--A ')}</p>
          <p>{power.slice(0, phases ?? 1).map(p => p ? p + 'W ' : '--W ')}</p>
          <p>{voltage.slice(0, phases ?? 1).map(v => v ? v + 'V ' : '--V ')}</p>
        </>
      }
    </>
  </Box>
}

interface Props extends BoxProps {
  inputId: number
}

export default observer(EnergyShore)
