import React from 'react'
import { observer } from 'mobx-react-lite'
import ThemeMode from '@components/theme/ThemeMode'
import LogoIcon from '@public/logo/logo.svg'

const Footer = () => {
  return (
    <div className='flex w-full flex-row justify-between p-4'>
      <div>
        <LogoIcon className={'w-32 text-black dark:text-white'} />
      </div>
      <ThemeMode />
    </div>
  )
}

interface Props {}

export default observer(Footer)
