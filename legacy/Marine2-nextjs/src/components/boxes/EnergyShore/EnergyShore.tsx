import React from 'react'
import { useActiveInValues, useActiveSource } from '@elninotech/mfd-modules'
import { observer } from 'mobx-react-lite'
import { BoxProps } from '~/types/boxes'
import Box from '~/components/ui/Box'
import { useTranslation } from 'next-i18next'
import ShorePowerIcon from '~/public/icons/shore-power.svg'
import { formatValue, formatPower } from '~/utils/format'

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
          <div className='flex flex-col pl-2 md:pl-3'>
            <p className='text-base md:text-xl lg:text-2xl'>{t('boxes.shorePower')}</p>
            {unplugged && <small>{t('common.unplugged')}</small>}
          </div>
        </div>
        {!unplugged ? (
          (phases ?? 1) === 1 ? (
            <p className='text-base md:text-xl lg:text-2xl'>
              {formatValue(current[0])}
              <span className='p-0.5 text-victron-gray dark:text-victron-gray-dark'>A</span>
            </p>
          ) : (
            <p className='text-base md:text-xl lg:text-2xl'>
              {formatPower(totalPower)}
              <span className='p-0.5 text-victron-gray dark:text-victron-gray-dark'>W</span>
            </p>
          )
        ) : (
          <div>
          <p className='hidden text-2xl md:block'>{t('common.unplugged')}</p>
          <p className='text-base md:text-xl lg:text-2xl md:hidden'>
            --<span className='p-0.5 text-victron-gray dark:text-victron-gray-dark'>A</span>
          </p>
            </div>
        )}
      </div>
    )
  }

  return (
    <Box title={t('boxes.shorePower')} icon={<ShorePowerIcon className={'w-5 text-black dark:text-white'} />}>
      <div className='w-full h-full flex flex-col'>
        {unplugged && <p className='text-2xl text-victron-gray dark:text-white'>{t('common.unplugged')}</p>}
        {!unplugged &&
          ((phases ?? 1) === 1 ? (
            <div className='text-5xl text-victron-gray dark:text-white md-m:text-6xl'>
              {formatValue(current[0])}
              <span className='p-0.5 text-victron-gray dark:text-victron-gray-dark'>A</span>
            </div>
          ) : (
            <div className='text-5xl text-victron-gray dark:text-white md-m:text-6xl'>
              {formatValue(totalPower)}
              <span className='p-0.5 text-victron-gray dark:text-victron-gray-dark'>W</span>
            </div>
          ))}

        <div className='w-full h-full flex content-end flex-wrap'>
          <div className='w-full'>
            <hr className='w-full h-1 border-victron-gray' />
            <div className='text-left text-base text-victron-gray dark:text-victron-gray-dark md-m:text-2xl'>
              {formatPower(totalPower)}
              <span className='p-0.5 text-victron-gray'>W</span>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}

interface Props extends BoxProps {
  inputId: number
}

export default observer(EnergyShore)
