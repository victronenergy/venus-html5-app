import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useTheme } from '@elninotech/mfd-modules'
import { Modal } from '~/components/modals/Modal'
import PreferencesIcon from '~/public/icons/preferences.svg'
import { ToggleSwitch, RadioButton } from '~/components/buttons/base'

const ThemeMode = () => {
  const { themeStore } = useTheme()
  const [modal, setModal] = useState(false)
  const [lock, setLock] = useState(false)

  const toggleMode = () => {
    themeStore.setDarkMode(!themeStore.darkMode)
  }

  const toggleLock = () => {
    setLock(!lock)
  }

  // TODO: Move logic to utils 
  const setAutoMode = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    if (mediaQuery.matches) {
      themeStore.setDarkMode(true)
    } else {
      themeStore.setDarkMode(false)
    }
  }
  // TODO: Add translations
  return (
    <div className='dark:text-white cursor-pointer'>
      <div className='flex justify-center items-center w-full'>
        <button onClick={() => setModal(!modal)}>
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
                  <span className='mr-2'>Lock to prevent changes</span>
                  <ToggleSwitch onChange={toggleLock} selected={lock} />
                </label>
                <div className='border border-gray-300'></div>
                <label className='text-base text-victron-gray pb-4'>Mode</label>
                <label className='flex justify-between items-center pb-8'>
                  <span className='mr-2'>Light</span>
                  <RadioButton onChange={toggleMode} selected={!themeStore.darkMode} disabled={lock} />
                </label>
                <label className='flex justify-between items-center pb-8'>
                  <span className='mr-2'>Dark</span>
                  <RadioButton onChange={toggleMode} selected={themeStore.darkMode} disabled={lock} />
                </label>
                <label className='flex justify-between items-center pb-8'>
                  <span className='mr-2'>Auto</span>
                  <ToggleSwitch onChange={setAutoMode} disabled={lock} />
                </label>
                <div className='border border-gray-300'></div>
              </div>
            </div>
          </Modal.Body>
          <button
            onClick={() => setModal(false)}
            className='w-full border-2 border-victron-blue bg-victron-blue/30 rounded-md pt-2 pb-2'
          >
            Remote Console
          </button>
        </Modal.Frame>
      </div>
    </div>
  )
}

export default observer(ThemeMode)
