import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '~/stores'

const ThemeMode = observer(() => {
  const { themeStore } = useStore()

  const toggleMode = () => {
    themeStore.toggleMode()
  }

  return (
    <div className='dark:text-white cursor-pointer'>
      <div onClick={toggleMode}>{themeStore.mode === 'dark' ? 'Light' : 'Dark'}</div>
    </div>
  )
})

interface Props {}

export default ThemeMode
