import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal } from '~/components/modals/Modal'
import PreferencesIcon from '~/public/icons/preferences.svg'
import { ToggleSwitch, RadioButton } from '~/components/buttons/base'
import { useTranslation } from 'next-i18next'
import { useTheme, useAppStore } from '@elninotech/mfd-modules'

const ThemeMode = () => {
  const { locked, toggleLocked } = useAppStore()
  const { themeStore } = useTheme()
  const [modal, setModal] = useState(false)
  const { t } = useTranslation()

  const setAutoMode = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    if (mediaQuery.matches && !themeStore.darkMode) {
      themeStore.setDarkMode(true)
    } else if(!mediaQuery.matches && themeStore.darkMode) {
      themeStore.setDarkMode(false)
    }
  }

  return (
    <div className='w-10 dark:text-white cursor-pointer'>
      <div className='flex justify-center items-center w-full'>
        <button onClick={() => setModal(!modal)} className="pl-5">
          <PreferencesIcon className='w-1'/>
        </button>
        <Modal.Frame
          open={modal}
          onClose={() => {
            setModal(false)
          }}
        >
          <Modal.Body>
            <div className='flex flex-col'>
              <div className='text-lg mb-4 dark:text-white md:text-xl'>
                <label className='flex justify-between items-center pb-4'>
                  <span className='mr-2'>{t('locker.lockMessage')}</span>
                  <ToggleSwitch onChange={toggleLocked} selected={locked} />
                </label>
                <div className='border border-gray-300'></div>
                <label className='text-base text-victron-gray pb-4'>{t('common.mode')}</label>
                <label className='flex justify-between items-center pb-8'>
                  <span className='mr-2'>{t('common.light')}</span>
                  <RadioButton onChange={() => themeStore.setDarkMode(false)} selected={!themeStore.darkMode} disabled={locked} />
                </label>
                <label className='flex justify-between items-center pb-8'>
                  <span className='mr-2'>{t('common.dark')}</span>
                  <RadioButton onChange={() => themeStore.setDarkMode(true)} selected={themeStore.darkMode} disabled={locked} />
                </label>
                <label className='flex justify-between items-center pb-8'>
                  <span className='mr-2'>{t('common.auto')}</span>
                  <ToggleSwitch onChange={setAutoMode} disabled={locked} />
                </label>
                <div className='border border-gray-300'></div>
              </div>
            </div>
          </Modal.Body>
          <button
            onClick={() => setModal(false)}
            className='w-full border-2 border-victron-blue bg-victron-blue/30 rounded-md pt-2 pb-2'
          >
            {t('header.remoteConsole')}
          </button>
        </Modal.Frame>
      </div>
    </div>
  )
}

export default observer(ThemeMode)
