import React from 'react'
import { useActiveInValues, useActiveSource } from '@elninotech/mfd-modules'
import { observer } from 'mobx-react-lite'
import { BoxProps } from '~/types/boxes'
import EnergyIcon from '~/public/icons/energy.svg'
import Box from '~/components/ui/Box'
import { useTranslation } from 'next-i18next'
import ShorePowerIcon from '~/public/icons/shore-power.svg'

const EnergyShore = ({ mode = 'compact', inputId }: Props) => {
  const { current, power, voltage } = useActiveInValues()
  const { activeInput, phases } = useActiveSource()
  const { t } = useTranslation()
  const unplugged = activeInput + 1 !== inputId // Active in = 0 -> AC1 is active
  const totalPower = power.reduce((total, power) => (power ? total + power : total))

  if (mode === 'compact') {
    return (
      <div className='flex items-center justify-between'>
        <div className='flex'>
          <ShorePowerIcon className={'w-7 text-black dark:text-white'} />
          <div className='flex flex-col pl-3'>
            <p className='text-2xl'>{t('boxes.shorePower')}</p>
            {unplugged && <small>{t('common.unplugged')}</small>}
          </div>
        </div>
        {!unplugged ? (
          (phases ?? 1) === 1 ? <p className='text-2xl'>{current[0].toFixed(1) ?? '--'}<span className='text-victron-gray dark:text-victron-gray-dark'> W</span></p>
            : <p className='text-2xl'>{totalPower.toFixed(1) ?? '--'}<span className='text-victron-gray dark:text-victron-gray-dark'> W</span></p>
        ) : <p className='text-2xl'>--<span className='text-victron-gray dark:text-victron-gray-dark'> A</span></p>}
      </div>
    )
  }

  return (
    <Box title={t('boxes.shorePower')} icon={<EnergyIcon className={'w-6 text-black dark:text-white'} />}>
      <>
        {unplugged && <p>{t('common.unplugged')}</p>}
        {!unplugged && (
          <>
            <p>{current.slice(0, phases ?? 1).map((c) => (c ? c + 'A ' : '--A '))}</p>
            <p>{power.slice(0, phases ?? 1).map((p) => (p ? p + 'W ' : '--W '))}</p>
            <p>{voltage.slice(0, phases ?? 1).map((v) => (v ? v + 'V ' : '--V '))}</p>
          </>
        )}
      </>
    </Box>
  )
}

interface Props extends BoxProps {
  inputId: number
}

export default observer(EnergyShore)
