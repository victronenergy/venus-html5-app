import React from 'react'
import { observer } from 'mobx-react-lite'
import ThemeMode from '@components/theme/ThemeMode'

const Footer = () => {
  return (
    <div className='flex w-full flex-row justify-between p-4'>
      <div>Victron Logo</div>
      <ThemeMode />
    </div>
  )
}

interface Props {}

export default observer(Footer)
