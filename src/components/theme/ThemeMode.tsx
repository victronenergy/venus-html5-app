import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTheme } from '@elninotech/mfd-modules'

const ThemeMode = () => {
  const { themeStore } = useTheme()

  const toggleMode = () => {
    themeStore.setDarkMode(!themeStore.darkMode)
  }

  return (
    <div className='dark:text-white cursor-pointer'>
      <div onClick={toggleMode}>{themeStore.darkMode ? 'Light' : 'Dark'}</div>
    </div>
  )
}

interface Props {}

export default observer(ThemeMode)
